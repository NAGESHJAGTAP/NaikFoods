import React from 'react';
import { Truck, Headset, ShieldCheck, RefreshCw, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ isMarathi }) {
  return (
    <footer className="bg-zinc-950 text-white pt-12 pb-8 border-t border-zinc-800 text-left">
      
      {/* Top Trust Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-zinc-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">{isMarathi ? "मोफत होम डिलिव्हरी" : "Free Delivery"}</h4>
              <p className="text-[11px] text-gray-400">{isMarathi ? "₹९९९ च्या वरील ऑर्डरवर" : "On orders above ₹999"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">{isMarathi ? "२४/७ ग्राहक सेवा" : "24/7 Support"}</h4>
              <p className="text-[11px] text-gray-400">{isMarathi ? "व्हॉट्सॲपवर संपर्क करा" : "Instant WhatsApp Help"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">{isMarathi ? "१००% सुरक्षित पेमेंट" : "100% Secure Pay"}</h4>
              <p className="text-[11px] text-gray-400">{isMarathi ? "UPI, कार्ड आणि COD" : "UPI, Cards, NetBanking"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold">{isMarathi ? "अस्सल गुणवत्तेची खात्री" : "Authentic Quality"}</h4>
              <p className="text-[11px] text-gray-400">{isMarathi ? "पुण्याची अस्सल चव" : "Hand-Pounded Spices"}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-black text-lg">
              N
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              NAIK <span className="text-brand-500">FOODS</span>
            </span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            {isMarathi
              ? "अस्सल महाराष्ट्रीयन गोडा मसाला, कांदा लसूण मसाला, शेवगा लोणचे आणि भाकरवडीची विश्वसनीय नावे."
              : "Crafting heritage Maharashtrian masalas, homemade pickles, and traditional snacks with authentic stone-ground recipes since 1995."
            }
          </p>

          <div className="flex items-center gap-2 text-xs text-brand-400">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Flagship Store: Shukrawar Peth, Pune, Maharashtra 411002</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Popular Spices</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-brand-400 transition-colors">Puneri Godaa Masala</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Kanda Lasun Masala</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Fiery Kolhapuri Chili</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Konkan Malvani Curry Masala</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Nagpuri Varhadi Kala Masala</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Pickles & Chutneys</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-brand-400 transition-colors">Shevga (Drumstick) Pickle</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Kacchi Kairi Raw Mango Pickle</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Solapuri Shenga Peanut Chutney</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Karale (Niger Seed) Chutney</a></li>
            <li><a href="#" className="hover:text-brand-400 transition-colors">Puneri Crispy Bhakarwadi</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>+91 97300 46247</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-400" />
              <span>support@naikfoods.co.in</span>
            </li>
            <li className="pt-2">
              <a
                href="https://wa.me/919730046247"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white font-bold text-xs rounded-full hover:bg-[#1ebe5d] transition-all"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
        <p>© 2026 Naik Foods. All rights reserved. Developed for Bits and Volts Private Limited Assignment.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Shipping & Returns</a>
        </div>
      </div>

    </footer>
  );
}
