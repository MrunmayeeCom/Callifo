import { useNavigate, Link } from "react-router";
import { ArrowLeft, PhoneCall } from "lucide-react";

interface Section {
  title: string;
  body: string;
}

const sections: Section[] = [
  {
    title: "1. Grant of License",
    body: "Callifo grants the registered organization a non-exclusive, non-transferable, and revocable license to use the application within their Bitrix24 portal environment strictly in accordance with these terms.",
  },
  {
    title: "2. Description of Features & Scope",
    body: "Callifo operates as an advanced background utility tracking employee SIM card phone calls (via the companion Android mobile client) and validating unique leads against the organization's private Bitrix24 CRM directory. The features and sync operations are intended solely to streamline CRM logging and telephony lifecycle tracking.",
  },
  {
    title: "3. Data Security & Privacy Acknowledgement",
    body: "By installing the application, you acknowledge that Callifo collects and handles call logs, durations, and phone numbers in strict accordance with the Privacy Policy. All telemetry data is processed securely and is restricted to the specific organization account.",
  },
  {
    title: "4. Termination",
    body: "This agreement is effective until terminated. The license and agreement terminate instantly and automatically upon uninstallation of the application from the Bitrix24 Marketplace or closure of your organization account.",
  },
  {
    title: "5. Governing Law",
    body: "This agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the provider Rajlaxmi Solutions operates, without giving effect to any principles of conflicts of law.",
  },
];

export default function EulaPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      {/* ── Shared Header / Navbar ── */}
      <header
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #e8edf2",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0f3460 0%, #1f6fa8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneCall size={16} color="#ffffff" />
          </div>
          <span style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
            Callifo
          </span>
        </Link>

        <button
          onClick={() => navigate("/login")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: "8px",
            color: "#1a5276",
            fontSize: "14px",
            fontWeight: 600,
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#eef4fb")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </header>

      {/* ── Scrollable Content ── */}
      <div style={{ padding: "40px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e8edf2",
              borderRadius: "16px",
              padding: "32px",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
              }}
            >
              End-User License Agreement (EULA)
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: "14px", fontWeight: 500, color: "#64748b" }}>
              Last Updated: July 2026
            </p>

            <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #e8edf2" }} />

            {sections.map((section) => (
              <div key={section.title} style={{ marginBottom: "28px" }}>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {section.title}
                </h3>
                <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, color: "#64748b" }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}