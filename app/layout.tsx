import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../src/components/providers";
import { ClientLayout } from "../src/components/ClientLayout";
import { Toaster } from "react-hot-toast";
import { GlobalStoreProvider } from "../src/contexts/GlobalStoreContext";



export const metadata: Metadata = {
  title: "Wall Touch - Premium Wallpapers & Blinds",
  description: "Transform your home with Wall Touch premium wallpapers and blinds. Quality products, expert installation, and exceptional service across India.",
  keywords: "wallpaper, blinds, home decor, interior design, custom wallpaper, window blinds, wall touch, India",
  authors: [{ name: "Wall Touch" }],
  creator: "Wall Touch",
  publisher: "Wall Touch",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Wall Touch - Premium Wallpapers & Blinds",
    description: "Transform your home with Wall Touch premium wallpapers and blinds across India",
    siteName: "Wall Touch",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wall Touch - Premium Wallpapers & Blinds",
    description: "Transform your home with Wall Touch premium wallpapers and blinds across India",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <GlobalStoreProvider>
          <Providers>
            <ClientLayout>
              {children}
            </ClientLayout>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </Providers>
        </GlobalStoreProvider>
      </body>
    </html>
  );
}
