import { Phone } from "lucide-react";

interface NewFooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
  onCookieClick: () => void;
  onSecurityClick: () => void;
}

export function NewFooter({ onPrivacyClick, onTermsClick, onCookieClick, onSecurityClick }: NewFooterProps) {
  return (
    <footer className="relative bg-[#003366] text-gray-300 overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Divider */}
        <div className="h-px bg-gray-600 mb-10"></div>

        {/* Legal Links - Centered */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-10">
          <button
            onClick={onPrivacyClick}
            className="text-gray-300 hover:text-[#00bcd4] transition-all duration-300 hover:scale-105"
          >
            Privacy Policy
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={onTermsClick}
            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
          >
            Terms of Service
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={onCookieClick}
            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
          >
            Cookie Policy
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={onSecurityClick}
            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
          >
            Security
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center mb-4">
          <p className="text-gray-400">© 2025 CallFlow. All rights reserved.</p>
        </div>

        {/* Powered by Averlon */}
        <div className="text-center">
          <p className="text-sm text-white-500">
            Powered by{' '}
            <a 
              href="https://averlonworld.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              Averlon
            </a>
          </p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-cyan-400"></div>
    </footer>
  );
}