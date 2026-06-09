/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import SubmitForm from './components/SubmitForm';
import AdminDashboard from './components/AdminDashboard';
import WhatsAppFloating from './components/WhatsAppFloating';
import Footer from './components/Footer';
import { TraineeRegistration, Course, AcademyStats } from './types';
import { COURSES, ACADEMY_STATS, SOCIAL_LINKS } from './data';

const STORAGE_KEY = 'elmona_academy_registrations';
const COURSES_KEY = 'elmona_academy_courses';
const STATS_KEY = 'elmona_academy_stats';
const SOCIAL_KEY = 'elmona_academy_social_links';
const PASSCODE_KEY = 'elmona_admin_passcode';

// Perfect initial seed data representing actual students to populate the dashboard nicely
const SEED_TRAINEES: TraineeRegistration[] = [
  {
    id: 'reg_seed_1',
    fullName: 'أحمد العيدروس الهاشمي',
    phone: '+966 50 123 4567',
    email: 'ahmed.yem@gmail.com',
    country: 'المملكة العربية السعودية',
    courseId: 'tot-pro',
    courseTitle: 'البرنامج الاحترافي لإعداد وتأهيل المدربين (T.O.T)',
    timestamp: '١٢/٣/٢٠٢٦، ٣:١٤ م',
    status: 'pending',
    notes: 'طالب دراسات عليا، يبحث عن مهارات الإلقاء.'
  },
  {
    id: 'reg_seed_2',
    fullName: 'ريما فؤاد الحريري',
    phone: '+961 70 987 654',
    email: 'rima.hariri@outlook.com',
    country: 'لبنان',
    courseId: 'leadership-mona',
    courseTitle: 'برنامج رائدات التغيير والتمكين القيادي',
    timestamp: '١٣/٣/٢٠٢٦، ٩:٣٠ ص',
    status: 'confirmed',
    notes: 'تم تأكيد الحجز بعد سداد جزء من الرسوم.'
  },
  {
    id: 'reg_seed_3',
    fullName: 'خليل عبد الرحمن التميمي',
    phone: '+962 7 9988 7766',
    email: 'tamimi.create@gmail.com',
    country: 'الأردن',
    courseId: 'content-creation',
    courseTitle: 'صناعة المحتوى الإبداعي والتأثير الرقمي',
    timestamp: '١٤/٣/٢٠٢٦، ١١:١٥ ص',
    status: 'contacted',
    notes: 'تم الاتصال بالمتدرب لمناقشة مواعيد الدورة بالفيديو.'
  }
];

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('tot-pro');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  
  // Real Local Database States
  const [registrations, setRegistrations] = useState<TraineeRegistration[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<AcademyStats>({
    studentsCount: 1500,
    coursesCount: 24,
    satisfactionRate: '98%',
    experienceYears: 10
  });
  const [socialLinks, setSocialLinks] = useState({
    phone: '+961 3 541 580',
    whatsappUrl: 'https://wa.me/9613541580?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D9%83%D8%A7%D9%84%D9%8A%D9%85%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%89%D8%8C%20%D8%A3%D9%8%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%20%D8%A7%D9%84%D8%A8%D8%B1%D8%A7%D9%85%D8%AC%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%D9%8A%D8%A9',
    email: 'academyelmona@gmail.com',
    linktree: 'https://linktr.ee/MonaRaad',
    youtube: 'https://youtube.com/@yallahelp66?si=DjX0eqm4XMNhgWB7',
    facebook: 'https://www.facebook.com/share/18aACG9sHx/'
  });
  const [adminPasscode, setAdminPasscode] = useState<string>('1234');

  // Load all dynamic content databases from localStorage on first mount
  useEffect(() => {
    // 1. Load registrations
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
      try { setRegistrations(JSON.parse(rawData)); } catch (err) { setRegistrations(SEED_TRAINEES); }
    } else {
      setRegistrations(SEED_TRAINEES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_TRAINEES));
    }

    // 2. Load courses list
    const rawCourses = localStorage.getItem(COURSES_KEY);
    if (rawCourses) {
      try { setCourses(JSON.parse(rawCourses)); } catch (err) { setCourses(COURSES); }
    } else {
      setCourses(COURSES);
      localStorage.setItem(COURSES_KEY, JSON.stringify(COURSES));
    }

    // 3. Load stats
    const rawStats = localStorage.getItem(STATS_KEY);
    if (rawStats) {
      try { setStats(JSON.parse(rawStats)); } catch (err) { setStats(ACADEMY_STATS); }
    } else {
      setStats(ACADEMY_STATS);
      localStorage.setItem(STATS_KEY, JSON.stringify(ACADEMY_STATS));
    }

    // 4. Load social links
    const rawSocial = localStorage.getItem(SOCIAL_KEY);
    if (rawSocial) {
      try { setSocialLinks(JSON.parse(rawSocial)); } catch (err) { setSocialLinks(SOCIAL_LINKS); }
    } else {
      setSocialLinks(SOCIAL_LINKS);
      localStorage.setItem(SOCIAL_KEY, JSON.stringify(SOCIAL_LINKS));
    }

    // 5. Load passcode
    const rawPasscode = localStorage.getItem(PASSCODE_KEY);
    if (rawPasscode) {
      setAdminPasscode(rawPasscode);
    } else {
      setAdminPasscode('1234');
      localStorage.setItem(PASSCODE_KEY, '1234');
    }
  }, []);

  // Sync state helpers
  const saveRegistrations = (newRegs: TraineeRegistration[]) => {
    setRegistrations(newRegs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRegs));
  };

  const handleNewRegistration = (newReg: TraineeRegistration) => {
    const updatedRegs = [newReg, ...registrations];
    saveRegistrations(updatedRegs);
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'confirmed' | 'contacted') => {
    const updatedRegs = registrations.map(reg =>
      reg.id === id ? { ...reg, status: newStatus } : reg
    );
    saveRegistrations(updatedRegs);
  };

  const handleDeleteRegistration = (id: string) => {
    const updatedRegs = registrations.filter(reg => reg.id !== id);
    saveRegistrations(updatedRegs);
  };

  const handleClearAll = () => {
    saveRegistrations([]);
  };

  const handleUpdateCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem(COURSES_KEY, JSON.stringify(newCourses));
  };

  const handleUpdateStats = (newStats: AcademyStats) => {
    setStats(newStats);
    localStorage.setItem(STATS_KEY, JSON.stringify(newStats));
  };

  const handleUpdateSocialLinks = (newSocial: any) => {
    setSocialLinks(newSocial);
    localStorage.setItem(SOCIAL_KEY, JSON.stringify(newSocial));
  };

  const handleUpdatePasscode = (newPass: string) => {
    setAdminPasscode(newPass);
    localStorage.setItem(PASSCODE_KEY, newPass);
  };

  const handleScrollToRegister = () => {
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col font-sans select-none tracking-normal">
      
      {/* Academy Navigation bar */}
      <Header
        onRegisterClick={handleScrollToRegister}
        onAdminToggle={() => setIsAdminOpen(!isAdminOpen)}
        isAdminMode={isAdminOpen}
        socialLinks={socialLinks}
      />

      <main className="flex-1">
        {/* Hero Area */}
        <Hero 
          onRegisterClick={handleScrollToRegister} 
          stats={stats}
          socialLinks={socialLinks}
        />

        {/* Features / Benefits Grid */}
        <Features />

        {/* Interactive Courses Catalogue Grid */}
        <Courses 
          courses={courses} 
          onSelectCourse={(courseId) => setSelectedCourseId(courseId)} 
        />

        {/* Academy Mission Core Message section */}
        <section id="message" className="py-20 bg-navy-900 text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#deca650a,transparent_60%)]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <span className="text-gold-400 font-cairo font-bold text-xs sm:text-sm tracking-widest block uppercase">
              قـيمنا ورسـالتنا
            </span>
            <blockquote className="text-xl sm:text-2xl font-black font-cairo text-white leading-relaxed max-w-2xl mx-auto">
              “التمكين ليس مجرد الكلمة الرنانة التي نرددها؛ إنها الشعلة الحقيقية التي نوقدها في عقول وقلوب متدربينا ليملكوا قرار تغيير ذواتهم وتوجيه مجتمعاتهم نحو المستقبل.”
            </blockquote>
            <div className="flex items-center justify-center gap-3 pt-4">
              <img
                className="w-12 h-12 rounded-full border-2 border-gold-400"
                src="https://picsum.photos/seed/monaraadsig/100/100"
                alt="منى رعد"
                referrerPolicy="no-referrer"
              />
              <div className="text-right">
                <span className="font-cairo font-bold text-gold-300 block text-sm sm:text-base">المستشارة المهنية منى رعد</span>
                <span className="text-xs text-navy-300 font-sans">رئيسة مبادرة رائدات التغيير القيادي</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Registration Form with Country autocomplete & Course Sync */}
        <SubmitForm
          selectedCourseId={selectedCourseId}
          onSelectCourse={(id) => setSelectedCourseId(id)}
          onNewRegistration={handleNewRegistration}
          courses={courses}
          socialLinks={socialLinks}
        />
      </main>

      {/* Footer Area */}
      <Footer socialLinks={socialLinks} />

      {/* Floating interactive WhatsApp Chat button */}
      <WhatsAppFloating socialLinks={socialLinks} />

      {/* Popup Administrative Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          registrations={registrations}
          courses={courses}
          stats={stats}
          socialLinks={socialLinks}
          adminPasscode={adminPasscode}
          onStatusChange={handleStatusChange}
          onDeleteRegistration={handleDeleteRegistration}
          onClearAll={handleClearAll}
          onClose={() => setIsAdminOpen(false)}
          onUpdateCourses={handleUpdateCourses}
          onUpdateStats={handleUpdateStats}
          onUpdateSocialLinks={handleUpdateSocialLinks}
          onUpdatePasscode={handleUpdatePasscode}
        />
      )}

    </div>
  );
}
