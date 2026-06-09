import React, { useState } from 'react';
import { Calendar, Users, ArrowLeft, Eye, CheckCircle2, X } from 'lucide-react';
import { Course } from '../types';

interface CoursesProps {
  onSelectCourse: (courseId: string) => void;
  courses: Course[];
}

export default function Courses({ onSelectCourse, courses }: CoursesProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'tot', label: 'برامج T.O.T' },
    { id: 'leadership', label: 'القيادة والتمكين' },
    { id: 'content', label: 'صناعة المحتوى' },
    { id: 'development', label: 'التنمية الذاتية' },
    { id: 'consulting', label: 'الاستشارات' },
  ];

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => course.category === activeTab);

  const handleBookClick = (courseId: string) => {
    onSelectCourse(courseId);
    // Smooth scroll to register form
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="courses" className="py-20 bg-navy-950 relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold-400 font-cairo font-bold text-xs sm:text-sm uppercase tracking-wider block mb-3 animate-pulse">
            تحكَّم بمسارك المهني
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-cairo mb-4 leading-tight">
            برامجنا التدريبية والاستشارية المعتمدة
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full mb-6"></div>
          <p className="font-sans text-navy-200 text-sm sm:text-base leading-relaxed">
            اختر دورتك أو استشارتك المطلوبة لحفظ مقعدك الآن والمضي قدماً في الاستثمار الأمثل بذاتك ومهاراتك.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-cairo font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-navy-950 shadow-md shadow-gold-500/20 border border-gold-400'
                  : 'bg-navy-800 text-navy-200 border border-navy-700 hover:border-gold-500/30 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Listing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-navy-800 border border-gold-500/10 hover:border-gold-500/30 shadow-lg hover:shadow-gold-500/5 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative group rounded-3xl"
              id={`course_card_${course.id}`}
            >
              {/* Highlight Ribbon for Featured items */}
              {course.featured && (
                <div className="absolute top-4 right-4 bg-gold-500 text-navy-950 text-[10px] font-cairo font-extrabold px-2.5 py-1 rounded-lg z-10 shadow-md animate-pulse">
                  الأكثر طلباً 🔥
                </div>
              )}

              {/* Course Category Tag & visual placeholder banner */}
              <div className="h-44 bg-navy-900 relative flex items-end p-6 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url('https://picsum.photos/seed/${course.id}/600/400')` }} referrerPolicy="no-referrer"></div>
                {/* Visual Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-900/80 to-transparent"></div>
                
                <div className="relative z-10 text-right w-full">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-gold-500/20 text-gold-300 text-xs font-cairo font-bold border border-gold-300/30 mb-2">
                    {course.categoryLabel}
                  </span>
                  <h3 className="text-lg lg:text-xl font-black text-white font-cairo line-clamp-1">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Course Body Contents */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="mb-6">
                  {/* Duration and Seats left row */}
                  <div className="flex items-center justify-between font-sans text-xs text-navy-300 mb-4 border-b border-navy-700 pb-3">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-4 h-4 text-gold-400" />
                      <span>{course.duration}</span>
                    </span>
                    {course.seatsLeft && (
                      <span className="flex items-center gap-1 bg-red-500/15 text-red-400 px-2.5 py-1 rounded-full font-bold border border-red-500/20">
                        <Users className="w-3.5 h-3.5" />
                        <span>متبقي {course.seatsLeft} مقاعد فقط!</span>
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-navy-200 text-sm leading-relaxed mb-4">
                    {course.shortDesc}
                  </p>

                  {/* Highlights Bullet List (show first 2 only in grid preview) */}
                  <div className="space-y-2 mt-4">
                    {course.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-sans text-navy-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Pricing & CTA row */}
                <div className="pt-4 border-t border-navy-700 flex items-center justify-between mt-auto">
                  {/* Prices */}
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] sm:text-xs text-navy-400 font-sans line-through">{course.originalPrice}</span>
                    <span className="text-xl font-extrabold text-gold-300 font-cairo">{course.price ? course.price : 'مجاناً'}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-3 py-2 bg-navy-900 hover:bg-navy-700 text-navy-200 rounded-xl transition duration-200 border border-navy-700"
                      title="تفاصيل إضافية عن البرنامج"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleBookClick(course.id)}
                      className="gold-gradient-bg hover:opacity-95 text-navy-950 px-4 py-2.5 rounded-xl font-cairo font-bold text-xs sm:text-sm transition duration-300 shadow-md shadow-gold-500/5 flex items-center gap-1.5 hover:scale-[1.02]"
                    >
                      <span>احجز مقعدك</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Course details Modal Dialog */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-navy-900 rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-gold-500/25 text-right animate-in zoom-in-95 duration-300">
              
              {/* Modal Banner */}
              <div className="relative h-48 bg-navy-850 p-6 flex flex-col justify-end">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://picsum.photos/seed/${selectedCourse.id}/600/400')` }} referrerPolicy="no-referrer"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
                
                <div className="relative z-10">
                  <span className="inline-block px-2.5 py-1 rounded bg-gold-500 text-navy-950 text-xs font-cairo font-bold mb-2">
                    {selectedCourse.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-cairo">
                    {selectedCourse.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body Contents */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[60vh]">
                <div>
                  <h4 className="font-cairo font-bold text-gold-300 text-base mb-2">وصف ونبذة عن البرنامج:</h4>
                  <p className="font-sans text-navy-200 text-sm leading-relaxed">
                    {selectedCourse.longDesc}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 bg-navy-800 p-4 rounded-2xl border border-gold-500/10">
                  <div>
                    <span className="text-[11px] text-navy-400 font-sans block">المدة المقررة وحجم التدريب</span>
                    <span className="text-sm font-bold text-white font-sans">{selectedCourse.duration}</span>
                  </div>
                  {selectedCourse.seatsLeft && (
                    <div>
                      <span className="text-[11px] text-navy-400 font-sans block">المقاعد المتبقية للتسجيل</span>
                      <span className="text-sm font-bold text-red-400 font-sans">فقط متبقي {selectedCourse.seatsLeft} من أصل {selectedCourse.totalSeats}!</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-cairo font-bold text-gold-300 text-base mb-3">مميزات وامتيازات إضافية ستحصل عليها:</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedCourse.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-navy-800 p-3 rounded-xl border border-gold-500/5 text-xs sm:text-sm font-sans text-navy-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 border-t border-navy-800 bg-navy-950 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-navy-400 font-sans line-through">{selectedCourse.originalPrice}</span>
                  <span className="text-2xl font-black text-gold-300 font-cairo">{selectedCourse.price}</span>
                  <span className="text-[10px] text-navy-400 font-sans">تطبيقي شامل</span>
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="flex-1 sm:flex-initial px-6 py-3 border border-navy-700 text-navy-300 hover:text-white rounded-xl text-sm font-cairo transition hover:bg-navy-800"
                  >
                    إغلاق التفاصيل
                  </button>
                  <button
                    onClick={() => {
                      const id = selectedCourse.id;
                      setSelectedCourse(null);
                      handleBookClick(id);
                    }}
                    className="flex-1 sm:flex-initial gold-gradient-bg hover:opacity-95 text-navy-950 font-cairo font-bold px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-gold-500/10 flex items-center justify-center gap-1.5"
                  >
                    <span>احجز مقعدك الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
