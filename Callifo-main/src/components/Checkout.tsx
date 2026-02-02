import { X, Check, CreditCard, Shield, Lock, Users, Building2, Mail, Phone, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { purchaseLicense } from "../api/license";
import { createOrder, verifyPayment } from "../api/payment";
import { loadRazorpay } from "../utils/loadRazorpay";

interface CheckoutPlan {
  id: string;
  licenseTypeId: string;
  name: string;
  pricePerUser: number | null;
  includedUsers: number;
  period: string;
  features: any[];
  recommended?: boolean;
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string; // licenseId from pricing page
}

export function Checkout({ isOpen, onClose, selectedPlan }: CheckoutProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get plan and cycle from URL params or props
  const planFromUrl = searchParams.get("plan");
  const cycleFromUrl = searchParams.get("cycle") as "monthly" | "quarterly" | "half-yearly" | "yearly" | null;

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userEmail = user?.email || null;
  const safeName = user?.name || userEmail?.split("@")[0] || "Callifo User";

  /* =====================
     STATE
  ===================== */
  const [plans, setPlans] = useState<CheckoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "quarterly" | "half-yearly" | "yearly"
  >(cycleFromUrl || "monthly");
  const [useFreeTrial, setUseFreeTrial] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    companyName: "",
    email: userEmail || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
  });

  /* =====================
     AUTH GUARD
  ===================== */
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    if (!userEmail && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      alert("Please login to continue");
      onClose();
      navigate("/");
    }
  }, [isOpen, userEmail]);

  /* =====================
     LOAD PLANS
  ===================== */
  useEffect(() => {
    if (!isOpen) return;

    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/public/licenses-by-product/6958ee26be14694144dfb879",
          { headers: { "x-api-key": "my-secret-key-123" } }
        );

        const data = await res.json();

        const mappedPlans = data.licenses.map((lic: any) => {
          // Extract user count from features
          let userCount = 1;
          const rawFeatures = lic.licenseType.features || [];

          if (Array.isArray(rawFeatures)) {
            const userFeatures = [];

            for (const feature of rawFeatures) {
              if (typeof feature === "object") {
                const label = (
                  feature.uiLabel ||
                  feature.displayName ||
                  ""
                ).toLowerCase();
                const key = (feature.featureKey || "").toLowerCase();
                const slug = (feature.featureSlug || "").toLowerCase();
                const value = feature.limitValue ?? feature.value;

                if (feature.featureType === "limit" && typeof value === "number") {
                  const isUserFeature =
                    slug === "user-limit" ||
                    key === "user-limit" ||
                    slug.includes("user") ||
                    key.includes("user") ||
                    label.includes("user");

                  if (isUserFeature) {
                    userFeatures.push({
                      key: slug || key || label,
                      value: value,
                      priority:
                        slug === "user-limit" || key === "user-limit" ? 1 : 2,
                    });
                  }
                }
              } else if (typeof feature === "string") {
                const match = feature.match(/(\d+)\s*users?/i);
                if (match) {
                  userFeatures.push({
                    key: "string-match",
                    value: parseInt(match[1]),
                    priority: 1,
                  });
                }
              }
            }

            if (userFeatures.length > 0) {
              userFeatures.sort((a, b) => {
                if (a.priority !== b.priority) return a.priority - b.priority;
                return b.value - a.value;
              });
              userCount = userFeatures[0].value;
            }
          } else if (typeof rawFeatures === "object" && rawFeatures !== null) {
            const userFeatures = [];

            for (const [slug, value] of Object.entries(rawFeatures)) {
              const slugLower = slug.toLowerCase();

              const isUserFeature =
                slugLower === "user-limit" ||
                slugLower === "users" ||
                slugLower.includes("user-limit") ||
                (slugLower.includes("user") && !slugLower.includes("admin"));

              if (isUserFeature && typeof value === "number" && value > 0) {
                userFeatures.push({
                  key: slug,
                  value: value,
                  priority: slugLower === "user-limit" || slugLower === "users" ? 1 : 2,
                });
              }
            }

            if (userFeatures.length > 0) {
              userFeatures.sort((a, b) => {
                if (a.priority !== b.priority) return a.priority - b.priority;
                return b.value - a.value;
              });
              userCount = userFeatures[0].value;
            }
          }

          console.log(`✅ Plan "${lic.licenseType.name}" has ${userCount} users`);

          return {
            id: lic._id,
            licenseTypeId: lic.licenseType._id,
            name: lic.licenseType.name,
            pricePerUser:
              lic.licenseType.name.toLowerCase() === "starter"
                ? 0
                : lic.licenseType.price?.amount ?? 0,
            includedUsers: userCount,
            period: lic.licenseType.price?.billingPeriod ?? "monthly",
            features: lic.licenseType.features ?? [],
            recommended: lic.licenseType.name.toLowerCase() === "professional",
          };
        });

        setPlans(mappedPlans);
      } catch (err) {
        console.error("Failed to load plans:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [isOpen]);

  useEffect(() => {
    if (plans.length) {
      // Priority: URL param > prop > first plan
      const planToUse = planFromUrl || selectedPlan;
      
      if (planToUse && plans.find(p => p.id === planToUse)) {
        setActivePlan(planToUse);
        console.log("✅ Setting active plan from URL/prop:", planToUse);
      } else if (!activePlan) {
        setActivePlan(plans[0].id);
        console.log("✅ Setting active plan to first plan:", plans[0].id);
      }
    }
  }, [plans, selectedPlan, planFromUrl]);

  useEffect(() => {
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  if (!isOpen || loading || !plans.length) return null;

  /* =====================
     PRICE CALC
  ===================== */
  const currentPlan = plans.find((p) => p.id === activePlan) || plans[0];
  const pricePerUser = currentPlan.pricePerUser ?? 0;
  const userCount = currentPlan.includedUsers;
  const isFreePlan = pricePerUser === 0;

  // Calculate monthly base cost (price per user × number of users)
  const monthlyBaseCost = pricePerUser * userCount;

  // Calculate subtotal based on billing cycle BEFORE discount
  let subtotal = monthlyBaseCost;
  let monthsMultiplier = 1;

  if (billingCycle === "monthly") {
    subtotal = monthlyBaseCost;
    monthsMultiplier = 1;
  } else if (billingCycle === "quarterly") {
    subtotal = monthlyBaseCost * 3;
    monthsMultiplier = 3;
  } else if (billingCycle === "half-yearly") {
    subtotal = monthlyBaseCost * 6;
    monthsMultiplier = 6;
  } else if (billingCycle === "yearly") {
    subtotal = monthlyBaseCost * 12;
    monthsMultiplier = 12;
  }

  // Calculate discount
  let discountPercent = 0;
  let discountAmount = 0;

  if (billingCycle === "quarterly") {
    discountPercent = 5;
    discountAmount = subtotal * 0.05;
  } else if (billingCycle === "half-yearly") {
    discountPercent = 10;
    discountAmount = subtotal * 0.10;
  } else if (billingCycle === "yearly") {
    discountPercent = 20;
    discountAmount = subtotal * 0.20;
  }

  const priceAfterDiscount = subtotal - discountAmount;

  // Calculate GST (18%)
  const gstAmount =
    !isFreePlan && !useFreeTrial
      ? Math.round(priceAfterDiscount * 0.18 * 100) / 100
      : 0;

  const totalWithGst =
    !isFreePlan && !useFreeTrial
      ? Math.round((priceAfterDiscount + gstAmount) * 100) / 100
      : 0;

  const finalAmountDue = useFreeTrial || isFreePlan ? 0 : totalWithGst;

  // Backend billing cycle mapping
  const backendBillingCycleMap: Record<
    "monthly" | "quarterly" | "half-yearly" | "yearly",
    "monthly" | "quarterly" | "half-yearly" | "yearly"
  > = {
    monthly: "monthly",
    quarterly: "quarterly",
    "half-yearly": "half-yearly",
    yearly: "yearly",
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* =====================
     PAYMENT HANDLER
  ===================== */
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail) {
      alert("Please login again");
      return;
    }

    // Validate required fields
    if (!formData.companyName || !formData.phone || !formData.address || 
        !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill in all required billing information");
      return;
    }

    try {
      /* ---- STEP 1: PURCHASE ---- */
      const purchasePayload = {
        name: formData.companyName,
        email: userEmail,
        productId: "6958ee26be14694144dfb879",
        licenseId: currentPlan.id,
        licenseTypeId: currentPlan.licenseTypeId,
        billingCycle: backendBillingCycleMap[billingCycle],
        trial: useFreeTrial || isFreePlan,
        amount: Math.round(finalAmountDue),
        currency: "INR",
        paymentMode: useFreeTrial || isFreePlan ? "free" : "razorpay",
        source: "callifo",
      };

      const purchaseRes = await purchaseLicense(purchasePayload);

      /* ---- FREE / TRIAL FLOW ---- */
      if (useFreeTrial || isFreePlan) {
        navigate("/payment-success?free=true");
        return;
      }

      /* ---- STEP 2: CREATE ORDER ---- */
      const order = await createOrder({
        userId: purchaseRes.userId,
        licenseId: currentPlan.id,
        billingCycle: backendBillingCycleMap[billingCycle],
        amount: Math.round(finalAmountDue * 100),
      });

      if (!order?.orderId || !order?.key) {
        throw new Error("Invalid Razorpay order response");
      }

      /* ---- STEP 3: LOAD RAZORPAY ---- */
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      const correctAmount = Math.round(finalAmountDue * 100);

      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: correctAmount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Callifo",
        prefill: { 
          name: formData.companyName, 
          email: userEmail,
          contact: formData.phone 
        },
        theme: { color: "#06b6d4" },

        handler: async (response: any) => {
          await verifyPayment({
            transactionId: purchaseRes.transactionId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          navigate(`/payment-success?tx=${purchaseRes.transactionId}`);
        },
      });

      rzp.open();
    } catch (error: any) {
      console.error("Checkout failed:", error?.response?.data || error);
      alert(
        error?.response?.data?.message ||
          error.message ||
          "Checkout failed. Please try again."
      );
    }
  };

  const getBillingPeriodText = () => {
    switch (billingCycle) {
      case "monthly":
        return "1 month";
      case "quarterly":
        return "3 months";
      case "half-yearly":
        return "6 months";
      case "yearly":
        return "12 months";
    }
  };

  const getBillingText = () => {
    switch (billingCycle) {
      case "monthly": return "Monthly";
      case "quarterly": return "Quarterly";
      case "half-yearly": return "Half-Yearly";
      case "yearly": return "Yearly";
    }
  };

  const getSavingsPercent = () => {
    switch (billingCycle) {
      case "monthly": return 0;
      case "quarterly": return 5;
      case "half-yearly": return 10;
      case "yearly": return 20;
    }
  };

  /* ===============================
     UI
     =============================== */

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-cyan-50 to-white">
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
              <p className="text-gray-600">
                Just one step away from transforming your call management
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Section - Billing Information & Plan Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Information Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Billing Information</h3>
                <p className="text-gray-600 text-sm mb-6">Enter your company and billing details</p>
                
                {/* Selected Plan Display */}
                <div className="mb-6 p-4 bg-cyan-50 border border-cyan-200 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-medium text-gray-600">Selected Plan:</p>
                        <span className="text-lg font-bold text-cyan-700">{currentPlan.name}</span>
                        {currentPlan.recommended && (
                          <span className="px-2 py-0.5 bg-cyan-500 text-white rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Users className="h-4 w-4" />
                        <span>Includes {currentPlan.includedUsers} users</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-gray-900 text-2xl font-bold">
                          ₹{currentPlan.pricePerUser}
                        </span>
                        <span className="text-gray-600">/user/month</span>
                      </div>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {currentPlan.features
                      .slice(0, 3)
                      .map((feature: any, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                          <span>
                            {feature.uiLabel || feature.displayName}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
                
                <form onSubmit={handleProceedToPayment} id="checkout-form">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Company Name *
                      </label>
                      <div className="relative">
                        <input
                          id="companyName"
                          type="text"
                          placeholder="Enter company name"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          readOnly
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address *
                      </label>
                      <div className="relative">
                        <input
                          id="address"
                          type="text"
                          placeholder="Street address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State *
                      </label>
                      <input
                        id="state"
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    {/* Pincode */}
                    <div className="space-y-2">
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                        Pincode *
                      </label>
                      <input
                        id="pincode"
                        type="text"
                        placeholder="400001"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>

                    {/* GST Number */}
                    <div className="space-y-2">
                      <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">
                        GST Number (Optional)
                      </label>
                      <input
                        id="gstNumber"
                        type="text"
                        placeholder="22AAAAA0000A1Z5"
                        value={formData.gstNumber}
                        onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap gap-6 items-center justify-center bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Lock className="w-5 h-5 text-cyan-600" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Check className="w-5 h-5 text-cyan-600" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Selected Plan</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                        {currentPlan.name}
                      </span>
                      <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                        {getBillingText()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-3">Billing Cycle</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBillingCycle("monthly")}
                        className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                          billingCycle === "monthly"
                            ? "border-cyan-600 bg-cyan-50 text-cyan-700 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle("quarterly")}
                        className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                          billingCycle === "quarterly"
                            ? "border-cyan-600 bg-cyan-50 text-cyan-700 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Quarterly
                        <span className="ml-1 text-green-600">-5%</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle("half-yearly")}
                        className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                          billingCycle === "half-yearly"
                            ? "border-cyan-600 bg-cyan-50 text-cyan-700 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Half-Yearly
                        <span className="ml-1 text-green-600">-10%</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle("yearly")}
                        className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                          billingCycle === "yearly"
                            ? "border-cyan-600 bg-cyan-50 text-cyan-700 font-medium"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        Yearly
                        <span className="ml-1 text-green-600">-20%</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price per user/month</span>
                      <span className="text-gray-900">₹{pricePerUser.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Number of users</span>
                      <span className="text-gray-900">×{userCount}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Billing period</span>
                      <span className="text-gray-900">{getBillingPeriodText()}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-2"></div>
                    
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Discount ({discountPercent}%)</span>
                        <span>-₹{Math.round(discountAmount).toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    {!isFreePlan && !useFreeTrial && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">GST (18%)</span>
                        <span className="text-gray-900">₹{gstAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-gray-900 font-semibold">Total Amount</span>
                      <span className="text-gray-900 text-2xl font-bold">
                        ₹{finalAmountDue.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {!isFreePlan && useFreeTrial && (
                      <p className="text-gray-500 text-xs">
                        You'll be charged ₹{Math.round(totalWithGst).toLocaleString('en-IN')} after
                        your trial ends on{" "}
                        {new Date(
                          Date.now() + 14 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Info Message */}
                {!isFreePlan && useFreeTrial && (
                  <div className="bg-cyan-50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-gray-900 mb-1 font-medium text-sm">
                          Free Trial Active
                        </div>
                        <p className="text-gray-600 text-xs">
                          Enjoy full access for 14 days. We'll remind you
                          before charging.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full px-6 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 hover:shadow-xl transition-all duration-300 mb-4 font-medium flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  {useFreeTrial
                    ? "Start Free Trial"
                    : isFreePlan
                    ? "Start Free Plan"
                    : "Proceed to Payment"}
                </button>

                <div className="space-y-2 text-xs text-gray-500">
                  <p>✓ Secure payment processing</p>
                  <p>✓ Money-back guarantee</p>
                  <p>✓ Cancel anytime</p>
                </div>

                <p className="text-gray-500 text-center text-xs mt-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}