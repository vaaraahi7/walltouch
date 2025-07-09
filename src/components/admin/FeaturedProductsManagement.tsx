'use client'

import { useState } from 'react'
import { Star, Plus, Trash2, ArrowUp, ArrowDown, Edit, Save, X } from '../../lib/icons'
import toast from 'react-hot-toast'

interface FeaturedProduct {
  id: string
  name: string
  price: number
  image: string
  category: string
  isFeatured: boolean
  featuredOrder: number
  description: string
}

interface CategoryFeatured {
  categoryId: string
  categoryName: string
  products: FeaturedProduct[]
  maxProducts: number
}

export function FeaturedProductsManagement() {
  const [categories, setCategories] = useState<CategoryFeatured[]>([
    {
      categoryId: 'wallpapers',
      categoryName: 'Wallpapers',
      maxProducts: 2,
      products: [
        {
          id: '1',
          name: 'Premium Floral Wallpaper',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'wallpapers',
          isFeatured: true,
          featuredOrder: 1,
          description: 'Beautiful floral design perfect for living rooms'
        },
        {
          id: '2',
          name: 'Modern Geometric Wallpaper',
          price: 1500,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'wallpapers',
          isFeatured: true,
          featuredOrder: 2,
          description: 'Contemporary geometric patterns for modern homes'
        }
      ]
    },
    {
      categoryId: 'blinds',
      categoryName: 'Blinds',
      maxProducts: 2,
      products: [
        {
          id: '3',
          name: 'Venetian Blinds',
          price: 3500,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'blinds',
          isFeatured: true,
          featuredOrder: 1,
          description: 'Classic venetian blinds for elegant window treatment'
        },
        {
          id: '4',
          name: 'Roller Blinds',
          price: 2500,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
          category: 'blinds',
          isFeatured: true,
          featuredOrder: 2,
          description: 'Simple and functional roller blinds'
        }
      ]
    }
  ])

  const [availableProducts] = useState<FeaturedProduct[]>([
    {
      id: '5',
      name: 'Luxury Silk Wallpaper',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      category: 'wallpapers',
      isFeatured: false,
      featuredOrder: 0,
      description: 'Premium silk texture wallpaper'
    },
    {
      id: '6',
      name: 'Vertical Blinds',
      price: 4000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop',
      category: 'blinds',
      isFeatured: false,
      featuredOrder: 0,
      description: 'Professional vertical blinds for offices'
    }
  ])

  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<FeaturedProduct | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  })

  const addFeaturedProduct = (categoryId: string, productId: string) => {
    const category = categories.find(c => c.categoryId === categoryId)
    if (!category) return

    if (category.products.length >= category.maxProducts) {
      toast.error(`Maximum ${category.maxProducts} featured products allowed per category`)
      return
    }

    const product = availableProducts.find(p => p.id === productId)
    if (!product) return

    const newProduct = {
      ...product,
      isFeatured: true,
      featuredOrder: category.products.length + 1
    }

    setCategories(categories.map(c => 
      c.categoryId === categoryId 
        ? { ...c, products: [...c.products, newProduct] }
        : c
    ))

    toast.success(`${product.name} added to featured products`)
  }

  const removeFeaturedProduct = (categoryId: string, productId: string) => {
    setCategories(categories.map(c => 
      c.categoryId === categoryId 
        ? { 
            ...c, 
            products: c.products
              .filter(p => p.id !== productId)
              .map((p, index) => ({ ...p, featuredOrder: index + 1 }))
          }
        : c
    ))

    toast.success('Product removed from featured products')
  }

  const moveProduct = (categoryId: string, productId: string, direction: 'up' | 'down') => {
    const updatedCategories = categories.map((category) => {
      if (category.categoryId !== categoryId) {
        return category
      }

      const products = [...category.products]
      const currentIndex = products.findIndex(p => p.id === productId)

      if (currentIndex === -1) {
        return category
      }

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

      if (newIndex < 0 || newIndex >= products.length) {
        return category
      }

      // Swap products
      const temp = products[currentIndex]
      products[currentIndex] = products[newIndex]
      products[newIndex] = temp

      // Update order numbers
      products.forEach((product, index) => {
        product.featuredOrder = index + 1
      })

      return {
        ...category,
        products: products
      }
    })

    setCategories(updatedCategories)
    toast.success('Product order updated')
  }

  const updateMaxProducts = (categoryId: string, maxProducts: number) => {
    setCategories(categories.map(c =>
      c.categoryId === categoryId
        ? { ...c, maxProducts }
        : c
    ))
  }

  const startEditProduct = (product: FeaturedProduct) => {
    setEditingProduct(product.id)
    setEditForm({ ...product })
  }

  const saveEditProduct = () => {
    if (!editForm) return

    setCategories(categories.map(c => ({
      ...c,
      products: c.products.map(p =>
        p.id === editForm.id ? editForm : p
      )
    })))

    setEditingProduct(null)
    setEditForm(null)
    toast.success('Product updated successfully!')
  }

  const cancelEdit = () => {
    setEditingProduct(null)
    setEditForm(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Featured Products Management</h2>
          <div className="text-sm text-gray-600">
            Manage featured products displayed on homepage
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <div key={category.categoryId} className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{category.categoryName}</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Max Products:</label>
                  <select
                    value={category.maxProducts}
                    onChange={(e) => updateMaxProducts(category.categoryId, parseInt(e.target.value))}
                    className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
                <span className="text-sm text-gray-500">
                  {category.products.length}/{category.maxProducts} featured
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Featured Products */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-gray-900">Featured Products</h4>
              {category.products.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No featured products. Add products below.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.products.map((product, index) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{product.name}</h5>
                          <p className="text-sm text-gray-600">{product.description}</p>
                          <p className="text-sm font-medium text-blue-600">₹{product.price.toLocaleString()}</p>
                          <div className="flex items-center space-x-1 mt-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs text-gray-500">Featured #{product.featuredOrder}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveProduct(category.categoryId, product.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => moveProduct(category.categoryId, product.id, 'down')}
                            disabled={index === category.products.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => startEditProduct(product)}
                            className="p-1 text-blue-400 hover:text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFeaturedProduct(category.categoryId, product.id)}
                            className="p-1 text-red-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Available Products to Add */}
            {category.products.length < category.maxProducts && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Add Products to Featured</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableProducts
                    .filter(p => p.category === category.categoryId)
                    .map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 text-sm">{product.name}</h5>
                            <p className="text-xs text-gray-600">{product.description}</p>
                            <p className="text-sm font-medium text-blue-600">₹{product.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => addFeaturedProduct(category.categoryId, product.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Preview Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Homepage Preview</h3>
          <p className="text-sm text-gray-600">This is how featured products will appear on your homepage</p>
        </div>
        <div className="p-6">
          {categories.map((category) => (
            <div key={category.categoryId} className="mb-8 last:mb-0">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{category.categoryName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.products.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h5 className="font-medium text-gray-900 mb-2">{product.name}</h5>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-gray-500">Featured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Featured Product</h3>
              <button
                onClick={cancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditProduct}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newProduct.name && newProduct.category) {
                      const productToAdd = {
                        id: Date.now().toString(),
                        name: newProduct.name,
                        price: newProduct.price,
                        description: newProduct.description,
                        image: newProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
                        category: newProduct.category,
                        slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
                        featuredOrder: 1
                      }
                      addFeaturedProduct(newProduct.category, productToAdd.id)
                      setNewProduct({ name: '', price: 0, description: '', image: '', category: '' })
                      setShowAddModal(false)
                    } else {
                      toast.error('Please fill in required fields')
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
