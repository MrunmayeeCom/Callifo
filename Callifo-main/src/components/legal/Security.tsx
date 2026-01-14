import { X, Lock, Shield, Eye, Server, Key, AlertTriangle } from "lucide-react";

interface SecurityProps {
  onClose: () => void;
}

export function Security({ onClose }: SecurityProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-8 h-8" />
              <div>
                <h1 className="text-white">Security</h1>
                <p className="text-violet-100">Last updated: December 11, 2025</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-gray-900 mb-4">Our Commitment to Security</h2>
              <p className="text-gray-700 mb-4">
                At CallFlow, security is not just a feature—it's our foundation. We understand that you trust us with your most valuable business communications, and we take that responsibility seriously. We employ industry-leading security practices to protect your data and ensure the integrity of our platform.
              </p>
              <p className="text-gray-700">
                This document outlines our comprehensive approach to security, including the technical, physical, and administrative measures we implement to safeguard your information.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Security Framework</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-violet-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-600 rounded-lg">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-900">Data Encryption</h3>
                  </div>
                  <p className="text-gray-700">
                    All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption standards.
                  </p>
                </div>

                <div className="bg-violet-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-600 rounded-lg">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-900">Compliance</h3>
                  </div>
                  <p className="text-gray-700">
                    We maintain SOC 2 Type II, GDPR, HIPAA, and ISO 27001 compliance certifications.
                  </p>
                </div>

                <div className="bg-violet-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-600 rounded-lg">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-900">Monitoring</h3>
                  </div>
                  <p className="text-gray-700">
                    24/7 security monitoring and automated threat detection systems protect against intrusions.
                  </p>
                </div>

                <div className="bg-violet-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-violet-600 rounded-lg">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-900">Infrastructure</h3>
                  </div>
                  <p className="text-gray-700">
                    Enterprise-grade infrastructure hosted on AWS with redundancy and disaster recovery.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Data Protection Measures</h2>
              
              <h3 className="text-gray-900 mb-3">Encryption</h3>
              <p className="text-gray-700 mb-4">
                We implement multiple layers of encryption to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                <li><strong>In Transit:</strong> TLS 1.3 encryption for all data transmitted between your browser and our servers</li>
                <li><strong>At Rest:</strong> AES-256 encryption for all stored data including databases and backups</li>
                <li><strong>Application Level:</strong> Additional encryption for sensitive fields like passwords and API keys</li>
                <li><strong>Call Recordings:</strong> End-to-end encryption for all call recordings and transcripts</li>
              </ul>

              <h3 className="text-gray-900 mb-3">Access Controls</h3>
              <p className="text-gray-700 mb-4">
                We implement strict access controls to ensure only authorized personnel can access your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Multi-factor authentication (MFA) required for all employee accounts</li>
                <li>Role-based access control (RBAC) limiting data access by job function</li>
                <li>Just-in-time access provisioning for temporary elevated permissions</li>
                <li>Regular access reviews and automatic deprovisioning</li>
                <li>Comprehensive audit logs of all data access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Infrastructure Security</h2>
              
              <h3 className="text-gray-900 mb-3">Network Security</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Web Application Firewall (WAF) protecting against common attacks</li>
                <li>DDoS protection and mitigation</li>
                <li>Intrusion Detection and Prevention Systems (IDS/IPS)</li>
                <li>Network segmentation and isolation</li>
                <li>Regular penetration testing and vulnerability assessments</li>
              </ul>

              <h3 className="text-gray-900 mb-3">Application Security</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Secure software development lifecycle (SSDLC)</li>
                <li>Regular security code reviews</li>
                <li>Automated security scanning in CI/CD pipeline</li>
                <li>Third-party security audits</li>
                <li>Bug bounty program</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Compliance & Certifications</h2>
              <p className="text-gray-700 mb-4">
                CallFlow maintains the following compliance certifications:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-violet-500 pl-4">
                  <h3 className="text-gray-900 mb-2">SOC 2 Type II</h3>
                  <p className="text-gray-700">
                    Independent audit of our security, availability, and confidentiality controls performed annually.
                  </p>
                </div>

                <div className="border-l-4 border-violet-500 pl-4">
                  <h3 className="text-gray-900 mb-2">GDPR Compliance</h3>
                  <p className="text-gray-700">
                    Full compliance with EU General Data Protection Regulation including data processing agreements and privacy by design.
                  </p>
                </div>

                <div className="border-l-4 border-violet-500 pl-4">
                  <h3 className="text-gray-900 mb-2">HIPAA Compliance</h3>
                  <p className="text-gray-700">
                    Business Associate Agreements (BAA) available for healthcare customers handling protected health information.
                  </p>
                </div>

                <div className="border-l-4 border-violet-500 pl-4">
                  <h3 className="text-gray-900 mb-2">ISO 27001</h3>
                  <p className="text-gray-700">
                    International standard for information security management systems certification.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Incident Response</h2>
              <p className="text-gray-700 mb-4">
                We maintain a comprehensive incident response plan to quickly address any security events:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>24/7 security operations center (SOC)</li>
                <li>Automated incident detection and alerting</li>
                <li>Defined escalation procedures</li>
                <li>Regular incident response drills and tabletop exercises</li>
                <li>Customer notification within 72 hours of confirmed breach</li>
                <li>Post-incident analysis and remediation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Data Backup & Disaster Recovery</h2>
              <p className="text-gray-700 mb-4">
                We ensure business continuity and data resilience through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Automated daily backups with 30-day retention</li>
                <li>Geographically distributed backup storage</li>
                <li>Regular backup restoration testing</li>
                <li>99.9% uptime SLA</li>
                <li>Multi-region redundancy</li>
                <li>Disaster recovery plan with RTO &lt; 4 hours</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Employee Security</h2>
              <p className="text-gray-700 mb-4">
                Our team members are our first line of defense:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Background checks for all employees</li>
                <li>Security awareness training upon hire and quarterly thereafter</li>
                <li>Mandatory security policies and procedures</li>
                <li>Signed confidentiality agreements</li>
                <li>Regular phishing simulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Your Security Responsibilities</h2>
              <p className="text-gray-700 mb-4">
                Security is a shared responsibility. Here's how you can help:
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <div className="flex gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Use strong, unique passwords</strong> for your CallFlow account</p>
                    <p><strong>Enable multi-factor authentication</strong> in your account settings</p>
                    <p><strong>Never share your credentials</strong> with anyone</p>
                    <p><strong>Report suspicious activity</strong> to security@callflow.com immediately</p>
                    <p><strong>Keep your software updated</strong> including browsers and operating systems</p>
                    <p><strong>Be cautious of phishing attempts</strong> claiming to be from CallFlow</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">Security Contact</h2>
              <p className="text-gray-700 mb-4">
                We welcome security researchers and users to report potential vulnerabilities:
              </p>
              <div className="bg-violet-50 p-6 rounded-lg space-y-2 text-gray-700">
                <p><strong>Security Email:</strong> security@callflow.com</p>
                <p><strong>Bug Bounty Program:</strong> <a href="#" className="text-violet-600 hover:underline">bounty.callflow.com</a></p>
                <p><strong>PGP Key:</strong> Available upon request</p>
                <p className="text-sm pt-2 text-gray-600">
                  Please allow up to 48 hours for initial response to security reports.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
