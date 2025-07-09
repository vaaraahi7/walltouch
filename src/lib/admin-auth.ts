// Admin authentication system
export interface AdminUser {
  id: string
  username: string
  email: string
  role: 'super_admin' | 'admin' | 'manager'
  permissions: string[]
  createdAt: string
  lastLogin?: string
}

// Default admin users
const defaultAdmins: AdminUser[] = [
  {
    id: 'admin-1',
    username: 'Vaaraahi7',
    email: 'admin@walltouch.com',
    role: 'super_admin',
    permissions: ['all'],
    createdAt: new Date().toISOString()
  }
]

// Admin credentials (in production, use proper authentication)
const adminCredentials = {
  'Vaaraahi7': 'Admin@121512'
}

export const authenticateAdmin = (username: string, password: string): AdminUser | null => {
  if (adminCredentials[username as keyof typeof adminCredentials] === password) {
    return defaultAdmins.find(admin => admin.username === username) || null
  }
  return null
}

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false

  const token = localStorage.getItem('admin_token')
  if (!token) return false

  try {
    const admin = JSON.parse(token)
    // Strict validation
    const isValid = admin &&
                   admin.username === 'Vaaraahi7' &&
                   admin.loginTime &&
                   (Date.now() - admin.loginTime) < 24 * 60 * 60 * 1000 // 24 hours

    if (!isValid) {
      localStorage.removeItem('admin_token')
      return false
    }

    return true
  } catch {
    localStorage.removeItem('admin_token')
    return false
  }
}

export const setAdminToken = (admin: AdminUser): void => {
  if (typeof window === 'undefined') return
  const adminWithTime = {
    ...admin,
    loginTime: Date.now()
  }
  localStorage.setItem('admin_token', JSON.stringify(adminWithTime))
}

export const getAdminUser = (): AdminUser | null => {
  if (typeof window === 'undefined') return null
  const token = localStorage.getItem('admin_token')
  return token ? JSON.parse(token) : null
}

export const clearAdminToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_token')
}

export const forceLogout = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_session')
  sessionStorage.clear()
  // Force page reload to clear any cached state
  window.location.href = '/admin/login'
}

export const hasPermission = (permission: string): boolean => {
  const admin = getAdminUser()
  if (!admin) return false
  return admin.permissions.includes('all') || admin.permissions.includes(permission)
}
