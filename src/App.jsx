import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ShoppingCart, Zap, Star, Bot, Shield } from 'lucide-react';

/* ═══════════════════ PARTICLES ═══════════════════════════════════════════════ */
function Particles() {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i, size: 1.5 + Math.random() * 4,
        x: Math.random() * 100, y: Math.random() * 100,
        dur: 6 + Math.random() * 12, delay: Math.random() * 6,
        op: 0.08 + Math.random() * 0.2,
    }));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
                <motion.div key={p.id} className="absolute rounded-full"
                    style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`,
                        background: p.id % 4 === 0 ? '#22d3ee' : p.id % 4 === 1 ? '#a855f7' : p.id % 4 === 2 ? '#25d366' : '#3b82f6',
                        opacity: p.op, boxShadow: `0 0 ${p.size * 4}px currentColor` }}
                    animate={{ y: [0, -18, 5, -12, 0], x: [0, 5, -5, 3, 0] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            {/* Ambient glows */}
            <div className="absolute top-[5%] left-[10%] w-[30%] h-[35%] rounded-full bg-cyan-500/[0.06] blur-[120px]" />
            <div className="absolute bottom-[5%] right-[5%] w-[30%] h-[30%] rounded-full bg-green-500/[0.05] blur-[100px]" />
            <div className="absolute top-[45%] left-[50%] w-[20%] h-[20%] rounded-full bg-purple-500/[0.04] blur-[80px]" />
        </div>
    );
}

/* ═══════════════════ BRAND MARQUEE ═══════════════════════════════════════════ */
function BrandMarquee() {
    const brands = ['FLAVOR HOUSE', 'NICHE STYLE', 'CLOUD STORE', 'URBAN BITES', 'LUXE BEAUTY', 'TECH ZONE', 'PRIME WEAR', 'GLOW UP', 'FRESH MART', 'ELITE SHOP'];
    return (
        <div className="w-full overflow-hidden py-3 relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
            <motion.div className="flex gap-14 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
                {[...brands, ...brands].map((b, i) => (
                    <span key={i} className="text-white/[0.08] text-xs font-black tracking-[0.25em] uppercase select-none">{b}</span>
                ))}
            </motion.div>
        </div>
    );
}

/* ═══════════════════ TESTIMONIALS ════════════════════════════════════════════ */
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
                    transition={{ delay: 0.7 + i * 0.12 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-md hover:border-cyan-500/20 transition-all duration-300">
                    <div className="flex gap-0.5 mb-2">
                        {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                    <p className="text-white/90 text-[12px] font-bold leading-relaxed mb-3">"{r.text}"</p>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center text-white text-[9px] font-black">
                            {r.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white/80 text-[10px] font-bold">{r.name}</p>
                            <p className="text-slate-500 text-[9px]">{r.role}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ═══════════════════ 3D PHONE ════════════════════════════════════════════════ */
function Phone3D({ children }) {
    return (
        <div className="relative w-full flex items-center justify-center py-2">
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
            >
                {/* Green glow behind phone */}
                <div className="absolute inset-[-25px] rounded-[65px] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse, rgba(37,211,102,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)' }} />

                {/* Reflection */}
                <div className="absolute -bottom-16 left-[8%] right-[8%] h-[80px] rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(37,211,102,0.08) 0%, transparent 100%)', filter: 'blur(20px)' }} />

                {/* Shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-[18px] bg-black/40 blur-xl rounded-full" />

                {/* Phone Frame — realistic iPhone */}
                <div
                    className="relative w-[300px] sm:w-[340px] h-[620px] sm:h-[690px] rounded-[46px] overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, #2a2a3e, #1a1a28, #0f0f18)',
                        border: '6px solid #2a2a3e',
                        boxShadow: `
                            0 50px 100px rgba(0,0,0,0.95),
                            0 0 80px rgba(37,211,102,0.1),
                            0 0 0 1px rgba(255,255,255,0.05),
                            inset 0 1px 0 rgba(255,255,255,0.08),
                            inset 0 -1px 0 rgba(0,0,0,0.5)
                        `,
                        transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                    }}
                >
                    {/* Left edge highlight (light source) */}
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-white/[0.15] via-white/[0.06] to-transparent z-[56] pointer-events-none" />

                    {/* Top edge highlight */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/[0.12] via-white/[0.04] to-transparent z-[56] pointer-events-none" />

                    {/* Screen glare */}
                    <div className="absolute top-0 left-0 w-[45%] h-[35%] bg-gradient-to-br from-white/[0.04] to-transparent z-[51] pointer-events-none rounded-tl-[40px]" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2"
                        style={{ width: '100px', height: '28px', background: '#000000', borderRadius: '16px', boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)' }}>
                        <div className="w-[10px] h-[10px] rounded-full bg-[#0a0a12] border border-[#1a1a28]" />
                        <div className="w-[25px] h-[3px] rounded-full bg-[#0a0a12]" />
                    </div>

                    {/* Screen — WhatsApp BG fills the whole screen */}
                    <div className="absolute inset-0 overflow-hidden rounded-[40px]">
                        {children}
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full z-[60]" />
                </div>

                {/* Physical buttons */}
                <div className="absolute left-[-8px] top-[120px] w-[3px] h-[28px] rounded-l-full bg-[#2a2a3e]" style={{ boxShadow: '1px 0 3px rgba(0,0,0,0.4)' }} />
                <div className="absolute left-[-8px] top-[160px] w-[3px] h-[50px] rounded-l-full bg-[#2a2a3e]" style={{ boxShadow: '1px 0 3px rgba(0,0,0,0.4)' }} />
                <div className="absolute left-[-8px] top-[220px] w-[3px] h-[50px] rounded-l-full bg-[#2a2a3e]" style={{ boxShadow: '1px 0 3px rgba(0,0,0,0.4)' }} />
                <div className="absolute right-[-8px] top-[165px] w-[3px] h-[65px] rounded-r-full bg-[#2a2a3e]" style={{ boxShadow: '-1px 0 3px rgba(0,0,0,0.4)' }} />
            </motion.div>
        </div>
    );
}

/* ═══════════════════ PHONE PREVIEW ═══════════════════════════════════════════ */
function PhonePreview() {
    return (
        <div className="w-full h-full flex flex-col" style={{ background: '#ECE5DD' }} dir="rtl">
            {/* WA header */}
            <div className="flex items-center gap-2 px-3 py-2.5 mt-[38px]" style={{ background: 'linear-gradient(180deg, #128C7E, #075E54)' }}>
                <img src="/Logo.png" alt="" className="w-8 h-8 rounded-full object-cover bg-[#25d366] border border-white/20"
                    onError={e => { e.target.outerHTML = '<div class="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-black border border-white/20">م</div>'; }} />
                <div className="flex-1 text-right">
                    <p className="text-white font-bold text-[12px]">متجر واتساب Demo</p>
                    <p className="text-green-200/80 text-[9px]">متصل الآن ✓</p>
                </div>
            </div>
            {/* Chat area */}
            <div className="flex flex-col gap-[6px] px-3 py-3 flex-1">
                <BubbleBot text="أهلاً 👋 كيف نقدر نخدمك اليوم؟" />
                <div className="flex flex-wrap gap-1.5 justify-end mt-0.5">
                    {['🛍️ تصفح المنتجات', '🔥 العروض'].map((b,i) => (
                        <div key={i} className="bg-white border border-[#128C7E]/20 text-[#128C7E] text-[9px] font-bold px-2.5 py-1 rounded-full">{b}</div>
                    ))}
                </div>
                <BubbleUser text="تصفح المنتجات 🛍️" />
                <BubbleBot text="بكل سرور! اختر من منتجاتنا 👇" />
                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-2 py-2 max-w-[78%] shadow-sm">
                    <div className="w-full h-[50px] rounded-lg overflow-hidden mb-1 bg-gradient-to-br from-[#128C7E]/20 to-[#25d366]/10 flex items-center justify-center">
                        <ShoppingCart size={16} className="text-[#128C7E]" />
                    </div>
                    <p className="text-gray-800 text-[9px] font-bold">🛍️ الكاتلوج الذكي</p>
                    <p className="text-gray-500 text-[8px]">8 منتجات متوفرة</p>
                </div>
                <BubbleUser text="أريد: 2x سماعات + 1x ساعة" />
                <BubbleBot text="✅ تم استلام طلبك!\nرقم الطلب: #8472" />
            </div>
        </div>
    );
}

function BubbleBot({ text }) {
    return (
        <div className="self-start bg-white rounded-2xl rounded-tl-[4px] px-2.5 py-1.5 max-w-[78%] shadow-sm">
            <p className="text-gray-800 text-[10px] leading-relaxed whitespace-pre-line">{text}</p>
            <p className="text-gray-400 text-[7px] text-left mt-0.5">10:30 ص</p>
        </div>
    );
}
function BubbleUser({ text }) {
    return (
        <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-[4px] px-2.5 py-1.5 max-w-[65%] shadow-sm">
            <p className="text-gray-800 text-[10px]">{text}</p>
            <div className="flex items-center justify-end gap-0.5 mt-0.5">
                <p className="text-gray-500 text-[7px]">10:31 ص</p>
                <svg width="12" height="7" viewBox="0 0 16 9" fill="#53bdeb"><path d="M15 1L5.5 8 3 5.5M11 1L1.5 8"/></svg>
            </div>
        </div>
    );
}

/* ═══════════════════ APP ═══════════════════════════════════════════════════════ */
function App() {
    const [view, setView] = useState('landing');
    const [lang, setLang] = useState('ar');
    const [projectName, setProjectName] = useState('');
    const [nameActive, setNameActive] = useState(false);
    const isAr = lang === 'ar';

    const startSimulator = () => {
        const name = projectName.trim() || (isAr ? 'متجر واتساب Demo' : 'WhatsApp Store Demo');
        setProjectName(name);
        setView('loading');
        setTimeout(() => setView('simulator'), 2200);
    };

    const t = isAr ? {
        headline: 'حوّل واتساب إلى متجر يبيع لك 24/7 — بدون موظفين',
        sub: 'اعرض منتجاتك، استقبل الطلبات، وأغلق البيع تلقائياً عبر الكاتلوج الذكي',
        pain1: '⏳ تضيع طلبات بسبب تأخر الرد؟',
        pain2: '🔁 العملاء يسألون نفس الأسئلة يومياً؟',
        pain3: '📱 ما عندك طريقة سهلة تعرض منتجاتك؟',
        solution: 'واتساب يتحول من دردشة… إلى ماكينة مبيعات 🚀',
        nameLabel: 'ما اسم مشروعك؟',
        namePlaceholder: 'مثال: مطعم / متجر / عيادة',
        btn: '🚀 جرّب المتجر الآن',
        loading: 'جارٍ بناء متجرك...',
        counter: 'أكثر من 500+ متجر يستخدم النظام للبيع عبر واتساب',
        trust: '⭐ موثوق من +500 نشاط تجاري',
        ai: '🤖 مدعوم بالذكاء الاصطناعي للرد والإقناع',
    } : {
        headline: 'Turn WhatsApp Into a Store That Sells 24/7 — No Staff Needed',
        sub: 'Display products, receive orders, and close sales automatically via smart catalog',
        pain1: '⏳ Losing orders because of late replies?',
        pain2: '🔁 Customers asking the same questions daily?',
        pain3: '📱 No easy way to showcase your products?',
        solution: 'WhatsApp transforms from chat… to a sales machine 🚀',
        nameLabel: 'What is your project name?',
        namePlaceholder: 'e.g., Restaurant / Store / Clinic',
        btn: '🚀 Try the Store Now',
        loading: 'Building your store...',
        counter: '500+ stores already selling via WhatsApp',
        trust: '⭐ Trusted by 500+ businesses',
        ai: '🤖 AI-powered for smart replies & conversions',
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden font-cairo selection:bg-cyan-500/30">
            <Particles />

            <AnimatePresence mode="wait">
                {/* ═══════════ LANDING ═══════════ */}
                {view === 'landing' && (
                    <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        className="min-h-screen flex flex-col items-center relative z-10 px-4 pt-6 pb-16"
                        dir={isAr ? 'rtl' : 'ltr'}>

                        {/* ─ Logo + Brand ─ */}
                        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                            className="flex flex-col items-center mb-6">
                            <img src="/Logo.png" alt="Elegant Options" className="h-11 w-auto mb-2 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                                onError={e => { e.target.style.display = 'none'; }} />
                            <h2 className="text-white/60 text-[11px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                ELEGANT OPTIONS
                            </h2>
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mt-2" />
                        </motion.div>

                        {/* ─ Language Toggle (glassmorphism) ─ */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
                            className="mb-6">
                            <div className="flex rounded-full p-[3px] border border-white/[0.08]"
                                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}>
                                <button onClick={() => setLang('ar')}
                                    className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${lang === 'ar'
                                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                        : 'text-white/40 hover:text-white/70'}`}>
                                    العربية
                                </button>
                                <button onClick={() => setLang('en')}
                                    className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 ${lang === 'en'
                                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                                        : 'text-white/40 hover:text-white/70'}`}
                                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    English
                                </button>
                            </div>
                        </motion.div>

                        {/* ─ Headline ─ */}
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
                            className="text-center max-w-2xl mb-3">
                            <h1 className="text-[26px] sm:text-[32px] lg:text-[40px] font-black leading-[1.3] text-white">
                                {t.headline}
                            </h1>
                        </motion.div>

                        {/* ─ Subheadline ─ */}
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
                            className="text-white/50 text-sm sm:text-[15px] text-center max-w-xl mb-6 leading-relaxed">
                            {t.sub}
                        </motion.p>

                        {/* ─ Pain Points ─ */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-center mb-2 max-w-md space-y-1">
                            {[t.pain1, t.pain2, t.pain3].map((p, i) => (
                                <motion.p key={i} initial={{ opacity: 0, x: isAr ? 15 : -15 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 + i * 0.08 }}
                                    className="text-white/40 text-[13px] leading-relaxed">
                                    {p}
                                </motion.p>
                            ))}
                        </motion.div>

                        {/* ─ Solution Line ─ */}
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                            className="text-cyan-400 font-bold text-[14px] text-center mb-6">
                            {t.solution}
                        </motion.p>

                        {/* ─ Project Name Input (glassmorphism) ─ */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="w-full max-w-sm mb-5">
                            <label className="block text-white/50 text-[12px] font-bold mb-2 text-center">{t.nameLabel}</label>
                            <motion.div
                                animate={nameActive ? { boxShadow: '0 0 25px rgba(6,182,212,0.15), 0 0 0 1px rgba(6,182,212,0.3)' } : { boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 0 1px rgba(255,255,255,0.08)' }}
                                className="rounded-xl overflow-hidden"
                                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)' }}
                            >
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={e => setProjectName(e.target.value)}
                                    onFocus={() => setNameActive(true)}
                                    onBlur={() => setNameActive(false)}
                                    placeholder={t.namePlaceholder}
                                    className="w-full bg-transparent px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none text-center"
                                    dir={isAr ? 'rtl' : 'ltr'}
                                />
                            </motion.div>
                        </motion.div>

                        {/* ─ 3D Phone ─ */}
                        <motion.div initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                            className="w-full max-w-md mb-4">
                            <Phone3D>
                                <PhonePreview />
                            </Phone3D>
                        </motion.div>

                        {/* ─ CTA Button (glassmorphism + glow) ─ */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                            whileHover={{ scale: 1.04, y: -3, boxShadow: '0 0 60px rgba(6,182,212,0.5), 0 0 120px rgba(37,211,102,0.2)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={startSimulator}
                            className="relative inline-flex items-center justify-center gap-2.5 text-white font-black text-lg px-12 py-4.5 rounded-2xl transition-all overflow-hidden mb-4"
                            style={{
                                background: 'linear-gradient(135deg, #06b6d4, #22c55e)',
                                boxShadow: '0 0 40px rgba(6,182,212,0.4), 0 0 80px rgba(37,211,102,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                                border: '1px solid rgba(255,255,255,0.15)',
                            }}
                        >
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1.5 }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />
                            <span className="relative z-10 text-[17px]">{t.btn}</span>
                        </motion.button>

                        {/* ─ Trust Badges ─ */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-3 mb-8">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06]"
                                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
                                <Shield size={12} className="text-cyan-400" />
                                <span className="text-white/50 text-[11px] font-bold">{t.trust}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06]"
                                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
                                <Bot size={12} className="text-green-400" />
                                <span className="text-white/50 text-[11px] font-bold">{t.ai}</span>
                            </div>
                        </motion.div>

                        {/* ─ Social Proof ─ */}
                        <div className="w-full flex flex-col items-center gap-5 max-w-4xl">
                            <div className="flex items-center gap-2">
                                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                                <span className="text-white/40 text-[12px] font-bold mx-1">{t.counter}</span>
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
                        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}>
                            <Zap size={44} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
                        </motion.div>
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
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

                        {/* Simulator Phone */}
                        <div className="relative w-[375px] h-[750px] rounded-[55px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(145deg, #1a1a2e, #0a0a0f)',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.9), 0 0 50px rgba(37,211,102,0.1), 0 0 0 1px rgba(255,255,255,0.06)',
                                border: '6px solid #1a1a28',
                            }}>
                            <div className="absolute inset-0 rounded-[49px] pointer-events-none z-[55]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }} />
                            {/* Dynamic Island */}
                            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2"
                                style={{ width: '100px', height: '28px', background: '#000', borderRadius: '16px' }}>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#0a0a12] border border-[#1a1a28]" />
                                <div className="w-[25px] h-[3px] rounded-full bg-[#0a0a12]" />
                            </div>
                            <div className="absolute inset-0 overflow-hidden rounded-[49px]">
                                <ChatSimulator
                                    config={{ projectName, niche: 'products', platform: 'whatsapp', lang, goals: ['lost_sales'] }}
                                    onBack={() => setView('landing')}
                                />
                            </div>
                            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full z-[60]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
