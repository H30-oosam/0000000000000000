import React from 'react';
import { ArrowLeft, Users, Trophy, Award, Sparkles, BookOpen } from 'lucide-react';
import { AcademyStats } from '../types';

interface HeroProps {
  onRegisterClick: () => void;
  stats: AcademyStats;
  socialLinks: {
    phone: string;
    whatsappUrl: string;
    email: string;
    linktree: string;
    youtube: string;
    facebook: string;
  };
}

export default function Hero({ onRegisterClick, stats, socialLinks }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden navy-gradient-bg text-white pt-10 pb-20 lg:pt-20 lg:pb-32">
      {/* Decorative background visual elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-navy-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Arabic Geometric / Islamic grid lines or stars as decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Slogan and Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs sm:text-sm font-cairo mb-6 animate-bounce">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>المنصة الرائدة في بوابات التدريب والتمكين العربي</span>
            </div>

            {/* Main Heading heading */}
            <h1 className="font-cairo font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] mb-6">
              أكاديمية المنى <br />
              <span className="gold-gradient-text">للتمكين والتدريب</span>
            </h1>

            {/* Slogan Statement */}
            <p className="font-sans font-medium text-lg sm:text-xl lg:text-2xl text-gold-200/90 leading-relaxed mb-6 max-w-2xl">
              “نحو تمكين مهني وشخصي يفتح لك آفاق النجاح والتطور الحقيقي”
            </p>

            {/* Overview / Activities Paragraph */}
            <p className="font-sans text-navy-200 text-sm sm:text-base leading-relaxed mb-10 max-w-xl">
              منصة تعليمية وتطويرية رائدة تقدم برامج تدريبية احترافية تهدف لتمكين الأفراد من مختلف الفئات، عن طريق تطوير كفاءاتهم بمجالات إعداد المدربين (T.O.T)، القيادة المُلهمة، التنمية الذاتية الشاملة، مع ورشات تطبيقية حية تكسبك خبرة حقيقية قابلة للتنفيذ المباشر.
            </p>

            {/* Dynamic CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onRegisterClick}
                className="gold-gradient-bg hover:opacity-95 text-navy-950 font-cairo font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-gold-500/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                id="hero_cta_register"
              >
                <span>سجّل في برامجنا الآن</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <a
                href="#courses"
                className="bg-navy-800 hover:bg-navy-700 text-navy-100 border border-navy-700 hover:border-gold-500/30 font-cairo font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
                id="hero_cta_courses"
              >
                <span>تصفح الدورات المتوفرة</span>
              </a>
            </div>

            {/* Extra Motivation Line */}
            <div className="mt-8 flex items-center gap-2 font-sans text-xs sm:text-sm text-gold-300/80">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>الأقسام التدريبية متاحة الآن لحجز المقاعد لشهر يونيو 2026</span>
            </div>

          </div>

          {/* Premium Right Side Illustration: Interactive Mock Trainee Dashboard */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto w-full max-w-[420px] aspect-square lg:aspect-auto lg:h-[480px] rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 border border-navy-700/60 p-6 shadow-2xl shadow-navy-950/80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Decorative Circle Grid */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-gold-400/10 rounded-full blur-2xl"></div>

              {/* Header card representation */}
              <div className="flex items-center justify-between border-b border-navy-750 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="px-3 py-1 rounded bg-navy-800 border border-navy-700 text-[10px] font-mono text-gold-400">
                  AL_MONA_PORTAL_V1
                </div>
              </div>

              {/* Inside dashboard simulated components */}
              <div className="space-y-4">
                
                {/* 1. Trainee Welcome card */}
                <div className="bg-navy-950/60 rounded-2xl p-4 border border-navy-800/80">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="flex-1 text-right">
                      <h4 className="text-xs text-navy-300 font-sans">أهلاً بك في رحلة التطور</h4>
                      <p className="text-sm font-bold text-white font-cairo">المتدرب المتميز بـأكاديمية المنى</p>
                    </div>
                  </div>
                  {/* Simulated Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-navy-400 font-sans mb-1">
                      <span>مستوى التمكن المهني</span>
                      <span className="text-gold-400">92%</span>
                    </div>
                    <div className="w-full bg-navy-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-l from-gold-500 to-gold-400 h-full rounded-full w-[92%]"></div>
                    </div>
                  </div>
                </div>

                {/* 2. Flagship TOT Badge card */}
                <div className="bg-navy-950/60 rounded-2xl p-4 border border-navy-800/80 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-gold-500/20 to-transparent rounded-br-3xl pointer-events-none"></div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-navy-800 to-navy-900 border border-navy-750 flex items-center justify-center text-gold-400 shrink-0">
                      <Award className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-gold-400/10 text-gold-400 text-[10px] font-cairo mb-1">
                        دورة مرشحة لك
                      </span>
                      <h4 className="text-sm font-bold text-white font-cairo mb-1 leading-snug">
                        دبلوم السمار الاحترافي T.O.T
                      </h4>
                      <p className="text-xs text-navy-300 font-sans">
                        أفضل برامج تمكين المدربين محلياً وعربياً.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Small Mini Stat cards side-by-side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-navy-950/40 p-3 rounded-xl border border-navy-800/70 text-right">
                    <div className="text-gold-400 mb-1">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <h5 className="text-[10px] text-navy-300 font-sans">نسبة توظيف وتدريب</h5>
                    <p className="text-[14px] font-bold text-white font-cairo">100% تطبيقي</p>
                  </div>
                  <div className="bg-navy-950/40 p-3 rounded-xl border border-navy-800/70 text-right">
                    <div className="text-gold-400 mb-1">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h5 className="text-[10px] text-navy-300 font-sans">الساعات التدريبية</h5>
                    <p className="text-[14px] font-bold text-white font-cairo">+100 ساعة تفاعلية</p>
                  </div>
                </div>

                {/* Overlapped floating customer reviews pill */}
                <div className="p-3 bg-navy-950/80 rounded-2xl border border-gold-500/20 shadow-xl flex items-center gap-2.5">
                  <div className="flex -space-x-2 space-x-reverse shrink-0">
                    <img className="w-7 h-7 rounded-full border border-navy-900" src="https://picsum.photos/seed/face1/100/100" alt="Student" referrerPolicy="no-referrer" />
                    <img className="w-7 h-7 rounded-full border border-navy-900" src="https://picsum.photos/seed/face2/100/100" alt="Student" referrerPolicy="no-referrer" />
                    <img className="w-7 h-7 rounded-full border border-navy-900" src="https://picsum.photos/seed/face3/100/100" alt="Student" referrerPolicy="no-referrer" />
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-white font-cairo leading-none mb-0.5">انضم لأكثر من 1500 متدرب</p>
                    <p className="text-[9px] text-gold-300 font-sans">حصلوا على الدعم والنجاح المهني</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Static counter block */}
        <div className="mt-20 border-t border-navy-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-gold-400 font-cairo leading-none mb-2">
                +{stats.studentsCount}
              </p>
              <p className="text-xs sm:text-sm text-navy-300 font-sans font-medium">متدرب ومتدربة تم تمكينهم</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-gold-400 font-cairo leading-none mb-2">
                +{stats.coursesCount}
              </p>
              <p className="text-xs sm:text-sm text-navy-300 font-sans font-medium">برنامجاً تدريبياً واستشاريّاً</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-gold-400 font-cairo leading-none mb-2">
                {stats.satisfactionRate}
              </p>
              <p className="text-xs sm:text-sm text-navy-300 font-sans font-medium">نسبة الرضا والتقييم الإيجابي</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-gold-400 font-cairo leading-none mb-2">
                +{stats.experienceYears} سنوات
              </p>
              <p className="text-xs sm:text-sm text-navy-300 font-sans font-medium">من الريادة والتميز المستمر</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
