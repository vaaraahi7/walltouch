import Link from 'next/link'
import { ArrowRight, Palette, Home, Shirt, Smartphone, Book, Package } from '../../src/lib/icons'

export default function CategoriesPage() {
  const categories = [
    {
      id: 'wallpapers',
      name: 'Wallpapers',
      description: 'Transform your walls with our premium wallpaper collection',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      productCount: 150,
      subcategories: ['Custom Wallpapers', 'Regular Wallpapers', 'Textured Wallpapers'],
      href: '/products?category=wallpapers'
    },
    {
      id: 'blinds',
      name: 'Window Blinds',
      description: 'Control light and privacy with our stylish blind collection',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      productCount: 75,
      subcategories: ['Regular Blinds', 'Customized Blinds', 'Zebra Blinds'],
      href: '/products?category=blinds'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Comfortable and stylish clothing for every occasion',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      productCount: 200,
      subcategories: ['T-Shirts', 'Shirts', 'Dresses', 'Accessories'],
      href: '/products?category=clothing'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and electronic accessories',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
      productCount: 120,
      subcategories: ['Smartphones', 'Laptops', 'Accessories', 'Audio'],
      href: '/products?category=electronics'
    },
    {
      id: 'books',
      name: 'Books',
      description: 'Expand your knowledge with our book collection',
      icon: Book,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      productCount: 300,
      subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children'],
      href: '/products?category=books'
    },
    {
      id: 'gaming',
      name: 'Gaming',
      description: 'Gaming accessories and entertainment products',
      icon: Package,
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
      productCount: 80,
      subcategories: ['Controllers', 'Headsets', 'Keyboards', 'Mice'],
      href: '/products?category=gaming'
    }
  ]

  const featuredCategories = categories.slice(0, 2) // Wallpapers and Blinds

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <IconComponent className="h-6 w-6" />
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                      <p className="text-sm opacity-90">{category.productCount} products</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.map((sub, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Shop Now</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">{category.productCount} products</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="mb-6 opacity-90">
            Browse all our products or contact us for custom requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              View All Products
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
