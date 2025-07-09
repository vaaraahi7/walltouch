# Supabase Setup Guide for ModernStore Ecommerce

## 🚀 Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/Login with GitHub
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Name**: ModernStore
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
7. Click "Create new project"

### 2. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### 4. Setup Database Schema

1. Go to your Supabase dashboard
2. Click **SQL Editor** in the sidebar
3. Click **New Query**
4. Copy the entire content from `supabase-schema.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the schema

### 5. Insert Sample Data (Optional)

Run this SQL to add sample categories and products:

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets'),
('Clothing', 'clothing', 'Fashion and apparel'),
('Home & Garden', 'home-garden', 'Home improvement and garden supplies'),
('Sports & Fitness', 'sports-fitness', 'Sports equipment and fitness gear'),
('Books', 'books', 'Books and educational materials');

-- Insert sample products
INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, is_active, is_featured) 
SELECT 
  'Wireless Bluetooth Headphones',
  'wireless-bluetooth-headphones',
  'Premium quality wireless headphones with noise cancellation',
  2999.00,
  4999.00,
  c.id,
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  true,
  true
FROM categories c WHERE c.slug = 'electronics';

INSERT INTO products (name, slug, description, price, compare_price, category_id, featured_image, is_active, is_featured) 
SELECT 
  'Premium Cotton T-Shirt',
  'premium-cotton-t-shirt',
  'Comfortable and stylish cotton t-shirt made from 100% organic cotton',
  799.00,
  1299.00,
  c.id,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  true,
  true
FROM categories c WHERE c.slug = 'clothing';
```

### 6. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure **Site URL**: `http://localhost:3001` (for development)
3. Add **Redirect URLs**:
   - `http://localhost:3001/auth/callback`
   - `https://yourdomain.com/auth/callback` (for production)

### 7. Setup Google OAuth (Optional)

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - **Client ID**
   - **Client Secret**
4. Get these from [Google Cloud Console](https://console.cloud.google.com/)

### 8. Configure Storage (Optional)

1. Go to **Storage**
2. Create a new bucket called `products`
3. Set it to **Public** for product images
4. Configure policies for image uploads

### 9. Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3001`
3. Try registering a new account
4. Check if data appears in your Supabase dashboard

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid API key"**
   - Check your `.env.local` file
   - Ensure no extra spaces in the keys
   - Restart your dev server after changes

2. **"Row Level Security policy violation"**
   - Make sure RLS policies are created
   - Check if user is authenticated

3. **"relation does not exist"**
   - Run the schema SQL again
   - Check if all tables were created

### Useful SQL Queries:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check user profiles
SELECT * FROM profiles;

-- Check products
SELECT * FROM products;

-- Reset a table (careful!)
TRUNCATE TABLE products CASCADE;
```

## 🚀 Production Deployment

For production:

1. Update **Site URL** in Supabase Auth settings
2. Add production domain to **Redirect URLs**
3. Update `.env.local` with production URLs
4. Enable **Email confirmations** in Auth settings
5. Configure **SMTP** for email delivery

## 📚 Next Steps

After setup:

1. **Add Real Products**: Replace mock data with your products
2. **Configure Payments**: Setup Razorpay for Indian payments
3. **Customize Design**: Update colors, fonts, and branding
4. **Add Analytics**: Integrate Google Analytics
5. **Setup Monitoring**: Add error tracking and performance monitoring

## 🆘 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Your ecommerce store is now ready to go live! 🎉
