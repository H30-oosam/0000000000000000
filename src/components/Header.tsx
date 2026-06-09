import React, { useState } from 'react';
import { Menu, X, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onRegisterClick: () => void;
  onAdminToggle: () => void;
  isAdminMode: boolean;
  socialLinks: {
    phone: string;
    whatsappUrl: string;
    email: string;
    linktree: string;
    youtube: string;
    facebook: string;
  };
}

export default function Header({ onRegisterClick, onAdminToggle, isAdminMode, socialLinks }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'مميزاتنا', href: '#features' },
    { label: 'برامجنا التدريبية', href: '#courses' },
    { label: 'رسالة الأكاديمية', href: '#message' },
    { label: 'التسجيل والاستفسار', href: '#register' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-900/95 text-white backdrop-blur-md border-b border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Academy Title */}
          <Logo className="w-11 h-11" showText={true} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="font-sans font-medium text-sm lg:text-base text-navy-100 hover:text-gold-300 transition-colors duration-200 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 Transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin toggle */}
            <button
              onClick={onAdminToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cairo transition-all duration-300 border ${
                isAdminMode
                  ? 'bg-gold-500 text-navy-950 border-gold-400 font-bold shadow-md shadow-gold-500/10'
                  : 'bg-navy-800 text-navy-200 border-navy-700 hover:bg-navy-750 hover:text-gold-200 hover:border-gold-500/30'
              }`}
              id="header_admin_btn"
              title="لوحة تحكم الإدارة لمتابعة المتدربين"
            >
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>{isAdminMode ? 'خروج من الإدارة' : 'تسجيل دخول الإدارة 🔐'}</span>
            </button>

            {/* Direct WhatsApp */}
            <a
              href={socialLinks.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-sans font-bold shadow-lg shadow-emerald-950/25 transition-all duration-300 hover:scale-[1.03]"
              id="header_whatsapp_direct"
            >
              <Phone className="w-4 h-4" />
              <span>واتساب مباشر</span>
            </a>

            {/* Register Action */}
            <button
              onClick={onRegisterClick}
              className="gold-gradient-bg hover:opacity-95 text-navy-950 font-cairo font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-gold-500/10 transition-all duration-300 hover:scale-[1.03]"
              id="header_register_btn"
            >
              ابدأ رحلتك الآن
            </button>
          </div>

          {/* Burger Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onAdminToggle}
              className={`p-2 rounded-xl border ${
                isAdminMode ? 'bg-gold-500 text-navy-950 border-gold-400' : 'bg-navy-800 text-navy-200 border-navy-700'
              }`}
              title="لوحة الإدارة"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-navy-200 hover:text-white bg-navy-800 border border-navy-700 hover:bg-navy-700 transition"
              id="header_mobile_menu_btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-gold-500/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-sans font-medium text-navy-100 hover:bg-navy-800 hover:text-gold-300 transition"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-navy-800 space-y-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onRegisterClick();
                }}
                className="w-full text-center gold-gradient-bg text-navy-950 font-cairo font-bold py-3 rounded-xl block shadow-lg shadow-gold-500/10"
              >
                ابدأ رحلتك الآن
              </button>
              
              <a
                href={socialLinks.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-base font-sans font-bold shadow-lg shadow-emerald-950/20"
              >
                <Phone className="w-5 h-5" />
                <span>واتساب مباشر</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
