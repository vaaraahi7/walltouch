'use client'

import { usePathname } from 'next/navigation'
import { Header } from './layout/header'
import { Footer } from './layout/footer'
import { CartSidebar } from './cart/cart-sidebar'
import { AIChatbot } from './chatbot/AIChatbot'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Admin pages: no header, footer, chatbot, or cart
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    )
  }

  // Public pages: full layout with header, footer, chatbot, cart
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartSidebar />
      <AIChatbot />
    </div>
  )
}
