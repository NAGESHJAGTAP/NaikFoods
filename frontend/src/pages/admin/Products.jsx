import React, { useState, useEffect } from 'react';
import { fetchAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct } from '../../services/adminApi';
import { Plus, Pencil, Trash2, Search, X, Check, Package } from 'lucide-react';

const CATEGORIES = ['Masalas & Spices', 'Pickles & Chutneys', 'Snacks & Namkeen', 'Staples & Mixes'];
const REGIONS = ['Vidarbha & Pune', 'Konkan Coast', 'Kolhapur', 'Marathwada', 'Pune & Western MH'];

const emptyForm = {
  name: '', marathiName: '', category: 'Masalas & Spices', region: 'Pune & Western MH',
  heatLevel: 2, heatLabel: 'Medium', price: 180, originalPrice: 210,
  weight: '250g', description: '', ingredients: '', stockCount: 50, minimumStock: 10,
  badge: '', inStock: true,
  image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminProducts();
      setProducts(data.products || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(emptyForm); setEditId(null); setModal('add'); };
  const openEdit = (p) => { setForm({ ...p }); setEditId(p.id); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(emptyForm); setEditId(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal === 'add') {
        await createAdminProduct(form);
        showToast('Product added successfully!');
      } else {
        await updateAdminProduct(editId, form);
        showToast('Product updated!');
      }
      closeModal();
      load();
    } catch (err) { showToast('Error: ' + err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdminProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setDeleteConfirm(null);
      showToast('Product deleted.');
    } catch (err) { showToast('Delete failed.'); }
  };

  const F = ({ label, children }) => (
    <div>
      <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase mb-1 block">{label}</label>
      {children}
    </div>
  );
  const inputCls = 'w-full px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white';

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl border border-brand-500/50">
          {toast}
        </div>
      )}

      {/* Header bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 dark:text-white" />
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="font-bold text-gray-900 dark:text-white">Products <span className="text-sm font-normal text-gray-400">({filtered.length})</span></h3>
        </div>
        {loading ? (
          <div className="py-16 flex justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50">
                  {['Image', 'Product', 'Category', 'Price', 'Stock', 'Heat', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-gray-400 font-bold uppercase tracking-wide text-[10px] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <p className="font-bold text-gray-900 dark:text-white truncate">{p.name}</p>
                      <p className="text-gray-400 text-[10px]">{p.weight}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{p.category}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-extrabold text-gray-900 dark:text-white">₹{p.price}</span>
                      {p.originalPrice && <span className="text-gray-400 line-through ml-1">₹{p.originalPrice}</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`font-bold ${p.stockCount <= (p.minimumStock || 10) ? 'text-rose-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        {p.stockCount}
                      </span>
                    </td>
                    <td className="px-4 py-3">{'🌶️'.repeat(p.heatLevel)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.inStock ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-500 hover:bg-rose-100 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-zinc-800 text-center space-y-4">
            <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Delete Product?</h3>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-rose-500 text-white font-bold rounded-xl text-sm hover:bg-rose-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-zinc-800 my-8">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-500" />
                {modal === 'add' ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button onClick={closeModal} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">
              <F label="Product Name (English)">
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Authentic Godaa Masala" />
              </F>
              <F label="Marathi Name">
                <input value={form.marathiName} onChange={e => setForm({ ...form, marathiName: e.target.value })} className={inputCls} placeholder="e.g. गोडा मसाला" />
              </F>
              <F label="Category">
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </F>
              <F label="Region">
                <select value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className={inputCls}>
                  {REGIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </F>
              <F label="Price (₹)">
                <input type="number" required value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} className={inputCls} />
              </F>
              <F label="Original Price (₹)">
                <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: +e.target.value })} className={inputCls} />
              </F>
              <F label="Weight">
                <input value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} className={inputCls} placeholder="e.g. 250g" />
              </F>
              <F label="Stock Count">
                <input type="number" value={form.stockCount} onChange={e => setForm({ ...form, stockCount: +e.target.value })} className={inputCls} />
              </F>
              <F label="Heat Level (1–4)">
                <select value={form.heatLevel} onChange={e => setForm({ ...form, heatLevel: +e.target.value })} className={inputCls}>
                  <option value={1}>1 — Mild 🌶️</option>
                  <option value={2}>2 — Medium 🌶️🌶️</option>
                  <option value={3}>3 — Spicy 🌶️🌶️🌶️</option>
                  <option value={4}>4 — Fire 🌶️🌶️🌶️🌶️</option>
                </select>
              </F>
              <F label="Badge">
                <input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} className={inputCls} placeholder="e.g. Bestseller" />
              </F>
              <div className="sm:col-span-2">
                <F label="Description">
                  <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} />
                </F>
              </div>
              <div className="sm:col-span-2">
                <F label="Ingredients">
                  <textarea rows={2} value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} className={inputCls} />
                </F>
              </div>
              <div className="sm:col-span-2">
                <F label="Image URL">
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inputCls} />
                </F>
              </div>
              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-sm hover:bg-brand-600 disabled:opacity-60">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                  {modal === 'add' ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
