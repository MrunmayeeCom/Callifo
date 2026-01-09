import { X, Check, CreditCard, Shield, Lock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { purchaseLicense } from "../api/license";
import { createOrder, verifyPayment } from "../api/payment";
import { loadRazorpay } from "../utils/loadRazorpay";

interface CheckoutPlan {
  id: string;
  licenseTypeId: string;
  name: string;
  price: number | null;
  period: string;
  features: any[];
  recommended?: boolean;
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Checkout({ isOpen, onClose }: CheckoutProps) {
  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user") || "null");
const userEmail = user?.email || null;
const safeName = user?.name || userEmail?.split("@")[0] || "Callifo User";


  /* =====================
     STATE
  ===================== */
  const [plans, setPlans] = useState<CheckoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState<string>("");
  const [billingCycle, setBillingCycle] =
    useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [useFreeTrial, setUseFreeTrial] = useState(false);

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
          "https://lisence-system.onrender.com/api/license/licenses-by-product/6958ee26be14694144dfb879",
          { headers: { "x-api-key": "my-secret-key-123" } }
        );

        const data = await res.json();

        const mappedPlans = data.licenses.map((lic: any) => ({
          id: lic._id,
          licenseTypeId: lic.licenseType._id,
          name: lic.licenseType.name,
          price:
            lic.licenseType.name.toLowerCase() === "starter"
              ? 0
              : lic.licenseType.price?.amount ?? 0,
          period: lic.licenseType.price?.billingPeriod ?? "monthly",
          features: lic.licenseType.features ?? [],
          recommended:
            lic.licenseType.name.toLowerCase() === "professional",
        }));

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
    if (plans.length && !activePlan) {
      setActivePlan(plans[0].id);
    }
  }, [plans]);

  if (!isOpen || loading || !plans.length) return null;

  /* =====================
     PRICE CALC
  ===================== */
  const currentPlan = plans.find((p) => p.id === activePlan) || plans[0];
  const monthlyPrice = currentPlan.price ?? 0;
  const isFreePlan = monthlyPrice === 0;

  // Calculate prices based on billing cycle
  let basePrice = monthlyPrice;
  let multiplier = 1;
  let discount = 0;
  let discountAmount = 0;

  if (billingCycle === "monthly") {
    multiplier = 1;
    discount = 0;
  } else if (billingCycle === "quarterly") {
    multiplier = 3;
    discount = 0.1;
    basePrice = monthlyPrice * 3;
    discountAmount = basePrice * 0.1;
  } else if (billingCycle === "yearly") {
    multiplier = 12;
    discount = 0.2;
    basePrice = monthlyPrice * 12;
    discountAmount = basePrice * 0.2;
  }

  const totalPrice = Math.round(basePrice * (1 - discount));
  const amountDueToday = useFreeTrial || isFreePlan ? 0 : totalPrice;

  /* =====================
   GST CALC (Frontend)
===================== */
const GST_RATE = 0.18;

// GST only applies if not free plan & not free trial
const gstAmount =
  !isFreePlan && !useFreeTrial
    ? Math.round(totalPrice * GST_RATE * 100) / 100
    : 0;

const totalWithGst =
  !isFreePlan && !useFreeTrial
    ? Math.round((totalPrice + gstAmount) * 100) / 100
    : 0;

const finalAmountDue =
  useFreeTrial || isFreePlan ? 0 : totalWithGst;


  // Backend billing cycle mapping
  const backendBillingCycleMap: Record<
    "monthly" | "quarterly" | "yearly",
    "monthly" | "yearly"
  > = {
    monthly: "monthly",
    quarterly: "monthly",
    yearly: "yearly",
  };

  /* =====================
     PAYMENT HANDLER
  ===================== */
  const handleProceedToPayment = async () => {
    if (!userEmail) {
      alert("Please login again");
      return;
    }

    try {
      /* ---- STEP 1: PURCHASE ---- */
      const purchasePayload = {
        name: safeName,
        email: userEmail,
        productId: "6958ee26be14694144dfb879",
        licenseId: currentPlan.id,
        licenseTypeId: currentPlan.licenseTypeId,
        billingCycle: backendBillingCycleMap[billingCycle],
        interval: backendBillingCycleMap[billingCycle],
        trial: useFreeTrial || isFreePlan,
        amount: Math.round(amountDueToday),
        currency: "INR",
        paymentMode: useFreeTrial || isFreePlan ? "free" : "razorpay",
        source: "callifo",
      };

      const purchaseRes = await purchaseLicense(purchasePayload);

      /* ---- FREE / TRIAL FLOW ---- */
      if (useFreeTrial || isFreePlan) {
        // navigate(`/payment-success?tx=${purchaseRes.transactionId}`);
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

      // Override the amount from backend with frontend calculated amount
      const correctAmount = Math.round(finalAmountDue * 100);

      const rzp = new (window as any).Razorpay({
        key: order.key,
        amount: correctAmount, // ✅ Use frontend calculated amount instead of backend
        currency: order.currency,
        order_id: order.orderId,
        name: "Callifo",
        prefill: { name: safeName, email: userEmail },
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

  /* ===============================
     UI
     =============================== */

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Complete Your Order</h1>
                <p className="text-gray-600">
                  Choose your plan and start your free trial
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Section - Plan Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Billing Cycle Toggle */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-gray-900 mb-4">Select Billing Cycle</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                      billingCycle === "monthly"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-gray-900">Monthly</div>
                    <div className="text-gray-600">Pay monthly</div>
                  </button>
                  <button
                    onClick={() => setBillingCycle("quarterly")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all relative ${
                      billingCycle === "quarterly"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-cyan-500 text-white rounded-full text-sm">
                      Save 10%
                    </div>
                    <div className="text-gray-900">Quarterly</div>
                    <div className="text-gray-600">Pay quarterly</div>
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all relative ${
                      billingCycle === "yearly"
                        ? "border-cyan-600 bg-cyan-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="absolute -top-3 right-4 px-3 py-1 bg-cyan-500 text-white rounded-full text-sm">
                      Save 20%
                    </div>
                    <div className="text-gray-900">Yearly</div>
                    <div className="text-gray-600">Pay annually</div>
                  </button>
                </div>
              </div>

              {/* Plan Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-gray-900 mb-6">Choose Your Plan</h3>
                <div className="space-y-4">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setActivePlan(plan.id);
                        navigate(`/checkout/${plan.name.toLowerCase()}`);
                      }}
                      className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                        activePlan === plan.id
                          ? "border-cyan-600 bg-cyan-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-gray-900">{plan.name}</h4>
                            {plan.recommended && (
                              <span className="px-2 py-1 bg-cyan-500 text-white rounded-full text-sm">
                                Recommended
                              </span>
                            )}
                          </div>
                          <div className="mt-2">
                            <div className="flex items-baseline gap-2">
                              <span className="text-gray-900 text-3xl">
                                ₹{plan.price}
                              </span>
                              <span className="text-gray-600">/month</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            activePlan === plan.id
                              ? "border-cyan-600 bg-cyan-600"
                              : "border-gray-300"
                          }`}
                        >
                          {activePlan === plan.id && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {plan.features
                          .slice(0, 3)
                          .map((feature: any, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <Check className="w-4 h-4 text-cyan-600" />
                              <span>
                                {feature.uiLabel || feature.displayName}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap gap-6 items-center justify-center bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Lock className="w-5 h-5 text-cyan-600" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-cyan-600" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-gray-900 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Plan</span>
                    <span>{currentPlan.name}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Billing Cycle</span>
                    <span className="capitalize">{billingCycle}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>
                      Price per{" "}
                      {billingCycle === "monthly"
                        ? "month"
                        : billingCycle === "quarterly"
                        ? "quarter"
                        : "year"}
                    </span>
                    <span>₹{Math.round(basePrice)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Discount ({discount * 100}%)</span>
                      <span>-₹{Math.round(discountAmount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>

                    {!isFreePlan && !useFreeTrial && (
                      <div className="flex justify-between text-gray-700">
                        <span>GST (18%)</span>
                        <span>₹{gstAmount}</span>
                      </div>
                    )}


                    {/* Trial Checkbox */}
                    {!isFreePlan && (
                      <div className="bg-cyan-50 rounded-lg p-3">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={useFreeTrial}
                            onChange={(e) => setUseFreeTrial(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="text-gray-900">
                              Start 14-Day Free Trial
                            </div>
                            <p className="text-gray-600 text-sm">
                              No charge today. Cancel anytime during trial.
                            </p>
                          </div>
                        </label>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-900">Amount Due Today</span>
                        <span className="text-gray-900 text-2xl">
                          ₹{finalAmountDue}
                        </span>
                      </div>
                      {!isFreePlan && useFreeTrial && (
                        <p className="text-gray-500 text-sm">
                          You'll be charged ₹{totalPrice} after your trial ends
                          on{" "}
                          {new Date(
                            Date.now() + 14 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
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
                        <div className="text-gray-900 mb-1">
                          Free Trial Active
                        </div>
                        <p className="text-gray-600">
                          Enjoy full access for 14 days. We'll remind you
                          before charging.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleProceedToPayment}
                  className="w-full px-6 py-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4"
                >
                  {useFreeTrial
                    ? "Start Free Trial"
                    : isFreePlan
                    ? "Start Free Plan"
                    : "Proceed to Payment"}
                </button>

                <p className="text-gray-500 text-center text-sm">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}