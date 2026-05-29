import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Users, TrendingUp, Globe, CheckCircle, Target, ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { submitPartnerApplication } from "../../../../api/partnerProgram";
import partnerImage from "../../../assets/callifo5.jpg";
import teamImage from "../../../assets/callifo6.jpg";
import meetingImage from "../../../assets/callifo4.jpg";
// import partnerBgImage from "../../../assets/partnerbackgroundimage.jpg";
// import productBgImage from "../../../assets/productcallifoimage.jpg";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const t = (type: "success" | "error", message: string) =>
  toast[type](message, { style: { fontFamily: "'Inter', sans-serif" } });

// ── DATA ──────────────────────────────────────────────────────────────────────

const benefits = [
  { icon: Award, title: "Grow Your Business", description: "Join a growing community of professionals and grow your revenue with new projects.", gradient: "from-cyan-400 to-blue-500", light: "bg-cyan-50", text: "text-cyan-600" },
  { icon: Users, title: "Access to Leads", description: "Get qualified leads from businesses actively looking for Callifo solutions.", gradient: "from-violet-400 to-purple-600", light: "bg-violet-50", text: "text-violet-600" },
  { icon: TrendingUp, title: "Recurring Revenue", description: "Earn ongoing commissions and build long-term client relationships.", gradient: "from-emerald-400 to-teal-500", light: "bg-emerald-50", text: "text-emerald-600" },
  { icon: Globe, title: "Global Network", description: "Connect with partners worldwide and share best practices.", gradient: "from-rose-400 to-pink-600", light: "bg-rose-50", text: "text-rose-600" },
];

const whyPartner = [
  { title: "No Upfront Costs", description: "Join our partner program at no cost and start earning from day one.", icon: Zap, gradient: "from-cyan-400 to-blue-500", hover: "hover:border-cyan-200", glow: "shadow-cyan-500/20" },
  { title: "Flexible Partnership Models", description: "Choose the partnership level that works best for your business.", icon: Star, gradient: "from-violet-400 to-purple-600", hover: "hover:border-violet-200", glow: "shadow-violet-500/20" },
  { title: "Dedicated Partner Portal", description: "Access resources, track leads, and manage opportunities in one place.", icon: Sparkles, gradient: "from-emerald-400 to-teal-500", hover: "hover:border-emerald-200", glow: "shadow-emerald-500/20" },
  { title: "Growing Market", description: "Tap into the expanding call management solutions market.", icon: TrendingUp, gradient: "from-rose-400 to-pink-600", hover: "hover:border-rose-200", glow: "shadow-rose-500/20" },
];

const productFeatures = [
  { title: "Marketing Support", description: "Co-branded materials and marketing resources" },
  { title: "Training & Certification", description: "Comprehensive partner training programs" },
  { title: "Technical Support", description: "Dedicated partner success team" },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

const mapPartnerType = (type: string) => type === "distributor" ? "distributor" : "channel_partner";
const mapExperience = (exp: string) => ["0-1", "1-3", "3-5", "5-10", "10+"].includes(exp) ? exp : "0-1";
const mapBusinessType = (partnerType: string) => {
  switch (partnerType) {
    case "technology": return "Technology";
    case "reseller": return "Reseller";
    case "implementation": return "Consulting";
    case "channel_partner": return "channel_partner";
    default: return "Other";
  }
};

// ── ANIMATED COUNTER ──────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(current);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const display = value < 10 ? count.toFixed(1) : Math.floor(count).toLocaleString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export function BecomePartner() {
  const [activeTab, setActiveTab] = useState<"become" | "directory">("become");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("user")));

  useEffect(() => {
    const syncLogin = () => setIsLoggedIn(Boolean(localStorage.getItem("user")));
    window.addEventListener("userLoggedIn", syncLogin);
    window.addEventListener("userLoginStatusChanged", syncLogin);
    window.addEventListener("storage", syncLogin);
    return () => {
      window.removeEventListener("userLoggedIn", syncLogin);
      window.removeEventListener("userLoginStatusChanged", syncLogin);
      window.removeEventListener("storage", syncLogin);
    };
  }, []);
  const [formData, setFormData] = useState({
    companyName: "", contactName: "", email: "", phone: "",
    country: "", city: "", website: "", companySize: "",
    partnerType: "", experience: "", message: "",
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      window.dispatchEvent(new CustomEvent("showToast", { detail: { type: "error", message: "Please log in to submit a partner application." } }));
      navigate("/", { state: { openLogin: true } });
      return;
    }

    setIsSubmitting(true);
    const required = ["companyName", "contactName", "email", "phone", "country", "city", "companySize", "partnerType", "experience"];
    if (required.some((f) => !formData[f as keyof typeof formData])) {
      t("error", "Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }
    try {
      const payload = {
        contactInformation: { fullName: formData.contactName, email: formData.email, phone: formData.phone },
        companyInformation: { companyName: formData.companyName, website: formData.website || "", country: formData.country, city: formData.city },
        businessDetails: { businessType: mapBusinessType(formData.partnerType), yearsInBusiness: mapExperience(formData.experience), numberOfEmployees: formData.companySize, existingClients: 0 },
        partnershipDetails: { joinAs: mapPartnerType(formData.partnerType), motivation: formData.message || "No additional information provided" },
        source: "callifo",
      };
      await submitPartnerApplication(payload);
      t("success", "Application submitted! We'll review it and get back to you within 48 hours.");
      setFormData({ companyName: "", contactName: "", email: "", phone: "", country: "", city: "", website: "", companySize: "", partnerType: "", experience: "", message: "" });
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Submission failed. Please try again.";
      t("error", `Submission failed: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center bg-[#f8faff] overflow-hidden pt-8 pb-12">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.4)_0%,rgba(99,102,241,0.15)_60%,transparent_80%)] blur-[56px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.32)_0%,rgba(59,130,246,0.12)_60%,transparent_80%)] blur-[44px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-10 right-48 w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.25)_0%,transparent_70%)] blur-[32px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto px-4 pt-8">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/55 border border-cyan-200/60 backdrop-blur-md text-cyan-600 text-[10px] font-bold tracking-widest uppercase shadow-[0_1px_12px_rgba(6,182,212,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_2px_rgba(6,182,212,0.5)] animate-pulse" />
            Partner Program
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
            className="flex flex-col leading-[1.05] tracking-tight">
            <span className="text-6xl font-black text-gray-900">Find a</span>
            <span className="text-6xl font-black bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent drop-shadow-sm">Callifo Partner</span>
            <span className="text-2xl font-semibold text-slate-400 mt-3 tracking-normal">in Your Area</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.14 }}
            className="text-[14px] text-slate-500 leading-[1.75] max-w-md">
            Connect with certified experts who specialize in implementation, training, and seamless Callifo integration.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
            className="inline-flex gap-1 p-1.5 bg-white/50 border border-white/80 backdrop-blur-xl rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
            <button
              onClick={() => setActiveTab("become")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-[12.5px] transition-all duration-200 ${
                activeTab === "become"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Become a Partner
        
            </button>
            <button
              onClick={() => setActiveTab("directory")}
              className={`px-6 py-2.5 rounded-xl font-semibold text-[12.5px] transition-all duration-200 ${
                activeTab === "directory"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-[0_4px_16px_rgba(99,102,241,0.3)]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Partner Directory
            </button>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.26 }}
            className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="w-4 h-4 rounded-full bg-emerald-400/15 border border-emerald-400/35 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
            </span>
            No upfront costs · Free to join · Dedicated support
          </motion.p>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BECOME A PARTNER TAB
      ══════════════════════════════════════════════════════ */}
      {activeTab === "become" && (
        <>
          {/* Benefits */}
          <section className="py-20 relative overflow-hidden" style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0c1a3e 100%)"
          }}>
            {/* Radial glows */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 15% 50%, rgba(6,182,212,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 30%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.12) 0%, transparent 50%)"
            }} />
            {/* Subtle grid */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-black text-white mb-3">
                  Why Join Our <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">Partner Network</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">Everything you need to grow your business with Callifo</p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white border border-gray-100 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-sm mb-2">{benefit.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Features + Why Partner */}
          <section
            className="py-20 relative overflow-hidden"
            style={{ backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-white/75" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-xs font-semibold mb-6">
                      <Target className="w-3.5 h-3.5" />
                      Our Promise
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-5 leading-tight">
                      A product people
                      <span className="block text-cyan-600">fall in love with</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8 text-sm drop-shadow-sm">
                      Callifo is more than just a call management system – it's a complete business transformation platform. Our partners help organizations unlock the full potential through expert implementation, customization, and ongoing support.
                    </p>
                    <div className="space-y-3">
                      {productFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:border-cyan-200 hover:shadow-md transition-all group"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
                            <CheckCircle className="w-5 h-5 text-cyan-500 group-hover:text-white transition-colors" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{feature.title}</div>
                            <div className="text-gray-400 text-xs mt-0.5">{feature.description}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Why Partner — colored cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {whyPartner.map((item, index) => (
                      <motion.div
                        key={index}
                        className={`group p-5 rounded-2xl bg-white border-2 border-gray-100 ${item.hover} hover:shadow-lg transition-all duration-300`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-md ${item.glow}`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section id="partner-form" className="py-16 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-50/80 rounded-full blur-[100px]" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  Start Your <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Application</span>
                </h2>
                <p className="text-gray-400 text-sm">Fill out the form below and we'll get back to you within 48 hours</p>
              </motion.div>

              <motion.div
                className="relative max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 rounded-3xl blur-sm opacity-70" />
                <div className="relative bg-white rounded-3xl p-8 shadow-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        { label: "Company Name", name: "companyName", type: "text", placeholder: "Your company name", required: true },
                        { label: "Contact Name", name: "contactName", type: "text", placeholder: "Your full name", required: true },
                        { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com", required: true },
                        { label: "Phone Number", name: "phone", type: "tel", placeholder: "+1 234 567 8900", required: true },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            {field.label} {field.required && <span className="text-cyan-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-cyan-400 focus:bg-white focus:outline-none transition-all text-gray-900 text-sm placeholder:text-gray-300"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        { label: "Country", name: "country", type: "text", placeholder: "Your country", required: true },
                        { label: "City", name: "city", type: "text", placeholder: "Your city", required: true },
                        { label: "Company Website", name: "website", type: "url", placeholder: "https://yourcompany.com", required: false },
                      ].map((field) => (
                        <div key={field.name}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                            {field.label} {field.required && <span className="text-cyan-500">*</span>}
                          </label>
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            required={field.required}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-cyan-400 focus:bg-white focus:outline-none transition-all text-gray-900 text-sm placeholder:text-gray-300"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company Size <span className="text-cyan-500">*</span></label>
                        <select name="companySize" value={formData.companySize} onChange={handleChange} required className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-cyan-400 focus:bg-white focus:outline-none transition-all text-gray-900 text-sm">
                          <option value="">Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Partner Type <span className="text-cyan-500">*</span></label>
                        <select name="partnerType" value={formData.partnerType} onChange={handleChange} required className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-cyan-400 focus:bg-white focus:outline-none transition-all text-gray-900 text-sm">
                          <option value="">Select type</option>
                          <option value="reseller">Reseller Partner</option>
                          <option value="distributor">Distributor</option>
                          <option value="channel_partner">Channel Partner</option>
                          <option value="implementation">Implementation Partner</option>
                          <option value="technology">Technology Partner</option>
                          <option value="referral">Referral Partner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Years of Experience <span className="text-cyan-500">*</span></label>
                        <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-cyan-400 focus:bg-white focus:outline-none transition-all text-gray-900 text-sm">
                          <option value="">Select experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Additional Information</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Tell us why you want to become a partner..." className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-cyan-400 focus:bg-white focus:outline-none transition-all text-gray-900 text-sm placeholder:text-gray-300 resize-none" />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-auto px-12 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application →"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════════════
          PARTNER DIRECTORY TAB
      ══════════════════════════════════════════════════════ */}
      {activeTab === "directory" && (
        <>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  Browse Our <span className="text-cyan-600">Partner Network</span>
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Our partners are there to make your Callifo experience more pleasant and productive – from choosing a subscription plan to product implementation, customization, and employee training. Callifo partners can also help you set up integrations with third-party apps and services.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
                {[
                  { img: teamImage, label: "Implementation" },
                  { img: meetingImage, label: "Consulting" },
                  { img: partnerImage, label: "Technology" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ y: -6 }}
                  >
                    <img src={item.img} alt="Partner" className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full shadow">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA with background image */}
          <section
            className="py-10 relative overflow-hidden"
            style={{ backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(6,182,212,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.35) 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, rgba(139,92,246,0.25) 0%, transparent 55%), linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a2e 100%)" }} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                className="max-w-2xl mx-auto text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/25">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-3">
                    Ready to Partner <span className="text-cyan-300">with Us?</span>
                  </h2>
                  <p className="text-white/60 mb-8 text-sm leading-relaxed">
                    Join our growing network of partners and help businesses transform their call management experience.
                  </p>
                  <button
                    onClick={() => setActiveTab("become")}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 transition-all"
                  >
                    Become a Partner Today
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}