'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package, Calendar, Download } from '../../lib/icons'

interface SalesData {
  date: string
  sales: number
  orders: number
  customers: number
}

interface ProductData {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('7days')
  
  // Mock analytics data
  const salesData: SalesData[] = [
    { date: '2024-12-19', sales: 15000, orders: 12, customers: 8 },
    { date: '2024-12-20', sales: 22000, orders: 18, customers: 15 },
    { date: '2024-12-21', sales: 18000, orders: 14, customers: 12 },
    { date: '2024-12-22', sales: 25000, orders: 20, customers: 18 },
    { date: '2024-12-23', sales: 30000, orders: 25, customers: 22 },
    { date: '2024-12-24', sales: 35000, orders: 28, customers: 25 },
    { date: '2024-12-25', sales: 40000, orders: 32, customers: 28 }
  ]

  const bestSellingProducts: ProductData[] = [
    {
      id: '1',
      name: 'Premium Floral Wallpaper',
      sales: 45,
      revenue: 54000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'
    },
    {
      id: '2',
      name: 'Venetian Blinds',
      sales: 32,
      revenue: 112000,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'
    },
    {
      id: '3',
      name: 'Modern Geometric Wallpaper',
      sales: 28,
      revenue: 33600,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'
    }
  ]

  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0)
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0)
  const totalCustomers = salesData.reduce((sum, day) => sum + day.customers, 0)
  const avgOrderValue = totalSales / totalOrders

  const abandonedCarts = [
    { id: '1', customerEmail: 'john@example.com', items: 3, value: 2500, date: '2024-12-25' },
    { id: '2', customerEmail: 'sarah@example.com', items: 1, value: 1200, date: '2024-12-24' },
    { id: '3', customerEmail: 'mike@example.com', items: 2, value: 3500, date: '2024-12-23' }
  ]

  const exportReport = () => {
    const reportData = {
      period: dateRange,
      summary: {
        totalSales,
        totalOrders,
        totalCustomers,
        avgOrderValue
      },
      dailySales: salesData,
      bestSellingProducts,
      abandonedCarts
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${dateRange}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalSales.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% from last period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-sm text-blue-600">+8% from last period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              <p className="text-sm text-purple-600">+15% from last period</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{Math.round(avgOrderValue).toLocaleString()}</p>
              <p className="text-sm text-orange-600">+5% from last period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Sales</h3>
        <div className="h-64 flex items-end space-x-2">
          {salesData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t"
                style={{
                  height: `${(day.sales / Math.max(...salesData.map(d => d.sales))) * 200}px`
                }}
              ></div>
              <div className="text-xs text-gray-600 mt-2">
                {new Date(day.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </div>
              <div className="text-xs font-medium text-gray-900">
                ₹{(day.sales / 1000).toFixed(0)}k
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Selling Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Best Selling Products</h3>
          <div className="space-y-4">
            {bestSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                    {index + 1}
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.sales} units sold
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  ₹{product.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abandoned Carts */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Abandoned Carts</h3>
          <div className="space-y-4">
            {abandonedCarts.map((cart) => (
              <div key={cart.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{cart.customerEmail}</p>
                  <p className="text-sm text-gray-500">
                    {cart.items} items • ₹{cart.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(cart.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200">
                  Send Reminder
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Recovery Opportunity:</strong> ₹{abandonedCarts.reduce((sum, cart) => sum + cart.value, 0).toLocaleString()} in potential revenue
            </p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">3.2%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+0.5% from last period</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Return Rate</p>
              <p className="text-2xl font-bold text-gray-900">2.1%</p>
            </div>
            <Package className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">-0.3% from last period</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Lifetime Value</p>
              <p className="text-2xl font-bold text-gray-900">₹8,500</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">+₹200 from last period</p>
        </div>
      </div>
    </div>
  )
}
