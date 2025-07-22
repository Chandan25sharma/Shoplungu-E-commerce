# Shoplungu - E-Commerce Web Application

A modern, full-featured e-commerce web application built with Next.js 15, TypeScript, and Tailwind CSS. Inspired by leading fashion platforms, Shoplungu provides a complete shopping experience with advanced features and responsive design.

## 🚀 Features

### Core E-Commerce Functionality
- **Product Catalog**: Browse through extensive product collections with detailed information
- **Advanced Filtering**: Filter by categories, brands, sizes, colors, price range, and availability
- **Search & Sort**: Powerful search functionality with multiple sorting options
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Wishlist**: Save favorite items for later purchase
- **User Authentication**: Secure login/register system with demo accounts
- **Checkout Process**: Complete order flow with address and payment details
- **Order Confirmation**: Professional order confirmation with tracking information

### User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Loading States**: Smooth loading animations and error handling
- **Form Validation**: Comprehensive form validation with user-friendly messages
- **Demo Data**: Pre-populated with realistic product and user data
- **Error Pages**: Custom 404 and error pages with helpful navigation

### Technical Features
- **Next.js 15**: Latest Next.js with App Router architecture
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first styling with custom components
- **Zustand**: Lightweight state management with persistence
- **Server Components**: Optimized performance with server-side rendering
- **Modern Icons**: Heroicons for consistent and beautiful iconography

## 🛠️ Technology Stack

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persist
- **Icons**: Heroicons
- **Node.js**: 18+ required

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Quick Start Guide

### Demo Credentials
Use these credentials to test the authentication system:
- **Email**: admin@shoplungu.com
- **Password**: admin123

### Key Pages to Explore
- **Homepage** (`/`): Featured products and categories
- **Products** (`/products`): Complete product catalog with filters
- **Categories** (`/categories/[slug]`): Category-specific product listings
- **Product Details** (`/products/[id]`): Detailed product information
- **Shopping Cart** (`/cart`): Cart management and checkout
- **Wishlist** (`/wishlist`): Saved favorite items
- **User Profile** (`/profile`): Account management and order history
- **Contact** (`/contact`): Customer support and inquiries

## 📁 Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx          # User login page
│   └── register/page.tsx       # User registration page
├── cart/page.tsx               # Shopping cart
├── categories/
│   └── [slug]/page.tsx         # Dynamic category pages
├── checkout/page.tsx           # Checkout process
├── contact/page.tsx            # Contact form
├── order-confirmation/page.tsx # Order success page
├── products/
│   ├── page.tsx               # Product listing
│   └── [id]/page.tsx          # Product details
├── profile/page.tsx           # User profile
├── wishlist/page.tsx          # Wishlist
├── error.tsx                  # Global error page
├── loading.tsx                # Global loading component
├── not-found.tsx              # 404 page
├── layout.tsx                 # Root layout
└── page.tsx                   # Homepage

components/
├── CartItem.tsx               # Cart item component
├── CategoryFilter.tsx         # Product filtering
├── Footer.tsx                 # Site footer
├── Navbar.tsx                 # Navigation header
├── ProductCard.tsx            # Product display card
└── SearchBar.tsx              # Search functionality

stores/
├── useAuthStore.ts            # Authentication state
├── useCartStore.ts            # Shopping cart state
└── useWishlistStore.ts        # Wishlist state

data/
├── categories.json            # Category data
├── products.json              # Product catalog
└── users.json                 # Demo user accounts

utils/
└── formatter.ts               # Utility functions

styles/
└── globals.css                # Global styles
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue tones for branding and actions
- **Neutral**: Grays for text and backgrounds
- **Accent**: Green for success states, Red for errors

### Typography
- **Headings**: Bold, clean typography for hierarchy
- **Body Text**: Readable fonts with proper line spacing
- **Interactive Elements**: Clear button and link styling

### Components
- **Responsive Cards**: Product and information cards
- **Forms**: Comprehensive form styling with validation
- **Buttons**: Primary, secondary, and outline button variants
- **Navigation**: Clean header with search and user actions

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:
```env
NEXT_PUBLIC_APP_NAME=Shoplungu
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration
The Tailwind configuration includes:
- Custom color palette
- Component utilities
- Responsive breakpoints
- Animation classes

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components are designed mobile-first with progressive enhancement for larger screens.

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The application can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Wishlist management
- [ ] Responsive design
- [ ] Error handling

### Demo Scenarios
1. **New User Journey**: Register → Browse → Add to Cart → Checkout
2. **Returning User**: Login → View Profile → Browse Wishlist → Purchase
3. **Product Discovery**: Search → Filter → Compare → Purchase

## 🔒 Security Features

- Input validation and sanitization
- Secure authentication flow
- Protected routes and API endpoints
- XSS protection through React
- CSRF protection via Next.js

## 📊 Performance Optimizations

- Server-side rendering for SEO
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Efficient state management
- Minimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@shoplungu.com
- **Phone**: +966 11 123 4567
- **Documentation**: This README file
- **Issues**: GitHub Issues page

## 🔄 Version History

- **v1.0.0**: Initial release with core e-commerce functionality
- **v1.1.0**: Added user authentication and profile management
- **v1.2.0**: Enhanced filtering and search capabilities
- **v1.3.0**: Improved responsive design and accessibility

---

**Shoplungu** - Fashion for Everyone 👗👔👖

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
# Shoplungu-E-commerce
