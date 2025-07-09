-- ModernStore Ecommerce Database Schema
-- Copy and paste this into your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  category_id UUID REFERENCES categories(id),
  images TEXT[],
  featured_image TEXT,
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  billing_address JSONB,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  product_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Wishlist items table
CREATE TABLE wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON wishlist_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets'),
('Clothing', 'clothing', 'Fashion and apparel'),
('Home & Garden', 'home-garden', 'Home and garden supplies'),
('Sports & Fitness', 'sports-fitness', 'Sports and fitness equipment'),
('Books', 'books', 'Books and educational materials'),
('Accessories', 'accessories', 'Fashion accessories and more');

-- Insert sample products
INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, stock, is_featured, rating, reviews_count, tags) 
SELECT 
  'Wireless Bluetooth Headphones',
  'wireless-bluetooth-headphones',
  'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
  2999.00,
  4999.00,
  c.id,
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  25,
  true,
  4.5,
  128,
  ARRAY['wireless', 'bluetooth', 'headphones', 'audio']
FROM categories c WHERE c.slug = 'electronics';

INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, stock, is_featured, rating, reviews_count, tags) 
SELECT 
  'Smart Fitness Watch',
  'smart-fitness-watch',
  'Advanced fitness tracking watch with heart rate monitor and GPS.',
  8999.00,
  12999.00,
  c.id,
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
  15,
  true,
  4.3,
  89,
  ARRAY['smartwatch', 'fitness', 'health', 'gps']
FROM categories c WHERE c.slug = 'electronics';

INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, stock, is_featured, rating, reviews_count, tags) 
SELECT 
  'Premium Cotton T-Shirt',
  'premium-cotton-t-shirt',
  'Comfortable and stylish cotton t-shirt made from 100% organic cotton.',
  799.00,
  1299.00,
  c.id,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  50,
  true,
  4.7,
  156,
  ARRAY['t-shirt', 'cotton', 'casual', 'organic']
FROM categories c WHERE c.slug = 'clothing';

INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, stock, is_featured, rating, reviews_count, tags) 
SELECT 
  'Yoga Mat Premium',
  'yoga-mat-premium',
  'High-quality yoga mat with excellent grip and cushioning.',
  2499.00,
  3999.00,
  c.id,
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
  20,
  true,
  4.8,
  134,
  ARRAY['yoga', 'fitness', 'mat', 'exercise']
FROM categories c WHERE c.slug = 'sports-fitness';

INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, stock, is_featured, rating, reviews_count, tags) 
SELECT 
  'LED Desk Lamp',
  'led-desk-lamp',
  'Modern LED desk lamp with adjustable brightness and color temperature.',
  3499.00,
  4999.00,
  c.id,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
  12,
  true,
  4.6,
  88,
  ARRAY['led', 'lamp', 'desk', 'lighting']
FROM categories c WHERE c.slug = 'home-garden';

INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, stock, is_featured, rating, reviews_count, tags) 
SELECT 
  'Travel Backpack',
  'travel-backpack',
  'Durable travel backpack with multiple compartments and laptop sleeve.',
  3999.00,
  5999.00,
  c.id,
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
  22,
  true,
  4.6,
  145,
  ARRAY['backpack', 'travel', 'laptop', 'accessories']
FROM categories c WHERE c.slug = 'accessories';
