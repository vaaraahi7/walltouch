'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from '../../src/lib/icons'
import { useCartStore } from '../../src/store/cart'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const shipping = totalPrice > 500 ? 0 : 50
  const tax = Math.round(totalPrice * 0.18) // 18% GST
  const finalTotal = totalPrice + shipping + tax

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      toast.success('Item removed from cart')
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    toast.success(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-card border border-border rounded-lg p-4"
            >
              {/* Product Image */}
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{item.name}</h3>
                <p className="text-sm text-muted-foreground">₹{item.price} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="p-1 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  disabled={item.quantity >= (item.maxQuantity || 999)}
                  className="p-1 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.id, item.name)}
                className="p-2 text-destructive hover:text-destructive/80 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (GST 18%)</span>
                <span>₹{tax}</span>
              </div>
              
              {shipping === 0 && (
                <p className="text-sm text-green-600">
                  🎉 You saved ₹50 on shipping!
                </p>
              )}
              
              {totalPrice < 500 && (
                <p className="text-sm text-muted-foreground">
                  Add ₹{500 - totalPrice} more for free shipping
                </p>
              )}
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/checkout"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center block"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/products"
                className="w-full border border-input py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Security Badge */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="mt-8 pt-8 border-t border-border">
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  )
}
