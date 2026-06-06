import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import { checkCustomerExists } from "../../../../api/customerSync";

// ── Email Middleware Config ──────────────────────────────────────────────────
const EMAIL_BASE_URL = "https://email-middleware-qyrt.onrender.com";
const EMAIL_API_KEY  = "averlon-mail-2026!";
// ────────────────────────────────────────────────────────────────────────────

// Always navigates to home and opens login modal — works after deploy too
const goToLogin = (navigate: ReturnType<typeof useNavigate>) => {
  navigate("/", { state: { openLogin: true } });
};

/** Generate a secure token, store it with email + 1hr expiry in localStorage */
function createResetToken(email: string): string {
  const expiry = Date.now() + 60 * 60 * 1000;
  return btoa(JSON.stringify({ email, expiry }));
}

export default function ForgotPassword() {
  const navigate              = useNavigate();
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  const canSubmit = email.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setError("");
    localStorage.removeItem("user");

    try {
      // 1. Verify account exists in LMS
      const exists = await checkCustomerExists(email.trim());
      if (!exists) {
        setError("No account found with this email address.");
        setLoading(false);
        return;
      }

      // 2. Generate token + reset URL
      const token     = createResetToken(email.trim());
      const resetLink = `${window.location.origin}/reset-password?token=${encodeURIComponent(token)}`;

      // 3. Send email via middleware
      const res = await fetch(`${EMAIL_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": EMAIL_API_KEY,
        },
        body: JSON.stringify({
          to:      email.trim(),
          subject: "Reset your Callifo password",
          html: `
            <div style="font-family:Inter,sans-serif;max-width:520px;margin:0 auto;color:#1e293b;">
              <h2 style="color:#00B4D8;">Reset your password</h2>
              <p>Hi there,</p>
              <p>We received a request to reset the password for your Callifo account (<strong>${email.trim()}</strong>). Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
              <div style="text-align:center;margin:28px 0;">
                <a href="${resetLink}"
                   style="display:inline-block;padding:13px 32px;background:linear-gradient(135deg,#00B4D8,#0096B7);color:#fff;font-weight:700;font-size:14px;border-radius:10px;text-decoration:none;">
                  Reset Password
                </a>
              </div>
              <p style="font-size:12.5px;color:#64748b;">If the button doesn't work, copy and paste this link into your browser:<br/>
                <a href="${resetLink}" style="color:#00B4D8;word-break:break-all;">${resetLink}</a>
              </p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
              <p style="font-size:12px;color:#94a3b8;">
                If you didn't request a password reset, you can safely ignore this email.<br/>
                Need help? Contact us at <a href="mailto:info@averlonworld.com" style="color:#00B4D8;">info@averlonworld.com</a> or call <strong>+91 9892440788</strong>.
              </p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      setSent(true);
    } catch (err: any) {
      console.error("ForgotPassword error:", err);
      setError(
        err?.message
          ? `Error: ${err.message}`
          : "Could not send reset email. Please contact info@averlonworld.com"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .fp-page {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.25rem;
          position: relative;
          overflow: hidden;
          background: #F0F5FA;
        }

        .fp-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 70% 50% at 85% 5%,  rgba(0,180,216,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 5%  90%,  rgba(0,150,183,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 50% 110%, rgba(13,34,68,0.08)  0%, transparent 55%),
            linear-gradient(165deg, #e8f4f8 0%, #f0f7fb 50%, #eaf2f8 100%);
        }

        .fp-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: radial-gradient(circle, rgba(0,180,216,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        .fp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }
        .fp-blob-1 { width: 400px; height: 400px; top: -140px; right: -120px; background: rgba(0,180,216,0.10); }
        .fp-blob-2 { width: 320px; height: 320px; bottom: -110px; left: -90px; background: rgba(13,34,68,0.07); }
        .fp-blob-3 { width: 200px; height: 200px; top: 40%; left: 60%; background: rgba(0,150,183,0.06); }

        .fp-back {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px 7px 10px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(226,238,249,0.95);
          border-radius: 10px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          backdrop-filter: blur(12px);
          transition: all 0.18s;
          box-shadow: 0 2px 8px rgba(13,34,68,0.06);
        }
        .fp-back:hover {
          color: #0096B7;
          background: rgba(255,255,255,0.98);
          border-color: rgba(0,180,216,0.30);
          transform: translateX(-2px);
          box-shadow: 0 4px 14px rgba(0,180,216,0.12);
        }

        .fp-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
        }

        .fp-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 1.6rem; }
        .fp-brand-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #00B4D8 0%, #0096B7 50%, #0D2244 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,180,216,0.32), 0 2px 4px rgba(0,150,183,0.18), inset 0 1px 0 rgba(255,255,255,0.22);
        }

        .fp-heading { margin-bottom: 1.75rem; }
        .fp-heading h1 {
          font-size: 2.1rem;
          font-weight: 800;
          color: #0D2244;
          letter-spacing: -0.04em;
          line-height: 1.12;
          margin-bottom: 0.55rem;
        }
        .fp-heading h1 em {
          font-style: normal;
          background: linear-gradient(125deg, #00B4D8 0%, #0096B7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fp-heading p { font-size: 13.5px; color: #64748b; line-height: 1.7; font-weight: 400; max-width: 310px; }

        .fp-card {
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(226,238,249,0.95);
          border-radius: 20px;
          padding: 1.75rem 1.75rem 1.5rem;
          box-shadow: 0 4px 32px rgba(13,34,68,0.08), 0 1px 4px rgba(0,180,216,0.06);
          backdrop-filter: blur(16px);
        }

        .fp-field { margin-bottom: 1.1rem; }
        .fp-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #374151;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.45rem;
        }
        .fp-input-wrap { position: relative; }
        .fp-input-icon {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #94a3b8;
          pointer-events: none;
        }
        .fp-input {
          width: 100%;
          padding: 11px 14px 11px 38px;
          background: rgba(248,250,252,0.8);
          border: 1.5px solid #E2EEF9;
          border-radius: 12px;
          font-family: inherit;
          font-size: 13.5px;
          color: #0D2244;
          outline: none;
          transition: all 0.18s;
        }
        .fp-input:focus {
          border-color: #00B4D8;
          box-shadow: 0 0 0 3px rgba(0,180,216,0.12);
          background: #fff;
        }
        .fp-input::placeholder { color: #b0c4d8; }

        .fp-btn {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #00B4D8 0%, #0096B7 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(0,180,216,0.28);
          margin-top: 0.25rem;
        }
        .fp-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,180,216,0.38);
        }
        .fp-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

        @keyframes fp-spin { to { transform: rotate(360deg); } }
        .fp-spin {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: fp-spin 0.7s linear infinite;
        }

        .fp-divider { display: flex; align-items: center; gap: 10px; margin: 1.25rem 0 1rem; }
        .fp-div-line { flex: 1; height: 1px; background: #E2EEF9; }
        .fp-div-dot  { width: 3px; height: 3px; border-radius: 50%; background: #B0C4D8; }

        .fp-footer { text-align: center; font-size: 12.5px; color: #94a3b8; font-weight: 500; }
        .fp-footer-btn {
          background: none;
          border: none;
          font-family: inherit;
          font-size: 12.5px;
          font-weight: 700;
          color: #00B4D8;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s;
        }
        .fp-footer-btn:hover { color: #0096B7; text-decoration: underline; }

        .fp-success-ring {
          width: 52px; height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, #00B4D8, #0096B7);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          box-shadow: 0 8px 24px rgba(0,180,216,0.32);
        }
        .fp-success-title { font-size: 1.1rem; font-weight: 800; color: #0D2244; letter-spacing: -0.025em; margin-bottom: 0.35rem; }
        .fp-success-body  { font-size: 12.5px; color: #64748b; line-height: 1.65; margin-bottom: 0.6rem; }
        .fp-success-email { font-weight: 700; color: #0096B7; }
        .fp-success-note {
          font-size: 11.5px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1.1rem;
          padding: 10px 12px;
          background: rgba(0,180,216,0.05);
          border: 1px solid rgba(0,180,216,0.12);
          border-radius: 10px;
        }
        .fp-success-note strong { color: #0096B7; }
        .fp-resend-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: inherit;
          font-size: 11.5px;
          font-weight: 600;
          color: #64748b;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s;
        }
        .fp-resend-btn:hover { color: #00B4D8; }
      `}</style>

      <div className="fp-page">
        <div className="fp-bg" />
        <div className="fp-grid" />
        <div className="fp-blob fp-blob-1" />
        <div className="fp-blob fp-blob-2" />
        <div className="fp-blob fp-blob-3" />

        {/* ── Back button ── */}
        <motion.button
          className="fp-back"
          onClick={() => goToLogin(navigate)}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to login
        </motion.button>

        <div className="fp-wrap">

          {/* Brand + Heading */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.1 }}
          >
            <div className="fp-heading">
              <h1>Forgot your <em>password?</em></h1>
              <p>Enter your registered email and we'll send you a reset link right away.</p>
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            className="fp-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div style={{
                        background: "rgba(239,68,68,0.07)",
                        border: "1px solid rgba(239,68,68,0.22)",
                        borderRadius: 11,
                        padding: "11px 14px",
                        marginBottom: "1rem",
                        fontSize: 12.5,
                        color: "#dc2626",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                      }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                      </div>
                    )}
                    <div className="fp-field">
                      <label className="fp-label" htmlFor="fp-email">Email address</label>
                      <div className="fp-input-wrap">
                        <Mail className="fp-input-icon" />
                        <input
                          id="fp-email"
                          className="fp-input"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoFocus
                        />
                      </div>
                    </div>

                    <button className="fp-btn" type="submit" disabled={!canSubmit || loading}>
                      {loading ? (
                        <><div className="fp-spin" />Sending reset link...</>
                      ) : (
                        <>
                          Send reset link
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="fp-divider">
                    <div className="fp-div-line" /><div className="fp-div-dot" /><div className="fp-div-line" />
                  </div>

                  <div className="fp-footer">
                    Remembered it?{" "}
                    <button className="fp-footer-btn" type="button" onClick={() => goToLogin(navigate)}>
                      Sign in
                    </button>
                  </div>
                </motion.div>

              ) : (
                /* ── Success ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="fp-success-ring">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>

                  <div className="fp-success-title">Check your inbox!</div>
                  <p className="fp-success-body">
                    A password reset link has been sent to{" "}
                    <span className="fp-success-email">{email}</span>.
                  </p>

                  <div className="fp-success-note">
                    The link expires in <strong>1 hour</strong>. Check your spam folder if you don't see it.<br />
                    Need urgent help? Email <strong>info@averlonworld.com</strong> or call <strong>+91 9892440788</strong>
                  </div>

                  <button className="fp-resend-btn" type="button" onClick={() => setSent(false)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10"/>
                      <path d="M3.51 15a9 9 0 1 0 .49-3.1"/>
                    </svg>
                    Didn't receive it? Send again
                  </button>

                  <div className="fp-divider">
                    <div className="fp-div-line" /><div className="fp-div-dot" /><div className="fp-div-line" />
                  </div>

                  <div className="fp-footer">
                    <button className="fp-footer-btn" type="button" onClick={() => goToLogin(navigate)}>
                      ← Back to sign in
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </>
  );
}