'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet } from '@/lib/icons'
import { useCartStore } from '@/store/cart'
import { useAuthStore } from '@/store/auth'
import { formatPrice, calculateTax, calculateShipping, isValidEmail, isValidPhone, validateIndianPincode } from '@/lib/utils'
import { initiateRazorpayPayment, createRazorpayOrder, verifyPayment, formatAmountForRazorpay, generateReceiptId } from '@/lib/razorpay'
import toast from '@/lib/toast'

interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const { user } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })

  const subtotal = getTotalPrice()
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = subtotal + tax + shipping

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!shippingAddress.fullName.trim()) {
      toast.error('Full name is required')
      return false
    }
    
    if (!isValidEmail(shippingAddress.email)) {
      toast.error('Please enter a valid email address')
      return false
    }
    
    if (!isValidPhone(shippingAddress.phone)) {
      toast.error('Please enter a valid Indian phone number')
      return false
    }
    
    if (!shippingAddress.address.trim()) {
      toast.error('Address is required')
      return false
    }
    
    if (!shippingAddress.city.trim()) {
      toast.error('City is required')
      return false
    }
    
    if (!shippingAddress.state.trim()) {
      toast.error('State is required')
      return false
    }
    
    if (!validateIndianPincode(shippingAddress.postalCode)) {
      toast.error('Please enter a valid Indian postal code')
      return false
    }
    
    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Create order
      const orderData = {
        amount: formatAmountForRazorpay(total),
        currency: 'INR',
        receipt: generateReceiptId(),
        notes: {
          customer_name: shippingAddress.fullName,
          customer_email: shippingAddress.email,
          items_count: getTotalItems().toString()
        }
      }

      // For demo purposes, we'll simulate the payment process
      // In a real app, you would create the order on your backend
      toast.info('Initiating payment...')

      // Simulate payment success after 2 seconds
      setTimeout(() => {
        toast.success('Payment successful!')
        clearCart()
        router.push('/orders/success')
      }, 2000)

      // Real Razorpay integration would look like this:
      /*
      const order = await createRazorpayOrder(orderData)

      await initiateRazorpayPayment({
        amount: order.amount,
        currency: order.currency,
        name: 'ModernStore',
        description: `Order for ${getTotalItems()} items`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verified = await verifyPayment(response)
            if (verified) {
              toast.success('Payment successful!')
              clearCart()
              router.push('/orders/success')
            } else {
              toast.error('Payment verification failed')
            }
          } catch (error) {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: '#3b82f6',
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment cancelled')
          },
        },
      })
      */

    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Shipping Address */}
          <div className="bg-background rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter your address"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter your state"
                />
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter postal code"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  readOnly
                  className="w-full rounded-lg border border-input bg-muted px-3 py-2 text-sm text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-background rounded-2xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Cards</p>
                    <p className="text-sm text-muted-foreground">Credit/Debit Cards</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5" />
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-muted-foreground">Google Pay, PhonePe, etc.</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  paymentMethod === 'netbanking'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Net Banking</p>
                    <p className="text-sm text-muted-foreground">All major banks</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  paymentMethod === 'wallet'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Wallets</p>
                    <p className="text-sm text-muted-foreground">Paytm, Amazon Pay, etc.</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-background rounded-2xl border border-border p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-50 rounded-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Tax (18% GST)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </button>

            {/* Security Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
