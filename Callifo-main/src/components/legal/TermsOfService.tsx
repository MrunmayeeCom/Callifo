import { X, FileText } from "lucide-react";

interface TermsOfServiceProps {
  onClose: () => void;
}

export function TermsOfService({ onClose }: TermsOfServiceProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-coral-500 to-pink-500 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <h1 className="text-white">Terms of Service</h1>
                <p className="text-coral-100">Last updated: December 11, 2025</p>
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
              <h2 className="text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                These Terms of Service constitute a legally binding agreement between you and CallFlow ("Company," "we," "us," or "our") concerning your access to and use of our call management platform and services.
              </p>
              <p className="text-gray-700">
                By accessing or using our services, you agree that you have read, understood, and agree to be bound by these Terms. If you do not agree, you are not authorized to access or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">2. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for spam or unsolicited communications</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Impersonate any person or entity</li>
                <li>Collect or store personal data of other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information is up to date</li>
              </ul>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account if any information provided proves to be inaccurate, false, or misleading.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">4. Subscription and Billing</h2>
              <h3 className="text-gray-900 mb-3">Payment Terms</h3>
              <p className="text-gray-700 mb-4">
                Our services are offered on a subscription basis. By subscribing to our services, you agree to pay all applicable fees as described in your selected plan.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We may change our fees with 30 days' notice</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>

              <h3 className="text-gray-900 mb-3">Free Trial</h3>
              <p className="text-gray-700">
                We may offer a free trial period. If you do not cancel before the trial ends, you will be automatically charged for your selected subscription plan.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">5. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The service and its original content, features, and functionality are owned by CallFlow and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                You may not copy, modify, distribute, sell, or lease any part of our services without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">6. Service Availability</h2>
              <p className="text-gray-700 mb-4">
                We strive to provide reliable service but cannot guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Uninterrupted or error-free operation</li>
                <li>That defects will be corrected immediately</li>
                <li>That the service is free from viruses or harmful components</li>
                <li>That results obtained from using the service will be accurate or reliable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, CallFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Loss of profits, data, or use</li>
                <li>Cost of procurement of substitute services</li>
                <li>Business interruption</li>
                <li>Any other commercial damages or losses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">8. Indemnification</h2>
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless CallFlow and its officers, directors, employees, and agents from any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Breach of these Terms</li>
                <li>Non-payment of fees</li>
                <li>At our sole discretion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-coral-50 p-6 rounded-lg space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@callflow.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Business Ave, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-coral-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
