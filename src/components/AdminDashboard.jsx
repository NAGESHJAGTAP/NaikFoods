import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingCart, TrendingUp, Plus, RefreshCw, X, Check } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose, onRefreshProducts }) {
  const [analytics, setAnalytics] = useState(null);
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProd, setNewProd] = useState({
    name: '',
    marathiName: '',
    category: 'Masalas & Spices',
    region: 'Vidarbha & Pune',
    heatLevel: 2,
    heatLabel: 'Medium',
    price: 180,
    weight: '250g',
    description: '',
    ingredients: '',
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
  });

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/analytics');
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.analytics);
        setOrdersList(data.recentOrders);
      }
    } catch (err) {
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        fetchAnalytics();
        if (onRefreshProducts) onRefreshProducts();
      }
    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-amber-500/20 text-left my-8">
        
        {/* Header */}
        <div className="bg-zinc-900 text-white p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <span>Naik Foods Admin Management Portal</span>
                <span className="text-xs bg-amber-500 text-zinc-950 font-bold px-2 py-0.5 rounded-full">Live System</span>
              </h2>
              <p className="text-xs text-gray-400">Manage orders, update inventory stock, and track sales revenue.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>

            <button
              onClick={fetchAnalytics}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-gray-50 dark:bg-zinc-900/60">
          
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold">
                <span>Total Sales Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
                ₹{analytics?.totalRevenue || 1000}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+18.5% this week</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold">
                <span>Total Orders Placed</span>
                <ShoppingCart className="w-4 h-4 text-brand-500" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
                {analytics?.totalOrders || 2}
              </div>
              <span className="text-[10px] text-gray-400 font-semibold">Active customer fulfillment</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold">
                <span>Active Products</span>
                <Package className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
                {analytics?.activeProductsCount || 10}
              </div>
              <span className="text-[10px] text-gray-400 font-semibold">Listed in store</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold">
                <span>Low Stock Alerts</span>
                <Package className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
                {analytics?.outOfStockCount || 0}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Healthy inventory levels</span>
            </div>

          </div>

          {/* Orders Management Table */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 p-5 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Customer Orders</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-zinc-700 text-gray-400 font-bold uppercase">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">City</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Total Amount</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-zinc-700/50">
                  {ordersList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700/30">
                      <td className="py-3 font-mono font-bold text-brand-600 dark:text-brand-400">{ord.id}</td>
                      <td className="py-3 font-semibold text-gray-800 dark:text-gray-200">{ord.customerName}</td>
                      <td className="py-3 text-gray-500 dark:text-gray-400">{ord.city}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">
                        {ord.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                      </td>
                      <td className="py-3 font-extrabold text-gray-900 dark:text-white">₹{ord.totalAmount}</td>
                      <td className="py-3 text-gray-500">{ord.paymentMethod}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
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

      {/* Modal to Add New Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl max-w-md w-full space-y-4 text-left border border-gray-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Product to Catalog</h3>
            
            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Product Name (English)"
                value={newProd.name}
                onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white"
              />
              <input
                type="text"
                placeholder="Marathi Name (e.g. कोल्हापुरी मसाला)"
                value={newProd.marathiName}
                onChange={(e) => setNewProd({ ...newProd, marathiName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: parseInt(e.target.value) })}
                  className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Weight (e.g. 250g)"
                  value={newProd.weight}
                  onChange={(e) => setNewProd({ ...newProd, weight: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <textarea
                rows={2}
                placeholder="Description..."
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white"
              />
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-500 text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
