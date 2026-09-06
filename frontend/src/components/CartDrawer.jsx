import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, Tag, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onProceedToCheckout,
  isMarathi 
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : 70;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NAIK10') {
      setAppliedDiscount(Math.round(subtotal * 0.1)); // 10% off
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Use NAIK10 for 10% OFF!');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingFee);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md bg-white dark:bg-zinc-900 shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-5 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {isMarathi ? "माझी टोपली" : "Your Shopping Cart"} ({cartItems.length})
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-amber-50 dark:bg-zinc-800 p-4 border-b border-amber-200/40 dark:border-zinc-700">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
              <Truck className="w-4 h-4 text-brand-500" />
              {isFreeShipping ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isMarathi ? "अभिनंदन! तुम्हाला मोफत डिलिव्हरी मिळाली आहे." : "You've unlocked FREE Home Delivery!"}
                </span>
              ) : (
                <span>
                  {isMarathi 
                    ? `मोफत डिलिव्हरीसाठी अजून ₹${remainingForFreeShipping} चे पदार्थ जोडा.` 
                    : `Add ₹${remainingForFreeShipping} more for FREE Delivery!`}
                </span>
              )}
            </div>
            <div className="w-full bg-gray-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  {isMarathi ? "तुमची टोपली रिकामी आहे!" : "Your cart is currently empty."}
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-brand-500 text-white text-xs font-bold rounded-full shadow-md"
                >
                  {isMarathi ? "पदार्थ शोधा" : "Start Shopping"}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {isMarathi ? item.marathiName || item.name : item.name}
                    </h4>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 block">
                      {item.weight}
                    </span>
                    <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-gray-200 dark:border-zinc-700">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/90 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (NAIK10)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-900 dark:bg-zinc-800 text-white text-xs font-bold rounded-xl hover:bg-gray-800"
                >
                  Apply
                </button>
              </form>

              {promoError && (
                <p className="text-[11px] text-rose-500 font-semibold">{promoError}</p>
              )}

              {/* Summary Calculations */}
              <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Promo Discount (NAIK10):</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span>{isFreeShipping ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-zinc-800">
                  <span>Total Amount:</span>
                  <span className="text-brand-600 dark:text-brand-400">₹{finalTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(finalTotal);
                }}
                className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{isMarathi ? "ऑर्डर करा (Proceed to Checkout)" : "Proceed to Fast Checkout"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
