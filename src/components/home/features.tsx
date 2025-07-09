import {
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  CreditCard,
  Award,
  Clock,
  MapPin
} from '../../lib/icons'

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'High-quality wallpapers and blinds from trusted manufacturers',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Shield,
    title: 'Professional Installation',
    description: 'Expert installation team ensures perfect fitting and finishing',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Clock,
    title: 'Custom Solutions',
    description: 'Tailored wallpapers and blinds designed for your specific needs',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Headphones,
    title: 'Expert Consultation',
    description: 'Free home consultation and design advice from our experts',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free delivery and installation on orders above ₹5,000',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: RotateCcw,
    title: 'Warranty Support',
    description: '1-year warranty on all products with after-sales service',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment',
    description: 'Easy EMI options and multiple payment methods available',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: MapPin,
    title: 'Pan India Service',
    description: 'We serve customers across major cities in India',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  }
]

export function Features() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Why Choose Wall Touch?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best wallpapers and blinds experience.
            Here's what makes us your trusted home decor partner.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
