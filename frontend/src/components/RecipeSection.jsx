import React, { useState } from 'react';
import { ChefHat, Clock, Sparkles, ArrowRight, ShoppingBag, Check } from 'lucide-react';

export default function RecipeSection({ recipes, products, onAddMultipleToCart, isMarathi }) {
  const [activeRecipeId, setActiveRecipeId] = useState(recipes[0]?.id || 'rec_1');

  const activeRecipe = recipes.find(r => r.id === activeRecipeId) || recipes[0];

  // Find linked products for this recipe
  const linkedProducts = products.filter(p => activeRecipe?.ingredientsRequired?.includes(p.id));

  const handleAddAllRecipeItems = () => {
    if (linkedProducts.length > 0) {
      onAddMultipleToCart(linkedProducts);
    }
  };

  return (
    <section className="py-12 bg-zinc-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-400 font-bold text-xs uppercase tracking-wider">
              <ChefHat className="w-4 h-4" />
              <span>{isMarathi ? "अस्सल पाककृती" : "Recipe Pairings"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {isMarathi ? "नाईक फूड्स सोबत बनवा झणझणीत पदार्थ" : "Cook Authentic Dishes with Naik Foods"}
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-md">
            {isMarathi 
              ? "पहा टप्प्याटप्प्याने रेसिपी आणि १-क्लिक मध्ये आवश्यक मसाले ऑर्डर करा!"
              : "Discover regional step-by-step recipes and add required authentic spices directly to your cart with 1-click."
            }
          </p>
        </div>

        {/* Recipe Tabs Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-zinc-800">
          {recipes.map((recipe) => {
            const isActive = recipe.id === activeRecipeId;
            return (
              <button
                key={recipe.id}
                onClick={() => setActiveRecipeId(recipe.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                    : "bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700"
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

        {/* Active Recipe Display Grid */}
        {activeRecipe && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-zinc-800/60 rounded-3xl p-6 sm:p-8 border border-zinc-700/50">
            
            {/* Left: Recipe Visuals & Required Ingredients */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img
                  src={activeRecipe.image}
                  alt={activeRecipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-400 flex items-center gap-1.5 border border-amber-500/30">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Prep: {activeRecipe.prepTime}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {isMarathi ? activeRecipe.marathiTitle : activeRecipe.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {activeRecipe.description}
                </p>
              </div>

              {/* Linked Key Spices Required */}
              <div className="space-y-3 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Key Masalas Needed for this Dish:
                  </span>
                </div>

                <div className="space-y-2">
                  {linkedProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-zinc-800 p-2.5 rounded-xl text-xs">
                      <div className="flex items-center gap-2">
                        <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-white line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-gray-400">₹{p.price} • {p.weight}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddAllRecipeItems}
                  className="w-full mt-2 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Recipe Spices to Cart (₹{linkedProducts.reduce((s, p) => s + p.price, 0)})</span>
                </button>
              </div>

            </div>

            {/* Right: Recipe Steps */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <h4 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-zinc-700">
                <span>Cooking Instructions (टप्प्याटप्प्याने कृती)</span>
              </h4>

              <div className="space-y-3">
                {activeRecipe.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
                    <span className="w-7 h-7 rounded-full bg-brand-500/20 text-brand-400 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {step}
                    </p>
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
