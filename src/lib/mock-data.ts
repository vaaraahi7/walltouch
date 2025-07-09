// Mock data for development and testing

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  comparePrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  stock: number
  slug: string
  tags: string[]
  features: string[]
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    price: 2999,
    originalPrice: 4999,
    comparePrice: 4999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'electronics',
    rating: 4.5,
    reviews: 128,
    stock: 25,
    slug: 'wireless-bluetooth-headphones',
    tags: ['wireless', 'bluetooth', 'headphones', 'audio'],
    features: ['Noise Cancellation', '30-hour Battery', 'Wireless Charging', 'Premium Sound']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and smartphone connectivity. Track your health and stay connected.',
    price: 8999,
    originalPrice: 12999,
    comparePrice: 12999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'electronics',
    rating: 4.3,
    reviews: 89,
    stock: 15,
    slug: 'smart-fitness-watch',
    tags: ['smartwatch', 'fitness', 'health', 'gps'],
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', 'Long Battery Life']
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable and stylish cotton t-shirt made from 100% organic cotton. Perfect for casual wear and everyday comfort.',
    price: 799,
    originalPrice: 1299,
    comparePrice: 1299,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    category: 'clothing',
    rating: 4.7,
    reviews: 156,
    stock: 50,
    slug: 'premium-cotton-t-shirt',
    tags: ['t-shirt', 'cotton', 'casual', 'organic'],
    features: ['100% Organic Cotton', 'Comfortable Fit', 'Durable', 'Machine Washable']
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height. Designed for long hours of comfortable work.',
    price: 12999,
    originalPrice: 18999,
    comparePrice: 18999,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
    category: 'furniture',
    rating: 4.6,
    reviews: 73,
    stock: 8,
    slug: 'ergonomic-office-chair',
    tags: ['office', 'chair', 'ergonomic', 'furniture'],
    features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh', '360° Swivel']
  },
  {
    id: '5',
    name: 'Wireless Phone Charger',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.',
    price: 1499,
    originalPrice: 2499,
    comparePrice: 2499,
    image: 'https://images.unsplash.com/photo-1609592806596-b43bada2f4b8?w=500&h=500&fit=crop',
    category: 'electronics',
    rating: 4.4,
    reviews: 92,
    stock: 30,
    slug: 'wireless-phone-charger',
    tags: ['wireless', 'charger', 'phone', 'qi'],
    features: ['Fast Charging', 'LED Indicator', 'Overcharge Protection', 'Universal Compatibility']
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    description: 'High-quality yoga mat with excellent grip and cushioning. Made from eco-friendly materials for your daily practice.',
    price: 2499,
    originalPrice: 3999,
    comparePrice: 3999,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    category: 'sports',
    rating: 4.8,
    reviews: 134,
    stock: 20,
    slug: 'yoga-mat-premium',
    tags: ['yoga', 'fitness', 'mat', 'exercise'],
    features: ['Eco-Friendly', 'Non-Slip Surface', 'Extra Cushioning', 'Lightweight']
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Perfect for active lifestyles.',
    price: 1299,
    originalPrice: 1999,
    comparePrice: 1999,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
    category: 'sports',
    rating: 4.5,
    reviews: 167,
    stock: 40,
    slug: 'stainless-steel-water-bottle',
    tags: ['water bottle', 'stainless steel', 'insulated', 'sports'],
    features: ['24h Cold', '12h Hot', 'Leak Proof', 'BPA Free']
  },
  {
    id: '8',
    name: 'LED Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. Perfect for reading, studying, and working.',
    price: 3499,
    originalPrice: 4999,
    comparePrice: 4999,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    category: 'home',
    rating: 4.6,
    reviews: 88,
    stock: 12,
    slug: 'led-desk-lamp',
    tags: ['led', 'lamp', 'desk', 'lighting'],
    features: ['Adjustable Brightness', 'Color Temperature Control', 'USB Charging Port', 'Touch Control']
  },
  {
    id: '9',
    name: 'Bluetooth Speaker Portable',
    description: 'Compact portable Bluetooth speaker with powerful sound and long battery life. Perfect for outdoor adventures and parties.',
    price: 2799,
    originalPrice: 4299,
    comparePrice: 4299,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'electronics',
    rating: 4.4,
    reviews: 112,
    stock: 18,
    slug: 'bluetooth-speaker-portable',
    tags: ['bluetooth', 'speaker', 'portable', 'audio'],
    features: ['Waterproof', '12-hour Battery', 'Powerful Bass', 'Hands-free Calling']
  },
  {
    id: '10',
    name: 'Running Shoes Professional',
    description: 'Professional running shoes with advanced cushioning and breathable design. Engineered for performance and comfort.',
    price: 6999,
    originalPrice: 9999,
    comparePrice: 9999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'sports',
    rating: 4.7,
    reviews: 203,
    stock: 25,
    slug: 'running-shoes-professional',
    tags: ['running', 'shoes', 'sports', 'fitness'],
    features: ['Advanced Cushioning', 'Breathable Mesh', 'Lightweight', 'Durable Sole']
  },
  {
    id: '11',
    name: 'Coffee Maker Automatic',
    description: 'Programmable automatic coffee maker with built-in grinder and thermal carafe. Wake up to freshly brewed coffee every morning.',
    price: 8999,
    originalPrice: 12999,
    comparePrice: 12999,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    category: 'home',
    rating: 4.5,
    reviews: 76,
    stock: 10,
    slug: 'coffee-maker-automatic',
    tags: ['coffee', 'maker', 'automatic', 'kitchen'],
    features: ['Built-in Grinder', 'Programmable', 'Thermal Carafe', 'Auto Shut-off']
  },
  {
    id: '12',
    name: 'Backpack Travel',
    description: 'Durable travel backpack with multiple compartments and laptop sleeve. Perfect for business trips and adventures.',
    price: 3999,
    originalPrice: 5999,
    comparePrice: 5999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'accessories',
    rating: 4.6,
    reviews: 145,
    stock: 22,
    slug: 'backpack-travel',
    tags: ['backpack', 'travel', 'laptop', 'accessories'],
    features: ['Laptop Sleeve', 'Water Resistant', 'Multiple Compartments', 'Comfortable Straps']
  }
]

export const mockCategories = [
  { id: 'electronics', name: 'Electronics', count: 156 },
  { id: 'clothing', name: 'Clothing', count: 89 },
  { id: 'home', name: 'Home & Garden', count: 67 },
  { id: 'sports', name: 'Sports & Fitness', count: 45 },
  { id: 'accessories', name: 'Accessories', count: 78 },
  { id: 'furniture', name: 'Furniture', count: 34 }
]
