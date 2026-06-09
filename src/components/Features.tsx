import React from 'react';
import { Award, Laptop, BookOpen, UserCheck, Layers, HelpCircle, Sparkles } from 'lucide-react';
import { FEATURES } from '../data';

// Map icon strings to Lucide components
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Award: Award,
  Laptop: Laptop,
  BookOpen: BookOpen,
  UserCheck: UserCheck,
  Layers: Layers,
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-navy-900 relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-gold-500/15 text-gold-300 text-xs sm:text-sm font-cairo mb-4">
            <Sparkles className="w-4 h-4 text-gold-400 fill-gold-400/20" />
            <span>ما يجعلنا خيارك الأفضل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-cairo mb-4 leading-tight">
            لماذا تختار <span className="gold-gradient-text">أكاديمية المنى</span> للتطوير التدريبي؟
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="font-sans text-navy-200 text-sm sm:text-base leading-relaxed">
            نحن نؤمن بأن التعليم المتميز ليس مجرد تلقين معلومات تلقائية، بل هو تمكين متكامل يصنع فارقاً مهنيّاً وشخصيّاً ملموساً في رحلة كل فرد.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.iconName] || HelpCircle;
            return (
              <div
                key={feature.id}
                className="group p-8 rounded-3xl bg-navy-800/80 border border-gold-500/10 hover:bg-navy-800 hover:border-gold-500/30 transition-all duration-300 shadow-lg hover:shadow-gold-500/5"
                id={`feature_card_${feature.id}`}
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-navy-900 border border-gold-500/10 group-hover:bg-gold-500 text-gold-400 group-hover:text-navy-950 flex items-center justify-center mb-6 transition-all duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-bold font-cairo mb-3 text-white group-hover:text-gold-300 transition-colors">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="font-sans text-navy-300 group-hover:text-navy-100 text-xs sm:text-sm leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Short Callout Box */}
        <div className="mt-16 bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-8 lg:p-12 text-white border border-gold-500/10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-right">
            <div className="max-w-2xl">
              <h4 className="font-cairo font-black text-xl sm:text-2xl text-gold-300 mb-3">
                نحن لا نقدّم مجرد تدريب…
              </h4>
              <p className="font-sans text-navy-100 text-sm sm:text-base leading-relaxed">
                “نحن نصنع تغييرًا حقيقيًا في التفكير، المهارات، والمسار المهني لكل متدرب ومتدربة، لنمهد لك دروب الريادة والتميز المطلق.”
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <a
                href="#register"
                className="w-full md:w-auto text-center font-cairo font-bold block gold-gradient-bg text-navy-950 hover:opacity-95 px-6 py-3.5 rounded-2xl transition duration-300 shadow-md hover:scale-[1.02]"
              >
                انضم إلينا الآن
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
