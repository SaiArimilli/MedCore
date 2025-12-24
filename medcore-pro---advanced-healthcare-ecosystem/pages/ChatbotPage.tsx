
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Info, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHealthcareResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'ai',
      senderName: 'Gemini AI',
      text: "Hello! I'm your MedCore AI assistant. How can I help you today? You can ask about symptoms, health tips, or how to use the platform.",
      timestamp: Date.now(),
      isAi: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user',
      senderName: 'You',
      text: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getHealthcareResponse(input.trim());
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      senderId: 'ai',
      senderName: 'Gemini AI',
      text: aiResponse || "I apologize, but I'm unable to process that right now.",
      timestamp: Date.now(),
      isAi: true
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              HealthBot <span className="bg-blue-100 text-blue-600 text-[10px] uppercase px-2 py-0.5 rounded-full font-black tracking-widest">v2.5</span>
            </h1>
            <p className="text-sm text-slate-400 flex items-center gap-1.5">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               AI Health Specialist Online
            </p>
          </div>
        </div>
        <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400">
           <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-grow bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-blue-50/50 flex flex-col overflow-hidden relative">
        {/* Warning Banner */}
        <div className="bg-amber-50 px-6 py-2.5 flex items-center gap-2 border-b border-amber-100">
           <Info size={14} className="text-amber-600" />
           <p className="text-[11px] text-amber-700 font-medium">This AI is for informational purposes only. In emergencies, please contact your local emergency services.</p>
        </div>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar scroll-smooth"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-4 ${msg.isAi ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                msg.isAi ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {msg.isAi ? <Bot size={22} /> : <User size={22} />}
              </div>
              <div className={`max-w-[80%] p-6 rounded-[30px] shadow-sm text-sm leading-relaxed ${
                msg.isAi 
                  ? 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100' 
                  : 'bg-blue-600 text-white rounded-tr-none shadow-blue-100'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-[10px] mt-4 font-bold uppercase tracking-wider ${msg.isAi ? 'text-slate-300' : 'text-blue-300'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 animate-pulse">
               <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                 <Bot size={22} />
               </div>
               <div className="bg-slate-50 p-6 rounded-[30px] rounded-tl-none border border-slate-100">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 md:p-8 bg-slate-50/50 border-t border-slate-100">
           <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
             <input 
               type="text" 
               placeholder="Type your health concern here..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               disabled={isLoading}
               className="w-full bg-white border border-slate-200 rounded-[30px] py-6 pl-8 pr-20 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all text-lg shadow-sm"
             />
             <button 
               type="submit"
               disabled={!input.trim() || isLoading}
               className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50 disabled:bg-slate-300 shadow-xl shadow-blue-200 active:scale-95"
             >
               {isLoading ? <Loader2 className="animate-spin" /> : <Send size={24} />}
             </button>
           </form>
           <div className="text-center mt-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Secured by Google Gemini Engine</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
