import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, AlertCircle, ArrowRight, ShieldCheck, Database, Server } from 'lucide-react';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin' // Force role to admin for this specific flow
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
      navigate('/admin/login', { state: { message: 'Clearance granted. Please authenticate to continue.' } });
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        setError(errors[firstErrorKey][0]);
      } else {
        setError(err.response?.data?.message || 'Access request denied. Protocol failure.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Stunning Dynamic Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" /> {/* Ultra dark blue-black base */}
        
        {/* Animated Mesh Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-lime/20 blur-[140px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/30 blur-[130px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/20 blur-[100px] mix-blend-screen"
        />
        
        {/* Subtle Noise Overlay for Premium Texture */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 z-10 relative"
      >
        {/* Left Side: Branding & Info */}
        <div className="hidden md:flex flex-col justify-between p-12 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-brand-lime to-brand-blue flex items-center justify-center text-brand-navy shadow-[0_0_30px_rgba(204,255,0,0.4)]">
                <ShieldCheck size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">Vitamax Admin</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-lg">
              Initialize<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime via-brand-blue to-brand-lime bg-[length:200%_auto] animate-gradient">
                Commander Profile
              </span>
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-12 font-medium">
              Apply for Level 5 administrative privileges. Shape the future of global fitness protocols and access unrestricted telemetry data.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md transition-all hover:bg-black/30">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-brand-blue shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                  <Database size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Full Grid Control</p>
                  <p className="text-xs text-gray-400 mt-1">Unrestricted data access</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md transition-all hover:bg-black/30">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-brand-lime shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                  <Server size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Deploy Workouts</p>
                  <p className="text-xs text-gray-400 mt-1">Edit system protocols</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-[40px] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-md">Request Access</h2>
            <p className="text-sm text-gray-400">Set up your administrative credentials below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.1)]"
              >
                <AlertCircle className="text-red-400 shrink-0" size={18} />
                <p className="text-sm text-red-400 font-bold">{error}</p>
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/10 focus:border-white/50 focus:bg-black/60 rounded-xl pl-12 pr-4 text-sm text-white font-medium outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  placeholder="Commander Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Secure Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-lime transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/10 focus:border-brand-lime/50 focus:bg-black/60 rounded-xl pl-12 pr-4 text-sm text-white font-medium outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                  placeholder="admin@vitamax.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Passcode</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-blue transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full h-14 bg-black/40 border border-white/10 focus:border-brand-blue/50 focus:bg-black/60 rounded-xl pl-12 pr-4 text-sm text-white font-medium outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_20px_rgba(0,163,255,0.15)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-4 bg-white text-black hover:bg-gray-100 rounded-xl font-bold text-sm uppercase tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {loading ? 'Processing...' : 'Grant Clearance'}
              {!loading && <ArrowRight size={18} className="opacity-70" />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already authorized?{' '}
              <Link to="/admin/login" className="text-white font-bold hover:text-brand-blue transition-colors">
                Authenticate
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
