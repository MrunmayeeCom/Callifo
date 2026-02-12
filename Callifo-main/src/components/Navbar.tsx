import { useState, useEffect, useRef } from "react";
import { Menu, X, LogOut, ChevronDown, LayoutDashboard, Download } from "lucide-react";
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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [hasActiveLicense, setHasActiveLicense] = useState(false);
  const [isCheckingLicense, setIsCheckingLicense] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check for active license
  const checkActiveLicense = async (email: string): Promise<boolean> => {
    try {
      setIsCheckingLicense(true);
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
        
        const hasLicense = data.activeLicense && data.activeLicense.status === 'active';
        console.log('[Navbar] Has active license:', hasLicense);
        setHasActiveLicense(hasLicense);
        return hasLicense;
      }
      
      console.log('[Navbar] License check failed - response not ok');
      setHasActiveLicense(false);
      return false;
    } catch (error) {
      console.error("[Navbar] Error checking active license:", error);
      setHasActiveLicense(false);
      return false;
    } finally {
      setIsCheckingLicense(false);
    }
  };

  // Check for logged-in user on mount and whenever localStorage changes
  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser({
            name: user.name || user.email.split("@")[0],
            email: user.email
          });
          // Check license status when user is detected
          if (user.email) {
            checkActiveLicense(user.email);
          }
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
    
    // Listen for storage changes (in case user logs in from another tab)
    window.addEventListener("storage", checkUser);
    
    // Listen for custom login events
    window.addEventListener("userLoggedIn", checkUser);
    window.addEventListener("userLoginStatusChanged", checkUser);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userLoggedIn", checkUser);
      window.removeEventListener("userLoginStatusChanged", checkUser);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    onNavigateHome();
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(sectionId);
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

  const handleDashboardClick = () => {
    setIsProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    // Redirect to external dashboard
    window.open("https://admin-callifo.onrender.com", "_blank");
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setHasActiveLicense(false);
    setIsProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    
    // Dispatch custom events to notify other components
    window.dispatchEvent(new Event("userLoggedOut"));
    window.dispatchEvent(new Event("userLoginStatusChanged"));
    
    // Navigate to home
    onNavigateHome();
  };

  const handleLoginClick = () => {
    // Check if user is already logged in
    if (currentUser) {
      alert("You are already logged in!");
      return;
    }
    onSignInClick();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
              className="h-10 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => handleNavClick("features")}
              className="text-sm font-medium text-gray-700 hover:text-[#003366] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("how-it-works")}
              className="text-sm font-medium text-gray-700 hover:text-[#003366] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick("pricing")}
              className="text-sm font-medium text-gray-700 hover:text-[#003366] transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick("faq")}
              className="text-sm font-medium text-gray-700 hover:text-[#003366] transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={handlePartnersClick}
              className="text-sm font-medium text-gray-700 hover:text-[#003366] transition-colors"
            >
              Partners
            </button>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Download APK Button */}
            <button
              onClick={handleDownloadAPK}
              className="border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download APK
            </button>

            {/* Phone Number */}
            <div className="text-right leading-tight">
              <a
                href="tel:+919892440788"
                className="text-sm font-semibold text-[#003366] hover:underline block"
              >
                +91 9892440788
              </a>
              <span className="text-xs text-gray-500">We work 24/7</span>
            </div>

            {/* User Profile or Login Button */}
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  {/* Profile Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#003366] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                    {getInitials(currentUser.name)}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-[#003366] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                          {getInitials(currentUser.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard - Only show if user has active license */}
                    {hasActiveLicense && (
                      <button
                        onClick={handleDashboardClick}
                        className="w-full px-4 py-3 text-left text-sm font-medium text-[#1e3a5f] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                    )}

                    {/* Sign Out */}
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-red-50 flex items-center gap-3 transition-colors"
                      style={{ color: '#dc2626' }}
                    >
                      <LogOut className="w-4 h-4" style={{ color: '#dc2626' }} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
                className="text-sm font-medium text-gray-700 hover:text-[#003366] px-2 py-1 text-left"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("how-it-works")}
                className="text-sm font-medium text-gray-700 hover:text-[#003366] px-2 py-1 text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick("pricing")}
                className="text-sm font-medium text-gray-700 hover:text-[#003366] px-2 py-1 text-left"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavClick("faq")}
                className="text-sm font-medium text-gray-700 hover:text-[#003366] px-2 py-1 text-left"
              >
                FAQ
              </button>
              <button
                onClick={handlePartnersClick}
                className="text-sm font-medium text-gray-700 hover:text-[#003366] px-2 py-1 text-left"
              >
                Partners
              </button>

              {/* Mobile User Profile */}
              {currentUser ? (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-semibold text-base shadow-sm">
                      {getInitials(currentUser.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>

                  {/* Mobile Download APK Button */}
                  <button
                    onClick={handleDownloadAPK}
                    className="w-full px-4 py-2.5 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download APK
                  </button>

                  {/* Dashboard Button for Mobile - Only if has license */}
                  {hasActiveLicense && (
                    <button
                      onClick={handleDashboardClick}
                      className="w-full px-4 py-2.5 border border-gray-300 text-[#1e3a5f] hover:bg-gray-50 rounded-md transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2.5 border border-gray-300 text-[#dc2626] hover:bg-red-50 rounded-md transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {/* Mobile Download APK Button */}
                  <button
                    onClick={handleDownloadAPK}
                    className="w-full px-4 py-2.5 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download APK
                  </button>

                  {/* Mobile Login Button */}
                  <button
                    onClick={handleLoginClick}
                    className="w-full px-4 py-2.5 bg-[#003366] hover:bg-[#002244] text-white rounded-md transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}