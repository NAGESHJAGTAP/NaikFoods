import React, { useState, useEffect } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/adminApi';
import { Plus, Pencil, Trash2, Tag, Check, X } from 'lucide-react';

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const load = async () => {
    setLoading(true);
    try { const d = await fetchCategories(); setCats(d.categories || []); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm({ name: '', description: '' }); setEditId(null); setModal('form'); };
  const openEdit = (c) => { setForm({ name: c.name, description: c.description, isActive: c.isActive }); setEditId(c.id); setModal('form'); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editId) { await updateCategory(editId, form); showToast('Category updated!'); }
      else { await createCategory(form); showToast('Category added!'); }
      setModal(null); load();
    } catch { showToast('Error saving.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try { await deleteCategory(id); setCats(p => p.filter(c => c.id !== id)); setDelConfirm(null); showToast('Deleted.'); }
    catch { showToast('Delete failed.'); }
  };

  const toggleActive = async (cat) => {
    try { await updateCategory(cat.id, { isActive: !cat.isActive }); load(); }
    catch { showToast('Failed to toggle.'); }
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl border border-brand-500/50">{toast}</div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-zinc-400">{cats.length} categories configured</p>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-xl hover:bg-brand-600 shadow-md shadow-brand-500/20">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cats.map(c => (
            <div key={c.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5 text-brand-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{c.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${c.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-500'}`}>
                    {c.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 truncate">{c.description}</p>
                <p className="text-[10px] text-gray-300 dark:text-zinc-600 mt-1">{c.productCount || 0} products</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => toggleActive(c)} className="p-1.5 rounded-lg bg-gray-50 dark:bg-zinc-800 text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition-colors" title="Toggle active">
                  {c.isActive ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDelConfirm(c.id)} className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/20 text-rose-500 hover:bg-rose-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm */}
      {delConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 border border-gray-200 dark:border-zinc-800">
            <h3 className="font-bold text-gray-900 dark:text-white">Delete Category?</h3>
            <p className="text-sm text-gray-500">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm">Cancel</button>
              <button onClick={() => handleDelete(delConfirm)} className="flex-1 py-2.5 bg-rose-500 text-white font-bold rounded-xl text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modal === 'form' && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-zinc-800">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">{editId ? 'Edit Category' : 'Add Category'}</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Description</label>
                <textarea rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 bg-brand-500 text-white font-bold rounded-xl text-sm hover:bg-brand-600 disabled:opacity-60">
                  {saving ? '...' : (editId ? 'Save' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
