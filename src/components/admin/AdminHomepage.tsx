'use client'

import { useState } from 'react'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import { Plus, Edit, Trash2, Upload, Save, Eye, Settings, Image, Type, Palette } from '../../lib/icons'
import { ImageUpload } from './ImageUpload'

export function AdminHomepage() {
  const { sliders, addSlider, updateSlider, deleteSlider, siteSettings, updateSiteSettings } = useGlobalStore()
  const [activeSection, setActiveSection] = useState('sliders')
  const [showSliderModal, setShowSliderModal] = useState(false)
  const [editingSlider, setEditingSlider] = useState<any>(null)
  const [newSlider, setNewSlider] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    active: true
  })

  const sections = [
    { id: 'sliders', label: 'Hero Sliders', icon: Image },
    { id: 'branding', label: 'Logo & Branding', icon: Palette },
    { id: 'header', label: 'Header Settings', icon: Settings },
    { id: 'footer', label: 'Footer Settings', icon: Type },
  ]

  const handleAddSlider = () => {
    if (!newSlider.title || !newSlider.image) {
      alert('Please fill in title and image URL')
      return
    }

    if (editingSlider) {
      updateSlider(editingSlider.id, newSlider)
      alert('Slider updated successfully!')
      setEditingSlider(null)
    } else {
      addSlider(newSlider)
      alert('Slider added successfully!')
    }

    setShowSliderModal(false)
    setNewSlider({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: '',
      active: true
    })
  }

  const handleEditSlider = (slider: any) => {
    setEditingSlider(slider)
    setNewSlider({
      title: slider.title,
      subtitle: slider.subtitle,
      description: slider.description,
      image: slider.image,
      buttonText: slider.buttonText,
      buttonLink: slider.buttonLink,
      active: slider.active
    })
    setShowSliderModal(true)
  }

  const handleDeleteSlider = (sliderId: number) => {
    if (confirm('Are you sure you want to delete this slider?')) {
      deleteSlider(sliderId)
      alert('Slider deleted successfully!')
    }
  }

  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Homepage Management</h1>
        <p className="text-gray-600">Customize your homepage appearance and content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center space-x-3 ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            {/* Hero Sliders */}
            {activeSection === 'sliders' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Hero Sliders</h3>
                  <button
                    onClick={() => setShowSliderModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Slider</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sliders.map((slider) => (
                    <div key={slider.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-200 relative">
                        {slider.image ? (
                          <img src={slider.image} alt={slider.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Image className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            slider.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {slider.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{slider.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{slider.subtitle}</p>
                        <p className="text-xs text-gray-500 mb-3">{slider.description}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditSlider(slider)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSlider(slider.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Logo & Branding */}
            {activeSection === 'branding' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Logo & Branding</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={(e) => updateSiteSettings({ siteName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                    <textarea
                      value={siteSettings.siteDescription}
                      onChange={(e) => updateSiteSettings({ siteDescription: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                    <input
                      type="url"
                      value={siteSettings.logo}
                      onChange={(e) => updateSiteSettings({ logo: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                      <input
                        type="color"
                        value={siteSettings.primaryColor}
                        onChange={(e) => updateSiteSettings({ primaryColor: e.target.value })}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                      <input
                        type="color"
                        value={siteSettings.secondaryColor}
                        onChange={(e) => updateSiteSettings({ secondaryColor: e.target.value })}
                        className="w-full h-10 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
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
                <h3 className="text-lg font-medium text-gray-900 mb-6">Header Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Style</label>
                    <select
                      value={siteSettings.headerStyle}
                      onChange={(e) => updateSiteSettings({ headerStyle: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="default">Default</option>
                      <option value="minimal">Minimal</option>
                      <option value="centered">Centered</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Header Features</label>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={siteSettings.showSearch}
                          onChange={(e) => updateSiteSettings({ showSearch: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Show Search Bar</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={siteSettings.showWishlist}
                          onChange={(e) => updateSiteSettings({ showWishlist: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Show Wishlist</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={siteSettings.showCart}
                          onChange={(e) => updateSiteSettings({ showCart: e.target.checked })}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Show Shopping Cart</span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Settings */}
            {activeSection === 'footer' && (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Footer Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Footer Style</label>
                    <select
                      value={siteSettings.footerStyle}
                      onChange={(e) => updateSiteSettings({ footerStyle: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="default">Default</option>
                      <option value="minimal">Minimal</option>
                      <option value="detailed">Detailed</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={siteSettings.contactInfo.email}
                          onChange={(e) => updateSiteSettings({ 
                            contactInfo: { ...siteSettings.contactInfo, email: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={siteSettings.contactInfo.phone}
                          onChange={(e) => updateSiteSettings({ 
                            contactInfo: { ...siteSettings.contactInfo, phone: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={siteSettings.contactInfo.address}
                        onChange={(e) => updateSiteSettings({ 
                          contactInfo: { ...siteSettings.contactInfo, address: e.target.value }
                        })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Social Media Links</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks.facebook || ''}
                          onChange={(e) => updateSiteSettings({ 
                            socialLinks: { ...siteSettings.socialLinks, facebook: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks.twitter || ''}
                          onChange={(e) => updateSiteSettings({ 
                            socialLinks: { ...siteSettings.socialLinks, twitter: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks.instagram || ''}
                          onChange={(e) => updateSiteSettings({ 
                            socialLinks: { ...siteSettings.socialLinks, instagram: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                        <input
                          type="url"
                          value={siteSettings.socialLinks.youtube || ''}
                          onChange={(e) => updateSiteSettings({ 
                            socialLinks: { ...siteSettings.socialLinks, youtube: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSettings}
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

      {/* Add/Edit Slider Modal */}
      {showSliderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingSlider ? 'Edit Slider' : 'Add New Slider'}
              </h3>
              <button
                onClick={() => {
                  setShowSliderModal(false)
                  setEditingSlider(null)
                  setNewSlider({
                    title: '',
                    subtitle: '',
                    description: '',
                    image: '',
                    buttonText: '',
                    buttonLink: '',
                    active: true
                  })
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={newSlider.title}
                  onChange={(e) => setNewSlider({...newSlider, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter slider title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={newSlider.subtitle}
                  onChange={(e) => setNewSlider({...newSlider, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newSlider.description}
                  onChange={(e) => setNewSlider({...newSlider, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>
              
              <ImageUpload
                value={newSlider.image}
                onChange={(value) => setNewSlider({...newSlider, image: value})}
                label="Slider Image *"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={newSlider.buttonText}
                    onChange={(e) => setNewSlider({...newSlider, buttonText: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Shop Now"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={newSlider.buttonLink}
                    onChange={(e) => setNewSlider({...newSlider, buttonLink: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/products"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={newSlider.active}
                  onChange={(e) => setNewSlider({...newSlider, active: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                  Active Slider
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowSliderModal(false)
                  setEditingSlider(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlider}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingSlider ? 'Update Slider' : 'Add Slider'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
