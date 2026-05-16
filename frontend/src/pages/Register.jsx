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
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/');
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

           <div className="relative z-10 space-y-4 pt-8 border-t border-white/5">
              {[
                { label: 'AI Coaching', desc: 'Personalized training plans' },
                { label: 'Live Analytics', desc: 'Real-time performance data' },
                { label: 'Global Leaderboard', desc: 'Compete with athletes worldwide' },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-3"
                >
                   <div className="w-2 h-2 rounded-full bg-brand-lime mt-1.5 shrink-0" />
                   <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
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

              <div className="space-y-2">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Type</label>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'user', label: 'Athlete', desc: 'Track & train' },
                      { value: 'trainer', label: 'Trainer', desc: 'Coach & guide' },
                    ].map((role) => (
                      <button
                        type="button"
                        key={role.value}
                        onClick={() => setFormData({...formData, role: role.value})}
                        className={`h-16 rounded-xl font-medium text-sm transition-all border-2 flex flex-col items-center justify-center gap-0.5 ${
                          formData.role === role.value 
                          ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' 
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                         <span className="font-bold">{role.label}</span>
                         <span className="text-xs opacity-60">{role.desc}</span>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="pt-2">
                 <button 
                   disabled={loading}
                   className="w-full h-12 bg-brand-orange text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-orange-500 hover:shadow-orange-glow transition-all active:scale-95 disabled:opacity-60"
                 >
                    {loading ? 'Creating account...' : 'Create Account'}
                    {!loading && <ArrowRight size={18} />}
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
