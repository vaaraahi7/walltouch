'use client'

import { useState } from 'react'
import { Phone, MessageCircle, Calculator, MapPin, Calendar, Clock, X } from '../lib/icons'
import toast from 'react-hot-toast'

interface InstallationRequestProps {
  productName?: string
  productPrice?: number
  onClose?: () => void
}

export function InstallationRequest({ productName, productPrice, onClose }: InstallationRequestProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    productType: productName || '',
    roomType: '',
    dimensions: {
      width: '',
      height: '',
      unit: 'feet'
    },
    preferredDate: '',
    preferredTime: '',
    additionalNotes: ''
  })

  const roomTypes = [
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Bathroom',
    'Office',
    'Dining Room',
    'Kids Room',
    'Other'
  ]

  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Calculate estimated area and cost
    const width = parseFloat(formData.dimensions.width) || 0
    const height = parseFloat(formData.dimensions.height) || 0
    const area = width * height
    const installationCost = area * 50 // ₹50 per sq ft
    
    // Create WhatsApp message
    const message = `
🏠 *Installation Request - ModernStore*

👤 *Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

📍 *Address:*
${formData.address}
${formData.city} - ${formData.pincode}

🛠️ *Installation Details:*
Product: ${formData.productType}
Room: ${formData.roomType}
Dimensions: ${formData.dimensions.width} x ${formData.dimensions.height} ${formData.dimensions.unit}
Estimated Area: ${area.toFixed(1)} sq ${formData.dimensions.unit}

📅 *Preferred Schedule:*
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}

💰 *Estimated Installation Cost:* ₹${installationCost.toLocaleString()}

📝 *Additional Notes:*
${formData.additionalNotes || 'None'}

Please confirm the installation appointment and provide final quotation.
    `.trim()

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    toast.success('Installation request sent! We will contact you soon.')
    setIsOpen(false)
    if (onClose) onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const estimatedArea = (parseFloat(formData.dimensions.width) || 0) * (parseFloat(formData.dimensions.height) || 0)
  const estimatedCost = estimatedArea * 50

  return (
    <>
      {/* Installation Request Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 mb-3"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Request Installation</span>
      </button>

      {/* WhatsApp Quick Contact */}
      <button
        onClick={() => {
          const quickMessage = `Hi! I'm interested in installation services for ${productName || 'wallpaper/blinds'}. Please provide more details.`
          window.open(`https://wa.me/919876543210?text=${encodeURIComponent(quickMessage)}`, '_blank')
        }}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
      >
        <Phone className="h-4 w-4" />
        <span>WhatsApp for Quick Quote</span>
      </button>

      {/* Installation Request Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Installation Request</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Installation Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Installation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                      <input
                        type="text"
                        value={formData.productType}
                        onChange={(e) => handleInputChange('productType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Wallpaper, Venetian Blinds"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                      <select
                        value={formData.roomType}
                        onChange={(e) => handleInputChange('roomType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Room Type</option>
                        {roomTypes.map(room => (
                          <option key={room} value={room}>{room}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dimensions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.dimensions.width}
                        onChange={(e) => handleInputChange('dimensions.width', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.dimensions.height}
                        onChange={(e) => handleInputChange('dimensions.height', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <select
                        value={formData.dimensions.unit}
                        onChange={(e) => handleInputChange('dimensions.unit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="feet">Feet</option>
                        <option value="meters">Meters</option>
                      </select>
                    </div>
                  </div>
                  
                  {estimatedArea > 0 && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">
                            Estimated Area: {estimatedArea.toFixed(1)} sq {formData.dimensions.unit}
                          </p>
                          <p className="text-sm text-blue-700">
                            Estimated Installation Cost: ₹{estimatedCost.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Preferred Schedule */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Preferred Schedule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Send Request via WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
