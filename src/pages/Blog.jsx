import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, BookOpen, Tag, Flame, ChefHat, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Secret Behind Authentic Puneri Godaa Masala",
    marathiTitle: "अस्सल पुणेरी गोडा मसाल्याचे रहस्य",
    category: "Heritage Recipes",
    readTime: "4 min read",
    date: "12 August 2026",
    author: "Naik Foods Culinary Team",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    excerpt: "Why true Maharashtrian Godaa masala requires 22 whole spices slow-roasted at low heat and hand-pounded to protect volatile aromatics like Dagad Phool and Nagkeshar.",
    content: "Godaa Masala is the soulful crown of Maharashtrian kitchens. Unlike standard Garam Masala which focuses primarily on sharp cloves and black pepper, Godaa Masala is sweet, warm, deeply aromatic, and mildly spiced. The distinctive dark black-brown color comes from slow dry roasting of whole coriander, cumin, dry copra (coconut), and stone flower (dagad phool)."
  },
  {
    id: 2,
    title: "Kolhapuri Lavangi Chilies: Maharashtra's Fiery Culinary Icon",
    marathiTitle: "कोल्हापुरी लवंगी मिरचीची आग आणि रस्सा",
    category: "Spice Guide",
    readTime: "5 min read",
    date: "04 August 2026",
    author: "Chef Kulkarni",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800",
    excerpt: "Understanding the unique pungent heat profile of sun-dried Kolhapuri Lavangi and Sankeshwari chilies used in world-famous Tambda and Pandhra Rassa.",
    content: "Kolhapuri cuisine is celebrated across India for its bold flavors. The secret lies not merely in heat, but in the layered balance between fiery Lavangi chilies and roasted sesame-garlic paste. Our Kolhapuri Lavangi Chili Masala preserves this heritage without artificial oleoresins."
  },
  {
    id: 3,
    title: "The Ancient Art of Sun-Cured Konkani Pickles",
    marathiTitle: "कोकणातील पारंपारिक उन्हात मुरवलेली लोणची",
    category: "Pickle Traditions",
    readTime: "3 min read",
    date: "28 July 2026",
    author: "Sunita Naik",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=800",
    excerpt: "How traditional Konkani households cure raw Rajapuri mangoes under natural summer sunlight with cold-pressed sesame oil and coarse Rai Kuria.",
    content: "Natural pickling is an alchemy of time, salt, mustard seeds, and sunlight. In traditional Konkan homes, glass barnis are placed on terrace walls for 21 days. Naik Foods preserves this zero-chemical method in every bottle of Kacchi Kairi Pickle."
  },
  {
    id: 4,
    title: "Cooking with Metkut: The Traditional Maharashtrian Superfood",
    marathiTitle: "पुणेरी मेतकुट: आरोग्यदायी पारंपारिक आहार",
    category: "Nutrition & Health",
    readTime: "4 min read",
    date: "15 July 2026",
    author: "Nutritionist Aditi Joshi",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    excerpt: "Roasted pulses, dry ginger, and hing blended into a light, digestive protein powder enjoyed with piping hot steamed rice and homemade ghee.",
    content: "Before protein shakes existed, Maharashtrian homes relied on Metkut. Made from roasted chana dal, urad dal, rice, wheat, and digestive herbs like saunth and hing, it provides clean, easily digestible nourishment for all ages."
  }
];

export default function Blog({ isMarathi }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
            {isMarathi ? "पाककृती आणि मसाले ज्ञान" : "Culinary Knowledge & Recipes"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {isMarathi ? "नाईक फूड्स खाद्यसंस्कृती ब्लॉग" : "The Naik Foods Culinary Journal"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Discover authentic spice guides, traditional cooking techniques, and generational Maharashtrian kitchen wisdom.
          </p>
        </div>

        {/* Blog Post Detail View Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-zinc-800 space-y-5 text-left">
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-brand-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                  {selectedPost.category}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedPost.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {isMarathi ? selectedPost.marathiTitle : selectedPost.title}
                </h2>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">By {selectedPost.author}</p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed border-t border-gray-100 dark:border-zinc-800 pt-4">
                <p className="font-semibold text-gray-800 dark:text-white">{selectedPost.excerpt}</p>
                <p>{selectedPost.content}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                <Link
                  to="/category"
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Shop related spices →
                </Link>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-xs font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Featured Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl border border-amber-100/80 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-brand-500/50"
            >
              <div className="relative aspect-16/9 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-brand-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                    {isMarathi ? post.marathiTitle : post.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-400">{post.author}</span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
