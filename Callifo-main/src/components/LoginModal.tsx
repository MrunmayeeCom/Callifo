import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { syncCustomer, checkCustomerExists, loginCustomer } from "../api/customerSync";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onNavigateToPricing?: () => void;
}

export function LoginModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  onNavigateToPricing 
}: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      console.log('Checking active license for:', email);
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=6958ee26be14694144dfb879`,
        {
          headers: {
            "x-api-key": "my-secret-key-123",
          },
        }
      );

      console.log('License check response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('License check response data:', data);
        
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        console.log('Has active license:', hasLicense);
        return hasLicense;
      }
      console.log('License check failed - response not ok');
      return false;
    } catch (error) {
      console.error("Error checking active license:", error);
      return false;
    }
  };

  const handlePostLoginActions = async (email: string, userName: string) => {
    // Trigger custom event to update Navbar immediately
    window.dispatchEvent(new Event('userLoggedIn'));
    window.dispatchEvent(new Event('userLoginStatusChanged'));
    
    // Check if user has active license
    const hasActiveLicense = await checkActiveLicense(email);

    // Close the modal first
    onLoginSuccess?.();
    onClose();

    // Small delay to ensure modal closes before action
    setTimeout(() => {
      if (hasActiveLicense) {
        // Redirect to admin dashboard in new tab
        window.open("https://admin-callifo.onrender.com", "_blank");
      } else {
        // Navigate to pricing section
        onNavigateToPricing?.();
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // SIGN UP
      if (isSignUp) {
        try {
          console.log("Attempting signup...");
          const response = await syncCustomer({ 
            name, 
            email, 
            source: "callifo", 
            password 
          });
          
          const user = {
            name: name || email.split("@")[0],
            email,
            source: "callifo",
            customerId: response.customerId,
          };

          localStorage.setItem("user", JSON.stringify(user));

          alert("Account created successfully! 🎉");
          
          setIsSubmitting(false);
          await handlePostLoginActions(email, user.name);
          return;
        } catch (signupError: any) {
          console.error("Signup error:", signupError);
          setIsSubmitting(false);
          
          if (signupError.response?.data?.message) {
            alert(signupError.response.data.message);
          } else if (signupError.message) {
            alert(signupError.message);
          } else {
            alert("Failed to create account. Please try again.");
          }
          return;
        }
      }

      // SIGN IN
      try {
        const exists = await checkCustomerExists(email);
        console.log("Email exists?", exists);

        if (!exists) {
          setIsSubmitting(false);
          alert("Account not found. Please create an account.");
          setIsSignUp(true);
          return;
        }

        // Email exists, now verify password
        const loginResponse = await loginCustomer({ email, password });

        if (loginResponse.success && loginResponse.customer) {
          const user = {
            name: loginResponse.customer.name || email.split("@")[0],
            email: loginResponse.customer.email,
            source: "callifo",
            customerId: loginResponse.customer.customerId,
          };

          localStorage.setItem("user", JSON.stringify(user));

          alert("Login successful! Welcome back, " + user.name + "! 👋");
          
          setIsSubmitting(false);
          await handlePostLoginActions(user.email, user.name);
        } else {
          setIsSubmitting(false);
          alert("Invalid credentials. Please check your password.");
        }
      } catch (loginError: any) {
        console.error("Login error:", loginError);
        setIsSubmitting(false);
        
        if (loginError.response?.status === 401) {
          alert("Invalid credentials. Incorrect password.");
        } else if (loginError.response?.data?.message) {
          alert(loginError.response.data.message);
        } else if (loginError.message) {
          alert(loginError.message);
        } else {
          alert("Login failed. Please try again.");
        }
      }

    } catch (err: any) {
      console.error("General error:", err);
      setIsSubmitting(false);
      
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else if (err.message) {
        alert(err.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setIsSignUp(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          disabled={isSubmitting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="bg-[#003366] p-8 text-white">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-200">
            {isSignUp 
              ? "Create your Callifo account" 
              : "Sign in to access your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all"
                placeholder="John Doe"
                disabled={isSubmitting}
                required={isSignUp}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all"
                placeholder="you@company.com"
                disabled={isSubmitting}
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all"
                placeholder="••••••••"
                disabled={isSubmitting}
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
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
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => alert("Password reset feature coming soon")}
                className="text-sm text-[#003366] hover:underline"
                disabled={isSubmitting}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-[#003366] hover:bg-[#002244] text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isSignUp ? "Creating Account..." : "Logging in..."}
              </span>
            ) : (
              <span>{isSignUp ? "Create Account" : "Sign In"}</span>
            )}
          </button>

          {isSignUp && (
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          )}

          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              disabled={isSubmitting}
              className="text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span className="text-[#003366] font-medium">Sign in</span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span className="text-[#003366] font-medium">Create one</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}