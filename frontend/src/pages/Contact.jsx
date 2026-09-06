import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';

export default function Contact({ isMarathi }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Retail Order',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', inquiryType: 'Retail Order', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400 text-xs font-black uppercase tracking-wider">
            {isMarathi ? "संपर्क आणि चौकशी" : "Get In Touch"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {isMarathi ? "नाईक फूड्सशी संपर्क साधा" : "Contact Naik Foods"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Have questions about traditional spices, wholesale orders, or custom combo gift packs? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">

          {/* Left: Contact Info Cards */}
          <div className="space-y-4">
            
            {/* Address */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100/80 dark:border-zinc-800 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Store & Manufacturing Unit</h3>
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">
                Naik Foods Heritage Store,<br />
                Shukrawar Peth, Near Subhash Chowk,<br />
                Pune, Maharashtra — 411002
              </p>
            </div>

            {/* Phone & WhatsApp */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100/80 dark:border-zinc-800 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Call & WhatsApp Support</h3>
              <p className="text-xs text-gray-600 dark:text-zinc-300">
                Direct: <strong>+91 97300 46247</strong><br />
                Landline: <strong>020 2445 1985</strong>
              </p>
              <a
                href="https://wa.me/919730046247"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs font-bold text-emerald-600 hover:underline pt-1"
              >
                Chat on WhatsApp →
              </a>
            </div>

            {/* Email & Hours */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100/80 dark:border-zinc-800 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Email & Store Timings</h3>
              <p className="text-xs text-gray-600 dark:text-zinc-300">
                contact@naikfoods.co.in<br />
                support@naikfoods.co.in
              </p>
              <div className="pt-2 border-t border-gray-100 dark:border-zinc-800 text-[11px] text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Monday – Saturday: 9:30 AM – 8:30 PM</span>
              </div>
            </div>

          </div>

          {/* Right: Interactive Inquiry Form */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-amber-100/80 dark:border-zinc-800 p-6 sm:p-10 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
              {isMarathi ? "आम्हाला संदेश पाठवा" : "Send Us a Message"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Fill in your contact information and requirement. Our team will get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Deshmukh"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1 block">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rahul@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1 block">Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800 text-xs font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none dark:text-white cursor-pointer"
                  >
                    <option value="Retail Order">Retail Order Query</option>
                    <option value="Wholesale / Bulk">Wholesale / Bulk Purchase</option>
                    <option value="Catering / Restaurant">Hotel / Catering Spices</option>
                    <option value="Distribution">Distributorship Partnership</option>
                    <option value="Feedback">Product Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-zinc-300 mb-1 block">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today? Let us know which products you're interested in..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800 text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
