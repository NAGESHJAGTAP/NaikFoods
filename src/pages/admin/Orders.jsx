import React, { useState, useEffect } from 'react';
import { fetchAdminOrders, updateOrderStatus } from '../../services/adminApi';
import { Search, RefreshCw, ChevronDown, ShoppingCart } from 'lucide-react';

const STATUSES = ['All', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

const STATUS_COLORS = {
  Confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Shipped: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'Out for Delivery': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search) params.search = search;
      const data = await fetchAdminOrders(params);
      setOrders(data.orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [statusFilter, search]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      setToast(`Order ${id} updated to "${newStatus}"`);
      setTimeout(() => setToast(''), 3000);
    } catch (e) {
      setToast('Failed to update status');
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl border border-brand-500/50">
          {toast}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer name, order ID, city..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="py-2.5 px-4 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white font-semibold"
        >
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={load} className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white">
            All Orders <span className="text-sm font-normal text-gray-400">({orders.length})</span>
          </h3>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
                  {['Order ID', 'Customer', 'City', 'Amount', 'Payment', 'Date', 'Status', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-gray-400 font-bold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <React.Fragment key={o.id}>
                    <tr
                      onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                      className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{o.id}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">{o.customerName}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{o.city}</td>
                      <td className="px-4 py-3 font-extrabold text-gray-900 dark:text-white whitespace-nowrap">₹{o.totalAmount}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{o.paymentMethod}</td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                        {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          onClick={e => e.stopPropagation()}
                          onChange={e => handleStatusChange(o.id, e.target.value)}
                          className="text-[10px] font-bold bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg px-2 py-1 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                        >
                          {STATUSES.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                    {expanded === o.id && (
                      <tr className="bg-gray-50 dark:bg-zinc-800/40">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-600 dark:text-zinc-300 mb-2">Order Items:</p>
                            {o.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs text-gray-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-gray-200 dark:border-zinc-700">
                                <span className="font-semibold">{item.name}</span>
                                <span>x{item.quantity}</span>
                                <span className="font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                            {o.address && <p className="text-xs text-gray-400 pt-1">📍 {o.address}</p>}
                            {o.phone && <p className="text-xs text-gray-400">📞 {o.phone}</p>}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
