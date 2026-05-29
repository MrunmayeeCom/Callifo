import { Check, Zap, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface PricingPlan {
  id: string;
  licenseTypeId: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  highlighted: boolean;
  discountConfig: {
    monthly: number;
    quarterly: number;
    "half-yearly": number;
    yearly: number;
  };
}

type BillingPeriod = "monthly" | "quarterly" | "halfyearly" | "yearly";

const billingOptions: { key: BillingPeriod; label: string; discount?: string }[] = [
  { key: "monthly",    label: "Monthly" },
  { key: "quarterly",  label: "Quarterly",   discount: "-5%"  },
  { key: "halfyearly", label: "Half-Yearly", discount: "-10%" },
  { key: "yearly",     label: "Yearly",      discount: "-20%" },
];

const billingCycleMap: Record<BillingPeriod, "monthly" | "quarterly" | "half-yearly" | "yearly"> = {
  monthly:    "monthly",
  quarterly:  "quarterly",
  halfyearly: "half-yearly",
  yearly:     "yearly",
};

const periodLabels: Record<BillingPeriod, string> = {
  monthly:    "/user/month",
  quarterly:  "/user/quarter",
  halfyearly: "/user/6 months",
  yearly:     "/user/year",
};

const monthsMap: Record<BillingPeriod, number> = {
  monthly:    1,
  quarterly:  3,
  halfyearly: 6,
  yearly:     12,
};

export function PricingSection({ onNavigateToContact }: { onNavigateToContact?: () => void }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("user")));

useEffect(() => {
  const handleLoginChange = () => {
    setIsLoggedIn(Boolean(localStorage.getItem("user")));
  };
  window.addEventListener("userLoggedIn", handleLoginChange);
  window.addEventListener("userLoginStatusChanged", handleLoginChange);
  return () => {
    window.removeEventListener("userLoggedIn", handleLoginChange);
    window.removeEventListener("userLoginStatusChanged", handleLoginChange);
  };
}, []);

  const [billing, setBilling]           = useState<BillingPeriod>("monthly");
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading]           = useState(true);

  const getPrice = (plan: PricingPlan): number => {
    if (plan.price === 0) return 0;
    const apiCycle    = billingCycleMap[billing];
    const discountPct = plan.discountConfig?.[apiCycle] ?? 0;
    return plan.price * monthsMap[billing] * (1 - discountPct / 100);
  };

  const getSaving = (plan: PricingPlan): string | null => {
    if (plan.price === 0) return null;
    const apiCycle = billingCycleMap[billing];
    const pct      = plan.discountConfig?.[apiCycle] ?? 0;
    return pct > 0 ? `Save ${pct}%` : null;
  };

  const handlePlanClick = (plan: PricingPlan) => {
    // ── Not logged in: save intent + open login modal ──
    if (!isLoggedIn) {
      sessionStorage.setItem(
        "pendingPlan",
        JSON.stringify({
          planId: plan.id,
          cycle:  billingCycleMap[billing],
          isFree: plan.price === 0,
        })
      );
      window.dispatchEvent(new Event("openLoginModal"));
      return;
    }

    // ── Logged in: go to checkout for both free and paid plans ──
    // Free plan: CheckoutPage detects price=0, skips payment, shows success modal
    navigate(`/checkout?plan=${plan.id}&cycle=${billingCycleMap[billing]}`);
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://license-system-v6ht.onrender.com/api/license/public/licenses-by-product/6958ee26be14694144dfb879",
          { headers: { "x-api-key": "my-secret-key-123" } }
        );
        const data = await res.json();

        const mapped: PricingPlan[] = data.licenses
          .filter((lic: any) => lic?.licenseType?.name)
          .map((lic: any) => {
            const name  = lic.licenseType.name;
            const key   = name.toLowerCase();
            const isPro = key === "pro" || key === "professional";
            return {
              id:            lic._id,
              licenseTypeId: lic.licenseType._id,
              name,
              description:   lic.licenseType.description || `Best suited for ${name} users`,
              price:         lic.licenseType.price?.amount ?? 0,
              features:      Array.isArray(lic.licenseType.features)
                ? lic.licenseType.features.map(
                    (f: any) => f.uiLabel || f.displayName || f.featureSlug
                  )
                : [],
              highlighted:   isPro,
              discountConfig: lic.licenseType.discountConfig || {
                monthly: 0, quarterly: 5, "half-yearly": 10, yearly: 20,
              },
            };
          });

        setPricingPlans(mapped);
      } catch (error) {
        console.error("Failed to load pricing plans", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  if (loading) {
    return (
      <section className="ps-wrap" style={{ textAlign: "center", color: "#64748b" }}>
        Loading pricing plans...
      </section>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .ps-wrap { font-family: 'Inter', sans-serif; background: #f8fafc; padding: 60px 0 72px; }
        .ps-inner { max-width: 980px; margin: 0 auto; padding: 0 20px; }
        .ps-header { text-align: center; margin-bottom: 12px; }
        .ps-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 32px; font-weight: 800; color: #0f172a;
          margin-bottom: 6px; letter-spacing: -0.02em; line-height: 1.15;
          background: none; padding: 0; border-radius: 0; flex-wrap: wrap; justify-content: center;
        }
        .ps-eyebrow-blue { color: #0ea5e9; }
        .ps-title { font-size: 14px; font-weight: 500; color: #64748b; margin: 0; line-height: 1.5; padding: 0 8px; }

        /* Billing toggle — scrollable on mobile */
        .ps-billing-wrap { margin-bottom: 32px; margin-top: 12px; }
        .ps-billing {
          display: flex; align-items: center; justify-content: center; gap: 4px;
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 100px; padding: 4px;
          width: fit-content;
          margin-left: auto; margin-right: auto;
        }
        .ps-bill-btn {
          padding: 6px 8px; border-radius: 100px; font-size: 10px; font-weight: 500;
          cursor: pointer; border: none; background: transparent; color: #64748b;
          font-family: 'Inter', sans-serif; transition: all 0.18s ease; white-space: nowrap;
        }
        .ps-bill-btn.active { background: #0ea5e9; color: #fff; font-weight: 600; }
        .ps-bill-discount { font-size: 10px; color: #10b981; font-weight: 600; margin-left: 2px; }
        .ps-bill-btn.active .ps-bill-discount { color: #ffffff; }

        /* Grid — single column on mobile */
        .ps-grid { display: grid; grid-template-columns: 1fr; gap: 24px; align-items: start; }

        .ps-card { background: #fff; border-radius: 20px; padding: 24px 20px; border: 1.5px solid #e2e8f0; position: relative; }
        .ps-card.popular { border-color: #0ea5e9; box-shadow: 0 8px 40px rgba(14,165,233,0.15); margin-top: 18px; }
        .ps-popular-badge {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          background: #0ea5e9; color: #fff; font-size: 11px; font-weight: 700;
          padding: 4px 16px; border-radius: 100px; white-space: nowrap; letter-spacing: 0.02em;
        }
        .ps-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .ps-plan-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ps-plan-icon svg { width: 18px; height: 18px; }
        .ps-plan-name { font-size: 18px; font-weight: 700; margin: 0; }
        .ps-plan-desc { font-size: 12px; color: #94a3b8; margin: 0 0 16px 0; font-weight: 400; }
        .ps-price-row { margin-bottom: 4px; }
        .ps-price-free { font-size: 36px; font-weight: 800; color: #0f172a; }
        .ps-price-amount { font-size: 32px; font-weight: 800; color: #0f172a; }
        .ps-price-currency { font-size: 20px; font-weight: 700; color: #0f172a; vertical-align: super; }
        .ps-price-period { font-size: 13px; color: #94a3b8; font-weight: 400; margin-left: 4px; }
        .ps-saving { font-size: 12px; color: #10b981; font-weight: 600; margin-bottom: 16px; min-height: 18px; }
        .ps-btn {
          width: 100%; padding: 11px 0; border-radius: 10px; font-size: 14px; font-weight: 600;
          cursor: pointer; border: none; font-family: 'Inter', sans-serif;
          margin-bottom: 20px; transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .ps-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .ps-btn-outline { background: transparent; border: 1.5px solid #cbd5e1; color: #334155; }
        .ps-btn-fill { background: #0ea5e9; color: #fff; }
        .ps-divider { height: 1px; background: #f1f5f9; margin-bottom: 18px; }
        .ps-features-scroll { max-height: 240px; overflow-y: auto; padding-right: 4px; }
        .ps-features-scroll::-webkit-scrollbar { width: 4px; }
        .ps-features-scroll::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 4px; }
        .ps-features-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .ps-features-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .ps-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .ps-feature-item { display: flex; align-items: flex-start; gap: 9px; font-size: 12.5px; color: #475569; font-weight: 400; line-height: 1.5; }
        .ps-check { width: 16px; height: 16px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .ps-check svg { width: 9px; height: 9px; color: #0ea5e9; stroke-width: 3; }
        .ps-bottom { text-align: center; margin-top: 28px; font-size: 13px; color: #94a3b8; }
        .ps-bottom a { color: #0ea5e9; font-weight: 600; text-decoration: none; }
        .ps-bottom a:hover { text-decoration: underline; }

        /* Tablet and up — restore 2-col layout */
        @media (min-width: 640px) {
          .ps-wrap { padding: 80px 0 88px; }
          .ps-inner { padding: 0 32px; }
          .ps-eyebrow { font-size: 42px; }
          .ps-title { font-size: 15px; }
          .ps-grid { grid-template-columns: 1fr 1.1fr; gap: 20px; }
          .ps-card { padding: 28px 24px; }
          .ps-card.popular { margin-top: 0; }
          .ps-bill-btn { padding: 7px 18px; font-size: 13px; }
          .ps-bill-discount { font-size: 11px; }
          .ps-billing-wrap { margin-bottom: 40px; }
        }
      `}</style>

      <section id="pricing" className="ps-wrap">
        <div className="ps-inner">

          <div className="ps-header">
            <div className="ps-eyebrow">
              Simple, Transparent<span className="ps-eyebrow-blue">&nbsp;Pricing</span>
            </div>
            <p className="ps-title">Choose the Perfect Plan for Your Business</p>
          </div>

          <div className="ps-billing-wrap">
            <div className="ps-billing">
              {billingOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`ps-bill-btn ${billing === opt.key ? "active" : ""}`}
                  onClick={() => setBilling(opt.key)}
                >
                  {opt.label}
                  {opt.discount && <span className="ps-bill-discount">{opt.discount}</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="ps-grid">
            {pricingPlans.map((plan) => {
              const isStarter  = plan.price === 0;
              const finalPrice = getPrice(plan);
              const saving     = getSaving(plan);

              return (
                <div key={plan.id} className={`ps-card ${plan.highlighted ? "popular" : ""}`}>
                  {plan.highlighted && (
                    <div className="ps-popular-badge">Most Popular</div>
                  )}
                  <div className="ps-card-head">
                    <div className="ps-plan-icon" style={{ background: isStarter ? "#fef9c3" : "#e0f2fe" }}>
                      {isStarter
                        ? <Star size={18} color="#eab308" fill="#eab308" />
                        : <Zap  size={18} color="#0ea5e9" fill="#0ea5e9" />
                      }
                    </div>
                    <h3 className="ps-plan-name" style={{ color: plan.highlighted ? "#0ea5e9" : "#0f172a" }}>
                      {plan.name}
                    </h3>
                  </div>

                  <p className="ps-plan-desc">{plan.description}</p>

                  <div className="ps-price-row">
                    {isStarter ? (
                      <span className="ps-price-free">Free</span>
                    ) : (
                      <>
                        <span className="ps-price-currency">₹</span>
                        <span className="ps-price-amount">
                          {finalPrice % 1 === 0
                            ? finalPrice.toLocaleString("en-IN")
                            : finalPrice.toFixed(1)}
                        </span>
                        <span className="ps-price-period">{periodLabels[billing]}</span>
                      </>
                    )}
                  </div>

                  <div className="ps-saving">{saving || <>&nbsp;</>}</div>

                  <button
                    className={`ps-btn ${isStarter ? "ps-btn-outline" : "ps-btn-fill"}`}
                    onClick={() => handlePlanClick(plan)}
                  >
                    {isStarter ? "Start Free Plan" : "Buy Now"}
                  </button>

                  <div className="ps-divider" />

                  <div className="ps-features-scroll">
                    <ul className="ps-features">
                      {plan.features.map((f, i) => (
                        <li key={i} className="ps-feature-item">
                          <span className="ps-check"><Check /></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ps-bottom">
            Need a custom solution?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>
              Contact our sales team
            </a>
          </div>

        </div>
      </section>
    </>
  );
}

export default PricingSection;