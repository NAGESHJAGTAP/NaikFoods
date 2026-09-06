import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CartPage = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shippingThreshold = 499;
  const shippingFee = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 50;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    if (couponCode.trim().toUpperCase() === 'SWAD10' || couponCode.trim().toUpperCase() === 'NAIK10') {
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code. Try "SWAD10" for 10% off.');
    }
  };

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    if (onOpenCheckout) {
      onOpenCheckout();
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-amber-50/30">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mb-6 shadow-inner">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-stone-900 mb-2">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-stone-600 max-w-md text-center mb-8">
          Explore our authentic Maharashtrian regional spices, artisanal goda masalas, and traditional gravies.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-500/25 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Explore Our Regional Spices
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-2">
            <Link to="/" className="hover:text-amber-800 transition">Home</Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                Your Shopping Cart
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Review your items and proceed to secure checkout.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-900 font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-stone-100 bg-stone-50/50 hidden sm:grid sm:grid-cols-12 text-xs font-bold text-stone-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="divide-y divide-stone-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 hover:bg-amber-50/20 transition"
                  >
                    {/* Item info */}
                    <div className="w-full sm:col-span-6 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl border border-stone-200 shadow-sm flex-shrink-0"
                      />
                      <div>
                        <h3 className="font-semibold text-stone-900 text-base font-serif">
                          {item.name}
                        </h3>
                        {item.marathiName && (
                          <p className="text-xs text-amber-900 font-serif">
                            {item.marathiName}
                          </p>
                        )}
                        <p className="text-xs text-stone-500 mt-1">
                          Net Wt: {item.weight || '250g'} &bull; {item.region || 'Maharashtra'}
                        </p>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-medium transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="w-full sm:col-span-2 flex sm:justify-center items-center text-sm font-medium text-stone-700">
                      <span className="sm:hidden text-stone-500 text-xs mr-2">Unit Price:</span>
                      ₹{item.price}
                    </div>

                    {/* Quantity Selector */}
                    <div className="w-full sm:col-span-2 flex sm:justify-center items-center">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 shadow-inner">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1.5 text-stone-600 hover:text-amber-900 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-stone-800 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-stone-600 hover:text-amber-900 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Line Subtotal */}
                    <div className="w-full sm:col-span-2 flex sm:justify-end items-center text-base font-bold text-amber-950 font-mono">
                      <span className="sm:hidden text-stone-500 text-xs font-sans mr-2">Total:</span>
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Shipping Alert Banner */}
            <div className="mt-4 p-4 rounded-xl border border-amber-200 bg-amber-50/80 flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-amber-900">
                <Truck className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <span>
                  {subtotal >= shippingThreshold ? (
                    <span className="font-semibold text-emerald-800">
                      Congratulations! You've qualified for FREE Standard Delivery.
                    </span>
                  ) : (
                    <>
                      Add <strong className="font-bold text-stone-900">₹{shippingThreshold - subtotal}</strong> more to unlock <strong className="text-amber-900">FREE delivery</strong>!
                    </>
                  )}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-800 hidden sm:inline">
                THRESHOLD: ₹499
              </span>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6 sticky top-24">
              <h2 className="text-xl font-bold font-serif text-stone-900 pb-3 border-b border-stone-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-semibold text-stone-900 font-mono">₹{subtotal}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount (10% Off)</span>
                    <span className="font-mono">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span>Estimated Shipping</span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">(All India)</span>
                  </div>
                  <span className="font-semibold text-stone-900 font-mono">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-sans font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-between items-baseline">
                  <span className="text-base font-bold text-stone-900">Total Payable</span>
                  <span className="text-2xl font-extrabold text-amber-950 font-mono">
                    ₹{finalTotal}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 text-right">
                  Inclusive of all GST & taxes
                </p>
              </div>

              {/* Coupon Code input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Have a Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try SWAD10"
                    disabled={couponApplied}
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm uppercase placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={couponApplied || !couponCode.trim()}
                    className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-semibold hover:bg-stone-900 transition disabled:opacity-50"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-emerald-700 mt-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 10% discount applied!
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-600 mt-1">
                    {couponError}
                  </p>
                )}
              </form>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl shadow-lg shadow-brand-500/25 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-base transition transform active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {!isAuthenticated && (
                <p className="text-xs text-amber-900 text-center bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  You will be prompted to <strong>Sign In</strong> before completing your purchase.
                </p>
              )}

              {/* Security badges */}
              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>100% Secure Razorpay & UPI Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>Dispatched direct from Kolhapur & Pune mills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
