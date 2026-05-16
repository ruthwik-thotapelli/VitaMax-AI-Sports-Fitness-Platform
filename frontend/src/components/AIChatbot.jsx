import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Activity, 
  Bot, 
  Sparkles,
  Zap,
  ArrowRight,
  Cpu
} from 'lucide-react';
import API from '../api';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: 'Agent Synchronized. I am Vitamax Core AI. How can I optimize your performance today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChat([...chat, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const { data } = await API.post('/chat/ask', { message });
      setChat(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { role: 'assistant', content: "Protocol interruption. Connection to Core AI timed out." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-6 w-[400px] bg-brand-navy-light rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden flex flex-col"
          >
            {/* AI Core Header */}
            <div className="bg-brand-navy p-8 text-white relative border-b border-white/5">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Cpu size={140} />
               </div>
               <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex items-center justify-center text-brand-orange shadow-orange-glow">
                        <Bot size={24} className="animate-pulse" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black italic tracking-tighter uppercase leading-none">Core Assistant</h3>
                        <div className="flex items-center gap-2 mt-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                           <p className="text-[9px] font-bold uppercase text-gray-500 tracking-widest italic">Neural Stream v2.4</p>
                        </div>
                     </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all"
                  >
                     <X size={18} />
                  </button>
               </div>
            </div>

            {/* Dynamic Chat Flux */}
            <div 
              ref={scrollRef}
              className="flex-1 h-[420px] p-8 overflow-y-auto custom-scrollbar space-y-6 bg-brand-navy/30"
            >
               {chat.map((msg, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                    <div className={`max-w-[85%] p-5 rounded-2xl text-[13px] font-bold leading-relaxed uppercase tracking-wide ${
                      msg.role === 'user' 
                      ? 'bg-brand-orange text-white shadow-orange-glow rounded-tr-none italic' 
                      : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                    }`}>
                       {msg.content}
                    </div>
                 </motion.div>
               ))}
               {loading && (
                 <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 shadow-sm flex gap-2 items-center">
                       <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce" />
                       <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce [animation-delay:0.2s]" />
                       <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                 </div>
               )}
            </div>

            {/* Neural Input System */}
            <form onSubmit={handleSend} className="p-8 bg-brand-navy border-t border-white/5 flex gap-4">
               <input 
                 type="text" 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 placeholder="INPUT PROTOCOL REQUEST..."
                 className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 h-14 text-xs font-bold text-white outline-none focus:bg-white/10 focus:border-brand-orange/30 transition-all uppercase placeholder:text-gray-600"
               />
               <button 
                 type="submit"
                 className="w-14 h-14 bg-brand-orange text-white rounded-xl flex items-center justify-center transition-all shadow-orange-glow hover:brightness-110 active:scale-95 group relative overflow-hidden"
               >
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-4">
        {/* Subtle AI Pulse Status */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-brand-navy-light/80 backdrop-blur-md px-4 py-2 rounded-lg border border-brand-orange/20 flex items-center gap-2 shadow-2xl mb-2"
            >
              <div className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-[9px] font-bold text-brand-orange uppercase tracking-widest italic">AI Core Linked</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 px-6 rounded-xl flex items-center gap-3 text-white shadow-2xl transition-all hover:scale-105 active:scale-95 group relative overflow-hidden border ${
            isOpen 
            ? 'bg-brand-navy border-white/10' 
            : 'bg-brand-navy-light border-brand-orange/30 shadow-orange-glow'
          }`}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
          
          <div className="relative">
            {isOpen ? <X size={20} /> : <MessageSquare size={20} className={!isOpen ? "text-brand-orange" : ""} />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-lime rounded-full border-2 border-brand-navy-light animate-ping" />
            )}
          </div>

          <span className="text-[10px] font-black uppercase tracking-widest italic">
            {isOpen ? "Close Portal" : "Neural Link"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
