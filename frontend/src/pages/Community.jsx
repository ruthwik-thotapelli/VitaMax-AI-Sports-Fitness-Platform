import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Plus
} from 'lucide-react';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

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

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="space-y-3">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange border border-brand-orange/20">
               <Compass size={18} />
            </div>
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[.3em]">Global Arena Feed</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none uppercase">
           GLOBAL <span className="text-brand-orange">ARENA</span>
         </h2>
         <p className="text-gray-500 font-bold text-sm uppercase tracking-wide">Connect and compete with the global athletic community.</p>
      </div>

      {/* Create Post Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-navy-light rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden group"
      >
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
      </motion.div>

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
    </div>
  );
};

export default Community;
