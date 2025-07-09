'use client'

import { useState } from 'react'
import { Mail, Gift, Percent, Bell } from '../../lib/icons'
import toast from 'react-hot-toast'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Successfully subscribed to newsletter!')
    setEmail('')
    setIsLoading(false)
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Newsletter Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive deals, and special offers. Plus, get 10% off your first order!
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-4">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Exclusive Offers</h3>
              <p className="text-sm text-muted-foreground">
                Get access to subscriber-only deals and early bird offers
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-4">
                <Percent className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Special Discounts</h3>
              <p className="text-sm text-muted-foreground">
                Enjoy special discounts and promotional codes
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 mb-4">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">New Arrivals</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to know about new product launches
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
    </section>
  )
}
