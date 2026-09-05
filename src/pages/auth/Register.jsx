import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Gift, 
  Clock, 
  Star 
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please agree to terms and conditions to proceed.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      login(data.token, data.user);
      navigate('/account/orders', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#FBF9F5] dark:bg-zinc-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
      <div className="max-w-5xl w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-stone-200/90 dark:border-zinc-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        {/* Left Column: Attractive Brand Showcase (5 cols - Website Matching Warm Cream Theme) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#FCFAF6] via-[#F8F5EE] to-[#F1ECE1] dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-6 sm:p-10 text-stone-900 dark:text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-stone-200/90 dark:border-zinc-800">
          {/* Decorative Glows */}
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
                <Gift className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                नवीन ग्राहकांसाठी विशेष सवलत
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-3 font-serif leading-tight">
                Join the Naik Foods <br className="hidden sm:inline" />Culinary Family.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
                Register once to enjoy priority order packing, saved delivery addresses, and authentic homemade taste.
              </p>
            </div>
          </div>

          {/* Featured Product Highlight Card (Clean White matching website cards) */}
          <div className="relative z-10 my-6 bg-white dark:bg-zinc-800/95 rounded-2xl p-4 border border-stone-200/90 dark:border-zinc-700 shadow-md text-left">
            <div className="flex items-center gap-3.5">
              <img
                src="https://res.cloudinary.com/dskzfipt3/image/upload/v1781328677/medusa/1781328675643-pomelli_photoshoot_image_1_1_0612%20(9).png.jpg"
                alt="Little Millet Noodles"
                className="w-16 h-16 rounded-xl object-cover shadow-inner flex-shrink-0 bg-stone-100 dark:bg-zinc-700 border border-stone-100"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-brand-600 dark:text-brand-400 text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Healthy Grains &amp; Zero Maida</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white truncate mt-0.5">
                  Little Millet Noodles (180g)
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                  Farm-fresh millets made into quick-cooking authentic noodles
                </p>
              </div>
            </div>
          </div>

          {/* Account Benefits */}
          <div className="relative z-10 space-y-2.5 pt-3 border-t border-stone-200/80 dark:border-zinc-700 text-left text-xs text-stone-700 dark:text-stone-300">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>Real-time Live Order Tracking via BlueDart &amp; Delhivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Gift className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>Flat 10% OFF on your first box combo with code NAIK10</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
              <span>100% Encrypted &amp; Secure Payment Processing</span>
            </div>
          </div>
        </div>

        {/* Right Column: User Register Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center text-left bg-white dark:bg-zinc-900">
          <div className="max-w-md w-full mx-auto space-y-5">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs font-bold mb-2">
                <User className="w-3.5 h-3.5" />
                Sign Up Today
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Enter your details to create an account and start ordering.
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 px-4 py-3 rounded-2xl flex items-center gap-3 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form className="space-y-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="block w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="block w-full pl-10 pr-3 py-2.5 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="block w-full pl-10 pr-3 py-2.5 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min 6 chars"
                      className="block w-full pl-10 pr-9 py-2.5 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="block w-full pl-10 pr-9 py-2.5 bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-2xl text-stone-900 dark:text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500 mt-0.5"
                  />
                  <span>
                    I agree to the <span className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Terms of Service</span> and <span className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-2xl shadow-lg shadow-brand-500/25 text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 font-extrabold text-sm transition active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Create Account &amp; Start Shopping</span>
                  </>
                )}
              </button>
            </form>

            {/* Switch to Login */}
            <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-extrabold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1"
              >
                Sign In <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
