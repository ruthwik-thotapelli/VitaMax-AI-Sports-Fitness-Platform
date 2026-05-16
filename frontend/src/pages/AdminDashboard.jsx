import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Users, 
  Dumbbell, 
  Activity, 
  Server,
  Plus,
  Trash2,
  Edit2,
  Search,
  X,
  Loader2,
  Zap,
  TrendingUp,
  AlertTriangle,
  Utensils,
  Settings,
  Lock,
  RefreshCw,
  Power
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('training');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data States
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Neural Fat Burn', type: 'Cardio', difficulty: 'Advanced', status: 'Active', enrolled: 1240 },
    { id: 2, name: 'Strength Matrix', type: 'Hypertrophy', difficulty: 'Elite', status: 'Active', enrolled: 890 },
    { id: 3, name: 'Pro Conditioning', type: 'Endurance', difficulty: 'Intermediate', status: 'Maintenance', enrolled: 2100 },
  ]);

  const [dietPlans, setDietPlans] = useState([
    { id: 1, name: 'Keto Shred Matrix', calories: 1800, goal: 'Fat Loss', macros: 'High Fat, Low Carb', status: 'Active' },
    { id: 2, name: 'Anabolic Surge', calories: 3200, goal: 'Muscle Gain', macros: 'High Protein, Mod Carb', status: 'Active' },
  ]);

  const [usersList, setUsersList] = useState([
    { id: 1, name: 'Alex Mercer', email: 'alex@example.com', role: 'athlete', level: 12, status: 'Active' },
    { id: 2, name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'trainer', level: 45, status: 'Active' },
    { id: 3, name: 'John Doe', email: 'john@example.com', role: 'athlete', level: 3, status: 'Suspended' },
  ]);

  // Modal States
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [newProtocol, setNewProtocol] = useState({ name: '', type: 'Strength', difficulty: 'Beginner' });
  
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  const [newDiet, setNewDiet] = useState({ name: '', calories: 2000, goal: 'Maintenance', macros: '' });

  // Settings State
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    aiEngine: true,
    registrations: true
  });
  const [isRebooting, setIsRebooting] = useState(false);

  // Security Check (Temporarily disabled for testing)
  if (!user) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center tactical-grid">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20">
             <AlertTriangle size={40} />
          </div>
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">ACCESS DENIED</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Clearance level insufficient for System Core access.</p>
          <button onClick={() => navigate('/')} className="h-12 px-8 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-navy transition-colors">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleDeployWorkout = (e) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      setWorkouts([...workouts, { ...newProtocol, id: Date.now(), status: 'Active', enrolled: 0 }]);
      setIsDeployModalOpen(false);
      setIsDeploying(false);
      setNewProtocol({ name: '', type: 'Strength', difficulty: 'Beginner' });
    }, 1500);
  };

  const handleDeployDiet = (e) => {
    e.preventDefault();
    setIsDeploying(true);
    setTimeout(() => {
      setDietPlans([...dietPlans, { ...newDiet, id: Date.now(), status: 'Active' }]);
      setIsDietModalOpen(false);
      setIsDeploying(false);
      setNewDiet({ name: '', calories: 2000, goal: 'Maintenance', macros: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-navy font-sans text-white pb-20 tactical-grid relative">
      {/* Top Bar */}
      <header className="px-8 py-5 border-b border-white/5 bg-brand-navy/90 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
             <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">System <span className="text-red-500">Core</span></h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Admin Command Level 5</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
              <span className="text-[10px] font-bold text-brand-lime uppercase tracking-widest">Network Stable</span>
           </div>
           <button 
             onClick={async () => {
               await logout();
               navigate('/');
             }} 
             className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
           >
              <Power size={14} /> Exit Core
           </button>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-8 pt-10 space-y-10">
         {/* Metrics Overview */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-brand-navy-light rounded-2xl border border-white/5 p-6 space-y-4">
               <div className="flex justify-between items-start">
                 <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center text-brand-blue">
                   <Users size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-brand-lime flex items-center gap-1 bg-brand-lime/10 px-2 py-1 rounded-md"><TrendingUp size={12}/> +12%</span>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Athletes</p>
                  <p className="text-3xl font-black italic mt-1">{usersList.length * 4763}</p>
               </div>
            </div>
            
            <div className="bg-brand-navy-light rounded-2xl border border-white/5 p-6 space-y-4">
               <div className="flex justify-between items-start">
                 <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
                   <Dumbbell size={20} />
                 </div>
                 <span className="text-[10px] font-bold text-brand-lime flex items-center gap-1 bg-brand-lime/10 px-2 py-1 rounded-md"><TrendingUp size={12}/> +4%</span>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Protocols</p>
                  <p className="text-3xl font-black italic mt-1">{workouts.length + dietPlans.length}</p>
               </div>
            </div>

            <div className="bg-brand-navy-light rounded-2xl border border-white/5 p-6 space-y-4">
               <div className="flex justify-between items-start">
                 <div className="w-10 h-10 bg-brand-lime/10 rounded-lg flex items-center justify-center text-brand-lime">
                   <Activity size={20} />
                 </div>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Daily Scans</p>
                  <p className="text-3xl font-black italic mt-1">84.2K</p>
               </div>
            </div>

            <div className="bg-brand-navy-light rounded-2xl border border-white/5 p-6 space-y-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[30px]" />
               <div className="flex justify-between items-start relative z-10">
                 <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 border border-red-500/20">
                   <Server size={20} />
                 </div>
               </div>
               <div className="relative z-10">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Load</p>
                  <p className="text-3xl font-black italic mt-1 text-red-400">92%</p>
               </div>
            </div>
         </div>

         {/* Main Content Area */}
         <div className="bg-brand-navy-light border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="border-b border-white/5 px-8 flex items-center gap-8 bg-black/20">
               {['training', 'diet', 'users', 'settings'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`py-6 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all ${
                     activeTab === tab ? 'border-brand-orange text-brand-orange' : 'border-transparent text-gray-500 hover:text-white'
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <div className="p-8 min-h-[500px]">
               {/* TRAINING TAB */}
               {activeTab === 'training' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                       <div className="relative w-full max-w-md">
                          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="Search training protocols..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-brand-orange/50 outline-none transition-colors"
                          />
                       </div>
                       <button 
                         onClick={() => setIsDeployModalOpen(true)}
                         className="h-12 px-6 bg-brand-orange text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 shadow-orange-glow transition-all whitespace-nowrap"
                       >
                         <Plus size={16} /> Deploy New Protocol
                       </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/5">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="bg-black/30 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <th className="px-6 py-4">Protocol Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Difficulty</th>
                                <th className="px-6 py-4">Enrolled</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody>
                             {workouts.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase())).map((workout) => (
                               <tr key={workout.id} className="border-b border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors group">
                                  <td className="px-6 py-4">
                                     <span className="font-black italic uppercase tracking-wide text-sm">{workout.name}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="text-xs font-bold text-gray-400">{workout.type}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10">{workout.difficulty}</span>
                                  </td>
                                  <td className="px-6 py-4 font-bold text-sm">
                                     {workout.enrolled.toLocaleString()}
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-lime">
                                        <div className="w-1.5 h-1.5 bg-brand-lime rounded-full" /> {workout.status}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4 text-right space-x-2">
                                     <button className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                     </button>
                                     <button 
                                       onClick={() => setWorkouts(workouts.filter(w => w.id !== workout.id))}
                                       className="p-2 text-gray-500 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                     >
                                        <Trash2 size={16} />
                                     </button>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </motion.div>
               )}

               {/* DIET TAB */}
               {activeTab === 'diet' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                       <div className="relative w-full max-w-md">
                          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="Search diet plans..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-brand-lime/50 outline-none transition-colors"
                          />
                       </div>
                       <button 
                         onClick={() => setIsDietModalOpen(true)}
                         className="h-12 px-6 bg-brand-lime text-brand-navy rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 shadow-[0_0_20px_rgba(215,255,0,0.3)] transition-all whitespace-nowrap"
                       >
                         <Plus size={16} /> Add Diet Plan
                       </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/5">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="bg-black/30 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <th className="px-6 py-4">Diet Name</th>
                                <th className="px-6 py-4">Goal Focus</th>
                                <th className="px-6 py-4">Base Calories</th>
                                <th className="px-6 py-4">Macro Split</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody>
                             {dietPlans.map((diet) => (
                               <tr key={diet.id} className="border-b border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors group">
                                  <td className="px-6 py-4">
                                     <span className="font-black italic uppercase tracking-wide text-sm flex items-center gap-2">
                                        <Utensils size={14} className="text-brand-lime" /> {diet.name}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="text-xs font-bold text-gray-400">{diet.goal}</span>
                                  </td>
                                  <td className="px-6 py-4 font-bold text-sm text-brand-orange">
                                     {diet.calories} kcal
                                  </td>
                                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                                     {diet.macros}
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-lime">
                                        <div className="w-1.5 h-1.5 bg-brand-lime rounded-full" /> {diet.status}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4 text-right space-x-2">
                                     <button className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-lg transition-colors">
                                        <Edit2 size={16} />
                                     </button>
                                     <button 
                                       onClick={() => setDietPlans(dietPlans.filter(d => d.id !== diet.id))}
                                       className="p-2 text-gray-500 hover:text-red-500 bg-white/5 hover:bg-red-500/10 rounded-lg transition-colors"
                                     >
                                        <Trash2 size={16} />
                                     </button>
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </motion.div>
               )}

               {/* USERS TAB */}
               {activeTab === 'users' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                       <div className="relative w-full max-w-md">
                          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input 
                            type="text" 
                            placeholder="Search athletes or trainers..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:border-brand-blue/50 outline-none transition-colors"
                          />
                       </div>
                       <button className="h-12 px-6 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all whitespace-nowrap">
                         <ShieldCheck size={16} /> Manage Roles
                       </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-white/5">
                       <table className="w-full text-left border-collapse">
                          <thead>
                             <tr className="bg-black/30 border-b border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Access Control</th>
                             </tr>
                          </thead>
                          <tbody>
                             {usersList.map((usr) => (
                               <tr key={usr.id} className="border-b border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors group">
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 overflow-hidden">
                                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${usr.name}`} alt="" />
                                        </div>
                                        <span className="font-bold text-sm">{usr.name}</span>
                                     </div>
                                  </td>
                                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                                     {usr.email}
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10">Lvl {usr.level}</span>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className={`text-[10px] font-bold uppercase tracking-widest ${usr.role === 'trainer' ? 'text-brand-orange' : 'text-gray-400'}`}>
                                        {usr.role}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${usr.status === 'Active' ? 'text-brand-lime' : 'text-red-500'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${usr.status === 'Active' ? 'bg-brand-lime' : 'bg-red-500'}`} /> {usr.status}
                                     </span>
                                  </td>
                                  <td className="px-6 py-4 text-right space-x-2">
                                     {usr.status === 'Active' ? (
                                        <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20">
                                           Suspend
                                        </button>
                                     ) : (
                                        <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-lime hover:bg-brand-lime/10 rounded-lg transition-colors border border-brand-lime/20">
                                           Restore
                                        </button>
                                     )}
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  </motion.div>
               )}

               {/* SETTINGS TAB */}
               {activeTab === 'settings' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
                     <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-widest italic flex items-center gap-2"><Settings className="text-gray-400" /> Core System Configurations</h3>
                        <p className="text-gray-500 text-sm font-bold tracking-wide">Manage global variables and operational modes.</p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                           <div>
                              <p className="font-bold text-sm text-white mb-1">Global Maintenance Mode</p>
                              <p className="text-xs text-gray-500">Lock out all non-admin users.</p>
                           </div>
                           <button 
                             onClick={() => setSettings(s => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
                             className={`w-12 h-6 rounded-full relative transition-colors ${settings.maintenanceMode ? 'bg-brand-orange/20' : 'bg-white/10'}`}
                           >
                              <motion.div 
                                animate={{ x: settings.maintenanceMode ? 24 : 2 }} 
                                className={`w-5 h-5 rounded-full absolute top-0.5 ${settings.maintenanceMode ? 'bg-brand-orange' : 'bg-gray-400'}`} 
                              />
                           </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                           <div>
                              <p className="font-bold text-sm text-white mb-1">Gemini AI Engine</p>
                              <p className="text-xs text-gray-500">Enable real-time protocol generation.</p>
                           </div>
                           <button 
                             onClick={() => setSettings(s => ({ ...s, aiEngine: !s.aiEngine }))}
                             className={`w-12 h-6 rounded-full relative transition-colors ${settings.aiEngine ? 'bg-brand-lime/20' : 'bg-white/10'}`}
                           >
                              <motion.div 
                                animate={{ x: settings.aiEngine ? 24 : 2 }} 
                                className={`w-5 h-5 rounded-full absolute top-0.5 ${settings.aiEngine ? 'bg-brand-lime' : 'bg-gray-400'}`} 
                              />
                           </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
                           <div>
                              <p className="font-bold text-sm text-white mb-1">New Registrations</p>
                              <p className="text-xs text-gray-500">Allow new athletes to create accounts.</p>
                           </div>
                           <button 
                             onClick={() => setSettings(s => ({ ...s, registrations: !s.registrations }))}
                             className={`w-12 h-6 rounded-full relative transition-colors ${settings.registrations ? 'bg-brand-orange/20' : 'bg-white/10'}`}
                           >
                              <motion.div 
                                animate={{ x: settings.registrations ? 24 : 2 }} 
                                className={`w-5 h-5 rounded-full absolute top-0.5 ${settings.registrations ? 'bg-brand-orange' : 'bg-gray-400'}`} 
                              />
                           </button>
                        </div>

                        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden">
                           {isRebooting && (
                             <motion.div 
                               initial={{ scale: 0, opacity: 0.5 }}
                               animate={{ scale: 20, opacity: 0 }}
                               transition={{ duration: 1.5, repeat: Infinity }}
                               className="absolute left-1/2 top-1/2 w-10 h-10 bg-red-500/20 rounded-full"
                             />
                           )}
                           <div className="relative z-10">
                              <p className="font-bold text-sm text-red-400 mb-1">{isRebooting ? 'Rebooting...' : 'System Reboot'}</p>
                              <p className="text-xs text-red-500/50">{isRebooting ? 'Purging cache & restarting matrix.' : 'Restart all matrix servers.'}</p>
                           </div>
                           <button 
                             onClick={() => {
                               if (isRebooting) return;
                               setIsRebooting(true);
                               setTimeout(() => setIsRebooting(false), 3000);
                             }}
                             className={`w-10 h-10 bg-red-500/10 hover:bg-red-500/20 rounded-xl flex items-center justify-center text-red-500 transition-colors relative z-10 ${isRebooting ? 'opacity-50 cursor-not-allowed' : ''}`}
                           >
                              {isRebooting ? <Loader2 size={18} className="animate-spin" /> : <Power size={18} />}
                           </button>
                        </div>
                     </div>
                  </motion.div>
               )}
            </div>
         </div>
      </div>

      {/* Deploy Training Modal */}
      <AnimatePresence>
        {isDeployModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-navy/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-brand-navy-light rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
               <button 
                  onClick={() => !isDeploying && setIsDeployModalOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={18} />
                </button>

               <div className="p-10 md:p-12 space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Deploy Training Protocol</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Inject new training parameters into the global grid.</p>
                  </div>

                  <form onSubmit={handleDeployWorkout} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Protocol Designation</label>
                        <input 
                          type="text" 
                          required
                          value={newProtocol.name}
                          onChange={e => setNewProtocol({...newProtocol, name: e.target.value})}
                          placeholder="e.g. Titan Strength Protocol"
                          className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-orange/50 transition-colors"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category Focus</label>
                           <select 
                             value={newProtocol.type}
                             onChange={e => setNewProtocol({...newProtocol, type: e.target.value})}
                             className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-orange/50 transition-colors appearance-none cursor-pointer"
                           >
                              <option value="Strength">Strength / Power</option>
                              <option value="Hypertrophy">Hypertrophy</option>
                              <option value="Cardio">Cardio / HIIT</option>
                              <option value="Endurance">Endurance</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Difficulty Threshold</label>
                           <select 
                             value={newProtocol.difficulty}
                             onChange={e => setNewProtocol({...newProtocol, difficulty: e.target.value})}
                             className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-orange/50 transition-colors appearance-none cursor-pointer"
                           >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Elite">Elite Level</option>
                           </select>
                        </div>
                     </div>

                     <button 
                       type="submit"
                       disabled={isDeploying || !newProtocol.name}
                       className="w-full h-14 bg-brand-orange text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-orange-glow hover:brightness-110 active:scale-95 transition-all italic disabled:opacity-50 mt-4"
                     >
                        {isDeploying ? (
                          <><Loader2 size={18} className="animate-spin" /> SYNTHESIZING MATRIX...</>
                        ) : (
                          <><Zap size={18} /> DEPLOY TO NETWORK</>
                        )}
                     </button>
                  </form>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deploy Diet Modal */}
      <AnimatePresence>
        {isDietModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-brand-navy/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-brand-navy-light rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
               <button 
                  onClick={() => !isDeploying && setIsDietModalOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10"
                >
                  <X size={18} />
                </button>

               <div className="p-10 md:p-12 space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2">Publish Diet Plan</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Inject new nutritional protocols into the system.</p>
                  </div>

                  <form onSubmit={handleDeployDiet} className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-brand-lime uppercase tracking-widest">Diet Designation</label>
                        <input 
                          type="text" 
                          required
                          value={newDiet.name}
                          onChange={e => setNewDiet({...newDiet, name: e.target.value})}
                          placeholder="e.g. Ketogenic Shred"
                          className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-lime/50 transition-colors"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Caloric Target (Daily)</label>
                           <input 
                             type="number" 
                             required
                             value={newDiet.calories}
                             onChange={e => setNewDiet({...newDiet, calories: e.target.value})}
                             className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-lime/50 transition-colors"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Goal Focus</label>
                           <select 
                             value={newDiet.goal}
                             onChange={e => setNewDiet({...newDiet, goal: e.target.value})}
                             className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-lime/50 transition-colors appearance-none cursor-pointer"
                           >
                              <option value="Fat Loss">Fat Loss</option>
                              <option value="Maintenance">Maintenance</option>
                              <option value="Muscle Gain">Muscle Gain</option>
                              <option value="Recomposition">Recomposition</option>
                           </select>
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Macro Description</label>
                        <input 
                          type="text" 
                          required
                          value={newDiet.macros}
                          onChange={e => setNewDiet({...newDiet, macros: e.target.value})}
                          placeholder="e.g. High Protein, Moderate Fat, Low Carb"
                          className="w-full h-14 bg-black/30 border border-white/10 rounded-xl px-4 text-white font-bold outline-none focus:border-brand-lime/50 transition-colors"
                        />
                     </div>

                     <button 
                       type="submit"
                       disabled={isDeploying || !newDiet.name || !newDiet.macros}
                       className="w-full h-14 bg-brand-lime text-brand-navy rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(215,255,0,0.3)] hover:brightness-110 active:scale-95 transition-all italic disabled:opacity-50 mt-4"
                     >
                        {isDeploying ? (
                          <><Loader2 size={18} className="animate-spin" /> UPLOADING PROTOCOL...</>
                        ) : (
                          <><Plus size={18} /> PUBLISH NUTRITION PLAN</>
                        )}
                     </button>
                  </form>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
