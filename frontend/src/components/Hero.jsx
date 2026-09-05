import React from 'react';
import { Flame, Award, Truck, ShieldCheck, ArrowRight, PackagePlus } from 'lucide-react';

export default function Hero({ isMarathi, onOpenBoxBuilder }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-saffron-900 to-zinc-900 text-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headline & CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-saffron-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            {isMarathi ? "पुणे • विदर्भ • कोकण • कोल्हापूर अस्सल चव" : "Authentic Regional Spices & Custom Gift Box Engine"}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-heading">
            {isMarathi ? (
              <>
                अस्सल महाराष्ट्रीयन <span className="text-saffron-400">दगडी कांडप मसाले</span> आणि गावठी लोणचे!
              </>
            ) : (
              <>
                Discover Authentic <span className="text-saffron-400">Regional Spices</span> & Custom Box Combos
              </>
            )}
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {isMarathi 
              ? "विदर्भ, कोकण, कोल्हापूर आणि पुणे येथील अस्सल गोडा मसाला, कांदा लसूण मसाला, शेवगा लोणचे आणि सोलापुरी शेंगदाणा चटणी."
              : "Explore hand-pounded Vidarbha Godaa Masala, Kolhapuri Lavangi Chili, Konkan Malvani Curry Spices, and Solapuri Peanuts with custom heat meters & gift box discounts."
            }
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#products-grid"
              className="px-6 py-3 bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs rounded-full shadow-lg shadow-saffron-600/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>{isMarathi ? "मसाले शोधा" : "Explore Regional Spices"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBoxBuilder}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-full backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <PackagePlus className="w-4 h-4 text-amber-400" />
              <span>{isMarathi ? "गिफ्ट बॉक्स बनवा" : "Build Custom Gift Box"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-zinc-300">
              <Flame className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{isMarathi ? "दगडी कांडप" : "Stone-Ground"}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{isMarathi ? "केमिकल विरहित" : "Zero Preservatives"}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Truck className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>{isMarathi ? "₹९९९ वर फ्री शिपिंग" : "Free Ship > ₹999"}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Award className="w-4 h-4 text-saffron-400 flex-shrink-0" />
              <span>{isMarathi ? "१००% अस्सल" : "Authentic Quality"}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Visual Feature Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900/80 p-4">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
              alt="SwadYatra Spices"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl"
            />
            
            <div className="absolute top-8 right-8 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Hand-Pounded 22 Spices</span>
            </div>

            <div className="p-3 text-left">
              <h3 className="text-sm font-bold text-white flex items-center justify-between font-heading">
                <span>Hand-Pounded Godaa Masala</span>
                <span className="text-saffron-400 font-extrabold text-base">₹180</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                Crafted with 22 rare spices, stone-ground for rich dark color and authentic Maharashtrian fragrance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
