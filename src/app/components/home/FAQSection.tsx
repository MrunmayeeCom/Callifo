import { useState } from "react";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const faqCategories = [
  {
    name: "General",
    emoji: "💡",
    questions: [
      {
        question: "What is Callifo and how does it work?",
        answer: "Callifo is a Call Management and Lead Tracking System designed to automate call tracking and streamline lead management for sales teams. It integrates with Bitrix24 CRM to automatically capture caller information, update leads, and maintain detailed call logs — without any manual input from your team.",
      },
      {
        question: "Do I need to install any software?",
        answer: "The admin dashboard runs entirely in your web browser — no installation needed. Sales team members use the Callifo Android app to log and track calls from their mobile devices. Everything is cloud-hosted, so there is nothing to set up on your own servers.",
      },
      {
        question: "Can I try Callifo before purchasing?",
        answer: "Yes! We offer a 7-day free trial with full access to all features. No credit card required to start your trial.",
      },
      {
        question: "How quickly can I get started?",
        answer: "Most customers are up and running within 24 hours. The setup involves installing the Android app, connecting to your Bitrix24 account, and configuring your team members. Our support team is available to assist you throughout the process.",
      },
    ],
  },
  {
    name: "Technical",
    emoji: "⚙️",
    questions: [
      {
        question: "What CRM does Callifo integrate with?",
        answer: "Callifo integrates natively with Bitrix24 CRM. Every call automatically creates or updates a lead in Bitrix24 and logs the call activity to the lead's timeline — all in real time.",
      },
      {
        question: "Is my data secure with Callifo?",
        answer: "Absolutely. We use bank-level encryption (256-bit SSL), are PCI compliant, and follow strict security protocols. All data is encrypted both in transit and at rest. We are also GDPR and HIPAA compliant.",
      },
      {
        question: "What devices does the Callifo mobile app support?",
        answer: "The Callifo mobile app is an Android application that supports dual-SIM devices. It requires the necessary device permissions to capture call data accurately, including access to call logs and contact information.",
      },
      {
        question: "Do you offer API access?",
        answer: "Yes. Callifo provides a comprehensive REST API covering call logging, analytics, CRM synchronization, and user management. Full API documentation is available upon request.",
      },
    ],
  },
  {
    name: "Billing & Pricing",
    emoji: "💳",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for annual subscriptions. Enterprise customers can request invoice billing.",
      },
      {
        question: "Can I change my plan later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle.",
      },
      {
        question: "Do you offer discounts for annual billing?",
        answer: "Yes! Save 20% when you choose annual billing. Half-yearly billing saves 10%, and quarterly billing saves 5% compared to monthly pricing.",
      },
      {
        question: "What happens if I exceed my call limit?",
        answer: "We'll notify you before you reach your limit. You can either upgrade your plan or purchase additional call credits. We never interrupt your service.",
      },
    ],
  },
  {
    name: "Support",
    emoji: "🎧",
    questions: [
      {
        question: "What kind of customer support do you provide?",
        answer: "Starter plans include email support with responses within 24 hours. Professional plans include priority 24/7 support via email, chat, and phone. Enterprise customers receive a dedicated account manager.",
      },
      {
        question: "Do you offer onboarding for new teams?",
        answer: "Yes! All plans include access to our knowledge base and setup guides. Enterprise customers receive personalized onboarding, including assistance with configuring the Android app, connecting Bitrix24, and setting up the admin dashboard for your team.",
      },
      {
        question: "Is there a setup fee?",
        answer: "No setup fees for Starter and Professional plans. Enterprise customers may have custom setup requirements that are discussed during the sales process.",
      },
    ],
  },
];

export function FAQSection({ onNavigateToContact }: { onNavigateToContact?: () => void }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .faq-wrap {
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          padding: 16px 0 72px;
        }

        .faq-inner {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .faq-title {
          font-size: 48px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 8px 0;
        }

        .faq-title-blue { color: #0ea5e9; }

        .faq-subtitle {
          font-size: 14px;
          color: #64748b;
          font-weight: 400;
          margin: 0;
        }

        .faq-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 28px;
        }

        .faq-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #475569;
          font-family: 'Inter', sans-serif;
          transition: all 0.18s ease;
        }

        .faq-tab:hover { border-color: #0ea5e9; color: #0ea5e9; }

        .faq-tab.active {
          background: #0ea5e9;
          border-color: #0ea5e9;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(14,165,233,0.25);
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .faq-item {
          background: #fff;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .faq-item.open {
          border-color: #0ea5e9;
          box-shadow: 0 4px 20px rgba(14,165,233,0.08);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: 'Inter', sans-serif;
          transition: background 0.15s ease;
        }

        .faq-question:hover { background: #f8fafc; }
        .faq-item.open .faq-question { background: #f0f9ff; }

        .faq-q-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .faq-q-num {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }

        .faq-item.open .faq-q-num { background: #0ea5e9; color: #fff; }

        .faq-q-text {
          font-size: 13.5px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.4;
        }

        .faq-chevron {
          width: 18px; height: 18px;
          color: #94a3b8;
          flex-shrink: 0;
          transition: transform 0.25s ease, color 0.2s;
        }

        .faq-item.open .faq-chevron { transform: rotate(180deg); color: #0ea5e9; }

        .faq-answer {
          padding: 0 20px 16px 58px;
          font-size: 13px;
          color: #64748b;
          line-height: 1.7;
          font-weight: 400;
        }

        .faq-cta {
          margin-top: 36px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          border-radius: 18px;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .faq-cta-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .faq-cta-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .faq-cta-icon svg { width: 22px; height: 22px; color: #fff; }

        .faq-cta-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px 0;
        }

        .faq-cta-desc {
          font-size: 12.5px;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }

        .faq-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          background: #fff;
          color: #0ea5e9;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: opacity 0.18s ease, transform 0.18s ease;
          white-space: nowrap;
        }

        .faq-cta-btn:hover { opacity: 0.92; transform: translateY(-1px); }
        .faq-cta-btn svg { width: 14px; height: 14px; }
      `}</style>

      <section id="faq" className="faq-wrap">
        <div className="faq-inner">

          <div className="faq-header">
            <h2 className="faq-title">
              Frequently Asked <span className="faq-title-blue">Questions</span>
            </h2>
            <p className="faq-subtitle">Find answers to common questions about Callifo</p>
          </div>

          <div className="faq-tabs">
            {faqCategories.map((cat, i) => (
              <button
                key={i}
                className={`faq-tab ${activeCategory === i ? "active" : ""}`}
                onClick={() => { setActiveCategory(i); setOpenQuestion(null); }}
              >
                <span>{cat.emoji}</span> {cat.name}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {faqCategories[activeCategory].questions.map((item, i) => (
              <div key={i} className={`faq-item ${openQuestion === i ? "open" : ""}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenQuestion(openQuestion === i ? null : i)}
                >
                  <div className="faq-q-left">
                    <span className="faq-q-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q-text">{item.question}</span>
                  </div>
                  <ChevronDown className="faq-chevron" />
                </button>
                {openQuestion === i && (
                  <div className="faq-answer">{item.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <div className="faq-cta-left">
              <div className="faq-cta-icon">
                <MessageCircle />
              </div>
              <div>
                <p className="faq-cta-title">Still have questions?</p>
                <p className="faq-cta-desc">Our team is here to help. We'll get back to you within 24 hours.</p>
              </div>
            </div>
            <button className="faq-cta-btn" onClick={() => navigate("/contact")}>
              Contact Support <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQSection;