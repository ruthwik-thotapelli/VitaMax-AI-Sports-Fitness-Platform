import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Activity, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null); // 'google' or 'facebook'
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

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

  const handleSocialLogin = (provider) => {
    setSocialLoading(provider);
    setError('');
    socialLogin(provider); // Redirects to backend
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
               
               <div className="flex items-center gap-3 pt-6">
                  <div className="flex -space-x-3">
                     <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-brand-navy flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                     <div className="w-8 h-8 rounded-full bg-brand-orange border-2 border-brand-navy flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                     <div className="w-8 h-8 rounded-full bg-brand-blue border-2 border-brand-navy flex items-center justify-center text-[10px] font-bold text-white">AL</div>
                     <div className="w-8 h-8 rounded-full bg-brand-lime border-2 border-brand-navy flex items-center justify-center text-[10px] font-bold text-brand-navy">+</div>
                  </div>
                  <p className="text-xs font-medium text-gray-500">Join <span className="text-white font-bold">10,000+</span> elite athletes</p>
               </div>
            </motion.div>
         </div>

         {/* Middle Content to Fill Gap */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 my-10"
         >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group hover:bg-white/10 transition-colors">
               {/* Decorative corner accent */}
               <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                     <Activity size={18} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">AI Insight</p>
                     <p className="text-sm font-bold text-white tracking-wide">Recovery Recommended</p>
                  </div>
               </div>
               <p className="text-xs text-gray-400 leading-relaxed font-medium">
                 Based on your biometric sync from yesterday's heavy session, your central nervous system strain is at <span className="text-brand-orange font-bold">82%</span>. We've queued up a specialized mobility and active recovery protocol for today.
               </p>
            </div>
         </motion.div>

         {/* Premium Hardcoded Stats */}
         <div className="relative z-10 border-t border-white/5 pt-8">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
               <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest">Network Status: Optimal</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-1">
                  <p className="text-4xl font-black text-white leading-none">99.9<span className="text-brand-orange text-2xl">%</span></p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">AI Accuracy</p>
               </div>
               <div className="space-y-1">
                  <p className="text-4xl font-black text-white leading-none">1.2<span className="text-brand-blue text-2xl">M</span></p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Workouts Logged</p>
               </div>
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

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-brand-lime/10 rounded-xl border border-brand-lime/20 text-brand-lime text-sm text-center font-bold"
              >
                {successMessage}
              </motion.div>
            )}

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
                  type="submit"
                  disabled={loading || socialLoading}
                  className="w-full h-12 bg-brand-orange text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-orange-500 hover:shadow-orange-glow transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">Or continue with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading || socialLoading}
                  className="h-12 bg-white text-gray-900 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50"
                >
                  {socialLoading === 'google' ? <Activity size={18} className="animate-spin text-gray-500" /> : (
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
                  )}
                  Google
                </button>
                <button 
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={loading || socialLoading}
                  className="h-12 bg-[#1877F2] text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-[#166FE5] transition-all disabled:opacity-50"
                >
                  {socialLoading === 'facebook' ? <Activity size={18} className="animate-spin text-white" /> : (
                    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  )}
                  Facebook
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
