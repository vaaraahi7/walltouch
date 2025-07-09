'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from '@/lib/icons'
import { useCartStore } from '@/store/cart'
import { formatPrice, calculateTax, calculateShipping } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()

  const subtotal = getTotalPrice()
  const tax = calculateTax(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = subtotal + tax + shipping

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
    toast.success('Item removed from cart')
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-background rounded-2xl border border-border p-6">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex-shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-50" />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`} className="block">
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <p className="text-lg text-primary font-semibold mb-4">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center border border-input rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-accent transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem]">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-accent transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <div className="pt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-background rounded-2xl border border-border p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            {shipping === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-green-800">
                  🎉 You qualify for free shipping!
                </p>
              </div>
            )}

            {shipping > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-800">
                  Add {formatPrice(500 - subtotal)} more to qualify for free shipping
                </p>
              </div>
            )}

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors text-center block mb-4"
            >
              Proceed to Checkout
            </Link>

            {/* Payment Methods */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">We accept</p>
              <div className="flex justify-center gap-2">
                <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  UPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
