'use client'

import { useState, useEffect } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from '../../src/lib/icons'
import { useGlobalStore } from '../../src/contexts/GlobalStoreContext'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const { siteSettings, cmsPages } = useGlobalStore()
  const [contactContent, setContactContent] = useState<any>(null)

  useEffect(() => {
    // Find contact page content from CMS
    const contactPage = cmsPages.find(page => page.slug === 'contact' && page.status === 'published')
    if (contactPage) {
      setContactContent(contactPage)
    }
  }, [cmsPages])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {contactContent?.title || 'Contact Us'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need help with your order? We're here to help!
          </p>
        </div>

        {/* CMS Content */}
        {contactContent && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {contactContent.content.replace(/^# .*$/gm, '').replace(/^## /gm, '').replace(/^\*\*/gm, '').replace(/\*\*/gm, '')}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">{siteSettings.contactInfo?.phone || '+91 98765 43210'}</p>
                    <p className="text-sm text-gray-500">Mon-Sat 9AM-7PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">{siteSettings.contactInfo?.email || 'support@walltouch.com'}</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">{siteSettings.contactInfo?.address || 'Hyderabad, Telangana, India'}</p>
                    <p className="text-sm text-gray-500">Visit our showroom</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday</p>
                    <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                    <p className="text-sm text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
              <p className="mb-4">Call us directly for urgent queries or installation support.</p>
              <a
                href={`tel:${siteSettings.contactInfo?.phone || '+919876543210'}`}
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="order-support">Order Support</option>
                      <option value="installation">Installation Service</option>
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How do I measure for wallpaper?</h3>
              <p className="text-gray-600 text-sm">Measure the width and height of your wall in inches. Add 2-3 inches extra for trimming. Our product pages have detailed measuring guides.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Do you provide installation services?</h3>
              <p className="text-gray-600 text-sm">Yes, we offer professional installation services in Hyderabad and nearby areas. Contact us for pricing and scheduling.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">What is your return policy?</h3>
              <p className="text-gray-600 text-sm">We offer a 30-day return policy for unused items in original packaging. Custom-cut items are non-returnable.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How long does delivery take?</h3>
              <p className="text-gray-600 text-sm">Hyderabad: 3-4 days, Nearby states: 4-5 days, All India: 5-7 days. Check delivery time on product pages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
