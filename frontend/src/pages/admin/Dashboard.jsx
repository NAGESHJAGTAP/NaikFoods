import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboard, fetchSalesChart } from '../../services/adminApi';
import {
  TrendingUp, ShoppingCart, Package, AlertTriangle, RefreshCw,
  Sparkles, MapPin, CheckCircle2, ChevronRight,
  ShieldCheck, ArrowRight
} from 'lucide-react';

const STATUS_CONFIG = {
  Confirmed: {
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    label: 'Confirmed'
  },
  Processing: {
    bg: 'bg-blue-50 text-blue-700 border-blue-200',
    dot: 'bg-blue-500',
    label: 'Processing'
  },
  Shipped: {
    bg: 'bg-violet-50 text-violet-700 border-violet-200',
    dot: 'bg-violet-500',
    label: 'Shipped'
  },
  'Out for Delivery': {
    bg: 'bg-orange-50 text-orange-700 border-orange-200',
    dot: 'bg-orange-500',
    label: 'Out for Delivery'
  },
  Delivered: {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    label: 'Delivered'
  },
  Cancelled: {
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    dot: 'bg-rose-500',
    label: 'Cancelled'
  },
};

function SalesChart({ data, labels, period }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-44 flex items-center justify-center text-stone-400 text-xs">
        No sales data available for this range
      </div>
    );
  }

  const max = Math.max(...data, 100);
  const h = 130;
  const w = 100;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (v / max) * (h - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <svg viewBox={`-4 -15 ${w + 8} ${h + 35}`} className="w-full h-44 overflow-visible font-sans">
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#70BF4F" stopOpacity="0.30" />
              <stop offset="70%" stopColor="#70BF4F" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#70BF4F" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#599E3D" />
              <stop offset="100%" stopColor="#70BF4F" />
            </linearGradient>
            <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#70BF4F" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          {[0, 0.33, 0.66, 1].map((f, i) => {
            const y = h - f * (h - 20) - 10;
            return (
              <g key={i}>
                <line
                  x1="0" y1={y} x2={w} y2={y}
                  stroke="currentColor" strokeWidth="0.5"
                  className="text-stone-200"
                  strokeDasharray="3,3"
                />
                <text
                  x="-2" y={y + 2} textAnchor="end"
                  fontSize="3.2" fill="currentColor"
                  className="text-stone-400 font-semibold"
                >
                  ₹{Math.round(f * max)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#salesGrad)" />

          {/* Main Chart Line */}
          <polyline
            points={pts}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#shadow)"
          />

          {/* Interactive Data Dots & Tooltips */}
          {data.map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - (v / max) * (h - 20) - 10;
            return (
              <g key={i} className="group cursor-pointer">
                <circle cx={x} cy={y} r="3.5" fill="#ffffff" stroke="#70BF4F" strokeWidth="1.8" />
                <circle cx={x} cy={y} r="1.8" fill="#70BF4F" />
                {/* Tooltip on hover */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <rect x={x - 12} y={y - 14} width="24" height="9" rx="2" fill="#292524" />
                  <text x={x} y={y - 8} textAnchor="middle" fontSize="3.8" fill="#ffffff" fontWeight="bold">
                    ₹{v}
                  </text>
                </g>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {labels.map((l, i) => {
            const x = (i / (data.length - 1)) * w;
            return (
              <text
                key={i}
                x={x}
                y={h + 16}
                textAnchor="middle"
                fontSize="3.6"
                fill="currentColor"
                className="text-stone-400 font-bold"
              >
                {l}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);
  const [period, setPeriod] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [dash, ch] = await Promise.all([
        fetchDashboard(),
        fetchSalesChart(period)
      ]);
      setData(dash);
      setChart(ch);
    } catch (e) {
      setError(e.message || 'Unable to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [period]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-stone-700">
          Loading Naik Foods live analytics...
        </p>
        <p className="text-xs text-stone-400 mt-1">Fetching dynamic revenue and order records from server</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center max-w-lg mx-auto my-12">
        <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
        <h3 className="font-extrabold text-stone-900 text-base mb-1">
          Unable to Load Data
        </h3>
        <p className="text-rose-600 text-xs mb-5">{error}</p>
        <button
          onClick={loadData}
          className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const revenue = data?.totalRevenue || 0;
  const ordersCount = data?.totalOrders || 0;
  const activeCount = data?.activeProducts || 0;
  const lowStock = data?.lowStockAlerts || 0;
  const growth = data?.revenueGrowth || 0;

  return (
    <div className="space-y-8 animate-fadeIn text-left">

      {/* Top Welcome Header matching Homepage Heritage vibe (No Black Color) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FCFAF6] via-[#F8F5EE] to-[#F1ECE1] border border-stone-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-[11px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Live Control Center
              </span>
              <span className="text-xs font-bold text-stone-600">
                अस्सल महाराष्ट्रीयन चव • Shukrawar Peth, Pune
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 font-serif">
              Naik Foods <span className="text-brand-600">Business Overview</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Real-time sales revenue, customer orders, inventory levels, and product catalog status.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold hover:border-brand-500 hover:text-brand-600 transition-all shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
              <span>Refresh Data</span>
            </button>

            <Link
              to="/admin/products"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/25"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Manage Products</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards (Clean White with Soft Borders) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Card 1: Total Sales Revenue */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-all hover:border-brand-500/40 group relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Total Sales Revenue
            </span>
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              ₹{revenue.toLocaleString('en-IN')}
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                +{growth}% this week
              </span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Revenue generated from completed orders
            </p>
          </div>
        </div>

        {/* Card 2: Total Orders Placed */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-all hover:border-brand-500/40 group relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Total Orders Placed
            </span>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform shadow-xs">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {ordersCount}
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {ordersCount} Fulfilled Orders
              </span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Active customer fulfillment
            </p>
          </div>
        </div>

        {/* Card 3: Active Products */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-all hover:border-brand-500/40 group relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Active Products
            </span>
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform shadow-xs">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {activeCount}
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-800">
                100% Live in Catalog
              </span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Listed in online store
            </p>
          </div>
        </div>

        {/* Card 4: Low Stock Alerts */}
        <Link
          to="/admin/inventory"
          className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm hover:shadow-md transition-all hover:border-rose-400 group relative overflow-hidden block"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Low Stock Alerts
            </span>
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs ${
              lowStock > 0
                ? 'bg-rose-50 text-rose-600 border border-rose-100'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-stone-900 tracking-tight">
              {lowStock}
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <span className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full ${
                lowStock > 0
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {lowStock > 0 ? `${lowStock} items need restocking` : 'Healthy inventory levels'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1 flex items-center gap-1 group-hover:text-brand-600 transition-colors">
              <span>View inventory levels</span>
              <ArrowRight className="w-3 h-3" />
            </p>
          </div>
        </Link>

      </div>

      {/* Low Stock Urgent Warning Banner (if any) */}
      {lowStock > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
              !
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">
                Low Inventory Notice: {lowStock} products are at or below minimum threshold!
              </p>
              <p className="text-[11px] text-stone-600">
                Restock soon to avoid missing out on authentic spice orders.
              </p>
            </div>
          </div>
          <Link
            to="/admin/inventory"
            className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
          >
            Review Inventory →
          </Link>
        </div>
      )}

      {/* Section: Sales Overview Chart & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-stone-900">
                  Sales Overview
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  विक्री अहवाल
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Revenue generated over time from online orders
              </p>
            </div>

            {/* Range Switcher */}
            <div className="flex items-center p-1 rounded-2xl bg-stone-100 border border-stone-200 self-start sm:self-auto">
              {[
                { id: '7days', label: '7 Days' },
                { id: '30days', label: '30 Days' },
                { id: '12months', label: '12 Months' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    period === p.id
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Sales Chart */}
          {chart ? (
            <SalesChart data={chart.data} labels={chart.labels} period={period} />
          ) : (
            <div className="h-44 flex items-center justify-center text-xs text-stone-400">
              Loading chart...
            </div>
          )}
        </div>

        {/* Order Status Breakdown Side Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-base text-stone-900 mb-1">
              Order Status Overview
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Live fulfillment status of customer orders
            </p>

            <div className="space-y-3">
              {(data?.statusBreakdown || []).map(item => {
                const cfg = STATUS_CONFIG[item.status] || { dot: 'bg-stone-400', label: item.status };
                const pct = ordersCount > 0 ? Math.round((item.count / ordersCount) * 100) : 0;
                return (
                  <div key={item.status} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-stone-700">
                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <span>{item.status}</span>
                      </span>
                      <span className="text-stone-900 font-extrabold">
                        {item.count} <span className="text-[10px] text-stone-400 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${cfg.dot}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-100">
            <Link
              to="/admin/orders"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-stone-50 hover:bg-brand-50 hover:text-brand-700 text-xs font-bold text-stone-700 transition-all border border-stone-200"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* Section: Recent Customer Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-stone-900">
                Recent Customer Orders
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                नुकत्याच आलेल्या ऑर्डर्स
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing latest customer purchases from across Maharashtra
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Go to Orders Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Table */}
        {(!data?.recentOrders || data.recentOrders.length === 0) ? (
          <div className="py-12 text-center text-stone-400 text-xs font-medium">
            No customer orders recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-[11px] font-black uppercase tracking-wider text-stone-400">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4 text-center">Items</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {data.recentOrders.map((order) => {
                  const statusInfo = STATUS_CONFIG[order.status] || {
                    bg: 'bg-stone-100 text-stone-700 border-stone-200',
                    dot: 'bg-stone-400',
                    label: order.status
                  };
                  const itemCount = order.items?.reduce((acc, i) => acc + (i.quantity || 1), 0) || order.items?.length || 1;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-brand-50/40 transition-colors group"
                    >
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                        {order.id}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {order.customerName?.[0] || 'C'}
                          </div>
                          <div>
                            <p className="font-extrabold text-stone-900 leading-tight">
                              {order.customerName}
                            </p>
                            <p className="text-[10px] text-stone-400 font-mono">
                              {order.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* City */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600">
                          <MapPin className="w-3 h-3 text-brand-600" />
                          <span>{order.city}</span>
                        </span>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4 text-center font-bold text-stone-700">
                        {itemCount}
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 text-right font-black text-stone-900">
                        ₹{order.totalAmount}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${statusInfo.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                          <span>{order.status}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to="/admin/orders"
                          className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-brand-500 hover:text-white text-[11px] font-bold transition-all text-stone-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
