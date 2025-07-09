import { RotateCcw, Clock, CheckCircle, XCircle } from '../../src/lib/icons'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
            <p className="text-xl text-gray-600">
              Easy returns and exchanges within 7 days of delivery
            </p>
          </div>

          {/* Return Process */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600">
                  Contact our support team within 7 days of delivery
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Get Authorization</h3>
                <p className="text-sm text-gray-600">
                  Receive return authorization number and instructions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Ship Back</h3>
                <p className="text-sm text-gray-600">
                  Pack securely and ship back using provided instructions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Get Refund</h3>
                <p className="text-sm text-gray-600">
                  Receive refund within 5-7 business days after inspection
                </p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Policy</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Eligible for Return</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Standard-sized wallpapers and blinds</li>
                    <li>• Products in original packaging</li>
                    <li>• Unused and undamaged items</li>
                    <li>• Manufacturing defects</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <XCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Not Eligible for Return</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Custom-sized products (unless defective)</li>
                    <li>• Products damaged by customer</li>
                    <li>• Items returned after 7 days</li>
                    <li>• Products without original packaging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Refund Timeline</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">Credit/Debit Card: 5-7 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">UPI/Net Banking: 3-5 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-600">COD Orders: Bank transfer within 7 days</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Refund Method</h3>
                <p className="text-gray-600 mb-3">
                  Refunds are processed to the original payment method. For COD orders, 
                  we'll need your bank account details for direct transfer.
                </p>
                <p className="text-sm text-gray-500">
                  Note: Return shipping costs are borne by the customer unless the 
                  product is defective or damaged.
                </p>
              </div>
            </div>
          </div>

          {/* Exchange Policy */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Policy</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Exchanges are available for products of equal or higher value within 7 days of delivery.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-900 mb-2">Exchange Conditions:</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Product must be in original condition</li>
                  <li>• Exchange subject to stock availability</li>
                  <li>• Price difference must be paid for higher-value items</li>
                  <li>• Custom-sized products cannot be exchanged</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact for Returns */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need to Return Something?</h3>
              <p className="mb-6 opacity-90">
                Contact our customer support team to initiate a return or exchange
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="tel:+919876543210"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                  Call: +91 9876543210
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
