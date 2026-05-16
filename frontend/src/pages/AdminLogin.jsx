import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Database, Server } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-8 z-10"
      >
        {/* Left Side: Branding & Info */}
        <div className="flex flex-col justify-between p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-brand-orange to-red-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Vitamax Admin</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-4">
              System<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-lime">Command Center</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-12">
              Secure portal for administrative personnel. Monitor global platform health, manage user protocols, and oversee data integrity.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-brand-orange">
                  <Server size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Infrastructure</p>
                  <p className="text-xs text-gray-500 mt-0.5">Manage server allocations</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-brand-lime">
                  <Database size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Data Integrity</p>
                  <p className="text-xs text-gray-500 mt-0.5">Monitor core databases</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl relative">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Authenticate</h2>
            <p className="text-sm text-gray-500 mt-2">Enter your admin credentials to access the grid.</p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-brand-lime/10 border border-brand-lime/20 flex items-start gap-3">
              <ShieldCheck className="text-brand-lime shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-brand-lime font-medium">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                <p className="text-sm text-red-500 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Admin Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-white/5 border border-white/10 focus:border-white/30 focus:bg-white/10 rounded-xl pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                  placeholder="admin@vitamax.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Passcode</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-white/5 border border-white/10 focus:border-white/30 focus:bg-white/10 rounded-xl pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-white text-black hover:bg-gray-100 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In'}
              {!loading && <ArrowRight size={16} className="opacity-50" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need access?{' '}
              <Link to="/admin/register" className="text-white hover:underline transition-colors font-medium">
                Request Clearance
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
