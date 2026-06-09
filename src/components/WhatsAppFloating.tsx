import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';

interface WhatsAppFloatingProps {
  socialLinks: {
    phone: string;
    whatsappUrl: string;
    email: string;
    linktree: string;
    youtube: string;
    facebook: string;
  };
}

export default function WhatsAppFloating({ socialLinks }: WhatsAppFloatingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotified, setHasNotified] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasNotified(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end [direction:rtl]">
      
      {/* 1. MOCK CHAT BUBBLE DROPDOWN */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 rounded-2xl bg-white border border-navy-100 shadow-2xl overflow-hidden text-right animate-in slide-in-from-bottom-8 duration-300">
          
          {/* Header of Chatbox with Mona Raad details */}
          <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-4 text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  className="w-10 h-10 rounded-full border border-gold-400"
                  src="https://picsum.photos/seed/monaraad/100/100"
                  alt="Mona Raad"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-navy-900 rounded-full"></span>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-bold font-cairo text-gold-200">المستشارة المهنية منى رعد</h4>
                <p className="text-[10px] text-navy-300 font-sans">متواجدة لتقديم الدعم والتمكين</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-navy-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Bubble Area */}
          <div className="p-4 bg-navy-50/50 space-y-3 font-sans">
            
            <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-sm border border-navy-100 text-xs text-navy-700 leading-relaxed max-w-[85%] mr-0 ml-auto">
              🌸 أهلاً وسهلاً بك في أكاديمية المنى للتمكين والتطوير الإبداعي! كيف يمكنني مساعدتك اليوم في الالتحاق بدبلوم T.O.T أو استشارات رائدات التغيير القيادي؟
            </div>

            <div className="bg-emerald-50 text-emerald-800 p-2 text-[10px] rounded-lg text-center font-medium border border-emerald-100 italic">
              ⚡ ينقر هذا الزر لفتح محادثة واتساب آمنة ومباشرة مع الأكاديمية
            </div>

          </div>

          {/* Quick Chat Footer submit */}
          <div className="p-3 bg-white border-t border-navy-50">
            <a
              href={socialLinks.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold text-xs py-2.5 px-4 rounded-xl transition"
              id="floating_whatsapp_chat_action"
            >
              <span>ابدأ المحادثة الفورية بالواتساب</span>
              <Send className="w-3.5 h-3.5 transform -rotate-45 text-white" />
            </a>
          </div>

        </div>
      )}

      {/* 2. CHAT FLOATING PARENT TRIGGER */}
      <div className="relative">
        
        {/* Glowing ripple visual circles on backdrop when unopened */}
        {!isOpen && hasNotified && (
          <span className="absolute inset-0 rounded-full bg-emerald-500/35 animate-ping opacity-75"></span>
        )}

        {/* Small Notification badge */}
        {!isOpen && hasNotified && (
          <span className="absolute -top-1.5 -left-1.5 bg-red-500 text-white font-mono text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce z-10">
            1
          </span>
        )}

        <button
          onClick={handleToggle}
          className={`flex items-center justify-center rounded-2xl shadow-2xl transition-all duration-300 ${
            isOpen
              ? 'bg-navy-900 text-gold-300 w-14 h-14'
              : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.08] w-14 h-14 sm:w-16 sm:h-16 shadow-emerald-600/30'
          }`}
          title="تواصل مباشر بالواتساب"
          id="floating_whatsapp_trigger"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />}
        </button>

      </div>

    </div>
  );
}
