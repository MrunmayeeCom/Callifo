import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PricingPlan {
  id: string;
  name: string;
  icon: any;
  description: string;
  price: string | "Custom";
  period: string;
  features: string[];
  highlighted: boolean;
  gradient: string;
  buttonStyle: string;
}

const PLAN_ROUTE_MAP: Record<string, string> = {
  starter: "free",
  basic: "free",
  free: "free",
  pro: "professional",
  professional: "professional",
};

// INR formatter 🇮🇳
const formatINR = (value: string | number) =>
  `₹${Number(value).toLocaleString("en-IN")}`;

export function Pricing() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle plan CTA click
  const handlePlanClick = (planName: string) => {
    const slug = PLAN_ROUTE_MAP[planName.toLowerCase()];
    if (!slug) return;

    const checkoutPath = `/checkout/${slug}`;

    if (!isLoggedIn) {
      navigate("/", {
        state: { openLogin: true, redirectTo: checkoutPath },
      });
      return;
    }

    navigate(checkoutPath);
  };

  // Fetch pricing plans
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://lisence-system.onrender.com/api/license/licenses-by-product/6958ee26be14694144dfb879",
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
            const isStarter = key === "starter" || key === "basic";

            return {
              id: lic._id,
              name,
              description: `Best suited for ${name} users`,
              price:
                lic.licenseType.price?.amount != null
                  ? String(lic.licenseType.price.amount)
                  : "Custom",
              period: lic.licenseType.price?.billingPeriod ?? "",
              features: Array.isArray(lic.licenseType.features)
                ? lic.licenseType.features.map(
                    (f: any) =>
                      f.uiLabel || f.displayName || f.featureSlug
                  )
                : [],
              highlighted: isPro,
              icon: isStarter ? Zap : isPro ? Sparkles : Crown,
              gradient: isStarter
                ? "from-cyan-400 to-blue-500"
                : isPro
                ? "from-cyan-400 to-teal-500"
                : "from-blue-600 to-indigo-600",
              buttonStyle: isPro
                ? "bg-cyan-400 text-white hover:bg-cyan-500 hover:shadow-xl"
                : "border-2 border-[#003366] text-[#003366] hover:bg-gray-50",
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

          <h2 className="text-gray-900">
            Choose the Perfect Plan for Your Business
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: plan.highlighted ? 1 : 1.05, y: -5 }}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-white shadow-2xl ring-2 ring-cyan-500 scale-105"
                    : "bg-white shadow-lg hover:shadow-xl"
                }`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.gradient} mb-6`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl text-gray-900">
                    {plan.price === "Custom"
                      ? "Custom"
                      : formatINR(plan.price)}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600"> / {plan.period}</span>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3">
                      <Check className="w-4 h-4 text-cyan-500 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handlePlanClick(plan.name)}
                  className={`relative z-20 w-full px-6 py-3 rounded-lg ${plan.buttonStyle}`}
                >
                  {["pro", "professional"].includes(
                    plan.name.toLowerCase()
                  )
                    ? "Buy Now"
                    : "Start Free Trial"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500">
            Need a custom solution?{" "}
            <a href="#contact" className="text-indigo-600 underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
