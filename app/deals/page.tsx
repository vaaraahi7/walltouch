'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Percent, Clock, Star, ArrowRight } from '../../src/lib/icons'

// Set page title
if (typeof document !== 'undefined') {
  document.title = 'Special Deals & Offers - Wall Touch'
}

// This would normally come from your CMS/database
const getCMSContent = (pageId: string) => {
  const cmsPages = {
    'deals': {
      title: 'Special Deals & Offers',
      content: `# Special Deals & Offers

Discover amazing deals on premium wallpapers and blinds!

## Current Offers

### 🎉 New Year Special - 30% OFF
**Valid until January 31st, 2025**
- Get 30% off on all wallpapers
- Free installation on orders above ₹5,000
- Use code: NEWYEAR30

### 🏠 Home Makeover Package
**Complete room transformation**
- Wallpaper + Blinds combo
- 25% discount on total order
- Free design consultation
- Professional installation included

### 💝 Festive Collection
**Limited time offer**
- Premium festive designs
- Buy 2 Get 1 Free on selected patterns
- Free home delivery
- 1-year warranty

## Bulk Order Discounts

- **5-10 rolls:** 10% discount
- **11-20 rolls:** 15% discount
- **21+ rolls:** 20% discount

## Installation Services

- Free consultation and measurement
- Professional installation team
- Quality guarantee on all work
- Post-installation support`,
      metaTitle: 'Special Deals & Offers - Wall Touch',
      metaDescription: 'Get amazing deals on premium wallpapers and blinds. Limited time offers, bulk discounts, and special packages available.'
    }
  }
  return cmsPages[pageId as keyof typeof cmsPages] || null
}

export default function DealsPage() {
  const [cmsContent, setCmsContent] = useState<any>(null)

  useEffect(() => {
    const content = getCMSContent('deals')
    setCmsContent(content)
  }, [])
  // Show loading state while content loads
  if (!cmsContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading deals...</p>
        </div>
      </div>
    )
  }

  const deals = [
    {
      id: 1,
      title: "30% Off Premium Wallpapers",
      description: "New Year Special - Get amazing discounts on our premium wallpaper collection",
      discount: "30%",
      originalPrice: 150,
      salePrice: 105,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Wallpapers",
      validUntil: "2025-01-31",
      featured: true,
      code: "NEWYEAR30"
    },
    {
      id: 2,
      title: "Home Makeover Package",
      description: "Wallpaper + Blinds combo with 25% discount and free consultation",
      discount: "25%",
      originalPrice: 200,
      salePrice: 150,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Combo",
      validUntil: "2025-02-28",
      featured: true
    },
    {
      id: 3,
      title: "Buy 2 Get 1 Free",
      description: "Festive Collection - Premium designs with special warranty",
      discount: "33%",
      originalPrice: 180,
      salePrice: 120,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Festive",
      validUntil: "2025-01-15",
      featured: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{cmsContent.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals on premium wallpapers and blinds from Wall Touch!
          </p>
        </div>

        {/* CMS Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {cmsContent.content.replace(/^# .*$/gm, '').replace(/^## /gm, '').replace(/^### /gm, '').replace(/^- /gm, '• ').replace(/🎉|🏠|💝/g, '')}
            </div>
          </div>
        </div>

        {/* Featured Deals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Deals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {deals.filter(deal => deal.featured).map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {deal.discount} OFF
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-700">
                      {deal.category}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-gray-600 mb-4">{deal.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">₹{deal.salePrice}</span>
                      <span className="text-lg text-gray-500 line-through">₹{deal.originalPrice}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/products?category=${deal.category.toLowerCase()}`}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Deals */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {deal.discount} OFF
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{deal.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{deal.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">₹{deal.salePrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{deal.originalPrice}</span>
                    </div>
                  </div>
                  <Link
                    href={`/products?category=${deal.category.toLowerCase()}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center block"
                  >
                    Shop Deal
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="mb-6 opacity-90">
            Subscribe to our newsletter and be the first to know about exclusive offers and deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
