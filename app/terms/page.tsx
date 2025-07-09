export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using ModernStore's website and services, you accept and agree to be 
                bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Products and Services</h2>
              <p className="text-gray-600 mb-4">
                We offer wallpapers, blinds, and related home decor products. All product descriptions, 
                prices, and availability are subject to change without notice.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Product colors may vary slightly from images due to monitor settings</li>
                <li>Custom-sized products are made to order and non-returnable</li>
                <li>Installation services are provided by certified partners</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Orders and Payment</h2>
              <p className="text-gray-600 mb-4">
                By placing an order, you agree to provide accurate and complete information.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>Payment must be received before order processing</li>
                <li>We reserve the right to cancel orders for any reason</li>
                <li>COD orders may require verification</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-4">
                We strive to deliver products within the estimated timeframes, but delivery dates 
                are not guaranteed.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Shipping charges are calculated based on location and order value</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>Delivery attempts will be made during business hours</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Returns and Refunds</h2>
              <p className="text-gray-600 mb-4">
                Returns are accepted within 7 days of delivery for eligible products.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Products must be unused and in original packaging</li>
                <li>Custom-sized products are not eligible for return</li>
                <li>Return shipping costs are borne by the customer</li>
                <li>Refunds are processed within 5-7 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Conduct</h2>
              <p className="text-gray-600 mb-4">
                You agree not to use our services for any unlawful purpose or in any way that 
                could damage our business or reputation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content on this website, including images, text, and designs, is protected 
                by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                Our liability is limited to the maximum extent permitted by law. We are not 
                responsible for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms are governed by the laws of India. Any disputes will be resolved 
                in the courts of Hyderabad, Telangana.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these terms, contact us:
              </p>
              <ul className="list-none text-gray-600 space-y-2">
                <li>Email: legal@modernstore.com</li>
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
