'use client'

import Link from 'next/link'
import { Smartphone, Shirt, Home, Book, Dumbbell, ArrowRight, Tag } from '../../lib/icons'
import { useGlobalStore } from '../../contexts/GlobalStoreContext'

const defaultCategories = [
  {
    name: 'Wallpapers',
    slug: 'wallpapers',
    description: 'Premium wallpapers for every room',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    count: '500+ designs'
  },
  {
    name: 'Blinds',
    slug: 'blinds',
    description: 'Custom blinds and window treatments',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    count: '200+ styles'
  },
  {
    name: 'Curtains',
    slug: 'curtains',
    description: 'Beautiful curtains and drapes',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    count: '150+ options'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Home decor accessories',
    icon: Tag,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    count: '100+ items'
  },
]

export function Categories() {
  const { categories } = useGlobalStore()

  // Filter to show only main categories (no parent category)
  const mainCategories = categories.filter(category => !category.parentId)

  // Use main admin categories if available, otherwise use default categories
  const displayCategories = mainCategories.length > 0 ? mainCategories : defaultCategories

  // Map admin categories to display format
  const mappedCategories = displayCategories.map(category => {
    if ('icon' in category) {
      // This is a default category
      return category
    } else {
      // This is an admin category, map it to display format
      return {
        name: category.name,
        slug: category.name.toLowerCase().replace(/\s+/g, '-'),
        description: category.description || 'Browse our collection',
        icon: Tag,
        image: category.image,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        count: `${category.products || 0} products`
      }
    }
  })
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of products across different categories. 
            Find exactly what you're looking for with ease.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {mappedCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6 text-center">
                  {/* Image or Icon */}
                  {category.image ? (
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <p className="text-xs font-medium text-primary">
                    {category.count}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            )
          })}
        </div>

        {/* View All Categories Button */}
        <div className="text-center">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
