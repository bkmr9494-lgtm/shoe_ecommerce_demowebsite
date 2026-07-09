# 👟 SoleX – Premium E-Commerce Platform

SoleX is a production-grade, full-stack MERN e-commerce application designed with a premium dark aesthetic (Charcoal & Electric Blue) tailored for high-performance footwear and limited drops. The architecture leverages an **NPM Workspaces** monorepo pattern to seamlessly orchestrate both backend and frontend layers from a single root command center.

---

## 🏗️ Project Architecture & Structure

The repository is divided cleanly into an isolated Node.js API tier (`backend/`) and a modern web view layer built with Vite + React (`frontend/`):

```text
sole-x-ecommerce/
├── backend/                  # Node.js Server Environment
│   ├── config/               # Database Initialization Matrix
│   │   └── db.js
│   ├── controllers/          # Business Logic Rule Handlers
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middlewares/          # Route Protection & Verification Guards
│   │   └── authMiddleware.js
│   ├── models/               # MongoDB Document Schema Schematics
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/               # API Route Mapping Descriptors
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── seed.js               # Database Seeding Script
│   └── server.js             # Main App Initialization Entry-Point
├── frontend/                 # Client UI Application Interface (React + Vite)
│   ├── src/
│   │   ├── components/       # Global Shared Interactive Blocks
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/            # Full-Viewport Layout Screens
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ProductDetail.jsx
│   │   ├── App.jsx           # Client Route Mapping Core Controller
│   │   ├── index.css         # Global Tailwind Directives Style
│   │   └── main.jsx          # DOM Injection Bootstrapping
│   ├── index.html
│   ├── postcss.config.js     # PostCSS Configuration
│   ├── tailwind.config.js    # Custom Layout Themes Tokens Matrix
│   └── vite.config.js        # Build Configurations Script
├── .env                      # Cryptographic Secrets & Variables
├── package.json              # Top-Level Workspace Orchestrator
└── README.md                 # System Overview Guide

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
The `.env` file is already configured with:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/solex
JWT_SECRET=your_super_secret_jwt_key_12345
```

For production, update `MONGO_URI` with your MongoDB connection string and change `JWT_SECRET` to a secure random key.

### Database Setup

1. Start MongoDB locally or use a cloud MongoDB instance
2. Seed the database with initial products and admin user:
```bash
cd backend
npm run seed
```

This will create:
- Admin user: `admin@solex.com` / `admin123`
- 6 sample products

### Development Mode

Run both backend and frontend concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Backend only (port 5000)
npm run backend

# Frontend only (port 3000)
npm run frontend
```

### Production Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Set environment variable for production:
```bash
NODE_ENV=production
```

3. Start the backend server (it will serve the frontend static files):
```bash
cd backend
npm start
```

The application will be available on port 5000 (or your configured PORT).

---

## 🌐 Deployment Platforms

### Railway/Render/Heroku (Recommended - Full Stack)

1. Push code to GitHub
2. Connect your repository to the platform
3. Set environment variables:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_secure_random_key`
4. Deploy - the platform will build and run both services
5. After deployment, run the seed script once to populate the database

### VPS/Dedicated Server

1. Clone the repository
2. Install dependencies: `npm install`
3. Build frontend: `cd frontend && npm run build`
4. Set `NODE_ENV=production` in `.env`
5. Seed database: `cd backend && npm run seed`
6. Use PM2 to keep the server running: `pm2 start backend/server.js`
7. Configure nginx as a reverse proxy if needed

### MongoDB Atlas (Cloud Database)

1. Create a free MongoDB Atlas account
2. Create a cluster and database
3. Get your connection string
4. Update `MONGO_URI` in `.env` with your Atlas connection string
5. Whitelist your server IP in Atlas network settings

---

## 👤 Default Credentials

**Admin Account:**
- Email: `admin@solex.com`
- Password: `admin123`

**Customer Registration:**
- Use the Sign Up form to create customer accounts

---

## 🛠️ Features

### Customer Features
- **Product Browsing**: View all products with filtering by category
- **Product Details**: Detailed product pages with size selection
- **Shopping Cart**: Add to cart, update quantities, remove items
- **Checkout Process**: Multi-step checkout with shipping and payment options
- **Order Management**: View order history and status

### Admin Features
- **Dashboard**: Overview of products, orders, and system status
- **Product Management**: Add, view, and delete products
- **Order Management**: View and manage customer orders
- **Authentication**: Secure admin-only access

### Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **API Integration**: RESTful API with proper error handling
- **Responsive Design**: Mobile-first responsive UI
- **Modern Stack**: React 18, Vite, Tailwind CSS, Express, MongoDB

---

## 📁 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your connection string is correct
- Check that your IP is whitelisted if using MongoDB Atlas
- Verify the database name in your connection string

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (requires v18+)
- Verify all dependencies are installed in both frontend and backend

### Frontend Not Loading
- Ensure the backend is running on port 5000
- Check browser console for API errors
- Verify CORS is configured correctly in backend

---

## 📝 License

This project is proprietary software intended for commercial use.

---

## 🤝 Support

For technical support or questions, contact the development team.