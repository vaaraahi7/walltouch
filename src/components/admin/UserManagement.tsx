'use client'

import { useState, useEffect } from 'react'
import { Users, Search, Filter, MapPin, ShoppingBag, Ban, CheckCircle, Mail, Phone, Calendar } from '../../lib/icons'

export interface User {
  id: string
  email: string
  fullName: string
  phone?: string
  avatar?: string
  location: {
    city: string
    state: string
    country: string
  }
  status: 'active' | 'blocked' | 'pending'
  orderCount: number
  totalSpent: number
  lastOrderDate?: string
  registrationDate: string
  lastLogin?: string
  preferences: {
    newsletter: boolean
    smsUpdates: boolean
  }
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'rajesh@example.com',
    fullName: 'Rajesh Kumar',
    phone: '+91 9876543210',
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India'
    },
    status: 'active',
    orderCount: 5,
    totalSpent: 12500,
    lastOrderDate: new Date().toISOString(),
    registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date().toISOString(),
    preferences: {
      newsletter: true,
      smsUpdates: true
    }
  },
  {
    id: '2',
    email: 'priya@example.com',
    fullName: 'Priya Sharma',
    phone: '+91 9876543211',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India'
    },
    status: 'active',
    orderCount: 3,
    totalSpent: 8500,
    lastOrderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    preferences: {
      newsletter: true,
      smsUpdates: false
    }
  },
  {
    id: '3',
    email: 'amit@example.com',
    fullName: 'Amit Patel',
    phone: '+91 9876543212',
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India'
    },
    status: 'blocked',
    orderCount: 1,
    totalSpent: 2500,
    lastOrderDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    registrationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    preferences: {
      newsletter: false,
      smsUpdates: false
    }
  }
]

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [sortBy, setSortBy] = useState('registrationDate')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  useEffect(() => {
    let filtered = users

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.includes(searchQuery)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter)
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(user => user.location.state === locationFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.fullName.localeCompare(b.fullName)
        case 'orderCount':
          return b.orderCount - a.orderCount
        case 'totalSpent':
          return b.totalSpent - a.totalSpent
        case 'registrationDate':
        default:
          return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
      }
    })

    setFilteredUsers(filtered)
  }, [users, searchQuery, statusFilter, locationFilter, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'blocked': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />
      case 'blocked': return <Ban className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ))
  }

  const exportUserEmails = () => {
    const emails = filteredUsers.map(user => user.email).join('\n')
    const blob = new Blob([emails], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'user-emails.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const uniqueStates = Array.from(new Set(users.map(user => user.location.state)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={exportUserEmails}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export Emails
          </button>
          <span className="text-sm text-gray-600">
            Total Users: {filteredUsers.length}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.reduce((sum, user) => sum + user.orderCount, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Mail className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.preferences.newsletter).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="registrationDate">Registration Date</option>
              <option value="name">Name</option>
              <option value="orderCount">Order Count</option>
              <option value="totalSpent">Total Spent</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setLocationFilter('all')
                setSortBy('registrationDate')
              }}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.fullName.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500">
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <div>
                        <div className="text-sm text-gray-900">
                          {user.location.city}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.location.state}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.orderCount} orders
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{user.totalSpent.toLocaleString()} spent
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="ml-1 capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
