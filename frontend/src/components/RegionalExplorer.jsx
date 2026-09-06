import React from 'react';
import { Compass } from 'lucide-react';

export default function RegionalExplorer({ selectedRegion, setSelectedRegion, isMarathi }) {
  const regions = [
    { id: "All", name: isMarathi ? "सर्व भाग (All MH)" : "All Maharashtra", desc: "Complete regional food catalog", icon: "🚩" },
    { id: "Vidarbha & Pune", name: isMarathi ? "विदर्भ (Vidarbha)" : "Vidarbha (Nagpur)", desc: "Varhadi Kala Masala & Saoji spices", icon: "🔥" },
    { id: "Konkan Coast", name: isMarathi ? "कोकण (Konkan Coast)" : "Konkan Coast", desc: "Malvani fish curry & Kairi pickles", icon: "🌊" },
    { id: "Kolhapur", name: isMarathi ? "कोल्हापूर (Kolhapur)" : "Kolhapur Region", desc: "Fiery Lavangi chili & Tambda Rassa", icon: "🌶️" },
    { id: "Pune & Western MH", name: isMarathi ? "पुणे (Pune Heritage)" : "Pune & Western MH", desc: "Godaa Masala & Puneri Bhakarwadi", icon: "🏰" },
    { id: "Marathwada", name: isMarathi ? "मराठवाडा (Marathwada)" : "Marathwada", desc: "Solapuri Shenga Chutney & Shevga Pickle", icon: "🥜" }
  ];

  return (
    <section className="py-8 bg-amber-100/40 dark:bg-zinc-800/40 border-y border-amber-200/50 dark:border-zinc-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="text-left">
            <div className="flex items-center gap-2 text-saffron-600 dark:text-saffron-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>{isMarathi ? "प्रादेशिक शोध" : "Regional Culinary Explorer"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white mt-1 font-heading">
              {isMarathi ? "महाराष्ट्राची प्रादेशिक चव सफर 🗺️" : "Interactive Maharashtra Spice Region Map 🗺️"}
            </h2>
          </div>
          
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md text-left">
            Select any culinary zone below to discover authentic local spices, pickles, and snacks from that region.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {regions.map((r) => {
            const isSelected = selectedRegion === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border relative ${
                  isSelected
                    ? "bg-white dark:bg-zinc-900 border-saffron-600 shadow-md ring-2 ring-saffron-500/30 scale-[1.02]"
                    : "bg-white/60 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:bg-white"
                }`}
              >
                <div className="text-2xl mb-2">{r.icon}</div>
                <h3 className={`text-xs font-bold ${isSelected ? "text-saffron-600" : "text-zinc-800 dark:text-zinc-200"}`}>
                  {r.name}
                </h3>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {r.desc}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
