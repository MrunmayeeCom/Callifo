import { X } from "lucide-react";

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityModal({ isOpen, onClose }: SecurityModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
          boxShadow:
            "0 24px 64px rgba(0, 20, 60, 0.2), 0 4px 16px rgba(0, 20, 60, 0.1)",
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
            background:
              "linear-gradient(135deg, #0f3460 0%, #1a5276 60%, #1f6fa8 100%)",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-0.2px",
              }}
            >
              Security
            </h2>
            {/* FIX: Date updated to match the documentation filename (Dec 27, 2025) */}
            <p
              style={{
                margin: "3px 0 0",
                fontSize: "11.5px",
                color: "rgba(186,220,255,0.85)",
              }}
            >
              Last updated: December 27, 2025
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "8px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.85)",
              flexShrink: 0,
              marginLeft: "12px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.22)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
            }
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
          {/* Intro */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Our Commitment to Security</h3>
            {/* FIX: Named Averlon World as the parent company behind Callifo */}
            <p style={para}>
              At Callifo, a product of <strong>Averlon World</strong>, security
              is not just a feature — it's our foundation. We understand that
              you trust us with your most valuable business communications, and
              we take that responsibility seriously. We employ industry-leading
              security practices to protect your data and ensure the integrity
              of our platform.
            </p>
            <p style={para}>
              This document outlines our comprehensive approach to security,
              including the technical, physical, and administrative measures we
              implement to safeguard your information.
            </p>
          </section>

          {/* Security Framework */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Security Framework</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginTop: "8px",
                gridTemplateAreas: `"a b" "c c"`,
              }}
            >
              {[
                {
                  title: "Data Encryption",
                  desc: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption standards.",
                  area: "a",
                },
                {
                  title: "Monitoring",
                  desc: "24/7 security monitoring and automated threat detection systems protect against intrusions.",
                  area: "b",
                },
                {
                  // FIX: Changed "AWS" to "Render" — the actual hosting platform per the technical documentation
                  title: "Infrastructure",
                  desc: "Enterprise-grade infrastructure hosted on Render with built-in DDoS protection, redundancy, and disaster recovery.",
                  area: "c",
                },
              ].map((item) => (
                <div key={item.title} style={{ ...cookieCard, gridArea: item.area }}>
                  <h4 style={cardTitle}>{item.title}</h4>
                  <p
                    style={{ margin: 0, fontSize: "12.5px", color: "#4b5563" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Protection */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Data Protection Measures</h3>
            <h4 style={subTitle}>Encryption</h4>
            <p style={para}>
              We implement multiple layers of encryption to protect your data:
            </p>
            <ul style={list}>
              <li style={listItem}>
                <strong>In Transit:</strong> TLS 1.3 encryption for all data
                transmitted between your browser and our servers
              </li>
              <li style={listItem}>
                <strong>At Rest:</strong> AES-256 encryption for all stored data
                including databases and backups
              </li>
              <li style={listItem}>
                <strong>Application Level:</strong> Additional encryption for
                sensitive fields like passwords and API keys
              </li>
            </ul>
            <h4 style={subTitle}>Access Controls</h4>
            <p style={para}>
              We implement strict access controls to ensure only authorized
              personnel can access your data:
            </p>
            <ul style={list}>
              <li style={listItem}>
                Role-based access control (RBAC) with three distinct roles: Sales Team, Manager, and Admin/Owner
              </li>
              <li style={listItem}>
                Sales team members access only the mobile app and their own call statistics
              </li>
              <li style={listItem}>
                Admins and managers access the web dashboard for team-wide analytics and lead management
              </li>
              <li style={listItem}>
                API keys and credentials stored securely in environment variables, never hardcoded
              </li>
              <li style={listItem}>
                Secure API webhook authentication for all Bitrix24 CRM integrations
              </li>
            </ul>
          </section>

          {/* Infrastructure Security */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Infrastructure Security</h3>
            <h4 style={subTitle}>Hosting & Deployment</h4>
            <ul style={list}>
              <li style={listItem}>
                All services hosted on Render — a managed cloud platform with built-in DDoS protection
              </li>
              <li style={listItem}>
                Backend API built on Django REST Framework with HTTPS enforced on all endpoints
              </li>
              <li style={listItem}>
                PostgreSQL 14+ database with secure connection strings managed via environment variables
              </li>
              <li style={listItem}>
                Separate deployment environments for mobile app, backend API, and admin dashboard
              </li>
            </ul>
            <h4 style={subTitle}>Application Security</h4>
            <ul style={list}>
              <li style={listItem}>
                All API endpoints secured with API key authentication
              </li>
              <li style={listItem}>
                Bitrix24 CRM integration uses secure webhook tokens
              </li>
              <li style={listItem}>
                Sensitive configuration values (API keys, DB credentials) stored in{" "}
                <code>.env</code> files, excluded from version control
              </li>
              <li style={listItem}>
                Mobile app requires explicit user permissions for call log and contact access
              </li>
            </ul>
          </section>

          {/* Incident Response */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Incident Response</h3>
            <p style={para}>
              We take security incidents seriously and are committed to responding promptly:
            </p>
            <ul style={list}>
              <li style={listItem}>
                Security issues can be reported directly to info@averlonworld.com
              </li>
              <li style={listItem}>
                Initial response to security reports within 48 hours
              </li>
              <li style={listItem}>
                Customers will be notified of any confirmed data breach affecting their account
              </li>
              <li style={listItem}>
                Post-incident review and remediation for all confirmed security events
              </li>
              {/* FIX: Added DPDP Act 2023 breach notification obligation for Indian legal compliance */}
              <li style={listItem}>
                In accordance with India's <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>,
                Averlon World will notify affected users and the Data Protection Board in the event
                of a personal data breach, as required by law
              </li>
            </ul>
          </section>

          {/* Backup & Recovery */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Data Backup & Disaster Recovery</h3>
            <p style={para}>
              We ensure business continuity and data resilience through:
            </p>
            <ul style={list}>
              <li style={listItem}>
                Automated daily backups with 30-day retention
              </li>
              <li style={listItem}>
                Geographically distributed backup storage
              </li>
              <li style={listItem}>Regular backup restoration testing</li>
              <li style={listItem}>99.9% uptime SLA</li>
              <li style={listItem}>Multi-region redundancy</li>
              <li style={listItem}>
                Disaster recovery plan with RTO &lt; 4 hours
              </li>
            </ul>
          </section>

          {/* Data Handling */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Data Handling</h3>
            <p style={para}>We are careful about how your data is collected and used:</p>
            <ul style={list}>
              <li style={listItem}>
                Only call metadata is collected — phone number, duration, timestamp, SIM used, and call direction
              </li>
              <li style={listItem}>
                Call data is synced in real time to your Bitrix24 CRM account via secure webhooks
              </li>
              <li style={listItem}>
                No call audio or recordings are captured or stored
              </li>
              <li style={listItem}>
                Data is only accessible to authorised users within your organisation
              </li>
            </ul>
          </section>

          {/* Your Responsibilities */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitle}>Your Security Responsibilities</h3>
            <p style={para}>
              Security is a shared responsibility. Here's how you can help:
            </p>
            <ul style={list}>
              <li style={listItem}>
                Use strong, unique passwords for your Callifo account
              </li>
              {/* FIX: Removed "Enable multi-factor authentication" — MFA is not mentioned anywhere
                  in the Callifo technical documentation and should not be promised to users */}
              <li style={listItem}>Never share your credentials with anyone</li>
              <li style={listItem}>
                Report suspicious activity to info@averlonworld.com immediately
              </li>
              <li style={listItem}>
                Keep your software updated including browsers and operating systems
              </li>
              <li style={listItem}>
                Be cautious of phishing attempts claiming to be from Callifo
              </li>
            </ul>
          </section>

          {/* Security Contact */}
          <section style={{ marginBottom: "4px" }}>
            <h3 style={sectionTitle}>Security Contact</h3>
            <p style={para}>
              We welcome security researchers and users to report potential
              vulnerabilities:
            </p>
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
              <div>
                <span style={{ fontWeight: 600, color: "#1a5276" }}>
                  Security Email:
                </span>{" "}
                info@averlonworld.com
              </div>
              <div>
                <span style={{ fontWeight: 600, color: "#1a5276" }}>
                  Phone:
                </span>{" "}
                +91 9892440788
              </div>
              <div>
                <span style={{ fontWeight: 600, color: "#1a5276" }}>
                  Address:
                </span>{" "}
                5th Floor, Lodha Supremus II, Unit No. A-515/A-533, Wagle Industrial Estate, Thane West, Maharashtra 400604
              </div>
              <div>
                <span style={{ fontWeight: 600, color: "#1a5276" }}>
                  PGP Key:
                </span>{" "}
                Available upon request
              </div>
              <div
                style={{ marginTop: "8px", fontSize: "12px", color: "#6b7280" }}
              >
                Please allow up to 48 hours for initial response to security
                reports.
              </div>
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