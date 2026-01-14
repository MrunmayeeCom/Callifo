import { X, Mail, Lock, Eye, EyeOff, Building2, Phone, Globe, Plus, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Ensure framer-motion is installed
import { syncCustomer, checkCustomerExists } from "../api/customerSync";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"password" | "otp">("password");
  const [view, setView] = useState<"login" | "signup" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    domain: "",
    phone: "",
    otp: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (view === "signup") {
        const user = await syncCustomer({
          name: formData.companyName,
          email: formData.email,
          source: "callifo",
        });
        localStorage.setItem("user", JSON.stringify({ email: formData.email, name: user.name, source: "callifo" }));
        onLoginSuccess?.();
        return;
      }

      const exists = await checkCustomerExists(formData.email);
      if (!exists) {
        alert("Account not found. Redirecting to registration.");
        setView("signup");
        return;
      }

      localStorage.setItem("user", JSON.stringify({ email: formData.email, source: "callifo" }));
      onLoginSuccess?.();
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-gray-100">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#003366] transition-colors z-20">
          <X className="w-6 h-6" />
        </button>

        {/* --- LOGIN VIEW --- */}
        {view === "login" && (
          <div className="p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#003366] p-2 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#003366] m-0">Admin Portal</h2>
            </div>
            <p className="text-gray-500 mb-8">Sign in to manage your company dashboard</p>

            {/* Tabs - Aligned with Cyan Brand Color */}
            <div className="flex border-b border-gray-100 mb-8">
              <button 
                onClick={() => setActiveTab("password")}
                className={`flex-1 pb-4 text-sm font-bold transition-all ${activeTab === "password" ? "text-[#00bcd4] border-b-2 border-[#00bcd4]" : "text-gray-400 hover:text-gray-600"}`}
              >
                Email & Password
              </button>
              <button 
                onClick={() => setActiveTab("otp")}
                className={`flex-1 pb-4 text-sm font-bold transition-all ${activeTab === "otp" ? "text-[#00bcd4] border-b-2 border-[#00bcd4]" : "text-gray-400 hover:text-gray-600"}`}
              >
                Email & OTP
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="Admin Email Address"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {activeTab === "password" ? (
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00bcd4] focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input placeholder="Enter OTP" className="flex-1 px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00bcd4]" />
                  <button type="button" className="px-6 bg-[#00bcd4] text-white rounded-lg font-medium hover:brightness-110">Send OTP</button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 accent-[#003366]" />
                <label htmlFor="remember" className="text-gray-600 text-sm cursor-pointer">Remember me</label>
              </div>

              <button className="w-full py-4 bg-[#00bcd4] text-white rounded-lg font-bold text-lg hover:brightness-105 transition-all shadow-md active:scale-[0.98]">
                Sign In as Admin
              </button>
            </form>

            {/* Forgot Password Accordion - Navy Theme */}
            <div className="mt-8 border-t border-gray-100 pt-4">
              <button 
                onClick={() => setIsForgotOpen(!isForgotOpen)}
                className="flex items-center justify-between w-full text-[#003366] font-bold text-sm uppercase tracking-wide"
              >
                Forgot admin password?
                {isForgotOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {isForgotOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-4 overflow-hidden"
                  >
                    <input placeholder="Admin Email Address" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                    <div className="flex gap-2">
                      <input placeholder="Reset OTP" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      <button className="bg-[#003366] text-white px-4 rounded-lg text-sm font-medium">Send OTP</button>
                    </div>
                    <input type="password" placeholder="New Password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                    <button className="w-full py-3 bg-[#00bcd4] text-white rounded-lg font-bold uppercase tracking-tight shadow-sm">Reset Admin Password</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-center mt-8 text-gray-500 text-sm">
              New company? <button onClick={() => setView("signup")} className="text-[#00bcd4] font-bold hover:underline">Create admin account</button>
            </p>
          </div>
        )}

        {/* --- SIGNUP / REGISTRATION VIEW --- */}
        {view === "signup" && (
          <div className="p-8 lg:p-12 max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-[#003366] mb-2">Admin Registration</h2>
            <p className="text-gray-500 mb-8">Create your admin account to manage your company dashboard</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input name="companyName" placeholder="Company Name" className="w-full pl-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00bcd4]" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#003366]">Company Email Domains</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input name="domain" placeholder="company.com" className="w-full pl-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                  </div>
                  <button type="button" className="bg-[#003366] text-white px-4 rounded-lg flex items-center gap-1 hover:brightness-110"><Plus className="w-4 h-4"/> Add</button>
                </div>
                <p className="text-xs text-gray-400">Add at least one company domain (e.g., company.com)</p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                   <input name="email" placeholder="Admin Email Address" className="w-full pl-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" required />
                </div>
                <button type="button" className="bg-[#00bcd4] text-white px-4 rounded-lg text-sm font-medium">Send OTP</button>
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input name="phone" placeholder="Admin Phone Number (Optional)" className="w-full pl-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="password" placeholder="Password" className="w-full pl-12 py-3.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" required />
              </div>

              <button className="w-full py-4 bg-[#00bcd4] text-white rounded-lg font-bold text-lg mt-4 shadow-lg active:scale-[0.98]">
                Create Admin Account
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500 text-sm">
              Already have an admin account? <button onClick={() => setView("login")} className="text-[#00bcd4] font-bold hover:underline">Sign in</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}