import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, 
  Lock, 
  LogIn, 
  ArrowRight, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Award, 
  Truck, 
  Star,
  CheckCircle2
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account/orders';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      login(data.token, data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('amit@example.com');
    setPassword('demo123');
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'amit@example.com', password: 'demo123' })
      });
      const data = await res.json();
      if (data.success) {
        login(data.token, data.user);
        navigate(from, { replace: true });
      } else {
        setError(data.message || 'Demo login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#FBF9F5] dark:bg-zinc-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-zinc-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* Left Column: Attractive Brand Showcase (5 cols - Website Matching Warm Cream Theme) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FCFAF6] via-[#F8F5EE] to-[#F1ECE1] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-6 sm:p-10 text-stone-900 dark:text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200/90 dark:border-zinc-800">
          {/* Decorative Background Blur Glows */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Header */}
          <div className="relative z-10 space-y-4 text-left">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform shrink-0">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-stone-900 dark:text-white flex items-center gap-1">
                  NAIK <span className="text-brand-600 dark:text-brand-400">FOODS</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
                  Pune Heritage Since 1995 • Shukrawar Peth
                </span>
              </div>
            </Link>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-[11px] font-bold border border-brand-200/80 dark:border-brand-800 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                अस्सल महाराष्ट्रीयन चव
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-3 font-serif leading-tight">
                Authentic Spices, <br className="hidden sm:inline" />Handcrafted with Love.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                Log in to order 100% stone-ground masalas, traditional pickles, and healthy snacks with live order tracking.
              </p>
            </div>
          </div>

          {/* Featured Product Visual Card (Clean White matching website cards) */}
          <div className="relative z-10 my-6 bg-white dark:bg-zinc-800/95 rounded-2xl p-4 border border-stone-200/90 dark:border-zinc-700 shadow-md text-left">
            <div className="flex items-center gap-3.5">
              <img
                src="https://res.cloudinary.com/dskzfipt3/image/upload/v1780924253/medusa/1780924252399-pomelli_photoshoot-1%20(21).png.jpg"
                alt="Sawai Kolhapuri Misal Masala"
                className="w-16 h-16 rounded-xl object-cover shadow-inner flex-shrink-0 bg-stone-100 dark:bg-zinc-700 border border-stone-100"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-amber-500 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>4.9 / 5 Rating (12k+ Orders)</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate mt-0.5">
                  Sawai Kolhapuri Misal Rassa Masala
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                  Traditional hand-pounded recipe from Shukrawar Peth
                </p>
              </div>
            </div>
          </div>

          {/* Brand Highlights List */}
          <div className="relative z-10 space-y-2.5 pt-3 border-t border-stone-200/80 dark:border-zinc-700 text-left text-xs text-stone-700 dark:text-stone-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>100% Stone-Ground, Zero Preservatives</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>Fast Doorstep Delivery with Live Tracking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>Safe &amp; Verified Direct Kitchen Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Login Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-left bg-white dark:bg-zinc-900">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
                <LogIn className="w-3.5 h-3.5" />
                Customer Sign In
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                Welcome Back
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Enter your details below to manage orders and explore your favorites.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Password
                  </label>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline cursor-pointer">
                    Forgot Password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-10 pr-11 py-3 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center gap-2 text-stone-600 dark:text-stone-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-2xl shadow-lg shadow-brand-500/25 text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 font-extrabold text-sm transition active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Your Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Fast Demo Account Login Shortcut */}
            <div className="pt-3 border-t border-stone-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-dashed border-brand-300 dark:border-brand-700 bg-brand-50/70 hover:bg-brand-100/70 dark:bg-brand-950/40 dark:hover:bg-brand-900/50 text-brand-800 dark:text-brand-300 text-xs sm:text-sm font-bold transition group"
              >
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform" />
                <span>1-Click Demo Login (Amit Naik - 2 Orders)</span>
              </button>
            </div>

            {/* Switch to Register */}
            <div className="pt-2 text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Don't have an account yet?{' '}
              <Link 
                to="/register" 
                className="font-extrabold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
              >
                Create an account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
