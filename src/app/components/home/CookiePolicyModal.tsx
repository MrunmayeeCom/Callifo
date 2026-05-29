import { X } from "lucide-react";

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CookiePolicyModal({ isOpen, onClose }: CookiePolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        background: "rgba(8, 20, 45, 0.5)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Inter', sans-serif",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          maxHeight: "85vh",
          borderRadius: "18px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 24px 64px rgba(0, 20, 60, 0.2), 0 4px 16px rgba(0, 20, 60, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Sticky Header ── */}
        <div
          style={{
            padding: "20px 28px 18px",
            borderBottom: "1px solid #f0f4f8",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "linear-gradient(135deg, #0f3460 0%, #1a5276 60%, #1f6fa8 100%)",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.2px" }}>
              Cookie Policy
            </h2>
            {/* FIX: Updated date to match document filename (Dec 27, 2025) */}
            <p style={{ margin: "3px 0 0", fontSize: "11.5px", color: "rgba(186,220,255,0.85)" }}>
              Last updated: December 27, 2025
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "8px",
              width: "30px", height: "30px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.85)",
              flexShrink: 0,
              marginLeft: "12px",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Scrollable Content ── */}
        <div
          style={{
            overflowY: "auto",
            padding: "24px 28px 28px",
            flex: 1,
            color: "#374151",
            fontSize: "13.5px",
            lineHeight: "1.7",
          }}
        >
          {/* Section 1 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>1. What Are Cookies?</h3>
            <p style={para}>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            {/* FIX: Clarified that Callifo is a product of Averlon World */}
            <p style={para}>
              Callifo, a product of <strong>Averlon World</strong>, uses cookies and similar tracking technologies to track activity on our service and store certain information to provide you with a better, faster, and safer experience.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>2. Types of Cookies We Use</h3>

            <h4 style={subTitle}>Essential Cookies</h4>
            <p style={para}>These cookies are necessary for the website to function properly and cannot be disabled.</p>
            <ul style={list}>
              <li style={listItem}>Authentication and security</li>
              <li style={listItem}>Session management</li>
              <li style={listItem}>Load balancing</li>
            </ul>

            <h4 style={subTitle}>Performance Cookies</h4>
            <p style={para}>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
            <ul style={list}>
              <li style={listItem}>Google Analytics</li>
              <li style={listItem}>Page load times</li>
              <li style={listItem}>Error tracking</li>
            </ul>

            <h4 style={subTitle}>Functional Cookies</h4>
            <p style={para}>These cookies enable enhanced functionality and personalization.</p>
            <ul style={list}>
              <li style={listItem}>Language preferences</li>
              <li style={listItem}>User interface customization</li>
              <li style={listItem}>Regional settings</li>
            </ul>

            <h4 style={subTitle}>Targeting/Advertising Cookies</h4>
            <p style={para}>These cookies are used to deliver advertisements relevant to you and your interests.</p>
            <ul style={list}>
              <li style={listItem}>Marketing campaign tracking</li>
              <li style={listItem}>Retargeting</li>
              <li style={listItem}>Interest-based advertising</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>3. Third-Party Cookies</h3>
            <p style={para}>In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements:</p>
            {/* FIX: Removed Intercom (not in technical docs) and LinkedIn Insights (unverified).
                Only keeping services confirmed in the Callifo documentation. */}
            <ul style={list}>
              <li style={listItem}><strong>Google Analytics:</strong> Web analytics service to analyze website usage</li>
              <li style={listItem}><strong>Google Ads:</strong> Advertising and remarketing services</li>
              <li style={listItem}><strong>Facebook Pixel:</strong> Conversion tracking and audience building</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>4. How Long Do Cookies Last?</h3>
            <p style={para}>Cookies can be either "session" or "persistent" cookies:</p>

            <div style={cookieCard}>
              <h4 style={cardTitle}>Session Cookies</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#4b5563" }}>
                These are temporary cookies that expire when you close your browser. They help us remember what you've done on previous pages within the same browsing session.
              </p>
            </div>

            <div style={cookieCard}>
              <h4 style={cardTitle}>Persistent Cookies</h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#4b5563" }}>
                These cookies remain on your device until they expire or you delete them. They help us recognize you as a returning visitor and remember your preferences.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>5. Managing Cookies</h3>
            <p style={para}>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several ways:</p>

            <h4 style={subTitle}>Browser Settings</h4>
            <p style={para}>Most web browsers allow you to control cookies through their settings. However, limiting cookies may impact your experience of our website.</p>

            <h4 style={subTitle}>Cookie Consent Tool</h4>
            <p style={para}>When you first visit our website, you can choose which categories of cookies to accept through our cookie consent banner.</p>

            <h4 style={subTitle}>Opt-Out Links</h4>
            <p style={para}>You can opt out of certain third-party cookies:</p>
            <ul style={list}>
              <li style={listItem}>Google Analytics: Google Analytics Opt-out</li>
              <li style={listItem}>Google Ads: Ad Settings</li>
              <li style={listItem}>Facebook: Ad Preferences</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>6. Do Not Track</h3>
            {/* FIX: Added India DPDP Act 2023 reference for legal compliance */}
            <p style={para}>
              Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to be tracked. Currently, there is no universal standard for how DNT signals should be interpreted, and we do not currently respond to DNT signals automatically.
            </p>
            <p style={para}>
              However, as an Indian company, Averlon World is committed to complying with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>. You may exercise your data rights — including the right to access, correct, or withdraw consent for your personal data — by contacting us directly at the details provided in Section 8.
            </p>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>7. Updates to This Policy</h3>
            <p style={para}>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. We will notify you of any material changes by posting the new policy on this page.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: "4px" }}>
            <h3 style={sectionTitle}>8. Contact Us</h3>
            {/* FIX: Updated contact heading to reflect Averlon World as the legal entity behind Callifo */}
            <p style={para}>If you have any questions about our use of cookies or wish to exercise your data rights, please contact Averlon World:</p>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e8edf2",
                borderRadius: "12px",
                padding: "16px 20px",
                marginTop: "10px",
                fontSize: "13px",
                color: "#374151",
                lineHeight: "2",
              }}
            >
              <div><span style={{ fontWeight: 600, color: "#1a5276" }}>Email:</span> info@averlonworld.com</div>
              <div><span style={{ fontWeight: 600, color: "#1a5276" }}>Phone:</span> +91 9892440788</div>
              <div><span style={{ fontWeight: 600, color: "#1a5276" }}>Address:</span> 5th Floor, Lodha Supremus II, Unit No. A-515/A-533, Wagle Industrial Estate, Thane West, Maharashtra 400604</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ── Style constants ──
const sectionTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0f3460",
  margin: "0 0 8px 0",
  paddingBottom: "6px",
  borderBottom: "1.5px solid #e8f0fe",
};

const subTitle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151",
  margin: "12px 0 6px 0",
};

const para: React.CSSProperties = {
  margin: "0 0 8px 0",
  color: "#4b5563",
};

const list: React.CSSProperties = {
  margin: "4px 0 8px 0",
  paddingLeft: "20px",
  color: "#4b5563",
};

const listItem: React.CSSProperties = {
  marginBottom: "4px",
};

const cookieCard: React.CSSProperties = {
  background: "#f8fafc",
  border: "1px solid #e8edf2",
  borderLeft: "3px solid #1a5276",
  borderRadius: "10px",
  padding: "12px 16px",
  marginBottom: "10px",
};

const cardTitle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "#1a5276",
  margin: "0 0 6px 0",
};