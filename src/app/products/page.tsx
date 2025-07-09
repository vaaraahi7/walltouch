'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star } from '@/lib/icons'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Smartphone Pro Max',
    slug: 'smartphone-pro-max',
    price: 79999,
    comparePrice: 89999,
    image: '/images/phone1.jpg',
    rating: 4.8,
    reviews: 124,
    category: 'Electronics',
    brand: 'TechBrand',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    price: 15999,
    comparePrice: 19999,
    image: '/images/headphones1.jpg',
    rating: 4.6,
    reviews: 89,
    category: 'Electronics',
    brand: 'AudioTech',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    slug: 'cotton-t-shirt',
    price: 899,
    comparePrice: 1299,
    image: '/images/tshirt1.jpg',
    rating: 4.4,
    reviews: 56,
    category: 'Clothing',
    brand: 'FashionCo',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Running Shoes',
    slug: 'running-shoes',
    price: 4999,
    comparePrice: 6999,
    image: '/images/shoes1.jpg',
    rating: 4.7,
    reviews: 78,
    category: 'Sports',
    brand: 'SportsBrand',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Smart Watch',
    slug: 'smart-watch',
    price: 12999,
    comparePrice: 15999,
    image: '/images/watch1.jpg',
    rating: 4.5,
    reviews: 92,
    category: 'Electronics',
    brand: 'TechBrand',
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Laptop Backpack',
    slug: 'laptop-backpack',
    price: 2499,
    comparePrice: 3499,
    image: '/images/backpack1.jpg',
    rating: 4.3,
    reviews: 34,
    category: 'Accessories',
    brand: 'TravelGear',
    inStock: false,
    featured: false
  },
]

const categories = ['All', 'Electronics', 'Clothing', 'Sports', 'Accessories']
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest First' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy])

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = (product: typeof mockProducts[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        comparePrice: product.comparePrice,
      })
      toast.success('Added to wishlist!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of quality products
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background text-sm font-medium hover:bg-accent"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex rounded-lg border border-input bg-background">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => {
          const discountPercentage = calculateDiscountPercentage(product.comparePrice, product.price)
          const inWishlist = isInWishlist(product.id)

          return (
            <div
              key={product.id}
              className={`group relative bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                viewMode === 'list' ? 'flex gap-6 p-6' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative bg-gradient-to-br from-muted to-muted/50 overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-48 rounded-lg flex-shrink-0' : 'aspect-square'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 opacity-50" />
                
                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center rounded-full bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}

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

                {/* Quick Add to Cart - Grid View Only */}
                {viewMode === 'grid' && product.inStock && (
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                <Link href={`/products/${product.slug}`} className="block">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                {/* List View Add to Cart */}
                {viewMode === 'list' && (
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">No products found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}
