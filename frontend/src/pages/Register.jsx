import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Activity, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const { register, socialLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      if (formData.role === 'trainer') {
         navigate('/admin/login', { state: { message: 'Trainer Registration successful! Please authenticate to access System Core.' } });
      } else {
         navigate('/login', { state: { message: 'Registration successful! Please login to synchronize your account.' } });
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        setError(errors[firstErrorKey][0]);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
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
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans tactical-grid">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] -mr-60 -mt-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl flex flex-col md:flex-row bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-white/10"
      >
        {/* Left Panel */}
        <div className="md:w-[400px] bg-black/30 p-12 flex flex-col justify-between relative overflow-hidden border-r border-white/5">
           <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-brand-blue/10 pointer-events-none" />
           
           <div className="relative z-10">
              <Link to="/" className="flex items-center gap-3 mb-12 group w-fit">
                 <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-orange-glow">
                    <Activity size={20} strokeWidth={3} />
                 </div>
                 <span className="text-xl font-black tracking-tight text-white uppercase">VITAMAX<span className="text-brand-orange">.</span></span>
              </Link>
              
              <h2 className="text-4xl font-black tracking-tight leading-tight text-white mb-4">
                 Join the<br />
                 <span className="text-brand-orange">Elite.</span>
               </h2>
               <p className="text-gray-400 text-sm leading-relaxed">
                 Create your account to unlock AI-powered training, real-time performance tracking, and personalized nutrition plans.
               </p>
            </div>

            {/* Testimonial Card to Fill Gap */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="relative z-10 my-8 bg-gradient-to-br from-brand-orange/10 to-transparent p-[1px] rounded-2xl"
            >
               <div className="bg-black/40 rounded-2xl p-5 backdrop-blur-xl">
                  <div className="flex text-brand-orange mb-3 gap-1">
                     {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                     ))}
                  </div>
                  <p className="text-xs text-gray-300 italic leading-relaxed mb-4">
                     "Vitamax completely transformed my prep. The AI analytics caught biomechanical imbalances my coaches missed for years. Absolutely elite."
                  </p>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Chen&background=0D8ABC&color=fff" alt="Sarah Chen" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <p className="text-[11px] font-bold text-white uppercase tracking-wider">Sarah Chen</p>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Olympic Sprinter</p>
                     </div>
                  </div>
               </div>
            </motion.div>

            <div className="relative z-10 space-y-6 pt-6 border-t border-white/5">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Platform Features</p>
               </div>
               {[
                 { label: 'AI Coaching', desc: 'Personalized generative training plans' },
                 { label: 'Live Analytics', desc: 'Real-time biomechanical performance data' },
                 { label: 'Global Leaderboard', desc: 'Compete with 10,000+ athletes worldwide' },
               ].map((item, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.4 + (i * 0.1) }}
                   className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                 >
                    <div className="w-2 h-2 rounded-full bg-brand-lime mt-1.5 shrink-0 shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
                    <div>
                       <p className="text-sm font-bold text-white uppercase tracking-wide">{item.label}</p>
                       <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>

         {/* Right Form Panel */}
         <div className="flex-1 p-10 md:p-12">
            <div className="mb-8">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                  <span className="text-xs text-brand-orange font-semibold uppercase tracking-widest">New Account</span>
               </div>
               <h4 className="text-3xl font-black text-white tracking-tight">Create Account</h4>
               <p className="text-gray-400 text-sm mt-1">Fill in your details to get started</p>
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

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                     <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors">
                           <User size={16} />
                        </div>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full h-12 bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                          placeholder="Your full name"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                     <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-orange transition-colors">
                           <Mail size={16} />
                        </div>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full h-12 bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                          placeholder="your@email.com"
                        />
                     </div>
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
                       value={formData.password}
                       onChange={(e) => setFormData({...formData, password: e.target.value})}
                       className="w-full h-12 bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-xl pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600"
                       placeholder="Minimum 8 characters"
                     />
                  </div>
               </div>



               <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={loading || socialLoading}
                    className="w-full h-12 bg-brand-orange text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-orange-500 hover:shadow-orange-glow transition-all active:scale-95 disabled:opacity-60"
                  >
                     {loading ? 'Creating account...' : 'Create Account'}
                     {!loading && <ArrowRight size={18} />}
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
               <Link to="/login" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Already have an account?{' '}
                  <span className="text-brand-orange font-semibold hover:underline">Sign in</span>
               </Link>
            </div>
         </div>
      </motion.div>
    </div>
  );
};

export default Register;
