import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ShoppingBag, 
  AlertCircle, 
  RefreshCw,
  Eye,
  XCircle,
  Calendar,
  MapPin
} from 'lucide-react';

const statusBadgeConfig = {
  Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock },
  Processing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: RefreshCw },
  Confirmed: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: CheckCircle2 },
  Packed: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: Package },
  Shipped: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', icon: Truck },
  'Out for Delivery': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: Truck },
  Delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle2 },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: XCircle }
};

const MyOrders = ({ onAddToCart }) => {
  const { user, token, authFetch } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authFetch('/api/orders/my-orders');
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to load your orders.');
      }
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const res = await authFetch(`/api/orders/${orderId}/cancel`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      } else {
        alert(data.message || 'Unable to cancel order.');
      }
    } catch (err) {
      alert('Network error while cancelling order.');
    }
  };

  const isOrderActive = (status) => ['Pending', 'Processing', 'Confirmed', 'Packed', 'Shipped', 'Out for Delivery'].includes(status);
  
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'active') return isOrderActive(order.status);
    if (activeTab === 'completed') return ['Delivered', 'Cancelled'].includes(order.status);
    return true;
  });

  const activeOrdersCount = orders.filter((o) => isOrderActive(o.status)).length;
  const completedOrdersCount = orders.filter((o) => ['Delivered', 'Cancelled'].includes(o.status)).length;

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Welcome */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-2">
            <Link to="/" className="hover:text-amber-800 transition">Home</Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">My Account</span>
            <span>/</span>
            <span className="text-stone-900 font-medium">Orders</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                My Orders
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Manage your active deliveries and review your spice purchase history.
              </p>
            </div>
            <Link
              to="/account/order-history"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-300 rounded-xl text-stone-700 text-sm font-semibold hover:bg-stone-100 transition shadow-sm"
            >
              Order History & Filters <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="flex border-b border-stone-200 mb-8 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === 'all'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 text-sm font-semibold transition border-b-2 flex items-center gap-2 ${
              activeTab === 'active'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Active Orders
            {activeOrdersCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-brand-50 text-brand-700 rounded-full font-bold">
                {activeOrdersCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-3 text-sm font-semibold transition border-b-2 ${
              activeTab === 'completed'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Completed & Past ({completedOrdersCount})
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-stone-500 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-700" />
            <p className="text-sm font-medium">Fetching your orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex items-center gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-base">Error Loading Orders</h3>
              <p className="text-sm mt-0.5">{error}</p>
              <button
                onClick={fetchOrders}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-xs font-semibold hover:bg-red-200 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredOrders.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.75]" />
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mb-2">
              No orders found
            </h3>
            <p className="text-stone-500 text-sm max-w-sm mx-auto mb-6">
              {activeTab === 'active'
                ? 'You do not have any active shipments at the moment.'
                : 'You have not placed any orders yet. Discover our fresh artisanal spices!'}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-700 via-orange-800 to-red-800 text-white rounded-xl font-semibold text-sm shadow-md hover:from-amber-800 hover:to-red-900 transition"
            >
              Start Shopping <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && filteredOrders.length > 0 && (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const badge = statusBadgeConfig[order.status] || statusBadgeConfig.Pending;
              const BadgeIcon = badge.icon;
              const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });
              const estDelivery = order.estimatedDelivery 
                ? new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                : null;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  {/* Card Header */}
                  <div className="p-4 sm:p-6 bg-stone-50/60 border-b border-stone-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                      <div>
                        <span className="block uppercase text-[10px] font-bold text-stone-400">Order ID</span>
                        <span className="font-mono font-bold text-stone-900 text-sm">#{order.id}</span>
                      </div>
                      <div className="border-l border-stone-200 pl-4">
                        <span className="block uppercase text-[10px] font-bold text-stone-400">Order Date</span>
                        <span className="font-semibold text-stone-800">{formattedDate}</span>
                      </div>
                      <div className="border-l border-stone-200 pl-4">
                        <span className="block uppercase text-[10px] font-bold text-stone-400">Total Amount</span>
                        <span className="font-mono font-bold text-amber-950 text-sm">₹{order.totalAmount}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Items Preview & Delivery Estimate */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Items row */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                          {order.items && order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 flex-shrink-0 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                              />
                              <div>
                                <p className="text-xs font-bold text-stone-900 max-w-[140px] truncate">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-stone-500 font-mono">
                                  Qty: {item.quantity} &bull; ₹{item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {estDelivery && isOrderActive(order.status) && (
                          <p className="text-xs text-amber-800 font-medium mt-3 flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-amber-700" />
                            Estimated Delivery by <strong className="font-bold">{estDelivery}</strong>
                          </p>
                        )}
                        {order.status === 'Delivered' && (
                          <p className="text-xs text-emerald-700 font-medium mt-3 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Delivered successfully to {order.city}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap sm:flex-nowrap md:flex-col lg:flex-row items-center gap-2.5 flex-shrink-0">
                        <Link
                          to={`/account/orders/${order.id}/tracking`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white text-xs font-bold rounded-xl shadow-md shadow-brand-500/25 transition"
                        >
                          <Truck className="w-3.5 h-3.5" /> Track Order
                        </Link>

                        <Link
                          to={`/account/orders/${order.id}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Details
                        </Link>

                        {isOrderActive(order.status) && ['Pending', 'Processing'].includes(order.status) && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold rounded-xl border border-red-200 transition"
                          >
                            Cancel
                          </button>
                        )}

                        {order.status === 'Delivered' && onAddToCart && (
                          <button
                            onClick={() => {
                              order.items.forEach((item) => onAddToCart(item));
                              alert('Items added back to your cart!');
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-2 text-xs text-amber-800 hover:bg-amber-50 font-semibold rounded-xl border border-amber-300 transition"
                          >
                            Buy Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
