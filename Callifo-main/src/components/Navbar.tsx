import { Phone, Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    checkLoginStatus();
    
    // Listen for login status changes
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('userLoginStatusChanged', handleLoginStatusChange);
    window.addEventListener('storage', handleLoginStatusChange);
    
    return () => {
      window.removeEventListener('userLoginStatusChanged', handleLoginStatusChange);
      window.removeEventListener('storage', handleLoginStatusChange);
    };
  }, []);

  const checkLoginStatus = async () => {
    const userStr = localStorage.getItem("user");
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserEmail(user.email);
        setIsLoggedIn(true);
        
        // Check for active license
        await checkActiveLicense(user.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  const checkActiveLicense = async (email: string) => {
    try {
      console.log('[Navbar] Checking active license for:', email);
      const response = await fetch(
        `https://lisence-system.onrender.com/api/external/actve-license/${email}?productId=6958ee26be14694144dfb879`,
        {
          headers: {
            "x-api-key": "my-secret-key-123",
          },
        }
      );

      console.log('[Navbar] License check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[Navbar] License check response data:', data);
        
        // Check if activeLicense exists and status is 'active'
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        console.log('[Navbar] Has active license:', hasLicense);
        setHasActiveLicense(hasLicense);
      } else {
        console.log('[Navbar] License check failed - response not ok');
        setHasActiveLicense(false);
      }
    } catch (error) {
      console.error("[Navbar] Error checking active license:", error);
      setHasActiveLicense(false);
    }
  };

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

  const handleDownloadAPK = () => {
    const apkUrl = "https://intranet.rajlaxmiworld.com/jj";
    window.open(apkUrl, "_blank");
    setMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    if (!isLoggedIn) {
      onSignInClick();
    } else if (hasActiveLicense) {
      // Redirect to admin dashboard
      window.open("https://admin-callifo.onrender.com", "_blank");
    } else {
      // Navigate to pricing section
      handleNavClick("pricing");
    }
    setMobileMenuOpen(false);
  };

  const getCtaButtonText = () => {
    return "Login";
  };

  const getCtaButtonIcon = () => {
    return null;
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

            {/* Download APK Button */}
            <button
              onClick={handleDownloadAPK}
              className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download APK
            </button>

            <div className="text-right mr-2">
              <div className="text-[#003366] font-semibold">+91 9892440788</div>
              <div className="text-gray-600 text-sm">We work 24/7</div>
            </div>
            
            
            {/* Login Button */}
            <button
              onClick={handleCtaClick}
              className="px-6 py-2.5 bg-[#003366] text-white rounded-md hover:bg-[#004080] transition-all duration-300 text-sm font-medium flex items-center"
            >
              {getCtaButtonText()}
              {getCtaButtonIcon()}
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
                {/* Mobile Download APK Button */}
                <button
                  onClick={handleDownloadAPK}
                  className="w-full px-4 py-2.5 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white rounded-md transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download APK
                </button>

                {/* Mobile Login Button */}
                <button
                  onClick={handleCtaClick}
                  className="w-full px-4 py-2.5 bg-[#003366] text-white rounded-md transition-colors text-center flex items-center justify-center"
                >
                  {getCtaButtonText()}
                  {getCtaButtonIcon()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}