'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Star, ArrowLeft } from '@/lib/icons'
import { useWishlistStore } from '@/store/wishlist'
import { useCartStore } from '@/store/cart'
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils'
import toast from '@/lib/toast'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id)
    toast.success('Removed from wishlist')
  }

  const handleAddToCart = (item: typeof items[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
    })
    toast.success('Added to cart!')
  }

  const handleMoveToCart = (item: typeof items[0]) => {
    handleAddToCart(item)
    handleRemoveFromWishlist(item.id)
    toast.success('Moved to cart!')
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast.success('Wishlist cleared')
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items you love to your wishlist and shop them later.
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        
        {items.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {items.map((item) => {
          const discountPercentage = item.comparePrice 
            ? calculateDiscountPercentage(item.comparePrice, item.price)
            : 0

          return (
            <div
              key={item.id}
              className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                    -{discountPercentage}%
                  </span>
                </div>
              )}

              {/* Remove from Wishlist */}
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-4 right-4 z-10 rounded-full p-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <Heart className="h-4 w-4 fill-current" />
              </button>

              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-50" />
                
                {/* Quick Actions */}
                <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <Link href={`/products/${item.slug}`} className="block">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(item.price)}
                  </span>
                  {item.comparePrice && item.comparePrice > item.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.comparePrice)}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue Shopping */}
      <div className="text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
