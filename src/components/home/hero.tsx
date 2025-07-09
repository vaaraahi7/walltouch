'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Star, Truck, Shield, ChevronLeft, ChevronRight } from '../../lib/icons'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'

export function Hero() {
  const { sliders } = useGlobalStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Use active sliders only
  const activeSliders = sliders.filter(slider => slider.active)

  // Reset slide when sliders change
  useEffect(() => {
    if (currentSlide >= activeSliders.length) {
      setCurrentSlide(0)
    }
  }, [activeSliders.length, currentSlide])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || activeSliders.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSliders.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeSliders.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSliders.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSliders.length) % activeSliders.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // If no active sliders, return default content
  if (activeSliders.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Welcome to Wall Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your one-stop destination for premium wallpapers and blinds
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Shop Now</span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Ensure currentSlide is within bounds
  const safeCurrentSlide = Math.min(currentSlide, activeSliders.length - 1)
  const currentSlideData = activeSliders[safeCurrentSlide] || activeSliders[0]

  return (
    <section
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden transition-all duration-1000"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-white/20 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                  {currentSlideData?.subtitle || 'Featured'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {currentSlideData?.title || 'Welcome to Wall Touch'}
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg">
                {currentSlideData?.description || 'Your one-stop destination for premium wallpapers and blinds'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={currentSlideData?.buttonLink || '/products'}
                className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>{currentSlideData?.buttonText || 'Shop Now'}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                <span>Browse All</span>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Top Rated</span>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-2 pt-4">
              {activeSliders.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Hero Image with Slider */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {activeSliders.map((slide) => (
                  <div key={slide.id} className="w-full flex-shrink-0">
                    <img
                      src={slide.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'}
                      alt={slide.title || 'Slider image'}
                      className="w-full h-[350px] object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {activeSliders.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </section>
  )
}
