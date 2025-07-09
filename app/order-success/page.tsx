'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Phone, Mail, ArrowRight } from '../../src/lib/icons'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    // Get order number from URL params or generate one
    const orderFromUrl = searchParams.get('orderNumber')
    if (orderFromUrl) {
      setOrderNumber(orderFromUrl)
    } else {
      const randomOrderNumber = 'ORD' + Date.now().toString().slice(-8)
      setOrderNumber(randomOrderNumber)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium text-gray-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-medium text-green-600">Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Status:</span>
                <span className="font-medium text-blue-600">Processing</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                  <p className="text-sm text-gray-600">You'll receive an email confirmation shortly with your order details.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Processing</h3>
                  <p className="text-sm text-gray-600">We'll prepare your order and get it ready for shipment.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Shipping</h3>
                  <p className="text-sm text-gray-600">Your order will be shipped and you'll receive tracking information.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-green-600">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Delivery</h3>
                  <p className="text-sm text-gray-600">Your order will be delivered to your specified address.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Truck className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Estimated Delivery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900">Hyderabad Local</div>
                <div className="text-gray-600">3-4 business days</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Nearby States</div>
                <div className="text-gray-600">4-5 business days</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">All India</div>
                <div className="text-gray-600">5-7 business days</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, feel free to contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Call Us</div>
                  <div className="text-sm text-gray-600">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Email Us</div>
                  <div className="text-sm text-gray-600">support@modernstore.com</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/contact"
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center flex items-center justify-center space-x-2"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Order confirmation and tracking details will be sent to your email address.
              <br />
              For custom wallpapers and blinds, our team may contact you for final measurements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
