'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated, getAdminUser } from '../../src/lib/admin-auth'
import { AdminDashboard } from '../../src/components/admin/AdminDashboard'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // Check authentication only once
    if (authChecked) return

    const checkAuth = () => {
      const isAuth = isAdminAuthenticated()
      const user = getAdminUser()

      if (!isAuth || !user) {
        router.replace('/admin/login')
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
      setAuthChecked(true)
    }

    checkAuth()
  }, [router, authChecked])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <AdminDashboard />
}