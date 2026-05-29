import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Eye, EyeOff, User, AlertCircle } from "lucide-react";
import {
  syncCustomer,
  checkCustomerExists,
  loginCustomer,
} from "../../../../api/customerSync";
import { useNavigate } from "react-router";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (name: string, hasLicense: boolean) => void;
  onNavigateToPricing?: () => void;
}

// ── Inline Error Banner ──
function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#fff1f2",
            border: "1.5px solid #fecdd3",
            borderRadius: 10,
            padding: "10px 12px",
            marginBottom: 14,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#ffe4e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <AlertCircle size={14} color="#e11d48" />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12.5,
                fontWeight: 700,
                color: "#be123c",
              }}
            >
              Something went wrong
            </p>
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: 11.5,
                color: "#e11d48",
                lineHeight: 1.45,
              }}
            >
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fda4af",
              padding: 2,
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Inline Validation Banner (for field-level errors) ──
function ValidationBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "#fffbeb",
            border: "1.5px solid #fde68a",
            borderRadius: 10,
            padding: "10px 12px",
            marginBottom: 14,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#fef3c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <AlertCircle size={14} color="#d97706" />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12.5,
                fontWeight: 700,
                color: "#b45309",
              }}
            >
              Check your details
            </p>
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: 11.5,
                color: "#d97706",
                lineHeight: 1.45,
              }}
            >
              {message}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fcd34d",
              padding: 2,
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Password Strength ──
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Lowercase", ok: /[a-z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColor =
    score <= 1
      ? "#f87171"
      : score === 2
        ? "#fb923c"
        : score === 3
          ? "#facc15"
          : "#4ade80";
  const label =
    score <= 1
      ? "Weak"
      : score === 2
        ? "Fair"
        : score === 3
          ? "Good"
          : "Strong";

  return (
    <AnimatePresence>
      {password.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{ overflow: "hidden" }}
        >
          <div style={{ paddingTop: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", flex: 1, gap: 4 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 4,
                      flex: 1,
                      borderRadius: 999,
                      background: i <= score ? barColor : "#dbeafe",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: barColor,
                  minWidth: 36,
                }}
              >
                {label}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {checks.map((c) => (
                <span
                  key={c.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontWeight: 500,
                    background: c.ok
                      ? "rgba(56,189,248,0.1)"
                      : "rgba(219,234,254,0.6)",
                    color: c.ok ? "#0369a1" : "#94a3b8",
                    border: `1px solid ${c.ok ? "rgba(56,189,248,0.3)" : "rgba(219,234,254,0.8)"}`,
                    transition: "all 0.2s",
                  }}
                >
                  {c.ok ? (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3.5 6L6.5 2"
                        stroke="#0369a1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#cbd5e1",
                        display: "inline-block",
                      }}
                    />
                  )}
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function validatePassword(p: string) {
  return {
    valid:
      /[A-Z]/.test(p) && /[a-z]/.test(p) && /[0-9]/.test(p) && p.length >= 8,
  };
}

export function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onNavigateToPricing,
}: LoginModalProps) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const clearErrors = () => {
    setErrorMessage("");
    setValidationMessage("");
  };

  if (!isOpen) return null;

  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://license-system-v6ht.onrender.com/api/external/active-license/${email}?productId=6958ee26be14694144dfb879`,
        { headers: { "x-api-key": "my-secret-key-123" } },
      );
      if (response.ok) {
        const data = await response.json();
        return data.activeLicense && data.activeLicense.status === "active";
      }
      return false;
    } catch (error) {
      console.error("Error checking active license:", error);
      return false;
    }
  };

  const handlePostLoginActions = async (
    userEmail: string,
    userName: string,
  ) => {
    window.dispatchEvent(new Event("userLoggedIn"));
    window.dispatchEvent(new Event("userLoginStatusChanged"));

    onClose();

    const hasActiveLicense = await checkActiveLicense(userEmail);

    // Now pass the real license result — not a hardcoded false
    onLoginSuccess?.(userName, hasActiveLicense);

    const pending = sessionStorage.getItem("pendingPlan");
    if (pending) {
      const { planId, cycle, isFree } = JSON.parse(pending);
      sessionStorage.removeItem("pendingPlan");
      if (!isFree) {
        setTimeout(
          () => navigate(`/checkout?plan=${planId}&cycle=${cycle}`),
          100,
        );
        return;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!email || !password || (isSignUp && !name)) {
      setValidationMessage("Please fill in all fields.");
      return;
    }

    if (isSignUp && !validatePassword(password).valid) {
      setValidationMessage(
        "Password must be 8+ characters with uppercase, lowercase, and a number.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        try {
          const response = await syncCustomer({
            name,
            email,
            source: "callifo",
            password,
          });
          const user = {
            name: name || email.split("@")[0],
            email,
            source: "callifo",
            customerId: response.customerId,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setIsSubmitting(false);
          setIsSignUp(false);
          setAccountCreated(true);
          setTimeout(() => setAccountCreated(false), 4000);
          return;
        } catch (signupError: any) {
          setIsSubmitting(false);
          setErrorMessage(
            signupError.response?.data?.message ||
              signupError.message ||
              "Failed to create account. Please try again.",
          );
          return;
        }
      }

      try {
        const exists = await checkCustomerExists(email);
        if (!exists) {
          setIsSubmitting(false);
          setValidationMessage(
            "No account found with this email. Please create an account.",
          );
          setIsSignUp(true);
          return;
        }
        const loginResponse = await loginCustomer({ email, password });
        console.log("Login response:", loginResponse);
        const customerData = loginResponse?.customer || loginResponse?.data?.customer;
        const isSuccess = loginResponse?.success === true || !!customerData;
        if (isSuccess && customerData) {
          const user = {
            name: customerData.name || email.split("@")[0],
            email: customerData.email || email,
            source: "callifo",
            customerId: customerData.customerId || customerData._id,
          };
          localStorage.setItem("user", JSON.stringify(user));
          setIsSubmitting(false);
          await handlePostLoginActions(user.email, user.name);
        } else {
          setIsSubmitting(false);
          setErrorMessage(
            "Invalid credentials. Please check your password and try again.",
          );
        }
      } catch (loginError: any) {
        setIsSubmitting(false);
        console.error("Login error full:", loginError?.response);
        setErrorMessage(
          loginError?.response?.data?.message ||
            loginError?.message ||
            "Login failed. Please try again.",
        );
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setName("");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setIsSignUp(false);
      setAccountCreated(false);
      clearErrors();
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: "rgba(8, 20, 45, 0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow:
            "0 20px 60px rgba(0, 30, 80, 0.18), 0 4px 20px rgba(0, 30, 80, 0.1)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #0f3460 0%, #1a5276 50%, #1f618d 100%)",
            padding: "18px 28px 16px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -10,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 80,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
            }}
          />

          <button
            onClick={handleCloseModal}
            disabled={isSubmitting}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "8px",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.8)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
          >
            <X size={15} />
          </button>

          <h2
            style={{
              margin: "0 0 5px 0",
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.3px",
            }}
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "rgba(200, 220, 255, 0.85)",
            }}
          >
            {isSignUp
              ? "Create your Callifo account"
              : "Sign in to access your account"}
          </p>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} style={{ padding: "24px 28px 26px" }}>
          {/* ── Account Created Success Banner ── */}
          {accountCreated && (
            <div
              style={{
                background: "#f0fdf4",
                border: "1.5px solid #bbf7d0",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 8 8" fill="none">
                  <path
                    d="M1.5 4L3.5 6L6.5 2"
                    stroke="#16a34a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "#15803d",
                  }}
                >
                  Account created successfully!
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: "#16a34a" }}>
                  Please sign in to continue
                </p>
              </div>
            </div>
          )}

          {/* ── Error Banners ── */}
          <ErrorBanner
            message={errorMessage}
            onDismiss={() => setErrorMessage("")}
          />
          <ValidationBanner
            message={validationMessage}
            onDismiss={() => setValidationMessage("")}
          />

          {isSignUp && (
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                  }}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearErrors();
                  }}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  required={isSignUp}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px 10px 34px",
                    fontSize: "13.5px",
                    color: "#111827",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "10px",
                    background: "#f9fafb",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#1a5276";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(26,82,118,0.1)";
                    e.currentTarget.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "#f9fafb";
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearErrors();
                }}
                placeholder="xyz@gmail.com"
                disabled={isSubmitting}
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 12px 10px 34px",
                  fontSize: "13.5px",
                  color: "#111827",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "10px",
                  background: "#f9fafb",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#1a5276";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(26,82,118,0.1)";
                  e.currentTarget.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "#f9fafb";
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: !isSignUp ? "10px" : "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <label
                style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}
              >
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate("/forgot-password");
                  }}
                  disabled={isSubmitting}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#1a5276",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#0f3460")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#1a5276")
                  }
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearErrors();
                }}
                placeholder="••••••••"
                disabled={isSubmitting}
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 38px 10px 34px",
                  fontSize: "13.5px",
                  color: "#111827",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "10px",
                  background: "#f9fafb",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#1a5276";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(26,82,118,0.1)";
                  e.currentTarget.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "#f9fafb";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  padding: 4,
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {isSignUp && <PasswordStrength password={password} />}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "11px",
              marginTop: isSignUp ? "12px" : "6px",
              background: isSubmitting
                ? "#7fa8c4"
                : "linear-gradient(135deg, #0f3460 0%, #1a5276 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: isSubmitting ? "not-allowed" : "pointer",
              letterSpacing: "0.2px",
              boxShadow: "0 4px 14px rgba(15, 52, 96, 0.3)",
              transition: "opacity 0.2s, transform 0.1s",
              marginBottom: "16px",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.currentTarget.style.opacity = "0.92";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseDown={(e) => {
              if (!isSubmitting)
                e.currentTarget.style.transform = "scale(0.99)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {isSubmitting ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <svg
                  style={{
                    animation: "spin 1s linear infinite",
                    width: 15,
                    height: 15,
                  }}
                  viewBox="0 0 24 24"
                >
                  <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    fill="currentColor"
                    opacity="0.75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {isSignUp ? "Creating Account..." : "Signing in..."}
              </span>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>

          {isSignUp && (
            <p
              style={{
                textAlign: "center",
                fontSize: "11.5px",
                color: "#9ca3af",
                marginBottom: "12px",
                lineHeight: 1.5,
              }}
            >
              By signing up, you agree to our{" "}
              <span style={{ color: "#1a5276", cursor: "pointer" }}>
                Terms of Service
              </span>{" "}
              and{" "}
              <span style={{ color: "#1a5276", cursor: "pointer" }}>
                Privacy Policy
              </span>
            </p>
          )}

          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#6b7280",
              margin: 0,
            }}
          >
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setAccountCreated(false);
                clearErrors();
              }}
              disabled={isSubmitting}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#1a5276",
                fontWeight: 600,
                fontSize: "13px",
                padding: 0,
              }}
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
