import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Search, X, RotateCcw, Check } from 'lucide-react';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import RegionalMap from './components/RegionalMap';
import ProductCard from './components/ProductCard';
import CustomBoxBuilder from './components/CustomBoxBuilder';
import RecipeSection from './components/RecipeSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';

// Storefront Pages
import Category from './pages/Category';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';

// Auth & Account Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MyOrders from './pages/account/MyOrders';
import OrderDetail from './pages/account/OrderDetail';
import OrderTracking from './pages/account/OrderTracking';
import OrderHistory from './pages/account/OrderHistory';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Inventory from './pages/admin/Inventory';
import Customers from './pages/admin/Customers';
import Categories from './pages/admin/Categories';
import Reviews from './pages/admin/Reviews';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Guard for logged-in user account
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-stone-500 text-sm">
        Authenticating...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Home Page Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedHeatLevel, setSelectedHeatLevel] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [isMarathi, setIsMarathi] = useState(false);

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch Products & Recipes from API
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [prodRes, recipeRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/recipes')
      ]);

      const prodData = await prodRes.json();
      const recipeData = await recipeRes.json();

      if (prodData.success) {
        setProducts(prodData.products);
      }
      if (recipeData.success) {
        setRecipes(recipeData.recipes);
      }
    } catch (err) {
      console.error('API load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast(`Added "${product.name}" to cart`);
  };

  const handleAddMultipleToCart = (productsList) => {
    productsList.forEach(p => handleAddToCart(p));
    setIsCartOpen(true);
  };

  const handleAddCustomBoxToCart = (comboItem) => {
    setCartItems(prev => [...prev, comboItem]);
    setIsCartOpen(true);
    triggerToast('Custom Gift Box added to cart');
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Wishlist Operation
  const handleToggleWishlist = (id) => {
    setWishlistIds(prev => {
      const isAlready = prev.includes(id);
      if (isAlready) {
        triggerToast("Removed from Wishlist");
        return prev.filter(item => item !== id);
      } else {
        triggerToast("Added to Wishlist");
        return [...prev, id];
      }
    });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Home Page Filtered Products
  const categories = ["All", "Masalas & Spices", "Pickles & Chutneys", "Snacks & Namkeen", "Staples & Mixes"];

  const filteredProducts = products.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = p.name.toLowerCase().includes(q) || (p.marathiName && p.marathiName.toLowerCase().includes(q));
      const matchesDesc = (p.description || '').toLowerCase().includes(q) || (p.ingredients || '').toLowerCase().includes(q);
      if (!matchesName && !matchesDesc) return false;
    }

    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }

    if (selectedRegion !== 'All' && !p.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
      return false;
    }

    if (selectedHeatLevel !== 'All' && p.heatLevel !== parseInt(selectedHeatLevel)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const resetHomeFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSelectedHeatLevel('All');
    setSortBy('recommended');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedRegion !== 'All' || selectedHeatLevel !== 'All' || sortBy !== 'recommended';

  // Home Page Content Component
  const HomePage = () => (
    <div>
      {/* Hero Banner */}
      <HeroBanner 
        isMarathi={isMarathi}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
      />

      {/* Regional Maharashtra Map */}
      <RegionalMap
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        isMarathi={isMarathi}
      />

      {/* SEARCH BOX DIRECTLY BELOW "Explore Culinary Regions" */}
      <section className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-3 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {isMarathi ? "मसाले शोध इंजिन" : "Naik Foods Product Discovery"}
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                {isMarathi ? "आपल्या पसंतीचे मसाले व लोणचे शोधा" : "Find Your Favorite Spices, Pickles & Snacks"}
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetHomeFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isMarathi ? "फिल्टर रीसेट करा" : "Reset Filters"}</span>
              </button>
            )}
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isMarathi 
                  ? "नूडल्स, खाकरा, सूप, मसाले शोधा (उदा. मिलेट नूडल्स, मिसळ रस्सा, शेवगा सूप)..."
                  : "Search noodles, khakhra, soup, masalas (e.g. Millet Noodles, Misal Rassa, Shevga Soup)..."
              }
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-xs text-gray-900 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Popular Quick Search Tags */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
            <span className="text-gray-400 font-semibold">{isMarathi ? "लोकप्रिय शोध:" : "Popular:"}</span>
            {["Millet Noodles", "Palak Khakhra", "Shevga Soup", "Mitha Paan", "MoongBhaji", "Misal Rassa", "Paneer Maratha", "Misal Farsan"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 hover:bg-brand-50 hover:text-brand-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full text-left">
        
        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-bold text-xs whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                    : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Heat Level & Sort Dropdowns */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs">
            
            {/* Heat Level Selector */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700">
              <span className="text-gray-500 font-semibold">Heat:</span>
              <select
                value={selectedHeatLevel}
                onChange={(e) => setSelectedHeatLevel(e.target.value)}
                className="bg-transparent font-bold text-brand-600 dark:text-brand-400 focus:outline-none cursor-pointer"
              >
                <option value="All" className="dark:bg-zinc-900">All Levels</option>
                <option value="1" className="dark:bg-zinc-900">Level 1 (Mild)</option>
                <option value="2" className="dark:bg-zinc-900">Level 2 (Medium)</option>
                <option value="3" className="dark:bg-zinc-900">Level 3 (Spicy)</option>
                <option value="4" className="dark:bg-zinc-900">Level 4 (Extra Spicy)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-700">
              <span className="text-gray-500 font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="recommended" className="dark:bg-zinc-900">Recommended</option>
                <option value="price-low" className="dark:bg-zinc-900">Price: Low to High</option>
                <option value="price-high" className="dark:bg-zinc-900">Price: High to Low</option>
                <option value="rating" className="dark:bg-zinc-900">Highest Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-6">
          <p>
            Showing <span className="font-bold text-gray-900 dark:text-white">{filteredProducts.length}</span> authentic products
            {selectedCategory !== 'All' && <span> in <span className="font-semibold text-brand-600 dark:text-brand-400">{selectedCategory}</span></span>}
            {selectedRegion !== 'All' && <span> from <span className="font-semibold text-brand-600 dark:text-brand-400">{selectedRegion}</span></span>}
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-semibold">Fetching authentic spices from Naik Foods...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 bg-white dark:bg-zinc-800/40 rounded-3xl border border-gray-200 dark:border-zinc-800 text-center space-y-3">
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">
              No products found matching your current filter.
            </p>
            <p className="text-xs text-gray-400">
              Try adjusting your search keyword or clearing the filters.
            </p>
            <button
              onClick={resetHomeFilters}
              className="px-5 py-2.5 bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                isMarathi={isMarathi}
              />
            ))}
          </div>
        )}

      </main>

      {/* Recipe Pairing Component */}
      <RecipeSection
        recipes={recipes}
        products={products}
        onAddMultipleToCart={handleAddMultipleToCart}
        isMarathi={isMarathi}
      />
    </div>
  );

  // Storefront Layout Wrapper
  const StorefrontLayout = ({ children }) => (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <Navbar
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        wishlistCount={wishlistIds.length}
        isMarathi={isMarathi}
        setIsMarathi={setIsMarathi}
      />
      <div className="flex-1">{children}</div>
      <Footer isMarathi={isMarathi} />

      {/* Global Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={(total) => {
          setCheckoutTotal(total);
          setIsCheckoutOpen(true);
        }}
        isMarathi={isMarathi}
      />

      <CustomBoxBuilder
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        products={products}
        onAddBoxToCart={handleAddCustomBoxToCart}
        isMarathi={isMarathi}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={checkoutTotal}
        onOrderSuccess={() => {
          setCartItems([]);
          loadInitialData();
        }}
        isMarathi={isMarathi}
      />

      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-brand-500/50 animate-bounce flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Storefront Navigation Pages */}
          <Route path="/" element={<StorefrontLayout><HomePage /></StorefrontLayout>} />
          <Route 
            path="/category" 
            element={
              <StorefrontLayout>
                <Category 
                  products={products}
                  onAddToCart={handleAddToCart}
                  wishlistIds={wishlistIds}
                  onToggleWishlist={handleToggleWishlist}
                  isMarathi={isMarathi}
                />
              </StorefrontLayout>
            } 
          />
          <Route path="/about" element={<StorefrontLayout><About isMarathi={isMarathi} /></StorefrontLayout>} />
          <Route path="/blog" element={<StorefrontLayout><Blog isMarathi={isMarathi} /></StorefrontLayout>} />
          <Route path="/contact" element={<StorefrontLayout><Contact isMarathi={isMarathi} /></StorefrontLayout>} />

          {/* Full Shopping Cart Page */}
          <Route 
            path="/cart" 
            element={
              <StorefrontLayout>
                <CartPage 
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveFromCart}
                  onOpenCheckout={() => {
                    const sub = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
                    const ship = sub >= 499 || sub === 0 ? 0 : 50;
                    setCheckoutTotal(sub + ship);
                    setIsCheckoutOpen(true);
                  }}
                />
              </StorefrontLayout>
            } 
          />

          {/* User Auth Pages */}
          <Route path="/login" element={<StorefrontLayout><Login /></StorefrontLayout>} />
          <Route path="/register" element={<StorefrontLayout><Register /></StorefrontLayout>} />

          {/* User Account & Order Tracking (Protected) */}
          <Route 
            path="/account/orders" 
            element={
              <StorefrontLayout>
                <ProtectedRoute>
                  <MyOrders onAddToCart={handleAddToCart} />
                </ProtectedRoute>
              </StorefrontLayout>
            } 
          />
          <Route 
            path="/account/orders/:orderId" 
            element={
              <StorefrontLayout>
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              </StorefrontLayout>
            } 
          />
          <Route 
            path="/account/orders/:orderId/tracking" 
            element={
              <StorefrontLayout>
                <ProtectedRoute>
                  <OrderTracking />
                </ProtectedRoute>
              </StorefrontLayout>
            } 
          />
          <Route 
            path="/account/order-history" 
            element={
              <StorefrontLayout>
                <ProtectedRoute>
                  <OrderHistory onAddToCart={handleAddToCart} />
                </ProtectedRoute>
              </StorefrontLayout>
            } 
          />

          {/* Dedicated Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="customers" element={<Customers />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
