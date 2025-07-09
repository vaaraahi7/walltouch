// Razorpay integration utilities

declare global {
  interface Window {
    Razorpay: any
  }
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  modal: {
    ondismiss: () => void
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface CreateOrderData {
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export interface OrderResponse {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
  created_at: number
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Create Razorpay order
export const createRazorpayOrder = async (orderData: CreateOrderData): Promise<OrderResponse> => {
  try {
    const response = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error('Failed to create order')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

// Verify payment
export const verifyPayment = async (paymentData: RazorpayResponse): Promise<boolean> => {
  try {
    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    if (!response.ok) {
      throw new Error('Payment verification failed')
    }

    const result = await response.json()
    return result.verified
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (options: Omit<RazorpayOptions, 'key'>): Promise<void> => {
  const scriptLoaded = await loadRazorpayScript()
  
  if (!scriptLoaded) {
    throw new Error('Failed to load Razorpay script')
  }

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  if (!razorpayKey) {
    throw new Error('Razorpay key not configured')
  }

  const razorpayOptions: RazorpayOptions = {
    ...options,
    key: razorpayKey,
  }

  const razorpay = new window.Razorpay(razorpayOptions)
  razorpay.open()
}

// Format amount for Razorpay (convert to paise)
export const formatAmountForRazorpay = (amount: number): number => {
  return Math.round(amount * 100)
}

// Format amount from Razorpay (convert from paise)
export const formatAmountFromRazorpay = (amount: number): number => {
  return amount / 100
}

// Generate receipt ID
export const generateReceiptId = (): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `receipt_${timestamp}_${random}`
}

// Payment methods supported by Razorpay in India
export const SUPPORTED_PAYMENT_METHODS = {
  card: 'Credit/Debit Cards',
  netbanking: 'Net Banking',
  wallet: 'Wallets',
  upi: 'UPI',
  emi: 'EMI',
  cardless_emi: 'Cardless EMI',
  paylater: 'Pay Later',
  bank_transfer: 'Bank Transfer',
  offline: 'Offline Payments',
}

// Popular UPI apps in India
export const UPI_APPS = [
  { name: 'Google Pay', id: 'googlepay' },
  { name: 'PhonePe', id: 'phonepe' },
  { name: 'Paytm', id: 'paytm' },
  { name: 'Amazon Pay', id: 'amazonpay' },
  { name: 'BHIM', id: 'bhim' },
  { name: 'WhatsApp Pay', id: 'whatsapp' },
]

// Popular banks for net banking
export const POPULAR_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IDFC First Bank',
]

// Error messages
export const PAYMENT_ERROR_MESSAGES = {
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  INVALID_AMOUNT: 'Invalid payment amount.',
  ORDER_CREATION_FAILED: 'Failed to create payment order.',
  VERIFICATION_FAILED: 'Payment verification failed.',
  SCRIPT_LOAD_FAILED: 'Failed to load payment gateway.',
  CANCELLED: 'Payment was cancelled.',
  TIMEOUT: 'Payment timed out. Please try again.',
}
