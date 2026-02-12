import React, { useState } from 'react';
import { createCustomerSupport } from "../api/customerSupport";

interface ContactSupportPageProps {
  onBack: () => void;
}

export function ContactSupportPage({ onBack }: ContactSupportPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    type: 'support'
  });

  const [loading, setLoading] = useState(false);

  const mapInquiryType = (type: string) => {
    switch (type) {
      case "support": return "TECHNICAL_SUPPORT";
      case "sales": return "SALES_INQUIRY";
      case "billing": return "BILLING_QUESTION";
      case "demo": return "DEMO_REQUEST";
      case "feature": return "FEATURE_REQUEST";
      case "bug": return "BUG_REPORT";
      default: return "OTHER";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      companyName: formData.company,
      inquiryType: mapInquiryType(formData.type),
      subject: formData.subject,
      message: formData.message,
      source: "CALLIFO",
    };

    try {
      await createCustomerSupport(payload);
      alert("Thank you! Our support team will get back to you within 24 hours.");
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
      console.error(error);
      alert("Failed to submit support request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <style>{`
        .contact-support-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #ffffff, #f9fafb);
        }

        .contact-header {
          background-color: #00C4CC;
          color: white;
          padding: 3rem 0;
        }

        .contact-header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
          border-radius: 0.375rem;
          transition: background-color 0.3s;
          font-size: 1rem;
        }

        .back-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }

        .contact-header h1 {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          margin: 0 0 1rem 0;
        }

        .contact-header p {
          font-size: 1.125rem;
          opacity: 0.9;
          max-width: 42rem;
          margin: 0;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 2fr;
          }
        }

        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .contact-card:hover {
          border-color: rgba(0, 51, 102, 0.3);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          width: 3rem;
          height: 3rem;
          background-color: rgba(0, 51, 102, 0.1);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #003366;
          margin: 0 0 1rem 0;
        }

        .contact-info-item {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          align-items: flex-start;
        }

        .contact-info-item:last-child {
          margin-bottom: 0;
        }

        .contact-info-item > span {
          font-size: 1.25rem;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .contact-info-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
          margin: 0 0 0.25rem 0;
        }

        .contact-info-value {
          font-size: 0.875rem;
          color: #4b5563;
          text-decoration: none;
          transition: color 0.3s;
          display: block;
          margin: 0;
        }

        a.contact-info-value:hover {
          color: #003366;
        }

        .form-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 2rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          margin-bottom: 1.5rem;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .form-description {
          color: #4b5563;
          margin: 0;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
          margin: 0;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          transition: all 0.3s;
          font-family: inherit;
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #003366;
          box-shadow: 0 0 0 3px rgba(0, 51, 102, 0.1);
        }

        .form-textarea {
          min-height: 150px;
          resize: vertical;
        }

        .form-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 0.5rem;
        }

        @media (min-width: 640px) {
          .form-buttons {
            flex-direction: row;
          }
        }

        .submit-button,
        .cancel-button {
          flex: 1;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }

        .submit-button {
          background-color: #00C4CC;
          color: white;
        }

        .submit-button:hover:not(:disabled) {
          background-color: rgba(0, 196, 204, 0.9);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-button {
          background-color: white;
          color: #111827;
          border: 1px solid #d1d5db;
        }

        .cancel-button:hover {
          background-color: #f3f4f6;
        }

        .faq-card {
          background: linear-gradient(to right, rgba(0, 51, 102, 0.05), rgba(0, 51, 102, 0.1));
          border: 2px solid rgba(0, 51, 102, 0.2);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-top: 1.5rem;
        }

        .faq-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #003366;
          margin: 0 0 0.5rem 0;
        }

        .faq-description {
          font-size: 0.875rem;
          color: #374151;
          margin: 0 0 1rem 0;
        }

        .faq-button {
          padding: 0.5rem 1rem;
          background: white;
          color: #003366;
          border: 1px solid #003366;
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s;
        }

        .faq-button:hover {
          background-color: #003366;
          color: white;
        }

        @media (max-width: 768px) {
          .contact-header h1 {
            font-size: 2rem;
          }
          
          .contact-header p {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="contact-support-container">
        {/* Header */}
        <div className="contact-header">
          <div className="contact-header-content">
            <button onClick={onBack} className="back-button">
              <span>←</span>
              Back to Home
            </button>
            <h1>Contact Support</h1>
            <p>Our support team is here to help you with any questions about Callifo</p>
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-grid">
            {/* Contact Information Cards */}
            <div className="contact-cards">
              {/* Customer Support Card */}
              <div className="contact-card">
                <div className="card-icon">
                  <span>💬</span>
                </div>
                <h3 className="card-title">Customer Support</h3>
                <div className="contact-info-item">
                  <span>📧</span>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <a href="mailto:support@callifo.com" className="contact-info-value">
                      support@callifo.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span>📞</span>
                  <div>
                    <div className="contact-info-label">Phone</div>
                    <a href="tel:+18001234567" className="contact-info-value">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span>🕐</span>
                  <div>
                    <div className="contact-info-label">Support Hours</div>
                    <div className="contact-info-value">24/7 Support Available</div>
                  </div>
                </div>
              </div>

              {/* Sales Inquiries Card */}
              <div className="contact-card">
                <div className="card-icon">
                  <span>🎧</span>
                </div>
                <h3 className="card-title">Sales Inquiries</h3>
                <div className="contact-info-item">
                  <span>📧</span>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <a href="mailto:sales@callifo.com" className="contact-info-value">
                      sales@callifo.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span>📞</span>
                  <div>
                    <div className="contact-info-label">Phone</div>
                    <a href="tel:+18001234568" className="contact-info-value">
                      +1 (800) 123-4568
                    </a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span>🕐</span>
                  <div>
                    <div className="contact-info-label">Hours</div>
                    <div className="contact-info-value">Mon-Fri: 9AM - 6PM PST</div>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="contact-card">
                <div className="card-icon">
                  <span>📍</span>
                </div>
                <h3 className="card-title">Office Location</h3>
                <p className="contact-info-value" style={{lineHeight: '1.6'}}>
                  Callifo Headquarters<br />
                  123 Business Ave<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="form-card">
                <div className="form-header">
                  <h2 className="form-title">Send us a Message</h2>
                  <p className="form-description">
                    Fill out the form below and our support team will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company" className="form-label">Company Name</label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Acme Corporation"
                        value={formData.company}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="type" className="form-label">Inquiry Type *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="billing">Billing Question</option>
                      <option value="demo">Demo Request</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject *</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your inquiry in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="form-textarea"
                    />
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="submit-button" disabled={loading}>
                      {loading ? "Submitting..." : "Send Message"}
                    </button>
                    <button type="button" className="cancel-button" onClick={onBack}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* FAQ Quick Link */}
              <div className="faq-card">
                <h3 className="faq-title">Looking for Quick Answers?</h3>
                <p className="faq-description">
                  Check out our FAQ section for instant answers to common questions about Callifo.
                </p>
                <button 
                  className="faq-button"
                  onClick={() => {
                    onBack();
                    setTimeout(() => {
                      const faqElement = document.getElementById('faqs');
                      if (faqElement) {
                        faqElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  }}
                >
                  Visit FAQ Section
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}