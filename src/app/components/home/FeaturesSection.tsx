import { PhoneCall, RefreshCw, BarChart2, Smartphone, ShieldCheck, Users } from "lucide-react";
import featuresBg from "../../../assets/callifo4.jpg";

const features = [
  {
    icon: PhoneCall,
    title: "Call Log Management",
    description: "Automatically captures incoming, outgoing, and missed calls with full details including duration, timestamp, and SIM information.",
    bg: "#eff6ff",
    iconBg: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    borderColor: "#3b82f6",
  },
  {
    icon: RefreshCw,
    title: "Bitrix24 CRM Sync",
    description: "Automatically creates and updates leads in Bitrix24 CRM and logs call activity to the lead timeline.",
    bg: "#faf5ff",
    iconBg: "linear-gradient(135deg, #a855f7, #ec4899)",
    borderColor: "#a855f7",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Provides detailed reports on call activity, durations, missed calls, and team performance.",
    bg: "#f0fdf4",
    iconBg: "linear-gradient(135deg, #22c55e, #10b981)",
    borderColor: "#22c55e",
  },
  {
    icon: Smartphone,
    title: "Sales Companion App",
    description: "Android mobile application for sales teams to log calls and track leads in real time.",
    bg: "#fff7ed",
    iconBg: "linear-gradient(135deg, #f97316, #eab308)",
    borderColor: "#f97316",
  },
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Different access levels for sales team members, managers, and administrators.",
    bg: "#fdf2f8",
    iconBg: "linear-gradient(135deg, #ec4899, #f43f5e)",
    borderColor: "#ec4899",
  },
  {
    icon: ShieldCheck,
    title: "Real-Time Monitoring",
    description: "Track live call activity and performance across your entire team.",
    bg: "#f5f3ff",
    iconBg: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    borderColor: "#8b5cf6",
  },
];

export function FeaturesSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .fs-wrap {
          font-family: 'Inter', sans-serif;
          padding: 80px 0;
          position: relative;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .fs-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(240,249,255,0.93) 0%, rgba(248,250,252,0.93) 50%, rgba(240,253,244,0.93) 100%);
          pointer-events: none;
        }

        .fs-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .fs-header {
          margin-bottom: 56px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .fs-heading {
          font-size: 38px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
          font-family: 'Inter', sans-serif;
        }

        .fs-heading-accent { color: #0ea5e9; }

        .fs-desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          max-width: 620px;
          margin: 0;
          font-weight: 400;
          font-family: 'Inter', sans-serif;
        }

        .fs-desc strong { color: #0f172a; font-weight: 700; }

        .fs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) { .fs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) {
          .fs-grid { grid-template-columns: 1fr; }
          .fs-heading { font-size: 28px; }
        }

        .fs-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 32px 28px;
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          cursor: default;
        }

        .fs-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
          border-color: var(--border-color);
        }

        .fs-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .fs-icon-wrap svg { width: 24px; height: 24px; color: #fff; stroke-width: 2; }

        .fs-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.3;
          font-family: 'Inter', sans-serif;
        }

        .fs-card-desc {
          font-size: 13px;
          color: #64748b;
          line-height: 1.7;
          margin: 0;
          font-weight: 400;
        }
      `}</style>

      <section
        id="features"
        className="fs-wrap"
        style={{ backgroundImage: `url(${featuresBg})` }}
      >
        <div className="fs-overlay" />
        <div className="fs-inner">

          <div className="fs-header">
            <h2 className="fs-heading">
              Everything Your Sales Team Needs to{" "}
              <span className="fs-heading-accent">Track & Manage Calls</span>
            </h2>
            <p className="fs-desc">
              Callifo is a complete <strong>Call Management and Lead Tracking System</strong> built
              for sales teams. From automatic call logging to real-time{" "}
              <strong>Bitrix24 CRM synchronization</strong>, every interaction is captured,
              tracked, and analyzed — so nothing falls through the cracks.
            </p>
          </div>

          <div className="fs-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="fs-card"
                style={{ "--card-bg": f.bg, "--border-color": f.borderColor } as React.CSSProperties}
              >
                <div className="fs-icon-wrap" style={{ background: f.iconBg }}>
                  <f.icon />
                </div>
                <h3 className="fs-card-title">{f.title}</h3>
                <p className="fs-card-desc">{f.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default FeaturesSection;