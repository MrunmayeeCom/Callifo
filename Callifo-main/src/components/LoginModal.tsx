import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { syncCustomer, checkCustomerExists } from "../api/customerSync";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  if (!isOpen) return null;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (isSignUp) {
      const user = await syncCustomer({
        name: formData.name,
        email: formData.email,
        source: "callifo",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,   
          name: user.name ?? formData.name ?? null,
          source: "callifo",
        })
      );


      onLoginSuccess?.();
      return;
    }

    const exists = await checkCustomerExists(formData.email);

    if (!exists) {
      alert("Account not found. Please create an account.");
      setIsSignUp(true);
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: formData.email,
        source: "callifo",
      })
    );


    onLoginSuccess?.();
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Something went wrong");
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-[#003366] p-8 text-white">
          <h2 className="text-white mb-0">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-300">
            {isSignUp 
              ? "Start your 14-day free trial today" 
              : "Sign in to access your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="John Doe"
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@company.com"
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {isSignUp ? "Start Free Trial" : "Sign In"}
          </button>

          {isSignUp && (
            <p className="text-gray-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span className="text-cyan-600">Sign in</span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span className="text-cyan-600">Sign up</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}