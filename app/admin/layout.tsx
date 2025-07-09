import type { Metadata } from "next"
import { Toaster } from "react-hot-toast"
import { GlobalStoreProvider } from "../../src/contexts/GlobalStoreContext"
import { AdminProvider } from "../../src/contexts/AdminContext"

export const metadata: Metadata = {
  title: "Wall Touch Admin Panel",
  description: "Admin panel for Wall Touch - Manage wallpapers, blinds, and store settings",
  robots: "noindex, nofollow",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GlobalStoreProvider>
      <AdminProvider>
        <div className="min-h-screen bg-gray-50">
          {children}
          <Toaster position="top-right" />
        </div>
      </AdminProvider>
    </GlobalStoreProvider>
  )
}
