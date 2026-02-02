import { Check, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PricingPlan {
  id: string;
  licenseTypeId: string;
  name: string;
  icon: any;
  description: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  gradient: string;
  buttonStyle: string;
}

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

// INR formatter 🇮🇳
const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export function Pricing() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  /* ---------------- HELPERS ---------------- */

  const getPrice = (plan: PricingPlan) => {
    if (plan.price === 0) return 0;

    if (billingCycle === "monthly") return plan.price;
    if (billingCycle === "quarterly") return plan.price * 3 * 0.95; // 5% discount
    if (billingCycle === "half-yearly") return plan.price * 6 * 0.90; // 10% discount
    return plan.price * 12 * 0.80; // 20% discount
  };

  const getBillingText = () => {
    if (billingCycle === "monthly") return "/user/month";
    if (billingCycle === "quarterly") return "/user/quarter";
    if (billingCycle === "half-yearly") return "/user/6 months";
    return "/user/year";
  };

  const getDiscountText = () => {
    if (billingCycle === "quarterly") return "Save 5%";
    if (billingCycle === "half-yearly") return "Save 10%";
    if (billingCycle === "yearly") return "Save 20%";
    return "";
  };

  // Handle plan CTA click
  const handlePlanClick = (planId: string, planName: string) => {
    console.log('🔵 Selected plan:', planName, 'ID:', planId, 'Cycle:', billingCycle);
    
    if (!isLoggedIn) {
      navigate("/", {
        state: { 
          openLogin: true, 
          redirectTo: `/checkout?plan=${planId}&cycle=${billingCycle}` 
        },
      });
      return;
    }

    // Navigate with query params instead of path params
    navigate(`/checkout?plan=${planId}&cycle=${billingCycle}`);
  };

  // Fetch pricing plans
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/public/licenses-by-product/6958ee26be14694144dfb879",
          {
            headers: {
              "x-api-key": "my-secret-key-123",
            },
          }
        );

        const data = await res.json();

        const mappedPlans: PricingPlan[] = data.licenses
          .filter((lic: any) => lic?.licenseType?.name)
          .map((lic: any) => {
            const name = lic.licenseType.name;
            const key = name.toLowerCase();

            const isPro = key === "pro" || key === "professional";
            const isStarter = key === "starter" || key === "basic" || key === "free";

            return {
              id: lic._id,
              licenseTypeId: lic.licenseType._id,
              name,
              description: lic.licenseType.description || `Best suited for ${name} users`,
              price: lic.licenseType.price?.amount ?? 0,
              period: lic.licenseType.price?.billingPeriod ?? "",
              features: Array.isArray(lic.licenseType.features)
                ? lic.licenseType.features.map(
                    (f: any) =>
                      f.uiLabel || f.displayName || f.featureSlug
                  )
                : [],
              highlighted: isPro,
              icon: isStarter ? Zap : Sparkles,
              gradient: isStarter
                ? "from-cyan-400 to-blue-500"
                : "from-cyan-400 to-teal-500",
              buttonStyle: isPro
                ? "bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-xl"
                : "border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-50",
            };
          });

        setPricingPlans(mappedPlans);
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
      <section className="py-20 text-center text-gray-600">
        Loading pricing plans...
      </section>
    );
  }

  return (
    <section
      id="pricing"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-cyan-50/30 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </div>

          <h2 className="text-2xl text-gray-900">
            Choose the Perfect Plan for Your Business
          </h2>

          {/* Billing Cycle Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex h-auto p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white shadow-sm text-cyan-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("quarterly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === "quarterly"
                    ? "bg-white shadow-sm text-cyan-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Quarterly{" "}
                <span className="ml-1 text-xs text-green-600 font-medium">-5%</span>
              </button>
              <button
                onClick={() => setBillingCycle("half-yearly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === "half-yearly"
                    ? "bg-white shadow-sm text-cyan-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Half-Yearly{" "}
                <span className="ml-1 text-xs text-green-600 font-medium">-10%</span>
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md transition-all ${
                  billingCycle === "yearly"
                    ? "bg-white shadow-sm text-cyan-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly{" "}
                <span className="ml-1 text-xs text-green-600 font-medium">-20%</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards - 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const finalPrice = getPrice(plan);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-white shadow-2xl ring-2 ring-cyan-500 scale-105 hover:scale-110"
                    : "bg-white shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${plan.gradient}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-gray-900">{plan.name}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    {plan.price === 0 ? (
                      <span className="text-3xl text-gray-900">Free</span>
                    ) : (
                      <>
                        <span className="text-3xl text-gray-900">
                          {formatINR(finalPrice)}
                        </span>
                        <span className="text-gray-600">{getBillingText()}</span>
                      </>
                    )}
                  </div>

                  {plan.price > 0 && getDiscountText() && (
                    <p className="text-sm text-green-600 mt-2 font-medium">
                      {getDiscountText()}
                    </p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3">
                      <Check className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handlePlanClick(plan.id, plan.name)}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${plan.buttonStyle}`}
                >
                  {plan.price === 0 ? "Start Free Plan" : "Buy Now"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500">
            Need a custom solution?{" "}
            <a href="#contact" className="text-cyan-600 hover:underline font-medium">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}