import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router";
import { Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { resetPassword } from "../../../../api/lms";

// ── Token helpers ────────────────────────────────────────────────
function validateToken(token: string): { valid: boolean; email: string } {
  try {
    const { email, expiry } = JSON.parse(atob(decodeURIComponent(token)));
    if (!email || !expiry) return { valid: false, email: "" };
    if (Date.now() > expiry) return { valid: false, email: "" };
    return { valid: true, email };
  } catch {
    return { valid: false, email: "" };
  }
}

function consumeToken(_token: string) {
  // no-op: token lives in the URL, nothing to clear
}

// ── Password strength ────────────────────────────────────────────
function getStrengthScore(pw: string) {
  return [pw.length >= 8, /[A-Z]/.test(pw), /[a-z]/.test(pw), /[0-9]/.test(pw)].filter(Boolean).length;
}

const goToLogin = (navigate: ReturnType<typeof useNavigate>) => {
  navigate("/", { state: { openLogin: true } });
};

export default function ResetPassword() {
  const navigate               = useNavigate();
  const [searchParams]         = useSearchParams();
  const token                  = searchParams.get("token") ?? "";

  const [tokenState, setTokenState] = useState<"checking" | "valid" | "invalid">("checking");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);

  // Validate token on mount
  useEffect(() => {
    if (!token) { setTokenState("invalid"); return; }
    const { valid, email: tokenEmail } = validateToken(token);
    if (valid) { setEmail(tokenEmail); setTokenState("valid"); }
    else        { setTokenState("invalid"); }
  }, [token]);

  const strengthScore   = getStrengthScore(password);
  const strengthLabel   = ["", "Weak", "Fair", "Good", "Strong"][strengthScore];
  const strengthColor   = strengthScore <= 1 ? "#f87171" : strengthScore === 2 ? "#fb923c" : strengthScore === 3 ? "#facc15" : "#4ade80";
  const passwordsMatch  = confirm.length > 0 && password === confirm;
  const canSubmit       = password.length >= 8 && strengthScore === 4 && passwordsMatch && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      await resetPassword(email, password);
      consumeToken(token);
      localStorage.removeItem("user");
      setDone(true);
      toast.success("Password reset successfully!");
    } catch (err: any) {
      console.error("ResetPassword error:", err);
      toast.error(err?.message ?? "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rp-page {
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

        .rp-bg {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(ellipse 70% 50% at 85% 5%,  rgba(0,180,216,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 5%  90%,  rgba(0,150,183,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 50% 110%, rgba(13,34,68,0.08)  0%, transparent 55%),
            linear-gradient(165deg, #e8f4f8 0%, #f0f7fb 50%, #eaf2f8 100%);
        }
        .rp-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, rgba(0,180,216,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .rp-blob { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; z-index: 0; }
        .rp-blob-1 { width: 400px; height: 400px; top: -140px; right: -120px; background: rgba(0,180,216,0.10); }
        .rp-blob-2 { width: 320px; height: 320px; bottom: -110px; left: -90px; background: rgba(13,34,68,0.07); }
        .rp-blob-3 { width: 200px; height: 200px; top: 40%; left: 60%; background: rgba(0,150,183,0.06); }

        .rp-back {
          position: absolute; top: 1.5rem; left: 1.5rem; z-index: 10;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px 7px 10px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(226,238,249,0.95);
          border-radius: 10px; font-family: inherit; font-size: 12px; font-weight: 700;
          color: #475569; cursor: pointer; backdrop-filter: blur(12px);
          transition: all 0.18s; box-shadow: 0 2px 8px rgba(13,34,68,0.06);
        }
        .rp-back:hover {
          color: #0096B7; background: rgba(255,255,255,0.98);
          border-color: rgba(0,180,216,0.30); transform: translateX(-2px);
          box-shadow: 0 4px 14px rgba(0,180,216,0.12);
        }

        .rp-wrap {
          position: relative; z-index: 1; width: 100%; max-width: 420px;
          display: flex; flex-direction: column;
        }

        .rp-heading { margin-bottom: 1.75rem; }
        .rp-heading h1 {
          font-size: 2.1rem; font-weight: 800; color: #0D2244;
          letter-spacing: -0.04em; line-height: 1.12; margin-bottom: 0.55rem;
        }
        .rp-heading h1 em {
          font-style: normal;
          background: linear-gradient(125deg, #00B4D8 0%, #0096B7 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .rp-heading p { font-size: 13.5px; color: #64748b; line-height: 1.7; font-weight: 400; max-width: 310px; }

        .rp-card {
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(226,238,249,0.95);
          border-radius: 20px; padding: 1.7rem 1.6rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 8px 32px rgba(0,180,216,0.09),
                      0 24px 64px rgba(13,34,68,0.06), inset 0 1px 0 rgba(255,255,255,1);
        }

        .rp-field { margin-bottom: 1rem; }
        .rp-label {
          display: block; font-size: 10.5px; font-weight: 800; color: #334155;
          letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px;
        }
        .rp-input-wrap { position: relative; }
        .rp-input-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #94a3b8; pointer-events: none; transition: color 0.2s; width: 14px; height: 14px;
          display: flex; align-items: center;
        }
        .rp-input-wrap:focus-within .rp-input-icon { color: #00B4D8; }
        .rp-input {
          width: 100%; padding: 11px 38px 11px 38px;
          background: #F8FBFF; border: 1.5px solid #E2EEF9;
          border-radius: 11px; font-family: inherit; font-size: 13px;
          color: #0D2244; outline: none; transition: all 0.2s;
        }
        .rp-input::placeholder { color: #B0C4D8; }
        .rp-input:focus { background: #fff; border-color: #00B4D8; box-shadow: 0 0 0 3.5px rgba(0,180,216,0.11); }

        .rp-eye {
          position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #94a3b8;
          display: flex; align-items: center; padding: 0; transition: color 0.15s;
        }
        .rp-eye:hover { color: #0096B7; }

        .rp-strength-bars { display: flex; gap: 4px; margin-bottom: 6px; }
        .rp-strength-bar  { height: 3px; flex: 1; border-radius: 2px; transition: background 0.25s; }

        .rp-checks { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
        .rp-check  {
          font-size: 10px; padding: 2px 8px; border-radius: 20px; font-weight: 600;
          transition: all 0.2s;
        }

        .rp-match { font-size: 11px; font-weight: 600; margin-top: 5px; }

        .rp-btn {
          width: 100%; padding: 11px 16px;
          background: linear-gradient(135deg, #00B4D8 0%, #0096B7 100%);
          color: white; border: none; border-radius: 11px;
          font-family: inherit; font-size: 13px; font-weight: 800;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          gap: 8px; transition: all 0.2s; margin-top: 4px;
          box-shadow: 0 4px 14px rgba(0,180,216,0.38); letter-spacing: 0.01em;
        }
        .rp-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(0,180,216,0.50); }
        .rp-btn:active:not(:disabled) { transform: translateY(0); }
        .rp-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .rp-spin {
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.35); border-top-color: white;
          border-radius: 50%; animation: rp-spin 0.55s linear infinite; flex-shrink: 0;
        }
        @keyframes rp-spin { to { transform: rotate(360deg); } }

        .rp-divider { display: flex; align-items: center; gap: 10px; margin: 1.25rem 0 1rem; }
        .rp-div-line { flex: 1; height: 1px; background: #E2EEF9; }
        .rp-div-dot  { width: 3px; height: 3px; border-radius: 50%; background: #B0C4D8; }

        .rp-footer { text-align: center; font-size: 12.5px; color: #94a3b8; font-weight: 500; }
        .rp-footer-btn {
          background: none; border: none; font-family: inherit; font-size: 12.5px;
          font-weight: 700; color: #00B4D8; cursor: pointer; padding: 0; transition: color 0.15s;
        }
        .rp-footer-btn:hover { color: #0096B7; text-decoration: underline; }

        .rp-icon-box {
          width: 52px; height: 52px; border-radius: 16px;
          background: linear-gradient(135deg, #00B4D8, #0096B7);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1rem; box-shadow: 0 8px 24px rgba(0,180,216,0.32);
        }
        .rp-success-title { font-size: 1.1rem; font-weight: 800; color: #0D2244; letter-spacing: -0.025em; margin-bottom: 0.35rem; }
        .rp-success-body  { font-size: 12.5px; color: #64748b; line-height: 1.65; margin-bottom: 1.1rem; }

        .rp-invalid-note {
          font-size: 12px; color: #64748b; line-height: 1.65; margin-bottom: 1.1rem;
          padding: 10px 12px; background: rgba(239,68,68,0.05);
          border: 1px solid rgba(239,68,68,0.15); border-radius: 10px;
        }
        .rp-invalid-note strong { color: #dc2626; }
      `}</style>

      <div className="rp-page">
        <div className="rp-bg" />
        <div className="rp-grid" />
        <div className="rp-blob rp-blob-1" />
        <div className="rp-blob rp-blob-2" />
        <div className="rp-blob rp-blob-3" />

        {/* Back button */}
        <motion.button
          className="rp-back"
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

        <div className="rp-wrap">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.1 }}
          >
            <div className="rp-heading">
              <h1>Set new <em>password</em></h1>
              <p>Choose a strong password to protect your account.</p>
            </div>
          </motion.div>

          {/* Card */}
          <motion.div
            className="rp-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
          >
            <AnimatePresence mode="wait">

              {/* ── Checking token ── */}
              {tokenState === "checking" && (
                <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <div className="rp-spin" style={{ margin: "0 auto", borderTopColor: "#00B4D8", borderColor: "rgba(0,180,216,0.2)", width: 20, height: 20 }} />
                  <p style={{ marginTop: 12, fontSize: 13, color: "#64748b" }}>Validating your reset link…</p>
                </motion.div>
              )}

              {/* ── Invalid / expired token ── */}
              {tokenState === "invalid" && (
                <motion.div key="invalid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div className="rp-icon-box" style={{ background: "linear-gradient(135deg, #f87171, #dc2626)" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  </div>
                  <div className="rp-success-title">Link expired or invalid</div>
                  <div className="rp-invalid-note">
                    This reset link is <strong>no longer valid</strong>. Reset links expire after 1 hour and can only be used once.
                  </div>
                  <button className="rp-btn" type="button" onClick={() => navigate("/forgot-password")}>
                    Request a new link
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <div className="rp-divider">
                    <div className="rp-div-line" /><div className="rp-div-dot" /><div className="rp-div-line" />
                  </div>
                  <div className="rp-footer">
                    <button className="rp-footer-btn" type="button" onClick={() => goToLogin(navigate)}>
                      ← Back to sign in
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Reset form ── */}
              {tokenState === "valid" && !done && (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>

                  {/* Email chip */}
                  <div style={{ fontSize: 11.5, color: "#64748b", marginBottom: "1rem",
                    padding: "8px 12px", background: "rgba(0,180,216,0.05)",
                    border: "1px solid rgba(0,180,216,0.14)", borderRadius: 9, fontWeight: 500 }}>
                    Resetting password for <strong style={{ color: "#0096B7" }}>{email}</strong>
                  </div>

                  <form onSubmit={handleSubmit}>

                    {/* New password */}
                    <div className="rp-field">
                      <label className="rp-label" htmlFor="rp-pw">New Password</label>
                      <div className="rp-input-wrap">
                        <span className="rp-input-icon"><Lock size={14} /></span>
                        <input
                          id="rp-pw"
                          className="rp-input"
                          type={showPw ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoFocus
                          autoComplete="new-password"
                        />
                        <button type="button" className="rp-eye" onClick={() => setShowPw(v => !v)}>
                          {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>

                      {/* Strength bars */}
                      {password.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <div className="rp-strength-bars" style={{ flex: 1 }}>
                              {[1,2,3,4].map(i => (
                                <div key={i} className="rp-strength-bar"
                                  style={{ background: i <= strengthScore ? strengthColor : "#E2EEF9" }} />
                              ))}
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 700, color: strengthColor, minWidth: 36 }}>{strengthLabel}</span>
                          </div>
                          <div className="rp-checks">
                            {[
                              { label: "8+ chars",  ok: password.length >= 8 },
                              { label: "Uppercase", ok: /[A-Z]/.test(password) },
                              { label: "Lowercase", ok: /[a-z]/.test(password) },
                              { label: "Number",    ok: /[0-9]/.test(password) },
                            ].map(c => (
                              <span key={c.label} className="rp-check" style={{
                                border: `1px solid ${c.ok ? "#00B4D8" : "#E2EEF9"}`,
                                background: c.ok ? "rgba(0,180,216,0.08)" : "transparent",
                                color: c.ok ? "#0096B7" : "#94a3b8",
                              }}>
                                {c.ok ? "✓ " : ""}{c.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm password */}
                    <div className="rp-field">
                      <label className="rp-label" htmlFor="rp-confirm">Confirm Password</label>
                      <div className="rp-input-wrap">
                        <span className="rp-input-icon"><Lock size={14} /></span>
                        <input
                          id="rp-confirm"
                          className="rp-input"
                          type={showConfirm ? "text" : "password"}
                          placeholder="Repeat password"
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                          autoComplete="new-password"
                          style={{
                            borderColor: confirm.length === 0 ? "#E2EEF9" : passwordsMatch ? "#86efac" : "#fca5a5",
                            boxShadow: confirm.length > 0
                              ? `0 0 0 3px ${passwordsMatch ? "rgba(134,239,172,0.2)" : "rgba(252,165,165,0.2)"}`
                              : "none",
                          }}
                        />
                        <button type="button" className="rp-eye" onClick={() => setShowConfirm(v => !v)}>
                          {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                      {confirm.length > 0 && (
                        <p className="rp-match" style={{ color: passwordsMatch ? "#16a34a" : "#dc2626" }}>
                          {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                        </p>
                      )}
                    </div>

                    <button className="rp-btn" type="submit" disabled={!canSubmit}>
                      {loading ? (
                        <><div className="rp-spin" />Updating password…</>
                      ) : (
                        <>
                          Set new password
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="rp-divider">
                    <div className="rp-div-line" /><div className="rp-div-dot" /><div className="rp-div-line" />
                  </div>
                  <div className="rp-footer">
                    <button className="rp-footer-btn" type="button" onClick={() => goToLogin(navigate)}>
                      ← Back to sign in
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Success ── */}
              {done && (
                <motion.div key="success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                  <div className="rp-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div className="rp-success-title">Password updated!</div>
                  <p className="rp-success-body">
                    Your password has been reset successfully. You can now sign in with your new password.
                  </p>
                  <button className="rp-btn" type="button" onClick={() => goToLogin(navigate)}>
                    Sign in now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
}