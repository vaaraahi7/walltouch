'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, Eye, ArrowRight } from '../lib/icons'
import { useCartStore } from '../store/cart'
import { useWishlistStore } from '../store/wishlist'
import toast from 'react-hot-toast'

interface FeaturedProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  slug: string
}

interface CategoryFeatured {
  categoryId: string
  categoryName: string
  products: FeaturedProduct[]
}

export function FeaturedProducts() {
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()

  // This would normally come from your admin settings/database
  const [featuredCategories] = useState<CategoryFeatured[]>([
    {
      categoryId: 'wallpapers',
      categoryName: 'Featured Wallpapers',
      products: [
        {
          id: '1',
          name: 'Premium Floral Wallpaper',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
          category: 'wallpapers',
          description: 'Beautiful floral design perfect for living rooms',
          slug: 'premium-floral-wallpaper'
        },
        {
          id: '2',
          name: 'Modern Geometric Wallpaper',
          price: 1500,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
          category: 'wallpapers',
          description: 'Contemporary geometric patterns for modern homes',
          slug: 'modern-geometric-wallpaper'
        }
      ]
    },
    {
      categoryId: 'blinds',
      categoryName: 'Featured Blinds',
      products: [
        {
          id: '3',
          name: 'Venetian Blinds',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
          category: 'blinds',
          description: 'Classic venetian blinds for elegant window treatment',
          slug: 'venetian-blinds'
        },
        {
          id: '4',
          name: 'Roller Blinds',
          price: 2500,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
          category: 'blinds',
          description: 'Simple and functional roller blinds',
          slug: 'roller-blinds'
        }
      ]
    }
  ])

  const handleAddToCart = (product: FeaturedProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      quantity: 1
    })
    toast.success(`${product.name} added to cart!`)
  }

  const handleAddToWishlist = (product: FeaturedProduct) => {
    if (!isInWishlist(product.id)) {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug
      })
      toast.success(`${product.name} added to wishlist!`)
    } else {
      toast('Product already in wishlist')
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium wallpapers and blinds
          </p>
        </div>

        {featuredCategories.map((category) => (
          <div key={category.categoryId} className="mb-16 last:mb-0">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{category.categoryName}</h3>
              <Link
                href={`/products?category=${category.categoryId}`}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <span>View All</span>
                <Eye className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => handleAddToWishlist(product)}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            isInWishlist(product.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{product.price.toLocaleString()}
                        <span className="text-sm text-gray-500 font-normal ml-1">per sq ft</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
                      >
                        View Details
                      </Link>
                      {(product.category && (
                        product.category.toLowerCase().includes('wallpaper') ||
                        product.category.toLowerCase().includes('blind')
                      )) ? (
                        <Link
                          href={`/products/${product.slug}`}
                          className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ArrowRight className="h-4 w-4" />
                          <span>View Product</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action for Category */}
            <div className="mt-8 text-center">
              <Link
                href={`/products?category=${category.categoryId}`}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <span>Explore All {category.categoryName}</span>
                <Eye className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}

        {/* Overall CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Transform Your Space Today</h3>
            <p className="text-lg mb-6 opacity-90">
              Browse our complete collection of premium wallpapers and blinds
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products?category=wallpapers"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Wallpapers
              </Link>
              <Link
                href="/products?category=blinds"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
              >
                Shop Blinds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
