import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag,
  BarChart2, Star, LogOut, Menu, X, Bell, ChevronRight,
  Store, ShieldCheck, Sparkles, ExternalLink
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', marathi: 'डॅशबोर्ड' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders', marathi: 'ऑर्डर्स' },
  { to: '/admin/products', icon: Package, label: 'Products', marathi: 'उत्पादने' },
  { to: '/admin/inventory', icon: BarChart2, label: 'Inventory', marathi: 'स्टॉक' },
  { to: '/admin/customers', icon: Users, label: 'Customers', marathi: 'ग्राहक' },
  { to: '/admin/categories', icon: Tag, label: 'Categories', marathi: 'कॅटेगरीज' },
  { to: '/admin/reviews', icon: Star, label: 'Reviews', marathi: 'रिव्ह्यूज' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (user) setAdmin(JSON.parse(user));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const currentNav = navItems.find(n => location.pathname.startsWith(n.to)) || { label: 'Admin', marathi: 'ॲडमिन' };

  return (
    <div className="min-h-screen bg-[#FBF9F5] flex font-sans antialiased text-stone-800 selection:bg-brand-500 selection:text-white">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR (Website-matched warm cream & crisp white, permanently fixed to viewport) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-stone-200/90 z-50 flex flex-col transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-200/80 flex items-center justify-between bg-[#FCFAF6]">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              N
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-stone-900 font-black text-base tracking-tight">NAIK <span className="text-brand-600">FOODS</span></span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                Admin Portal • ॲडमिन
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-stone-400 hover:text-stone-700 p-1.5 rounded-xl hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Heritage Trust Badge in Sidebar */}
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl bg-brand-50/70 border border-brand-200/70 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
          <span className="text-[11px] font-bold text-brand-800 truncate">
            पुणेरी अस्सल चव • Shukrawar Peth
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="px-3 pb-1.5 text-[10px] font-black uppercase tracking-wider text-stone-400">
            Main Menu
          </div>
          {navItems.map(({ to, icon: Icon, label, marathi }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/25 font-bold'
                    : 'text-stone-600 hover:bg-brand-50/80 hover:text-brand-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-brand-600'}`} />
                  <div className="flex-1 flex items-center justify-between">
                    <span>{label}</span>
                    <span className={`text-[10px] ml-1.5 font-medium ${isActive ? 'text-white/80' : 'text-stone-400 group-hover:text-brand-600'}`}>
                      {marathi}
                    </span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'opacity-100 translate-x-0.5' : 'opacity-0 group-hover:opacity-60'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stone-200/80 space-y-2 bg-[#FCFAF6]">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-stone-700 hover:bg-white hover:text-brand-600 hover:border-brand-400 transition-all group border border-stone-200/90 shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-brand-600" />
              <span>Customer Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-600" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all border border-rose-200"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Logout (लॉगआउट)</span>
            </div>
          </button>

          {admin && (
            <div className="flex items-center gap-2.5 px-2 pt-2 border-t border-stone-200/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm shadow-brand-500/20">
                {admin.name?.[0] || 'A'}
              </div>
              <div className="overflow-hidden text-left">
                <p className="text-stone-800 text-xs font-bold truncate">{admin.name || 'Naik Foods Admin'}</p>
                <p className="text-stone-500 text-[10px] truncate">{admin.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN WRAPPER (Fixed sidebar offset) */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 min-h-screen">

        {/* Sticky Top Header (White & warm cream, clean border) */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/90 h-16 flex items-center justify-between px-4 sm:px-8 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-stone-900">
                  {currentNav.label}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-bold border border-brand-200/80 hidden sm:inline-block">
                  {currentNav.marathi}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">
                Naik Foods E-Commerce Management System • Shukrawar Peth, Pune
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Store indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Store Live</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-brand-600 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-brand-500 transition-all bg-white shadow-2xs"
            >
              <Store className="w-3.5 h-3.5 text-brand-600" />
              <span>View Store</span>
            </Link>

            <div className="relative">
              <button
                className="p-2 rounded-xl text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white" />
              </button>
            </div>

            {admin && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-extrabold text-xs shadow-sm shadow-brand-500/20">
                  {admin.name?.[0] || 'A'}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-xs font-extrabold text-stone-900">{admin.name || 'Admin'}</p>
                  <p className="text-[10px] font-bold text-brand-600">Administrator</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
