import express from 'express';
import cors from 'cors';
import path from 'path';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { initialProducts, recipesData, seedOrders } from './data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'swadyatra_admin_secret_2026';
const USER_JWT_SECRET = process.env.USER_JWT_SECRET || 'swadyatra_user_secret_2026';

// Admin credentials
const ADMIN_EMAIL = 'admin@naikfoods.com';
const ADMIN_PASSWORD = 'admin123';

app.use(cors());
app.use(express.json());

// ─── Health Check & Root Route ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Naik Foods Backend API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      recipes: '/api/recipes',
      orders: '/api/orders',
      health: '/api/health'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// ─── In-Memory State ────────────────────────────────────────────────────────
let products = [...initialProducts];
let recipes = [...recipesData];
let orders = [...seedOrders];
let users = [
  // Demo user pre-seeded for testing
  {
    id: 'user_demo_1',
    name: 'Amit Naik',
    email: 'amit@example.com',
    password: 'demo123', // plain text for demo; in prod use bcrypt
    phone: '9876543210',
    city: 'Pune',
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString()
  }
];
let categories = [
  { id: 'cat_1', name: 'Masalas & Spices', description: 'Authentic hand-pounded spice blends', isActive: true, productCount: 5 },
  { id: 'cat_2', name: 'Pickles & Chutneys', description: 'Sun-dried pickles and chutneys', isActive: true, productCount: 3 },
  { id: 'cat_3', name: 'Snacks & Namkeen', description: 'Traditional Maharashtrian snacks', isActive: true, productCount: 1 },
  { id: 'cat_4', name: 'Staples & Mixes', description: 'Everyday cooking mixes and staples', isActive: true, productCount: 1 },
];
let reviews = [
  { id: 'rev_1', customer: 'Sanjay D.', product: 'Authentic Hand-Pounded Godaa Masala', rating: 5, comment: 'Best Godaa masala I have ever tasted! Exactly like my grandmother used to make.', date: new Date(Date.now() - 3 * 86400000).toISOString(), status: 'Approved' },
  { id: 'rev_2', customer: 'Priyanka K.', product: 'Nagpuri Varhadi Black Masala', rating: 5, comment: 'Amazing product, brought back memories of Vidarbha!', date: new Date(Date.now() - 2 * 86400000).toISOString(), status: 'Approved' },
  { id: 'rev_3', customer: 'Rahul P.', product: 'Fiery Kolhapuri Lavangi Chili Masala', rating: 4, comment: 'Very spicy and authentic. Perfect for Kolhapuri Rassa.', date: new Date(Date.now() - 86400000).toISOString(), status: 'Pending' },
  { id: 'rev_4', customer: 'Kavya N.', product: 'Puneri Crispy Bhakarwadi', rating: 5, comment: 'Crispy, sweet, and spicy - absolutely perfect! Ordered 3 packs already.', date: new Date().toISOString(), status: 'Pending' },
];

// ─── Tracking Statuses (ordered pipeline) ───────────────────────────────────
const ORDER_STATUS_PIPELINE = [
  'Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const VALID_ADMIN_STATUSES = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Processing'];

// ─── JWT Middleware ──────────────────────────────────────────────────────────
const verifyAdmin = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ success: false, message: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required' });
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const verifyUser = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ success: false, message: 'Authentication required. Please login.' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, USER_JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please login again.' });
  }
};

// ─── USER AUTH ROUTES ────────────────────────────────────────────────────────

// POST Register
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone, city } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  if (password.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser)
    return res.status(409).json({ success: false, message: 'An account with this email already exists' });

  const newUser = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // plain text for demo
    phone: phone || '',
    city: city || 'Pune',
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email, name: newUser.name, role: 'user' },
    USER_JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(201).json({
    success: true,
    message: 'Account created successfully!',
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, city: newUser.city }
  });
});

// POST Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required' });

  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password)
    return res.status(401).json({ success: false, message: 'Invalid email or password' });

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.name, role: 'user' },
    USER_JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Login successful!',
    token,
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, city: user.city }
  });
});

// GET Current User
app.get('/api/auth/me', verifyUser, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, phone: user.phone, city: user.city } });
});

// ─── CUSTOMER-FACING ROUTES ──────────────────────────────────────────────────

// GET All Products with Filtering
app.get('/api/products', (req, res) => {
  let { category, region, heatLevel, search, sort } = req.query;
  let filtered = [...products];
  if (category && category !== 'All') filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (region && region !== 'All') filtered = filtered.filter(p => p.region.toLowerCase().includes(region.toLowerCase()));
  if (heatLevel && heatLevel !== 'All') filtered = filtered.filter(p => p.heatLevel === parseInt(heatLevel));
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.marathiName.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.ingredients.toLowerCase().includes(q)
    );
  }
  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  res.json({ success: true, count: filtered.length, products: filtered });
});

// GET Single Product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

// GET Recipes
app.get('/api/recipes', (req, res) => {
  res.json({ success: true, recipes });
});

// POST Custom Combo Box Calculation
app.post('/api/custom-box', (req, res) => {
  const { selectedProductIds } = req.body;
  if (!selectedProductIds || !Array.isArray(selectedProductIds))
    return res.status(400).json({ success: false, message: 'Invalid product selection' });
  const selectedProducts = products.filter(p => selectedProductIds.includes(p.id));
  const originalTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discount = selectedProducts.length >= 4 ? 100 : selectedProducts.length * 20;
  const finalPrice = Math.max(0, originalTotal - discount);
  res.json({ success: true, boxItemsCount: selectedProducts.length, originalTotal, discount, finalPrice, selectedProducts });
});

// POST Create Order (optionally authenticated)
app.post('/api/orders', (req, res) => {
  const { customerName, phone, address, city, pincode, items, totalAmount, paymentMethod } = req.body;
  if (!customerName || !phone || !items || items.length === 0)
    return res.status(400).json({ success: false, message: 'Missing required order fields' });

  // Try to get user from token (optional for guest orders)
  let userId = null;
  const auth = req.headers['authorization'];
  if (auth) {
    try {
      const decoded = jwt.verify(auth.split(' ')[1], USER_JWT_SECRET);
      userId = decoded.userId;
    } catch { /* guest order */ }
  }

  const subtotal = items.reduce((s, i) => s + (i.price * i.quantity), 0);
  const shippingCost = subtotal >= 999 ? 0 : 70;
  const discount = 0;
  const estimatedDelivery = new Date(Date.now() + 5 * 86400000).toISOString();

  const nowISO = new Date().toISOString();
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    userId,
    customerName,
    phone,
    address: `${address}, ${city} - ${pincode}`,
    city,
    pincode,
    items: items.map(item => ({
      id: item.id,
      name: item.name || item.marathiName || 'Product',
      quantity: item.quantity,
      price: item.price,
      image: item.image || '',
      subtotal: item.price * item.quantity
    })),
    subtotal,
    shippingCost,
    discount,
    totalAmount,
    paymentMethod: paymentMethod || 'UPI/Online',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    estimatedDelivery,
    statusHistory: [
      { status: 'Placed', timestamp: nowISO, note: 'Order received successfully' },
      { status: 'Confirmed', timestamp: new Date(Date.now() + 5 * 60000).toISOString(), note: 'Order confirmed by Naik Foods' }
    ],
    createdAt: nowISO,
    updatedAt: nowISO
  };
  orders.unshift(newOrder);
  items.forEach(item => {
    const p = products.find(prod => prod.id === item.id);
    if (p && p.stockCount) p.stockCount = Math.max(0, p.stockCount - item.quantity);
  });
  res.status(201).json({ success: true, message: 'Order placed successfully!', order: newOrder });
});

// ─── USER ORDER ROUTES ───────────────────────────────────────────────────────

// GET My Orders (requires user auth)
app.get('/api/orders/my-orders', verifyUser, (req, res) => {
  const { status, sort } = req.query;
  let myOrders = orders.filter(o => o.userId === req.user.userId);
  if (status && status !== 'All') myOrders = myOrders.filter(o => o.status === status);
  if (sort === 'oldest') myOrders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  else myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, count: myOrders.length, orders: myOrders });
});

// GET Single Order (user must own it)
app.get('/api/orders/:orderId', verifyUser, (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (order.userId !== req.user.userId)
    return res.status(403).json({ success: false, message: 'You are not authorized to view this order' });
  res.json({ success: true, order });
});

// GET Order Tracking (user must own it)
app.get('/api/orders/:orderId/tracking', verifyUser, (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (order.userId !== req.user.userId)
    return res.status(403).json({ success: false, message: 'You are not authorized to track this order' });
  res.json({
    success: true,
    order,
    tracking: {
      orderId: order.id,
      currentStatus: order.status,
      estimatedDelivery: order.estimatedDelivery,
      statusHistory: order.statusHistory || [],
      pipeline: ORDER_STATUS_PIPELINE,
      shippingAddress: order.address,
      updatedAt: order.updatedAt
    }
  });
});

// PATCH Cancel Order (user must own it and status must be pending/confirmed)
app.patch('/api/orders/:orderId/cancel', verifyUser, (req, res) => {
  const order = orders.find(o => o.id === req.params.orderId);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (order.userId !== req.user.userId)
    return res.status(403).json({ success: false, message: 'You are not authorized to cancel this order' });
  if (['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status)) {
    return res.status(400).json({ success: false, message: 'Dispatched or delivered orders cannot be cancelled' });
  }
  order.status = 'Cancelled';
  order.updatedAt = new Date().toISOString();
  if (!order.statusHistory) order.statusHistory = [];
  order.statusHistory.push({
    status: 'Cancelled',
    timestamp: new Date().toISOString(),
    note: 'Order cancelled by customer'
  });
  res.json({ success: true, message: 'Order cancelled successfully', order });
});

// Legacy analytics endpoint (keep for backward compat)
app.get('/api/analytics', (req, res) => {
  const validOrders = orders.filter(o => o.status !== 'Cancelled');
  res.json({
    success: true,
    analytics: {
      totalRevenue: validOrders.reduce((sum, o) => sum + o.totalAmount, 0),
      totalOrders: orders.length,
      activeProductsCount: products.filter(p => p.inStock).length,
      outOfStockCount: products.filter(p => !p.inStock || p.stockCount === 0).length
    },
    recentOrders: orders
  });
});

// POST Add New Product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: `prod_${Date.now()}`,
    ...req.body,
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    stockCount: parseInt(req.body.stockCount || 50),
    minimumStock: parseInt(req.body.minimumStock || 10)
  };
  products.unshift(newProduct);
  res.status(201).json({ success: true, product: newProduct });
});

// ─── ADMIN AUTH ROUTES ───────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD)
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ success: true, token, admin: { email, name: 'Naik Foods Admin', role: 'admin' } });
});

app.get('/api/admin/me', verifyAdmin, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

// ─── ADMIN DASHBOARD ────────────────────────────────────────────────────────

app.get('/api/admin/dashboard', verifyAdmin, (req, res) => {
  const validOrders = orders.filter(o => o.status !== 'Cancelled');
  const now = Date.now();
  const weekMs = 7 * 86400000;

  const thisWeekOrders = validOrders.filter(o => now - new Date(o.createdAt).getTime() <= weekMs);
  const lastWeekOrders = validOrders.filter(o => {
    const age = now - new Date(o.createdAt).getTime();
    return age > weekMs && age <= 2 * weekMs;
  });
  const thisWeekRevenue = thisWeekOrders.reduce((s, o) => s + o.totalAmount, 0);
  const lastWeekRevenue = lastWeekOrders.reduce((s, o) => s + o.totalAmount, 0);
  const revenueGrowth = lastWeekRevenue === 0 ? 100 : (((thisWeekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100).toFixed(1);

  const lowStockProducts = products.filter(p => p.stockCount <= p.minimumStock);
  const statusBreakdown = ['Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map(status => ({
    status,
    count: orders.filter(o => o.status === status).length
  }));

  res.json({
    success: true,
    totalRevenue: validOrders.reduce((s, o) => s + o.totalAmount, 0),
    totalOrders: orders.length,
    activeProducts: products.filter(p => p.inStock).length,
    lowStockAlerts: lowStockProducts.length,
    revenueGrowth: parseFloat(revenueGrowth),
    statusBreakdown,
    recentOrders: orders.slice(0, 8)
  });
});

// ─── ADMIN SALES CHART ───────────────────────────────────────────────────────

app.get('/api/admin/sales-chart', verifyAdmin, (req, res) => {
  const period = req.query.period || '7days';
  const now = Date.now();
  let labels = [], data = [];

  if (period === '7days') {
    for (let i = 6; i >= 0; i--) {
      const dayStart = now - (i + 1) * 86400000;
      const dayEnd = now - i * 86400000;
      const dayOrders = orders.filter(o => {
        const t = new Date(o.createdAt).getTime();
        return t >= dayStart && t < dayEnd && o.status !== 'Cancelled';
      });
      const date = new Date(dayEnd);
      labels.push(date.toLocaleDateString('en-IN', { weekday: 'short' }));
      data.push(dayOrders.reduce((s, o) => s + o.totalAmount, 0));
    }
  } else if (period === '30days') {
    for (let i = 29; i >= 0; i -= 5) {
      const dayStart = now - (i + 5) * 86400000;
      const dayEnd = now - i * 86400000;
      const dayOrders = orders.filter(o => {
        const t = new Date(o.createdAt).getTime();
        return t >= dayStart && t < dayEnd && o.status !== 'Cancelled';
      });
      const date = new Date(dayEnd);
      labels.push(date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }));
      data.push(dayOrders.reduce((s, o) => s + o.totalAmount, 0));
    }
  } else {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 11; i >= 0; i--) {
      labels.push(monthNames[(new Date().getMonth() - i + 12) % 12]);
      data.push(i < 3 ? orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.totalAmount, 0) / (3 - i + 1) : 0);
    }
  }

  res.json({ success: true, labels, data });
});

// ─── ADMIN ORDERS ────────────────────────────────────────────────────────────

app.get('/api/admin/orders', verifyAdmin, (req, res) => {
  const { status, search } = req.query;
  let filtered = [...orders];
  if (status && status !== 'All') filtered = filtered.filter(o => o.status === status);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(o =>
      o.customerName.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      (o.city && o.city.toLowerCase().includes(q))
    );
  }
  res.json({ success: true, count: filtered.length, orders: filtered });
});

app.get('/api/admin/orders/:id', verifyAdmin, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, order });
});

app.patch('/api/admin/orders/:id/status', verifyAdmin, (req, res) => {
  const { status } = req.body;
  if (!VALID_ADMIN_STATUSES.includes(status))
    return res.status(400).json({ success: false, message: 'Invalid status' });
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  order.status = status;
  order.updatedAt = new Date().toISOString();

  // Push to statusHistory if not already recorded
  if (!order.statusHistory) order.statusHistory = [];
  const alreadyRecorded = order.statusHistory.find(h => h.status === status);
  if (!alreadyRecorded) {
    order.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: `Status updated to ${status} by admin`
    });
  }

  res.json({ success: true, order });
});

// ─── ADMIN PRODUCTS ──────────────────────────────────────────────────────────

app.get('/api/admin/products', verifyAdmin, (req, res) => {
  res.json({ success: true, count: products.length, products });
});

app.put('/api/admin/products/:id', verifyAdmin, (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  products[idx] = { ...products[idx], ...req.body };
  res.json({ success: true, product: products[idx] });
});

app.delete('/api/admin/products/:id', verifyAdmin, (req, res) => {
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });
  products.splice(idx, 1);
  res.json({ success: true, message: 'Product deleted successfully' });
});

app.patch('/api/admin/products/:id/stock', verifyAdmin, (req, res) => {
  const { stockCount } = req.body;
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  product.stockCount = parseInt(stockCount);
  product.inStock = product.stockCount > 0;
  res.json({ success: true, product });
});

// ─── ADMIN INVENTORY ─────────────────────────────────────────────────────────

app.get('/api/admin/inventory', verifyAdmin, (req, res) => {
  const inventory = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    stockCount: p.stockCount,
    minimumStock: p.minimumStock || 10,
    inStock: p.inStock,
    stockStatus: p.stockCount === 0 ? 'Out of Stock' : p.stockCount <= (p.minimumStock || 10) ? 'Low Stock' : 'In Stock'
  }));
  res.json({ success: true, inventory });
});

// ─── ADMIN CUSTOMERS ─────────────────────────────────────────────────────────

app.get('/api/admin/customers', verifyAdmin, (req, res) => {
  const { search } = req.query;
  const customerMap = {};
  orders.forEach(order => {
    const key = order.phone;
    if (!customerMap[key]) {
      customerMap[key] = {
        id: `cust_${key}`,
        name: order.customerName,
        phone: order.phone,
        city: order.city,
        address: order.address,
        totalOrders: 0,
        totalSpent: 0,
        firstOrder: order.createdAt,
        lastOrder: order.createdAt
      };
    }
    customerMap[key].totalOrders += 1;
    if (order.status !== 'Cancelled') customerMap[key].totalSpent += order.totalAmount;
    if (new Date(order.createdAt) > new Date(customerMap[key].lastOrder)) customerMap[key].lastOrder = order.createdAt;
  });
  let customers = Object.values(customerMap);
  if (search) {
    const q = search.toLowerCase();
    customers = customers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.city.toLowerCase().includes(q));
  }
  res.json({ success: true, count: customers.length, customers });
});

// ─── ADMIN CATEGORIES ────────────────────────────────────────────────────────

app.get('/api/admin/categories', verifyAdmin, (req, res) => {
  res.json({ success: true, categories });
});

app.post('/api/admin/categories', verifyAdmin, (req, res) => {
  const newCat = { id: `cat_${Date.now()}`, ...req.body, isActive: true, productCount: 0 };
  categories.push(newCat);
  res.status(201).json({ success: true, category: newCat });
});

app.put('/api/admin/categories/:id', verifyAdmin, (req, res) => {
  const idx = categories.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found' });
  categories[idx] = { ...categories[idx], ...req.body };
  res.json({ success: true, category: categories[idx] });
});

app.delete('/api/admin/categories/:id', verifyAdmin, (req, res) => {
  const idx = categories.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found' });
  categories.splice(idx, 1);
  res.json({ success: true, message: 'Category deleted' });
});

// ─── ADMIN REVIEWS ───────────────────────────────────────────────────────────

app.get('/api/admin/reviews', verifyAdmin, (req, res) => {
  res.json({ success: true, reviews });
});

app.patch('/api/admin/reviews/:id', verifyAdmin, (req, res) => {
  const review = reviews.find(r => r.id === req.params.id);
  if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
  Object.assign(review, req.body);
  res.json({ success: true, review });
});

app.delete('/api/admin/reviews/:id', verifyAdmin, (req, res) => {
  const idx = reviews.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Review not found' });
  reviews.splice(idx, 1);
  res.json({ success: true, message: 'Review deleted' });
});

// ─── PRODUCTION STATIC SERVE ─────────────────────────────────────────────────
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Naik Foods API Server → http://localhost:${PORT}`);
  console.log(`Admin: ${ADMIN_EMAIL} | Password: ${ADMIN_PASSWORD}`);
  console.log(`Demo User: amit@example.com | Password: demo123`);
});
