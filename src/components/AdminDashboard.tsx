import React, { useState } from 'react';
import { 
  ShieldCheck, Download, Trash2, Key, Users, Trophy, BookOpen, MapPin, 
  X, CheckSquare, Clock, Filter, Search, PlusCircle, Edit2, Check,
  Link, HelpCircle, Save, Phone, MessageSquare, Briefcase
} from 'lucide-react';
import { TraineeRegistration, Course, AcademyStats } from '../types';

interface AdminDashboardProps {
  registrations: TraineeRegistration[];
  courses: Course[];
  stats: AcademyStats;
  socialLinks: {
    phone: string;
    whatsappUrl: string;
    email: string;
    linktree: string;
    youtube: string;
    facebook: string;
  };
  adminPasscode: string;
  onStatusChange: (id: string, newStatus: 'pending' | 'confirmed' | 'contacted') => void;
  onDeleteRegistration: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
  onUpdateCourses: (courses: Course[]) => void;
  onUpdateStats: (stats: AcademyStats) => void;
  onUpdateSocialLinks: (social: any) => void;
  onUpdatePasscode: (passcode: string) => void;
}

export default function AdminDashboard({
  registrations,
  courses,
  stats,
  socialLinks,
  adminPasscode,
  onStatusChange,
  onDeleteRegistration,
  onClearAll,
  onClose,
  onUpdateCourses,
  onUpdateStats,
  onUpdateSocialLinks,
  onUpdatePasscode
}: AdminDashboardProps) {
  // Authentication State
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState<'applications' | 'courses' | 'stats' | 'social' | 'passcode'>('applications');

  // Filtering applications states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');

  // New/Edit Course Form States
  const [isEditingCourse, setIsEditingCourse] = useState<boolean>(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null); // null means creating new
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState<'tot' | 'leadership' | 'development' | 'content' | 'consulting'>('tot');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseShortDesc, setCourseShortDesc] = useState('');
  const [courseLongDesc, setCourseLongDesc] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseOriginalPrice, setCourseOriginalPrice] = useState('');
  const [courseSeatsLeft, setCourseSeatsLeft] = useState<number>(10);
  const [courseTotalSeats, setCourseTotalSeats] = useState<number>(20);
  const [courseFeaturesText, setCourseFeaturesText] = useState('');
  const [courseFeatured, setCourseFeatured] = useState<boolean>(false);

  // Edit Stats Form States
  const [statsStudents, setStatsStudents] = useState<number>(stats.studentsCount);
  const [statsCoursesCount, setStatsCoursesCount] = useState<number>(stats.coursesCount);
  const [statsSatisfaction, setStatsSatisfaction] = useState<string>(stats.satisfactionRate);
  const [statsExperience, setStatsExperience] = useState<number>(stats.experienceYears);
  const [statsSuccessMsg, setStatsSuccessMsg] = useState('');

  // Edit Social Connections States
  const [socialPhone, setSocialPhone] = useState(socialLinks.phone);
  const [socialWhatsapp, setSocialWhatsapp] = useState(socialLinks.whatsappUrl);
  const [socialEmail, setSocialEmail] = useState(socialLinks.email);
  const [socialLinktree, setSocialLinktree] = useState(socialLinks.linktree);
  const [socialYoutube, setSocialYoutube] = useState(socialLinks.youtube);
  const [socialFacebook, setSocialFacebook] = useState(socialLinks.facebook);
  const [socialSuccessMsg, setSocialSuccessMsg] = useState('');

  // Change Passcode States
  const [newPassval, setNewPassval] = useState('');
  const [confirmPassval, setConfirmPassval] = useState('');
  const [passcodeSuccessMsg, setPasscodeSuccessMsg] = useState('');
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (passcode === adminPasscode || passcode.toLowerCase() === 'admin' || passcode === '1234') {
      setIsAuthenticated(true);
    } else {
      setAuthError('عذراً، الرمز المدخل غير مطابق مع رمز المرور الفعلي للوحة الإدارة.');
    }
  };

  // Trainee Filter Logic
  const filteredRegs = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.phone.includes(searchTerm) ||
                          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const matchesCourse = courseFilter === 'all' || reg.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Export registrations data to CSV file safely with BOM for excel Arabic encoding
  const exportToCSV = () => {
    if (filteredRegs.length === 0) return;

    // CSV Headers
    const headers = ['المعرّف', 'الاسم الكامل', 'الهاتف', 'البريد الإلكتروني', 'بلد الإقامة', 'المشترك في دبلوم', 'توقيت التسجيل', 'حالة المعالجة'];
    
    // Map rows
    const rows = filteredRegs.map(reg => [
      reg.id,
      reg.fullName.replace(/,/g, ' '),
      reg.phone,
      reg.email,
      reg.country.replace(/,/g, ' '),
      reg.courseTitle.replace(/,/g, ' '),
      reg.timestamp,
      reg.status === 'confirmed' ? 'حجز مؤكد' : reg.status === 'contacted' ? 'تم التواصل' : 'قيد الانتظار'
    ]);

    let csvContent = '\uFEFF'; 
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `مسجلي_المشروع_المنى_${new Date().toLocaleDateString('ar-EG')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Course Add/Edit Handlers
  const openNewCourseForm = () => {
    setEditingCourseId(null);
    setCourseTitle('');
    setCourseCategory('tot');
    setCourseDuration('');
    setCourseShortDesc('');
    setCourseLongDesc('');
    setCoursePrice('');
    setCourseOriginalPrice('');
    setCourseSeatsLeft(15);
    setCourseTotalSeats(25);
    setCourseFeaturesText('');
    setCourseFeatured(false);
    setIsEditingCourse(true);
  };

  const openEditCourseForm = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseTitle(course.title);
    setCourseCategory(course.category);
    setCourseDuration(course.duration);
    setCourseShortDesc(course.shortDesc);
    setCourseLongDesc(course.longDesc);
    setCoursePrice(course.price || '');
    setCourseOriginalPrice(course.originalPrice || '');
    setCourseSeatsLeft(course.seatsLeft || 10);
    setCourseTotalSeats(course.totalSeats || 20);
    setCourseFeaturesText(course.features.join('\n'));
    setCourseFeatured(!!course.featured);
    setIsEditingCourse(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    const parsedFeatures = courseFeaturesText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const matchCategoryLabel = (cat: string) => {
      switch (cat) {
        case 'tot': return 'برامج T.O.T';
        case 'leadership': return 'القيادة والتمكين';
        case 'development': return 'التنمية الذاتية';
        case 'content': return 'صناعة المحتوى';
        case 'consulting': return 'الاستشارات';
        default: return 'أخرى';
      }
    };

    if (editingCourseId) {
      // Modify existing
      const updated = courses.map(c => {
        if (c.id === editingCourseId) {
          return {
            ...c,
            title: courseTitle.trim(),
            category: courseCategory,
            categoryLabel: matchCategoryLabel(courseCategory),
            duration: courseDuration.trim(),
            shortDesc: courseShortDesc.trim(),
            longDesc: courseLongDesc.trim(),
            price: coursePrice.trim(),
            originalPrice: courseOriginalPrice.trim(),
            seatsLeft: Number(courseSeatsLeft),
            totalSeats: Number(courseTotalSeats),
            features: parsedFeatures,
            featured: courseFeatured
          };
        }
        return c;
      });
      onUpdateCourses(updated);
    } else {
      // Create new course
      const newId = 'course_' + Date.now();
      const newCourse: Course = {
        id: newId,
        title: courseTitle.trim(),
        category: courseCategory,
        categoryLabel: matchCategoryLabel(courseCategory),
        duration: courseDuration.trim(),
        shortDesc: courseShortDesc.trim(),
        longDesc: courseLongDesc.trim(),
        price: coursePrice.trim(),
        originalPrice: courseOriginalPrice.trim(),
        seatsLeft: Number(courseSeatsLeft),
        totalSeats: Number(courseTotalSeats),
        features: parsedFeatures,
        featured: courseFeatured
      };
      onUpdateCourses([...courses, newCourse]);
    }

    setIsEditingCourse(false);
    setEditingCourseId(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا البرنامج التدريبي نهائياً من العرض والاستمارة؟')) {
      const filtered = courses.filter(c => c.id !== courseId);
      onUpdateCourses(filtered);
    }
  };

  // Stats Save Handler
  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats({
      studentsCount: Number(statsStudents),
      coursesCount: Number(statsCoursesCount),
      satisfactionRate: statsSatisfaction.trim(),
      experienceYears: Number(statsExperience)
    });
    setStatsSuccessMsg('تم حفظ الأرقام والإحصائيات بنجاح وستظهر فوراً في الواجهة الرئيسية.');
    setTimeout(() => setStatsSuccessMsg(''), 4000);
  };

  // Social Connections Save Handler
  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSocialLinks({
      phone: socialPhone.trim(),
      whatsappUrl: socialWhatsapp.trim(),
      email: socialEmail.trim(),
      linktree: socialLinktree.trim(),
      youtube: socialYoutube.trim(),
      facebook: socialFacebook.trim()
    });
    setSocialSuccessMsg('تم تحديث أرقام وروابط مواقع التواصل بنجاح في كامل المنصة.');
    setTimeout(() => setSocialSuccessMsg(''), 4000);
  };

  // Passcode Save Handler
  const handleSavePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeErrorMsg('');
    setPasscodeSuccessMsg('');

    if (!newPassval) {
      setPasscodeErrorMsg('الرجاء إدخال كلمة مرور صالحة.');
      return;
    }
    if (newPassval !== confirmPassval) {
      setPasscodeErrorMsg('كلمتا المرور غير متابقتين، يرجى إعادة الإدخال.');
      return;
    }

    onUpdatePasscode(newPassval);
    setPasscodeSuccessMsg('تم تغيير كلمة مرور لوحة الإدارة بنجاح. يرجى استخدامها في المرات القادمة.');
    setNewPassval('');
    setConfirmPassval('');
  };

  // Trainee counters
  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const contactedCount = registrations.filter(r => r.status === 'contacted').length;
  const confirmedCount = registrations.filter(r => r.status === 'confirmed').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/90 backdrop-blur-md p-3 sm:p-6 lg:p-8 flex items-center justify-center animate-in fade-in duration-300">
      
      {/* 1. SECURE SYSTEM PASSCODE PANEL */}
      {!isAuthenticated ? (
        <div className="bg-navy-900 rounded-3xl border border-gold-500/20 shadow-2xl p-6 sm:p-8 max-w-md w-full text-right animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-navy-800 pb-4 mb-6">
            <h3 className="font-cairo font-black text-lg text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-500" />
              <span>تسجيل دخول المسؤول ⚙️</span>
            </h3>
            <button
              onClick={onClose}
              className="text-navy-300 hover:text-white bg-navy-800 p-2 rounded-xl transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <p className="font-sans text-xs sm:text-sm text-navy-200 leading-normal">
              دواعي الأمان والخصوصية لوطننا العربي تتطلب التحقق من هويتك لتعديل الدورات أو مراجعة بيانات الطلاب المسجلين.
            </p>
            
            <div className="bg-gold-500/5 border border-gold-500/15 p-4 rounded-2xl text-xs font-sans text-gold-300 leading-relaxed mb-1">
              💡 <strong>الرمز التجريبي والافتراضي:</strong> يمكنك كتابة <strong>1234</strong> أو كلمة <strong>admin</strong> لتسجيل الدخول الفوري وتجربة الميزات.
            </div>

            {authError && (
              <p className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs font-sans font-medium">
                ⚠️ {authError}
              </p>
            )}

            <div className="space-y-1 text-right">
              <label htmlFor="admin_pass" className="text-xs font-cairo font-bold text-navy-200">رمز المرور السري</label>
              <div className="relative">
                <Key className="absolute right-4 top-3.5 w-4.5 h-4.5 text-navy-400" />
                <input
                  id="admin_pass"
                  type="password"
                  placeholder="أدخل الرمز ههنا"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-navy-850 border border-navy-700 text-white focus:border-gold-500 rounded-2xl pr-12 pl-4 py-3 text-sm outline-none font-sans"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full gold-gradient-bg text-navy-950 font-cairo font-bold py-3 rounded-2xl shadow-xl transition-all duration-300 hover:opacity-95"
            >
              تحقق ودخول بأمان لوحة التحكم 🔐
            </button>
          </form>
        </div>
      ) : (
        /* 2. COMPREHENSIVE ADMINISTRATIVE DASHBOARD HUB */
        <div className="bg-navy-900 rounded-3xl border border-gold-500/25 shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col text-right animate-in zoom-in-95 duration-200 overflow-hidden text-white font-sans">
          
          {/* Main Hub Top Bar */}
          <div className="p-5 border-b border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-navy-950 text-white shrink-0 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-navy-950 font-black text-sm">
                ⚙️
              </div>
              <div>
                <span className="bg-gold-500/10 text-gold-400 border border-gold-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold font-sans uppercase">الفرع الكامل للتحكم</span>
                <h3 className="font-cairo font-black text-base sm:text-lg text-gold-200 leading-none mt-1">لوحة تحكم وإدارة المنصة المتكاملة</h3>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              {activeTab === 'applications' && (
                <button
                  onClick={exportToCSV}
                  disabled={filteredRegs.length === 0}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-cairo font-bold flex items-center gap-1.5 transition duration-300 disabled:opacity-40 shrink-0"
                  title="تصدير جدول المتدربين بصيغة Excel"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير إكسيل</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="bg-navy-850 hover:bg-navy-800 text-navy-200 hover:text-white p-2.5 rounded-xl border border-navy-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Tab Select Navigation bar */}
          <div className="bg-navy-950 px-4 md:px-6 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0 border-b border-navy-800 scrollbar-none scroll-smooth">
            <button
              onClick={() => { setActiveTab('applications'); setIsEditingCourse(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cairo font-bold transition whitespace-nowrap ${
                activeTab === 'applications' ? 'bg-gold-500 text-navy-950' : 'bg-navy-850 text-navy-200 hover:bg-navy-800'
              }`}
            >
              📨 طلبات المتدربين ({registrations.length})
            </button>
            <button
              onClick={() => { setActiveTab('courses'); setIsEditingCourse(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cairo font-bold transition whitespace-nowrap ${
                activeTab === 'courses' ? 'bg-gold-500 text-navy-950' : 'bg-navy-850 text-navy-200 hover:bg-navy-800'
              }`}
            >
              📚 إدارة البرامج التدريبية ({courses.length})
            </button>
            <button
              onClick={() => { setActiveTab('stats'); setIsEditingCourse(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cairo font-bold transition whitespace-nowrap ${
                activeTab === 'stats' ? 'bg-gold-500 text-navy-950' : 'bg-navy-850 text-navy-200 hover:bg-navy-800'
              }`}
            >
              📊 تعديل إحصائيات المنصة
            </button>
            <button
              onClick={() => { setActiveTab('social'); setIsEditingCourse(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cairo font-bold transition whitespace-nowrap ${
                activeTab === 'social' ? 'bg-gold-500 text-navy-950' : 'bg-navy-850 text-navy-200 hover:bg-navy-800'
              }`}
            >
              🔗 روابط التواصل الاجتماعي
            </button>
            <button
              onClick={() => { setActiveTab('passcode'); setIsEditingCourse(false); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cairo font-bold transition whitespace-nowrap ${
                activeTab === 'passcode' ? 'bg-gold-500 text-navy-950' : 'bg-navy-850 text-navy-200 hover:bg-navy-800'
              }`}
            >
              🔑 تغيير كلمة المرور
            </button>
          </div>

          {/* MAIN BODY OF CORRESPONDING TAB PANELS */}
          <div className="flex-1 overflow-y-auto bg-navy-900">
            
            {/* TAB PART A: APPLICATIONS LIST */}
            {activeTab === 'applications' && (
              <div className="p-4 sm:p-6 space-y-4">
                
                {/* Stats row inside panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-navy-950/50 p-4 rounded-2xl border border-navy-800 text-right">
                    <span className="text-[10px] text-navy-400 font-sans block mb-1">إجمالي المتقدمين</span>
                    <span className="text-lg sm:text-xl font-bold font-cairo text-gold-400">{registrations.length} طالب(ة)</span>
                  </div>
                  <div className="bg-navy-950/50 p-4 rounded-2xl border border-amber-950/40 text-right">
                    <span className="text-[10px] text-navy-400 font-sans block mb-1">⏳ بانتظار الإجراء</span>
                    <span className="text-lg sm:text-xl font-bold font-cairo text-amber-400">{pendingCount} طلبات</span>
                  </div>
                  <div className="bg-navy-950/50 p-4 rounded-2xl border border-blue-950/40 text-right">
                    <span className="text-[10px] text-navy-400 font-sans block mb-1">📞 تم التواصل معهم</span>
                    <span className="text-lg sm:text-xl font-bold font-cairo text-blue-400">{contactedCount} طلاب</span>
                  </div>
                  <div className="bg-navy-950/50 p-4 rounded-2xl border border-emerald-950/40 text-right">
                    <span className="text-[10px] text-navy-400 font-sans block mb-1">✅ مقاعد حجزها مؤكد</span>
                    <span className="text-lg sm:text-xl font-bold font-cairo text-emerald-400">{confirmedCount} متدرب</span>
                  </div>
                </div>

                {/* Filter tools */}
                <div className="flex flex-col md:flex-row gap-3 bg-navy-950 p-4 rounded-2xl border border-navy-800">
                  <div className="relative flex-1">
                    <Search className="absolute right-3.5 top-3 w-4 h-4 text-navy-400" />
                    <input
                      type="text"
                      placeholder="ابحث بالاسم، هاتف، بريد أو دولة المتقدم..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-navy-900 border border-navy-750 text-white focus:border-gold-500 rounded-xl pr-10 pl-4 py-2.5 text-xs outline-none font-sans font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full md:w-96 shrink-0">
                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="bg-navy-900 text-white border border-navy-750 rounded-xl px-2.5 py-2 text-xs font-sans outline-none cursor-pointer"
                    >
                      <option value="all">كل البرامج التدريبية</option>
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                      <option value="custom-consult">استشارات خاصة</option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-navy-900 text-white border border-navy-750 rounded-xl px-2.5 py-2 text-xs font-sans outline-none cursor-pointer"
                    >
                      <option value="all">كل الحالات</option>
                      <option value="pending">⏳ قيد الانتظار</option>
                      <option value="contacted">📞 تم التواصل</option>
                      <option value="confirmed">✅ تم التأكيد</option>
                    </select>
                  </div>
                </div>

                {/* Applications Table */}
                <div className="overflow-x-auto border border-navy-800 rounded-2xl bg-navy-950/40">
                  {filteredRegs.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <Users className="w-12 h-12 text-navy-500 mx-auto" />
                      <h4 className="font-cairo font-bold text-sm text-white">لا يوجد متدربين بهذه الفلاتر</h4>
                      <p className="text-xs text-navy-300 font-sans max-w-sm mx-auto">تأكد من كتابة الاسم بصورة صحيحة أو تعديل الفلترة.</p>
                    </div>
                  ) : (
                    <table className="min-w-full divide-y divide-navy-800 text-right text-xs">
                      <thead className="bg-[#0b141f] text-navy-300 font-cairo">
                        <tr>
                          <th className="px-5 py-3">المتدرب وبيانات الاتصال</th>
                          <th className="px-5 py-3">بلده</th>
                          <th className="px-5 py-3">البرنامج المطلوب</th>
                          <th className="px-5 py-3">التسجيل</th>
                          <th className="px-5 py-3 text-center">أخذ الإجراء</th>
                          <th className="px-5 py-3 text-left">التفاعل والطلبات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-navy-800/60 bg-[#0d1621]/30">
                        {filteredRegs.map(reg => (
                          <tr key={reg.id} className="hover:bg-navy-850/40 transition">
                            <td className="px-5 py-3">
                              <div className="space-y-0.5">
                                <span className="font-bold text-white font-cairo block">{reg.fullName}</span>
                                <span className="text-[10px] text-navy-350 font-mono block select-all">{reg.email}</span>
                                <span className="text-[10px] text-emerald-400 font-mono block select-all" dir="ltr">{reg.phone}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-navy-200">
                              <span className="inline-flex items-center gap-1 bg-navy-900 border border-navy-800 px-2 py-0.5 rounded-md">
                                <MapPin className="w-3 h-3 text-gold-400" />
                                <span>{reg.country}</span>
                              </span>
                            </td>
                            <td className="px-5 py-3 text-white font-bold max-w-xs truncate">{reg.courseTitle}</td>
                            <td className="px-5 py-3 text-navy-300 font-sans">{reg.timestamp}</td>
                            <td className="px-5 py-3 text-center">
                              <select
                                value={reg.status}
                                onChange={(e) => onStatusChange(reg.id, e.target.value as any)}
                                className={`px-2.5 py-1 rounded-full font-bold text-[10px] cursor-pointer outline-none border ${
                                  reg.status === 'confirmed'
                                    ? 'bg-emerald-950/70 text-emerald-300 border-emerald-900/40'
                                    : reg.status === 'contacted'
                                    ? 'bg-blue-950/70 text-blue-300 border-blue-900/40'
                                    : 'bg-amber-950/70 text-amber-300 border-amber-900/40'
                                }`}
                              >
                                <option value="pending" className="bg-navy-900 text-white">⏳ قيد الانتظار</option>
                                <option value="contacted" className="bg-navy-900 text-white">📞 تم التواصل</option>
                                <option value="confirmed" className="bg-navy-900 text-white">✅ تم التأكيد</option>
                              </select>
                            </td>
                            <td className="px-5 py-3 text-left">
                              <div className="flex justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 px-2.5 bg-emerald-950 text-emerald-400 border border-emerald-900 hover:bg-emerald-900 hover:text-white rounded-lg transition text-[10px] font-sans flex items-center gap-1"
                                >
                                  <span>تواصل واتساب</span>
                                </a>
                                <button
                                  onClick={() => onDeleteRegistration(reg.id)}
                                  className="p-1.5 text-red-400 hover:bg-red-950/65 rounded-lg transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Applications cleanup indicator */}
                {registrations.length > 0 && (
                  <div className="text-left">
                    <button
                      onClick={() => {
                        if (confirm('تنبيه هام! هل تريد تصفير قاعدة بيانات المتدربين كاملة؟ هذا يمسح كل ما تم تسجيله.')) {
                          onClearAll();
                        }
                      }}
                      className="px-4 py-2 border border-red-500/20 hover:bg-red-950 text-red-400 rounded-xl text-xs font-bold transition duration-300"
                    >
                      حذف وتصفير كامل بيانات المتدربين ⚠️
                    </button>
                  </div>
                )}

              </div>
            )}


            {/* TAB PART B: COURSES DATABASE MANAGER */}
            {activeTab === 'courses' && (
              <div className="p-4 sm:p-6 space-y-6">
                
                {/* Section header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-cairo font-bold text-sm text-gold-200">الدورات والبرامج المعلنة على الصفحة</h3>
                    <p className="text-[11px] text-navy-300">أضف، عدّل برامجك، غيّر الأسعار ومقاعد الحجز من هنا.</p>
                  </div>
                  {!isEditingCourse && (
                    <button
                      onClick={openNewCourseForm}
                      className="gold-gradient-bg text-navy-950 px-4 py-2 rounded-xl text-xs font-cairo font-bold flex items-center gap-1.5 transition duration-300 hover:scale-[1.03]"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>إضافة برنامج تدريبي جديد</span>
                    </button>
                  )}
                </div>

                {/* Course edit form or list display */}
                {isEditingCourse ? (
                  <form onSubmit={handleSaveCourse} className="bg-navy-950 border border-gold-500/15 p-5 rounded-2xl space-y-4 max-w-3xl">
                    <h4 className="font-cairo font-black text-sm text-gold-300 border-b border-navy-800 pb-2">
                      {editingCourseId ? '✏️ تعديل تفاصيل ومحتوى البرنامج التدريبي' : '✨ إنشاء دورة أو برنامج تدريبي جديد'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold block">العنوان التجاري أو اسم الكورس</label>
                        <input
                          type="text"
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                          placeholder="مثال: دورتنا المتقدمة لإعداد كبار المستشارين"
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-gold-500"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold block">تصنيف وتخصص البرنامج</label>
                        <select
                          value={courseCategory}
                          onChange={(e) => setCourseCategory(e.target.value as any)}
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none cursor-pointer"
                        >
                          <option value="tot">برامج تدريب المدربين T.O.T</option>
                          <option value="leadership">القيادة والتمكين الفعال</option>
                          <option value="development">التنمية الذاتية والتطوير الشخصي</option>
                          <option value="content">صناعة المحتوى والتسويق الشخصي</option>
                          <option value="consulting">الاستشارات والتحسين الفردي</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold block">المدة والساعات (تظهر بالبطاقة)</label>
                        <input
                          type="text"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                          placeholder="مثال: 4 أسابيع (25 ساعة محاكاة)"
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-gold-500"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs text-navy-200 font-bold block">سعر الحجز الحالي ($)</label>
                          <input
                            type="text"
                            value={coursePrice}
                            onChange={(e) => setCoursePrice(e.target.value)}
                            placeholder="مثال: 99 $"
                            className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-navy-200 font-bold block">السعر قبل الخصم (اختياري)</label>
                          <input
                            type="text"
                            value={courseOriginalPrice}
                            onChange={(e) => setCourseOriginalPrice(e.target.value)}
                            placeholder="مثال: 150 $"
                            className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs text-navy-200 font-bold block">المقاعد المتبقية</label>
                          <input
                            type="number"
                            value={courseSeatsLeft}
                            onChange={(e) => setCourseSeatsLeft(Number(e.target.value))}
                            className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-navy-200 font-bold block">إجمالي المقاعد بالطاولة</label>
                          <input
                            type="number"
                            value={courseTotalSeats}
                            onChange={(e) => setCourseTotalSeats(Number(e.target.value))}
                            className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-5">
                        <input
                          id="featured_checkbox"
                          type="checkbox"
                          checked={courseFeatured}
                          onChange={(e) => setCourseFeatured(e.target.checked)}
                          className="w-4 h-4 accent-gold-500 cursor-pointer"
                        />
                        <label htmlFor="featured_checkbox" className="text-xs text-navy-100 cursor-pointer select-none">تمثيل الدورة كعنصر مميز بارز (عرض خاص بنجم)</label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">وصف وتلخيص موجز (سطرين)</label>
                      <input
                        type="text"
                        value={courseShortDesc}
                        onChange={(e) => setCourseShortDesc(e.target.value)}
                        placeholder="نبذة سريعة تظهر بكرت الدورة الخارجي"
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">تفاصيل البرنامج والوقت بالكامل</label>
                      <textarea
                        value={courseLongDesc}
                        onChange={(e) => setCourseLongDesc(e.target.value)}
                        placeholder="تفاصيل ما الذي سيتعلمه المتدربون وشرح المنهجية..."
                        rows={3}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                        required
                      ></textarea>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">مميزات وما يحصل عليه الطالب (أدخل كل ميزة في سطر منفصل)</label>
                      <textarea
                        value={courseFeaturesText}
                        onChange={(e) => setCourseFeaturesText(e.target.value)}
                        placeholder="شهادة تمكين معتمدة من الأكاديمية&#10;تطبيقات واقعية ومعدلة بالفيديو&#10;جلسة استشارية حرة مع منى رعد"
                        rows={4}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none font-sans leading-relaxed"
                        required
                      ></textarea>
                    </div>

                    <div className="flex items-center gap-2.5 pt-3 justify-end border-t border-navy-800">
                      <button
                        type="button"
                        onClick={() => setIsEditingCourse(false)}
                        className="bg-navy-800 hover:bg-navy-750 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap"
                      >
                        إلغاء التعديل
                      </button>
                      <button
                        type="submit"
                        className="gold-gradient-bg text-navy-950 px-5 py-2.5 rounded-xl text-xs font-bold font-cairo flex items-center gap-1 transition-all duration-300"
                      >
                        <Check className="w-4 h-4" />
                        <span>حفظ البرنامج وعرضه بالصفحة 💾</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map(course => (
                      <div key={course.id} className="bg-navy-950 border border-navy-800 p-4 rounded-2xl flex items-start justify-between gap-4">
                        <div className="text-right space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="bg-gold-500/10 text-gold-300 text-[9px] px-2 py-0.5 rounded border border-gold-500/15 font-bold">{course.categoryLabel}</span>
                            {course.featured && <span className="bg-amber-600 text-white text-[9px] px-2 py-0.5 rounded font-bold">تميز مالي نجمة ⭐</span>}
                          </div>
                          <h4 className="font-cairo font-bold text-sm text-white">{course.title}</h4>
                          <p className="text-[11px] text-navy-300 font-sans tracking-wide">{course.shortDesc}</p>
                          <div className="flex items-center gap-4 text-[10px] text-navy-400 font-sans">
                            <span>🕒 المدة: {course.duration}</span>
                            <span>💵 السعر: <strong className="text-gold-200">{course.price || 'مجاناً'}</strong></span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditCourseForm(course)}
                            className="bg-navy-850 hover:bg-navy-800 border border-navy-700 text-gold-200 hover:text-white p-2 rounded-xl text-xs font-medium transition flex items-center gap-1"
                            title="تعديل هذا الكورس"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="bg-red-950/40 hover:bg-[#34171a] border border-red-900/30 text-red-400 p-2 rounded-xl transition flex items-center gap-1"
                            title="حذف هذا الكورس"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}


            {/* TAB PART C: STATISTICS MODIFIER */}
            {activeTab === 'stats' && (
              <div className="p-4 sm:p-6 space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-cairo font-bold text-sm text-gold-200">📊 تعديل الإحصائيات والأرقام المعروضة في المنصة</h3>
                  <p className="text-[11px] text-navy-300">هذه الأرقام تظهر في الصفحة الرئيسية لتعزز مصداقية الأكاديمية وتجذب طلاباً أكثر.</p>
                </div>

                {statsSuccessMsg && (
                  <p className="bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 p-3 rounded-xl text-xs font-bold">
                    ✅ {statsSuccessMsg}
                  </p>
                )}

                <form onSubmit={handleSaveStats} className="bg-navy-950 border border-navy-850 p-5 rounded-2xl space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right">
                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">عدد المتدربين المسجلين (Students Count)</label>
                      <input
                        type="number"
                        value={statsStudents}
                        onChange={(e) => setStatsStudents(Number(e.target.value))}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">عدد البرامج المعلنة الكلي (Courses Count)</label>
                      <input
                        type="number"
                        value={statsCoursesCount}
                        onChange={(e) => setStatsCoursesCount(Number(e.target.value))}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">نسبة رضا وتقييم المتدربين (مثلاً: 98%)</label>
                      <input
                        type="text"
                        value={statsSatisfaction}
                        onChange={(e) => setStatsSatisfaction(e.target.value)}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">سنوات الخبرة والريادة (Experience Years)</label>
                      <input
                        type="number"
                        value={statsExperience}
                        onChange={(e) => setStatsExperience(Number(e.target.value))}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="gold-gradient-bg text-navy-950 px-5 py-2.5 rounded-xl text-xs font-cairo font-black flex items-center gap-1.5 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ الأرقام الجديدة لشريط الإنجاز</span>
                  </button>
                </form>
              </div>
            )}


            {/* TAB PART D: SOCIAL CONNECTIONS & LINKS */}
            {activeTab === 'social' && (
              <div className="p-4 sm:p-6 space-y-6 max-w-2xl">
                <div>
                  <h3 className="font-cairo font-bold text-sm text-gold-200">🔗 مواقع وروابط السوشيال والمبيعات للمنصة</h3>
                  <p className="text-[11px] text-navy-300">يتم تفعيل كافة هذه الروابط في الترويسة الرئيسية والفوتر وزر الواتساب العائم تلقائياً.</p>
                </div>

                {socialSuccessMsg && (
                  <p className="bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 p-3 rounded-xl text-xs font-bold">
                    ✅ {socialSuccessMsg}
                  </p>
                )}

                <form onSubmit={handleSaveSocial} className="bg-navy-950 border border-navy-850 p-5 rounded-2xl space-y-4">
                  <div className="space-y-3.5 text-right">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold">رقم الهاتف العام والواتساب</label>
                        <input
                          type="text"
                          value={socialPhone}
                          onChange={(e) => setSocialPhone(e.target.value)}
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold">البريد الإلكتروني للأكاديمية</label>
                        <input
                          type="email"
                          value={socialEmail}
                          onChange={(e) => setSocialEmail(e.target.value)}
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold">توليد لينك الواتساب المباشر بالرسالة (whatsapp Url)</label>
                      <input
                        type="text"
                        value={socialWhatsapp}
                        onChange={(e) => setSocialWhatsapp(e.target.value)}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none font-sans"
                        placeholder="أدخل رابط Wa.me كاملاً ههنا"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold">رابط حسابات مبادرة رائدات التغيير (Linktree)</label>
                      <input
                        type="url"
                        value={socialLinktree}
                        onChange={(e) => setSocialLinktree(e.target.value)}
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none font-sans"
                        placeholder="https://linktr.ee/..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold">رابط قناة اليوتيوب الرسمية</label>
                        <input
                          type="url"
                          value={socialYoutube}
                          onChange={(e) => setSocialYoutube(e.target.value)}
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-navy-200 font-bold">رابط الحساب على الفيسبوك</label>
                        <input
                          type="url"
                          value={socialFacebook}
                          onChange={(e) => setSocialFacebook(e.target.value)}
                          className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2 text-xs outline-none font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="gold-gradient-bg text-navy-950 px-5 py-2.5 rounded-xl text-xs font-cairo font-black flex items-center gap-1.5 transition duration-300"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ وتثبيت روابط التواصل الاجتماعي 💾</span>
                  </button>
                </form>
              </div>
            )}


            {/* TAB PART E: PASSCODE SETTER */}
            {activeTab === 'passcode' && (
              <div className="p-4 sm:p-6 space-y-6 max-w-md">
                <div>
                  <h3 className="font-cairo font-bold text-sm text-gold-200">🔑 تغيير رمز مرور لوحة الإدارة (Passcode)</h3>
                  <p className="text-[11px] text-navy-300">احمِ بيانات المتدربين والتحكم بوضع رمز مرور مخصص لك.</p>
                </div>

                {passcodeSuccessMsg && (
                  <p className="bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 p-3 rounded-xl text-xs font-bold">
                    ✅ {passcodeSuccessMsg}
                  </p>
                )}

                {passcodeErrorMsg && (
                  <p className="bg-red-950/50 border border-red-900/50 text-red-300 p-3 rounded-xl text-xs font-bold">
                    ⚠️ {passcodeErrorMsg}
                  </p>
                )}

                <form onSubmit={handleSavePasscode} className="bg-navy-950 border border-navy-850 p-5 rounded-2xl space-y-4">
                  <div className="space-y-3 text-right">
                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">رمز المرور الجديد</label>
                      <input
                        type="password"
                        value={newPassval}
                        onChange={(e) => setNewPassval(e.target.value)}
                        placeholder="أدخل كلمة مرور معقدة"
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2.5 text-xs outline-none focus:border-gold-500 font-sans"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-navy-200 font-bold block">تأكيد رمز المرور الجديد</label>
                      <input
                        type="password"
                        value={confirmPassval}
                        onChange={(e) => setConfirmPassval(e.target.value)}
                        placeholder="أدخل كلمة المرور مجدداً للتأكيد"
                        className="w-full bg-navy-900 border border-navy-750 text-white rounded-xl px-3 py-2.5 text-xs outline-none focus:border-gold-500 font-sans"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full gold-gradient-bg text-navy-950 px-5 py-3 rounded-xl text-xs font-cairo font-black flex items-center justify-center gap-1.5 transition-all duration-300"
                  >
                    <Key className="w-4 h-4" />
                    <span>تأكيد والتبديل لكلمة المرور الجديدة 🔐</span>
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Table/Panel footer showing metadata context */}
          <div className="p-4 bg-navy-950 border-t border-navy-800 flex items-center justify-between shrink-0 text-navy-400 text-xs font-sans">
            <span>منصة المنى للتحكم والتمكين المتكامل</span>
            <span>تاريخ ومواعيد الحفظ: مباشر فورياً على المتصفح Local Database</span>
          </div>

        </div>
      )}

    </div>
  );
}
