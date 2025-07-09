# Wall Touch - Premium Wallpapers & Blinds Store

A full-stack ecommerce website built with Next.js, Supabase, and Razorpay for Indian payments. Features a modern, responsive design with comprehensive ecommerce functionality for wallpapers and blinds.

## 🚀 Features

### Customer Features
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add/remove items, quantity management, persistent cart
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure registration and login with Supabase Auth
- **Checkout Process**: Streamlined checkout with multiple payment options
- **Order Management**: Track orders and view order history
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS

### Payment Integration
- **Razorpay Integration**: Support for Indian payment methods
- **Multiple Payment Options**: Cards, UPI, Net Banking, Wallets
- **Secure Transactions**: SSL encryption and fraud protection
- **Order Confirmation**: Real-time payment verification

### Admin Features
- **Dashboard**: Overview of sales, orders, and analytics
- **Product Management**: Add, edit, and manage product catalog
- **Order Management**: Process and track customer orders
- **Customer Management**: View and manage customer accounts

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Razorpay
- **State Management**: Zustand
- **Icons**: Custom SVG icons
- **Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Razorpay account (for payments)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Modern Ecommerce Store
```

### 3. Set Up Supabase Database

1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Enable Row Level Security (RLS) policies

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
ecommerce-store/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── auth/              # Authentication pages
│   │   ├── products/          # Product pages
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   ├── admin/             # Admin dashboard
│   │   └── ...
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility functions
│   └── store/                 # State management
├── supabase-schema.sql        # Database schema
└── ...
```

## 🔧 Next Steps

1. **Install missing dependencies**: Run `npm install` to install all required packages
2. **Configure Supabase**: Set up your database and authentication
3. **Configure Razorpay**: Add your payment gateway credentials
4. **Customize**: Modify the design and add your products

## 🚀 Deployment

Deploy on Vercel, Netlify, or any platform that supports Next.js.

---

**Note**: This is a demo ecommerce application. For production use, ensure proper testing and security audits.
