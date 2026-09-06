import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Heart, ShoppingBag, Star, Info, Check, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist,
  isMarathi 
}) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Clean heat level indicators (No emojis, clean SVG flame icons)
  const renderHeatMeter = (level) => {
    const heatColor = level >= 4 ? "text-rose-600" : level >= 3 ? "text-orange-500" : level >= 2 ? "text-amber-500" : "text-emerald-500";
    const cleanLabel = (product.heatLabel || '').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]/g, '').trim();

    return (
      <div className="flex items-center gap-1 bg-gray-50 dark:bg-zinc-800/80 px-2 py-0.5 rounded-full text-[10px] font-bold border border-gray-100 dark:border-zinc-700">
        <div className={`flex items-center ${heatColor}`}>
          {Array.from({ length: Math.min(level, 4) }).map((_, i) => (
            <Flame key={i} className="w-3 h-3 fill-current" />
          ))}
        </div>
        <span className={`text-[10px] font-bold ${heatColor}`}>
          {cleanLabel || (level >= 4 ? "Extra Spicy" : level >= 3 ? "Spicy" : level >= 2 ? "Medium" : "Mild")}
        </span>
      </div>
    );
  };

  const handleAdd = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    onAddToCart(product);
    navigate('/cart');
  };

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <>
      <div className="group bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200/90 dark:border-zinc-800 p-3.5 sm:p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-500/60 relative flex flex-col justify-between">
        
        {/* Top Image Section */}
        <div 
          onClick={handleBuyNow}
          className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800 mb-3 aspect-square cursor-pointer"
          title="Click to view in Cart"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Clean Discount or Special Badge */}
          {product.badge && (
            <span className="absolute top-2 left-2 bg-brand-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm tracking-wide">
              {product.badge.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27FF]/g, '').trim()}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? "bg-rose-500 text-white shadow-md"
                : "bg-white/85 dark:bg-zinc-900/85 text-gray-700 dark:text-gray-200 hover:text-rose-500"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          {/* Quick Ingredients Pill */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowInfoModal(true);
            }}
            className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-white/90 dark:bg-zinc-900/90 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-zinc-800 transition-all text-[10px] font-bold flex items-center gap-1 shadow-xs border border-gray-100 dark:border-zinc-700"
            title="Ingredients Info"
          >
            <Info className="w-3 h-3 text-brand-500" />
            <span>Info</span>
          </button>

          {discountAmount > 0 && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-black shadow-xs">
              Save ₹{discountAmount}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-2 text-left flex-1 flex flex-col justify-between">
          <div>
            {/* Region & Heat Meter Row */}
            <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-500" />
                {product.region}
              </span>
              {renderHeatMeter(product.heatLevel)}
            </div>

            {/* Product Title (English & Marathi) */}
            <h3 
              onClick={handleBuyNow}
              className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors cursor-pointer"
            >
              {isMarathi ? product.marathiName || product.name : product.name}
            </h3>

            {/* Subtitle / Marathi name if on English */}
            {!isMarathi && product.marathiName && (
              <p className="text-[11px] font-semibold text-brand-600 dark:text-brand-400 -mt-0.5">
                {product.marathiName}
              </p>
            )}

            {/* Short description */}
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-2">
            {/* Rating & Net Weight */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-gray-800 dark:text-gray-200">{product.rating}</span>
                <span className="text-[10px]">({product.reviewsCount})</span>
              </div>
              <span className="font-bold bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-[11px] text-gray-700 dark:text-gray-300">
                {product.weight}
              </span>
            </div>

            {/* Price & Add to Cart Button */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
              <div>
                <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through ml-1.5 font-medium">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock || product.stockCount === 0}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  addedAnimation
                    ? "bg-emerald-600 text-white"
                    : !product.inStock || product.stockCount === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-brand-500 hover:bg-brand-600 text-white shadow-md shadow-brand-500/20 active:scale-95"
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isMarathi ? "जोडा" : "Add to Cart"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Ingredients & Information Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-zinc-800 space-y-4 text-left relative">
            <h3 className="text-base font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-500" />
              <span>{product.name}</span>
            </h3>

            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <p><strong>Ingredients:</strong> {product.ingredients}</p>
              <p><strong>Regional Heritage:</strong> {product.region}</p>
              <p><strong>Net Weight:</strong> {product.weight}</p>
              <p><strong>Shelf Life:</strong> 6 Months (Store in cool dry place)</p>
              <p><strong>Brand:</strong> Naik Foods (Shukrawar Peth, Pune)</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
