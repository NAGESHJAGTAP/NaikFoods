import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Plus, RefreshCw, X } from 'lucide-react';
import { fetchAnalytics } from '../services/api';

export default function AdminPortal({ isOpen, onClose, onRefreshProducts }) {
  const [analytics, setAnalytics] = useState(null);
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAnalytics();
      if (data.success) {
        setAnalytics(data.analytics);
        setOrdersList(data.recentOrders);
      }
    } catch (e) {
      console.log('Admin analytics error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) loadData();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto text-left">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-saffron-500/20 my-8">
        
        <div className="bg-zinc-950 text-white p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2 font-heading">
                <span>SwadYatra MERN Admin Portal</span>
                <span className="text-xs bg-saffron-600 text-white px-2 py-0.5 rounded-full font-bold">Live API</span>
              </h2>
              <p className="text-xs text-zinc-400">Order management, revenue analytics & product stock oversight.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={loadData} className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={onClose} className="p-2 rounded-xl bg-zinc-800 text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-zinc-50 dark:bg-zinc-900/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-bold">
                <span>Total Sales Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-2 font-heading">
                ₹{analytics?.totalRevenue || 1000}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">+18.5% this week</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-bold">
                <span>Total Orders Placed</span>
                <ShoppingCart className="w-4 h-4 text-saffron-600" />
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-2 font-heading">
                {analytics?.totalOrders || 2}
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold">Active customer fulfillment</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-bold">
                <span>Active Products</span>
                <Package className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-2 font-heading">
                {analytics?.activeProductsCount || 10}
              </div>
              <span className="text-[10px] text-zinc-400 font-semibold">Listed in catalog</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-bold">
                <span>Low Stock Alerts</span>
                <Package className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-2 font-heading">
                {analytics?.outOfStockCount || 0}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Healthy inventory levels</span>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white font-heading">Recent Customer Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b text-zinc-400 font-bold uppercase">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">City</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700/50">
                  {ordersList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/30">
                      <td className="py-3 font-mono font-bold text-saffron-600">{ord.id}</td>
                      <td className="py-3 font-semibold text-zinc-800 dark:text-zinc-200">{ord.customerName}</td>
                      <td className="py-3 text-zinc-500">{ord.city}</td>
                      <td className="py-3 text-zinc-600">{ord.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
                      <td className="py-3 font-extrabold text-zinc-900 dark:text-white">₹{ord.totalAmount}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-600">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
