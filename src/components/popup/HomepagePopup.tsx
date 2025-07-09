'use client'

import { useState, useEffect } from 'react'
import { X, Gift, Star, ArrowRight } from '../../lib/icons'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'

export function HomepagePopup() {
  const { siteSettings } = useGlobalStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if popup should be shown
    if (!siteSettings.popup?.enabled) return

    // Check if user has already seen the popup today
    const lastShown = localStorage.getItem('popup_last_shown')
    const today = new Date().toDateString()
    
    if (lastShown === today && !siteSettings.popup?.showDaily) return

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, siteSettings.popup?.delay || 3000)

    return () => clearTimeout(timer)
  }, [siteSettings.popup])

  const handleClose = () => {
    setIsVisible(false)
    // Remember that user saw the popup today
    localStorage.setItem('popup_last_shown', new Date().toDateString())
  }

  const handleAction = () => {
    if (siteSettings.popup?.actionUrl) {
      window.open(siteSettings.popup.actionUrl, '_blank')
    }
    handleClose()
  }

  if (!isVisible || !siteSettings.popup?.enabled) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Popup Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          {siteSettings.popup?.type === 'discount' && (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-red-600" />
            </div>
          )}
          
          {siteSettings.popup?.type === 'newsletter' && (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          )}

          {siteSettings.popup?.type === 'announcement' && (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
          )}

          {/* Image */}
          {siteSettings.popup?.image && (
            <div className="mb-6">
              <img
                src={siteSettings.popup.image}
                alt={siteSettings.popup.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {siteSettings.popup?.title || 'Special Offer!'}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {siteSettings.popup?.description || 'Don\'t miss out on our amazing deals and offers!'}
          </p>

          {/* Discount Code */}
          {siteSettings.popup?.discountCode && (
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Use code:</p>
              <p className="text-2xl font-bold text-blue-600 tracking-wider">
                {siteSettings.popup.discountCode}
              </p>
            </div>
          )}

          {/* Newsletter Signup */}
          {siteSettings.popup?.type === 'newsletter' && (
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {siteSettings.popup?.actionText && (
              <button
                onClick={handleAction}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{siteSettings.popup.actionText}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={handleClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              {siteSettings.popup?.closeText || 'Maybe Later'}
            </button>
          </div>

          {/* Footer Text */}
          {siteSettings.popup?.footerText && (
            <p className="text-xs text-gray-500 mt-4">
              {siteSettings.popup.footerText}
            </p>
          )}
        </div>

        {/* Decorative Elements */}
        {siteSettings.popup?.type === 'discount' && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-sm font-bold transform rotate-12 translate-x-2 -translate-y-2">
            SALE!
          </div>
        )}
      </div>
    </div>
  )
}
