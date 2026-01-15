import { Phone, Menu, X, Download } from "lucide-react";
import { useState } from "react";
import logo from "./assets/Callifo_logo.png";

interface NavbarProps {
  onSignInClick: () => void;
  onNavigateHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToPartners: () => void;
  currentPage: "home" | "partners" | "become-partner";
}

export function Navbar({
  onSignInClick,
  onNavigateHome,
  onNavigateToSection,
  onNavigateToPartners,
  currentPage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(sectionId);
  };

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    onNavigateHome();
  };

  const handlePartnersClick = () => {
    setMobileMenuOpen(false);
    onNavigateToPartners();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Callifo Logo"
              className="h-10 w-auto object-contain cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => handleNavClick("features")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick("pricing")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick("faq")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              FAQ
            </button>
            <button
              onClick={handlePartnersClick}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              Partners
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right mr-2">
              <div className="text-[#003366] font-semibold">+91 9892440788</div>
              <div className="text-gray-600 text-sm">We work 24/7</div>
            </div>
            <button
              onClick={onSignInClick}
              className="px-6 py-2.5 bg-[#003366] text-white rounded-md hover:bg-[#004080] transition-all duration-300 text-sm font-medium"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavClick("features")}
                className="text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1 text-left"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("how-it-works")}
                className="text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1 text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick("pricing")}
                className="text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1 text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavClick("faq")}
                className="text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1 text-left"
              >
                FAQ
              </button>
              <button
                onClick={handlePartnersClick}
                className="text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1 text-left"
              >
                Partners
              </button>

              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    onSignInClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 bg-[#003366] text-white rounded-md transition-colors text-center"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
