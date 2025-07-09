'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, ArrowRight } from '../../src/lib/icons'
import { useCartStore } from '../../src/store/cart'
import { useWishlistStore } from '../../src/store/wishlist'
import { useGlobalStore } from '../../src/contexts/GlobalStoreContext'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const { products } = useGlobalStore()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const { addItem } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  useEffect(() => {
    let filtered = products.filter(product => product.status === 'active')

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return 4.5 - 4.5 // Default rating for now
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy, priceRange])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      quantity: 1
    })
    toast.success(`${product.name} added to cart!`)
  }

  const handleAddToWishlist = (product: any) => {
    addToWishlist({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      slug: product.name.toLowerCase().replace(/\s+/g, '-'),
      comparePrice: product.price
    })
    toast.success(`${product.name} added to wishlist!`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover our amazing collection of products
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 rounded-lg border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* View Mode and Results */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
            
            <div className="flex items-center space-x-1 border border-input rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Price Range Filter */}
        {isFilterOpen && (
          <div className="border border-border rounded-lg p-4 bg-muted/30">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={viewMode === 'grid' 
              ? "group rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
              : "flex items-center space-x-4 rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
            }
          >
            {/* Product Image */}
            <div className={viewMode === 'grid' ? "aspect-square mb-4" : "w-24 h-24 flex-shrink-0"}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className={viewMode === 'grid' ? "" : "flex-1"}>
              <Link
                href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-semibold hover:text-primary transition-colors"
              >
                {product.name}
              </Link>

              <p className={`text-muted-foreground text-sm ${viewMode === 'grid' ? 'mt-1 mb-2' : 'mt-1'}`}>
                {product.description && product.description.length > 100
                  ? `${product.description.substring(0, 100)}...`
                  : product.description || 'No description available'
                }
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
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
                <span className="text-sm text-muted-foreground ml-1">
                  (4.5)
                </span>
              </div>

              {/* Price and Actions */}
              <div className={`flex items-center ${viewMode === 'grid' ? 'justify-between' : 'space-x-4'}`}>
                <div>
                  <span className="text-lg font-bold">₹{product.price}</span>
                  {product.customPricing && product.customPricing.type !== 'standard' && (
                    <div className="text-xs text-muted-foreground">
                      {product.customPricing.type === 'regular-wallpaper' && 'per roll'}
                      {(product.customPricing.type === 'wallpaper' || product.customPricing.type === 'blinds') && 'per sq ft'}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className={`p-2 rounded-lg border transition-colors ${
                      isInWishlist(product.id.toString())
                        ? 'bg-destructive text-destructive-foreground'
                        : 'border-input hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>

                  {product.customPricing && product.customPricing.type !== 'standard' ? (
                    <Link
                      href={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="text-sm">View Product</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center space-x-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="text-sm">Add to Cart</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setPriceRange([0, 10000])
            }}
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
