import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Package, 
  Eye, 
  Truck, 
  RefreshCw, 
  AlertCircle, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft
} from 'lucide-react';

const statusBadgeConfig = {
  Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Processing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Confirmed: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  Packed: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Shipped: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'Out for Delivery': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
};

const OrderHistory = ({ onAddToCart }) => {
  const { authFetch } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'highest', 'lowest'

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
        throw new Error(data.message || 'Failed to load order history.');
      }
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort logic
  const filteredOrders = orders
    .filter((order) => {
      // Status filter
      if (selectedStatus !== 'ALL') {
        if (selectedStatus === 'ACTIVE') {
          if (['Delivered', 'Cancelled'].includes(order.status)) return false;
        } else if (order.status.toUpperCase() !== selectedStatus) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesItem = order.items?.some((item) =>
          item.name.toLowerCase().includes(q)
        );
        const matchesCity = order.city?.toLowerCase().includes(q);
        return matchesId || matchesItem || matchesCity;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'highest') return b.totalAmount - a.totalAmount;
      if (sortBy === 'lowest') return a.totalAmount - b.totalAmount;
      return 0;
    });

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/account/orders"
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                Order History & Records
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Filter and search through all past spice purchases and invoices.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Controls Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID (e.g. 9288) or Spice Name..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 flex-shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100 text-xs">
            {[
              { id: 'ALL', label: 'All Orders' },
              { id: 'ACTIVE', label: 'In Progress' },
              { id: 'SHIPPED', label: 'Dispatched' },
              { id: 'DELIVERED', label: 'Delivered' },
              { id: 'CANCELLED', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedStatus === tab.id
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold shadow-sm shadow-brand-500/20'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4 px-1">
          <span>Showing <strong>{filteredOrders.length}</strong> order(s)</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-brand-600 hover:underline font-bold"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Orders Feed */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center text-stone-500 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-700" />
            <p className="text-sm font-medium">Loading records...</p>
          </div>
        )}

        {!loading && filteredOrders.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center shadow-sm">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No orders match your filter</h3>
            <p className="text-xs text-stone-500 mt-1">Try resetting the status filter or search keywords.</p>
          </div>
        )}

        {!loading && filteredOrders.length > 0 && (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const badge = statusBadgeConfig[order.status] || statusBadgeConfig.Pending;
              const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-700 flex-shrink-0">
                      <Package className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 text-sm">#{order.id}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Placed on {formattedDate} &bull; {order.items?.length || 0} item(s) &bull; Payment: {order.paymentMethod}
                      </p>
                      <p className="text-xs text-stone-700 mt-1 line-clamp-1">
                        {order.items?.map((i) => i.name).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Total</span>
                      <span className="text-base font-extrabold text-stone-900 font-mono">₹{order.totalAmount}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/account/orders/${order.id}/tracking`}
                        className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                        title="Track Shipment"
                      >
                        <Truck className="w-4 h-4" />
                        <span className="hidden sm:inline">Track</span>
                      </Link>
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="px-3 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition shadow-sm shadow-brand-500/20"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Details</span>
                      </Link>
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

export default OrderHistory;
