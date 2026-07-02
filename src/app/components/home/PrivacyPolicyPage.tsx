import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "32px 24px 40px",
          background: "linear-gradient(135deg, #0f3460 0%, #1a5276 60%, #1f6fa8 100%)",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.9)",
              fontSize: "13px",
              fontWeight: 500,
              marginBottom: "20px",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <h1 style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.3px",
          }}>
            Privacy Policy
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "rgba(186,220,255,0.85)" }}>
            Last updated: December 11, 2025
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        style={{
          maxWidth: "820px",
          margin: "0 auto",
          padding: "36px 24px 64px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "32px 36px",
            boxShadow: "0 4px 16px rgba(0, 20, 60, 0.06)",
            color: "#374151",
            fontSize: "13.5px",
            lineHeight: "1.7",
          }}
        >
          {/* Section 1 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>1. Introduction</h3>
            <p style={para}>
              Welcome to Callifo ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our call management and lead tracking platform.
            </p>
            <p style={para}>
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>2. Information We Collect</h3>
            <h4 style={subTitle}>Personal Information</h4>
            <p style={para}>
              We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us or our products and services, or otherwise contact us.
            </p>
            <ul style={list}>
              <li style={listItem}>Name and contact information (email address, phone number)</li>
              <li style={listItem}>Business information (company name, department, role)</li>
              <li style={listItem}>Account credentials (username, password)</li>
            </ul>
            <h4 style={subTitle}>Usage Data</h4>
            <p style={para}>We automatically collect certain information when you visit, use, or navigate the platform:</p>
            <ul style={list}>
              <li style={listItem}>Device information (device ID, Android version, app version)</li>
              <li style={listItem}>IP address and location data</li>
              <li style={listItem}>Usage patterns and analytics</li>
            </ul>
            <h4 style={subTitle}>Call & SIM Data</h4>
            <p style={para}>As part of the core call tracking functionality, we collect:</p>
            <ul style={list}>
              <li style={listItem}>Call metadata (direction, duration, timestamp, and call type — incoming, outgoing, or missed)</li>
              <li style={listItem}>SIM card information (SIM slot, SIM number, carrier name, and office SIM designation)</li>
              <li style={listItem}>Bitrix24 CRM lead IDs and synchronisation status associated with call records</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>3. How We Use Your Information</h3>
            <p style={para}>We use the information we collect or receive:</p>
            <ul style={list}>
              <li style={listItem}>To provide and maintain our services</li>
              <li style={listItem}>To manage your account and user session</li>
              <li style={listItem}>To track, log, and categorise calls made or received by your sales team</li>
              <li style={listItem}>To synchronise call records and lead data with Bitrix24 CRM via API webhooks</li>
              <li style={listItem}>To generate call analytics and performance reports per user, per day, and per month</li>
              <li style={listItem}>To send you technical notices and support messages</li>
              <li style={listItem}>To respond to your comments and questions</li>
              <li style={listItem}>To detect, prevent, and address technical issues</li>
              <li style={listItem}>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>4. Data Sharing and Disclosure</h3>
            <p style={para}>We may share your information in the following situations:</p>
            <ul style={list}>
              <li style={listItem}><strong>Bitrix24 CRM:</strong> Call records, lead information, and call timeline data are synchronised with Bitrix24 via secure API webhooks as a core function of the platform</li>
              <li style={listItem}><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
              <li style={listItem}><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition</li>
              <li style={listItem}><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li style={listItem}><strong>With Your Consent:</strong> With your explicit permission for other purposes</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>5. Data Security</h3>
            <p style={para}>
              We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>6. Your Privacy Rights</h3>
            <p style={para}>Depending on your location, you may have the following rights:</p>
            <ul style={list}>
              <li style={listItem}>Access and receive a copy of your personal data</li>
              <li style={listItem}>Rectify or update inaccurate information</li>
              <li style={listItem}>Request deletion of your personal data</li>
              <li style={listItem}>Object to or restrict processing of your data</li>
              <li style={listItem}>Data portability</li>
              <li style={listItem}>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>7. Data Retention</h3>
            <p style={para}>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>8. Children's Privacy</h3>
            <p style={para}>
              Callifo is intended for business and professional use only and is not designed for or directed toward individuals under the age of 18. We do not knowingly collect personal information from minors.
            </p>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>9. Updates to This Policy</h3>
            <p style={para}>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Section 10 */}
          <section style={{ marginBottom: "4px" }}>
            <h3 style={sectionTitle}>10. Contact Us</h3>
            <p style={para}>If you have questions or comments about this policy, you may contact us at:</p>
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