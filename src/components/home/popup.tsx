'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Percent, Star } from '../../lib/icons'

export function HomepagePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      // Check if popup was already shown in this session
      const popupShown = sessionStorage.getItem('homepage-popup-shown')
      if (!popupShown) {
        setIsVisible(true)
        sessionStorage.setItem('homepage-popup-shown', 'true')
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Popup content */}
        <div className="p-8 text-center">
          {/* Header */}
          <div className="mb-6">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Our Store!
            </h2>
            <p className="text-gray-600">
              Get exclusive offers on wallpapers and blinds
            </p>
          </div>

          {/* Offer */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Percent className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">15% OFF</span>
            </div>
            <p className="text-gray-700 mb-3">
              On your first order above ₹5,000
            </p>
            <div className="bg-white rounded-lg p-3 border-2 border-dashed border-blue-300">
              <p className="text-sm text-gray-600 mb-1">Use coupon code:</p>
              <p className="text-lg font-bold text-blue-600">WELCOME15</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">Premium Quality</p>
            </div>
            <div className="text-center">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Free Shipping</p>
            </div>
            <div className="text-center">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">Expert Installation</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Shop Now
            </button>
            <button
              onClick={handleClose}
              className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      </div>
    </div>
  )
}
