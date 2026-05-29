import { UserPlus, Settings, Phone, BarChart, Smartphone, Server, GitMerge } from "lucide-react";
import handshakeImage from "../../../assets/callifo2.jpg";

const steps = [
  {
    icon: Smartphone,
    step: "01",
    title: "Call Made or Received",
    description: "A call is made or received by a sales team member. The mobile application captures call details automatically in the background — no manual action required.",
    accent: "#3b82f6",
    iconBg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    cardBg: "#eff6ff",
  },
  {
    icon: Server,
    step: "02",
    title: "Data Sent to Backend",
    description: "Call details are securely transmitted to the backend system, where they are processed and stored in the database for accurate record-keeping.",
    accent: "#a855f7",
    iconBg: "linear-gradient(135deg, #a855f7, #6366f1)",
    cardBg: "#faf5ff",
  },
  {
    icon: GitMerge,
    step: "03",
    title: "Lead Updated in Bitrix24",
    description: "A lead is automatically created or updated in Bitrix24 CRM based on the call data, ensuring your CRM stays accurate and up to date without manual input.",
    accent: "#10b981",
    iconBg: "linear-gradient(135deg, #10b981, #06b6d4)",
    cardBg: "#f0fdf4",
  },
  {
    icon: BarChart,
    step: "04",
    title: "Dashboard & Analytics Updated",
    description: "Analytics are generated from the stored call data, and the dashboard is updated in real time — giving managers instant visibility into team performance and call activity.",
    accent: "#f97316",
    iconBg: "linear-gradient(135deg, #f97316, #eab308)",
    cardBg: "#fff7ed",
  },
];

export function HowItWorksSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .hiw-wrap {
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 72px 0 80px;
          background: linear-gradient(135deg, #e8f4f8 0%, #dff0f7 40%, #e4f5f0 100%);
        }

        .hiw-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          pointer-events: none;
        }

        .hiw-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }

        .hiw-header {
          text-align: center;
          margin-bottom: 52px;
        }

        .hiw-title {
          font-size: 48px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .hiw-title-blue {
          color: #0ea5e9;
        }

        .hiw-subtitle {
          font-size: 14px;
          color: #64748b;
          font-weight: 400;
          margin: 0;
          line-height: 1.6;
        }

        /* Connector line */
        .hiw-steps-wrap {
          position: relative;
        }

        .hiw-connector {
          display: none;
        }

        @media (min-width: 900px) {
          .hiw-connector {
            display: block;
            position: absolute;
            top: 56px;
            left: 10%;
            width: 80%;
            height: 2px;
            background: linear-gradient(90deg, #1e293b 0%, #64748b 100%);
            z-index: 0;
          }
        }

        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 900px) {
          .hiw-grid { grid-template-columns: repeat(2, 1fr); }
          .hiw-inner { padding: 0 24px; }
        }
        @media (max-width: 520px) {
          .hiw-grid { grid-template-columns: 1fr; }
        }

        /* Card */
        .hiw-card {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 24px 20px 22px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: default;
        }

        .hiw-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, var(--accent) 0%, rgba(255,255,255,0) 100%);
          opacity: 0.25;
          transition: opacity 0.25s ease;
          border-radius: 16px 16px 0 0;
        }

        .hiw-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.09);
        }

        .hiw-card:hover::before {
          opacity: 1;
        }

        /* Step badge */
        .hiw-step-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--accent);
          color: var(--accent);
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 14px;
          background: #fff;
        }

        /* Icon */
        .hiw-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--icon-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .hiw-icon-wrap svg {
          width: 22px;
          height: 22px;
          color: #fff;
          stroke-width: 2;
        }

        .hiw-step-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .hiw-step-desc {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.65;
          margin: 0;
          font-weight: 400;
        }
      `}</style>

      <section id="how-it-works" className="hiw-wrap">
        <img src={handshakeImage} alt="" className="hiw-bg-img" />

        <div className="hiw-inner">
          <div className="hiw-header">
            <h2 className="hiw-title">
              How It <span className="hiw-title-blue">Works</span>
            </h2>
            <p className="hiw-subtitle">
              Get started with Callifo in four simple steps and transform your call management
            </p>
          </div>

          <div className="hiw-steps-wrap">
            <div className="hiw-connector" />
            <div className="hiw-grid">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="hiw-card"
                  style={{
                    "--card-bg": step.cardBg,
                    "--accent": step.accent,
                    "--icon-bg": step.iconBg,
                  } as React.CSSProperties}
                >
                  <div className="hiw-step-badge">{step.step}</div>
                  <div className="hiw-icon-wrap" style={{ background: step.iconBg }}>
                    <step.icon />
                  </div>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}