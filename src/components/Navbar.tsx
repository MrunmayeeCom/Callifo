import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onSignInClick: () => void;
}

export function Navbar({ onSignInClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToRoute = (route: string) => {
    setMobileMenuOpen(false);
    navigate(route);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => goToRoute("/")}
          >
            <div className="w-10 h-10 bg-[#00bcd4] rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#003366] text-2xl font-bold">
              CallFlow
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => goToRoute("/features")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              Features
            </button>

            <button
              onClick={() => goToRoute("/how-it-works")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              How It Works
            </button>

            <button
              onClick={() => goToRoute("/pricing")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              Pricing
            </button>

            <button
              onClick={() => goToRoute("/faq")}
              className="text-gray-700 hover:text-cyan-500 transition-colors text-base"
            >
              FAQ
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right mr-2">
              <div className="text-[#003366] font-semibold">
                +91 9892440788
              </div>
              <div className="text-gray-600 text-sm">
                We work 24/7
              </div>
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
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => goToRoute("/features")}
                className="text-left text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1"
              >
                Features
              </button>

              <button
                onClick={() => goToRoute("/how-it-works")}
                className="text-left text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1"
              >
                How It Works
              </button>

              <button
                onClick={() => goToRoute("/pricing")}
                className="text-left text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1"
              >
                Pricing
              </button>

              <button
                onClick={() => goToRoute("/faq")}
                className="text-left text-gray-700 hover:text-cyan-500 transition-colors px-2 py-1"
              >
                FAQ
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
