'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  LogOut,
  Package,
  Settings,
  ChevronDown
} from '../../lib/icons'
import { useCartStore } from '../../store/cart'
import { useWishlistStore } from '../../store/wishlist'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import { useAuthStore } from '../../store/auth'
import { createSupabaseClient } from '../../lib/supabase'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const supabase = createSupabaseClient()
  
  const { getTotalItems, openCart } = useCartStore()
  const { getTotalItems: getWishlistItems } = useWishlistStore()
  const { user, profile, signOut } = useAuthStore()
  const { siteSettings } = useGlobalStore()
  
  const cartItemsCount = getTotalItems()
  const wishlistItemsCount = getWishlistItems()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    signOut()
    setIsUserMenuOpen(false)
    router.push('/')
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">{siteSettings.siteName}</span>
          </Link>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Heart className="h-5 w-5" />
              {wishlistItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">
                    {profile?.full_name || 'Account'}
                  </span>
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm">Sign In</span>
                </Link>
              )}

              {/* User dropdown */}
              {isUserMenuOpen && user && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md">
                  <Link
                    href="/account"
                    className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Account Settings</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package className="h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center space-x-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex h-12 items-center space-x-6 border-t">
          {navigation.map((item) => {
            if (item.name === 'Products') {
              return (
                <div key={item.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                    className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Products</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {isProductsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <Link
                          href="/products"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProductsDropdownOpen(false)}
                        >
                          All Products
                        </Link>
                        <Link
                          href="/products?category=wallpapers"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProductsDropdownOpen(false)}
                        >
                          Wallpapers
                        </Link>
                        <Link
                          href="/products?category=blinds"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProductsDropdownOpen(false)}
                        >
                          Window Blinds
                        </Link>
                        <Link
                          href="/products?category=clothing"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProductsDropdownOpen(false)}
                        >
                          Clothing
                        </Link>
                        <Link
                          href="/products?category=electronics"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProductsDropdownOpen(false)}
                        >
                          Electronics
                        </Link>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <Link
                            href="/categories"
                            className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                            onClick={() => setIsProductsDropdownOpen(false)}
                          >
                            View All Categories
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </form>

            {/* Mobile navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
