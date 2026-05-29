import { Link, useLocation, useNavigate } from "react-router";
import { Logo } from "../Logo";
import { Button } from "../ui/button";
import {
  Phone,
  Menu,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  X,
  Copy,
  Check,
  Download,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { LoginModal } from "./LoginModal";
import { toast } from "sonner";
import { createPortal } from "react-dom";
import callifoLogo from "@/assets/Callifologo.png";
import { motion, AnimatePresence } from "framer-motion";

// ── Login Success Popup ──
function LoginSuccessPopup({ name, onClose }: { name: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
 

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: "fixed", top: 20, right: 20, zIndex: 999999,
          display: "flex", alignItems: "flex-start", gap: 12,
          background: "#ffffff", border: "1px solid #f0f0f0",
          borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          padding: "12px 16px", maxWidth: 280, overflow: "hidden",
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "#dcfce7",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 2,
        }}>
          <CheckCircle size={16} color="#16a34a" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: "#111827" }}>
            You're logged in!
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>
            Welcome back, <span style={{ fontWeight: 600, color: "#2563eb" }}>{name}</span> 👋
          </p>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#d1d5db", padding: 0, flexShrink: 0, marginTop: 2,
          display: "flex", alignItems: "center",
        }}>
          <X size={14} />
        </button>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 4, ease: "linear" }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 3, background: "#4ade80", borderRadius: "0 0 16px 16px",
            transformOrigin: "left",
          }}
        />
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ── Purchase Plan Popup ──
function PurchasePlanPopup({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: "fixed", top: 90, right: 20, zIndex: 999999,
          display: "flex", alignItems: "flex-start", gap: 12,
          background: "#ffffff", border: "1px solid #f0f0f0",
          borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          padding: "12px 16px", maxWidth: 280, overflow: "hidden",
        }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: "#dbeafe",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 2,
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#2563eb" }}>i</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: "#111827" }}>
            No active plan found
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>
            Please purchase a plan to continue
          </p>
        </div>
        <button onClick={onClose} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#d1d5db", padding: 0, flexShrink: 0, marginTop: 2,
          display: "flex", alignItems: "center",
        }}>
          <X size={14} />
        </button>
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 4, ease: "linear" }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 3, background: "#60a5fa", borderRadius: "0 0 16px 16px",
            transformOrigin: "left",
          }}
        />
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// ── PHONE MODAL ──
function PhoneModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+919892440788");
    setCopied(true);
    toast.success("Number copied to clipboard!", {
    style: {
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      fontSize: "13.5px",
      fontWeight: "600",
      borderRadius: "12px",
      border: "1px solid #d1fae5",
      background: "#f0fdf4",
      color: "#065f46",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      padding: "12px 16px",
    },
    icon: "✅",
  });
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "pm-fade-in 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 20,
          padding: "36px 32px 32px", maxWidth: 400, width: "100%",
          textAlign: "center", position: "relative",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          animation: "pm-slide-up 0.28s cubic-bezier(0.34,1.56,0.64,1)",
          borderTop: "4px solid transparent",
          backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #6366f1, #06b6d4, #a855f7)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 30, height: 30, borderRadius: "50%",
            border: "1.5px solid #e5e7eb", background: "white",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#6b7280", transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f3f4f6"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; }}
        >
          <X size={14} />
        </button>

        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg, #e0f2fe, #cffafe)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 0 0 12px rgba(6,182,212,0.07)",
        }}>
          <Phone size={30} style={{ color: "#06b6d4" }} strokeWidth={1.5} />
        </div>

        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
          color: "#06b6d4", textTransform: "uppercase", marginBottom: 10,
        }}>
          Contact Support
        </p>

        <h2 style={{
          fontSize: 22, fontWeight: 800, color: "#0f172a",
          letterSpacing: "-0.03em", marginBottom: 10,
        }}>
          Call us for any queries
        </h2>

        <p style={{
          fontSize: 13.5, color: "#6b7280", lineHeight: 1.65,
          maxWidth: 300, margin: "0 auto 24px",
        }}>
          Our support team is ready to help you with any questions or issues you may have.
        </p>

        <div
          onClick={handleCopy}
          style={{
            border: `1.5px solid ${copied ? "#06b6d4" : "#e5e7eb"}`,
            borderRadius: 14, padding: "16px 24px",
            background: copied ? "#f0fdfe" : "#f9fafb",
            marginBottom: 8, cursor: "copy", transition: "all 0.2s ease",
          }}
        >
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
            color: "#9ca3af", textTransform: "uppercase", marginBottom: 8,
          }}>
            Phone Number
          </p>
          <p style={{
            fontSize: 26, fontWeight: 800,
            color: copied ? "#06b6d4" : "#0f172a",
            letterSpacing: "-0.03em", margin: 0, transition: "color 0.2s",
          }}>
            +91 98924 40788
          </p>
        </div>

        <p style={{
          fontSize: 11, color: "#9ca3af", marginTop: 10,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          {copied
            ? <><Check size={12} style={{ color: "#06b6d4" }} /> Copied to clipboard!</>
            : <><Copy size={12} /> Click number to copy · Available 24/7</>
          }
        </p>
      </div>

      <style>{`
        @keyframes pm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pm-slide-up { from { opacity: 0; transform: translateY(32px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [isCheckingLicense, setIsCheckingLicense] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ── Popup state lifted here ──
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loggedInName, setLoggedInName] = useState("");
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      sessionStorage.setItem("scrollTo", sectionId);
      navigate("/");
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 56;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - headerHeight - 8, behavior: "smooth" });
    }
  };

  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      setIsCheckingLicense(true);
      const response = await fetch(
        `https://license-system-v6ht.onrender.com/api/external/actve-license/${email}?productId=6958ee26be14694144dfb879`,
        { headers: { "x-api-key": "my-secret-key-123" } },
      );
      if (response.ok) {
        const data = await response.json();
        const hasLicense = data.activeLicense && data.activeLicense.status === "active";
        setHasActiveLicense(hasLicense);
        return hasLicense;
      }
      setHasActiveLicense(false);
      return false;
    } catch (error) {
      console.error("[Header] Error checking active license:", error);
      setHasActiveLicense(false);
      return false;
    } finally {
      setIsCheckingLicense(false);
    }
  };

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser({ name: user.name || user.email.split("@")[0], email: user.email });
          if (user.email) checkActiveLicense(user.email);
        } catch (e) {
          console.error("Failed to parse user data", e);
          setCurrentUser(null);
          setHasActiveLicense(false);
        }
      } else {
        setCurrentUser(null);
        setHasActiveLicense(false);
      }
    };
    checkUser();
    window.addEventListener("storage", checkUser);
    window.addEventListener("userLoggedIn", checkUser);
    window.addEventListener("userLoginStatusChanged", checkUser);
    window.addEventListener("licenseActivated", checkUser);
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userLoggedIn", checkUser);
      window.removeEventListener("userLoginStatusChanged", checkUser);
      window.removeEventListener("licenseActivated", checkUser);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);

  const handleDashboardClick = () => {
    setIsProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    window.open("https://admin-callifo.onrender.com", "_blank");
  };

  const handleTutorialsClick = () => {
    setIsProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/tutorials");
  };

  const handleDownloadApk = () => {
    setIsProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    const link = document.createElement("a");
    link.href = "/Callifo.apk";
    link.download = "Callifo.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Download started!", { description: "Callifo APK is downloading…" });
  };

  const handleLoginClick = () => {
    if (currentUser) {
      toast.info("You are already logged in!", { description: `Signed in as ${currentUser.email}` });
      return;
    }
    setLoginOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setHasActiveLicense(false);
    setIsProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("userLoggedOut"));
    window.dispatchEvent(new Event("userLoginStatusChanged"));
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  useEffect(() => {
    const openModal = () => setLoginOpen(true);
    window.addEventListener("openLoginModal", openModal);
    return () => window.removeEventListener("openLoginModal", openModal);
  }, []);

  // ── Called by LoginModal after successful login ──
  const handleLoginSuccess = (name: string, haslicense: boolean) => {
    setLoggedInName(name);
    setShowLoginPopup(true);
    // Only show "No active plan" popup when the license check has actually confirmed no license
    if (!haslicense) {
      setTimeout(() => setShowPurchasePopup(true), 500);
    }
  };

  return (
    <>
      {/* Popups live here — outside LoginModal, never unmounted by loginOpen */}
      {showLoginPopup && (
        <LoginSuccessPopup
          name={loggedInName}
          onClose={() => setShowLoginPopup(false)}
        />
      )}
      {showPurchasePopup && (
        <PurchasePlanPopup
          onClose={() => setShowPurchasePopup(false)}
        />
      )}

      {phoneModalOpen && <PhoneModal onClose={() => setPhoneModalOpen(false)} />}

      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">

            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img src={callifoLogo} alt="Callifo" style={{ height: "34px", width: "auto", objectFit: "contain" }} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("features")} className="text-xs text-gray-600 hover:text-cyan-600 transition-colors">Features</button>
              <button onClick={() => scrollToSection("how-it-works")} className="text-xs text-gray-600 hover:text-cyan-600 transition-colors">How It Works</button>
              <button onClick={() => scrollToSection("pricing")} className="text-xs text-gray-600 hover:text-cyan-600 transition-colors">Pricing</button>
              <button onClick={() => scrollToSection("faq")} className="text-xs text-gray-600 hover:text-cyan-600 transition-colors">FAQ</button>
              <Link
                to="/partners"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-medium transition-colors ${isActive("/partners") ? "text-cyan-600" : "text-gray-600 hover:text-cyan-600"}`}
              >
                Partners
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setPhoneModalOpen(true)}
                className="flex items-start gap-1.5 text-gray-600 hover:text-cyan-600 transition-colors"
              >
                <Phone className="w-3 h-3 mt-0.5" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium">+91 98924 40788</span>
                  <span className="text-[10px] text-gray-400 pl-1">We work 24/7</span>
                </div>
              </button>

              {currentUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                      {getInitials(currentUser.name)}
                    </div>
                    <ChevronDown className={`w-3 h-3 text-gray-600 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 pt-1 z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold text-xs">
                            {getInitials(currentUser.name)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-900">{currentUser.name}</p>
                            <p className="text-[10px] text-gray-500">{currentUser.email}</p>
                          </div>
                        </div>
                      </div>

                      {hasActiveLicense && (
                        <>
                          <button onClick={handleDashboardClick} className="w-full px-4 py-2.5 text-left text-xs font-medium text-cyan-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                            <LayoutDashboard className="w-3.5 h-3.5" />Dashboard
                          </button>
                          <button onClick={handleTutorialsClick} className="w-full px-4 py-2.5 text-left text-xs font-medium text-cyan-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                            <BookOpen className="w-3.5 h-3.5" />Watch Tutorials
                          </button>
                          <button onClick={handleDownloadApk} className="w-full px-4 py-2.5 text-left text-xs font-medium text-cyan-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                            <Download className="w-3.5 h-3.5" />Download APK
                          </button>
                        </>
                      )}

                      <button onClick={handleSignOut} className="w-full px-4 py-2.5 text-left text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded-b-xl">
                        <LogOut className="w-3.5 h-3.5" />Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={handleDownloadApk}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-cyan-600 border border-gray-200 hover:border-cyan-400 rounded-lg px-3 py-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />Download APK
                  </button>
                  <Button size="sm" className="text-xs px-3 py-1.5 h-7 bg-cyan-600 hover:bg-cyan-700" onClick={handleLoginClick}>
                    Login
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-cyan-600">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 space-y-3 border-t">
              <button onClick={() => scrollToSection("features")} className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">Features</button>
              <button onClick={() => scrollToSection("how-it-works")} className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">How It Works</button>
              <button onClick={() => scrollToSection("pricing")} className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">Pricing</button>
              <button onClick={() => scrollToSection("faq")} className="block w-full text-left px-4 py-2 text-xs text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">FAQ</button>
              <Link to="/partners" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-xs text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                Partners
              </Link>

              <div className="px-4 pt-3 space-y-2 border-t">
                <button
                  onClick={() => { setMobileMenuOpen(false); setPhoneModalOpen(true); }}
                  className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>+91 98924 40788</span>
                </button>

                {currentUser ? (
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex items-center gap-2 px-1">
                      <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center text-white font-semibold text-xs">
                        {getInitials(currentUser.name)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{currentUser.name}</p>
                        <p className="text-[10px] text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>

                    {hasActiveLicense && (
                      <>
                        <button onClick={handleDashboardClick} className="w-full px-4 py-2.5 text-left text-xs font-medium text-cyan-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                          <LayoutDashboard className="w-3.5 h-3.5" />Dashboard
                        </button>
                        <button onClick={handleTutorialsClick} className="w-full px-4 py-2.5 text-left text-xs font-medium text-cyan-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                          <BookOpen className="w-3.5 h-3.5" />Watch Tutorials
                        </button>
                        <button onClick={handleDownloadApk} className="w-full px-4 py-2.5 text-left text-xs font-medium text-cyan-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                          <Download className="w-3.5 h-3.5" />Download APK
                        </button>
                      </>
                    )}

                    <Button size="sm" className="w-full text-xs bg-red-500 hover:bg-red-600" onClick={handleSignOut}>
                      <LogOut className="w-3 h-3 mr-1.5" />Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleDownloadApk}
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-gray-600 hover:text-cyan-600 border border-gray-200 hover:border-cyan-400 rounded-lg px-3 py-2 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />Download APK
                    </button>
                    <Button size="sm" className="w-full text-xs bg-cyan-600 hover:bg-cyan-700" onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }}>
                      Login
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onNavigateToPricing={() => {
          const el = document.getElementById("pricing");
          if (el) {
            const headerHeight = document.querySelector("header")?.offsetHeight ?? 56;
            const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }}
      />
    </>
  );
}