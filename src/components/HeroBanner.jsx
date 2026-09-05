import React from 'react';
import { Flame, Award, Truck, ShieldCheck, ArrowRight, PackagePlus } from 'lucide-react';

export default function HeroBanner({ isMarathi, onOpenBoxBuilder }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FCFAF6] via-[#F8F5EE] to-[#F1ECE1] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/80 shadow-xs">
      {/* Background Soft Glow Circles matching brand colors */}
      <div className="absolute -right-16 -top-16 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Award className="w-4 h-4 text-brand-600" />
            {isMarathi ? "पुण्यातील अस्सल परंपरा • १९९५ पासून" : "Pune Heritage Since 1995 • Shukrawar Peth"}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-serif text-stone-900">
            {isMarathi ? (
              <>
                हाताने कांडलेले <span className="text-brand-600">अस्सल मसाले</span> आणि गावठी लोणचे!
              </>
            ) : (
              <>
                Hand-Pounded <span className="text-brand-600">Authentic Spices</span> &amp; Homemade Maharashtrian Pickles
              </>
            )}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            {isMarathi 
              ? "विदर्भ, कोकण, कोल्हापूर आणि पुणे येथील अस्सल गोडा मसाला, कांदा लसूण मसाला, शेवगा लोणचे आणि सोलापुरी शेंगदाणा चटणी थेट तुमच्या दारी."
              : "Bringing traditional Vidarbha Godaa Masala, Kolhapuri Chili, Konkan Malvani Spices, and Solapuri Chutneys crafted with heritage stone-ground recipes directly to your kitchen."
            }
          </p>

          {/* Action Buttons Matching Website Brand */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#products-section"
              className="px-6 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm rounded-full shadow-lg shadow-brand-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>{isMarathi ? "मसाले व लोणचे खरेदी करा" : "Explore Spices & Pickles"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenBoxBuilder}
              className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-bold text-sm rounded-full shadow-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <PackagePlus className="w-4 h-4 text-brand-600" />
              <span>{isMarathi ? "बॉक्स बनवा (Custom Combo)" : "Build Custom Gift Box"}</span>
            </button>
          </div>

          {/* Value Props Row Matching Card System */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-stone-200/70 text-xs">
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Flame className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>{isMarathi ? "१००% दगडी कांडप" : "Stone-Ground"}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <span>{isMarathi ? "केमिकल विरहित" : "Zero Preservatives"}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>{isMarathi ? "₹४९९ वर डिलिव्हरी फ्री" : "Free Ship > ₹499"}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700 font-medium">
              <Award className="w-4 h-4 text-brand-700 flex-shrink-0" />
              <span>{isMarathi ? "अस्सल पुणे ब्रांड" : "Authentic Pune Quality"}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Hero Visual Card (Clean White Card matching website product cards) */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 bg-white p-4">
            <img
              src="https://res.cloudinary.com/dskzfipt3/image/upload/v1780924253/medusa/1780924252399-pomelli_photoshoot-1%20(21).png.jpg"
              alt="Sawai Kolhapuri Misal Rassa Masala"
              className="w-full h-64 sm:h-72 object-cover rounded-2xl shadow-inner"
            />
            
            {/* Overlay Spice Level Pill */}
            <div className="absolute top-7 right-7 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-200 text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{isMarathi ? "झणझणीत चव" : "Authentic Kolhapuri"}</span>
            </div>

            <div className="p-3 text-left">
              <h3 className="text-base font-bold text-stone-900 flex items-center justify-between font-serif">
                <span>{isMarathi ? "सवाई मिसळ रस्सा मसाला" : "Sawai Kolhapuri Misal Masala"}</span>
                <span className="text-brand-600 font-extrabold text-lg font-mono">₹65</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                {isMarathi ? "अस्सल लवंगी मिरची आणि खमंग मसाल्यांचा झणझणीत कोल्हापुरी रस्सा." : "Crafted with authentic Lavangi chilies for the legendary fiery red Kolhapuri misal rassa."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
