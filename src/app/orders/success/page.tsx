import Link from 'next/link'
import { CheckCircle, Package, Truck, Home } from '@/lib/icons'

export default function OrderSuccessPage() {
  // In a real app, you would get the order details from the URL params or API
  const orderNumber = 'ORD-20241225-1234'
  const estimatedDelivery = '3-5 business days'

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-background rounded-2xl border border-border p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold mb-2">Order Number</h3>
              <p className="text-muted-foreground">{orderNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Estimated Delivery</h3>
              <p className="text-muted-foreground">{estimatedDelivery}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Status</h3>
              <p className="text-green-600 font-medium">Paid</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Status</h3>
              <p className="text-blue-600 font-medium">Processing</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Package className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium mb-2">Order Processing</h3>
              <p className="text-sm text-muted-foreground">
                We're preparing your items for shipment
              </p>
            </div>
            <div>
              <Truck className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium mb-2">Shipped</h3>
              <p className="text-sm text-muted-foreground">
                You'll receive tracking information via email
              </p>
            </div>
            <div>
              <Home className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium mb-2">Delivered</h3>
              <p className="text-sm text-muted-foreground">
                Your order will arrive at your doorstep
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Order Details
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Need help with your order?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link href="/contact" className="text-primary hover:text-primary/80 transition-colors">
              Contact Support
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/faq" className="text-primary hover:text-primary/80 transition-colors">
              FAQ
            </Link>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <Link href="/returns" className="text-primary hover:text-primary/80 transition-colors">
              Returns & Exchanges
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
