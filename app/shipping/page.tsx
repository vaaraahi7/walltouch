import { Truck, Clock, MapPin, Package } from '../../src/lib/icons'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
            <p className="text-xl text-gray-600">
              Fast, reliable delivery across India with multiple shipping options
            </p>
          </div>

          {/* Shipping Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Delivery</h3>
              <p className="text-gray-600 mb-3">5-7 business days</p>
              <p className="text-2xl font-bold text-blue-600">₹50</p>
              <p className="text-sm text-gray-500">Free on orders above ₹500</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Express Delivery</h3>
              <p className="text-gray-600 mb-3">3-4 business days</p>
              <p className="text-2xl font-bold text-green-600">₹150</p>
              <p className="text-sm text-gray-500">Available in major cities</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Same Day</h3>
              <p className="text-gray-600 mb-3">Within 24 hours</p>
              <p className="text-2xl font-bold text-purple-600">₹300</p>
              <p className="text-sm text-gray-500">Select cities only</p>
            </div>
          </div>

          {/* Delivery Zones */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Zones</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">Zone 1 - Hyderabad & Nearby</h3>
                <p className="text-gray-600">3-4 business days</p>
                <p className="text-sm text-gray-500">Hyderabad, Secunderabad, Cyberabad</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">Zone 2 - South India</h3>
                <p className="text-gray-600">4-5 business days</p>
                <p className="text-sm text-gray-500">Telangana, Andhra Pradesh, Karnataka, Tamil Nadu, Kerala</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900">Zone 3 - Rest of India</h3>
                <p className="text-gray-600">5-7 business days</p>
                <p className="text-sm text-gray-500">All other states and union territories</p>
              </div>
            </div>
          </div>

          {/* Shipping Policy */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Policy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-gray-600">
                  Orders are processed within 1-2 business days. Custom-sized products may take 
                  an additional 2-3 days for preparation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tracking</h3>
                <p className="text-gray-600">
                  Once your order is shipped, you'll receive a tracking number via email and SMS. 
                  You can track your package in real-time.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Attempts</h3>
                <p className="text-gray-600">
                  Our delivery partners will attempt delivery 2-3 times. If unsuccessful, 
                  the package will be held at the nearest delivery center for pickup.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Instructions</h3>
                <p className="text-gray-600">
                  You can provide special delivery instructions during checkout. We'll do our 
                  best to accommodate your requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
