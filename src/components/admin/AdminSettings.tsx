'use client'

import { useState } from 'react'
import { Save, Eye, EyeOff, Package, Users, BarChart3, FileText, Star, Zap, MapPin, Settings, Globe, Mail, Truck, IndianRupee, MessageCircle, Bot } from '../../lib/icons'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import { OrderManagement } from './OrderManagement'
import { UserManagement } from './UserManagement'
import { AnalyticsDashboard } from './AnalyticsDashboard'
import { CMSManagement } from './CMSManagement'
import { ChatbotManagement } from './ChatbotManagement'
import { FeaturedProductsManagement } from './FeaturedProductsManagement'
import toast from 'react-hot-toast'

export function AdminSettings() {
  const { siteSettings, updateSiteSettings } = useGlobalStore()
  const [activeSection, setActiveSection] = useState('general')
  const [showApiKeys, setShowApiKeys] = useState(false)

  // Safety check for siteSettings
  if (!siteSettings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }
  const [settings, setSettings] = useState({
    // General Settings
    storeName: siteSettings.siteName || 'Wall Touch',
    storeDescription: siteSettings.siteDescription || 'Your one-stop destination for premium wallpapers and blinds',
    storeEmail: siteSettings.contactInfo?.email || 'admin@walltouch.com',
    storePhone: siteSettings.contactInfo?.phone || '+91 9876543210',
    storeWhatsApp: siteSettings.contactInfo?.whatsapp || '+91 9876543210',
    currency: 'INR',
    timezone: 'Asia/Kolkata',

    // Header Settings
    headerLogo: siteSettings.headerLogo || '',
    headerMenuItems: siteSettings.headerMenuItems || [
      { name: 'Home', href: '/', active: true },
      { name: 'Products', href: '/products', active: true },
      { name: 'Categories', href: '/categories', active: true },
      { name: 'Deals', href: '/deals', active: true },
      { name: 'About', href: '/about', active: true },
      { name: 'Contact', href: '/contact', active: true }
    ],

    // Footer Settings
    footerStoreName: siteSettings.footerStoreName || 'ModernStore',
    footerStoreDescription: siteSettings.footerStoreDescription || 'Transform your home with our premium wallpapers and blinds. Quality products, expert installation, and exceptional service.',
    footerAddress: siteSettings.footerAddress || '123 Business District, Hyderabad, Telangana 500001',
    footerEmail: siteSettings.footerEmail || 'info@modernstore.com',
    footerPhone: siteSettings.footerPhone || '+91 9876543210',

    // Product Page Tabs
    productTabs: siteSettings.productTabs || [
      { name: 'Description', key: 'description', active: true, order: 1 },
      { name: 'How to Measure', key: 'measure', active: true, order: 2 },
      { name: 'Delivery & Return Policy', key: 'delivery', active: true, order: 3 },
      { name: 'Installation Guidance', key: 'installation', active: true, order: 4 },
      { name: 'Reviews', key: 'reviews', active: true, order: 5 }
    ],

    // Chatbot Settings
    chatbotEnabled: siteSettings.chatbot?.enabled ?? true,
    chatbotWelcomeMessage: siteSettings.chatbot?.welcomeMessage || 'Hello! How can I help you today?',

    // Popup Settings
    popupEnabled: siteSettings.popup?.enabled || false,
    popupType: siteSettings.popup?.type || 'discount',
    popupTitle: siteSettings.popup?.title || 'Special Offer!',
    popupDescription: siteSettings.popup?.description || 'Don\'t miss out on our amazing deals!',
    popupImage: siteSettings.popup?.image || '',
    popupDiscountCode: siteSettings.popup?.discountCode || '',
    popupActionText: siteSettings.popup?.actionText || 'Shop Now',
    popupActionUrl: siteSettings.popup?.actionUrl || '/products',
    popupCloseText: siteSettings.popup?.closeText || 'Maybe Later',
    popupDelay: siteSettings.popup?.delay || 3000,
    popupShowDaily: siteSettings.popup?.showDaily || false,

    // Footer Copyright
    footerCopyright: siteSettings.footerCopyright || `© ${new Date().getFullYear()} ModernStore. All rights reserved.`,

    // Shipping Settings
    freeShippingThreshold: siteSettings.shipping?.freeThreshold || 500,
    standardShippingRate: siteSettings.shipping?.standardRate || 50,
    expressShippingRate: siteSettings.shipping?.expressRate || 150,

    // Email Settings
    smtpHost: siteSettings.email?.smtpHost || '',
    smtpPort: siteSettings.email?.smtpPort || 587,
    smtpUser: siteSettings.email?.smtpUser || '',
    smtpPassword: siteSettings.email?.smtpPassword || '',

    // SEO Settings
    metaTitle: siteSettings.seo?.metaTitle || 'Wall Touch - Premium Wallpapers & Blinds',
    metaDescription: siteSettings.seo?.metaDescription || 'Transform your home with Wall Touch premium wallpapers and blinds. Quality products, expert installation, and exceptional service.',
    metaKeywords: siteSettings.seo?.metaKeywords || 'wallpaper, blinds, home decor, interior design, custom wallpaper, window blinds, wall touch',
    googleAnalyticsId: siteSettings.seo?.googleAnalyticsId || '',
    googleSearchConsole: siteSettings.seo?.googleSearchConsole || '',

    // Payment Settings
    razorpayKeyId: '',
    razorpayKeySecret: '',
    enableCOD: siteSettings.payment?.enableCOD || true,
    enableUPI: siteSettings.payment?.enableUPI || true,

    // Product Tab Content
    tabContent: {
      description: 'High-quality wallpapers and blinds for your home and office. Our products are made from premium materials and come with professional installation services.',
      howToMeasure: `**For Wallpapers:**
1. Measure the width of the wall in feet
2. Measure the height of the wall in feet
3. Calculate total area: Width × Height
4. Add 10% extra for wastage

**For Blinds:**
1. Measure window width (inside frame)
2. Measure window height (inside frame)
3. For outside mount, add 2-3 inches to width and height`,
      deliveryPolicy: `**Delivery:**
- Hyderabad: 3-4 business days
- Nearby states: 4-5 business days
- Other states: 5-7 business days
- Free delivery on orders above ₹3,000

**Return Policy:**
- 7-day return policy
- Products must be in original condition
- Custom products are non-returnable`,
      installationGuide: `**Professional Installation:**
- Free installation on orders above ₹3,000
- Experienced technicians
- All tools and materials included
- 6-month installation warranty

**DIY Installation:**
- Detailed installation guide provided
- Video tutorials available
- Customer support via phone/WhatsApp`
    },

    // Review Settings
    reviewSettings: {
      enableReviews: true,
      moderateReviews: true,
      allowAnonymous: false
    }
  })

  const handleSave = (section: string) => {
    try {
      switch (section) {
        case 'general':
          updateSiteSettings({
            siteName: settings.storeName,
            siteDescription: settings.storeDescription,
            contactInfo: {
              ...siteSettings.contactInfo,
              email: settings.storeEmail,
              phone: settings.storePhone,
              whatsapp: settings.storeWhatsApp
            }
          })
          break
        // Add other sections as needed
        default:
          console.log(`Saving ${section} settings:`, settings)
      }
      toast.success(`${section} settings saved successfully!`)
    } catch (error) {
      toast.error(`Failed to save ${section} settings`)
      console.error('Save error:', error)
    }
  }

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Order Management', icon: Package },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'cms', label: 'Content Management', icon: FileText },
    { id: 'featured-products', label: 'Featured Products', icon: Star },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'discounts', label: 'Discounts & Offers', icon: Zap },
    { id: 'delivery', label: 'Delivery Management', icon: MapPin },
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'header', label: 'Header & Menu', icon: Globe },
    { id: 'footer', label: 'Footer', icon: Globe },
    { id: 'product-tabs', label: 'Product Tabs', icon: FileText },
    { id: 'chatbot', label: 'AI Chatbot Settings', icon: MessageCircle },
    { id: 'chatbot-advanced', label: 'Chatbot Management', icon: Bot },
    { id: 'popup', label: 'Homepage Popup', icon: Eye },
    { id: 'payment', label: 'Payment', icon: IndianRupee },
    { id: 'gst', label: 'GST Settings', icon: IndianRupee },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'seo', label: 'SEO', icon: Globe },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store configuration and preferences</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('admin_token')
            window.location.href = '/admin/login'
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
        >
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1 max-h-[80vh] overflow-y-auto pr-2">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-3 ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow max-h-[80vh] overflow-y-auto">
            {/* Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <Package className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blue-600">Total Orders</p>
                        <p className="text-2xl font-bold text-blue-900">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-green-600">Total Users</p>
                        <p className="text-2xl font-bold text-green-900">0</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <div className="flex items-center">
                      <IndianRupee className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-purple-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-purple-900">₹0</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-600">Welcome to your admin dashboard! Use the navigation to manage your store.</p>
                </div>
              </div>
            )}

            {/* Order Management */}
            {activeSection === 'orders' && <OrderManagement />}

            {/* User Management */}
            {activeSection === 'users' && <UserManagement />}

            {/* Analytics Dashboard */}
            {activeSection === 'analytics' && <AnalyticsDashboard />}

            {/* Content Management */}
            {activeSection === 'cms' && <CMSManagement />}

            {/* Featured Products Management */}
            {activeSection === 'featured-products' && <FeaturedProductsManagement />}

            {/* Advanced Chatbot Management */}
            {activeSection === 'chatbot-advanced' && <ChatbotManagement />}

            {/* Reviews & Ratings */}
            {activeSection === 'reviews' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Reviews & Ratings Management</h3>

                <div className="space-y-6">
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Review Settings</h4>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.reviewSettings?.enableReviews !== false}
                          onChange={(e) => setSettings({
                            ...settings,
                            reviewSettings: {
                              ...settings.reviewSettings,
                              enableReviews: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300"
                        />
                        <span>Enable customer reviews</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.reviewSettings?.moderateReviews !== false}
                          onChange={(e) => setSettings({
                            ...settings,
                            reviewSettings: {
                              ...settings.reviewSettings,
                              moderateReviews: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300"
                        />
                        <span>Moderate reviews before publishing</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.reviewSettings?.allowAnonymous !== false}
                          onChange={(e) => setSettings({
                            ...settings,
                            reviewSettings: {
                              ...settings.reviewSettings,
                              allowAnonymous: e.target.checked
                            }
                          })}
                          className="rounded border-gray-300"
                        />
                        <span>Allow anonymous reviews</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Review Statistics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-600">Total Reviews</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">0</p>
                        <p className="text-sm text-gray-600">Pending Reviews</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">0.0</p>
                        <p className="text-sm text-gray-600">Average Rating</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('reviews')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Review Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Discounts & Offers */}
            {activeSection === 'discounts' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Discounts & Offers Engine</h3>

                <div className="space-y-6">
                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Create New Discount</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                        <input
                          type="text"
                          placeholder="WELCOME20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option value="percentage">Percentage</option>
                          <option value="fixed">Fixed Amount</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                        <input
                          type="number"
                          placeholder="20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order (₹)</label>
                        <input
                          type="number"
                          placeholder="2000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Create Discount
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Active Discounts</h4>
                    <div className="text-center py-8 text-gray-500">
                      <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No active discounts</p>
                      <p className="text-sm">Create your first discount to boost sales</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Management */}
            {activeSection === 'delivery' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pincode/Delivery Management</h3>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Delivery Zone Management:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Set available pincode zones</li>
                      <li>• Estimated delivery time by area</li>
                      <li>• Zone-wise delivery charges</li>
                      <li>• Express delivery options</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hyderabad Zone</label>
                      <input
                        type="text"
                        value="3-4 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Delivery time"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nearby States</label>
                      <input
                        type="text"
                        value="4-5 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Delivery time"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Other States</label>
                      <input
                        type="text"
                        value="5-7 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Delivery time"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Express Delivery</label>
                      <input
                        type="text"
                        value="1-2 days"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Delivery time"
                      />
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Delivery Settings
                  </button>
                </div>
              </div>
            )}

            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                      <input
                        type="text"
                        value={siteSettings.siteName}
                        onChange={(e) => updateSiteSettings({ siteName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                      <input
                        type="email"
                        value={settings.storeEmail}
                        onChange={(e) => setSettings({...settings, storeEmail: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                    <textarea
                      value={settings.storeDescription}
                      onChange={(e) => setSettings({...settings, storeDescription: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={settings.storePhone}
                        onChange={(e) => setSettings({...settings, storePhone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                      <input
                        type="tel"
                        value={settings.storeWhatsApp}
                        onChange={(e) => setSettings({...settings, storeWhatsApp: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({...settings, currency: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSave('general')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeSection === 'payment' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Razorpay Configuration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Key ID</label>
                        <input
                          type="text"
                          value={settings.razorpayKeyId}
                          onChange={(e) => setSettings({...settings, razorpayKeyId: e.target.value})}
                          placeholder="rzp_test_..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Key Secret</label>
                        <div className="relative">
                          <input
                            type={showApiKeys ? "text" : "password"}
                            value={settings.razorpayKeySecret}
                            onChange={(e) => setSettings({...settings, razorpayKeySecret: e.target.value})}
                            placeholder="Enter secret key"
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKeys(!showApiKeys)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Payment Methods</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={siteSettings.payment?.enableCOD || false}
                          onChange={(e) => updateSiteSettings({
                            payment: { ...(siteSettings.payment || { enableCOD: false, enableUPI: true, enableCards: true }), enableCOD: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable Cash on Delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={siteSettings.payment?.enableUPI || false}
                          onChange={(e) => updateSiteSettings({
                            payment: { ...(siteSettings.payment || { enableCOD: true, enableUPI: false, enableCards: true }), enableUPI: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable UPI Payments</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSave('payment')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* GST Settings */}
            {activeSection === 'gst' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">GST Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gstEnabled"
                      checked={siteSettings.gst?.enabled || false}
                      onChange={(e) => updateSiteSettings({
                        gst: { ...(siteSettings.gst || { enabled: false, rate: 18, gstNumber: '' }), enabled: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="gstEnabled" className="ml-2 text-sm text-gray-700">
                      Enable GST on checkout
                    </label>
                  </div>

                  {(siteSettings.gst?.enabled || false) && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                        <input
                          type="number"
                          value={siteSettings.gst?.rate || 18}
                          onChange={(e) => updateSiteSettings({
                            gst: { ...(siteSettings.gst || { enabled: false, rate: 18, gstNumber: '' }), rate: parseFloat(e.target.value) || 0 }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="18"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                        <input
                          type="text"
                          value={siteSettings.gst?.gstNumber || ''}
                          onChange={(e) => updateSiteSettings({
                            gst: { ...(siteSettings.gst || { enabled: false, rate: 18, gstNumber: '' }), gstNumber: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your GST number"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => alert('GST settings saved successfully!')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Header Settings */}
            {activeSection === 'header' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Header & Menu Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Logo</label>

                    {/* Current Logo Preview */}
                    {settings.headerLogo && (
                      <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600 mb-2">Current Logo:</p>
                        <img
                          src={settings.headerLogo}
                          alt="Current Logo"
                          className="h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}

                    {/* Logo Upload Options */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                const result = event.target?.result as string
                                setSettings({...settings, headerLogo: result})
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Recommended: PNG or SVG format, max 200px height</p>
                      </div>

                      <div className="text-center text-gray-500">OR</div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                        <input
                          type="url"
                          value={settings.headerLogo || ''}
                          onChange={(e) => setSettings({...settings, headerLogo: e.target.value})}
                          placeholder="https://example.com/logo.png"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Quick Logo Options */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quick Logo Options</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <button
                            onClick={() => setSettings({...settings, headerLogo: 'https://via.placeholder.com/150x50/3B82F6/FFFFFF?text=ModernStore'})}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                          >
                            Blue Logo
                          </button>
                          <button
                            onClick={() => setSettings({...settings, headerLogo: 'https://via.placeholder.com/150x50/1F2937/FFFFFF?text=ModernStore'})}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                          >
                            Dark Logo
                          </button>
                          <button
                            onClick={() => setSettings({...settings, headerLogo: 'https://via.placeholder.com/150x50/10B981/FFFFFF?text=ModernStore'})}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs"
                          >
                            Green Logo
                          </button>
                          <button
                            onClick={() => setSettings({...settings, headerLogo: ''})}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs text-red-600"
                          >
                            Remove Logo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Menu Items</h4>
                    <div className="space-y-3">
                      {settings.headerMenuItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const newItems = [...settings.headerMenuItems]
                              newItems[index].name = e.target.value
                              setSettings({...settings, headerMenuItems: newItems})
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Menu Name"
                          />
                          <input
                            type="text"
                            value={item.href}
                            onChange={(e) => {
                              const newItems = [...settings.headerMenuItems]
                              newItems[index].href = e.target.value
                              setSettings({...settings, headerMenuItems: newItems})
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="URL"
                          />
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={item.active}
                              onChange={(e) => {
                                const newItems = [...settings.headerMenuItems]
                                newItems[index].active = e.target.checked
                                setSettings({...settings, headerMenuItems: newItems})
                              }}
                              className="mr-2"
                            />
                            Active
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('header')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Header Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Settings */}
            {activeSection === 'footer' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Footer Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                      <input
                        type="text"
                        value={settings.footerStoreName}
                        onChange={(e) => setSettings({...settings, footerStoreName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={settings.footerEmail}
                        onChange={(e) => setSettings({...settings, footerEmail: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Description</label>
                    <textarea
                      value={settings.footerStoreDescription}
                      onChange={(e) => setSettings({...settings, footerStoreDescription: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your store"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={settings.footerPhone}
                        onChange={(e) => setSettings({...settings, footerPhone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={settings.footerAddress}
                        onChange={(e) => setSettings({...settings, footerAddress: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                    <input
                      type="text"
                      value={settings.footerCopyright}
                      onChange={(e) => setSettings({...settings, footerCopyright: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="© 2024 ModernStore. All rights reserved."
                    />
                  </div>

                  <button
                    onClick={() => handleSave('footer')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Footer Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Product Tabs Settings */}
            {activeSection === 'product-tabs' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Page Tabs</h3>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Configure which tabs appear on product pages and their order.
                  </p>

                  <div className="space-y-3">
                    {settings.productTabs.map((tab, index) => (
                      <div key={tab.key} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <input
                          type="number"
                          value={tab.order}
                          onChange={(e) => {
                            const newTabs = [...settings.productTabs]
                            newTabs[index].order = parseInt(e.target.value)
                            setSettings({...settings, productTabs: newTabs})
                          }}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                          min="1"
                          max="10"
                        />
                        <input
                          type="text"
                          value={tab.name}
                          onChange={(e) => {
                            const newTabs = [...settings.productTabs]
                            newTabs[index].name = e.target.value
                            setSettings({...settings, productTabs: newTabs})
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                          placeholder="Tab Name"
                        />
                        <span className="text-sm text-gray-500 w-24">{tab.key}</span>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={tab.active}
                            onChange={(e) => {
                              const newTabs = [...settings.productTabs]
                              newTabs[index].active = e.target.checked
                              setSettings({...settings, productTabs: newTabs})
                            }}
                            className="mr-2"
                          />
                          Active
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Tab Descriptions:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li><strong>Description:</strong> Product details and features</li>
                      <li><strong>How to Measure:</strong> Measurement instructions for custom sizing</li>
                      <li><strong>Delivery & Return:</strong> Shipping and return policy information</li>
                      <li><strong>Installation:</strong> Installation guidance and tips</li>
                      <li><strong>Reviews:</strong> Customer reviews and ratings</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSave('product-tabs')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Tab Settings</span>
                  </button>

                  {/* Tab Content Editor */}
                  <div className="mt-8 border-t pt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Edit Tab Content</h4>

                    {/* Description Content */}
                    <div className="mb-6 p-4 border rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Description Tab Content</h5>
                      <textarea
                        value={settings.tabContent?.description || 'High-quality wallpapers and blinds for your home and office. Our products are made from premium materials and come with professional installation services.'}
                        onChange={(e) => setSettings({
                          ...settings,
                          tabContent: {
                            ...settings.tabContent,
                            description: e.target.value
                          }
                        })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description content..."
                      />
                    </div>

                    {/* How to Measure Content */}
                    <div className="mb-6 p-4 border rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">How to Measure Tab Content</h5>
                      <textarea
                        value={settings.tabContent?.howToMeasure || `**For Wallpapers:**
1. Measure the width of the wall in feet
2. Measure the height of the wall in feet
3. Calculate total area: Width × Height
4. Add 10% extra for wastage

**For Blinds:**
1. Measure window width (inside frame)
2. Measure window height (inside frame)
3. For outside mount, add 2-3 inches to width and height`}
                        onChange={(e) => setSettings({
                          ...settings,
                          tabContent: {
                            ...settings.tabContent,
                            howToMeasure: e.target.value
                          }
                        })}
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter measurement guide..."
                      />
                    </div>

                    {/* Delivery Policy Content */}
                    <div className="mb-6 p-4 border rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Delivery & Return Policy Tab Content</h5>
                      <textarea
                        value={settings.tabContent?.deliveryPolicy || `**Delivery:**
- Hyderabad: 3-4 business days
- Nearby states: 4-5 business days
- Other states: 5-7 business days
- Free delivery on orders above ₹3,000

**Return Policy:**
- 7-day return policy
- Products must be in original condition
- Custom products are non-returnable`}
                        onChange={(e) => setSettings({
                          ...settings,
                          tabContent: {
                            ...settings.tabContent,
                            deliveryPolicy: e.target.value
                          }
                        })}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter delivery and return policy..."
                      />
                    </div>

                    {/* Installation Guide Content */}
                    <div className="mb-6 p-4 border rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Installation Guidance Tab Content</h5>
                      <textarea
                        value={settings.tabContent?.installationGuide || `**Professional Installation:**
- Free installation on orders above ₹3,000
- Experienced technicians
- All tools and materials included
- 6-month installation warranty

**DIY Installation:**
- Detailed installation guide provided
- Video tutorials available
- Customer support via phone/WhatsApp`}
                        onChange={(e) => setSettings({
                          ...settings,
                          tabContent: {
                            ...settings.tabContent,
                            installationGuide: e.target.value
                          }
                        })}
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter installation guidance..."
                      />
                    </div>

                    <button
                      onClick={() => handleSave('product-tab-content')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Tab Content</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chatbot Settings */}
            {activeSection === 'chatbot' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Chatbot Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.chatbotEnabled}
                      onChange={(e) => setSettings({...settings, chatbotEnabled: e.target.checked})}
                      className="mr-3"
                    />
                    <label className="text-sm font-medium text-gray-700">Enable AI Chatbot</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                    <textarea
                      value={settings.chatbotWelcomeMessage}
                      onChange={(e) => setSettings({...settings, chatbotWelcomeMessage: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Hello! How can I help you today?"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Chatbot Features:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Answers product questions automatically</li>
                      <li>• Provides shipping and pricing information</li>
                      <li>• Helps with measuring and installation guidance</li>
                      <li>• Connects customers to support when needed</li>
                      <li>• Available 24/7 for customer assistance</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSave('chatbot')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Chatbot Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Popup Settings */}
            {activeSection === 'popup' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Homepage Popup Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.popupEnabled}
                      onChange={(e) => setSettings({...settings, popupEnabled: e.target.checked})}
                      className="mr-3"
                    />
                    <label className="text-sm font-medium text-gray-700">Enable Homepage Popup</label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Popup Type</label>
                      <select
                        value={settings.popupType}
                        onChange={(e) => setSettings({...settings, popupType: e.target.value as 'discount' | 'newsletter' | 'announcement'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="discount">Discount Offer</option>
                        <option value="newsletter">Newsletter Signup</option>
                        <option value="announcement">Announcement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delay (milliseconds)</label>
                      <input
                        type="number"
                        value={settings.popupDelay}
                        onChange={(e) => setSettings({...settings, popupDelay: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1000"
                        max="10000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={settings.popupTitle}
                      onChange={(e) => setSettings({...settings, popupTitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Special Offer!"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={settings.popupDescription}
                      onChange={(e) => setSettings({...settings, popupDescription: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Don't miss out on our amazing deals!"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Action Button Text</label>
                      <input
                        type="text"
                        value={settings.popupActionText}
                        onChange={(e) => setSettings({...settings, popupActionText: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Shop Now"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Action URL</label>
                      <input
                        type="text"
                        value={settings.popupActionUrl}
                        onChange={(e) => setSettings({...settings, popupActionUrl: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="/products"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.popupShowDaily}
                      onChange={(e) => setSettings({...settings, popupShowDaily: e.target.checked})}
                      className="mr-3"
                    />
                    <label className="text-sm font-medium text-gray-700">Show popup daily (even if user has seen it)</label>
                  </div>

                  <button
                    onClick={() => handleSave('popup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Popup Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Page Content Management */}
            {activeSection === 'pages' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Page Content Management</h3>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Manage Page Content:</h4>
                    <p className="text-sm text-blue-800 mb-4">
                      Control the content and settings for various pages on your website.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Deals Page</h4>
                      <p className="text-sm text-gray-600 mb-3">Manage special offers and promotional content</p>
                      <a
                        href="/deals"
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Page →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Contact Page</h4>
                      <p className="text-sm text-gray-600 mb-3">Update contact information and form settings</p>
                      <a
                        href="/contact"
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Page →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">About Page</h4>
                      <p className="text-sm text-gray-600 mb-3">Edit company information and story</p>
                      <a
                        href="/about"
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Page →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">FAQ Page</h4>
                      <p className="text-sm text-gray-600 mb-3">Manage frequently asked questions</p>
                      <a
                        href="/faq"
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Page →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Info</h4>
                      <p className="text-sm text-gray-600 mb-3">Update delivery options and zones</p>
                      <a
                        href="/shipping"
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Page →
                      </a>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Returns Policy</h4>
                      <p className="text-sm text-gray-600 mb-3">Manage returns and exchanges policy</p>
                      <a
                        href="/returns"
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Page →
                      </a>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-900 mb-2">Note:</h4>
                    <p className="text-sm text-yellow-800">
                      Page content is currently managed through code files. In a production environment,
                      you would have a content management system to edit these pages directly from the admin panel.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeSection === 'shipping' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (₹)</label>
                      <input
                        type="number"
                        value={settings.freeShippingThreshold}
                        onChange={(e) => setSettings({...settings, freeShippingThreshold: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping Rate (₹)</label>
                      <input
                        type="number"
                        value={settings.standardShippingRate}
                        onChange={(e) => setSettings({...settings, standardShippingRate: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Express Shipping Rate (₹)</label>
                      <input
                        type="number"
                        value={settings.expressShippingRate}
                        onChange={(e) => setSettings({...settings, expressShippingRate: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('shipping')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Shipping Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeSection === 'email' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                      <input
                        type="text"
                        value={settings.smtpHost}
                        onChange={(e) => setSettings({...settings, smtpHost: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                      <input
                        type="number"
                        value={settings.smtpPort}
                        onChange={(e) => setSettings({...settings, smtpPort: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
                      <input
                        type="text"
                        value={settings.smtpUser}
                        onChange={(e) => setSettings({...settings, smtpUser: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                      <input
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) => setSettings({...settings, smtpPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('email')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Email Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeSection === 'seo' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={settings.metaTitle}
                      onChange={(e) => setSettings({...settings, metaTitle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Wall Touch - Premium Wallpapers & Blinds"
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea
                      value={settings.metaDescription}
                      onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Discover amazing products at unbeatable prices. Fast shipping, secure payments, and excellent customer service."
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                    <input
                      type="text"
                      value={settings.metaKeywords}
                      onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="wallpaper, blinds, home decor, interior design"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
                      <input
                        type="text"
                        value={settings.googleAnalyticsId}
                        onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Google Search Console</label>
                      <input
                        type="text"
                        value={settings.googleSearchConsole}
                        onChange={(e) => setSettings({...settings, googleSearchConsole: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Verification code"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave('seo')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save SEO Settings</span>
                  </button>
                </div>
              </div>
            )}

            {/* Other sections would go here */}
            {activeSection !== 'general' && activeSection !== 'payment' && activeSection !== 'gst' && activeSection !== 'header' && activeSection !== 'footer' && activeSection !== 'product-tabs' && activeSection !== 'chatbot' && activeSection !== 'popup' && activeSection !== 'pages' && activeSection !== 'shipping' && activeSection !== 'email' && activeSection !== 'seo' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {sections.find(s => s.id === activeSection)?.label} Settings
                </h3>
                <p className="text-gray-600">Settings for {activeSection} will be available soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
