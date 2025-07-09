'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

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
  images?: string[]
  rating?: number
  originalPrice?: number
  slug?: string
  sku?: string
  featured?: boolean
  // Custom pricing fields
  customPricing?: {
    type: 'wallpaper' | 'blinds' | 'regular-wallpaper' | 'standard'
    mediaOptions?: { name: string; price: number }[]
    rollSize?: number // for regular wallpapers (sq ft per roll)
    pricePerSqFt?: number // for blinds (price per square foot)
  }
}

export interface Category {
  id: number
  name: string
  description?: string
  products: number
  status: 'active' | 'inactive'
  image?: string
  parentId?: number
  subcategories?: Category[]
}

export interface SliderItem {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  active: boolean
}

export interface FeaturedProductSettings {
  id: number
  categoryId: number
  categoryName: string
  maxProducts: number
  showOnHomepage: boolean
  sortBy: 'newest' | 'price_low' | 'price_high' | 'rating' | 'manual'
  displayStyle: 'grid' | 'carousel' | 'list'
  enabled: boolean
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image: string
  status: 'published' | 'draft'
  featured: boolean
  publishedAt: string
  updatedAt: string
}

export interface CMSPage {
  id: string
  title: string
  slug: string
  content: string
  metaTitle: string
  metaDescription: string
  status: 'published' | 'draft'
  lastModified: string
}

export interface SiteSettings {
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  headerStyle: 'default' | 'minimal' | 'centered'
  footerStyle: 'default' | 'minimal' | 'detailed'
  showSearch: boolean
  showWishlist: boolean
  showCart: boolean
  socialLinks: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
  contactInfo: {
    email: string
    phone: string
    whatsapp: string
    address: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalyticsId?: string
    googleSearchConsole?: string
  }
  gst: {
    enabled: boolean
    rate: number
    gstNumber: string
  }
  payment: {
    enableCOD: boolean
    enableUPI: boolean
    enableCards: boolean
  }
  // Footer Settings
  footerStoreName?: string
  footerStoreDescription?: string
  footerAddress?: string
  footerEmail?: string
  footerPhone?: string
  footerCopyright?: string
  // Chatbot Settings
  chatbot?: {
    enabled: boolean
    welcomeMessage: string
  }
  // Popup Settings
  popup?: {
    enabled: boolean
    type: 'discount' | 'newsletter' | 'announcement'
    title: string
    description: string
    image?: string
    discountCode?: string
    actionText: string
    actionUrl: string
    closeText: string
    delay: number
    showDaily: boolean
    footerText?: string
  }
  // Header Settings
  headerLogo?: string
  headerMenuItems?: Array<{
    name: string
    href: string
    active: boolean
  }>
  // Product Tabs
  productTabs?: Array<{
    name: string
    key: string
    active: boolean
    order: number
  }>
  // Shipping Settings
  shipping?: {
    freeThreshold: number
    standardRate: number
    expressRate: number
  }
  // Email Settings
  email?: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
  }
}

interface GlobalStoreContextType {
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
  
  // Sliders
  sliders: SliderItem[]
  addSlider: (slider: Omit<SliderItem, 'id'>) => void
  updateSlider: (id: number, slider: Partial<SliderItem>) => void
  deleteSlider: (id: number) => void

  // Featured Products Settings
  featuredProductSettings: FeaturedProductSettings[]
  addFeaturedProductSetting: (setting: Omit<FeaturedProductSettings, 'id'>) => void
  updateFeaturedProductSetting: (id: number, setting: Partial<FeaturedProductSettings>) => void
  deleteFeaturedProductSetting: (id: number) => void

  // Blog Posts
  blogPosts: BlogPost[]
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void
  updateBlogPost: (id: number, post: Partial<BlogPost>) => void
  deleteBlogPost: (id: number) => void

  // CMS Pages
  cmsPages: CMSPage[]
  addCMSPage: (page: Omit<CMSPage, 'id'>) => void
  updateCMSPage: (id: string, page: Partial<CMSPage>) => void
  deleteCMSPage: (id: string) => void

  // Site Settings
  siteSettings: SiteSettings
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
}

const GlobalStoreContext = createContext<GlobalStoreContextType | undefined>(undefined)

export function GlobalStoreProvider({ children }: { children: ReactNode }) {
  // Load data from localStorage on client side
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [sliders, setSliders] = useState<SliderItem[]>([])
  const [featuredProductSettings, setFeaturedProductSettings] = useState<FeaturedProductSettings[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [cmsPages, setCmsPages] = useState<CMSPage[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'Wall Touch',
    siteDescription: 'Your one-stop destination for premium wallpapers and blinds',
    logo: '/logo.png',
    favicon: '/favicon.ico',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    headerStyle: 'default',
    footerStyle: 'default',
    showSearch: true,
    showWishlist: true,
    showCart: true,
    socialLinks: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    },
    contactInfo: {
      email: 'contact@walltouch.com',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      address: 'Mumbai, Maharashtra, India'
    },
    seo: {
      metaTitle: 'Wall Touch - Premium Wallpapers & Blinds',
      metaDescription: 'Transform your home with Wall Touch premium wallpapers and blinds. Quality products, expert installation, and exceptional service.',
      metaKeywords: 'wallpaper, blinds, home decor, interior design, wall touch'
    },
    gst: {
      enabled: false,
      rate: 18,
      gstNumber: ''
    },
    payment: {
      enableCOD: true,
      enableUPI: true,
      enableCards: true
    },
    chatbot: {
      enabled: true,
      welcomeMessage: 'Hello! Welcome to Wall Touch. How can I help you today?'
    },
    popup: {
      enabled: false,
      type: 'discount',
      title: 'Special Offer!',
      description: 'Get 20% off on your first order',
      discountCode: 'WELCOME20',
      actionText: 'Shop Now',
      actionUrl: '/products',
      closeText: 'Maybe Later',
      delay: 3000,
      showDaily: false,
      footerText: 'Limited time offer'
    }
  })

  // Initialize data on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load from localStorage or set defaults
      const savedProducts = localStorage.getItem('modernstore_products')
      const savedCategories = localStorage.getItem('modernstore_categories')
      const savedSliders = localStorage.getItem('modernstore_sliders')
      const savedFeaturedSettings = localStorage.getItem('modernstore_featured_settings')
      const savedBlogPosts = localStorage.getItem('modernstore_blog_posts')
      const savedCmsPages = localStorage.getItem('modernstore_cms_pages')
      const savedSettings = localStorage.getItem('modernstore_settings')

      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts)
        console.log('Loading saved products:', parsedProducts.length)
        setProducts(parsedProducts)
      } else {
        console.log('No saved products found, loading defaults')
        // Default products
        const defaultProducts = [
          {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 2999,
            stock: 25,
            category: 'Audio',
            status: 'active' as const,
            description: 'Premium quality wireless headphones with noise cancellation',
            sku: 'WBH-001',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            featured: true
          },
          {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 8999,
            stock: 15,
            category: 'Wearables',
            status: 'active' as const,
            description: 'Advanced fitness tracking watch with heart rate monitor',
            sku: 'SFW-002',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            featured: true
          },
          {
            id: 3,
            name: 'Premium Cotton T-Shirt',
            price: 799,
            stock: 50,
            category: 'Men\'s Clothing',
            status: 'active' as const,
            description: 'Comfortable cotton t-shirt made from organic materials',
            sku: 'PCT-003',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            featured: false
          },
          {
            id: 4,
            name: 'Custom Floral Wallpaper',
            price: 70,
            stock: 100,
            category: 'Customized Wallpapers',
            status: 'active' as const,
            description: 'Beautiful custom floral wallpaper with media options',
            sku: 'CW-001',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
            featured: true,
            customPricing: {
              type: 'wallpaper' as const,
              mediaOptions: [
                { name: 'Non woven wallpapers', price: 70 },
                { name: 'Vinyl stickers', price: 80 }
              ]
            }
          },
          {
            id: 5,
            name: 'Regular Window Blinds',
            price: 60,
            stock: 50,
            category: 'Regular blinds',
            status: 'active' as const,
            description: 'High-quality regular window blinds with custom sizing',
            sku: 'BL-001',
            image: 'https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?w=400&h=400&fit=crop',
            featured: true,
            customPricing: {
              type: 'blinds' as const,
              pricePerSqFt: 60
            }
          },
          {
            id: 7,
            name: 'Customized Window Blinds',
            price: 75,
            stock: 30,
            category: 'Customized blinds',
            status: 'active' as const,
            description: 'Premium customized window blinds with custom sizing',
            sku: 'BL-002',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
            featured: false,
            customPricing: {
              type: 'blinds' as const,
              pricePerSqFt: 75
            }
          },
          {
            id: 8,
            name: 'Zebra Window Blinds',
            price: 90,
            stock: 25,
            category: 'Zebra blinds',
            status: 'active' as const,
            description: 'Modern zebra window blinds with custom sizing',
            sku: 'BL-003',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
            featured: false,
            customPricing: {
              type: 'blinds' as const,
              pricePerSqFt: 90
            }
          },
          {
            id: 6,
            name: 'Classic Pattern Wallpaper Roll',
            price: 1500,
            stock: 30,
            category: 'Regular Wallpapers',
            status: 'active' as const,
            description: 'Classic pattern wallpaper sold by rolls (50 sq ft coverage per roll)',
            sku: 'RW-001',
            image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
            featured: true,
            customPricing: {
              type: 'regular-wallpaper' as const,
              rollSize: 50
            }
          }
        ]
        setProducts(defaultProducts)
        localStorage.setItem('modernstore_products', JSON.stringify(defaultProducts))
      }

      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories)
        console.log('Loading saved categories:', parsedCategories.length)
        setCategories(parsedCategories)
      } else {
        console.log('No saved categories found, loading defaults')
        // Default categories with subcategories
        const defaultCategories = [
          {
            id: 1,
            name: 'Electronics',
            description: 'Electronic devices and gadgets',
            products: 2,
            status: 'active' as const,
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop'
          },
          {
            id: 2,
            name: 'Smartphones',
            description: 'Mobile phones and accessories',
            products: 0,
            status: 'active' as const,
            parentId: 1,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
          },
          {
            id: 3,
            name: 'Laptops',
            description: 'Laptops and computers',
            products: 0,
            status: 'active' as const,
            parentId: 1,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
          },
          {
            id: 4,
            name: 'Audio',
            description: 'Headphones, speakers, and audio equipment',
            products: 1,
            status: 'active' as const,
            parentId: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
          },
          {
            id: 5,
            name: 'Clothing',
            description: 'Fashion and apparel',
            products: 1,
            status: 'active' as const,
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'
          },
          {
            id: 6,
            name: 'Men\'s Clothing',
            description: 'Men\'s fashion and apparel',
            products: 1,
            status: 'active' as const,
            parentId: 5,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
          },
          {
            id: 7,
            name: 'Women\'s Clothing',
            description: 'Women\'s fashion and apparel',
            products: 0,
            status: 'active' as const,
            parentId: 5,
            image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
          },
          {
            id: 8,
            name: 'Sports & Fitness',
            description: 'Sports and fitness equipment',
            products: 1,
            status: 'active' as const,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
          },
          {
            id: 9,
            name: 'Fitness Equipment',
            description: 'Gym and fitness equipment',
            products: 0,
            status: 'active' as const,
            parentId: 8,
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop'
          },
          {
            id: 10,
            name: 'Wearables',
            description: 'Fitness trackers and smartwatches',
            products: 1,
            status: 'active' as const,
            parentId: 8,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
          },
          {
            id: 11,
            name: 'Home & Garden',
            description: 'Home and garden supplies',
            products: 0,
            status: 'active' as const,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
          }
        ]
        setCategories(defaultCategories)
        localStorage.setItem('modernstore_categories', JSON.stringify(defaultCategories))
      }

      if (savedSliders) {
        setSliders(JSON.parse(savedSliders))
      } else {
        // Default sliders
        const defaultSliders = [
          {
            id: 1,
            title: 'Transform Your Home',
            subtitle: 'Premium Wallpapers',
            description: 'Discover our exclusive collection of premium wallpapers for every room',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
            buttonText: 'Shop Wallpapers',
            buttonLink: '/products?category=Wallpapers',
            active: true
          },
          {
            id: 2,
            title: 'Custom Blinds',
            subtitle: 'Perfect Fit Guaranteed',
            description: 'Get custom-made blinds with professional installation and warranty',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
            buttonText: 'Explore Blinds',
            buttonLink: '/products?category=Blinds',
            active: true
          },
          {
            id: 3,
            title: 'New Year Special',
            subtitle: '30% Off Installation',
            description: 'Limited time offer - Get 30% off on professional installation services',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
            buttonText: 'Get Quote',
            buttonLink: '/contact',
            active: true
          }
        ]
        setSliders(defaultSliders)
        localStorage.setItem('modernstore_sliders', JSON.stringify(defaultSliders))
      }

      if (savedFeaturedSettings) {
        setFeaturedProductSettings(JSON.parse(savedFeaturedSettings))
      } else {
        // Default featured product settings
        const defaultFeaturedSettings: FeaturedProductSettings[] = [
          {
            id: 1,
            categoryId: 1,
            categoryName: 'Electronics',
            maxProducts: 4,
            showOnHomepage: true,
            sortBy: 'newest',
            displayStyle: 'grid',
            enabled: true
          },
          {
            id: 2,
            categoryId: 5,
            categoryName: 'Clothing',
            maxProducts: 2,
            showOnHomepage: true,
            sortBy: 'rating',
            displayStyle: 'grid',
            enabled: true
          }
        ]
        setFeaturedProductSettings(defaultFeaturedSettings)
        localStorage.setItem('modernstore_featured_settings', JSON.stringify(defaultFeaturedSettings))
      }

      if (savedBlogPosts) {
        setBlogPosts(JSON.parse(savedBlogPosts))
      } else {
        // Default blog posts
        const defaultBlogPosts: BlogPost[] = [
          {
            id: 1,
            title: 'Top 10 Wallpaper Trends for 2024',
            slug: 'wallpaper-trends-2024',
            excerpt: 'Discover the latest wallpaper trends that are transforming homes across India. From bold patterns to subtle textures.',
            content: 'Full blog post content about wallpaper trends...',
            author: 'Wall Touch Team',
            category: 'Trends',
            tags: ['wallpaper', 'trends', 'interior design'],
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop',
            status: 'published',
            featured: true,
            publishedAt: '2024-01-15',
            updatedAt: '2024-01-15'
          }
        ]
        setBlogPosts(defaultBlogPosts)
        localStorage.setItem('modernstore_blog_posts', JSON.stringify(defaultBlogPosts))
      }

      if (savedCmsPages) {
        setCmsPages(JSON.parse(savedCmsPages))
      } else {
        // Default CMS pages
        const defaultCmsPages: CMSPage[] = [
          {
            id: 'about',
            title: 'About Wall Touch',
            slug: 'about',
            content: `# About Wall Touch\n\nWelcome to Wall Touch, your premier destination for high-quality wallpapers and blinds in India.\n\n## Our Story\n\nFounded with a passion for transforming homes, Wall Touch has been serving customers across India with premium wallpapers and custom blinds since 2020.`,
            metaTitle: 'About Wall Touch - Premium Wallpapers & Blinds',
            metaDescription: 'Learn about Wall Touch, your trusted partner for premium wallpapers and custom blinds across India.',
            status: 'published',
            lastModified: new Date().toISOString()
          },
          {
            id: 'contact',
            title: 'Contact Us',
            slug: 'contact',
            content: `# Contact Wall Touch\n\nGet in touch with us for all your wallpaper and blinds needs.\n\n## Contact Information\n\n**Phone:** +91 9876543210\n**Email:** info@walltouch.com\n**Address:** Mumbai, Maharashtra, India`,
            metaTitle: 'Contact Us - Wall Touch',
            metaDescription: 'Get in touch with Wall Touch for premium wallpapers and blinds. Contact us for consultation and quotes.',
            status: 'published',
            lastModified: new Date().toISOString()
          }
        ]
        setCmsPages(defaultCmsPages)
        localStorage.setItem('modernstore_cms_pages', JSON.stringify(defaultCmsPages))
      }

      if (savedSettings) {
        setSiteSettings(JSON.parse(savedSettings))
      }
    }
  }, [])

  // Product functions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now()
    }
    const updatedProducts = [...products, newProduct]
    setProducts(updatedProducts)
    localStorage.setItem('modernstore_products', JSON.stringify(updatedProducts))
    
    // Update category product count
    const updatedCategories = categories.map(cat => 
      cat.name === productData.category 
        ? { ...cat, products: cat.products + 1 }
        : cat
    )
    setCategories(updatedCategories)
    localStorage.setItem('modernstore_categories', JSON.stringify(updatedCategories))
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    const updatedProducts = products.map(product => 
      product.id === id ? { ...product, ...productData } : product
    )
    setProducts(updatedProducts)
    localStorage.setItem('modernstore_products', JSON.stringify(updatedProducts))
  }

  const deleteProduct = (id: number) => {
    const product = products.find(p => p.id === id)
    if (product) {
      const updatedProducts = products.filter(p => p.id !== id)
      setProducts(updatedProducts)
      localStorage.setItem('modernstore_products', JSON.stringify(updatedProducts))
      
      // Update category product count
      const updatedCategories = categories.map(cat => 
        cat.name === product.category 
          ? { ...cat, products: Math.max(0, cat.products - 1) }
          : cat
      )
      setCategories(updatedCategories)
      localStorage.setItem('modernstore_categories', JSON.stringify(updatedCategories))
    }
  }

  // Category functions
  const addCategory = (categoryData: Omit<Category, 'id' | 'products'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now(),
      products: 0
    }
    const updatedCategories = [...categories, newCategory]
    setCategories(updatedCategories)
    localStorage.setItem('modernstore_categories', JSON.stringify(updatedCategories))
  }

  const updateCategory = (id: number, categoryData: Partial<Category>) => {
    const updatedCategories = categories.map(category => 
      category.id === id ? { ...category, ...categoryData } : category
    )
    setCategories(updatedCategories)
    localStorage.setItem('modernstore_categories', JSON.stringify(updatedCategories))
  }

  const deleteCategory = (id: number) => {
    const updatedCategories = categories.filter(category => category.id !== id)
    setCategories(updatedCategories)
    localStorage.setItem('modernstore_categories', JSON.stringify(updatedCategories))
  }

  // Slider functions
  const addSlider = (sliderData: Omit<SliderItem, 'id'>) => {
    const newSlider: SliderItem = {
      ...sliderData,
      id: Date.now()
    }
    const updatedSliders = [...sliders, newSlider]
    setSliders(updatedSliders)
    localStorage.setItem('modernstore_sliders', JSON.stringify(updatedSliders))
  }

  const updateSlider = (id: number, sliderData: Partial<SliderItem>) => {
    const updatedSliders = sliders.map(slider => 
      slider.id === id ? { ...slider, ...sliderData } : slider
    )
    setSliders(updatedSliders)
    localStorage.setItem('modernstore_sliders', JSON.stringify(updatedSliders))
  }

  const deleteSlider = (id: number) => {
    const updatedSliders = sliders.filter(slider => slider.id !== id)
    setSliders(updatedSliders)
    localStorage.setItem('modernstore_sliders', JSON.stringify(updatedSliders))
  }

  // Featured product settings functions
  const addFeaturedProductSetting = (settingData: Omit<FeaturedProductSettings, 'id'>) => {
    const newSetting: FeaturedProductSettings = {
      ...settingData,
      id: Date.now()
    }
    const updatedSettings = [...featuredProductSettings, newSetting]
    setFeaturedProductSettings(updatedSettings)
    localStorage.setItem('modernstore_featured_settings', JSON.stringify(updatedSettings))
  }

  const updateFeaturedProductSetting = (id: number, settingData: Partial<FeaturedProductSettings>) => {
    const updatedSettings = featuredProductSettings.map(setting =>
      setting.id === id ? { ...setting, ...settingData } : setting
    )
    setFeaturedProductSettings(updatedSettings)
    localStorage.setItem('modernstore_featured_settings', JSON.stringify(updatedSettings))
  }

  const deleteFeaturedProductSetting = (id: number) => {
    const updatedSettings = featuredProductSettings.filter(setting => setting.id !== id)
    setFeaturedProductSettings(updatedSettings)
    localStorage.setItem('modernstore_featured_settings', JSON.stringify(updatedSettings))
  }

  // Blog posts functions
  const addBlogPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now()
    }
    const updatedPosts = [...blogPosts, newPost]
    setBlogPosts(updatedPosts)
    localStorage.setItem('modernstore_blog_posts', JSON.stringify(updatedPosts))
  }

  const updateBlogPost = (id: number, postData: Partial<BlogPost>) => {
    const updatedPosts = blogPosts.map(post =>
      post.id === id ? { ...post, ...postData, updatedAt: new Date().toISOString() } : post
    )
    setBlogPosts(updatedPosts)
    localStorage.setItem('modernstore_blog_posts', JSON.stringify(updatedPosts))
  }

  const deleteBlogPost = (id: number) => {
    const updatedPosts = blogPosts.filter(post => post.id !== id)
    setBlogPosts(updatedPosts)
    localStorage.setItem('modernstore_blog_posts', JSON.stringify(updatedPosts))
  }

  // CMS pages functions
  const addCMSPage = (pageData: Omit<CMSPage, 'id'>) => {
    const newPage: CMSPage = {
      ...pageData,
      id: pageData.slug || Date.now().toString()
    }
    const updatedPages = [...cmsPages, newPage]
    setCmsPages(updatedPages)
    localStorage.setItem('modernstore_cms_pages', JSON.stringify(updatedPages))
  }

  const updateCMSPage = (id: string, pageData: Partial<CMSPage>) => {
    const updatedPages = cmsPages.map(page =>
      page.id === id ? { ...page, ...pageData, lastModified: new Date().toISOString() } : page
    )
    setCmsPages(updatedPages)
    localStorage.setItem('modernstore_cms_pages', JSON.stringify(updatedPages))
  }

  const deleteCMSPage = (id: string) => {
    const updatedPages = cmsPages.filter(page => page.id !== id)
    setCmsPages(updatedPages)
    localStorage.setItem('modernstore_cms_pages', JSON.stringify(updatedPages))
  }

  // Site settings functions
  const updateSiteSettings = (settingsData: Partial<SiteSettings>) => {
    const updatedSettings = { ...siteSettings, ...settingsData }
    setSiteSettings(updatedSettings)
    localStorage.setItem('modernstore_settings', JSON.stringify(updatedSettings))
  }

  const value: GlobalStoreContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    sliders,
    addSlider,
    updateSlider,
    deleteSlider,
    featuredProductSettings,
    addFeaturedProductSetting,
    updateFeaturedProductSetting,
    deleteFeaturedProductSetting,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    cmsPages,
    addCMSPage,
    updateCMSPage,
    deleteCMSPage,
    siteSettings,
    updateSiteSettings
  }

  return (
    <GlobalStoreContext.Provider value={value}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

export function useGlobalStore() {
  const context = useContext(GlobalStoreContext)
  if (context === undefined) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider')
  }
  return context
}
