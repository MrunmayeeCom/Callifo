import { PhoneCall, GitMerge, BarChart2, Smartphone } from "lucide-react";

const cards = [
  {
    icon: PhoneCall,
    title: "Automatic Call Tracking",
    subtitle: "Incoming, outgoing & missed calls captured automatically with full metadata.",
    iconBg: "linear-gradient(135deg, #3b82f6, #6366f1)",
    border: "#bfdbfe",
    bg: "#eff6ff",
  },
  {
    icon: GitMerge,
    title: "Bitrix24 CRM Integration",
    subtitle: "Works seamlessly with Bitrix24 to keep your customer information organized.",
    iconBg: "linear-gradient(135deg, #22c55e, #16a34a)",
    border: "#bbf7d0",
    bg: "#f0fdf4",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    subtitle: "Per-user, daily, and monthly call duration reports with full team performance visibility.",
    iconBg: "linear-gradient(135deg, #f97316, #ea580c)",
    border: "#fed7aa",
    bg: "#fff7ed",
  },
  {
    icon: Smartphone,
    title: "Android Mobile App",
    subtitle: "Android app for sales reps to log calls and track leads on the go.",
    iconBg: "linear-gradient(135deg, #a855f7, #7c3aed)",
    border: "#e9d5ff",
    bg: "#faf5ff",
  },
];

export function TrustedSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .ts-wrap {
          font-family: 'Inter', sans-serif;
          background: #ffffff;
          padding: 80px 0 88px;
        }

        .ts-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .ts-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .ts-title {
          font-size: 42px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 12px 0;
        }

        .ts-title-accent {
          color: #0ea5e9;
        }

        .ts-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-weight: 400;
          line-height: 1.6;
        }

        .ts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .ts-grid { grid-template-columns: repeat(2, 1fr); }
          .ts-inner { padding: 0 24px; }
        }
        @media (max-width: 520px) {
          .ts-grid { grid-template-columns: 1fr; }
          .ts-title { font-size: 28px; }
        }

        .ts-card {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 28px 20px 26px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          cursor: default;
        }

        .ts-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 36px rgba(0,0,0,0.08);
        }

        .ts-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--icon-bg);
          flex-shrink: 0;
        }

        .ts-icon-wrap svg {
          width: 28px;
          height: 28px;
          color: #fff;
          stroke-width: 2;
        }

        .ts-card-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
          margin: 0;
        }

        .ts-card-subtitle {
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }
      `}</style>

      <section className="ts-wrap">
        <div className="ts-inner">

          <div className="ts-header">
            <h2 className="ts-title">
              Trusted by Sales Teams for{" "}
              <span className="ts-title-accent">Smarter Call Management</span>
            </h2>
            <p className="ts-subtitle">
             Powered by a robust backend, integrated with Bitrix24 CRM, and accessible on Android devices.
            </p>
          </div>

          <div className="ts-grid">
            {cards.map((card, i) => (
              <div
                key={i}
                className="ts-card"
                style={{
                  "--bg": card.bg,
                  "--border": card.border,
                  "--icon-bg": card.iconBg,
                } as React.CSSProperties}
              >
                <div className="ts-icon-wrap" style={{ background: card.iconBg }}>
                  <card.icon />
                </div>
                <p className="ts-card-title">{card.title}</p>
                <p className="ts-card-subtitle">{card.subtitle}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default TrustedSection;