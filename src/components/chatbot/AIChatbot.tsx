'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from '../../lib/icons'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function AIChatbot() {
  const { siteSettings } = useGlobalStore()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your AI assistant for ${siteSettings.siteName || 'ModernStore'}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const predefinedResponses = {
    greeting: [
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'
    ],
    products: [
      'wallpaper', 'wallpapers', 'blind', 'blinds', 'product', 'products', 'catalog'
    ],
    pricing: [
      'price', 'cost', 'expensive', 'cheap', 'discount', 'offer', 'deal'
    ],
    shipping: [
      'delivery', 'shipping', 'ship', 'deliver', 'when will', 'how long'
    ],
    measurement: [
      'measure', 'size', 'dimension', 'how to measure', 'custom size'
    ],
    installation: [
      'install', 'installation', 'how to install', 'fitting'
    ],
    support: [
      'help', 'support', 'contact', 'phone', 'email', 'problem', 'issue'
    ]
  }

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (predefinedResponses.greeting.some(word => message.includes(word))) {
      return `Hello! Welcome to ${siteSettings.siteName || 'ModernStore'}. I'm here to help you with wallpapers, blinds, and any questions you might have. What are you looking for today?`
    }
    
    if (predefinedResponses.products.some(word => message.includes(word))) {
      return "We offer a wide range of premium wallpapers and blinds! Our collection includes:\n\n• Custom Wallpapers (Non-woven, Vinyl)\n• Window Blinds (Roller, Venetian, Vertical)\n• Custom sizing available\n• Professional installation services\n\nWould you like to browse our products or need help with specific requirements?"
    }
    
    if (predefinedResponses.pricing.some(word => message.includes(word))) {
      return "Our pricing is very competitive! Here's what you need to know:\n\n• Wallpapers: Starting from ₹70/sq ft\n• Blinds: Starting from ₹90/sq ft\n• Custom sizing available\n• Free shipping on orders above ₹500\n• Installation services available\n\nWould you like a custom quote? Please share your requirements!"
    }
    
    if (predefinedResponses.shipping.some(word => message.includes(word))) {
      return "We offer fast delivery across India:\n\n• Standard Delivery: 5-7 days (₹50)\n• Express Delivery: 3-4 days (₹150)\n• Same Day: Available in select cities (₹300)\n• Free shipping on orders above ₹500\n\nDelivery times vary by location. Would you like to check delivery options for your area?"
    }
    
    if (predefinedResponses.measurement.some(word => message.includes(word))) {
      return "Getting accurate measurements is crucial! Here's how:\n\n📏 For Wallpapers:\n• Measure wall width and height\n• Account for doors/windows\n• Add 10% extra for trimming\n\n📐 For Blinds:\n• Inside mount: Exact window opening\n• Outside mount: Add 2-3 inches\n\nNeed detailed measuring guide? Check our Size Guide page or contact our experts!"
    }
    
    if (predefinedResponses.installation.some(word => message.includes(word))) {
      return "We provide professional installation services:\n\n🔧 Installation Services:\n• Expert technicians\n• Available in major cities\n• Tools and materials included\n• Quality guarantee\n\n💡 DIY Options:\n• Detailed installation guides\n• Video tutorials\n• 24/7 support\n\nWould you like to book installation or need DIY guidance?"
    }
    
    if (predefinedResponses.support.some(word => message.includes(word))) {
      return `Need help? We're here for you!\n\n📞 Phone: ${siteSettings.contactInfo?.phone || '+91 9876543210'}\n📧 Email: ${siteSettings.contactInfo?.email || 'support@modernstore.com'}\n💬 Live Chat: Right here!\n🕒 Hours: Mon-Sat 9AM-7PM\n\nWhat specific help do you need? I can assist with orders, products, or technical questions!`
    }
    
    // Default response
    return "I'd be happy to help you! I can assist with:\n\n• Product information and recommendations\n• Pricing and quotes\n• Shipping and delivery\n• Measuring and installation\n• Order support\n\nWhat would you like to know more about? Or feel free to contact our support team for personalized assistance!"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Don't render if chatbot is explicitly disabled in admin
  // Default to enabled if settings not loaded yet
  if (siteSettings.chatbot?.enabled === false) {
    return null
  }



  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-[9999] animate-bounce"
          aria-label="Open chat"
          style={{
            zIndex: 9999,
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '64px',
            height: '64px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-[9999]" style={{ zIndex: 9999 }}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-medium">AI Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
