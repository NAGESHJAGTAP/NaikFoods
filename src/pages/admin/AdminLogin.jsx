import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/adminApi';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(form.email, form.password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl shadow-brand-500/30 mx-auto mb-4">
            N
          </div>
          <h1 className="text-2xl font-extrabold text-white">Naik Foods</h1>
          <p className="text-zinc-400 text-sm mt-1">Admin Management Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-800/80 backdrop-blur-md rounded-3xl border border-zinc-700/50 shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <h2 className="text-white font-bold text-lg">Secure Admin Login</h2>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@naikfoods.com"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-400 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 bg-zinc-700/50 border border-zinc-600 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <><ShieldCheck className="w-4 h-4" /> Sign In to Admin Panel</>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-700">
            <p className="text-zinc-500 text-xs text-center mb-2 font-semibold">Demo Credentials</p>
            <div className="bg-zinc-700/40 rounded-xl p-3 text-xs space-y-1">
              <p className="text-zinc-300"><span className="text-zinc-500">Email:</span> admin@naikfoods.com</p>
              <p className="text-zinc-300"><span className="text-zinc-500">Password:</span> admin123</p>
            </div>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          <a href="/" className="hover:text-zinc-400 transition-colors">← Back to Store</a>
        </p>
      </div>
    </div>
  );
}
