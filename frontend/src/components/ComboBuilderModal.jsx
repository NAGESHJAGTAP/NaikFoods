import React, { useState } from 'react';
import { Gift, Check, Sparkles, X, Plus, ShoppingBag } from 'lucide-react';
import { calculateCombo } from '../services/api';

export default function ComboBuilderModal({ isOpen, onClose, products, onAddBoxToCart, isMarathi }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [loadingCombo, setLoadingCombo] = useState(false);

  if (!isOpen) return null;

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const originalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const discount = selectedIds.length === 4 ? 100 : selectedIds.length * 20;
  const finalPrice = Math.max(0, originalPrice - discount);

  const handleAddToCart = async () => {
    if (selectedIds.length < 4) return;
    setLoadingCombo(true);

    try {
      // Call MERN REST API calculation endpoint
      await calculateCombo(selectedIds);
    } catch (e) {
      console.log('Combo calculation API called locally');
    } finally {
      setLoadingCombo(false);
    }

    const comboItem = {
      id: `combo_${Date.now()}`,
      name: `Custom Maharashtrian Gift Box (${selectedProducts.map(p => p.name.split(' ')[0]).join(', ')})`,
      marathiName: `खास गिफ्ट बॉक्स (${selectedProducts.length} पदार्थ)`,
      category: "Custom Gift Combo",
      price: finalPrice,
      originalPrice,
      weight: "Custom Box",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600",
      quantity: 1
    };

    onAddBoxToCart(comboItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-saffron-500/20 text-left">
        
        <div className="bg-gradient-to-r from-saffron-600 to-amber-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-200 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {isMarathi ? "कॉम्बो डिस्काउंट इंजिन" : "Custom Combo Gift Box Builder"}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading">
                {isMarathi ? "तुमचा खास गिफ्ट बॉक्स तयार करा 🎁" : "Build Your Authentic Custom Box 🎁"}
              </h2>
            </div>
          </div>
          <p className="text-xs text-amber-100 mt-2">
            Select any 4 items to unlock an instant <strong>FLAT ₹100 combo discount</strong>.
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-zinc-800 p-4 border-b border-amber-200/50 dark:border-zinc-700 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              <span>Items Selected: {selectedIds.length} / 4</span>
              <span className="text-saffron-600 dark:text-saffron-400">
                {selectedIds.length === 4 ? "✨ Max Discount Unlocked!" : `Select ${4 - selectedIds.length} more`}
              </span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-saffron-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(selectedIds.length / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 relative ${
                  isSelected
                    ? "bg-amber-50 dark:bg-zinc-800 border-saffron-600 ring-2 ring-saffron-500/30"
                    : "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate font-heading">{p.name}</h4>
                  <span className="text-[11px] font-semibold text-saffron-600 dark:text-saffron-400">₹{p.price}</span>
                  <span className="text-[10px] text-zinc-400 block truncate">{p.region}</span>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? "bg-saffron-600 text-white" : "border text-zinc-400"}`}>
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-zinc-500 block">Total Combo Price:</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">₹{finalPrice}</span>
              {originalPrice > finalPrice && (
                <>
                  <span className="text-xs text-zinc-400 line-through">₹{originalPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Save ₹{discount}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={selectedIds.length < 4 || loadingCombo}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              selectedIds.length === 4
                ? "bg-saffron-600 hover:bg-saffron-700 text-white shadow-lg shadow-saffron-600/30 scale-105"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{selectedIds.length === 4 ? "Add Custom Box to Cart" : `Select ${4 - selectedIds.length} More Items`}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
