import React, { useState, useEffect } from "react";
import { createCustomerSupport } from "../../../../api/customerSupport";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ── Email Middleware Config ──────────────────────────────────────────────────
const EMAIL_BASE_URL = "https://email-middleware-qyrt.onrender.com";
const EMAIL_API_KEY = "averlon-mail-2026!";
const ADMIN_EMAIL = "info@averlonworld.com";
// ────────────────────────────────────────────────────────────────────────────

interface ContactSupportPageProps {
  onBack: (scrollTo?: string) => void;
}

export function ContactSupportPage({ onBack }: ContactSupportPageProps) {
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")!) : null;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    type: "support",
  });

  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  const showPopup = (
    message: string,
    type: "success" | "error" | "warning",
  ) => {
    setPopup({ message, type });
    setTimeout(() => setPopup(null), 4500);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // ── helpers ────────────────────────────────────────────────────────────────
  const mapInquiryType = (type: string) => {
    const map: Record<string, string> = {
      support: "TECHNICAL_SUPPORT",
      sales: "SALES_INQUIRY",
      billing: "BILLING_QUESTION",
      demo: "DEMO_REQUEST",
      feature: "FEATURE_REQUEST",
      bug: "BUG_REPORT",
      custom: "ENTERPRISE_CUSTOM_PLAN",
    };
    return map[type] ?? "OTHER";
  };

  const inquiryLabel = (type: string) => {
    const labels: Record<string, string> = {
      support: "Technical Support",
      sales: "Sales Inquiry",
      billing: "Billing Question",
      demo: "Demo Request",
      feature: "Feature Request",
      bug: "Bug Report",
      custom: "Enterprise Custom Plan",
      other: "Other",
    };
    return labels[type] ?? type;
  };

  // ── send email via middleware ───────────────────────────────────────────────
  const sendEmail = async (to: string, subject: string, html: string) => {
    const res = await fetch(`${EMAIL_BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": EMAIL_API_KEY,
      },
      body: JSON.stringify({ to, subject, html }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Email send failed: ${err}`);
    }
  };

  // ── submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      showPopup("Please log in to submit a support request.", "warning");
      onBack();
      return;
    }

    setLoading(true);

    try {
      // 1️⃣  Send user confirmation email
      await sendEmail(
        formData.email,
        `We received your ${inquiryLabel(formData.type)} request`,
        `
          <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
            <h2 style="color:#0ea5e9;">Thanks for reaching out, ${formData.name}!</h2>
            <p>We've received your <strong>${inquiryLabel(formData.type)}</strong> request and our support team will get back to you within <strong>24 hours</strong>.</p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Subject</td><td style="padding:8px 0;font-size:13px;">${formData.subject}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Message</td><td style="padding:8px 0;font-size:13px;">${formData.message}</td></tr>
              ${formData.phone ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Phone</td><td style="padding:8px 0;font-size:13px;">${formData.phone}</td></tr>` : ""}
              ${formData.company ? `<tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Company</td><td style="padding:8px 0;font-size:13px;">${formData.company}</td></tr>` : ""}
            </table>
            <p style="font-size:13px;color:#64748b;">Need urgent help? Email us at <a href="mailto:${ADMIN_EMAIL}" style="color:#0ea5e9;">${ADMIN_EMAIL}</a> or call <strong>+91 98924 40788</strong>.</p>
          </div>
        `,
      );

      // 2️⃣  Send admin / company notification email
      await sendEmail(
        ADMIN_EMAIL,
        `[New ${inquiryLabel(formData.type)}] ${formData.subject}`,
        `
          <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
            <h2 style="color:#0ea5e9;">New Support Request</h2>
            <table style="width:100%;border-collapse:collapse;margin:16px 0;">
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;width:120px;">Name</td><td style="padding:8px 0;font-size:13px;">${formData.name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Email</td><td style="padding:8px 0;font-size:13px;"><a href="mailto:${formData.email}" style="color:#0ea5e9;">${formData.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Phone</td><td style="padding:8px 0;font-size:13px;">${formData.phone || "N/A"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Company</td><td style="padding:8px 0;font-size:13px;">${formData.company || "N/A"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Inquiry Type</td><td style="padding:8px 0;font-size:13px;">${inquiryLabel(formData.type)}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;">Subject</td><td style="padding:8px 0;font-size:13px;">${formData.subject}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;font-size:13px;vertical-align:top;">Message</td><td style="padding:8px 0;font-size:13px;">${formData.message}</td></tr>
            </table>
          </div>
        `,
      );

      // 3️⃣  Persist to your own backend
      await createCustomerSupport({
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        companyName: formData.company,
        inquiryType: mapInquiryType(formData.type),
        subject: formData.subject,
        message: formData.message,
        source: "CALLIFO",
      });

      showPopup(
        "Thank you! A confirmation has been sent to your email. Our support team will follow up within 24 hours.",
        "success",
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        type: "support",
      });
    } catch (error) {
      console.error("Submission error:", error);
      showPopup(
        "Failed to submit your request. Please try again or email us directly at info@averlonworld.com",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── contact cards data ─────────────────────────────────────────────────────
  const contactCards = [
    {
      emoji: "💬",
      title: "Customer Support",
      items: [
        { icon: "✉️", label: "Email", value: "info@averlonworld.com" },
        { icon: "📞", label: "Phone", value: "+91 98924 40788" },
        { icon: "🕐", label: "Hours", value: "24/7 Support Available" },
      ],
      accent: "#0ea5e9",
      bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      border: "#bae6fd",
    },
    {
      emoji: "🎧",
      title: "Sales Inquiries",
      items: [
        { icon: "✉️", label: "Email", value: "info@averlonworld.com" },
        { icon: "📞", label: "Phone", value: "+91 98924 40788" },
        { icon: "🕐", label: "Hours", value: "Mon–Sat: 9.30 AM – 6.30 PM IST" },
      ],
      accent: "#8b5cf6",
      bg: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)",
      border: "#ddd6fe",
    },
    {
      emoji: "📍",
      title: "Office Location",
      address:
        "5th Floor, Lodha Supremus - II, Phase II, Unit No. A.515, Road No. 22, Wagle Industrial Estate, Thane West, Maharashtra 400604",
      accent: "#10b981",
      bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      border: "#bbf7d0",
    },
  ];

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .cs-page {
          min-height: 100vh;
          background: #f8faff;
          font-family: 'Inter', sans-serif;
        }

        .cs-hero {
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0c4a6e 100%);
          padding: 32px 24px 48px;
          position: relative;
          overflow: hidden;
        }
        .cs-hero-blob1 {
          position: absolute; width: 400px; height: 400px;
          background: rgba(14,165,233,0.15); border-radius: 50%;
          top: -150px; right: -100px; filter: blur(60px); pointer-events: none;
        }
        .cs-hero-blob2 {
          position: absolute; width: 300px; height: 300px;
          background: rgba(139,92,246,0.10); border-radius: 50%;
          bottom: -120px; left: -80px; filter: blur(60px); pointer-events: none;
        }
        .cs-hero-inner { max-width: 760px; margin: 0 auto; position: relative; z-index: 1; }
        .cs-back-btn {
          display: flex; align-items: center; gap: 6px;
          width: fit-content;
          padding: 7px 4px;
          background: transparent; border: none;
          color: rgba(255,255,255,0.7);
          font-size: 12px; font-weight: 600; font-family: 'Inter', sans-serif;
          cursor: pointer; transition: all 0.2s; margin-bottom: 16px;
        }
        .cs-back-btn:hover { color: #fff; }
        .cs-hero-badge {
          display: inline-block;
          padding: 5px 14px; background: rgba(14,165,233,0.2); border: 1px solid rgba(14,165,233,0.35);
          border-radius: 20px; color: #7dd3fc;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          margin-bottom: 16px;
        }
        .cs-hero-title {
          font-size: clamp(28px, 5vw, 42px); font-weight: 800;
          color: #fff; line-height: 1.15; margin: 0 0 12px;
          letter-spacing: -0.02em;
        }
        .cs-hero-title span { color: #38bdf8; }
        .cs-hero-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.7; max-width: 520px; margin: 0; }

        .cs-body { max-width: 1100px; margin: 0 auto; padding: 40px 24px 60px; }
        .cs-grid { display: grid; grid-template-columns: 300px 1fr; gap: 28px; align-items: start; }
        @media (max-width: 768px) { .cs-grid { grid-template-columns: 1fr; } }

        .cs-contact-card {
          border-radius: 16px; border: 1.5px solid; padding: 20px;
          margin-bottom: 16px;
        }
        .cs-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .cs-card-emoji { font-size: 20px; }
        .cs-card-title { font-size: 14px; font-weight: 700; margin: 0; }
        .cs-info-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
        .cs-info-icon { font-size: 14px; margin-top: 1px; flex-shrink: 0; }
        .cs-info-label { font-size: 11px; color: #94a3b8; margin: 0 0 2px; font-weight: 500; }
        .cs-info-val { font-size: 13px; color: #334155; font-weight: 600; text-decoration: none; }
        // a.cs-info-val:hover { text-decoration: underline; }
        .cs-address-text { font-size: 13px; color: #334155; line-height: 1.6; margin: 0; }

        .cs-form-card {
          background: #fff; border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          padding: 28px;
        }
        .cs-form-header { margin-bottom: 22px; }
        .cs-form-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 6px; }
        .cs-form-desc { font-size: 13px; color: #64748b; margin: 0; }

        .cs-form { display: flex; flex-direction: column; gap: 16px; }
        .cs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 540px) { .cs-row { grid-template-columns: 1fr; } }
        .cs-field { display: flex; flex-direction: column; gap: 6px; }
        .cs-label { font-size: 12.5px; font-weight: 600; color: #374151; }
        .cs-label span { color: #ef4444; }
        .cs-input, .cs-select, .cs-textarea {
          padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px;
          font-size: 13.5px; font-family: 'Inter', sans-serif; color: #1e293b;
          background: #f8fafc; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .cs-input:focus, .cs-select:focus, .cs-textarea:focus {
          border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14,165,233,0.12); background: #fff;
        }
        .cs-textarea { min-height: 110px; resize: vertical; }

        .cs-btn-row { display: flex; gap: 12px; justify-content: flex-end; margin-top: 4px; }
        .cs-submit-btn {
          padding: 13px 28px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: #fff; border: none; border-radius: 12px;
          font-size: 14px; font-weight: 700; font-family: 'Inter', sans-serif;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .cs-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(14,165,233,0.35); }
        .cs-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .cs-cancel-btn {
          padding: 13px 20px; background: #f1f5f9; color: #475569;
          border: none; border-radius: 12px;
          font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif;
          cursor: pointer; transition: all 0.2s;
        }
        .cs-cancel-btn:hover { background: #e2e8f0; color: #334155; }

        .cs-faq-strip {
          margin-top: 20px;
          background: linear-gradient(135deg, #fdf4ff 0%, #ede9fe 100%);
          border: 1.5px solid #ddd6fe; border-radius: 16px;
          padding: 20px 24px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .cs-faq-left { display: flex; align-items: center; gap: 14px; }
        .cs-faq-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(139,92,246,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }
        .cs-faq-title { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #4c1d95; margin: 0 0 3px; }
        .cs-faq-desc { font-size: 12.5px; color: #6d28d9; opacity: 0.75; margin: 0; }
        .cs-faq-btn {
          padding: 9px 32px; background: #7c3aed; color: #ffffff;
          border: none; border-radius: 10px;
          font-size: 13px; font-weight: 600; font-family: 'Inter', sans-serif;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          display: inline-flex; align-items: center;
        }
        .cs-faq-btn:hover { background: #6d28d9; transform: translateY(-1px); }

        @keyframes cs-spin { to { transform: rotate(360deg); } }
        .cs-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%;
          animation: cs-spin 0.7s linear infinite;
        }

        @keyframes cs-popup-in {
          from { opacity: 0; transform: translateY(-16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cs-popup-overlay {
          position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
          z-index: 9999; min-width: 320px; max-width: 480px; width: 90%;
          animation: cs-popup-in 0.25s ease;
        }
        .cs-popup {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 16px 18px; border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.14);
          font-family: 'Inter', sans-serif;
        }
        .cs-popup-success { background: #f0fdf4; border: 1.5px solid #86efac; }
        .cs-popup-error   { background: #fff1f2; border: 1.5px solid #fca5a5; }
        .cs-popup-warning { background: #fffbeb; border: 1.5px solid #fcd34d; }
        .cs-popup-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
        .cs-popup-msg {
          font-size: 13.5px; line-height: 1.55; font-weight: 500;
        }
        .cs-popup-success .cs-popup-msg { color: #166534; }
        .cs-popup-error   .cs-popup-msg { color: #991b1b; }
        .cs-popup-warning .cs-popup-msg { color: #92400e; }
        .cs-popup-close {
          margin-left: auto; flex-shrink: 0; background: none; border: none;
          cursor: pointer; font-size: 16px; color: #94a3b8; padding: 0 0 0 8px;
          line-height: 1;
        }
        .cs-popup-close:hover { color: #475569; }
      `}</style>

      {popup && (
        <div className="cs-popup-overlay">
          <div className={`cs-popup cs-popup-${popup.type}`}>
            <span className="cs-popup-icon">
              {popup.type === "success"
                ? "✅"
                : popup.type === "error"
                  ? "❌"
                  : "⚠️"}
            </span>
            <p className="cs-popup-msg">{popup.message}</p>
            <button className="cs-popup-close" onClick={() => setPopup(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="cs-page">
        {/* ── Hero ── */}
        <div className="cs-hero">
          <div className="cs-hero-blob1" />
          <div className="cs-hero-blob2" />
          <div className="cs-hero-inner">
            <button onClick={() => onBack()} className="cs-back-btn">
              <ArrowLeft size={14} /> Back to Home
            </button>
            <div className="cs-hero-badge">🛡️ &nbsp;SUPPORT CENTER</div>
            <h1 className="cs-hero-title">
              We're here to <span>help you</span>
            </h1>
            <p className="cs-hero-sub">
              Reach our team anytime — whether it's a technical question,
              billing issue, or just getting started with Callifo.
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cs-body">
          <div className="cs-grid">
            {/* Sidebar */}
            <div className="cs-sidebar">
              {contactCards.map((card, i) => (
                <div
                  key={i}
                  className="cs-contact-card"
                  style={{ background: card.bg, borderColor: card.border }}
                >
                  <div className="cs-card-header">
                    <div className="cs-card-emoji">{card.emoji}</div>
                    <h3
                      className="cs-card-title"
                      style={{ color: card.accent }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  {card.items ? (
                    card.items.map((item, j) => (
                      <div key={j} className="cs-info-row">
                        <span className="cs-info-icon">{item.icon}</span>
                        <div>
                          <p className="cs-info-label">{item.label}</p>
                          <span className="cs-info-val">{item.value}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="cs-address-text">{card.address}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div>
              <div className="cs-form-card">
                <div className="cs-form-header">
                  <h2 className="cs-form-title">Send us a Message</h2>
                  <p className="cs-form-desc">
                    Fill out the form and our team will get back to you within
                    24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="cs-form">
                  <div className="cs-row">
                    <div className="cs-field">
                      <label className="cs-label">
                        Full Name <span>*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="cs-input"
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div className="cs-field">
                      <label className="cs-label">
                        Email Address <span>*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="cs-input"
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div className="cs-row">
                    <div className="cs-field">
                      <label className="cs-label">Phone Number</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+91 98924 40788"
                        value={formData.phone}
                        onChange={handleChange}
                        className="cs-input"
                      />
                    </div>
                    <div className="cs-field">
                      <label className="cs-label">Company Name</label>
                      <input
                        name="company"
                        type="text"
                        placeholder="Acme Corporation"
                        value={formData.company}
                        onChange={handleChange}
                        className="cs-input"
                      />
                    </div>
                  </div>

                  <div className="cs-row">
                    <div className="cs-field">
                      <label className="cs-label">
                        Inquiry Type <span>*</span>
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="cs-select"
                      >
                        <option value="support">Technical Support</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="billing">Billing Question</option>
                        <option value="demo">Demo Request</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="custom">Enterprise Custom Plan</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="cs-field">
                      <label className="cs-label">
                        Subject <span>*</span>
                      </label>
                      <input
                        name="subject"
                        type="text"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="cs-input"
                      />
                    </div>
                  </div>

                  <div className="cs-field">
                    <label className="cs-label">
                      Message <span>*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Please describe your inquiry in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="cs-textarea"
                    />
                  </div>

                  <div className="cs-btn-row">
                    <button
                      type="submit"
                      className="cs-submit-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="cs-spinner" /> Sending...
                        </>
                      ) : (
                        <>Send Message</>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* FAQ strip */}
              <div className="cs-faq-strip">
                <div className="cs-faq-left">
                  <div className="cs-faq-icon">💡</div>
                  <div>
                    <p className="cs-faq-title">Looking for quick answers?</p>
                    <p className="cs-faq-desc">
                      Browse our FAQ section for instant answers to common
                      questions.
                    </p>
                  </div>
                </div>
                <button className="cs-faq-btn" onClick={() => { sessionStorage.setItem("scrollTo", "faq"); onBack(); }}>
                  Visit FAQ <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
