import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Navbar } from "./components/Navbar";
import { TaglineBanner } from "./components/TaglineBanner";
import { Hero } from "./components/Hero";
import { FeaturesTree } from "./components/FeaturesTree";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Stats } from "./components/Stats";
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

import AdminDashboard from "./pages/AdminDashboard";

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

  /* ================= OPEN LOGIN FROM LOCATION STATE ================= */
  useEffect(() => {
    if (location.state?.openLogin) {
      setIsLoginModalOpen(true);
    }
  }, [location]);

  /* ================= LANDING PAGE ================= */
  const LandingPage = (
    <>
      <Navbar onSignInClick={() => setIsLoginModalOpen(true)} />
      <TaglineBanner />
      <Hero onStartTrialClick={() => setIsLoginModalOpen(true)} />

      <section id="features">
        <FeaturesTree />
        <Features />
      </section>

      <section id="how-it-works">
        <HowItWorks onStartTrialClick={() => setIsLoginModalOpen(true)} />
      </section>

      <Stats />

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

        <Route
          path="/pricing"
          element={
            <>
              <ScrollToSection id="pricing" />
              <Navbar onSignInClick={() => setIsLoginModalOpen(true)} />
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

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            <>
              <Navbar onSignInClick={() => setIsLoginModalOpen(true)} />
              <LoginModal
                isOpen={true}
                onClose={() => navigate(-1)}
                onLoginSuccess={() => navigate("/")}
              />
            </>
          }
        />

        {/* ================= CHECKOUT ================= */}
        <Route
          path="/checkout/*"
          element={<Checkout isOpen={true} onClose={() => {}} />}
        />

        {/* ================= PAYMENT SUCCESS ================= */}
        <Route path="/payment-success" element={<Success />} />

        {/* ================= ADMIN DASHBOARD (FIXED) ================= */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* ================= GLOBAL MODALS ================= */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {
          setIsLoginModalOpen(false);
          const redirectTo = location.state?.redirectTo;
          if (redirectTo) navigate(redirectTo);
          else navigate("/");
        }}
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
