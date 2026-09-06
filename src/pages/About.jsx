import React from 'react';
import { ShieldCheck, Award, Heart, Sparkles, MapPin, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About({ isMarathi }) {
  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-600 to-brand-800 text-white p-8 sm:p-14 shadow-xl">
          <div className="max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              {isMarathi ? "आमचा वारसा • १९८५ पासून" : "Our Heritage Since 1985"}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {isMarathi 
                ? "अस्सल महाराष्ट्रीयन चवीची ३८ वर्षांची अखंड परंपरा"
                : "38 Years of Preserving Authentic Maharashtrian Culinary Flavors"}
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              {isMarathi
                ? "पुण्यातील शुक्रवार पेठेतून सुरू झालेला हा प्रवास आज संपूर्ण महाराष्ट्रात आणि जगभरातील खवय्यांच्या घराघरांत अस्सल घरगुती मसाल्यांचा सुगंध पसरवत आहे."
                : "From the cultural heart of Shukrawar Peth, Pune, Naik Foods has been crafting traditional hand-pounded masalas, sun-cured pickles, and authentic Maharashtrian specialties with uncompromising purity."}
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-left">
            <span className="text-xs font-black uppercase text-brand-600 tracking-wider">
              {isMarathi ? "परंपरेची सुरुवात" : "The Tradition"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {isMarathi ? "दगडी उखळ आणि लाकडी मुसळाची जादू" : "The Art of Hand-Pounded Spices"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              Modern high-speed pulverizers generate extreme friction heat, burning off the subtle essential oils and natural aromas of cardamom, cinnamon, and stone flower (dagad phool).
            </p>
            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              At Naik Foods, we strictly follow the age-old Maharashtrian technique of slow, low-temperature hand-pounding (कांडप पद्धत). Every spice is meticulously cleaned, sun-dried, roasted to precision in small batches, and pounded to release rich natural aromas that elevate everyday home cooking into a memorable feast.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-xs">
                <p className="text-2xl font-black text-brand-600">38+</p>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Years of Trust</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-xs">
                <p className="text-2xl font-black text-brand-600">50,000+</p>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Happy Families</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl aspect-4/3 relative">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
              alt="Traditional Maharashtrian Spices"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <p className="text-white text-xs font-bold">
                Hand-selected whole spices stone-ground for rich color and authentic aroma.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Value Pillars */}
        <div className="space-y-6 text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              {isMarathi ? "आमची मूल्ये आणि गुणवत्ता हमी" : "Our Core Quality Principles"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Why thousands of Maharashtrian households trust Naik Foods every month
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">100% Pure & Unadulterated</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Zero artificial colors, zero synthetic preservatives, and no filler starches.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Authentic Recipes</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Crafted using age-old ancestral culinary formulations passed down through generations.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Direct Farm Sourcing</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Grown by trusted local farmers across Vidarbha, Kolhapur, Konkan, and Western Maharashtra.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Hygienic Packaging</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Aroma-locked multi-layer food grade pouching keeps fresh flavors intact up to 6 months.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-50 via-brand-50 to-orange-50 dark:bg-zinc-900 border border-amber-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              Experience the True Taste of Maharashtra
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Explore our complete catalog of hand-pounded masalas, pickles, and crispy snacks.
            </p>
          </div>
          <Link
            to="/category"
            className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
