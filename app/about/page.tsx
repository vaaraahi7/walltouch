'use client'

import { useState, useEffect } from 'react'
import { Shield, Truck, Award, Users, Heart, Star } from '../../src/lib/icons'
import { useGlobalStore } from '../../src/contexts/GlobalStoreContext'

// Set page title
if (typeof document !== 'undefined') {
  document.title = 'About Us - Wall Touch'
}

// This would normally come from your CMS/database
const getCMSContent = (pageId: string) => {
  // Mock CMS content that matches admin CMS
  const cmsPages = {
    'about': {
      title: 'About Wall Touch',
      content: `# About Wall Touch

Welcome to Wall Touch, your premier destination for high-quality wallpapers and blinds in India.

## Our Story

Founded with a passion for transforming homes, Wall Touch has been serving customers across India with premium wallpapers and custom blinds since 2020. We believe that every home deserves to be beautiful, and we're here to make that vision a reality.

## Our Mission

To provide exceptional quality home decor products with outstanding customer service, making beautiful homes accessible to everyone.

## What We Offer

- **Premium Wallpapers**: Custom designs, textures, and patterns
- **Window Blinds**: Regular, customized, and zebra blinds
- **Professional Installation**: Expert fitting and finishing
- **Custom Solutions**: Tailored to your specific needs

## Why Choose Wall Touch?

- ✅ High-quality materials
- ✅ Expert craftsmanship
- ✅ Competitive pricing
- ✅ Fast delivery across India
- ✅ Professional installation
- ✅ Excellent customer support`,
      metaTitle: 'About Wall Touch - Premium Wallpapers & Blinds',
      metaDescription: 'Learn about Wall Touch, your trusted partner for premium wallpapers and custom blinds across India. Quality products, expert installation, exceptional service.'
    }
  }
  return cmsPages[pageId as keyof typeof cmsPages] || null
}

export default function AboutPage() {
  const [cmsContent, setCmsContent] = useState<any>(null)

  const { cmsPages } = useGlobalStore()

  useEffect(() => {
    // Find about page content from CMS
    const aboutPage = cmsPages.find(page => page.slug === 'about' && page.status === 'published')
    if (aboutPage) {
      setCmsContent(aboutPage)
    } else {
      // Fallback to mock content
      const content = getCMSContent('about')
      setCmsContent(content)
    }
  }, [cmsPages])
  // Show loading state while content loads
  if (!cmsContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{cmsContent.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to Wall Touch, your premier destination for high-quality wallpapers and blinds in India.
          </p>
        </div>

        {/* CMS Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {cmsContent.content.replace(/^# .*$/gm, '').replace(/^## /gm, '').replace(/^- /gm, '• ').replace(/✅/g, '✓')}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded with a passion for transforming spaces, we have been serving customers across India with premium quality wallpapers and blinds. Our journey began in Hyderabad, and today we deliver nationwide.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that every home deserves to be beautiful and functional. That's why we carefully curate our collection to offer the finest products at competitive prices.
              </p>
              <p className="text-gray-600">
                From custom wallpapers to precision-cut blinds, we ensure every product meets our high standards of quality and craftsmanship.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Shield className="h-5 w-5 mr-3" />
                  Premium Quality Products
                </li>
                <li className="flex items-center">
                  <Truck className="h-5 w-5 mr-3" />
                  Fast Nationwide Delivery
                </li>
                <li className="flex items-center">
                  <Award className="h-5 w-5 mr-3" />
                  Expert Installation Services
                </li>
                <li className="flex items-center">
                  <Heart className="h-5 w-5 mr-3" />
                  Customer Satisfaction Guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
            <p className="text-gray-600">
              We source only the finest materials and work with trusted manufacturers to ensure every product meets our strict quality standards.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We provide personalized service, expert advice, and comprehensive support throughout your journey.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-600">
              We continuously innovate our processes and products to bring you the latest trends and technologies in home decoration.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-600 mb-6">
              We are committed to making your home beautiful, one wall at a time. Our team of experts is always ready to help you find the perfect solution for your space.
            </p>
            <div className="flex justify-center items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600">Rated 4.8/5 by our customers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
