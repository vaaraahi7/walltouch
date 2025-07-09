'use client'

import { useState } from 'react'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  Home,
  Filter,
  DollarSign,
  TrendingUp,
  FileText
} from '../../lib/icons'

// Import admin components
import { AdminOverview } from './AdminOverview'
import { AdminProducts } from './AdminProducts'
import { AdminCategories } from './AdminCategories'
import { AdminOrders } from './AdminOrders'
import { AdminCustomers } from './AdminCustomers'
import { AdminSettings } from './AdminSettings'
import { AdminHomepage } from './AdminHomepage'
import { FeaturedProductsSettings } from './FeaturedProductsSettings'
import { BlogManagement } from './BlogManagement'
import { WallpaperPricing } from './WallpaperPricing'

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { products, categories } = useGlobalStore()

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Filter },
    { id: 'featured', label: 'Featured Products', icon: TrendingUp },
    { id: 'wallpaper-pricing', label: 'Wallpaper Pricing', icon: DollarSign },
    { id: 'blog', label: 'Blog Management', icon: FileText },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />
      case 'homepage':
        return <AdminHomepage />
      case 'products':
        return <AdminProducts />
      case 'categories':
        return <AdminCategories />
      case 'featured':
        return <FeaturedProductsSettings />
      case 'wallpaper-pricing':
        return <WallpaperPricing />
      case 'blog':
        return <BlogManagement />
      case 'orders':
        return <AdminOrders />
      case 'customers':
        return <AdminCustomers />
      case 'settings':
        return <AdminSettings />
      default:
        return <AdminOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@modernstore.com</p>
            </div>
          </div>
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {activeTab}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <a
                href="/"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Home className="h-4 w-4 mr-1" />
                View Store
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
