'use client'

import React, { useState } from 'react'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import { Plus, Edit, Trash2, Save, X, DollarSign, Package, Settings } from '../../lib/icons'
import toast from 'react-hot-toast'

interface WallpaperPaper {
  id: number
  name: string
  type: 'premium' | 'standard' | 'eco'
  pricePerSqFt: number
  description: string
  features: string[]
  available: boolean
}

export function WallpaperPricing() {
  const { siteSettings, updateSiteSettings } = useGlobalStore()
  
  const [wallpaperPapers, setWallpaperPapers] = useState<WallpaperPaper[]>([
    {
      id: 1,
      name: 'Premium Vinyl',
      type: 'premium',
      pricePerSqFt: 150,
      description: 'High-quality vinyl wallpaper with superior durability',
      features: ['Waterproof', 'Easy to clean', 'Long-lasting', '10-year warranty'],
      available: true
    },
    {
      id: 2,
      name: 'Standard Paper',
      type: 'standard',
      pricePerSqFt: 80,
      description: 'Quality paper wallpaper for residential use',
      features: ['Good quality', 'Easy installation', '5-year warranty'],
      available: true
    },
    {
      id: 3,
      name: 'Eco-Friendly',
      type: 'eco',
      pricePerSqFt: 120,
      description: 'Environmentally friendly wallpaper material',
      features: ['Eco-friendly', 'Non-toxic', 'Recyclable', '7-year warranty'],
      available: true
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'standard' as 'premium' | 'standard' | 'eco',
    pricePerSqFt: 0,
    description: '',
    features: [] as string[],
    available: true
  })
  const [featureInput, setFeatureInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || formData.pricePerSqFt <= 0) {
      toast.error('Please fill all required fields')
      return
    }

    if (editingId) {
      setWallpaperPapers(prev => prev.map(paper => 
        paper.id === editingId 
          ? { ...paper, ...formData }
          : paper
      ))
      toast.success('Wallpaper paper updated!')
      setEditingId(null)
    } else {
      const newPaper: WallpaperPaper = {
        ...formData,
        id: Date.now()
      }
      setWallpaperPapers(prev => [...prev, newPaper])
      toast.success('Wallpaper paper added!')
      setShowAddModal(false)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'standard',
      pricePerSqFt: 0,
      description: '',
      features: [],
      available: true
    })
    setFeatureInput('')
  }

  const handleEdit = (paper: WallpaperPaper) => {
    setFormData({
      name: paper.name,
      type: paper.type,
      pricePerSqFt: paper.pricePerSqFt,
      description: paper.description,
      features: paper.features,
      available: paper.available
    })
    setEditingId(paper.id)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this wallpaper paper?')) {
      setWallpaperPapers(prev => prev.filter(paper => paper.id !== id))
      toast.success('Wallpaper paper deleted!')
    }
  }

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      })
      setFeatureInput('')
    }
  }

  const removeFeature = (featureToRemove: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(feature => feature !== featureToRemove)
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'premium':
        return 'bg-purple-100 text-purple-800'
      case 'eco':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wallpaper Pricing Management</h2>
          <p className="text-gray-600 mt-1">
            Manage wallpaper paper types and their pricing for customized orders
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Paper Type
        </button>
      </div>

      {/* Papers List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paper Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price per Sq Ft
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
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
              {wallpaperPapers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">No wallpaper papers configured</p>
                    <p className="text-sm">Add your first paper type to get started</p>
                  </td>
                </tr>
              ) : (
                wallpaperPapers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {paper.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {paper.description}
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getTypeColor(paper.type)}`}>
                            {paper.type.charAt(0).toUpperCase() + paper.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{paper.pricePerSqFt}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">/sq ft</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {paper.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {feature}
                          </span>
                        ))}
                        {paper.features.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{paper.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        paper.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {paper.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(paper)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(paper.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {editingId ? 'Edit Wallpaper Paper' : 'Add New Wallpaper Paper'}
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paper Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="eco">Eco-Friendly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Square Foot (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.pricePerSqFt}
                    onChange={(e) => setFormData({...formData, pricePerSqFt: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the wallpaper paper type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add a feature"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                    Available for orders
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {editingId ? 'Update' : 'Add'} Paper
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
        </div>
      )}
    </div>
  )
}
