'use client'

import { useState } from 'react'
import { Save, Upload, Eye, EyeOff } from '../../lib/icons'

export function SettingsTab() {
  const [activeSection, setActiveSection] = useState('general')
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [settings, setSettings] = useState({
    // General Settings
    storeName: 'Wall Touch',
    storeDescription: 'Your one-stop destination for premium wallpapers and blinds',
    storeEmail: 'admin@walltouch.com',
    storePhone: '+91 9876543210',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    
    // Payment Settings
    razorpayKeyId: '',
    razorpayKeySecret: '',
    enableCOD: true,
    enableUPI: true,
    
    // Shipping Settings
    freeShippingThreshold: 500,
    standardShippingRate: 50,
    expressShippingRate: 150,
    
    // Email Settings
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    
    // SEO Settings
    metaTitle: 'Wall Touch - Premium Wallpapers & Blinds',
    metaDescription: 'Transform your home with Wall Touch premium wallpapers and blinds. Quality products, expert installation, and exceptional service.',
    metaKeywords: 'wallpaper, blinds, home decor, interior design, wall touch'
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings)
    alert(`${section} settings saved successfully!`)
  }

  const sections = [
    { id: 'general', label: 'General' },
    { id: 'payment', label: 'Payment' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'email', label: 'Email' },
    { id: 'seo', label: 'SEO' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your store configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
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
                        value={settings.storeName}
                        onChange={(e) => setSettings({...settings, storeName: e.target.value})}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          checked={settings.enableCOD}
                          onChange={(e) => setSettings({...settings, enableCOD: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Enable Cash on Delivery</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.enableUPI}
                          onChange={(e) => setSettings({...settings, enableUPI: e.target.checked})}
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

            {/* Shipping Settings */}
            {activeSection === 'shipping' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (₹)</label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({...settings, freeShippingThreshold: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSave('shipping')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
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
                        placeholder="smtp.gmail.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSave('email')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea
                      value={settings.metaDescription}
                      onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                    <input
                      type="text"
                      value={settings.metaKeywords}
                      onChange={(e) => setSettings({...settings, metaKeywords: e.target.value})}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => handleSave('seo')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
