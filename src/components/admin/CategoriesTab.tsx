'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2 } from '../../lib/icons'

interface Category {
  id: number
  name: string
  products: number
  status: string
  description?: string
}

interface CategoriesTabProps {
  categories?: Category[]
}

export function CategoriesTab({ categories: initialCategories = [] }: CategoriesTabProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories.length > 0 ? initialCategories : [
    { id: 1, name: 'Electronics', products: 156, status: 'active' },
    { id: 2, name: 'Clothing', products: 89, status: 'active' },
    { id: 3, name: 'Sports & Fitness', products: 45, status: 'active' },
    { id: 4, name: 'Home & Garden', products: 67, status: 'active' },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  })

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCategory = () => {
    if (!newCategory.name) {
      alert('Please enter a category name')
      return
    }

    // Create new category
    const categoryData: Category = {
      id: Date.now(), // Temporary ID
      name: newCategory.name,
      description: newCategory.description,
      products: 0,
      status: 'active'
    }

    // Add to categories state
    setCategories(prevCategories => [...prevCategories, categoryData])

    console.log('Category added:', categoryData)
    // In a real app, you would call your API here
    // await supabase.from('categories').insert(categoryData)

    alert('Category added successfully!')
    setShowAddModal(false)
    setNewCategory({ name: '', description: '' })
  }

  const handleDeleteCategory = (categoryId: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prevCategories => prevCategories.filter(c => c.id !== categoryId))
      alert('Category deleted successfully!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Categories Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              <div className="flex space-x-2">
                <button className="text-green-600 hover:text-green-900">
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{category.products} products</p>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {category.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
