import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { TaglineBanner } from "./components/TaglineBanner";
import { Hero } from "./components/Hero";
import { FeaturesTree } from "./components/FeaturesTree";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";

import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { NewFooter } from "./components/NewFooter";

import { LoginModal } from "./components/LoginModal";
import { Checkout } from "./components/Checkout";
import { Success } from "./components/Success";

import { PrivacyPolicy } from "./components/legal/PrivacyPolicy";
import { TermsOfService } from "./components/legal/TermsOfService";
import { CookiePolicy } from "./components/legal/CookiePolicy";
import { Security } from "./components/legal/Security";
import { Partners } from "./components/Partners";
import { BecomePartner } from "./components/BecomePartner";
import AdminDashboard from "./pages/AdminDashboard";
import Tutorial_page from "./components/Tutorial_page";

/* ================= SCROLL HELPER ================= */
function ScrollToSection({ id }: { id: string }) {
  const location = useLocation();

  useEffect(() => {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location, id]);

  return null;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "partners" | "become-partner">("home");
  
  const handleBackToDirectory = () => {
    navigate("/partners");
  };

  /* ================= OPEN LOGIN FROM LOCATION STATE ================= */
  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginModalOpen(true);
    }
  }, [location]);

  /* ================= NAVIGATION FUNCTIONS ================= */
  const handleNavigateHome = () => {
    navigate("/");
    setCurrentPage("home");
  };

  const handleNavigateToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/"); // go to home first
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateToPartners = () => {
    navigate("/partners");
    setCurrentPage("partners");
  };

  /* ================= LOGIN SUCCESS HANDLER ================= */
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    
    // Trigger navbar refresh by dispatching a custom event
    window.dispatchEvent(new Event('userLoginStatusChanged'));
    
    const redirectTo = location.state?.redirectTo;
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      // Don't navigate away - LoginModal will handle navigation based on license status
    }
  };

  /* ================= LANDING PAGE ================= */
  const LandingPage = (
    <>
      <Navbar
        onSignInClick={() => setIsLoginModalOpen(true)} 
        onNavigateHome={handleNavigateHome}
        onNavigateToSection={handleNavigateToSection}
        onNavigateToPartners={handleNavigateToPartners}
        currentPage={currentPage}
      />

      <TaglineBanner />
      <Hero onStartTrialClick={() => setIsLoginModalOpen(true)} />

      <section id="features">
        <FeaturesTree />
        <Features />
      </section>

      <section id="how-it-works">
        <HowItWorks onStartTrialClick={() => setIsLoginModalOpen(true)} />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <NewFooter
        onPrivacyClick={() => setShowPrivacyPolicy(true)}
        onTermsClick={() => setShowTermsOfService(true)}
        onCookieClick={() => setShowCookiePolicy(true)}
        onSecurityClick={() => setShowSecurity(true)}
      />
    </>
  );

  return (
    <>
      <Routes>
        {/* ================= HOME ================= */}
        <Route path="/" element={LandingPage} />

        {/* ================= SCROLL ROUTES ================= */}
        <Route
          path="/features"
          element={
            <>
              <ScrollToSection id="features" />
              {LandingPage}
            </>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <>
              <ScrollToSection id="how-it-works" />
              {LandingPage}
            </>
          }
        />
        <Route
          path="/faq"
          element={
            <>
              <ScrollToSection id="faq" />
              {LandingPage}
            </>
          }
        />

        {/* Tutorial Page */}
        <Route path="/tutorials" element={<Tutorial_page />} />
        
        <Route
          path="/pricing"
          element={
            <>
              <ScrollToSection id="pricing" />
              <Navbar
                onSignInClick={() => setIsLoginModalOpen(true)}
                onNavigateHome={handleNavigateHome}
                onNavigateToSection={handleNavigateToSection}
                onNavigateToPartners={handleNavigateToPartners}
                currentPage={currentPage}
              />
              <Pricing />
              <NewFooter
                onPrivacyClick={() => setShowPrivacyPolicy(true)}
                onTermsClick={() => setShowTermsOfService(true)}
                onCookieClick={() => setShowCookiePolicy(true)}
                onSecurityClick={() => setShowSecurity(true)}
              />
            </>
          }
        />

        {/* ================= PARTNERS ================= */}
        <Route
          path="/partners"
          element={
            <>
              <Navbar
                onSignInClick={() => setIsLoginModalOpen(true)}
                onNavigateHome={handleNavigateHome}
                onNavigateToSection={handleNavigateToSection}
                onNavigateToPartners={handleNavigateToPartners}
                currentPage={currentPage}
              />
              <Partners onBecomePartnerClick={() => navigate("/become-partner")} />
              <NewFooter
                onPrivacyClick={() => setShowPrivacyPolicy(true)}
                onTermsClick={() => setShowTermsOfService(true)}
                onCookieClick={() => setShowCookiePolicy(true)}
                onSecurityClick={() => setShowSecurity(true)}
              />
            </>
          }
        />

        {/* ================= BECOME PARTNER ================= */}
        <Route
          path="/become-partner"
          element={
            <>
              <Navbar
                onSignInClick={() => setIsLoginModalOpen(true)}
                onNavigateHome={handleNavigateHome}
                onNavigateToSection={handleNavigateToSection}
                onNavigateToPartners={handleNavigateToPartners}
                currentPage={currentPage}
              />
              <BecomePartner onBackToDirectory={handleBackToDirectory} />
              <NewFooter
                onPrivacyClick={() => setShowPrivacyPolicy(true)}
                onTermsClick={() => setShowTermsOfService(true)}
                onCookieClick={() => setShowCookiePolicy(true)}
                onSecurityClick={() => setShowSecurity(true)}
              />
            </>
          }
        />

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            <>
              <Navbar
                onSignInClick={() => setIsLoginModalOpen(true)}
                onNavigateHome={handleNavigateHome}
                onNavigateToSection={handleNavigateToSection}
                onNavigateToPartners={handleNavigateToPartners}
                currentPage={currentPage}
              />
              <LoginModal
                isOpen={true}
                onClose={() => navigate(-1)}
                onLoginSuccess={handleLoginSuccess}
                onNavigateToPricing={() => handleNavigateToSection("pricing")}
              />
            </>
          }
        />

        {/* ================= CHECKOUT ================= */}
        <Route
          path="/checkout"
          element={<Checkout isOpen={true} onClose={() => navigate("/")} />}
        />

        {/* ================= PAYMENT SUCCESS ================= */}
        <Route path="/payment-success" element={<Success />} />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* ================= GLOBAL MODALS ================= */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onNavigateToPricing={() => handleNavigateToSection("pricing")}
      />

      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
      {showTermsOfService && (
        <TermsOfService onClose={() => setShowTermsOfService(false)} />
      )}
      {showCookiePolicy && (
        <CookiePolicy onClose={() => setShowCookiePolicy(false)} />
      )}
      {showSecurity && <Security onClose={() => setShowSecurity(false)} />}
    </>
  );
}