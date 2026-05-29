import { useEffect } from "react";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { TrustedSection } from "../components/home/TrustedSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { PricingSection } from "../components/home/PricingSection";
import { FAQSection } from "../components/home/FAQSection";

export default function Home() {

  useEffect(() => {
    const scrollTo = sessionStorage.getItem("scrollTo");
    console.log("sessionStorage scrollTo:", scrollTo);
    if (!scrollTo) return;
    sessionStorage.removeItem("scrollTo");

    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(scrollTo);
      if (!el || el.getBoundingClientRect().height === 0) {
        if (attempts < 50) { attempts++; setTimeout(tryScroll, 80); }
        return;
      }
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // Wait for full page paint
    setTimeout(tryScroll, 800);
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TrustedSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
    </>
  );
}
