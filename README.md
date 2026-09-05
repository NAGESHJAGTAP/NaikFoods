# 🚩 Naik Foods — Full-Stack MERN E-Commerce & Admin Dashboard

> **Full Stack MERN Internship Task Submission** for **Bits and Volts Private Limited**  
> Study, analysis, and working prototype development inspired by [Naik Foods (naikfoods.co.in/in)](https://www.naikfoods.co.in/in).

---

## 📌 Executive Summary

This project delivers a **production-ready MERN Full-Stack E-Commerce Platform** comprising two tightly integrated systems:
1. **Customer-Facing Storefront (`/`)**: A high-conversion regional culinary discovery engine featuring an interactive Maharashtra spice map, heat-level meters, a "Build Your Own Box" gift combo wizard, recipe-to-cart purchasing, and bilingual (English/मराठी) support.
2. **Professional Admin Management Portal (`/admin/*`)**: A secure, JWT-authenticated dashboard with dynamic revenue metrics, sales analytics SVG charts, multi-status order lifecycle management, product catalog CRUD, low-stock inventory alerts, customer lifetime spend tracking, category management, and customer review moderation.

---

## 🔐 Admin Portal Credentials & Quick Access

- **Admin Login Route**: [`http://localhost:3000/admin/login`](http://localhost:3000/admin/login)
- **Admin Email**: `admin@naikfoods.com`
- **Admin Password**: `admin123`
- **JWT Token**: Stored in `localStorage` with 24-hour expiration and server verification via `Authorization: Bearer <token>`.

---

## ✨ Features Breakdown

### A. Professional Admin Dashboard (`/admin/*`)

| Page / Feature | URL Route | Capabilities & Details |
|:---|:---|:---|
| **Admin Login** | `/admin/login` | Secure JWT authentication, password toggle, auto-redirect on session validity. |
| **Overview Dashboard** | `/admin/dashboard` | **4 Summary Cards**: Total Sales Revenue (₹), Total Orders, Active Catalog Products, Low-Stock Alerts with +% growth metric. **Sales Overview Chart** (toggle 7 Days / 30 Days / 12 Months). **Recent Customer Orders** table with colored status badges. |
| **Order Management** | `/admin/orders` | View all customer orders with customer details, delivery address, items ordered, and total. Filter by status (`Confirmed`, `Processing`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`). Search by Customer Name, Order ID, or City. Instant inline status update PATCH API. |
| **Product Management** | `/admin/products` | Complete catalog table with thumbnail images, spice region tags, heat labels, prices, stock counts. **Add Product Modal** (with Marathi name, ingredients, heat meter, stock threshold), **Edit Product**, **Delete Product**, and toggle active status. |
| **Inventory Management** | `/admin/inventory` | Live inventory monitoring. Automatic **Low Stock Alert Banner** (`stock <= minimumStock`). Inline stock quantity editing with instant save to backend. |
| **Customer Intelligence** | `/admin/customers` | Derived customer profiles aggregating lifetime orders, total spend (₹), phone, address, first & latest order timestamps. Searchable by name, city, or phone number. |
| **Category Management** | `/admin/categories` | Interactive cards displaying category description, active toggle, product counts. Add new categories and edit existing ones. |
| **Review Moderation** | `/admin/reviews` | Customer reviews with 5-star rating visualization, review comments, and quick-action buttons to **Approve**, **Hide**, or **Delete** reviews. |

### B. Customer Storefront (`/`)

- **🗺️ Interactive Maharashtra Regional Map**: Filter authentic regional spices across Vidarbha, Konkan Coast, Kolhapur, Pune, and Marathwada.
- **🌶️ Visual Heat Level Meter**: 1 to 4 chili indicators (Mild to Fire 🔥) on each product card.
- **🎁 "Build Your Own Box" (Combo Builder)**: Pick 4 products to assemble a custom gift box with an automatic ₹100 combo discount.
- **🍲 Recipe-to-Cart Engine**: Curated authentic recipes (Puneri Misal Pav, Varhadi Patodi Rassa, Malvani Fish Curry) with a 1-click button to add all required spices to cart.
- **🛒 Dynamic Cart Drawer**: Real-time progress meter toward the ₹999 Free Shipping threshold, promo coupon application (`NAIK10`), and quantity controls.
- **⚡ One-Page Checkout**: Customer shipping address collection, delivery details, and order placement with celebratory confetti animations.
- **🌐 Bilingual Toggle**: Instant English / Marathi (`मराठी`) language switcher.

---

## 🛠️ Technology Stack

| Layer | Technology |
|:---|:---|
| **Frontend** | React 19, React Router v7 (`react-router-dom`), Tailwind CSS v3, Lucide React Icons, Canvas Confetti, Vite v6 |
| **Backend API** | Node.js, Express.js REST API, JSON Web Token (`jsonwebtoken`), CORS |
| **Data Layer** | In-memory dynamic JSON store + Mongoose-ready schemas with seed dataset of products, recipes, orders, and reviews |
| **Tooling** | Concurrently, PostCSS, Autoprefixer |

---

## 📡 API Reference

All Admin routes require header `Authorization: Bearer <token>`:

### Admin APIs
```http
POST   /api/admin/login                 # Admin login (email + password) -> returns JWT token
GET    /api/admin/me                    # Verify admin session
GET    /api/admin/dashboard             # Dynamic overview statistics (revenue, orders, low stock, growth)
GET    /api/admin/sales-chart?period=   # Time-series revenue data (7days / 30days / 12months)
GET    /api/admin/orders?status=&search=# Orders list with query filtering
GET    /api/admin/orders/:id            # Single order details
PATCH  /api/admin/orders/:id/status     # Update order fulfillment status
GET    /api/admin/products              # Catalog listing for admin management
PUT    /api/admin/products/:id          # Update product details
DELETE /api/admin/products/:id          # Delete product from catalog
PATCH  /api/admin/products/:id/stock    # Quick update stock quantity
GET    /api/admin/inventory             # Stock status report (In Stock / Low Stock / Out of Stock)
GET    /api/admin/customers?search=     # Aggregated customer analytics and spend
GET    /api/admin/categories            # List product categories
POST   /api/admin/categories            # Create new category
PUT    /api/admin/categories/:id        # Update category
DELETE /api/admin/categories/:id        # Delete category
GET    /api/admin/reviews               # List customer reviews
PATCH  /api/admin/reviews/:id           # Update review status (Approved / Hidden)
DELETE /api/admin/reviews/:id           # Delete review
```

### Storefront APIs
```http
GET    /api/products                    # Filter products by category, region, heatLevel, search, sort
GET    /api/products/:id                # Single product details
GET    /api/recipes                     # Authentic cooking recipes and spice pairings
POST   /api/custom-box                  # Calculate combo box price & discount
POST   /api/orders                      # Create customer order & deduct stock
```

---

## 🚀 Setup & Execution Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
Clone the repository and install root dependencies:
```bash
cd naikfoods
npm install
```

### 3. Run Application
Run both backend and frontend concurrently with a single command:
```bash
npm run dev
```

Or run them in separate terminals:
```bash
# Terminal 1: Backend API server (Port 5000)
npm run server

# Terminal 2: Frontend client (Port 3000)
npm run client
```

- **Customer Storefront**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 4. Build for Production
```bash
npm run build
```
Creates an optimized static bundle in `dist/` ready to be served by Express in production (`npm start`).

---

## 📂 Project Structure

```
naikfoods/
├── NAIK_FOODS_ANALYSIS_REPORT.md   # Comprehensive Naik Foods UX & Technical Evaluation
├── README.md                        # Documentation & setup instructions
├── package.json                     # Scripts & dependencies (react-router-dom, jsonwebtoken, etc.)
├── vite.config.js                   # Vite config with /api proxy to localhost:5000
├── tailwind.config.js               # Design tokens (brand green #70BF4F, saffron orange)
├── index.html                       # HTML5 template with Google Fonts (Outfit & Inter)
├── server/
│   ├── server.js                    # Express API with JWT auth, admin endpoints, static serve
│   └── data/
│       └── products.js              # Seed data for 10 products, 3 recipes, 9 orders, reviews
└── src/
    ├── main.jsx                     # Entry point
    ├── index.css                    # Tailwind directives & glassmorphism utilities
    ├── App.jsx                      # React Router routes (/ and /admin/*)
    ├── services/
    │   └── adminApi.js              # Centralized admin API client with JWT headers
    ├── pages/
    │   └── admin/
    │       ├── AdminLayout.jsx      # Responsive sidebar, top header, notification bell
    │       ├── AdminLogin.jsx       # Secure admin login form
    │       ├── Dashboard.jsx        # Summary cards, SVG sales chart, recent orders table
    │       ├── Orders.jsx           # Order table, status filters, status patch dropdown
    │       ├── Products.jsx         # Product catalog table, Add/Edit/Delete modals
    │       ├── Inventory.jsx        # Low stock banner, SKU stock adjustment
    │       ├── Customers.jsx        # Customer lifetime spend & order counts
    │       ├── Categories.jsx       # Category grid, add/edit modal, active toggle
    │       └── Reviews.jsx          # Star rating display, approve/hide/delete moderation
    └── components/
        ├── Navbar.jsx               # Header with search, bilingual toggle & Admin Portal link
        ├── HeroBanner.jsx           # Maharashtrian culinary heritage banner
        ├── RegionalMap.jsx          # Interactive Maharashtra regional spice explorer
        ├── ProductCard.jsx          # Card with heat level badges & add-to-cart
        ├── CustomBoxBuilder.jsx     # Combo gift box builder modal
        ├── RecipeSection.jsx        # Recipe-to-cart engine
        ├── CartDrawer.jsx           # Side drawer with shipping meter & promo code
        ├── CheckoutModal.jsx        # One-page checkout modal with order confirmation
        └── Footer.jsx               # Footer with authentic credentials & trust badges
```

---

## 🎯 Verification & Testing

- [x] **Storefront Navigation**: Browsing, regional filtering, heat levels, recipe addition, cart calculation.
- [x] **JWT Admin Authentication**: Login rejects bad passwords, generates 24h JWT, protects `/api/admin/*` endpoints.
- [x] **Dynamic Metric Cards**: Accurately calculates Total Revenue (₹4,410 excluding cancelled), Total Orders (9), Active Products (10), Low Stock Alerts (2).
- [x] **Interactive SVG Sales Chart**: Renders dynamic polyline curves with 7 Days, 30 Days, and 12 Months views.
- [x] **Order Lifecycle**: Filter by status, search by customer, update status from `Confirmed` to `Processing`, `Shipped`, `Delivered`.
- [x] **Catalog & Inventory CRUD**: Create new product, inline stock count adjustment, instant recalculation of low stock count.
- [x] **Production Bundle**: `vite build` creates zero-error 393KB bundle in `dist/`.

---

## 📚 In-Depth Platform Analysis & Strategic Roadmap

For a complete architectural and business analysis answering all critical evaluation questions, see:
- **[Comprehensive Platform Analysis & Roadmap](file:///d:/5semester/naikfoods/NAIK_FOODS_PLATFORM_ANALYSIS_AND_ROADMAP.md)**: Exhaustive report answering:
  1. What can be improved?
  2. What is missing?
  3. What is not working, or could work better?
  4. What can be optimized?
  5. What new ideas or features can be introduced?
  6. How can the overall website experience be improved?
  7. How can the website potentially attract more traffic and customers?
  *Includes full system architectures, Mermaid diagrams, and real-life case studies (Suhana, Kpra, Chitale Bandhu, Licious, Blinkit, Blue Tokai).*
- **[Assignment Compliance Report](file:///d:/5semester/naikfoods/NAIK_FOODS_ANALYSIS_REPORT.md)**: Original 360-degree audit and feature selection report.

