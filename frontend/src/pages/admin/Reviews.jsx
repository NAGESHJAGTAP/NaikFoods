import React, { useState, useEffect } from 'react';
import { fetchReviews, updateReview, deleteReview } from '../../services/adminApi';
import { Star, Check, EyeOff, Trash2 } from 'lucide-react';

const STATUS_STYLES = {
  Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Hidden: 'bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-500',
};

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-zinc-700'}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [delConfirm, setDelConfirm] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const load = async () => {
    setLoading(true);
    try { const d = await fetchReviews(); setReviews(d.reviews || []); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleAction = async (id, action) => {
    let update = {};
    if (action === 'approve') update = { status: 'Approved' };
    else if (action === 'hide') update = { status: 'Hidden' };
    try {
      await updateReview(id, update);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, ...update } : r));
      showToast(action === 'approve' ? 'Review approved.' : 'Review hidden.');
    } catch { showToast('Action failed.'); }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(prev => prev.filter(r => r.id !== id));
      setDelConfirm(null);
      showToast('Review deleted.');
    } catch { showToast('Delete failed.'); }
  };

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl border border-brand-500/50">{toast}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Reviews', value: reviews.length, color: 'text-blue-500' },
          { label: 'Average Rating', value: `⭐ ${avgRating}`, color: 'text-amber-500' },
          { label: 'Pending Approval', value: reviews.filter(r => r.status === 'Pending').length, color: 'text-amber-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-4 text-center shadow-sm">
            <p className={`text-xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs font-bold text-gray-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
        </div>
        {loading ? (
          <div className="py-16 flex justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : reviews.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No reviews yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-zinc-800/50">
            {reviews.map(r => (
              <div key={r.id} className={`p-5 flex gap-4 ${r.status === 'Hidden' ? 'opacity-50' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm shrink-0">
                  {r.customer?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{r.customer}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{r.product}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLES[r.status] || STATUS_STYLES.Pending}`}>
                        {r.status}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                  <p className="text-sm text-gray-600 dark:text-zinc-300 mt-2 leading-relaxed">{r.comment}</p>
                  <div className="flex gap-2 mt-3">
                    {r.status !== 'Approved' && (
                      <button onClick={() => handleAction(r.id, 'approve')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 transition-colors">
                        <Check className="w-3 h-3" /> Approve
                      </button>
                    )}
                    {r.status !== 'Hidden' && (
                      <button onClick={() => handleAction(r.id, 'hide')} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-lg hover:bg-gray-200 transition-colors">
                        <EyeOff className="w-3 h-3" /> Hide
                      </button>
                    )}
                    <button onClick={() => setDelConfirm(r.id)} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors">
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {delConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 border border-gray-200 dark:border-zinc-800">
            <h3 className="font-bold text-gray-900 dark:text-white">Delete Review?</h3>
            <div className="flex gap-3">
              <button onClick={() => setDelConfirm(null)} className="flex-1 py-2.5 bg-gray-100 dark:bg-zinc-800 font-bold rounded-xl text-sm dark:text-white">Cancel</button>
              <button onClick={() => handleDelete(delConfirm)} className="flex-1 py-2.5 bg-rose-500 text-white font-bold rounded-xl text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
