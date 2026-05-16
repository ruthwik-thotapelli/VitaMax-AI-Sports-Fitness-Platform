import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Overview from './pages/Overview'
import AIWorkouts from './pages/AIWorkouts'
import Analytics from './pages/Analytics'
import Nutrition from './pages/Nutrition'
import Achievements from './pages/Achievements'
import Community from './pages/Community'
import Schedule from './pages/Schedule'
import TrainerDashboard from './pages/TrainerDashboard'
import LandingPage from './pages/LandingPage'
import CommandCenter from './pages/CommandCenter'
import Programs from './pages/Programs'
import Challenges from './pages/Challenges'
import Pricing from './pages/Pricing'
import AIChatbot from './components/AIChatbot'
import Navbar from './components/Navbar'
import { 
  Activity, 
  Trophy, 
  Calendar, 
  LayoutDashboard,
  Users,
  Utensils,
  MessageSquare,
  LogOut,
  Bell,
  Zap,
  Dumbbell,
  Search,
  ShieldCheck,
  Cpu,
  Target
} from 'lucide-react'

// Dashboard Component
const Dashboard = ({ initialTab = 'command' }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAdmin = user?.role === 'admin' || user?.role === 'trainer';

  const renderContent = () => {
    switch(activeTab) {
      case 'command': return <CommandCenter user={user} setActiveTab={setActiveTab} />;
      case 'dashboard': return isAdmin ? <TrainerDashboard /> : <Overview user={user} setActiveTab={setActiveTab} />;
      case 'workout': return <AIWorkouts />;
      case 'analytics': return <Analytics />;
      case 'nutrition': return <Nutrition />;
      case 'achievements': return <Achievements />;
      case 'community': return <Community />;
      case 'schedule': return <Schedule />;
      default: return <CommandCenter user={user} setActiveTab={setActiveTab} />;
    }
  };

  const menuItems = [
    { id: 'command', icon: Cpu, label: 'Command Center' },
    { id: 'dashboard', icon: isAdmin ? ShieldCheck : LayoutDashboard, label: isAdmin ? 'Tactical Hub' : 'Stat Hub' },
    { id: 'workout', icon: Dumbbell, label: 'Protocols' },
    { id: 'analytics', icon: Trophy, label: 'Insights' },
    { id: 'nutrition', icon: Utensils, label: 'Diet Plan' },
    { id: 'schedule', icon: Calendar, label: 'Bootcamp' },
    { id: 'achievements', icon: Zap, label: 'Rankings' },
    { id: 'community', icon: Users, label: 'Lounge' },
  ];

  return (
    <div className="flex min-h-screen bg-brand-navy text-white overflow-hidden font-sans tactical-grid">
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 300 : 96 }}
        className="bg-brand-navy-light border-r border-white/5 flex flex-col z-50 h-screen sticky top-0 transition-all shadow-[20px_0_40px_rgba(0,0,0,0.3)]"
      >
        <div className="px-6 py-7 flex items-center gap-3">
           <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white shadow-orange-glow shrink-0">
             <Activity size={20} strokeWidth={3} />
           </div>
           {isSidebarOpen && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-w-0">
                <span className="text-lg font-black tracking-tight text-white leading-none uppercase">VITAMAX<span className="text-brand-orange">.</span></span>
                <span className="text-[10px] font-semibold text-gray-400 mt-0.5">Performance Engine</span>
             </motion.div>
           )}
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button type="button"
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
                activeTab === item.id 
                ? 'bg-brand-orange text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={`shrink-0 transition-all ${activeTab === item.id ? '' : 'group-hover:text-brand-orange'}`} />
              {isSidebarOpen && (
                <span className={`font-semibold text-sm tracking-wide transition-all`}>
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group">
              {isSidebarOpen ? (
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 p-0.5 flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="avatar" className="rounded-lg w-full h-full" />
                      </div>
                      <div className="overflow-hidden flex-1 min-w-0">
                         <p className="text-sm font-bold truncate text-white">{user?.name || 'Athlete'}</p>
                         <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                            <p className="text-[10px] text-gray-400">Online</p>
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={logout}
                     className="w-full py-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 text-gray-400"
                   >
                     <LogOut size={13} /> Sign Out
                   </button>
                </div>
              ) : (
                <button onClick={logout} className="w-full h-10 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors">
                   <LogOut size={18} />
                </button>
              )}
           </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-brand-navy relative">
        {/* Cinematic Backdrop Glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] -ml-20 -mb-20 pointer-events-none" />

        <header className="px-6 md:px-8 py-4 flex justify-between items-center bg-brand-navy/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
             <button 
               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
               className="p-2.5 bg-white/5 rounded-xl text-white/50 hover:text-white border border-white/5 transition-all"
             >
                <Activity size={20} />
             </button>
             <div className="relative w-full max-w-lg hidden md:block group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-orange transition-colors" />
                <input 
                   type="text" 
                   placeholder="Search workouts, analytics..."
                   className="w-full bg-white/5 border border-white/5 focus:bg-white/10 focus:border-brand-orange/30 rounded-xl py-2.5 pl-10 pr-4 text-sm transition-all outline-none text-white placeholder:text-white/30"
                />
             </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-brand-orange hover:bg-white/10 transition-all relative">
               <Bell size={18} />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-orange rounded-full border border-brand-navy" />
            </button>
            
            <div className="h-10 bg-brand-navy-light border border-white/10 rounded-xl px-4 flex items-center gap-3 cursor-pointer hover:border-white/20 transition-all">
              <Calendar size={16} className="text-brand-lime" />
              <span className="text-sm font-semibold text-white">May 15</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          <div className="p-12 md:p-20 max-w-[1600px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  );
};

function App() {
  const { user, loading } = useAuth();

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center gap-10 tactical-grid">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-16 h-16 border-4 border-brand-orange/20 border-t-brand-orange rounded-full"
          />
          <h1 className="text-white font-black italic tracking-tighter text-3xl uppercase">VITAMAX<span className="text-brand-orange">.</span></h1>
        </div>
      ) : (
        <div className="min-h-screen bg-brand-navy tactical-grid">
          {!['/login', '/register'].includes(location.pathname) && <Navbar />}
          <div className={!['/login', '/register'].includes(location.pathname) ? "pt-24" : ""}>
            <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/community" element={<Community />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/achievements" element={user ? <Dashboard initialTab="achievements" /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={user ? <Dashboard initialTab="analytics" /> : <Navigate to="/login" />} />
            <Route path="/workouts" element={user ? <Dashboard initialTab="workout" /> : <Navigate to="/login" />} />
            <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default App;
