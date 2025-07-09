import { CreditCard, Clock, CheckCircle, XCircle } from '../../src/lib/icons'

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
            <p className="text-xl text-gray-600">
              Clear and fair refund terms for your peace of mind
            </p>
          </div>

          {/* Refund Eligibility */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Eligibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-bold text-green-900">Eligible for Refund</h3>
                </div>
                <ul className="text-green-800 space-y-2">
                  <li>• Products returned within 7 days</li>
                  <li>• Items in original packaging</li>
                  <li>• Unused and undamaged products</li>
                  <li>• Manufacturing defects</li>
                  <li>• Wrong item delivered</li>
                  <li>• Damaged during shipping</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <XCircle className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-bold text-red-900">Not Eligible for Refund</h3>
                </div>
                <ul className="text-red-800 space-y-2">
                  <li>• Custom-sized products (unless defective)</li>
                  <li>• Products used or installed</li>
                  <li>• Items returned after 7 days</li>
                  <li>• Products without original packaging</li>
                  <li>• Damage due to misuse</li>
                  <li>• Change of mind (custom orders)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Request Refund</h3>
                <p className="text-sm text-gray-600">
                  Contact us within 7 days of delivery to initiate refund request
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Return Product</h3>
                <p className="text-sm text-gray-600">
                  Ship the product back to us using provided return instructions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Inspection</h3>
                <p className="text-sm text-gray-600">
                  We inspect the returned product to verify its condition
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Refund Issued</h3>
                <p className="text-sm text-gray-600">
                  Refund processed to your original payment method
                </p>
              </div>
            </div>
          </div>

          {/* Refund Timeline */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Timeline</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-gray-600 mb-2">
                    Once we receive your returned item, we'll inspect it and process your refund within 2-3 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CreditCard className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Refund Methods & Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Credit/Debit Card</span>
                      <span className="text-blue-600 font-medium">5-7 business days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">UPI/Net Banking</span>
                      <span className="text-green-600 font-medium">3-5 business days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">COD Orders</span>
                      <span className="text-purple-600 font-medium">Bank transfer within 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partial Refunds */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Partial Refunds</h2>
            <p className="text-gray-600 mb-4">
              Partial refunds may be granted in the following situations:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Products with minor defects that don't affect functionality</li>
              <li>• Items returned without original packaging (if still acceptable)</li>
              <li>• Products showing signs of use but still in good condition</li>
              <li>• Bulk orders where only some items are returned</li>
            </ul>
          </div>

          {/* Shipping Costs */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Costs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">We Pay Return Shipping When:</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Product is defective or damaged</li>
                  <li>• Wrong item was delivered</li>
                  <li>• Our error in order fulfillment</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-orange-900 mb-2">Customer Pays Return Shipping When:</h3>
                <ul className="text-orange-800 space-y-1">
                  <li>• Change of mind</li>
                  <li>• Ordered wrong size/color</li>
                  <li>• No longer needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact for Refunds */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need to Request a Refund?</h3>
              <p className="mb-6 opacity-90">
                Contact our customer support team to start your refund process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="mailto:refunds@modernstore.com"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Email: refunds@modernstore.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
