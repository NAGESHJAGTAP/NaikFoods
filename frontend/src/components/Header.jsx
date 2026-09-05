import React from 'react';
import { ShoppingBag, Heart, Search, Sparkles, MapPin, ShieldCheck, Lock, Phone } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  setIsCartOpen, 
  wishlistCount,
  selectedRegion,
  setSelectedRegion,
  isAdmin,
  setIsAdmin,
  isMarathi,
  setIsMarathi
}) {
  const regions = ["All", "Vidarbha & Pune", "Konkan Coast", "Kolhapur", "Marathwada", "Pune & Western MH"];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-orange-100 dark:border-zinc-800">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Original Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-saffron-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-saffron-600/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1 font-heading">
                SWAD<span className="text-saffron-600">YATRA</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400">
                {isMarathi ? "अस्सल प्रादेशिक चव" : "Regional Spice Discovery Engine"}
              </span>
            </div>
          </a>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block relative">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMarathi ? "मसाले, लोणचे, भाकरवडी शोधा..." : "Search Godaa masala, Shevga pickle, Bhakarwadi..."}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-saffron-500 dark:text-white transition-all placeholder:text-zinc-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Region Dropdown */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full px-3 text-zinc-700 dark:text-zinc-300">
            <MapPin className="w-3.5 h-3.5 text-saffron-600" />
            <span>Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-transparent border-none text-xs font-bold text-saffron-600 dark:text-saffron-400 focus:outline-none cursor-pointer"
            >
              {regions.map(r => (
                <option key={r} value={r} className="dark:bg-zinc-900 dark:text-white">{r}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            
            {/* Language Switch */}
            <button
              onClick={() => setIsMarathi(!isMarathi)}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-white"
            >
              {isMarathi ? "EN" : "मराठी"}
            </button>

            {/* Admin Switch */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                isAdmin 
                  ? 'bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-400'
                  : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400 hover:bg-zinc-100'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>{isAdmin ? 'Admin ON' : 'Admin Portal'}</span>
            </button>

            {/* Wishlist */}
            <button 
              className="relative p-2 text-zinc-700 dark:text-zinc-300 hover:text-saffron-600 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-saffron-600 hover:bg-saffron-700 text-white px-3.5 py-2 rounded-full font-bold text-xs shadow-md shadow-saffron-600/20 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{isMarathi ? "माझी टोपली" : "Cart"}</span>
              <span className="bg-white text-saffron-700 px-1.5 py-0.5 rounded-full text-[11px] font-extrabold">
                {cartCount}
              </span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
