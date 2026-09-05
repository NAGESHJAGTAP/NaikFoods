import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Lock, Phone, User, LogOut, Package, History, ChevronDown } from 'lucide-react';
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

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home', marathi: 'मुख्यपृष्ठ', end: true },
    { to: '/category', label: 'Categories', marathi: 'उत्पादने' },
    { to: '/about', label: 'About Us', marathi: 'आमच्याबद्दल' },
    { to: '/blog', label: 'Blog', marathi: 'ब्लॉग' },
    { to: '/contact', label: 'Contact', marathi: 'संपर्क' },
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-zinc-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform shrink-0">
                N
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                  NAIK <span className="text-brand-500">FOODS</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  {isMarathi ? "अस्सल महाराष्ट्रीयन चव" : "Authentic Maharashtrian Taste"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(({ to, label, marathi, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/40'
                      : 'text-gray-700 dark:text-zinc-300 hover:text-brand-600 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`
                }
              >
                <span>{isMarathi ? marathi : label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Toggles */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Language Switcher */}
            <button
              onClick={() => setIsMarathi(!isMarathi)}
              className="px-2.5 py-1 text-xs font-black rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-brand-500 hover:text-brand-500 transition-all text-gray-700 dark:text-zinc-200 bg-white dark:bg-zinc-800"
              title="Toggle Language"
            >
              {isMarathi ? "EN" : "मराठी"}
            </button>

            {/* Admin Portal Link */}
            <Link
              to="/admin/dashboard"
              className="hidden lg:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl border font-bold border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:border-brand-500 hover:text-brand-600 transition-all"
              title="Admin Dashboard"
            >
              <Lock className="w-3.5 h-3.5 text-brand-500" />
              <span>Admin</span>
            </Link>

            {/* Wishlist Button */}
            <button 
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-rose-500 transition-colors rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button: Link to /cart & Drawer trigger */}
            <div className="flex items-center">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-3 sm:px-4 py-2 rounded-full font-extrabold text-xs shadow-md shadow-brand-500/25 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{isMarathi ? "टोपली" : "Cart"}</span>
                <span className="bg-white text-brand-700 px-1.5 py-0.5 rounded-full text-[11px] font-black leading-none">
                  {cartCount}
                </span>
              </button>
            </div>

            {/* User Account Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 dark:border-zinc-700 hover:border-brand-500 transition text-stone-800 dark:text-zinc-200 bg-white dark:bg-zinc-800"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-brand-500/25">
                    {getInitials(user.name)}
                  </div>
                  <span className="hidden md:inline text-xs font-bold max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-stone-200 dark:border-zinc-800 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-stone-100 dark:border-zinc-800">
                      <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-zinc-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
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
              <div className="flex items-center gap-1.5">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl border font-bold border-brand-500 text-brand-700 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-zinc-800 bg-white/98 dark:bg-zinc-900/98 px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map(({ to, label, marathi, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'text-brand-600 bg-brand-50 dark:bg-brand-950/50'
                    : 'text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800'
                }`
              }
            >
              {isMarathi ? marathi : label}
            </NavLink>
          ))}

          {/* User Section in Mobile Menu */}
          <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
            {isAuthenticated && user ? (
              <div className="space-y-1.5 pb-2">
                <div className="px-4 py-2 bg-stone-50 dark:bg-zinc-800/60 rounded-xl">
                  <p className="text-xs font-bold text-stone-900 dark:text-white">{user.name}</p>
                  <p className="text-[11px] text-stone-500 dark:text-zinc-400">{user.email}</p>
                </div>
                <Link
                  to="/account/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-700 dark:text-zinc-200 hover:bg-brand-50 rounded-xl"
                >
                  <Package className="w-4 h-4 text-brand-600" /> My Orders
                </Link>
                <Link
                  to="/account/order-history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-700 dark:text-zinc-200 hover:bg-brand-50 rounded-xl"
                >
                  <History className="w-4 h-4 text-brand-600" /> Order History
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-700 dark:text-zinc-200 hover:bg-brand-50 rounded-xl"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-600" /> View Cart
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2 py-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 bg-stone-100 text-stone-800 rounded-xl text-xs font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <Link
              to="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-zinc-300 px-3 py-2 rounded-xl border border-gray-200 dark:border-zinc-700"
            >
              <Lock className="w-3.5 h-3.5 text-brand-500" />
              <span>Admin Portal</span>
            </Link>

            <a
              href="https://wa.me/919730046247"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> WhatsApp Order
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
