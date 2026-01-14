import { X, Cookie } from "lucide-react";

interface CookiePolicyProps {
  onClose: () => void;
}

export function CookiePolicy({ onClose }: CookiePolicyProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cookie className="w-8 h-8" />
              <div>
                <h1 className="text-white">Cookie Policy</h1>
                <p className="text-teal-100">Last updated: December 11, 2025</p>
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
              <h2 className="text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-gray-700">
                CallFlow uses cookies and similar tracking technologies to track activity on our service and store certain information to provide you with a better, faster, and safer experience.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Essential Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Authentication and security</li>
                    <li>Session management</li>
                    <li>Load balancing</li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Performance Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Google Analytics</li>
                    <li>Page load times</li>
                    <li>Error tracking</li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Functional Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Language preferences</li>
                    <li>User interface customization</li>
                    <li>Regional settings</li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="text-gray-900 mb-3">Targeting/Advertising Cookies</h3>
                  <p className="text-gray-700 mb-2">
                    These cookies are used to deliver advertisements relevant to you and your interests.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Marketing campaign tracking</li>
                    <li>Retargeting</li>
                    <li>Interest-based advertising</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Google Analytics:</strong> Web analytics service to analyze website usage</li>
                <li><strong>Google Ads:</strong> Advertising and remarketing services</li>
                <li><strong>Facebook Pixel:</strong> Conversion tracking and audience building</li>
                <li><strong>LinkedIn Insights:</strong> Website analytics and advertising</li>
                <li><strong>Intercom:</strong> Customer messaging and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">4. How Long Do Cookies Last?</h2>
              <p className="text-gray-700 mb-4">
                Cookies can be either "session" or "persistent" cookies:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-gray-900 mb-2">Session Cookies</h3>
                  <p className="text-gray-700">
                    These are temporary cookies that expire when you close your browser. They help us remember what you've done on previous pages within the same browsing session.
                  </p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="text-gray-900 mb-2">Persistent Cookies</h3>
                  <p className="text-gray-700">
                    These cookies remain on your device until they expire or you delete them. They help us recognize you as a returning visitor and remember your preferences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">5. Managing Cookies</h2>
              <p className="text-gray-700 mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in several ways:
              </p>
              
              <h3 className="text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                Most web browsers allow you to control cookies through their settings. However, limiting cookies may impact your experience of our website.
              </p>
              
              <h3 className="text-gray-900 mb-3">Cookie Consent Tool</h3>
              <p className="text-gray-700 mb-4">
                When you first visit our website, you can choose which categories of cookies to accept through our cookie consent banner.
              </p>

              <h3 className="text-gray-900 mb-3">Opt-Out Links</h3>
              <p className="text-gray-700 mb-4">
                You can opt out of certain third-party cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                <li>Google Ads: <a href="https://adssettings.google.com" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Ad Settings</a></li>
                <li>Facebook: <a href="https://www.facebook.com/ads/preferences" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">Ad Preferences</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">6. Do Not Track</h2>
              <p className="text-gray-700">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to be tracked. Currently, there is no standard for how DNT signals should be interpreted, so we do not currently respond to DNT signals.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">7. Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. We will notify you of any material changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-teal-50 p-6 rounded-lg space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@callflow.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Address:</strong> 123 Business Ave, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
