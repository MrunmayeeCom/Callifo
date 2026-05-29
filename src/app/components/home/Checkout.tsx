import { X, Check, CreditCard, Shield, Lock, Users, Zap, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { purchaseLicense } from "../../../../api/license";
import { createOrder, verifyPayment } from "../../../../api/payment";
import { loadRazorpay } from "../../../../utils/loadRazorpay";
import { toast } from "sonner";

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface CheckoutPlan {
  id: string;
  licenseTypeId: string;
  name: string;
  pricePerUser: number | null;
  includedUsers: number;
  period: string;
  features: any[];
  recommended?: boolean;
  discountConfig: {
    monthly: number;
    quarterly: number;
    "half-yearly": number;
    yearly: number;
  };
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

export function Checkout({ isOpen, onClose, selectedPlan }: CheckoutProps) {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();

  const planFromUrl  = searchParams.get("plan");
  const cycleFromUrl = searchParams.get("cycle") as BillingCycle | null;

  const user      = JSON.parse(localStorage.getItem("user") || "null");
  const userEmail = user?.email || null;

  const [plans, setPlans]               = useState<CheckoutPlan[]>([]);
  const [loading, setLoading]           = useState(true);
  const [activePlan, setActivePlan]     = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(cycleFromUrl || "monthly");
  const [useFreeTrial, setUseFreeTrial] = useState(false);
  const [showSuccessModal, setShowSuccessModal]                     = useState(false);
  const [showAlreadyActiveModal, setShowAlreadyActiveModal]         = useState(false);
  const [showFreeAlreadyActiveModal, setShowFreeAlreadyActiveModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal]                     = useState(false);
  const [existingLicenseName, setExistingLicenseName]               = useState<string>("");
  const [existingIsFreePlan, setExistingIsFreePlan]                 = useState<boolean>(false);

  const [formData, setFormData] = useState({
    companyName: "", email: userEmail || "", phone: "",
    address: "", city: "", state: "", pincode: "", gstNumber: "",
  });

  const hasCheckedAuth = useRef(false);

  // Auth guard
  useEffect(() => {
    if (!isOpen) return;
    if (!userEmail && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      toast.warning("Please login to continue.");
      onClose();
      navigate("/");
    }
  }, [isOpen, userEmail]);

  // Check for existing active license on load
  // BUG FIX: Only show the "already active" modal when the user tries to submit,
  // not on page load. Store the existing license info in state but don't show modal yet.
  useEffect(() => {
    if (!isOpen || !userEmail) return;
    const checkExisting = async () => {
      try {
        const res = await fetch(
          `https://license-system-v6ht.onrender.com/api/external/actve-license/${userEmail}?productId=6958ee26be14694144dfb879`,
          { headers: { "x-api-key": "my-secret-key-123" } }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.activeLicense && data.activeLicense.status === "active") {
            const lt = data.activeLicense.licenseTypeId || data.activeLicense.licenseType || {};
            const name = lt.name || "Current";
            const priceAmount = lt.price?.amount ?? null;
            setExistingLicenseName(name);
            setExistingIsFreePlan(Number(priceAmount) === 0);
          }
        }
      } catch (err) {
        console.error("License check failed:", err);
      }
    };
    checkExisting();
  }, [isOpen, userEmail]);

  // Load plans
  useEffect(() => {
    if (!isOpen) return;
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://license-system-v6ht.onrender.com/api/license/public/licenses-by-product/6958ee26be14694144dfb879",
          { headers: { "x-api-key": "my-secret-key-123" } }
        );
        const data = await res.json();
        const mappedPlans = data.licenses.map((lic: any) => {
          let userCount = 1;
          const rawFeatures = lic.licenseType.features || [];
          if (Array.isArray(rawFeatures)) {
            const userFeatures = [];
            for (const feature of rawFeatures) {
              if (typeof feature === "object") {
                const label = (feature.uiLabel || feature.displayName || "").toLowerCase();
                const key   = (feature.featureKey || "").toLowerCase();
                const slug  = (feature.featureSlug || "").toLowerCase();
                const value = feature.limitValue ?? feature.value;
                if (feature.featureType === "limit" && typeof value === "number") {
                  const isUserFeature = slug === "user-limit" || key === "user-limit" || slug.includes("user") || key.includes("user") || label.includes("user");
                  if (isUserFeature) userFeatures.push({ key: slug || key || label, value, priority: slug === "user-limit" || key === "user-limit" ? 1 : 2 });
                }
              } else if (typeof feature === "string") {
                const match = feature.match(/(\d+)\s*users?/i);
                if (match) userFeatures.push({ key: "string-match", value: parseInt(match[1]), priority: 1 });
              }
            }
            if (userFeatures.length > 0) {
              userFeatures.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : b.value - a.value);
              userCount = userFeatures[0].value;
            }
          } else if (typeof rawFeatures === "object" && rawFeatures !== null) {
            const userFeatures = [];
            for (const [slug, value] of Object.entries(rawFeatures)) {
              const slugLower     = slug.toLowerCase();
              const isUserFeature = slugLower === "user-limit" || slugLower === "users" || slugLower.includes("user-limit") || (slugLower.includes("user") && !slugLower.includes("admin"));
              if (isUserFeature && typeof value === "number" && value > 0)
                userFeatures.push({ key: slug, value, priority: slugLower === "user-limit" || slugLower === "users" ? 1 : 2 });
            }
            if (userFeatures.length > 0) {
              userFeatures.sort((a, b) => a.priority !== b.priority ? a.priority - b.priority : b.value - a.value);
              userCount = userFeatures[0].value;
            }
          }
          return {
            id:             lic._id,
            licenseTypeId:  lic.licenseType._id,
            name:           lic.licenseType.name,
            pricePerUser:   lic.licenseType.price?.amount ?? 0,
            includedUsers:  userCount,
            period:         lic.licenseType.price?.billingPeriod ?? "monthly",
            features:       lic.licenseType.features ?? [],
            recommended:    lic.licenseType.name.toLowerCase() === "professional",
            discountConfig: lic.licenseType.discountConfig || { monthly: 0, quarterly: 5, "half-yearly": 10, yearly: 20 },
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
      const planToUse = planFromUrl || selectedPlan;
      if (planToUse && plans.find(p => p.id === planToUse)) {
        setActivePlan(planToUse);
      } else if (!activePlan) {
        setActivePlan(plans[0].id);
      }
    }
  }, [plans, selectedPlan, planFromUrl]);

  useEffect(() => {
    if (userEmail) setFormData(prev => ({ ...prev, email: userEmail }));
  }, [userEmail]);

  if (!isOpen || loading || !plans.length) return null;

  const currentPlan     = plans.find((p) => p.id === activePlan) || plans[0];
  const pricePerUser    = currentPlan.pricePerUser ?? 0;
  const userCount       = currentPlan.includedUsers;
  const isFreePlan      = pricePerUser === 0;
  const monthlyBaseCost = pricePerUser * userCount;

  let subtotal = monthlyBaseCost;
  if (billingCycle === "quarterly")   subtotal = monthlyBaseCost * 3;
  if (billingCycle === "half-yearly") subtotal = monthlyBaseCost * 6;
  if (billingCycle === "yearly")      subtotal = monthlyBaseCost * 12;

  const discountPercent    = currentPlan?.discountConfig?.[billingCycle] ?? 0;
  const discountAmount     = subtotal * (discountPercent / 100);
  const priceAfterDiscount = subtotal - discountAmount;
  const gstAmount          = !isFreePlan && !useFreeTrial ? Math.round(priceAfterDiscount * 0.18 * 100) / 100 : 0;
  const totalWithGst       = !isFreePlan && !useFreeTrial ? Math.round((priceAfterDiscount + gstAmount) * 100) / 100 : 0;
  const finalAmountDue     = useFreeTrial || isFreePlan ? 0 : totalWithGst;

  const backendCycleMap: Record<BillingCycle, BillingCycle> = {
    monthly: "monthly", quarterly: "quarterly", "half-yearly": "half-yearly", yearly: "yearly",
  };

  const handleInputChange = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) { toast.warning("Session expired. Please login again."); return; }
    if (!formData.companyName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.warning("Please fill in all required billing information."); return;
    }

    // If user already has an active FREE plan and tries to activate free again → show upgrade modal
    if (existingLicenseName && existingIsFreePlan && isFreePlan) {
      setShowUpgradeModal(true);
      return;
    }

    // If user already has an active PAID plan and tries to buy same/another paid → show already active
    if (existingLicenseName && !existingIsFreePlan) {
      setShowAlreadyActiveModal(true);
      return;
    }

    try {
      const purchaseRes = await purchaseLicense({
        name: formData.companyName, email: userEmail,
        productId: "6958ee26be14694144dfb879",
        licenseId: currentPlan.id, licenseTypeId: currentPlan.licenseTypeId,
        billingCycle: backendCycleMap[billingCycle],
        trial: useFreeTrial || isFreePlan,
        amount: Math.round(finalAmountDue), currency: "INR",
        paymentMode: useFreeTrial || isFreePlan ? "free" : "razorpay",
        source: "callifo",
      });

      // BUG FIX: Early return for free/trial plans — prevents falling through to
      // createOrder() which would throw an error and show the wrong toast.
      if (useFreeTrial || isFreePlan) {
        setShowSuccessModal(true);
        window.dispatchEvent(new Event("licenseActivated"));
        window.dispatchEvent(new Event("userLoginStatusChanged"));
        setTimeout(() => navigate("/"), 2500);
        return; // ← critical: stop here, do NOT proceed to Razorpay
      }

      const order = await createOrder({ userId: purchaseRes.userId, licenseId: currentPlan.id, billingCycle: backendCycleMap[billingCycle], amount: Math.round(finalAmountDue * 100) });
      if (!order?.orderId || !order?.key) throw new Error("Invalid Razorpay order response");
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      const rzp = new (window as any).Razorpay({
        key: order.key, amount: Math.round(finalAmountDue * 100), currency: order.currency,
        order_id: order.orderId, name: "Callifo",
        prefill: { name: formData.companyName, email: userEmail, contact: formData.phone },
        theme: { color: "#0891b2" },
        handler: async (response: any) => {
          await verifyPayment({ transactionId: purchaseRes.transactionId, razorpay_payment_id: response.razorpay_payment_id, razorpay_order_id: response.razorpay_order_id, razorpay_signature: response.razorpay_signature });
          window.dispatchEvent(new Event("licenseActivated"));
          window.dispatchEvent(new Event("userLoginStatusChanged"));
          navigate(`/payment-success?tx=${purchaseRes.transactionId}&userId=${purchaseRes.userId}`);
        },
      });
      rzp.open();
    } catch (error: any) {
      // BUG FIX: Check if the backend error is "already subscribed" and show the
      // proper modal instead of a generic error toast.
      const msg: string = error?.response?.data?.message || error.message || "";
      if (msg.toLowerCase().includes("already") && msg.toLowerCase().includes("subscription")) {
        if (isFreePlan) {
          setShowFreeAlreadyActiveModal(true);
        } else {
          setShowAlreadyActiveModal(true);
        }
        return;
      }
      toast.error(msg || "Checkout failed. Please try again.");
    }
  };

  const getBillingPeriodText = () => ({ monthly: "1 month", quarterly: "3 months", "half-yearly": "6 months", yearly: "12 months" }[billingCycle]);
  const getBillingText       = () => ({ monthly: "Monthly", quarterly: "Quarterly", "half-yearly": "Half-Yearly", yearly: "Yearly" }[billingCycle]);

  const inputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:bg-white transition-all duration-200 text-sm";
  const labelClass = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .checkout-root * { font-family: 'Inter', sans-serif; }
        .checkout-root { background: #f8fafc; background-image: radial-gradient(circle at 20% 10%, rgba(8,145,178,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 90%, rgba(6,182,212,0.04) 0%, transparent 50%); }
        .card { background: white; border-radius: 20px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04); }
        .cycle-btn { position: relative; padding: 8px 12px; font-size: 12px; font-weight: 500; border-radius: 10px; border: 1.5px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; transition: all 0.18s ease; text-align: center; }
        .cycle-btn:hover { border-color: #0891b2; color: #0891b2; }
        .cycle-btn.active { border-color: #0891b2; background: linear-gradient(135deg, #ecfeff, #f0fdff); color: #0891b2; font-weight: 600; box-shadow: 0 0 0 3px rgba(8,145,178,0.08); }
        .pay-btn { width: 100%; padding: 15px 24px; background: linear-gradient(135deg, #0891b2, #06b6d4); color: white; border: none; border-radius: 14px; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease; letter-spacing: 0.01em; box-shadow: 0 4px 14px rgba(8,145,178,0.25); }
        .pay-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(8,145,178,0.35); background: linear-gradient(135deg, #0e7490, #0891b2); }
        .pay-btn:active { transform: translateY(0); }
        .plan-badge { background: linear-gradient(135deg, #ecfeff, #cffafe); border: 1px solid #a5f3fc; border-radius: 12px; padding: 16px; }
        .divider { height: 1px; background: linear-gradient(to right, transparent, #e2e8f0, transparent); margin: 16px 0; }
        .security-pill { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 100px; font-size: 12px; color: #64748b; font-weight: 500; }
        .step-number { width: 22px; height: 22px; background: linear-gradient(135deg, #0891b2, #06b6d4); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .amount-display { font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 500; color: #0f172a; letter-spacing: -0.02em; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; }
        .summary-label { font-size: 13px; color: #64748b; }
        .summary-value { font-size: 13px; color: #1e293b; font-weight: 500; }
        .discount-value { color: #059669; font-weight: 600; font-size: 13px; }
        .close-btn { padding: 8px; border: 1.5px solid #e2e8f0; border-radius: 10px; background: white; color: #94a3b8; cursor: pointer; transition: all 0.18s; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .close-btn:hover { border-color: #cbd5e1; color: #475569; background: #f8fafc; }
        .modal-overlay { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; background: rgba(15,23,42,0.5); backdrop-filter: blur(8px); padding: 16px; }
        .modal-card { background: white; border-radius: 24px; padding: 44px 40px 40px; max-width: 420px; width: 100%; text-align: center; box-shadow: 0 32px 80px rgba(0,0,0,0.2); position: relative; border-top: 4px solid transparent; background-image: linear-gradient(white, white), linear-gradient(90deg, #06b6d4, #0891b2, #6366f1); background-origin: border-box; background-clip: padding-box, border-box; animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1); }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.88) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-check-ring { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both; }
        @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .modal-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; padding: 5px 14px; border-radius: 100px; margin-bottom: 16px; letter-spacing: 0.03em; }
        .modal-btn { padding: 13px; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s; }
        .checkout-main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 24px; align-items: start; }
        .checkout-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
        .checkout-header-title { font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
        .checkout-header-sub { font-size: 14px; color: #64748b; margin-top: 3px; }
        .order-summary-card { padding: 24px; position: sticky; top: 24px; }
        @media (max-width: 768px) {
          .checkout-main-grid { grid-template-columns: 1fr !important; }
          .checkout-form-grid { grid-template-columns: 1fr !important; }
          .checkout-header-title { font-size: 20px !important; }
          .checkout-header-sub { font-size: 12px !important; }
          .order-summary-card { position: static !important; top: auto !important; padding: 16px !important; }
          .modal-card { padding: 28px 20px 24px !important; border-radius: 18px !important; }
          .amount-display { font-size: 22px !important; }
          .cycle-btn { font-size: 11px !important; padding: 7px 8px !important; }
        }
      `}</style>

      <div className="checkout-root fixed inset-0 z-50 overflow-y-auto">
        <div className="min-h-screen py-6 px-3 sm:py-10 sm:px-4">
          <div className="container mx-auto max-w-6xl">

            {/* Header */}
            <div className="flex items-start justify-between mb-6 sm:mb-8 gap-3">
              <div style={{ minWidth: 0 }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-600 uppercase tracking-widest">Callifo Checkout</span>
                </div>
                <h1 className="checkout-header-title">Complete Your Order</h1>
                <p className="checkout-header-sub">Just one step away from transforming your call management</p>
              </div>
              <button className="close-btn" onClick={onClose}><X className="w-5 h-5" /></button>
            </div>

            <div className="checkout-main-grid">

              {/* LEFT */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div className="step-number">1</div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Selected Plan</span>
                  </div>
                  <div className="plan-badge">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 20, fontWeight: 700, color: '#0891b2' }}>{currentPlan.name}</span>
                          {currentPlan.recommended && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '3px 10px', background: 'linear-gradient(135deg,#0891b2,#06b6d4)', color: 'white', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>
                              <Star className="w-3 h-3" fill="white" /> Recommended
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#475569', marginBottom: 4 }}>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                          <span style={{ fontSize: 22, fontWeight: 500, color: '#0f172a' }}>&#x20B9;{currentPlan.pricePerUser}</span>
                          <span style={{ fontSize: 12, color: '#94a3b8' }}>/user/month</span>
                        </div>
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {currentPlan.features.slice(0, 3).map((feature: any, idx: number) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#475569', marginBottom: 4 }}>
                            <div style={{ width: 16, height: 16, background: '#dcfce7', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Check style={{ width: 10, height: 10, color: '#16a34a' }} />
                            </div>
                            {feature.uiLabel || feature.displayName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div className="step-number">2</div>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Billing Information</span>
                      <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 1 }}>Enter your company and billing details</p>
                    </div>
                  </div>
                  <form onSubmit={handleProceedToPayment} id="checkout-form">
                    <div className="checkout-form-grid">
                      <div><label className={labelClass}>Company Name *</label><input type="text" placeholder="Acme Corp" value={formData.companyName} onChange={e => handleInputChange('companyName', e.target.value)} className={inputClass} required /></div>
                      <div><label className={labelClass}>Email Address *</label><input type="email" value={formData.email} readOnly className={inputClass} style={{ cursor: 'default', color: '#64748b' }} /></div>
                      <div><label className={labelClass}>Phone Number *</label><input type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className={inputClass} required /></div>
                      <div><label className={labelClass}>Address *</label><input type="text" placeholder="Street address" value={formData.address} onChange={e => handleInputChange('address', e.target.value)} className={inputClass} required /></div>
                      <div><label className={labelClass}>City *</label><input type="text" placeholder="Mumbai" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} className={inputClass} required /></div>
                      <div><label className={labelClass}>State *</label><input type="text" placeholder="Maharashtra" value={formData.state} onChange={e => handleInputChange('state', e.target.value)} className={inputClass} required /></div>
                      <div><label className={labelClass}>Pincode *</label><input type="text" placeholder="400001" value={formData.pincode} onChange={e => handleInputChange('pincode', e.target.value)} className={inputClass} required /></div>
                      <div><label className={labelClass}>GST Number <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label><input type="text" placeholder="22AAAAA0000A1Z5" value={formData.gstNumber} onChange={e => handleInputChange('gstNumber', e.target.value)} className={inputClass} /></div>
                    </div>
                  </form>
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', padding: '14px 0' }}>
                  <div className="security-pill"><Shield className="w-3.5 h-3.5" style={{ color: '#0891b2' }} /> SSL Secured</div>
                  <div className="security-pill"><Lock className="w-3.5 h-3.5" style={{ color: '#0891b2' }} /> 256-bit Encryption</div>
                  <div className="security-pill"><Check className="w-3.5 h-3.5" style={{ color: '#0891b2' }} /> PCI Compliant</div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="card order-summary-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div className="step-number">3</div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#1e293b' }}>Order Summary</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                  <span style={{ padding: '5px 12px', background: '#f0fdff', border: '1px solid #a5f3fc', color: '#0891b2', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{currentPlan.name}</span>
                  <span style={{ padding: '5px 12px', background: '#f0fdff', border: '1px solid #a5f3fc', color: '#0891b2', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>{getBillingText()}</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Billing Cycle</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                  <button type="button" className={`cycle-btn ${billingCycle === 'monthly' ? 'active' : ''}`} onClick={() => setBillingCycle("monthly")}>Monthly</button>
                  {(["quarterly", "half-yearly", "yearly"] as BillingCycle[]).map(cycle => {
                    const pct = currentPlan?.discountConfig?.[cycle] ?? 0;
                    const labels: Record<string, string> = { quarterly: "Quarterly", "half-yearly": "Half-Yearly", yearly: "Yearly" };
                    return (
                      <button key={cycle} type="button" className={`cycle-btn ${billingCycle === cycle ? 'active' : ''}`} onClick={() => setBillingCycle(cycle)}>
                        {labels[cycle]}{pct > 0 && <span style={{ marginLeft: 4, color: '#059669', fontWeight: 700 }}>&minus;{pct}%</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="divider" />
                <div style={{ marginBottom: 4 }}>
                  <div className="summary-row"><span className="summary-label">Price per user/month</span><span className="summary-value">&#x20B9;{pricePerUser.toLocaleString('en-IN')}</span></div>
                  <div className="summary-row"><span className="summary-label">Number of users</span><span className="summary-value">x{userCount}</span></div>
                  <div className="summary-row"><span className="summary-label">Billing period</span><span className="summary-value">{getBillingPeriodText()}</span></div>
                </div>
                <div className="divider" />
                <div>
                  <div className="summary-row"><span className="summary-label" style={{ fontWeight: 600 }}>Subtotal</span><span className="summary-value">&#x20B9;{Math.round(subtotal).toLocaleString('en-IN')}</span></div>
                  {discountPercent > 0 && <div className="summary-row"><span style={{ fontSize: 13, color: '#059669', fontWeight: 500 }}>Discount ({discountPercent}%)</span><span className="discount-value">&minus;&#x20B9;{Math.round(discountAmount).toLocaleString('en-IN')}</span></div>}
                  {!isFreePlan && !useFreeTrial && <div className="summary-row"><span className="summary-label">GST (18%)</span><span className="summary-value">&#x20B9;{gstAmount.toLocaleString('en-IN')}</span></div>}
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f0fdff, #ecfeff)', border: '1px solid #a5f3fc', borderRadius: 14, padding: '16px', margin: '16px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#475569' }}>Total Amount Due</span>
                    <span className="amount-display">&#x20B9;{finalAmountDue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button type="submit" form="checkout-form" className="pay-btn">
                  <CreditCard className="w-4 h-4" />
                  {useFreeTrial ? "Start Free Trial" : isFreePlan ? "Activate Free Plan" : "Proceed to Payment"}
                </button>
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {["Secure payment processing", "Money-back guarantee", "Cancel anytime"].map(text => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#94a3b8' }}>
                      <Check style={{ width: 11, height: 11, color: '#22c55e', flexShrink: 0 }} /> {text}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 10.5, color: '#cbd5e1', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Upgrade Plan Modal — shown when free user tries to activate free again ── */}
      {showUpgradeModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            {/* Icon */}
            <div className="modal-check-ring" style={{ background: "linear-gradient(135deg, #fef3c7, #fde68a)", boxShadow: "0 0 0 12px rgba(245,158,11,0.08)" }}>
              <Zap style={{ width: 32, height: 32, color: "#d97706" }} />
            </div>

            {/* Badge */}
            <div className="modal-chip" style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)", border: "1px solid #fde68a", color: "#b45309" }}>
              <Check style={{ width: 11, height: 11 }} /> {existingLicenseName} Plan Active
            </div>

            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 8, marginTop: 0 }}>
              You're already on the Free Plan
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 4, marginTop: 0 }}>
              Your <strong style={{ color: "#d97706" }}>{existingLicenseName}</strong> plan is currently active. You can't purchase the same free plan again.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginTop: 0, marginBottom: 20 }}>
              Want more features? Upgrade to a paid plan and unlock the full power of Callifo.
            </p>

            {/* Paid plan quick-pick */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
              {plans.filter(p => (p.pricePerUser ?? 0) > 0).map(p => (
                <button
                  key={p.id}
                  className="modal-btn"
                  onClick={() => {
                    setShowUpgradeModal(false);
                    setActivePlan(p.id);
                    setExistingLicenseName(""); // clear so they can now proceed to pay
                    setExistingIsFreePlan(false);
                  }}
                  style={{
                    background: activePlan === p.id
                      ? "linear-gradient(135deg, #0891b2, #06b6d4)"
                      : "#f8fafc",
                    color: activePlan === p.id ? "white" : "#1e293b",
                    border: `1.5px solid ${activePlan === p.id ? "#0891b2" : "#e2e8f0"}`,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px", marginTop: 0,
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={e => {
                    if (activePlan !== p.id) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#0891b2";
                      (e.currentTarget as HTMLElement).style.background = "#f0fdff";
                    }
                  }}
                  onMouseLeave={e => {
                    if (activePlan !== p.id) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0";
                      (e.currentTarget as HTMLElement).style.background = "#f8fafc";
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {p.recommended && <Star style={{ width: 13, height: 13, color: "#f59e0b" }} fill="#f59e0b" />}
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</span>
                    {p.recommended && (
                      <span style={{ fontSize: 10, fontWeight: 700, background: "linear-gradient(135deg,#0891b2,#06b6d4)", color: "white", padding: "2px 8px", borderRadius: 100 }}>
                        Popular
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: activePlan === p.id ? "white" : "#0891b2" }}>
                    ₹{p.pricePerUser}<span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>/user/mo</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="modal-btn"
                onClick={() => { setShowUpgradeModal(false); onClose(); navigate("/"); }}
                style={{ background: "#f1f5f9", color: "#475569", border: "1.5px solid #e2e8f0", flex: 1, marginTop: 0 }}
              >
                Go Back
              </button>
              <button
                className="modal-btn"
                onClick={() => {
                  // Pick first paid plan if none selected, then close modal to continue checkout
                  const firstPaid = plans.find(p => (p.pricePerUser ?? 0) > 0);
                  if (firstPaid && (activePlan === "" || plans.find(p => p.id === activePlan)?.pricePerUser === 0)) {
                    setActivePlan(firstPaid.id);
                  }
                  setExistingLicenseName("");
                  setExistingIsFreePlan(false);
                  setShowUpgradeModal(false);
                }}
                style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4)", color: "white", flex: 1, boxShadow: "0 4px 14px rgba(8,145,178,0.3)", marginTop: 0 }}
              >
                Upgrade Plan →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Already Active Modal — for paid plan users ── */}
      {showAlreadyActiveModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-check-ring" style={{ background: "linear-gradient(135deg, #e0f2fe, #cffafe)", boxShadow: "0 0 0 12px rgba(8,145,178,0.08)" }}>
              <Check style={{ width: 32, height: 32, color: "#0891b2" }} />
            </div>
            <div className="modal-chip" style={{ background: "linear-gradient(135deg, #f0fdff, #ecfeff)", border: "1px solid #a5f3fc", color: "#0891b2" }}>
              <Check style={{ width: 11, height: 11 }} /> {existingLicenseName} Plan
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 10, marginTop: 0 }}>Plan Already Active! ✅</h3>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65, marginBottom: 4, marginTop: 0 }}>
              You already have an active <strong style={{ color: "#0891b2" }}>{existingLicenseName}</strong> plan on your account.
            </p>
            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginTop: 0 }}>
              Head to your dashboard to continue, or close this to manage your plan.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button className="modal-btn" onClick={() => { setShowAlreadyActiveModal(false); onClose(); }}
                style={{ background: "#f1f5f9", color: "#475569", border: "1.5px solid #e2e8f0", flex: 1, marginTop: 0 }}>
                Close
              </button>
              <button className="modal-btn" onClick={() => { setShowAlreadyActiveModal(false); onClose(); navigate("/"); }}
                style={{ background: "linear-gradient(135deg, #0891b2, #06b6d4)", color: "white", flex: 1, boxShadow: "0 4px 14px rgba(8,145,178,0.3)", marginTop: 0 }}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Activation Success Modal ── */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-check-ring" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', boxShadow: '0 0 0 12px rgba(34,197,94,0.08)' }}>
              <Check style={{ width: 32, height: 32, color: '#16a34a' }} />
            </div>
            <div className="modal-chip" style={{ background: 'linear-gradient(135deg, #f0fdff, #ecfeff)', border: '1px solid #a5f3fc', color: '#0891b2' }}>
              <Check style={{ width: 11, height: 11 }} /> {currentPlan.name} Activated
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: 10, marginTop: 0 }}>You are all set! 🎉</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, marginBottom: 8, marginTop: 0 }}>
              Your <strong style={{ color: '#0891b2' }}>{currentPlan.name}</strong> plan is now active. Start exploring Callifo and unlock your team productivity.
            </p>
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 0 }}>Redirecting to home...</p>
          </div>
        </div>
      )}
    </>
  );
}