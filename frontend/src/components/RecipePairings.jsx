import React, { useState } from 'react';
import { ChefHat, Clock, Sparkles, ShoppingBag } from 'lucide-react';

export default function RecipePairings({ recipes, products, onAddMultipleToCart, isMarathi }) {
  const [activeRecipeId, setActiveRecipeId] = useState(recipes[0]?.id || 'rec_1');

  const activeRecipe = recipes.find(r => r.id === activeRecipeId) || recipes[0];
  const linkedProducts = products.filter(p => activeRecipe?.ingredientsRequired?.includes(p.id));

  const handleAddAllRecipeItems = () => {
    if (linkedProducts.length > 0) {
      onAddMultipleToCart(linkedProducts);
    }
  };

  return (
    <section className="py-12 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 text-left">
          <div>
            <div className="flex items-center gap-2 text-saffron-400 font-bold text-xs uppercase tracking-wider">
              <ChefHat className="w-4 h-4" />
              <span>{isMarathi ? "पाककृती जोडणी" : "Recipe-to-Cart Pairing Engine"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 font-heading">
              {isMarathi ? "नाईक फूड्स सोबत बनवा अस्सल पदार्थ 🍲" : "Cook Authentic Dishes with Naik Foods 🍲"}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md">
            Step-by-step Maharashtrian recipes with 1-click ordering for required authentic spices.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-zinc-800">
          {recipes.map((recipe) => {
            const isActive = recipe.id === activeRecipeId;
            return (
              <button
                key={recipe.id}
                onClick={() => setActiveRecipeId(recipe.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-saffron-600 text-white shadow-lg shadow-saffron-600/30"
                    : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                }`}
              >
                <span>{isMarathi ? recipe.marathiTitle || recipe.title : recipe.title}</span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-normal">
                  {recipe.prepTime}
                </span>
              </button>
            );
          })}
        </div>

        {activeRecipe && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-900/80 rounded-3xl p-6 sm:p-8 border border-zinc-800 text-left">
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img src={activeRecipe.image} alt={activeRecipe.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-zinc-950/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1.5 border border-amber-500/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Prep: {activeRecipe.prepTime}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-heading">{activeRecipe.title}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{activeRecipe.description}</p>
              </div>

              <div className="space-y-3 bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                <div className="flex items-center justify-between text-xs font-bold text-saffron-400">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Required Spices for this Recipe:
                  </span>
                </div>

                <div className="space-y-2">
                  {linkedProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[10px] text-zinc-400">₹{p.price} • {p.weight}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddAllRecipeItems}
                  className="w-full mt-2 py-2.5 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Recipe Spices to Cart (₹{linkedProducts.reduce((s, p) => s + p.price, 0)})</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-base font-bold text-white pb-2 border-b border-zinc-800 font-heading">
                Step-by-Step Cooking Instructions
              </h4>
              <div className="space-y-3">
                {activeRecipe.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                    <span className="w-7 h-7 rounded-full bg-saffron-600/20 text-saffron-400 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
