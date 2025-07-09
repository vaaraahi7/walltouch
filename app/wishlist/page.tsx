'use client'

import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, ArrowLeft } from '../../src/lib/icons'
import { useWishlistStore } from '../../src/store/wishlist'
import { useCartStore } from '../../src/store/cart'
import toast from 'react-hot-toast'

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getTotalItems } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const totalItems = getTotalItems()

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    toast.success(`${name} removed from wishlist`)
  }

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      slug: item.slug || item.name.toLowerCase().replace(/\s+/g, '-'),
      price: item.price,
      image: item.image,
      maxQuantity: 999
    })
    toast.success(`${item.name} added to cart!`)
  }

  const handleMoveToCart = (item: any) => {
    handleAddToCart(item)
    removeItem(item.id)
    toast.success(`${item.name} moved to cart!`)
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast.success('Wishlist cleared')
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items you love to your wishlist and shop them later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Start Shopping</span>
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
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        <button
          onClick={handleClearWishlist}
          className="text-destructive hover:text-destructive/80 text-sm font-medium transition-colors"
        >
          Clear Wishlist
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="group bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="aspect-square mb-4 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-lg"
              />
              
              {/* Remove from Wishlist */}
              <button
                onClick={() => handleRemoveItem(item.id, item.name)}
                className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                <p className="text-lg font-bold text-primary">₹{item.price}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Move to Cart</span>
                </button>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center justify-center space-x-2 border border-input py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>

          {items.length > 0 && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  items.forEach(item => handleAddToCart(item))
                  toast.success('All items added to cart!')
                }}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add All to Cart
              </button>
              
              <button
                onClick={() => {
                  items.forEach(item => handleMoveToCart(item))
                  toast.success('All items moved to cart!')
                }}
                className="border border-input px-6 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Move All to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Discover more products based on your wishlist
          </p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
