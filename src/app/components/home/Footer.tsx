import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Logo } from "../Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import { PrivacyPolicyModal } from "../home/PrivacyPolicyModal";
import { TermsOfServiceModal } from "../home/TermsOfServiceModal";
import { CookiePolicyModal } from "../home/CookiePolicyModal";
import { SecurityModal } from "../home/SecurityModal";

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  
  const scrollWhenReady = (hash: string) => {
    let attempts = 0;
    let scrolled = false;
    const tryScroll = () => {
      if (scrolled) return;
      const el = document.getElementById(hash);
      if (el && el.getBoundingClientRect().height > 0) {
        scrolled = true;
        const headerHeight = document.querySelector("header")?.offsetHeight ?? 56;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 40) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  };

  const handleNavLink = (hash: string) => {
    if (location.pathname === "/") {
      scrollWhenReady(hash);
    } else {
      sessionStorage.setItem("scrollTo", hash);
      navigate("/");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .footer-wrap {
          font-family: 'Inter', sans-serif;
          background: #0a0f1e;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }

        .footer-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 20px 0;
          position: relative;
          z-index: 1;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          align-items: start;
        }

        @media (min-width: 520px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-inner { padding: 40px 32px 0; }
        }

        @media (min-width: 900px) {
          .footer-top { grid-template-columns: 2fr 1fr 1.8fr; gap: 64px; padding-bottom: 40px; }
          .footer-inner { padding: 48px 40px 0; }
        }

        .footer-wrap .footer-logo-wrap span,
        .footer-wrap .footer-logo-wrap p,
        .footer-wrap .footer-logo-wrap h1,
        .footer-wrap .footer-logo-wrap div,
        .footer-wrap .footer-logo-wrap a {
          color: #ffffff !important;
        }

        .footer-brand-desc {
          font-size: 13.5px;
          color: #94a3b8;
          line-height: 1.75;
          margin: 16px 0 0 0;
          font-weight: 400;
          max-width: 320px;
        }

        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          color: #f0f4ff;
          margin: 0 0 18px 0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links button {
          font-size: 13.5px;
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.15s ease;
          font-weight: 400;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: 'Inter', sans-serif;
          text-align: left;
        }

        .footer-links button:hover { color: #0ea5e9; }

        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13.5px;
          color: #94a3b8;
          line-height: 1.6;
        }

        .footer-contact-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .footer-contact-icon svg {
          width: 13px;
          height: 13px;
          color: #0ea5e9;
        }

        .footer-contact-item a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-contact-item a:hover, .footer-contact-item span:hover { color: #0ea5e9; }

        /* On mobile the brand col spans full width so contact (which is wide) doesn't crowd */
        @media (min-width: 520px) and (max-width: 899px) {
          .footer-brand-col { grid-column: 1 / -1; }
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          padding: 20px 0 28px;
        }

        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .footer-copy {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
          line-height: 1.5;
        }

        @media (min-width: 640px) {
          .footer-copy { font-size: 12.5px; color: #ffffff; }
        }

        .footer-legal {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 16px;
        }

        @media (min-width: 640px) {
          .footer-legal { gap: 20px; }
        }

        .footer-legal button {
          font-size: 12px;
          color: #94a3b8;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-family: 'Inter', sans-serif;
          transition: color 0.15s ease;
        }

        @media (min-width: 640px) {
          .footer-legal button { font-size: 12.5px; color: #ffffff; }
        }

        .footer-legal button:hover { color: #0ea5e9; }
      `}</style>

      <footer className="footer-wrap">
        <div className="footer-glow" />
        <div className="footer-inner">

          <div className="footer-top">

            {/* Brand */}
            <div className="footer-brand-col">
              <div className="footer-logo-wrap"><Logo /></div>
              <p className="footer-brand-desc">
                AI-powered call management system that streamlines your customer communication.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="footer-col-title">Product</h4>
              <ul className="footer-links">
                <li><button onClick={() => handleNavLink("features")}>Features</button></li>
                <li><button onClick={() => handleNavLink("pricing")}>Pricing</button></li>
                <li><button onClick={() => handleNavLink("faq")}>FAQ</button></li>
                <li><button onClick={() => navigate("/partners")}>Partners</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-col-title">Contact</h4>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">
                  <span className="footer-contact-icon"><Mail /></span>
                  <a>info@averlonworld.com</a>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon"><Phone /></span>
                  <a>+91 9892440788</a>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon"><MapPin /></span>
                  <span>5th Floor, Lodha Supremus II, Unit No. A-533/A-515, Wagle Industrial Estate, Thane West, Maharashtra 400604</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p className="footer-copy">© {new Date().getFullYear()} Callifo. All rights reserved. Powered by Averlon.</p>
            <div className="footer-legal">
              <button onClick={() => navigate("/privacy-policy")}>Privacy Policy</button>
              <button onClick={() => setTermsOpen(true)}>Terms of Service</button>
              <button onClick={() => setCookieOpen(true)}>Cookie Policy</button>
              <button onClick={() => setSecurityOpen(true)}>Security</button>
              <button onClick={() => navigate("/eula")}>EULA</button>
            </div>
          </div>

        </div>

        <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
        <CookiePolicyModal isOpen={cookieOpen} onClose={() => setCookieOpen(false)} />
        <SecurityModal isOpen={securityOpen} onClose={() => setSecurityOpen(false)} />
      </footer>
    </>
  );
}