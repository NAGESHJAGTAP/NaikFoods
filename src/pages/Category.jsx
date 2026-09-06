import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, X, Sparkles } from 'lucide-react';

export default function Category({
  products,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  isMarathi
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedHeatLevel, setSelectedHeatLevel] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = ["All", "Masalas & Spices", "Pickles & Chutneys", "Snacks & Namkeen", "Staples & Mixes"];
  const regions = ["All", "Vidarbha & Pune", "Konkan Coast", "Kolhapur", "Marathwada", "Pune & Western MH"];
  const heatLevels = [
    { label: "All Levels", value: "All" },
    { label: "Mild", value: "1" },
    { label: "Medium", value: "2" },
    { label: "Spicy", value: "3" },
    { label: "Extra Spicy", value: "4" }
  ];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedRegion !== 'All' && !product.region.toLowerCase().includes(selectedRegion.toLowerCase())) return false;
    if (selectedHeatLevel !== 'All' && product.heatLevel !== parseInt(selectedHeatLevel)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchMarathi = (product.marathiName || '').toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchIngredients = (product.ingredients || '').toLowerCase().includes(q);
      if (!matchName && !matchMarathi && !matchDesc && !matchIngredients) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRegion('All');
    setSelectedHeatLevel('All');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8 font-sans text-left">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
              {isMarathi ? "संपूर्ण कॅटलॉग" : "Complete Catalog"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {isMarathi ? "नाईक फूड्स उत्पादने व मसाले" : "All Naik Foods Products & Spices"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Hand-pounded masalas, artisanal sun-dried pickles, and traditional Maharashtrian snacks.
          </p>
        </div>

        {/* Filter Controls & Search Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200/90 dark:border-zinc-800 p-5 sm:p-6 shadow-sm space-y-5">
          
          {/* Top Row: Search & Category Pills */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMarathi ? "मसाले, लोणचे, भाकरवडी शोधा..." : "Search masalas, pickles, snacks, ingredients..."}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <ArrowUpDown className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="recommended">Featured / Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>

          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sub Filters: Region & Heat Level */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs">
            
            {/* Region */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-400 uppercase text-[10px]">Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-1.5 rounded-lg font-bold bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Heat Level */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-400 uppercase text-[10px]">Spice Heat:</span>
              <select
                value={selectedHeatLevel}
                onChange={(e) => setSelectedHeatLevel(e.target.value)}
                className="px-3 py-1.5 rounded-lg font-bold bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
              >
                {heatLevels.map((h) => (
                  <option key={h.value} value={h.value}>{h.label}</option>
                ))}
              </select>
            </div>

            {/* Active filters count & Reset */}
            {(selectedCategory !== 'All' || selectedRegion !== 'All' || selectedHeatLevel !== 'All' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-bold px-1">
          <span>Showing {filteredProducts.length} authentic products</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 text-center space-y-4">
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">
              No products found matching your current filter.
            </p>
            <p className="text-xs text-gray-400">
              Try adjusting your search keyword or resetting the category and heat level filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-brand-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                isMarathi={isMarathi}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
