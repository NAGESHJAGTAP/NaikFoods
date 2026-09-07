import React, { useState, useEffect } from 'react';
import { fetchInventory, updateProductStock } from '../../services/adminApi';
import { RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const STOCK_STATUS = {
  'In Stock': { color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle },
  'Low Stock': { color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: AlertTriangle },
  'Out of Stock': { color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', icon: XCircle },
};

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStock, setEditStock] = useState({});
  const [saving, setSaving] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchInventory();
      setInventory(data.inventory || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleStockUpdate = async (id) => {
    const newStock = editStock[id];
    if (newStock === undefined || newStock === '') return;
    setSaving(id);
    try {
      await updateProductStock(id, parseInt(newStock));
      showToast('Stock updated successfully!');
      setEditStock(prev => { const n = { ...prev }; delete n[id]; return n; });
      load();
    } catch (e) { showToast('Failed to update stock.'); }
    finally { setSaving(null); }
  };

  const lowStockItems = inventory.filter(i => i.stockStatus !== 'In Stock');

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl border border-brand-500/50">{toast}</div>
      )}

      {/* Alert banner */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <p className="font-bold text-amber-800 dark:text-amber-400 text-sm">{lowStockItems.length} product(s) need restocking</p>
            <p className="text-amber-600 dark:text-amber-500 text-xs">{lowStockItems.map(i => i.name).join(', ')}</p>
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'In Stock', count: inventory.filter(i => i.stockStatus === 'In Stock').length, color: 'text-emerald-500' },
          { label: 'Low Stock', count: inventory.filter(i => i.stockStatus === 'Low Stock').length, color: 'text-amber-500' },
          { label: 'Out of Stock', count: inventory.filter(i => i.stockStatus === 'Out of Stock').length, color: 'text-rose-500' },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-4 text-center shadow-sm">
            <p className={`text-2xl font-extrabold ${color}`}>{count}</p>
            <p className="text-xs font-bold text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white">Stock Levels</h3>
          <button onClick={load} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-brand-500 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
        {loading ? (
          <div className="py-16 flex justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
                  {['Product', 'Category', 'Current Stock', 'Min. Stock', 'Stock Bar', 'Status', 'Update Stock'].map(h => (
                    <th key={h} className="px-4 py-3 text-gray-400 font-bold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => {
                  const { color, icon: Icon } = STOCK_STATUS[item.stockStatus] || STOCK_STATUS['In Stock'];
                  const pct = Math.min(100, (item.stockCount / Math.max(item.minimumStock * 5, 50)) * 100);
                  const barColor = item.stockStatus === 'Out of Stock' ? 'bg-rose-500' : item.stockStatus === 'Low Stock' ? 'bg-amber-500' : 'bg-emerald-500';

                  return (
                    <tr key={item.id} className={`border-b border-gray-50 dark:border-zinc-800/50 transition-colors ${item.stockStatus !== 'In Stock' ? 'bg-amber-50/50 dark:bg-amber-900/5' : 'hover:bg-gray-50 dark:hover:bg-zinc-800/30'}`}>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-white max-w-[180px] truncate">{item.name}</td>
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{item.category}</td>
                      <td className="px-4 py-3">
                        <span className={`font-extrabold text-lg ${item.stockStatus === 'Out of Stock' ? 'text-rose-500' : item.stockStatus === 'Low Stock' ? 'text-amber-500' : 'text-gray-900 dark:text-white'}`}>
                          {item.stockCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{item.minimumStock}</td>
                      <td className="px-4 py-3 w-32">
                        <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2">
                          <div className={`${barColor} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold w-fit ${color}`}>
                          <Icon className="w-3 h-3" /> {item.stockStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={editStock[item.id] ?? ''}
                            onChange={e => setEditStock(prev => ({ ...prev, [item.id]: e.target.value }))}
                            placeholder={String(item.stockCount)}
                            className="w-16 px-2 py-1.5 text-xs bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500 dark:text-white"
                          />
                          <button
                            onClick={() => handleStockUpdate(item.id)}
                            disabled={saving === item.id || editStock[item.id] === undefined || editStock[item.id] === ''}
                            className="px-2.5 py-1.5 bg-brand-500 text-white text-[10px] font-bold rounded-lg hover:bg-brand-600 disabled:opacity-40 transition-colors"
                          >
                            {saving === item.id ? '...' : 'Update'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
