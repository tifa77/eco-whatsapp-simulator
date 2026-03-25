import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ShoppingCart, Zap, Star } from 'lucide-react';

/* ─── Particles ─────────────────────────────────────────────────────────────── */
function Particles() {
    const particles = Array.from({ length: 24 }).map((_, i) => ({
        id: i, size: 2 + Math.random() * 4,
        x: Math.random() * 100, y: Math.random() * 100,
        dur: 5 + Math.random() * 10, delay: Math.random() * 5,
        op: 0.12 + Math.random() * 0.25,
    }));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
                <motion.div key={p.id} className="absolute rounded-full"
                    style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`,
                        background: p.id % 3 === 0 ? '#22d3ee' : p.id % 3 === 1 ? '#a855f7' : '#25d366',
                        opacity: p.op, boxShadow: `0 0 ${p.size * 3}px currentColor` }}
                    animate={{ y: [0, -20, 6, -14, 0], x: [0, 6, -6, 3, 0] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            <div className="absolute top-[-8%] left-[-5%] w-[35%] h-[40%] rounded-full bg-cyan-500/8 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-green-500/6 blur-[100px]" />
        </div>
    );
}

/* ─── Brand Marquee ─────────────────────────────────────────────────────────── */
function BrandMarquee() {
    const brands = ['FLAVOR HOUSE', 'NICHE STYLE', 'CLOUD STORE', 'URBAN BITES', 'LUXE BEAUTY', 'TECH ZONE', 'PRIME WEAR', 'GLOW UP', 'FRESH MART', 'ELITE SHOP'];
    return (
        <div className="w-full overflow-hidden py-3 relative">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#040408] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#040408] to-transparent z-10" />
            <motion.div className="flex gap-12 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                {[...brands, ...brands].map((b, i) => (
                    <span key={i} className="text-white/[0.1] text-xs font-black tracking-[0.2em] uppercase select-none">{b}</span>
                ))}
            </motion.div>
        </div>
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
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.12 }}
                    className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex gap-0.5 mb-2">
                        {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-white text-[12px] font-bold leading-relaxed mb-3">"{r.text}"</p>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center text-white text-[9px] font-black">
                            {r.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white text-[10px] font-bold">{r.name}</p>
                            <p className="text-slate-500 text-[9px]">{r.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── 3D Phone (fixed: no black half, proper lighting) ──────────────────────── */
function Phone3D({ children }) {
    return (
        <div className="relative w-full flex items-center justify-center">
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
            >
                {/* WhatsApp green glow */}
                <div className="absolute inset-[-20px] rounded-[65px] bg-[#25d366]/8 blur-[50px] pointer-events-none" />

                {/* Reflection */}
                <div className="absolute -bottom-14 left-[12%] right-[12%] h-[70px] rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(37,211,102,0.1) 0%, transparent 100%)', filter: 'blur(18px)' }} />

                {/* Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[65%] h-[20px] bg-black/40 blur-xl rounded-full" />

                {/* Phone — Desktop: perspective tilt, Mobile: flat */}
                <div
                    className="relative w-[300px] sm:w-[340px] h-[620px] sm:h-[690px] rounded-[46px] overflow-hidden"
                    style={{
                        background: '#0a0a0f',
                        border: '7px solid #1a1a28',
                        boxShadow: `
                            0 40px 80px rgba(0,0,0,0.9),
                            0 0 60px rgba(37,211,102,0.12),
                            -15px 0 40px rgba(37,211,102,0.04),
                            15px 0 30px rgba(0,0,0,0.5),
                            0 0 0 1px rgba(255,255,255,0.06),
                            inset 0 1px 0 rgba(255,255,255,0.08)
                        `,
                        transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                    }}
                >
                    {/* Left edge light */}
                    <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-white/20 via-white/8 to-white/5 z-[56] pointer-events-none" />

                    {/* Screen glare */}
                    <div className="absolute top-0 left-0 w-[60%] h-[50%] bg-gradient-to-br from-white/[0.06] to-transparent z-[51] pointer-events-none" />

                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2"
                        style={{ width: '100px', height: '28px', background: 'rgba(0,0,0,0.95)', borderRadius: '16px' }}>
                        <div style={{ width: '9px', height: '9px', background: '#0c0c14', borderRadius: '50%', border: '1px solid #1a1a2a' }} />
                        <div style={{ width: '26px', height: '3px', background: '#0c0c14', borderRadius: '2px' }} />
                    </div>

                    {/* Screen content — FULL, no black gaps */}
                    <div className="absolute inset-0 overflow-hidden bg-[#ECE5DD]">
                        {children}
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[4px] bg-black/30 rounded-full z-[60]" />
                </div>
            </motion.div>
        </div>
    );
}

/* ─── Static phone preview content ──────────────────────────────────────────── */
function PhonePreview() {
    return (
        <div className="w-full h-full flex flex-col" dir="rtl">
            {/* WA header */}
            <div className="flex items-center gap-2 px-3 py-2 mt-8" style={{ background: '#128C7E' }}>
                <img src="/Logo.png" alt="" className="w-7 h-7 rounded-full object-cover bg-[#25d366]"
                    onError={e => { e.target.style.display = 'none'; }} />
                <div className="flex-1 text-right">
                    <p className="text-white font-bold text-[11px]">متجر واتساب Demo</p>
                    <p className="text-green-200 text-[8px]">متصل الآن ✓</p>
                </div>
            </div>
            {/* Chat bubbles */}
            <div className="flex flex-col gap-1.5 px-3 py-3 flex-1">
                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-1.5 max-w-[75%] shadow-sm">
                    <p className="text-gray-800 text-[10px] font-bold">أهلاً! 👋 مرحباً بك</p>
                    <p className="text-gray-600 text-[8px] mt-0.5">اكتشف منتجاتنا واطلب بكل سهولة 🛍️</p>
                </div>
                <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-1.5 max-w-[60%] shadow-sm">
                    <p className="text-gray-800 text-[10px]">تصفح المنتجات 🛍️</p>
                </div>
                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-2 py-2 max-w-[80%] shadow-sm">
                    <div className="w-full h-14 rounded-lg overflow-hidden mb-1 bg-gradient-to-br from-cyan-900/80 to-blue-900/80 flex items-center justify-center">
                        <ShoppingCart size={18} className="text-cyan-400" />
                    </div>
                    <p className="text-gray-800 text-[10px] font-bold">🛍️ الكاتلوج</p>
                </div>
                <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-1.5 max-w-[65%] shadow-sm">
                    <p className="text-gray-800 text-[8px]">أريد طلب: 2x سماعات + 1x ساعة</p>
                </div>
                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-1.5 max-w-[70%] shadow-sm">
                    <p className="text-gray-800 text-[9px] font-bold">✅ تم تأكيد طلبك!</p>
                    <p className="text-green-600 text-[8px]">رقم الطلب: #8472</p>
                </div>
                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-1.5 max-w-[72%] shadow-sm">
                    <p className="text-gray-800 text-[9px]">شكراً لتسوقك معنا! 🌟</p>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════ APP ═══════════════════════════════════════════════════════ */
function App() {
    const [view, setView] = useState('landing');
    const [lang, setLang] = useState('ar');
    const [projectName, setProjectName] = useState('');
    const isAr = lang === 'ar';

    const startSimulator = () => {
        const name = projectName.trim() || (isAr ? 'متجر واتساب Demo' : 'WhatsApp Store Demo');
        setProjectName(name);
        setView('loading');
        setTimeout(() => setView('simulator'), 2000);
    };

    const t = isAr ? {
        headline: 'بِع أي منتج لأي عميل — عبر واتساب فقط 🚀',
        pain1: '😩 تعبت من الردود اليدوية طوال اليوم؟',
        pain2: '📦 طلبات تضيع بين الرسائل؟',
        pain3: '🌙 عملاؤك يسألون وأنت نايم؟',
        painCta: '← واتساب يبيع بدلاً عنك — تلقائياً، 24/7',
        nameLabel: 'ما اسم متجرك أو مشروعك؟ 🏪',
        namePlaceholder: 'مثال: متجر الأناقة، مطعم البيك...',
        btn: 'جرّب المحاكي الآن 🚀',
        loading: 'جارٍ تجهيز متجرك...',
        counter: '+500 متجر يبيع الآن عبر واتساب',
    } : {
        headline: 'Sell Anything to Anyone — Only on WhatsApp 🚀',
        pain1: '😩 Tired of replying manually all day?',
        pain2: '📦 Orders getting lost in messages?',
        pain3: '🌙 Customers asking while you sleep?',
        painCta: '← WhatsApp sells for you — automatically, 24/7',
        nameLabel: 'What is your store or project name? 🏪',
        namePlaceholder: 'e.g., Elegance Store, The Burger Joint...',
        btn: 'Try the Demo Now 🚀',
        loading: 'Building your store...',
        counter: '+500 Stores Selling Now on WhatsApp',
    };

    return (
        <div className="min-h-screen bg-[#040408] text-white overflow-x-hidden font-cairo selection:bg-cyan-500/30">
            <Particles />

            <AnimatePresence mode="wait">
                {/* ═══════════ LANDING ═══════════ */}
                {view === 'landing' && (
                    <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center relative z-10 px-4 pt-8 pb-16"
                        dir={isAr ? 'rtl' : 'ltr'}>

                        {/* ① Logo + Company Name — centered top */}
                        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                            className="flex flex-col items-center mb-5">
                            <img src="/Logo.png" alt="Elegant Options" className="h-12 w-auto mb-2 drop-shadow-[0_0_18px_rgba(6,182,212,0.5)]"
                                onError={e => { e.target.style.display = 'none'; }} />
                            <h2 className="text-white text-sm font-bold tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                ELEGANT OPTIONS
                            </h2>
                            <div className="w-16 h-[1px] bg-white/10 mt-2" />
                        </motion.div>

                        {/* ② Headline */}
                        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-black text-center leading-tight mb-4 max-w-2xl text-white">
                            {t.headline}
                        </motion.h1>

                        {/* ③ Language Toggle */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                            className="flex bg-white/[0.06] rounded-full p-1 border border-white/[0.08] mb-5">
                            <button onClick={() => setLang('ar')}
                                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'ar' ? 'bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'}`}>
                                العربية
                            </button>
                            <button onClick={() => setLang('en')}
                                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'}`}
                                style={{ fontFamily: 'system-ui, sans-serif' }}>
                                English
                            </button>
                        </motion.div>

                        {/* ④ Pain Points */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-center mb-6 max-w-lg">
                            <p className="text-slate-400 text-sm leading-loose">{t.pain1}</p>
                            <p className="text-slate-400 text-sm leading-loose">{t.pain2}</p>
                            <p className="text-slate-400 text-sm leading-loose mb-3">{t.pain3}</p>
                            <p className="text-cyan-400 font-bold text-sm">{t.painCta}</p>
                        </motion.div>

                        {/* Project Name Input */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                            className="w-full max-w-sm mb-5">
                            <label className="block text-slate-300 text-xs font-bold mb-2 text-center">{t.nameLabel}</label>
                            <input
                                type="text"
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                                placeholder={t.namePlaceholder}
                                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all text-center"
                                dir={isAr ? 'rtl' : 'ltr'}
                            />
                        </motion.div>

                        {/* ⑤ 3D Phone */}
                        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
                            className="w-full max-w-md mb-6">
                            <Phone3D>
                                <PhonePreview />
                            </Phone3D>
                        </motion.div>

                        {/* ⑥ CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={startSimulator}
                            className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all overflow-hidden border border-cyan-400/30 mb-10"
                        >
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                            />
                            <ShoppingCart size={20} className="relative z-10" />
                            <span className="relative z-10">{t.btn}</span>
                        </motion.button>

                        {/* ⑦ Social Proof */}
                        <div className="w-full flex flex-col items-center gap-5 max-w-4xl">
                            <div className="flex items-center gap-2">
                                {[1,2,3,4,5].map(i => <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />)}
                                <span className="text-slate-300 text-sm font-bold mx-1">{t.counter}</span>
                            </div>
                            <Testimonials lang={lang} />
                            <BrandMarquee />
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ LOADING ═══════════ */}
                {view === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center gap-5 relative z-10">
                        <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}>
                            <Zap size={44} className="text-cyan-400" />
                        </motion.div>
                        <Loader2 className="w-9 h-9 text-cyan-400 animate-spin" />
                        <p className="text-white font-bold text-lg">{t.loading}</p>
                        <div className="flex gap-1.5">
                            {[0,1,2].map(i => (
                                <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400"
                                    animate={{ y: [0, -10, 0] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ SIMULATOR ═══════════ */}
                {view === 'simulator' && (
                    <motion.div key="simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
                        dir={isAr ? 'rtl' : 'ltr'}>
                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
                            <img src="/Logo.png" alt="Logo" className="h-8 w-auto mx-auto mb-1.5 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                                onError={e => { e.target.style.display = 'none'; }} />
                            <h1 className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                                {isAr ? 'جرّب تجربة البيع عبر واتساب' : 'Experience WhatsApp Selling'}
                            </h1>
                        </motion.div>

                        {/* Phone */}
                        <div className="relative w-[375px] h-[750px] rounded-[55px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(145deg, #1a1a2e, #0a0a0f)',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 50px rgba(37,211,102,0.1), 0 0 0 1px rgba(255,255,255,0.06)',
                                border: '7px solid #1a1a28',
                            }}>
                            <div className="absolute inset-0 rounded-[48px] pointer-events-none z-[55]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }} />
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2"
                                style={{ width: '105px', height: '30px', background: 'rgba(0,0,0,0.95)', borderRadius: '18px' }}>
                                <div style={{ width: '10px', height: '10px', background: '#0c0c14', borderRadius: '50%', border: '1px solid #1a1a2a' }} />
                                <div style={{ width: '28px', height: '3.5px', background: '#0c0c14', borderRadius: '2px' }} />
                            </div>
                            <div className="absolute inset-0 bg-[#050505] overflow-hidden">
                                <ChatSimulator
                                    config={{ projectName, niche: 'products', platform: 'whatsapp', lang, goals: ['lost_sales'] }}
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
