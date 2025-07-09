import Link from 'next/link'
import { Smartphone, Shirt, Home, Book, Dumbbell, ArrowRight } from '@/lib/icons'

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets, smartphones, laptops, and electronic accessories',
    icon: Smartphone,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    count: '1,200+ products',
    featured: true,
    subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Smart Watches']
  },
  {
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion for men, women, and kids. Trendy and comfortable apparel',
    icon: Shirt,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    count: '2,500+ products',
    featured: true,
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids\' Clothing', 'Shoes', 'Accessories']
  },
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything you need to make your home beautiful and functional',
    icon: Home,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    count: '800+ products',
    featured: true,
    subcategories: ['Furniture', 'Home Decor', 'Kitchen', 'Garden', 'Storage']
  },
  {
    name: 'Books',
    slug: 'books',
    description: 'Expand your knowledge with our vast collection of books',
    icon: Book,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    count: '1,500+ products',
    featured: false,
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children\'s Books', 'Comics']
  },
  {
    name: 'Sports & Fitness',
    slug: 'sports',
    description: 'Stay fit and active with our sports and fitness equipment',
    icon: Dumbbell,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    count: '600+ products',
    featured: false,
    subcategories: ['Gym Equipment', 'Sports Gear', 'Outdoor Activities', 'Yoga', 'Running']
  },
]

export default function CategoriesPage() {
  const featuredCategories = categories.filter(cat => cat.featured)
  const otherCategories = categories.filter(cat => !cat.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our wide range of products across different categories. 
          Find exactly what you're looking for with ease.
        </p>
      </div>

      {/* Featured Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-background border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl ${category.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-10 w-10 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-sm font-medium text-primary mb-6">
                    {category.count}
                  </p>

                  {/* Subcategories */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Popular:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* Other Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-8">More Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-background border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {category.description}
                  </p>
                  <p className="text-xs font-medium text-primary">
                    {category.count}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center">
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse all our products or use our search feature to find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Advanced Search
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
