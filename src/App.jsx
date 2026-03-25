import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ShoppingCart, Zap, Star } from 'lucide-react';

/* ─── Particles Background ──────────────────────────────────────────────────── */
function Particles() {
    const particles = Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
        opacity: 0.12 + Math.random() * 0.3,
    }));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size, height: p.size,
                        left: `${p.x}%`, top: `${p.y}%`,
                        background: p.id % 3 === 0 ? '#22d3ee' : p.id % 3 === 1 ? '#a855f7' : '#25d366',
                        opacity: p.opacity, filter: 'blur(0.5px)',
                        boxShadow: `0 0 ${p.size * 3}px currentColor`,
                    }}
                    animate={{ y: [0, -25, 8, -18, 0], x: [0, 8, -8, 4, 0], opacity: [p.opacity, p.opacity * 1.4, p.opacity * 0.6, p.opacity] }}
                    transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            <div className="absolute top-[-8%] left-[-5%] w-[35%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-green-500/8 blur-[100px]" />
            <div className="absolute top-[40%] left-[40%] w-[20%] h-[25%] rounded-full bg-purple-500/6 blur-[100px]" />
        </div>
    );
}

/* ─── Brand Marquee ─────────────────────────────────────────────────────────── */
function BrandMarquee() {
    const brands = ['FLAVOR HOUSE', 'NICHE STYLE', 'CLOUD STORE', 'URBAN BITES', 'LUXE BEAUTY', 'TECH ZONE', 'PRIME WEAR', 'GLOW UP', 'FRESH MART', 'ELITE SHOP'];
    return (
        <div className="w-full overflow-hidden py-4 relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#040408] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#040408] to-transparent z-10" />
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
                {[...brands, ...brands].map((b, i) => (
                    <span key={i} className="text-white/[0.12] text-sm font-black tracking-[0.2em] uppercase select-none">{b}</span>
                ))}
            </motion.div>
        </div>
    );
}

/* ─── 3D Phone ──────────────────────────────────────────────────────────────── */
function Phone3D({ children }) {
    return (
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ perspective: '1400px' }}
            className="relative"
        >
            <motion.div
                initial={{ rotateY: 16, rotateX: 6 }}
                animate={{ rotateY: [16, 8, 16], rotateX: [6, 2, 6] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative"
            >
                {/* WhatsApp Glow Around Phone */}
                <div className="absolute inset-[-15px] rounded-[60px] bg-[#25d366]/10 blur-[40px] pointer-events-none" />

                {/* Reflection below phone */}
                <div className="absolute -bottom-16 left-[10%] right-[10%] h-[80px] rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(37,211,102,0.12) 0%, transparent 100%)', filter: 'blur(20px)' }}
                />

                {/* Phone shadow */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[70%] h-[25px] bg-black/50 blur-2xl rounded-full" />

                {/* Phone Frame */}
                <div
                    className="relative w-[320px] sm:w-[360px] h-[660px] sm:h-[720px] rounded-[48px] overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, #1a1a2e 0%, #0a0a0f 100%)',
                        border: '8px solid transparent', backgroundClip: 'padding-box',
                        boxShadow: `0 50px 100px rgba(0,0,0,0.95), 0 0 80px rgba(37,211,102,0.15), 0 0 160px rgba(37,211,102,0.06), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1), 10px 0 20px rgba(0,0,0,0.5)`,
                    }}
                >
                    <div className="absolute inset-0 rounded-[40px] pointer-events-none z-[55]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
                    <div className="absolute top-0 right-0 w-[200%] h-32 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent rotate-12 -translate-y-16 translate-x-16 z-[51] pointer-events-none blur-xl" />
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2" style={{ width: '105px', height: '30px', background: 'rgba(0,0,0,0.95)', borderRadius: '18px' }}>
                        <div style={{ width: '10px', height: '10px', background: '#0c0c14', borderRadius: '50%', border: '1px solid #1a1a2a' }} />
                        <div style={{ width: '28px', height: '3.5px', background: '#0c0c14', borderRadius: '2px' }} />
                    </div>
                    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/50 to-[#050505]/50" />
                        {children}
                    </div>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[5px] bg-white/25 rounded-full z-[60]" />
                </div>

                {/* Side buttons */}
                <div className="absolute left-[-9px] top-[125px] w-[4px] h-[30px] rounded-l-full bg-gradient-to-r from-slate-700 to-slate-600" />
                <div className="absolute left-[-9px] top-[170px] w-[4px] h-[55px] rounded-l-full bg-gradient-to-r from-slate-700 to-slate-600" />
                <div className="absolute left-[-9px] top-[240px] w-[4px] h-[55px] rounded-l-full bg-gradient-to-r from-slate-700 to-slate-600" />
                <div className="absolute right-[-9px] top-[170px] w-[4px] h-[70px] rounded-r-full bg-gradient-to-l from-slate-700 to-slate-600" />
            </motion.div>
        </motion.div>
    );
}

/* ─── Testimonials ──────────────────────────────────────────────────────────── */
function Testimonials({ lang }) {
    const isAr = lang === 'ar';
    const reviews = isAr ? [
        { text: 'رفعنا مبيعاتنا 3x في أول أسبوع! 🔥', name: 'سارة م.', role: 'صاحبة متجر عبايات' },
        { text: 'ما عدنا نرد يدوياً على أي طلب ✅', name: 'فهد ع.', role: 'مطعم برجر' },
        { text: 'أفضل استثمار عملناه لمتجرنا 💯', name: 'نورة ك.', role: 'متجر إكسسوارات' },
    ] : [
        { text: 'We tripled sales in the first week! 🔥', name: 'Sarah M.', role: 'Abaya Store Owner' },
        { text: 'We no longer reply manually to any order ✅', name: 'Fahad A.', role: 'Burger Restaurant' },
        { text: 'Best investment we made for our store 💯', name: 'Noura K.', role: 'Accessories Store' },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
            {reviews.map((r, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 backdrop-blur-sm"
                >
                    <div className="flex gap-0.5 mb-2">
                        {[1,2,3,4,5].map(s => <Star key={s} size={11} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-white text-[12px] font-bold leading-relaxed mb-3">"{r.text}"</p>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center text-white text-[10px] font-black">
                            {r.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white text-[11px] font-bold">{r.name}</p>
                            <p className="text-slate-500 text-[10px]">{r.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── App ────────────────────────────────────────────────────────────────────── */
function App() {
    const [view, setView] = useState('landing');
    const [lang, setLang] = useState('ar');
    const isAr = lang === 'ar';

    const startSimulator = (selectedLang) => {
        setLang(selectedLang);
        setView('loading');
        setTimeout(() => setView('simulator'), 2000);
    };

    const t = {
        ar: {
            headline: 'بِع أي منتج لأي عميل — عبر واتساب فقط 🚀',
            pain: 'تعبت من الردود اليدوية؟ 😩\nعملاؤك يسألون وأنت نايم؟\nطلباتك تضيع بين الرسائل؟',
            cta_sub: '👇 شاهد كيف يبيع واتساب بدلاً عنك — تلقائياً',
            btn_ar: 'ابدأ التجربة بالعربية 🇸🇦',
            btn_en: 'Try Demo in English 🇬🇧',
            loading: 'جارٍ تجهيز متجرك...',
            counter: '+500 متجر يبيع الآن عبر واتساب',
        },
        en: {
            headline: 'Sell Anything to Anyone — Only on WhatsApp 🚀',
            pain: 'Tired of manual replies? 😩\nCustomers asking while you\'re asleep?\nOrders getting lost in messages?',
            cta_sub: '👇 See how WhatsApp sells for you — automatically',
            btn_ar: 'ابدأ التجربة بالعربية 🇸🇦',
            btn_en: 'Try Demo in English 🇬🇧',
            loading: 'Building your store...',
            counter: '+500 Stores Selling Now on WhatsApp',
        },
    };
    // Use 'ar' for landing page texts since user hasn't picked yet
    const lt = t.ar;

    return (
        <div className="min-h-screen bg-[#040408] text-white overflow-x-hidden font-cairo selection:bg-cyan-500/30">
            <Particles />

            <AnimatePresence mode="wait">
                {/* ═══════════════════ LANDING PAGE ═══════════════════ */}
                {view === 'landing' && (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        className="min-h-screen flex flex-col items-center relative z-10 px-4 pb-16"
                    >
                        {/* ─ Logo top-left ─ */}
                        <div className="w-full max-w-5xl flex justify-start pt-5 mb-4">
                            <img
                                src="/Logo.png"
                                alt="Elegant Options"
                                className="h-10 w-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </div>

                        {/* ① HEADLINE + PAIN — Top */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7 }}
                            className="text-center max-w-2xl mb-8"
                            dir="rtl"
                        >
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5">
                                <span className="bg-gradient-to-r from-cyan-400 via-white to-green-400 bg-clip-text text-transparent">
                                    {lt.headline}
                                </span>
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base leading-loose whitespace-pre-line mb-4">
                                {lt.pain}
                            </p>
                            <p className="text-cyan-400 font-bold text-sm sm:text-base">
                                {lt.cta_sub}
                            </p>
                        </motion.div>

                        {/* ② 3D PHONE — Center Hero */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.25, duration: 0.8 }}
                            className="mb-10 flex items-center justify-center"
                        >
                            <Phone3D>
                                {/* Static preview inside phone */}
                                <div className="absolute inset-0 flex items-center justify-center z-10 pt-8">
                                    <div className="w-full h-full" dir="rtl">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-[#128C7E] mt-10">
                                            <img
                                                src="/Logo.png"
                                                alt=""
                                                className="w-8 h-8 rounded-full object-cover bg-[#25d366]"
                                                onError={e => { e.target.style.display = 'none'; }}
                                            />
                                            <div className="flex-1 text-right">
                                                <p className="text-white font-bold text-[12px]">متجر واتساب Demo</p>
                                                <p className="text-green-200 text-[9px]">متصل الآن ✓</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 px-3 py-3" style={{ background: '#ECE5DD' }}>
                                            <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] shadow-sm">
                                                <p className="text-gray-800 text-[11px] font-bold">أهلاً! 👋 مرحباً بك</p>
                                                <p className="text-gray-600 text-[9px] mt-0.5">اكتشف منتجاتنا واطلب بكل سهولة 🛍️</p>
                                            </div>
                                            <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-1.5 max-w-[65%] shadow-sm">
                                                <p className="text-gray-800 text-[11px]">تصفح المنتجات 🛍️</p>
                                            </div>
                                            <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                                                <div className="w-full h-16 rounded-lg overflow-hidden mb-1.5 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
                                                    <ShoppingCart size={22} className="text-cyan-400" />
                                                </div>
                                                <p className="text-gray-800 text-[11px] font-bold">🛍️ الكاتلوج</p>
                                            </div>
                                            <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-1.5 max-w-[70%] shadow-sm">
                                                <p className="text-gray-800 text-[9px]">أريد طلب: 2x سماعات + 1x ساعة</p>
                                            </div>
                                            <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] shadow-sm">
                                                <p className="text-gray-800 text-[10px] font-bold">✅ تم تأكيد طلبك!</p>
                                                <p className="text-green-600 text-[9px]">رقم الطلب: #8472</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Phone3D>
                        </motion.div>

                        {/* Language Selection Buttons (CTA) */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 mb-10"
                        >
                            <motion.button
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => startSimulator('ar')}
                                className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-black text-base px-8 py-4 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all overflow-hidden border border-cyan-400/30"
                            >
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                                />
                                <span className="relative z-10">ابدأ التجربة بالعربية 🇸🇦</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => startSimulator('en')}
                                className="relative inline-flex items-center justify-center gap-2 bg-white/[0.06] text-white font-bold text-base px-8 py-4 rounded-2xl border border-white/[0.12] hover:bg-white/[0.1] transition-all"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                <span>Try Demo in English 🇬🇧</span>
                            </motion.button>
                        </motion.div>

                        {/* ③ SOCIAL PROOF — Bottom */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="w-full flex flex-col items-center gap-6 max-w-4xl"
                        >
                            {/* Customer Counter */}
                            <div className="flex items-center gap-2">
                                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                                <span className="text-slate-300 text-sm font-bold mx-2">{lt.counter}</span>
                            </div>

                            {/* Testimonials */}
                            <Testimonials lang="ar" />

                            {/* Brand Marquee */}
                            <BrandMarquee />
                        </motion.div>
                    </motion.div>
                )}

                {/* ═══════════════════ LOADING ═══════════════════ */}
                {view === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center gap-5 relative z-10"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Zap size={44} className="text-cyan-400" />
                        </motion.div>
                        <Loader2 className="w-9 h-9 text-cyan-400 animate-spin" />
                        <p className="text-white font-bold text-lg">{isAr ? 'جارٍ تجهيز متجرك...' : 'Building your store...'}</p>
                        <div className="flex gap-1.5">
                            {[0,1,2].map(i => (
                                <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400" animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══════════════════ SIMULATOR ═══════════════════ */}
                {view === 'simulator' && (
                    <motion.div
                        key="simulator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        {/* Header above phone */}
                        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-5">
                            <img src="/Logo.png" alt="Logo" className="h-9 w-auto mx-auto mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]" onError={e => { e.target.style.display = 'none'; }} />
                            <h1 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                                {isAr ? 'جرّب تجربة البيع عبر واتساب' : 'Experience WhatsApp Selling'}
                            </h1>
                        </motion.div>

                        {/* Phone with Simulator */}
                        <div
                            className="relative w-[375px] h-[750px] rounded-[55px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(145deg, #1a1a2e, #0a0a0f)',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(37,211,102,0.12), 0 0 0 1px rgba(255,255,255,0.07)',
                                border: '7px solid transparent', backgroundClip: 'padding-box',
                            }}
                        >
                            <div className="absolute inset-0 rounded-[48px] pointer-events-none z-[55]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2" style={{ width: '105px', height: '30px', background: 'rgba(0,0,0,0.95)', borderRadius: '18px' }}>
                                <div style={{ width: '10px', height: '10px', background: '#0c0c14', borderRadius: '50%', border: '1px solid #1a1a2a' }} />
                                <div style={{ width: '28px', height: '3.5px', background: '#0c0c14', borderRadius: '2px' }} />
                            </div>
                            <div className="absolute inset-0 bg-[#050505] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/50 to-[#050505]/50" />
                                <ChatSimulator
                                    config={{ projectName: isAr ? 'متجر واتساب Demo' : 'WhatsApp Store Demo', niche: 'products', platform: 'whatsapp', lang, goals: ['lost_sales'] }}
                                    onBack={() => setView('landing')}
                                />
                            </div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[5px] bg-white/25 rounded-full z-[60]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
