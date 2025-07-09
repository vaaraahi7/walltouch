'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Star, ArrowRight } from '../../lib/icons'
import { useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import toast from 'react-hot-toast'

export function FeaturedProducts() {
  const { products, categories, featuredProductSettings } = useGlobalStore()
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Sort products based on settings
  const sortProducts = (products: any[], sortBy: string) => {
    switch (sortBy) {
      case 'price_low':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price_high':
        return [...products].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...products].sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5))
      case 'newest':
        return [...products].sort((a, b) => b.id - a.id)
      case 'manual':
      default:
        return products
    }
  }

  // Get featured products by category using admin settings
  const getFeaturedByCategory = () => {
    const categoryProducts: { [key: string]: any[] } = {}

    // Get enabled settings that should show on homepage
    const enabledSettings = featuredProductSettings.filter(
      setting => setting.enabled && setting.showOnHomepage
    )

    enabledSettings.forEach(setting => {
      const category = categories.find(cat => cat.id === setting.categoryId)
      if (!category) return

      let categoryFeatured = products.filter(product =>
        product.category === category.name &&
        product.featured &&
        product.status === 'active'
      )

      // Sort products based on settings
      categoryFeatured = sortProducts(categoryFeatured, setting.sortBy)

      // Limit to max products from settings
      categoryFeatured = categoryFeatured.slice(0, setting.maxProducts)

      if (categoryFeatured.length > 0) {
        categoryProducts[category.name] = categoryFeatured
      }
    })

    return categoryProducts
  }

  const featuredByCategory = getFeaturedByCategory()

  // For backward compatibility with existing filter
  const featuredProducts = products.filter(product => product.featured && product.status === 'active')
  const filteredProducts = selectedCategory === 'all'
    ? featuredProducts
    : featuredProducts.filter(product => product.category === selectedCategory)
  const displayProducts = filteredProducts.slice(0, 6)

  // Check if we have any featured product settings configured
  const hasEnabledSettings = featuredProductSettings.some(
    setting => setting.enabled && setting.showOnHomepage
  )



  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    })
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = (product: any) => {
    const productId = product.id.toString()
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        comparePrice: product.price,
      })
      toast.success('Added to wishlist!')
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover our handpicked selection of the best products.
            Quality guaranteed with fast shipping across India.
          </p>

          {/* Category Filter */}
          <div className="flex justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-input bg-background rounded-lg text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories
                .filter(category =>
                  featuredProductSettings.some(setting =>
                    setting.categoryId === category.id &&
                    setting.enabled &&
                    setting.showOnHomepage
                  )
                )
                .map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.parentId ? '└ ' : ''}{category.name}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        {/* Products by Category */}
        {selectedCategory === 'all' ? (
          // Show products grouped by category
          <div className="space-y-16">
            {!hasEnabledSettings ? (
              // Fallback when no settings are configured
              <div className="text-center py-12">
                <div className="bg-blue-50 rounded-lg p-8 max-w-md mx-auto">
                  <Star className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Featured Products Configured
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Configure featured product settings in the admin panel to display products here.
                  </p>
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Go to Admin Panel
                  </Link>
                </div>
              </div>
            ) : (
              Object.entries(featuredByCategory).map(([categoryName, categoryProducts]) => (
              <div key={categoryName} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground">{categoryName}</h3>
                  <Link
                    href={`/products?category=${categoryName}`}
                    className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {categoryProducts.map((product) => {
                    const discountPercentage = 0
                    const inWishlist = isInWishlist(product.id.toString())

                    // Debug log to see product categories
                    console.log('Product category:', product.category, 'Product name:', product.name)

                    return (
                      <div
                        key={product.id}
                        className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                            Featured
                          </span>
                        </div>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                        >
                          <Heart className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                        </button>

                        {/* Product Image */}
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="p-6">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>

                          {/* Rating */}
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">(4.8)</span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                              <span className="text-sm text-muted-foreground">per sq ft</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2">
                            <Link
                              href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors text-center"
                            >
                              View Details
                            </Link>
                            {(product.category && (
                              product.category.toLowerCase().includes('wallpaper') ||
                              product.category.toLowerCase().includes('blind')
                            )) ? (
                              <Link
                                href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-1"
                              >
                                <ArrowRight className="h-4 w-4" />
                                <span>View Product</span>
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-1"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                <span>Add to Cart</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              ))
            )}
          </div>
        ) : (
          // Show filtered products in grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayProducts.length > 0 ? displayProducts.map((product) => {
            const discountPercentage = 0 // We'll add this later
            const inWishlist = isInWishlist(product.id.toString())

            return (
              <div
                key={product.id}
                className="group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Badge */}
                {product.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Featured
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}

                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-20" />
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`absolute top-4 right-4 z-10 rounded-full p-2 transition-colors ${
                      inWishlist
                        ? 'bg-destructive text-destructive-foreground'
                        : 'bg-background/80 text-muted-foreground hover:bg-background hover:text-destructive'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick Add to Cart / View Product */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {(product.customPricing && product.customPricing.type !== 'standard') ||
                     (product.category && (
                       product.category.toLowerCase().includes('wallpaper') ||
                       product.category.toLowerCase().includes('blind')
                     )) ? (
                      <Link
                        href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                        View Product
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <Link href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4 // Default rating of 4 stars
                              ? 'text-yellow-400 fill-current'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      4.5 (Reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">
                      ₹{product.price}
                    </span>

                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products available. Add products from the admin panel.</p>
            </div>
          )}
          </div>
        )}

        {/* View All Products Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
