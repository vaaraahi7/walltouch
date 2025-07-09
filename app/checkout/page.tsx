'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Truck, Shield, MapPin, Phone, Mail, Package } from '../../src/lib/icons'
import { useCartStore } from '../../src/store/cart'
import { useAuthStore } from '../../src/store/auth'
import { useGlobalStore } from '../../src/contexts/GlobalStoreContext'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { siteSettings } = useGlobalStore()

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  })

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentInterface, setShowPaymentInterface] = useState(false)
  const [paymentStep, setPaymentStep] = useState('form') // 'form', 'payment', 'processing', 'success'

  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const shipping = subtotal > 500 ? 0 : 50
  const tax = siteSettings.gst?.enabled ? Math.round(subtotal * (siteSettings.gst.rate / 100)) : 0
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Allow guest checkout - no login required

    if (items.length === 0) {
      toast.error('Your cart is empty')
      router.push('/cart')
      return
    }

    // Validate required fields
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
      toast.error('Please fill in all required fields')
      return
    }

    // Validate payment method is selected
    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    // Show payment interface instead of directly processing
    setPaymentStep('payment')
    setShowPaymentInterface(true)
  }

  const processPayment = async () => {
    setIsProcessing(true)
    setPaymentStep('processing')

    try {

      // Process payment based on selected method
      if (paymentMethod === 'razorpay') {
        // Simulate Razorpay payment
        const paymentSuccess = await simulateRazorpayPayment()
        if (!paymentSuccess) {
          toast.error('Payment failed. Please try again.')
          setIsProcessing(false)
          setPaymentStep('payment')
          return
        }
        toast.success('Payment successful!')
      } else if (paymentMethod === 'upi') {
        // Simulate UPI payment
        const paymentSuccess = await simulateUPIPayment()
        if (!paymentSuccess) {
          toast.error('UPI payment failed. Please try again.')
          setIsProcessing(false)
          setPaymentStep('payment')
          return
        }
        toast.success('UPI payment successful!')
      } else if (paymentMethod === 'cod') {
        // COD - just validate and proceed
        if (!siteSettings.payment?.enableCOD) {
          toast.error('Cash on Delivery is not available')
          setIsProcessing(false)
          setPaymentStep('payment')
          return
        }
        toast.success('Order confirmed! You will pay on delivery.')
      } else {
        toast.error('Invalid payment method selected')
        setIsProcessing(false)
        setPaymentStep('payment')
        return
      }

      // Create order object
      const orderData = {
        id: Date.now(),
        orderNumber: 'ORD' + Date.now().toString().slice(-8),
        items: items,
        shippingInfo: shippingInfo,
        paymentMethod: paymentMethod,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total + (paymentMethod === 'cod' && siteSettings.payment?.enableCOD ? 25 : 0),
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }

      // Save order to localStorage (in real app, this would go to backend)
      const existingOrders = JSON.parse(localStorage.getItem('modernstore_orders') || '[]')
      existingOrders.push(orderData)
      localStorage.setItem('modernstore_orders', JSON.stringify(existingOrders))

      // Clear cart and redirect
      clearCart()
      toast.success('Order placed successfully!')
      router.push('/order-success?orderNumber=' + orderData.orderNumber)
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const simulateRazorpayPayment = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate payment processing time
      setTimeout(() => {
        // Simulate 90% success rate
        const success = Math.random() > 0.1
        resolve(success)
      }, 2000)
    })
  }

  const simulateUPIPayment = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate UPI payment processing time
      setTimeout(() => {
        // Simulate 85% success rate for UPI
        const success = Math.random() > 0.15
        resolve(success)
      }, 1500)
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order ({totalItems} items)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Shipping Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Shipping Information</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    name="address"
                    type="text"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    placeholder="Street address, apartment, suite, etc."
                    required
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    name="city"
                    type="text"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <select
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">PIN Code</label>
                  <input
                    name="pincode"
                    type="text"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Method</span>
              <span className="text-red-500">*</span>
            </h2>

            {!paymentMethod && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Please select a payment method to continue
                </p>
              </div>
            )}

            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === 'razorpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-muted-foreground">
                    Pay securely with Visa, Mastercard, RuPay, or other cards
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    MC
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">UPI Payment</div>
                  <div className="text-sm text-muted-foreground">
                    Pay using Google Pay, PhonePe, Paytm, or other UPI apps
                  </div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    UPI
                  </div>
                </div>
              </label>

              {siteSettings.payment?.enableCOD && (
                <label className="flex items-center space-x-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Pay when your order is delivered
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    +₹25 COD charges
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {siteSettings.gst?.enabled && (
                <div className="flex justify-between">
                  <span>Tax (GST {siteSettings.gst.rate}%)</span>
                  <span>₹{tax}</span>
                </div>
              )}
              {paymentMethod === 'cod' && siteSettings.payment?.enableCOD && (
                <div className="flex justify-between">
                  <span>COD Charges</span>
                  <span>₹25</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-semibold border-t border-border pt-3">
                <span>Total</span>
                <span>₹{total + (paymentMethod === 'cod' && siteSettings.payment?.enableCOD ? 25 : 0)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isProcessing ? 'Processing...' : `Place Order - ₹${total + (paymentMethod === 'cod' && siteSettings.payment?.enableCOD ? 25 : 0)}`}
            </button>

            {/* Security Badge */}
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure checkout with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Interface Modal */}
      {showPaymentInterface && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
            {paymentStep === 'payment' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Payment</h2>
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{total + (paymentMethod === 'cod' && siteSettings.payment?.enableCOD ? 25 : 0)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Payment Method: {paymentMethod === 'razorpay' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
                    </div>
                  </div>

                  {paymentMethod === 'razorpay' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                        <input
                          type="text"
                          placeholder="yourname@paytm"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Or scan QR code with any UPI app</p>
                        <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                          <span className="text-gray-500">QR Code</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-gray-700">You will pay ₹{total + 25} when your order is delivered.</p>
                      <p className="text-sm text-gray-500 mt-2">COD charges: ₹25</p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPaymentInterface(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={processPayment}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {paymentMethod === 'cod' ? 'Confirm Order' : 'Pay Now'}
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h3>
                <p className="text-gray-600">
                  {paymentMethod === 'razorpay' ? 'Processing your card payment...' :
                   paymentMethod === 'upi' ? 'Processing your UPI payment...' :
                   'Confirming your order...'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
