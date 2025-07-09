'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield, RotateCcw } from '@/lib/icons'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils'
import toast from '@/lib/toast'

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Smartphone Pro Max',
  slug: 'smartphone-pro-max',
  price: 79999,
  comparePrice: 89999,
  images: [
    '/images/phone1.jpg',
    '/images/phone2.jpg',
    '/images/phone3.jpg',
    '/images/phone4.jpg'
  ],
  description: 'Experience the future with our latest flagship smartphone. Featuring cutting-edge technology, premium design, and unmatched performance.',
  features: [
    '6.7-inch Super Retina XDR display',
    'A17 Pro chip with 6-core GPU',
    'Pro camera system with 48MP main camera',
    '128GB storage capacity',
    '5G connectivity',
    'Face ID for secure authentication',
    'All-day battery life',
    'iOS 17 with latest features'
  ],
  specifications: {
    'Display': '6.7-inch Super Retina XDR',
    'Processor': 'A17 Pro chip',
    'Storage': '128GB',
    'Camera': '48MP + 12MP + 12MP',
    'Battery': '4422 mAh',
    'OS': 'iOS 17',
    'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3',
    'Weight': '221g'
  },
  rating: 4.8,
  reviews: 124,
  category: 'Electronics',
  brand: 'TechBrand',
  inStock: true,
  stockCount: 15,
  sku: 'PHONE-001'
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(mockProduct)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const discountPercentage = calculateDiscountPercentage(product.comparePrice, product.price)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity
    })
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
        comparePrice: product.comparePrice,
      })
      toast.success('Added to wishlist!')
    }
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground">Home</Link></li>
          <li>/</li>
          <li><Link href="/products" className="hover:text-foreground">Products</Link></li>
          <li>/</li>
          <li><Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground">{product.category}</Link></li>
          <li>/</li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-50" />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 opacity-50" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice > product.price && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground">
                    -{discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity Selector */}
          {product.inStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-input rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="p-2 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                inWishlist
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
              {inWishlist ? 'Remove' : 'Wishlist'}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Warranty</p>
                <p className="text-xs text-muted-foreground">1 year warranty</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="border-t pt-12">
        <div className="flex border-b mb-8">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-border">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
              <div className="text-center py-12 text-muted-foreground">
                <p>Reviews feature coming soon!</p>
                <p className="text-sm mt-2">Be the first to review this product.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
