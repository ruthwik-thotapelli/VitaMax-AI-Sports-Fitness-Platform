import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Send, 
  Image as ImageIcon, 
  MoreHorizontal, 
  User, 
  Users,
  Compass,
  Zap,
  Activity,
  Plus,
  Play,
  Video
} from 'lucide-react';

const Community = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(location.state?.category || 'Global Arena');
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const tabs = ['Global Arena', 'Live Sessions'];

  useEffect(() => {
    if (location.state?.category) {
      setActiveTab(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    if (activeTab === 'Global Arena') {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    try {
      const { data } = await API.get('/community');
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const { data } = await API.post('/community/posts', { content });
      setPosts([data, ...posts]);
      setContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const { data } = await API.post(`/community/posts/${postId}/like`);
      setPosts(posts.map(p => p.id === postId ? { ...p, likes_count: data.likes_count, liked: !p.liked } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnectStream = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-10">
      <div className="space-y-3">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange border border-brand-orange/20">
               <Compass size={18} />
            </div>
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[.3em]">Network Module</span>
         </div>
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
           <div>
             <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
               COMMUNITY <span className="text-brand-orange">ARENA</span>
             </h2>
             <p className="text-gray-500 font-bold text-sm uppercase tracking-wide mt-1">Connect and compete with the global athletic network.</p>
           </div>
           
           <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 shrink-0 overflow-x-auto max-w-full">
             {tabs.map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                   activeTab === tab 
                   ? 'bg-brand-orange text-white shadow-lg' 
                   : 'text-gray-400 hover:text-white hover:bg-white/5'
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>
         </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'Global Arena' && (
          <motion.div
            key="arena"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Create Post Card */}
            <div className="bg-brand-navy-light rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
              <form onSubmit={handlePost} className="space-y-6 relative z-10">
                <div className="flex gap-5">
                   <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 shrink-0 flex items-center justify-center text-brand-lime" >
                      <Activity size={24} />
                   </div>
                   <textarea
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     placeholder="Transmit performance metrics..."
                     className="w-full bg-white/5 border border-white/10 focus:border-brand-orange/50 focus:bg-white/10 rounded-2xl p-5 text-sm font-bold text-white outline-none resize-none transition-all h-28 placeholder:text-gray-700"
                   />
                </div>
                <div className="flex justify-between items-center">
                   <div className="flex gap-6">
                      <button type="button" className="text-gray-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                         <ImageIcon size={16} />
                         Media Link
                      </button>
                   </div>
                   <button
                     type="submit"
                     disabled={loading || !content.trim()}
                     className="h-12 px-8 bg-brand-orange text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 flex items-center gap-3 shadow-orange-glow italic disabled:opacity-50"
                   >
                     {loading ? 'Transmitting...' : 'SYCHRONIZE'}
                     <Send size={16} />
                   </button>
                </div>
              </form>
            </div>

            {/* Social Feed List */}
            <div className="space-y-8">
               <AnimatePresence initial={false} mode="popLayout">
                  {posts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="bg-brand-navy-light rounded-[2.5rem] p-8 md:p-10 border border-white/5 shadow-2xl group hover:border-white/10 transition-all"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-brand-orange">
                             <User size={22} />
                          </div>
                          <div>
                            <p className="text-lg font-black text-white italic tracking-tight uppercase leading-tight">{post.user.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                               <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">
                                 {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                               </p>
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-600 hover:text-white transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </div>

                      <div className="text-gray-300 text-[16px] leading-relaxed mb-8 p-6 bg-black/20 rounded-2xl border border-white/5 italic font-medium">
                        "{post.content}"
                      </div>

                      <div className="flex items-center gap-6">
                         <button 
                           onClick={() => handleLike(post.id)}
                           className={`flex items-center gap-3 transition-all ${post.liked ? 'text-brand-orange' : 'text-gray-500 hover:text-white'}`}
                         >
                           <div className={`p-3 rounded-xl ${post.liked ? 'bg-brand-orange text-white shadow-orange-glow' : 'bg-white/5 border border-white/5' } transition-all`}>
                              <Heart size={18} className={post.liked ? 'fill-current' : ''} />
                           </div>
                           <span className="text-[11px] font-black uppercase tracking-widest">{post.likes_count || 0}</span>
                         </button>
                         
                         <button className="flex items-center gap-3 text-gray-500 hover:text-brand-blue transition-all">
                           <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                              <MessageSquare size={18} />
                           </div>
                           <span className="text-[11px] font-black uppercase tracking-widest">{post.comments?.length || 0}</span>
                         </button>

                         <button className="flex items-center gap-3 text-gray-500 hover:text-brand-orange transition-all ml-auto">
                           <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                              <Share2 size={18} />
                           </div>
                         </button>
                      </div>
                    </motion.div>
                  ))}
               </AnimatePresence>

               {posts.length === 0 && (
                  <div className="bg-brand-navy-light rounded-[2.5rem] border-2 border-dashed border-white/5 py-32 text-center space-y-6 shadow-2xl">
                     <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700 border border-white/5">
                        <Users size={32} />
                     </div>
                     <p className="font-bold tracking-widest uppercase text-[10px] text-gray-600 max-w-xs mx-auto leading-relaxed italic">No activity detected in local arena sector.</p>
                  </div>
               )}
            </div>
          </motion.div>
        )}

        {activeTab === 'Live Sessions' && (
          <motion.div
            key="livesessions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-brand-navy-light rounded-[2.5rem] border border-white/5 p-10 md:p-20 shadow-2xl relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
             
             {connected ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 space-y-8">
                  <div className="aspect-video bg-black rounded-3xl border border-brand-lime/30 shadow-[0_0_50px_rgba(215,255,0,0.1)] overflow-hidden relative group">
                     {/* Simulated Video Stream */}
                     <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80" alt="Live Stream" className="w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                     
                     <div className="absolute top-6 left-6 flex items-center gap-3">
                        <div className="px-3 py-1 bg-red-500 rounded-md text-white text-[10px] font-black uppercase tracking-widest animate-pulse flex items-center gap-2">
                          <div className="w-2 h-2 bg-white rounded-full" /> LIVE
                        </div>
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-md text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                          1.2K VIEWING
                        </div>
                     </div>

                     <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <div>
                           <h4 className="text-3xl font-black italic text-white uppercase leading-none mb-2">Neural <span className="text-brand-lime">Conditioning</span></h4>
                           <p className="text-gray-300 font-bold uppercase tracking-widest text-xs">Coach Sarah Jenkins // Elite Tier</p>
                        </div>
                        <button onClick={() => setConnected(false)} className="h-10 px-6 bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all border border-white/10 hover:border-red-500/30 flex items-center gap-2">
                           Disconnect
                        </button>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Heart Rate</p>
                        <p className="text-3xl font-black italic text-brand-lime">145 <span className="text-sm text-gray-500">BPM</span></p>
                     </div>
                     <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Output</p>
                        <p className="text-3xl font-black italic text-brand-orange">280 <span className="text-sm text-gray-500">WATTS</span></p>
                     </div>
                     <div className="bg-black/40 p-6 rounded-2xl border border-white/5 space-y-2">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Strain</p>
                        <p className="text-3xl font-black italic text-brand-blue">14.2 <span className="text-sm text-gray-500">/ 21</span></p>
                     </div>
                  </div>
                </motion.div>
             ) : (
                <div className="text-center relative z-10 py-10">
                  <div className="w-24 h-24 bg-brand-lime/10 rounded-full flex items-center justify-center mx-auto text-brand-lime border border-brand-lime/20 mb-8 relative z-10">
                      {connecting ? <Activity size={40} className="animate-ping" /> : <Video size={40} />}
                  </div>
                  <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none mb-4">Neural Feedback <span className="text-brand-lime">Coaching</span></h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-lg mx-auto leading-relaxed mb-10">
                    Connect to the global bio-metric streaming network. Train alongside elite coaches with real-time HUD telemetry.
                  </p>
                  <button 
                    onClick={handleConnectStream}
                    disabled={connecting}
                    className="h-14 px-10 bg-brand-lime text-brand-navy rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-[0_0_30px_rgba(215,255,0,0.3)] inline-flex items-center justify-center gap-3 italic disabled:opacity-50"
                  >
                      {connecting ? (
                        'ESTABLISHING CONNECTION...'
                      ) : (
                        <> <Play size={18} fill="currentColor" /> CONNECT TO STREAM </>
                      )}
                  </button>
                </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Community;
