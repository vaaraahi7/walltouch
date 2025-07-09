'use client'

import { useState } from 'react'
import { Edit, Save, Eye, FileText, Image, Link as LinkIcon } from '../../lib/icons'

interface PageContent {
  id: string
  title: string
  slug: string
  content: string
  metaTitle: string
  metaDescription: string
  status: 'published' | 'draft'
  lastModified: string
}

export function CMSManagement() {
  const [selectedPage, setSelectedPage] = useState<string>('about')
  const [isEditing, setIsEditing] = useState(false)
  
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: 'about',
      title: 'About Us',
      slug: 'about',
      content: `# About Wall Touch

Welcome to Wall Touch, your premier destination for high-quality wallpapers and blinds in India.

## Our Story

Founded with a passion for transforming homes, Wall Touch has been serving customers across India with premium wallpapers and custom blinds since 2020. We believe that every home deserves to be beautiful, and we're here to make that vision a reality.

## Our Mission

To provide exceptional quality home decor products with outstanding customer service, making beautiful homes accessible to everyone.

## What We Offer

- **Premium Wallpapers**: From classic designs to modern patterns
- **Custom Blinds**: Venetian, roller, and vertical blinds
- **Expert Installation**: Professional installation services
- **Quality Guarantee**: 100% satisfaction guaranteed

## Why Choose Us?

- ✅ High-quality materials
- ✅ Expert craftsmanship
- ✅ Competitive pricing
- ✅ Fast delivery across India
- ✅ Professional installation
- ✅ Excellent customer support`,
      metaTitle: 'About Wall Touch - Premium Wallpapers & Blinds',
      metaDescription: 'Learn about Wall Touch, your trusted partner for premium wallpapers and custom blinds across India. Quality products, expert installation, exceptional service.',
      status: 'published',
      lastModified: new Date().toISOString()
    },
    {
      id: 'contact',
      title: 'Contact Us',
      slug: 'contact',
      content: `# Contact Wall Touch

Get in touch with us for all your wallpaper and blinds needs.

## Contact Information

**Address:**
Wall Touch Headquarters
123 Business District
Hyderabad, Telangana 500001
India

**Phone:** +91 9876543210
**Email:** info@walltouch.com
**WhatsApp:** +91 9876543210

## Business Hours

- **Monday - Saturday:** 9:00 AM - 7:00 PM
- **Sunday:** 10:00 AM - 6:00 PM

## Services Available

- Free home consultation
- Custom measurements
- Professional installation
- After-sales support
- Warranty services

## Service Areas

We provide services across major cities in India including:
- Hyderabad
- Mumbai
- Bangalore
- Chennai
- Delhi
- Pune
- And many more!

Contact us today for a free consultation and transform your home with our premium products.`,
      metaTitle: 'Contact ModernStore - Get in Touch for Wallpapers & Blinds',
      metaDescription: 'Contact ModernStore for premium wallpapers and blinds. Free consultation, expert installation, and exceptional service across India.',
      status: 'published',
      lastModified: new Date().toISOString()
    },
    {
      id: 'deals',
      title: 'Special Deals',
      slug: 'deals',
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

- **Free installation** on orders above ₹3,000
- **Express installation** available in major cities
- **Weekend installation** at no extra cost

## Terms & Conditions

- Offers cannot be combined with other promotions
- Installation charges may apply for remote locations
- Warranty terms apply as per product specifications
- Prices subject to change without notice

Contact us today to avail these amazing offers!`,
      metaTitle: 'Special Deals on Wallpapers & Blinds - ModernStore Offers',
      metaDescription: 'Discover amazing deals and offers on premium wallpapers and blinds at ModernStore. Limited time discounts, free installation, and more!',
      status: 'published',
      lastModified: new Date().toISOString()
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      slug: 'terms',
      content: `# Terms & Conditions

**Last updated: ${new Date().toLocaleDateString()}**

## 1. Acceptance of Terms
By accessing and using ModernStore's website and services, you accept and agree to be bound by the terms and provision of this agreement.

## 2. Products and Services
- All product descriptions, images, and specifications are provided for informational purposes
- We strive for accuracy but cannot guarantee that all information is error-free
- Colors may vary due to monitor settings and lighting conditions

## 3. Orders and Payment
- All orders are subject to acceptance and availability
- Payment is required at the time of order placement
- We accept UPI, credit/debit cards, and cash on delivery

## 4. Delivery and Installation
- Delivery times are estimates and may vary based on location
- Free delivery on orders above ₹3,000
- Professional installation available for additional charges

## 5. Returns and Refunds
- Returns accepted within 7 days of delivery
- Products must be in original condition and packaging
- Custom-made products are non-returnable

## 6. Warranty
- Wallpapers: 1 year against manufacturing defects
- Blinds: 2 years against manufacturing defects
- Installation warranty: 6 months

## 7. Contact Information
For questions about these Terms & Conditions:
- Email: legal@modernstore.com
- Phone: +91 9876543210`,
      metaTitle: 'Terms & Conditions - ModernStore',
      metaDescription: 'Read ModernStore terms and conditions for wallpapers and blinds. Learn about our policies, warranties, and service terms.',
      status: 'published',
      lastModified: new Date().toISOString()
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      slug: 'privacy',
      content: `# Privacy Policy

**Last updated: ${new Date().toLocaleDateString()}**

## 1. Information We Collect
- Name, email address, phone number
- Billing and shipping addresses
- Payment information (processed securely)
- Website usage patterns and preferences

## 2. How We Use Your Information
- Process and fulfill your orders
- Provide customer support and assistance
- Send promotional emails and newsletters
- Improve our products and services

## 3. Information Sharing
- Payment processors for secure transactions
- Delivery partners for order fulfillment
- Analytics services for website improvement

## 4. Data Security
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## 5. Your Rights
- Access your personal information
- Update or correct your data
- Delete your account and data
- Opt-out of marketing communications

## 6. Contact Us
For privacy-related questions:
- Email: privacy@modernstore.com
- Phone: +91 9876543210`,
      metaTitle: 'Privacy Policy - ModernStore',
      metaDescription: 'Learn how ModernStore protects your privacy and handles your personal information. Read our comprehensive privacy policy.',
      status: 'published',
      lastModified: new Date().toISOString()
    },
    {
      id: 'cookie',
      title: 'Cookie Policy',
      slug: 'cookie-policy',
      content: `# Cookie Policy

**Last updated: ${new Date().toLocaleDateString()}**

## What Are Cookies?
Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better browsing experience.

## Types of Cookies We Use

### Essential Cookies
- Required for website functionality
- Enable core features like security and accessibility
- Cannot be disabled

### Performance Cookies
- Collect anonymous usage statistics
- Help us understand how visitors use our site
- Used to improve website performance

### Marketing Cookies
- Track your browsing behavior
- Show relevant advertisements
- Measure advertising effectiveness

## Managing Cookies
You can control cookies through your browser settings or contact us directly.

## Contact Us
For questions about our Cookie Policy:
- Email: privacy@modernstore.com
- Phone: +91 9876543210`,
      metaTitle: 'Cookie Policy - ModernStore',
      metaDescription: 'Learn about how ModernStore uses cookies to improve your browsing experience. Manage your cookie preferences.',
      status: 'published',
      lastModified: new Date().toISOString()
    },
    {
      id: 'refund',
      title: 'Refund Policy',
      slug: 'refund-policy',
      content: `# Refund Policy

**Last updated: ${new Date().toLocaleDateString()}**

## 1. Return Eligibility
- Returns must be initiated within 7 days of delivery
- Items must be in original condition and packaging
- Custom-made products are non-returnable

## 2. Return Process
1. Contact our customer service team
2. Provide order number and reason for return
3. Receive return authorization and instructions
4. Ship items via authorized courier service

## 3. Refund Processing
- Inspection: 2-3 business days
- Refund processing: 5-7 business days
- Bank credit: 7-10 business days

## 4. Refund Amount
- Full product price for eligible returns
- Shipping charges non-refundable
- Installation charges non-refundable

## 5. Damaged or Defective Items
- Report damage within 24 hours of delivery
- Full refund or replacement for defective items
- Free re-installation for our errors

## 6. Contact Information
For refund-related queries:
- Email: refunds@walltouch.com
- Phone: +91 9876543210
- WhatsApp: +91 9876543210`,
      metaTitle: 'Refund Policy - Wall Touch',
      metaDescription: 'Learn about Wall Touch refund and return policy for wallpapers and blinds. Easy returns, quick refunds, and customer satisfaction guaranteed.',
      status: 'published',
      lastModified: new Date().toISOString()
    }
  ])

  const [editingContent, setEditingContent] = useState<PageContent | null>(null)

  const handleEditPage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId)
    if (page) {
      setEditingContent({ ...page })
      setIsEditing(true)
    }
  }

  const handleSavePage = () => {
    if (editingContent) {
      setPages(pages.map(page => 
        page.id === editingContent.id 
          ? { ...editingContent, lastModified: new Date().toISOString() }
          : page
      ))
      setIsEditing(false)
      setEditingContent(null)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingContent(null)
  }

  const currentPage = pages.find(p => p.id === selectedPage)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEditPage(selectedPage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Page</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Pages</h3>
            </div>
            <div className="p-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                    selectedPage === page.id
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      page.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border">
            {isEditing && editingContent ? (
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                    <input
                      type="text"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        title: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL Slug</label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">modernstore.com/</span>
                      <input
                        type="text"
                        value={editingContent.slug}
                        onChange={(e) => setEditingContent({
                          ...editingContent,
                          slug: e.target.value
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={editingContent.metaTitle}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        metaTitle: e.target.value
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="SEO title for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={editingContent.metaDescription}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        metaDescription: e.target.value
                      })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="SEO description for search engines"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      value={editingContent.content}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        content: e.target.value
                      })}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="Write your content in Markdown format..."
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      You can use Markdown formatting (# for headings, ** for bold, etc.)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editingContent.status}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        status: e.target.value as 'published' | 'draft'
                      })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : currentPage ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{currentPage.title}</h3>
                    <p className="text-sm text-gray-500">
                      Last modified: {new Date(currentPage.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/${currentPage.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </a>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      currentPage.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {currentPage.status}
                    </span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {currentPage.content}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">SEO Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-600">Meta Title:</span>
                      <p className="text-sm text-gray-900">{currentPage.metaTitle}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">Meta Description:</span>
                      <p className="text-sm text-gray-900">{currentPage.metaDescription}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-600">URL:</span>
                      <p className="text-sm text-blue-600">modernstore.com/{currentPage.slug}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
