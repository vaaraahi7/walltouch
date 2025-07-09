export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better browsing experience and allow certain features to work properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies to understand how you use our site</li>
                <li>Preference cookies to remember your settings</li>
                <li>Marketing cookies to show relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    These cookies are necessary for the website to function properly. They enable basic 
                    features like page navigation, shopping cart functionality, and secure access to your account.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics Cookies</h3>
                  <p className="text-gray-600">
                    We use Google Analytics and similar services to understand how visitors interact with 
                    our website. This helps us improve our site and provide better user experience.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Preference Cookies</h3>
                  <p className="text-gray-600">
                    These cookies remember your preferences and settings, such as language selection, 
                    currency, and other customization options.
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-600">
                    These cookies track your browsing habits to show you relevant advertisements and 
                    measure the effectiveness of our marketing campaigns.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
              <p className="text-gray-600 mb-4">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Browser settings: Most browsers allow you to block or delete cookies</li>
                <li>Cookie preferences: Use our cookie preference center (if available)</li>
                <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
                <li>Do Not Track: Enable Do Not Track in your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                We may use third-party services that set their own cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing features</li>
                <li>Advertising networks for targeted ads</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Choices</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Accept or reject non-essential cookies</li>
                <li>Change your cookie preferences at any time</li>
                <li>Delete existing cookies from your device</li>
                <li>Browse our site with cookies disabled (some features may not work)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <ul className="list-none text-gray-600 space-y-2">
                <li>Email: privacy@modernstore.com</li>
                <li>Phone: +91 9876543210</li>
                <li>Address: 123 Business District, Hyderabad, Telangana 500001</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
