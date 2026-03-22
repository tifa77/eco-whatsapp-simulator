import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, MessageCircle, Instagram, MessageSquare, ArrowRight } from 'lucide-react';

function App() {
  const [view, setView] = useState('setup'); // setup, loading, simulator
  const [lang, setLang] = useState('ar');
  const [projectName, setProjectName] = useState('');
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState('whatsapp');

  const niches = [
    { id: 'restaurant', ar: 'مطعم / كافيه 🍔', en: 'Restaurant / Cafe 🍔' },
    { id: 'clinic', ar: 'عيادة / مركز طبي 🩺', en: 'Clinic / Medical 🩺' },
    { id: 'ecommerce', ar: 'متجر إلكتروني 🛍️', en: 'E-commerce 🛍️' },
    { id: 'retail', ar: 'محل تجاري 🏬', en: 'Retail Store 🏬' },
    { id: 'travel', ar: 'مكتب سفريات ✈️', en: 'Travel Agency ✈️' },
    { id: 'consulting', ar: 'استشارات وتدريب 💡', en: 'Consulting & Training 💡' },
    { id: 'services', ar: 'بيع الخدمات ✨', en: 'Selling Services ✨' },
    { id: 'realestate', ar: 'مكتب عقاري 🏢', en: 'Real Estate 🏢' },
  ];

  // Dynamic Placeholder Logic
  const getPlaceholder = () => {
    if (!niche) return lang === 'ar' ? 'مثال: عيادة ابتسامتك، متجر الأناقة...' : 'e.g., Smile Clinic, Elegance Store...';

    const examples = {
      'restaurant': lang === 'ar' ? 'مثال: مطعم البيك، ستاربكس...' : 'e.g., The Burger Joint, Starbucks...',
      'clinic': lang === 'ar' ? 'مثال: عيادة ابتسامتك، مجمع الشفاء...' : 'e.g., Smile Dental, Care Clinic...',
      'ecommerce': lang === 'ar' ? 'مثال: متجر نون، نمشي...' : 'e.g., Amazon, Fashion Nova...',
      'retail': lang === 'ar' ? 'مثال: سوبر ماركت، معرض سيارات...' : 'e.g., Supermarket, Auto Showroom...',
      'travel': lang === 'ar' ? 'مثال: سفريات النورس، بوكينج...' : 'e.g., Falcon Travel, Booking.com...',
      'consulting': lang === 'ar' ? 'مثال: مركز الإبداع، استشارات مالية...' : 'e.g., Horizon Consulting, Legal Firm...',
      'services': lang === 'ar' ? 'مثال: وكالة تسويق، صيانة منزلية...' : 'e.g., Marketing Agency, Home Repair...',
      'realestate': lang === 'ar' ? 'مثال: عقارات الممزر، مساكن...' : 'e.g., Elite Real Estate, Homes Co...',
    };
    return examples[niche] || (lang === 'ar' ? 'اسم مشروعك...' : 'Your Project Name...');
  };

  const handleStart = () => {
    if (!projectName.trim() || !niche) return;
    setView('loading');
    setTimeout(() => {
      setView('simulator');
    }, 2500);
  };

  const t = {
    title: lang === 'ar' ? 'إعداد عرض Demo' : 'Demo Setup',
    subtitle: lang === 'ar' ? 'جرّب الآن نموذجاً تفاعلياً لنظام الأتمتة الذي نُصمّمه خصيصاً لمشروعك ✨' : 'Try an interactive automation model tailored for your business ✨',
    projNameLabel: lang === 'ar' ? 'اسم المشروع' : 'Project Name',
    nicheLabel: lang === 'ar' ? 'اختر ما يُقارب نشاط مشروعك' : 'Select your business type',
    startBtn: lang === 'ar' ? 'ابدأ العرض' : 'Start Simulator',
    loadingTitle: lang === 'ar' ? 'جاري إعداد عرض Demo...' : 'Building your Demo...',
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 md:p-8 font-cairo overflow-hidden selection:bg-cyan-500/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* Background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      {/* Language Toggle */}
      <AnimatePresence>
        {view === 'setup' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="z-50 relative flex bg-black/60 backdrop-blur-xl rounded-full p-1.5 border border-white/10 mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang('en')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 font-bold relative overflow-hidden ${lang === 'en' ? 'text-white' : 'text-gray-400 hover:text-white'}`} style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {lang === 'en' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-0 rounded-full" />}
              <span className="relative z-10">English</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang('ar')}
              className={`px-6 py-2 rounded-full transition-colors duration-300 font-bold relative overflow-hidden ${lang === 'ar' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {lang === 'ar' && <motion.div layoutId="activeTab" className="absolute inset-0 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-0 rounded-full" />}
              <span className="relative z-10">العربية</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium External Header */}
      <div className="z-10 relative text-center mb-6 max-w-2xl px-4 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
            <img src="/logo.png" alt="Elegant Options" className="h-12 md:h-16 w-auto mb-3 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" onError={(e) => { e.target.style.display = 'none'; }} />
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 leading-tight drop-shadow-sm">
              {lang === 'ar' ? 'Elegant Options | حلول الأتمتة الذكية 🚀' : 'Elegant Options | Smart Automation Solutions 🚀'}
            </h1>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-lg mt-1">
              {lang === 'ar'
                ? 'وداعاً لضياع العملاء بسبب التأخير في الرد. أتمتة ذكية تحول المحادثات إلى صفقات مغلقة على مدار الساعة ⚡'
                : 'Say goodbye to losing customers due to slow replies. Smart automation that converts chats into closed deals 24/7 ⚡'}
            </p>
        </motion.div>
      </div>

      {/* iPhone 17 Pro Max Container */}
      <div className="z-10 relative w-full max-w-[400px] h-[800px] bg-[#0A0A0A] rounded-[55px] flex flex-col overflow-hidden"
        style={{
          border: '6px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(6,182,212,0.15), 0 0 120px rgba(6,182,212,0.08), inset 0 0 20px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.1)',
          outline: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Titanium Frame Edge */}
        <div className="absolute inset-0 rounded-[55px] pointer-events-none z-[55]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 2px rgba(0,0,0,0.4)' }} />

        {/* Screen Glass Glare */}
        <div className="absolute top-0 right-0 w-[200%] h-40 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent rotate-12 -translate-y-20 translate-x-16 z-[51] pointer-events-none blur-2xl" />
        <div className="absolute top-6 left-4 w-24 h-24 bg-cyan-400/[0.03] rounded-full blur-3xl pointer-events-none z-[51]" />

        {/* Camera Notch / Dynamic Island */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2.5"
          style={{
            width: '120px',
            height: '34px',
            background: 'rgba(0,0,0,0.85)',
            borderRadius: '20px',
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          {/* Front Camera */}
          <div style={{ width: '12px', height: '12px', background: '#0d0d14', borderRadius: '50%', border: '1px solid #1a1a2a', boxShadow: 'inset 0 0 3px rgba(80,80,140,0.5), 0 0 3px rgba(6,182,212,0.1)' }} />
          {/* Face ID sensor strip */}
          <div style={{ width: '36px', height: '4px', background: '#0d0d14', borderRadius: '2px', border: '0.5px solid #1a1a2a' }} />
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative bg-[#050505] overflow-hidden">

          {/* Wallpaper Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#070E1A] to-[#050505] opacity-50" />

          <AnimatePresence mode="wait">
            {view === 'setup' ? (
              <motion.div key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col p-5 overflow-y-auto pt-14 pb-10 custom-scrollbar">
                <div className="text-center mb-6 flex flex-col items-center">
                  <h1 className="text-xl font-bold text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">{t.title}</h1>
                  <p className="text-gray-300 text-[11px] leading-relaxed max-w-[280px]">{t.subtitle}</p>
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t.projNameLabel}</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder={getPlaceholder()}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-gray-600 text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">{t.nicheLabel}</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {niches.map((n) => (
                      <motion.button
                        key={n.id}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setNiche(n.id)}
                        className={`relative py-3.5 px-3 rounded-2xl text-sm font-semibold transition-all duration-300 border backdrop-blur-sm flex flex-col items-center justify-center gap-1 overflow-hidden
                          ${niche === n.id
                            ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_0_15px_rgba(6,182,212,0.08)]'
                            : 'bg-white/[0.03] border-white/[0.06] text-gray-400 hover:border-white/15 hover:text-gray-200 hover:bg-white/[0.06]'}`}
                      >
                        {niche === n.id && (
                          <motion.div
                            layoutId="nicheGlow"
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-2xl"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10 text-[12px] md:text-[13px] text-center leading-tight">{lang === 'ar' ? n.ar : n.en}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  disabled={!projectName.trim() || !niche}
                  className="w-full mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-5 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all disabled:opacity-40 disabled:cursor-not-allowed group relative overflow-hidden text-[17px] border border-cyan-400/30 hover:-translate-y-1"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 0.5 }}
                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  />
                  <motion.div
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 z-0"
                  />
                  <span className="relative z-10 drop-shadow-md tracking-wide" style={{ fontFamily: 'system-ui, sans-serif' }}>{lang === 'ar' ? 'ابدأ العرض 🚀' : 'Start Simulator 🚀'}</span>
                  <ArrowRight size={22} className={`relative z-10 transform group-hover:translate-x-1.5 transition-transform drop-shadow ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
                </button>
              </motion.div>
            ) : view === 'loading' ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-cyan-400">{t.loadingTitle}</h3>
              </motion.div>
            ) : (
              <motion.div key="simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full pt-0">
                <ChatSimulator key={platform} config={{ projectName, niche, platform, lang }} onBack={() => { setView('setup'); setPlatform('whatsapp'); }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[5px] bg-white/25 rounded-full z-50" />
      </div>
    </div>
  );
}

export default App;
