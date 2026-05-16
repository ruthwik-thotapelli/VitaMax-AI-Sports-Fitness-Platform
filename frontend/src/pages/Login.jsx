import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Activity, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col md:flex-row items-stretch overflow-hidden font-sans tactical-grid">
      
      {/* Brand Side */}
      <div className="hidden md:flex md:w-[45%] bg-black/40 p-16 flex-col justify-between relative overflow-hidden border-r border-white/5">
         {/* Glowing orbs */}
         <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/20 rounded-full blur-[100px] -mr-60 -mt-60" 
         />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] -ml-20 -mb-20" />

         {/* Logo */}
         <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 mb-16 group w-fit">
               <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-orange-glow">
                  <Activity size={22} strokeWidth={3} />
               </div>
               <span className="text-xl font-black tracking-tight text-white uppercase">VITAMAX<span className="text-brand-orange">.</span></span>
            </Link>
            
            <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.8 }}
               className="space-y-6"
            >
               <h2 className="text-5xl font-black tracking-tighter leading-tight text-white">
                  Welcome<br />
                  <span className="text-brand-orange">Back.</span>
               </h2>
               <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                  Sign in to access your personalized training dashboard, AI coaching, and performance analytics.
               </p>
               <div className="flex items-center gap-3 pt-2">
                  <div className="w-8 h-0.5 bg-brand-orange" />
                  <p className="text-gray-500 text-sm font-medium">Sector 07 // Active</p>
               </div>
            </motion.div>
         </div>

         {/* Stats */}
         <div className="relative z-10 grid grid-cols-2 gap-8">
            <div className="space-y-1">
               <p className="text-4xl font-black text-brand-lime leading-none">99.9%</p>
               <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sync Accuracy</p>
            </div>
            <div className="space-y-1">
               <p className="text-4xl font-black text-brand-blue leading-none">ELITE</p>
               <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tier Status</p>
            </div>
         </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[460px]"
        >
          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                 <span className="text-xs text-brand-orange font-semibold uppercase tracking-widest">Biometric Access</span>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Sign In</h3>
              <p className="text-gray-400 text-sm mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  disabled={loading}
                  className="w-full h-12 bg-brand-orange text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-orange-500 hover:shadow-orange-glow transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <Link to="/register" className="text-gray-500 hover:text-white text-sm transition-colors">
                Don't have an account?{' '}
                <span className="text-brand-orange font-semibold hover:underline">Create one</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
