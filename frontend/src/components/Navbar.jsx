import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, Menu, X, Lock, Phone, User, 
  LogOut, Package, History, ChevronDown, ChevronRight,
  Home, Grid, Info, BookOpen, Mail, ShieldCheck, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  cartCount, 
  setIsCartOpen, 
  wishlistCount,
  isMarathi,
  setIsMarathi
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home', marathi: 'मुख्यपृष्ठ', icon: Home, end: true },
    { to: '/category', label: 'Categories', marathi: 'उत्पादने', icon: Grid },
    { to: '/about', label: 'About Us', marathi: 'आमच्याबद्दल', icon: Info },
    { to: '/blog', label: 'Blog', marathi: 'ब्लॉग', icon: BookOpen },
    { to: '/contact', label: 'Contact', marathi: 'संपर्क', icon: Mail },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-zinc-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform shrink-0">
                N
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-base sm:text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1 leading-none">
                  NAIK <span className="text-brand-500">FOODS</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-zinc-400 hidden xs:block truncate mt-0.5">
                  {isMarathi ? "अस्सल महाराष्ट्रीयन चव" : "Authentic Maharashtrian Taste"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Visible on lg and above) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map(({ to, label, marathi, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `px-3 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/40 shadow-2xs'
                        : 'text-gray-700 dark:text-zinc-300 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-zinc-800'
                    }`
                  }
                >
                  <span>{isMarathi ? marathi : label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Right Action Icons & Toggles */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Language Switcher */}
              <button
                onClick={() => setIsMarathi(!isMarathi)}
                className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-black rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-brand-500 hover:text-brand-500 transition-all text-gray-700 dark:text-zinc-200 bg-white dark:bg-zinc-800 shrink-0"
                title={isMarathi ? "Switch to English" : "मराठीत बदला"}
              >
                {isMarathi ? "EN" : "मराठी"}
              </button>

              {/* Admin Portal Link (Visible on xl and above) */}
              <Link
                to="/admin/dashboard"
                className="hidden xl:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border font-bold border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-brand-500 hover:text-brand-600 transition-all shrink-0"
                title="Admin Dashboard"
              >
                <Lock className="w-3.5 h-3.5 text-brand-500" />
                <span>Admin</span>
              </Link>

              {/* Wishlist Link */}
              <Link 
                to="/category"
                className="relative p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 hover:text-rose-500 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 shrink-0"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button: Drawer trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-extrabold text-xs shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
                title="Open Cart"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{isMarathi ? "टोपली" : "Cart"}</span>
                <span className="bg-white text-brand-700 px-1.5 py-0.5 rounded-full text-[11px] font-black leading-none min-w-[18px] text-center">
                  {cartCount}
                </span>
              </button>

              {/* Desktop User Account Section (Hidden on mobile/tablet, available in mobile drawer) */}
              <div className="hidden lg:block">
                {isAuthenticated && user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-brand-500 transition text-stone-800 dark:text-zinc-200 bg-white dark:bg-zinc-800"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 text-white text-xs font-bold flex items-center justify-center shadow-xs shadow-brand-500/25">
                        {getInitials(user.name)}
                      </div>
                      <span className="text-xs font-bold max-w-[100px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-stone-200 dark:border-zinc-800 py-2 z-50 animate-fadeIn">
                        <div className="px-4 py-2.5 border-b border-stone-100 dark:border-zinc-800 text-left">
                          <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-stone-500 dark:text-zinc-400 truncate">
                            {user.email}
                          </p>
                        </div>

                        <div className="py-1 text-left">
                          <Link
                            to="/account/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:bg-brand-50 dark:hover:bg-zinc-800 hover:text-brand-700 transition"
                          >
                            <Package className="w-4 h-4 text-brand-600" />
                            <span>My Orders</span>
                          </Link>

                          <Link
                            to="/account/order-history"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:bg-brand-50 dark:hover:bg-zinc-800 hover:text-brand-700 transition"
                          >
                            <History className="w-4 h-4 text-brand-600" />
                            <span>Order History &amp; Invoices</span>
                          </Link>

                          <Link
                            to="/cart"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:bg-brand-50 dark:hover:bg-zinc-800 hover:text-brand-700 transition"
                          >
                            <ShoppingBag className="w-4 h-4 text-brand-600" />
                            <span>Shopping Cart ({cartCount})</span>
                          </Link>
                        </div>

                        <div className="pt-1 border-t border-stone-100 dark:border-zinc-800">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border font-bold border-brand-500 text-brand-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition shadow-2xs"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>

              {/* Mobile Hamburger Toggle Button (Visible below lg: 1024px) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-stone-950/50 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Out Drawer Navigation (All devices under lg: smartphones, tablets) */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white dark:bg-zinc-900 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden border-l border-gray-200 dark:border-zinc-800 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-stone-50/70 dark:bg-zinc-800/40">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-brand-500/25">
              N
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-gray-900 dark:text-white block leading-tight">
                NAIK <span className="text-brand-500">FOODS</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400 dark:text-zinc-400">
                {isMarathi ? "अस्सल महाराष्ट्रीयन चव" : "Pure Taste of Pune"}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

          {/* User Account State Card */}
          <div className="bg-stone-50 dark:bg-zinc-800/60 rounded-2xl p-3.5 border border-stone-200/70 dark:border-zinc-700/60 text-left">
            {isAuthenticated && user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 text-white text-sm font-bold flex items-center justify-center shadow-xs">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200/50 dark:border-zinc-700/50 text-xs">
                  <Link
                    to="/account/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-200 font-bold border border-stone-200 dark:border-zinc-700"
                  >
                    <Package className="w-3.5 h-3.5 text-brand-600" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/account/order-history"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-200 font-bold border border-stone-200 dark:border-zinc-700"
                  >
                    <History className="w-3.5 h-3.5 text-brand-600" />
                    <span>History</span>
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 pt-1 hover:underline"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out (लॉगआउट)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span className="text-xs font-black text-gray-900 dark:text-white">
                    {isMarathi ? "नाईक फूड्समध्ये आपले स्वागत आहे" : "Welcome to Naik Foods"}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400">
                  {isMarathi ? "ऑर्डर ट्रॅक करण्यासाठी आणि जलद खरेदीसाठी लॉगिन करा." : "Sign in to view orders, track packages, and checkout faster."}
                </p>
                <div className="flex gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-2 bg-white dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 rounded-xl text-xs font-bold border border-stone-200 dark:border-zinc-700 active:scale-95 transition"
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links with Icons */}
          <div className="space-y-1 text-left">
            <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              {isMarathi ? "नेव्हिगेशन" : "Main Navigation"}
            </p>
            {navLinks.map(({ to, label, marathi, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'text-brand-600 bg-brand-50 dark:bg-brand-950/50'
                      : 'text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-brand-600" />
                  <span>{isMarathi ? marathi : label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-zinc-600" />
              </NavLink>
            ))}

            {/* Shopping Cart Link in Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-brand-600" />
                <span>{isMarathi ? "माझी टोपली" : "Shopping Cart"}</span>
              </div>
              <span className="bg-brand-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Quick Shortcuts & Helpers */}
          <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-zinc-800 text-left">
            <p className="px-3 pb-1 text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              {isMarathi ? "त्वरित दुवे" : "Quick Actions"}
            </p>

            {/* Language Selector Pill */}
            <button
              onClick={() => setIsMarathi(!isMarathi)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-stone-50 dark:bg-zinc-800"
            >
              <span className="flex items-center gap-2">
                🌐 <span>Language / भाषा:</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-brand-500 text-white font-extrabold text-[11px]">
                {isMarathi ? "मराठी (Marathi)" : "English"}
              </span>
            </button>

            {/* WhatsApp Ordering */}
            <a
              href="https://wa.me/919730046247"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Order Support</span>
              </div>
              <span className="text-[11px] font-black text-emerald-600">9730046247</span>
            </a>

            {/* Admin Portal Link */}
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-brand-500" />
                <span>Admin Portal (ॲडमिन डॅशबोर्ड)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </Link>
          </div>

          {/* Heritage Pune Badge */}
          <div className="p-3 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-900/40 flex items-center gap-2.5 text-left">
            <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
            <div className="text-[11px] font-bold text-brand-900 dark:text-brand-300 leading-tight">
              पुणेरी अस्सल चव • 100% Authentic Quality
              <span className="block text-[10px] font-normal text-stone-500 dark:text-zinc-400 mt-0.5">
                Shukrawar Peth, Pune, Maharashtra
              </span>
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-zinc-800 bg-stone-50/80 dark:bg-zinc-800/60 text-center">
          <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500">
            © {new Date().getFullYear()} Naik Foods. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

