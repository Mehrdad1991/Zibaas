
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'سلام! خوش آمدید. من دستیار هوشمند زیباست هستم. چطور می‌توانم کمکتان کنم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await chatWithAI(newMessages);
    setMessages([...newMessages, { role: 'model', text: response || 'متاسفم، پاسخی دریافت نشد.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-6 z-[70]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] shadow-2xl rounded-[32px] flex flex-col border border-pink-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-pink-600 p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-pink-600 font-black text-xl">Z</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm">دستیار هوشمند Zibaas</span>
                <span className="text-[10px] opacity-80 font-bold">آنلاین و آماده پاسخگویی</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-[24px] text-xs md:text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-pink-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm rounded-tl-none flex gap-1.5 border border-gray-100">
                  <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="سوال خود را بپرسید..."
              className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-pink-500 text-right"
            />
            <button 
              onClick={handleSend}
              className="bg-pink-600 text-white p-3 rounded-2xl hover:bg-pink-700 transition-all shadow-lg shadow-pink-100 active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-[24px] shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group ring-4 ring-pink-50"
        >
          <div className="flex flex-col items-end hidden group-hover:flex transition-all">
            <span className="text-[10px] font-black leading-none opacity-80 uppercase">AI Support</span>
            <span className="text-xs font-black">چت هوشمند</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatbot;
