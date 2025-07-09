'use client'

import React, { useState } from 'react'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import { Plus, Edit, Trash2, Save, X, Settings, Star, Eye, Grid, List, BarChart3 } from '../../lib/icons'
import toast from 'react-hot-toast'

export function FeaturedProductsSettings() {
  const { 
    categories, 
    featuredProductSettings, 
    addFeaturedProductSetting, 
    updateFeaturedProductSetting, 
    deleteFeaturedProductSetting 
  } = useGlobalStore()

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    categoryId: 0,
    categoryName: '',
    maxProducts: 4,
    showOnHomepage: true,
    sortBy: 'newest' as 'newest' | 'price_low' | 'price_high' | 'rating' | 'manual',
    displayStyle: 'grid' as 'grid' | 'carousel' | 'list',
    enabled: true
  })

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'manual', label: 'Manual Order' }
  ]

  const displayStyleOptions = [
    { value: 'grid', label: 'Grid Layout', icon: Grid },
    { value: 'carousel', label: 'Carousel', icon: BarChart3 },
    { value: 'list', label: 'List View', icon: List }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.categoryId || !formData.categoryName) {
      toast.error('Please select a category')
      return
    }

    if (formData.maxProducts < 1 || formData.maxProducts > 20) {
      toast.error('Max products must be between 1 and 20')
      return
    }

    // Check if category already has settings (only for new settings)
    if (!editingId) {
      const existingSetting = featuredProductSettings.find(
        setting => setting.categoryId === formData.categoryId
      )
      if (existingSetting) {
        toast.error('This category already has featured product settings')
        return
      }
    }

    if (editingId) {
      updateFeaturedProductSetting(editingId, formData)
      toast.success('Featured product settings updated!')
      setEditingId(null)
    } else {
      addFeaturedProductSetting(formData)
      toast.success('Featured product settings added!')
      setShowAddModal(false)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      categoryId: 0,
      categoryName: '',
      maxProducts: 4,
      showOnHomepage: true,
      sortBy: 'newest',
      displayStyle: 'grid',
      enabled: true
    })
  }

  const handleEdit = (setting: any) => {
    setFormData({
      categoryId: setting.categoryId,
      categoryName: setting.categoryName,
      maxProducts: setting.maxProducts,
      showOnHomepage: setting.showOnHomepage,
      sortBy: setting.sortBy,
      displayStyle: setting.displayStyle,
      enabled: setting.enabled
    })
    setEditingId(setting.id)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this featured product setting?')) {
      deleteFeaturedProductSetting(id)
      toast.success('Featured product setting deleted!')
    }
  }

  const handleCategoryChange = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId)
    setFormData({
      ...formData,
      categoryId,
      categoryName: category?.name || ''
    })
  }

  const getAvailableCategories = () => {
    // Filter out categories that already have settings (except when editing)
    return categories.filter(category => {
      const hasSettings = featuredProductSettings.some(
        setting => setting.categoryId === category.id && setting.id !== editingId
      )
      return !hasSettings
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Products Settings</h2>
          <p className="text-gray-600 mt-1">
            Configure how many featured products to show for each category
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category Setting
        </button>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sort By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Display Style
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featuredProductSettings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Settings className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No featured product settings configured</p>
                    <p className="text-sm">Add your first category setting to get started</p>
                  </td>
                </tr>
              ) : (
                featuredProductSettings.map((setting) => (
                  <tr key={setting.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {setting.categoryName}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {setting.categoryId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {setting.maxProducts} products
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sortOptions.find(opt => opt.value === setting.sortBy)?.label}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {displayStyleOptions.find(opt => opt.value === setting.displayStyle)?.icon && (
                          <span className="mr-2">
                            {React.createElement(
                              displayStyleOptions.find(opt => opt.value === setting.displayStyle)!.icon,
                              { className: "h-4 w-4 text-gray-500" }
                            )}
                          </span>
                        )}
                        <span className="text-sm text-gray-900">
                          {displayStyleOptions.find(opt => opt.value === setting.displayStyle)?.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          setting.enabled 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {setting.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        {setting.showOnHomepage && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Eye className="h-3 w-3 mr-1" />
                            Homepage
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(setting)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(setting.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingId) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingId ? 'Edit Featured Product Setting' : 'Add Featured Product Setting'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingId(null)
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleCategoryChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value={0}>Select a category</option>
                  {getAvailableCategories().map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.parentId ? '└ ' : ''}{category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Products to Show
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.maxProducts}
                  onChange={(e) => setFormData({...formData, maxProducts: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Between 1 and 20 products</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort Products By
                </label>
                <select
                  value={formData.sortBy}
                  onChange={(e) => setFormData({...formData, sortBy: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Style
                </label>
                <select
                  value={formData.displayStyle}
                  onChange={(e) => setFormData({...formData, displayStyle: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {displayStyleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showOnHomepage"
                    checked={formData.showOnHomepage}
                    onChange={(e) => setFormData({...formData, showOnHomepage: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showOnHomepage" className="ml-2 text-sm text-gray-700">
                    Show on homepage
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="enabled" className="ml-2 text-sm text-gray-700">
                    Enable this setting
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {editingId ? 'Update' : 'Add'} Setting
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingId(null)
                    resetForm()
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
