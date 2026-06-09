import React from 'react';
import { Mail, Phone, ExternalLink, Youtube, Facebook, Heart, Sparkles, YoutubeIcon } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  socialLinks: {
    phone: string;
    whatsappUrl: string;
    email: string;
    linktree: string;
    youtube: string;
    facebook: string;
  };
}

export default function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        {/* Main Columns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-navy-800">
          
          {/* Column 1: About the Academy & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Logo className="w-10 h-10" showText={true} />
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-navy-350 leading-relaxed font-normal">
              منصة تعليمية وتطويرية متميزة تسعى جاهدة لتهيئة وتثقيف الشباب والمدربين وبناة المستقبل، للارتقاء بمهارات التمكين والتوجيه، صناعة القادة وتطوير المسار الوظيفي الملموس.
            </p>

            <div className="p-4 bg-navy-900 rounded-2xl border border-navy-850/60 leading-normal">
              <p className="font-sans text-[11px] sm:text-xs text-gold-300">
                “نحن لا نقدّم مجرد تدريب… نحن نصنع تغييرًا حقيقيًا في التفكير، المهارات، والمسار المهني لكل متدرب.”
              </p>
            </div>
          </div>

          {/* Column 2: YouTube Featured Invite */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-cairo font-bold text-sm text-gold-200 uppercase tracking-wider">
              🎥 قناتنا الرسمية على اليوتيوب
            </h4>
            <div className="bg-gradient-to-tr from-red-650/10 to-navy-900 p-5 rounded-2xl border border-red-500/15 space-y-3">
              <p className="font-sans text-xs text-navy-100 leading-normal">
                سيتم رفع التسجيل الكامل لفعالياتنا وورش العمل المتميزة على اليوتيوب قريباً بإذن الله تعالى.
              </p>
              
              <div className="bg-navy-950 p-3 rounded-xl border border-navy-800/80 flex items-center justify-between">
                <div>
                  <h5 className="font-cairo font-bold text-xs text-white">قناة المنى للتمكين والتغيير</h5>
                  <p className="text-[10px] text-navy-400 font-sans mt-0.5">تابعوا القناة واشتركوا ليصلكم كل جديد</p>
                </div>
                <Youtube className="w-8 h-8 text-red-500 shrink-0" />
              </div>

              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-sans font-bold text-xs py-2.5 px-4 rounded-xl transition"
                id="footer_youtube_cta_link"
              >
                <span>اشترك في القناة وشاهد الفعاليات</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 3: Contact & Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-cairo font-bold text-sm text-gold-200 uppercase tracking-wider">
              📩 بيانات التواصل والمبادرة
            </h4>
            
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-navy-200">
              {/* WhatsApp phone */}
              <li>
                <a
                  href={socialLinks.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold-300 transition"
                  id="footer_whatsapp_link"
                >
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>💬 للتواصل والواتساب: {socialLinks.phone}</span>
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-2 hover:text-gold-300 transition"
                  id="footer_email_link"
                >
                  <Mail className="w-4 h-4 text-gold-500" />
                  <span>📧 البريد الإلكتروني: {socialLinks.email}</span>
                </a>
              </li>

              {/* Linktree of Mona Raad */}
              <li className="pt-2">
                <a
                  href={socialLinks.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium transition"
                  id="footer_linktree_link"
                >
                  <Sparkles className="w-4 h-4 text-gold-500" />
                  <span>رابط حسابات مبادرة رائدات التغيير (المستشارة منى رعد)</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </li>
            </ul>

            {/* Social media circle buttons */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-850 hover:bg-blue-600 text-navy-200 hover:text-white rounded-xl flex items-center justify-center transition border border-navy-800"
                id="footer_social_fb_btn"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-850 hover:bg-red-600 text-navy-200 hover:text-white rounded-xl flex items-center justify-center transition border border-navy-800"
                id="footer_social_yt_btn"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Closing copyright, non-tech disclaimer and simple signature */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-navy-400">
          <p>© {currentYear} أكاديمية المنى للتمكين والتدريب. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>صُنع بحب وتمكين للوطن العربي</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
