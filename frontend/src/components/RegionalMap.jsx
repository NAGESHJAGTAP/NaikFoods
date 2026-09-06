import React from 'react';
import { Compass, Flame, Waves, Sparkles, Landmark, Layers, MapPin } from 'lucide-react';

export default function RegionalMap({ selectedRegion, setSelectedRegion, isMarathi }) {
  const regionDetails = [
    {
      id: "All",
      name: isMarathi ? "सर्व भाग (All MH)" : "All Maharashtra",
      desc: isMarathi ? "संपूर्ण महाराष्ट्रातील सर्व मसाले व पदार्थ" : "Complete range of traditional delicacies across regions",
      IconComponent: Compass,
      specialty: "Full Variety",
      iconColor: "text-amber-600 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400"
    },
    {
      id: "Vidarbha & Pune",
      name: isMarathi ? "विदर्भ (Vidarbha)" : "Vidarbha (Nagpur)",
      desc: isMarathi ? "वऱ्हाडी काळा मसाला, कराळे चटणी आणि झणझणीत चव" : "Deep roasted Kala Masala, Karale chutney & rich black curries",
      IconComponent: Flame,
      specialty: "Kala Masala & Saoji",
      iconColor: "text-orange-600 bg-orange-100 dark:bg-orange-950/60 dark:text-orange-400"
    },
    {
      id: "Konkan Coast",
      name: isMarathi ? "कोकण (Konkan Coast)" : "Konkan Coast",
      desc: isMarathi ? "मालवणी मसाला, कैरीचे लोणचे आणि किनारपट्टीच्या चवी" : "Coconut rich Malvani fish masala & natural Kairi pickles",
      IconComponent: Waves,
      specialty: "Malvani & Kairi",
      iconColor: "text-sky-600 bg-sky-100 dark:bg-sky-950/60 dark:text-sky-400"
    },
    {
      id: "Kolhapur",
      name: isMarathi ? "कोल्हापूर (Kolhapur)" : "Kolhapur Region",
      desc: isMarathi ? "तांबडा-पांढरा रस्सा, लवंगी तिखट आणि जहाल मसाले" : "Fiery Lavangi chili powder, Tambda-Pandhra Rassa spices",
      IconComponent: Sparkles,
      specialty: "Extremely Spicy",
      iconColor: "text-red-600 bg-red-100 dark:bg-red-950/60 dark:text-red-400"
    },
    {
      id: "Pune & Western MH",
      name: isMarathi ? "पुणे (Pune Heritage)" : "Pune & Western MH",
      desc: isMarathi ? "पुणेरी बाकरवडी, गोडा मसाला आणि पौष्टिक मेतकुट" : "Classic Godaa masala, crunchy Bhakarwadi & warm Metkut rice powder",
      IconComponent: Landmark,
      specialty: "Godaa & Bhakarwadi",
      iconColor: "text-brand-600 bg-brand-100 dark:bg-brand-950/60 dark:text-brand-400"
    },
    {
      id: "Marathwada",
      name: isMarathi ? "मराठवाडा (Marathwada)" : "Marathwada (Solapur)",
      desc: isMarathi ? "सोलापुरी शेंगदाणा चटणी आणि शेवगा लोणचे" : "Solapuri roasted Shenga chutney & tender Shevga drumstick pickle",
      IconComponent: Layers,
      specialty: "Shenga Chutney & Shevga",
      iconColor: "text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400"
    }
  ];

  return (
    <section className="py-8 bg-amber-50/50 dark:bg-zinc-800/40 border-y border-amber-200/50 dark:border-zinc-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>{isMarathi ? "प्रादेशिक शोध" : "Explore Culinary Regions"}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-1 flex items-center gap-2">
              <span>{isMarathi ? "महाराष्ट्राची प्रादेशिक मसाले सफर" : "Interactive Maharashtra Regional Spice Map"}</span>
            </h2>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md">
            {isMarathi 
              ? "आपल्या आवडीच्या प्रदेशावर क्लिक करा आणि तिथल्या अस्सल चवींचे पदार्थ शोधा."
              : "Click on any region below to discover authentic local recipes and spice specialties from that part of Maharashtra."
            }
          </p>
        </div>

        {/* Region Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {regionDetails.map((r) => {
            const isSelected = selectedRegion === r.id || (r.id === "All" && selectedRegion === "All");
            const Icon = r.IconComponent;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 border relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-white dark:bg-zinc-900 border-brand-500 shadow-md ring-2 ring-brand-500/30 scale-[1.02]"
                    : "bg-white/60 dark:bg-zinc-900/40 border-gray-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${r.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                  }`}>
                    {r.specialty}
                  </span>
                </div>

                <div>
                  <h3 className={`text-xs font-bold ${isSelected ? "text-brand-600 dark:text-brand-400" : "text-gray-800 dark:text-gray-200"}`}>
                    {r.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-tight">
                    {r.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
