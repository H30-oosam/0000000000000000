import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, User, BookOpen, Send, CheckCircle, Sparkles, MessageCircle, AlertCircle } from 'lucide-react';
import { Course, TraineeRegistration } from '../types';

interface SubmitFormProps {
  selectedCourseId: string;
  onSelectCourse: (id: string) => void;
  onNewRegistration: (reg: TraineeRegistration) => void;
  courses: Course[];
  socialLinks: {
    phone: string;
    whatsappUrl: string;
    email: string;
    linktree: string;
    youtube: string;
    facebook: string;
  };
}

const COUNTRIES = [
  'لبنان', 'المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'الأردن', 'فلسطين',
  'سلطنة عمان', 'الكويت', 'قطر', 'البحرين', 'مصر', 'العراق', 'اليمن', 'سوريا',
  'المغرب', 'الجزائر', 'تونس', 'ليبيا', 'السودان', 'بلد آخر'
];

export default function SubmitForm({ selectedCourseId, onSelectCourse, onNewRegistration, courses, socialLinks }: SubmitFormProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('لبنان');
  const [courseId, setCourseId] = useState(selectedCourseId || 'tot-pro');
  
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSubmittedReg, setLastSubmittedReg] = useState<TraineeRegistration | null>(null);

  // Keep state in sync with prop from selected course card
  useEffect(() => {
    if (selectedCourseId) {
      setCourseId(selectedCourseId);
    }
  }, [selectedCourseId]);

  const validateForm = () => {
    if (fullName.trim().length < 5) {
      return 'يرجى إدخال اسمك الكامل الثلاثي على الأقل.';
    }
    if (phone.trim().length < 7) {
      return 'يرجى إدخال رقم هاتف واتساب صحيح ومع كود الدولة.';
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return 'يرجى إدخال بريد الكتروني صحيح للتواصل.';
    }
    if (!country) {
      return 'يرجى تحديد بلد الإقامة الحالي.';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsSubmitting(true);

    // Get Course details
    const targetCourse = courses.find(c => c.id === courseId);
    const courseTitle = targetCourse ? targetCourse.title : 'استشارة عامة';

    // Simulate database write with 800ms
    setTimeout(() => {
      const newReg: TraineeRegistration = {
        id: 'reg_' + Date.now(),
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        country: country,
        courseId: courseId,
        courseTitle: courseTitle,
        timestamp: new Date().toLocaleString('ar-EG', { hour12: true }),
        status: 'pending'
      };

      // Store in App state so Admin Dashboard receives it
      onNewRegistration(newReg);
      setLastSubmittedReg(newReg);

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear form inputs
      setFullName('');
      setPhone('');
      setEmail('');
    }, 850);
  };

  // Generate beautiful prefilled WhatsApp text for the trainee
  const getWhatsAppMessageUrl = () => {
    if (!lastSubmittedReg) return socialLinks.whatsappUrl;
    
    const textMessage = `مرحباً أكاديمية المنى للتمكين والتدريب،
لقد قمت بالتسجيل في البرامج التدريبية عبر الموقع، وإليك بياناتي:
• الاسم الكامل: ${lastSubmittedReg.fullName}
• رقم الهاتف: ${lastSubmittedReg.phone}
• البريد الإلكتروني: ${lastSubmittedReg.email}
• البلد: ${lastSubmittedReg.country}
• البرنامج المطلوب: ${lastSubmittedReg.courseTitle}

أود تأكيد الحجز وحجز مقعدي رسمياً. شكراً لكم.`;

    const cleanPhone = socialLinks.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMessage)}`;
  };

  // Generate beautiful prefilled Email mailto link
  const getEmailMailtoUrl = () => {
    if (!lastSubmittedReg) return `mailto:${socialLinks.email}`;
    const subject = `طلب حجز مقعد تدريبي - ${lastSubmittedReg.fullName}`;
    const body = `مرحباً أكاديمية المنى للتمكين والتدريب،

لقد سجلت بياناتي عبر صفحة الهبوط لتأكيد مقعدي في:
${lastSubmittedReg.courseTitle}

البيانات المسجلة:
- الاسم: ${lastSubmittedReg.fullName}
- الهاتف: ${lastSubmittedReg.phone}
- البلد: ${lastSubmittedReg.country}

أتمنى التواصل لتأكيد الحجز.`;

    return `mailto:${socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="register" className="py-20 bg-navy-900 relative">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-950/45 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Registration Title Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-800 border border-gold-500/20 text-gold-300 text-xs sm:text-sm font-cairo mb-4 font-bold">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>بوابة التمكين وبناء المستقبل</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-cairo mb-3">
            سجّل بياناتك واحجز مقعدك الآن
          </h2>
          <p className="font-sans text-navy-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            لا تنتظر الفرصة، اصنعها بنفسك. املأ بيانات الاستمارة البسيطة التالية وسنتواصل معك فوراً لتأكيد انضمامك.
          </p>
        </div>

        {/* Form Container Grid */}
        <div className="bg-gradient-to-br from-navy-800 to-navy-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-navy-950/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-gold-500/10 to-transparent rounded-br-3xl pointer-events-none"></div>
          
          {!isSuccess ? (
            /* ACTIVE FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              
              {/* Error Message bar */}
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/35 text-red-300 px-4 py-3 rounded-2xl text-sm font-sans flex items-center gap-2 animate-pulse">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* 1. Full name field */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-cairo font-bold text-gold-200">
                    الاسم الكامل (الثلاثي) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute right-4 top-3.5 w-5 h-5 text-navy-400" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="مثال: منى رعد يحيى"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-navy-900/80 border border-navy-700 focus:border-gold-400 text-white font-sans text-sm rounded-2xl pr-12 pl-4 py-3.5 outline-none transition-all placeholder:text-navy-500 font-medium"
                    />
                  </div>
                </div>

                {/* 2. Phone field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-cairo font-bold text-gold-200">
                    رقم الهاتف (واتساب مع كود الدولة) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-3.5 w-5 h-5 text-navy-400" />
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="مثال: 9613541580+"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-navy-900/80 border border-navy-700 focus:border-gold-400 text-white font-sans text-sm rounded-2xl pr-12 pl-4 py-3.5 outline-none transition-all placeholder:text-navy-500 font-medium [direction:ltr] [text-align:right]"
                    />
                  </div>
                </div>

              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                
                {/* 3. Email Address field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-cairo font-bold text-gold-200">
                    البريد الإلكتروني <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-3.5 w-5 h-5 text-navy-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="مثال: user@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-navy-900/80 border border-navy-700 focus:border-gold-400 text-white font-sans text-sm rounded-2xl pr-12 pl-4 py-3.5 outline-none transition-all placeholder:text-navy-500 font-medium [direction:ltr] [text-align:right]"
                    />
                  </div>
                </div>

                {/* 4. Country field selector */}
                <div className="space-y-2">
                  <label htmlFor="country" className="block text-sm font-cairo font-bold text-gold-200">
                    بلد الإقامة الحالي <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-3.5 w-5 h-5 text-navy-400" />
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-navy-900/80 border border-navy-700 focus:border-gold-400 text-white font-sans text-sm rounded-2xl pr-12 pl-10 py-3.5 outline-none transition-all appearance-none cursor-pointer font-medium"
                    >
                      {COUNTRIES.map((cty, idx) => (
                        <option key={idx} value={cty} className="bg-navy-900 text-white font-sans">
                          {cty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* 5. Course Preference Selector */}
              <div className="space-y-2">
                <label htmlFor="courseId" className="block text-sm font-cairo font-bold text-gold-200">
                  البرنامج أو الفعالية التدريبية المطلوبة <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute right-4 top-3.5 w-5 h-5 text-navy-400" />
                  <select
                    id="courseId"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full bg-navy-900/80 border border-navy-700 focus:border-gold-400 text-white font-sans text-sm rounded-2xl pr-12 pl-10 py-3.5 outline-none transition-all appearance-none cursor-pointer font-medium"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id} className="bg-navy-900 text-white font-sans">
                        {course.title} ({course.price || 'مجانية'})
                      </option>
                    ))}
                    <option value="custom-consult" className="bg-navy-900 text-white font-sans">
                      برنامج تمكين أو استشارات خاصة أخرى
                    </option>
                  </select>
                </div>
              </div>

              {/* CTA Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gold-gradient-bg text-navy-950 font-cairo font-extrabold text-base py-4 rounded-2xl shadow-xl shadow-gold-500/10 hover:opacity-[0.98] active:scale-[0.99] transition duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  id="form_submit_btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-navy-950 border-t-transparent"></div>
                      <span>جاري حفظ حجزك وتسجيل البيانات...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 transform -rotate-45" />
                      <span>احجز مقعدك الآن وارسل الطلب</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-navy-350 font-sans mt-3">
                🔒 سرّية وأمن بياناتكم في غاية الأمان، لن نشارك معلوماتكم مع أي طرف ثالث خارج إطار الأكاديمية.
              </p>

            </form>
          ) : (
            /* SUCCESS PANEL / DYNAMIC INTEGRATIONS */
            <div className="text-center py-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Animated checkmark */}
              <div className="relative flex items-center justify-center w-20 h-20 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-full mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-5 h-5 text-gold-400 animate-spin" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-cairo font-black text-2xl sm:text-3xl text-gold-300 leading-normal">
                  مبارك! تم تسلُّم طلب الحجز والتمكين بنجاح
                </h3>
                <p className="font-sans text-navy-150 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  أهلاً بك معنا يا <strong className="text-white">{lastSubmittedReg?.fullName}</strong>. لقد تم إدراج اسمك في سجلات المتدربين والبدء في تهيئة مقعدك.
                </p>
              </div>

              {/* Action panels to contact academy right away */}
              <div className="max-w-md mx-auto bg-navy-900/70 p-6 rounded-2xl border border-navy-700 text-right space-y-4">
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-gold-400 uppercase tracking-wider mb-2">
                  ⚡ لتسجيل فوري وتسريع اعتماد مقعدك:
                </h4>
                <p className="font-sans text-xs text-navy-200 leading-relaxed mb-4">
                  تواصل معنا مباشرة بإرسال تفاصيل تسجيلك الفورية بنقرة زر واحدة عبر الواتساب أو البريد كالتالي:
                </p>

                <div className="grid gap-3">
                  {/* WhatsApp Quick Action Button */}
                  <a
                    href={getWhatsAppMessageUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/20 transition hover:scale-[1.01]"
                    id="success_whatsapp_direct"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm">أرسل تفاصيل حجزك عبر الواتساب الآمن</span>
                  </a>

                  {/* Mail Quick Action Button */}
                  <a
                    href={getEmailMailtoUrl()}
                    className="flex items-center justify-center gap-2.5 bg-navy-800 hover:bg-navy-700 text-navy-100 font-sans font-medium py-3 px-4 rounded-xl border border-navy-700 transition"
                    id="success_email_direct"
                  >
                    <Mail className="w-5 h-5 shrink-0 text-gold-400" />
                    <span className="text-sm">أرسل نسخة تفصيلية للبريد الإلكتروني</span>
                  </a>
                </div>
              </div>

              {/* Reset to make another signup */}
              <div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="font-sans text-xs text-gold-100 underline hover:text-white transition"
                >
                  العودة لتسجيل متدرب جديد أو برنامج آخر
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
