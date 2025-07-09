'use client'

import { useGlobalStore } from '../../contexts/GlobalStoreContext'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function SEOHead({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website' 
}: SEOHeadProps) {
  const { siteSettings } = useGlobalStore()

  const seoTitle = title || siteSettings.seo?.metaTitle || `${siteSettings.siteName} - Premium Wallpapers & Blinds`
  const seoDescription = description || siteSettings.seo?.metaDescription || 'Transform your home with Wall Touch premium wallpapers and blinds. Quality products, expert installation, and exceptional service.'
  const seoKeywords = keywords || siteSettings.seo?.metaKeywords || 'wallpaper, blinds, home decor, interior design, wall touch'
  const seoImage = image || `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`
  const seoUrl = url || process.env.NEXT_PUBLIC_APP_URL

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={siteSettings.siteName} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={siteSettings.siteName} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content={siteSettings.primaryColor || '#3B82F6'} />
      <link rel="canonical" href={seoUrl} />
      
      {/* Favicon */}
      <link rel="icon" href={siteSettings.favicon || '/favicon.ico'} />
      <link rel="apple-touch-icon" href={siteSettings.favicon || '/favicon.ico'} />
      
      {/* Google Analytics */}
      {siteSettings.seo?.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${siteSettings.seo.googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${siteSettings.seo.googleAnalyticsId}');
              `,
            }}
          />
        </>
      )}
      
      {/* Google Search Console Verification */}
      {siteSettings.seo?.googleSearchConsole && (
        <meta name="google-site-verification" content={siteSettings.seo.googleSearchConsole} />
      )}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": siteSettings.siteName,
            "description": seoDescription,
            "url": seoUrl,
            "logo": siteSettings.logo,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": siteSettings.contactInfo?.phone,
              "contactType": "customer service",
              "email": siteSettings.contactInfo?.email
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressRegion": "Telangana",
              "addressCountry": "IN"
            },
            "sameAs": [
              siteSettings.socialLinks?.facebook,
              siteSettings.socialLinks?.twitter,
              siteSettings.socialLinks?.instagram
            ].filter(Boolean)
          })
        }}
      />
    </>
  )
}
