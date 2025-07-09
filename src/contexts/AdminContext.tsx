'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Types
export interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  status: 'active' | 'inactive'
  description?: string
  image?: string
  sku?: string
  featured?: boolean
}

export interface Category {
  id: number
  name: string
  description?: string
  products: number
  status: 'active' | 'inactive'
  image?: string
}

export interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  date: string
  items: number
  address?: string
  phone?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  orders: number
  totalSpent: number
  joinDate: string
  status: 'active' | 'inactive'
}

export interface AdminStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenueGrowth: string
  ordersGrowth: string
  productsGrowth: string
  customersGrowth: string
}

interface AdminContextType {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  
  // Categories
  categories: Category[]
  addCategory: (category: Omit<Category, 'id' | 'products'>) => void
  updateCategory: (id: number, category: Partial<Category>) => void
  deleteCategory: (id: number) => void
  
  // Orders
  orders: Order[]
  updateOrderStatus: (id: string, status: Order['status']) => void
  
  // Customers
  customers: Customer[]
  
  // Stats
  stats: AdminStats
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  // Initial data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 2999,
      stock: 25,
      category: 'Electronics',
      status: 'active',
      description: 'Premium quality wireless headphones with noise cancellation',
      sku: 'WBH-001',
      featured: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 8999,
      stock: 15,
      category: 'Electronics',
      status: 'active',
      description: 'Advanced fitness tracking watch with heart rate monitor',
      sku: 'SFW-002',
      featured: true
    },
    {
      id: 3,
      name: 'Premium Cotton T-Shirt',
      price: 799,
      stock: 50,
      category: 'Clothing',
      status: 'active',
      description: 'Comfortable cotton t-shirt made from organic materials',
      sku: 'PCT-003',
      featured: false
    },
    {
      id: 4,
      name: 'Yoga Mat Premium',
      price: 2499,
      stock: 20,
      category: 'Sports',
      status: 'active',
      description: 'High-quality yoga mat with excellent grip',
      sku: 'YMP-004',
      featured: true
    }
  ])

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets', products: 2, status: 'active' },
    { id: 2, name: 'Clothing', description: 'Fashion and apparel', products: 1, status: 'active' },
    { id: 3, name: 'Sports', description: 'Sports and fitness equipment', products: 1, status: 'active' },
    { id: 4, name: 'Home & Garden', description: 'Home and garden supplies', products: 0, status: 'active' },
    { id: 5, name: 'Books', description: 'Books and educational materials', products: 0, status: 'active' },
    { id: 6, name: 'Accessories', description: 'Fashion accessories and more', products: 0, status: 'active' }
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 2999,
      status: 'delivered',
      paymentStatus: 'paid',
      date: '2024-01-15',
      items: 2,
      address: 'Mumbai, Maharashtra',
      phone: '+91 9876543210'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 1799,
      status: 'shipped',
      paymentStatus: 'paid',
      date: '2024-01-14',
      items: 1,
      address: 'Delhi, Delhi',
      phone: '+91 9876543211'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      total: 3499,
      status: 'processing',
      paymentStatus: 'paid',
      date: '2024-01-13',
      items: 3,
      address: 'Bangalore, Karnataka',
      phone: '+91 9876543212'
    }
  ])

  const [customers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      location: 'Mumbai, Maharashtra',
      orders: 5,
      totalSpent: 12500,
      joinDate: '2023-12-15',
      status: 'active'
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      location: 'Delhi, Delhi',
      orders: 3,
      totalSpent: 8900,
      joinDate: '2024-01-02',
      status: 'active'
    },
    {
      id: 'CUST-003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 9876543212',
      location: 'Bangalore, Karnataka',
      orders: 8,
      totalSpent: 25600,
      joinDate: '2023-11-20',
      status: 'active'
    }
  ])

  const stats: AdminStats = {
    totalRevenue: 245678,
    totalOrders: 1234,
    totalProducts: products.length,
    totalCustomers: customers.length,
    revenueGrowth: '+12.5%',
    ordersGrowth: '+8.2%',
    productsGrowth: '+3.1%',
    customersGrowth: '+15.3%'
  }

  // Product functions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now()
    }
    setProducts(prev => [...prev, newProduct])
    
    // Update category product count
    setCategories(prev => prev.map(cat => 
      cat.name === productData.category 
        ? { ...cat, products: cat.products + 1 }
        : cat
    ))
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ))
  }

  const deleteProduct = (id: number) => {
    const product = products.find(p => p.id === id)
    if (product) {
      setProducts(prev => prev.filter(p => p.id !== id))
      
      // Update category product count
      setCategories(prev => prev.map(cat => 
        cat.name === product.category 
          ? { ...cat, products: Math.max(0, cat.products - 1) }
          : cat
      ))
    }
  }

  // Category functions
  const addCategory = (categoryData: Omit<Category, 'id' | 'products'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now(),
      products: 0
    }
    setCategories(prev => [...prev, newCategory])
  }

  const updateCategory = (id: number, categoryData: Partial<Category>) => {
    setCategories(prev => prev.map(category => 
      category.id === id ? { ...category, ...categoryData } : category
    ))
  }

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(category => category.id !== id))
  }

  // Order functions
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status } : order
    ))
  }

  const value: AdminContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    customers,
    stats
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
