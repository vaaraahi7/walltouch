'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Save, X, MessageCircle, Bot } from '../../lib/icons'
import toast from 'react-hot-toast'

interface ChatResponse {
  id: string
  trigger: string
  response: string
  category: string
  isActive: boolean
  createdAt: string
}

export function ChatbotManagement() {
  const [responses, setResponses] = useState<ChatResponse[]>([
    {
      id: '1',
      trigger: 'hello|hi|hey',
      response: 'Hello! Welcome to ModernStore. How can I help you today?',
      category: 'greeting',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      trigger: 'price|cost|pricing',
      response: 'Our wallpapers start from ₹70 per sq ft and blinds from ₹150 per sq ft. Would you like specific pricing for any product?',
      category: 'pricing',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      trigger: 'delivery|shipping',
      response: 'We deliver across India! Hyderabad: 3-4 days, Nearby states: 4-5 days, Other states: 5-7 days. Free delivery on orders above ₹3000.',
      category: 'shipping',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      trigger: 'installation|install',
      response: 'We provide professional installation services! Free installation on orders above ₹3000. Would you like to request an installation quote?',
      category: 'installation',
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '5',
      trigger: 'contact|phone|support',
      response: 'You can reach us at +91 9876543210 or email support@modernstore.com. Our hours are Mon-Sat 9AM-7PM.',
      category: 'contact',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [editingResponse, setEditingResponse] = useState<ChatResponse | null>(null)
  const [newResponse, setNewResponse] = useState({
    trigger: '',
    response: '',
    category: 'general'
  })

  const categories = ['greeting', 'pricing', 'shipping', 'installation', 'contact', 'products', 'general', 'support']

  const handleAddResponse = () => {
    if (!newResponse.trigger || !newResponse.response) {
      toast.error('Please fill in all fields')
      return
    }

    const response: ChatResponse = {
      id: Date.now().toString(),
      trigger: newResponse.trigger,
      response: newResponse.response,
      category: newResponse.category,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setResponses([...responses, response])
    setNewResponse({ trigger: '', response: '', category: 'general' })
    toast.success('Chat response added successfully!')
  }

  const handleEditResponse = (response: ChatResponse) => {
    setEditingResponse({ ...response })
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (!editingResponse) return

    setResponses(responses.map(r => 
      r.id === editingResponse.id ? editingResponse : r
    ))
    setIsEditing(false)
    setEditingResponse(null)
    toast.success('Chat response updated successfully!')
  }

  const handleDeleteResponse = (id: string) => {
    if (confirm('Are you sure you want to delete this chat response?')) {
      setResponses(responses.filter(r => r.id !== id))
      toast.success('Chat response deleted successfully!')
    }
  }

  const toggleResponseStatus = (id: string) => {
    setResponses(responses.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ))
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      greeting: 'bg-green-100 text-green-800',
      pricing: 'bg-blue-100 text-blue-800',
      shipping: 'bg-purple-100 text-purple-800',
      installation: 'bg-orange-100 text-orange-800',
      contact: 'bg-red-100 text-red-800',
      products: 'bg-yellow-100 text-yellow-800',
      general: 'bg-gray-100 text-gray-800',
      support: 'bg-indigo-100 text-indigo-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Chatbot Management</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {responses.filter(r => r.isActive).length} active responses
          </span>
        </div>
      </div>

      {/* Add New Response */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Chat Response</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trigger Keywords (separated by |)
              </label>
              <input
                type="text"
                value={newResponse.trigger}
                onChange={(e) => setNewResponse({ ...newResponse, trigger: e.target.value })}
                placeholder="e.g., hello|hi|hey"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use | to separate multiple trigger words
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newResponse.category}
                onChange={(e) => setNewResponse({ ...newResponse, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Message</label>
            <textarea
              value={newResponse.response}
              onChange={(e) => setNewResponse({ ...newResponse, response: e.target.value })}
              rows={3}
              placeholder="Enter the bot's response message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={handleAddResponse}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Response</span>
          </button>
        </div>
      </div>

      {/* Responses List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Chat Responses</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {responses.map((response) => (
            <div key={response.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(response.category)}`}>
                      {response.category}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      response.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {response.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-900">Triggers:</p>
                    <p className="text-sm text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                      {response.trigger}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-900">Response:</p>
                    <p className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                      {response.response}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleResponseStatus(response.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      response.isActive 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {response.isActive ? 'Disable' : 'Enable'}
                  </button>
                  
                  <button
                    onClick={() => handleEditResponse(response)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteResponse(response.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editingResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Edit Chat Response</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trigger Keywords
                  </label>
                  <input
                    type="text"
                    value={editingResponse.trigger}
                    onChange={(e) => setEditingResponse({ ...editingResponse, trigger: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingResponse.category}
                    onChange={(e) => setEditingResponse({ ...editingResponse, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Response Message</label>
                <textarea
                  value={editingResponse.response}
                  onChange={(e) => setEditingResponse({ ...editingResponse, response: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
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
    </div>
  )
}
