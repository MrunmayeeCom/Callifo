import { X } from "lucide-react";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
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
              Terms of Service
            </h2>
            <p style={{ margin: "3px 0 0", fontSize: "11.5px", color: "rgba(186,220,255,0.85)" }}>
              Last updated: December 11, 2025
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
            <h3 style={sectionTitle}>1. Agreement to Terms</h3>
            <p style={para}>
              These Terms of Service constitute a legally binding agreement between you and Callifo ("Company," "we," "us," or "our") concerning your access to and use of our call management and lead tracking platform and services.
            </p>
            <p style={para}>
              By accessing or using our services, you agree that you have read, understood, and agree to be bound by these Terms. If you do not agree, you are not authorized to access or use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>2. Acceptable Use</h3>
            <p style={para}>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul style={list}>
              <li style={listItem}>Violate any applicable laws or regulations</li>
              <li style={listItem}>Infringe upon the rights of others</li>
              <li style={listItem}>Transmit any harmful or malicious code</li>
              <li style={listItem}>Attempt to gain unauthorized access to our systems</li>
              <li style={listItem}>Use the service for spam or unsolicited communications</li>
              <li style={listItem}>Interfere with or disrupt the service or servers</li>
              <li style={listItem}>Impersonate any person or entity</li>
              <li style={listItem}>Collect or store personal data of other users</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>3. User Accounts</h3>
            <p style={para}>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:</p>
            <ul style={list}>
              <li style={listItem}>Maintaining the security of your account credentials</li>
              <li style={listItem}>All activities that occur under your account</li>
              <li style={listItem}>Notifying us immediately of any unauthorized use</li>
              <li style={listItem}>Ensuring your account information is up to date</li>
            </ul>
            <p style={para}>We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, false, or misleading.</p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>4. Intellectual Property Rights</h3>
            <p style={para}>
              The service and its original content, features, and functionality are owned by Callifo and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p style={para}>You may not copy, modify, distribute, sell, or lease any part of our services without our express written permission.</p>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>5. Service Availability</h3>
            <p style={para}>We strive to provide reliable service but cannot guarantee:</p>
            <ul style={list}>
              <li style={listItem}>Uninterrupted or error-free operation</li>
              <li style={listItem}>That defects will be corrected immediately</li>
              <li style={listItem}>That the service is free from viruses or harmful components</li>
              <li style={listItem}>That results obtained from using the service will be accurate or reliable</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>6. Limitation of Liability</h3>
            <p style={para}>To the maximum extent permitted by law, Callifo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation:</p>
            <ul style={list}>
              <li style={listItem}>Loss of profits, data, or use</li>
              <li style={listItem}>Cost of procurement of substitute services</li>
              <li style={listItem}>Business interruption</li>
              <li style={listItem}>Any other commercial damages or losses</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>7. Indemnification</h3>
            <p style={para}>
              You agree to defend, indemnify, and hold harmless Callifo and its officers, directors, employees, and agents from any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the service or violation of these Terms.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>8. Termination</h3>
            <p style={para}>We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including:</p>
            <ul style={list}>
              <li style={listItem}>Breach of these Terms</li>
              <li style={listItem}>At our sole discretion</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>9. Governing Law</h3>
            <p style={para}>
              These Terms shall be governed by and construed in accordance with the laws of Maharashtra, India, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Section 10 */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>10. Changes to Terms</h3>
            <p style={para}>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website and updating the "Last updated" date.
            </p>
          </section>

          {/* Section 11 */}
          <section style={{ marginBottom: "4px" }}>
            <h3 style={sectionTitle}>11. Contact Information</h3>
            <p style={para}>If you have any questions about these Terms, please contact us:</p>
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