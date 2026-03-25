import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ArrowRight, ShoppingCart, Zap, Star } from 'lucide-react';

// Animated floating particles
function Particles() {
    const particles = Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        size: 2 + Math.random() * 4,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.4,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: p.id % 3 === 0 ? '#22d3ee' : p.id % 3 === 1 ? '#a855f7' : '#25d366',
                        opacity: p.opacity,
                        filter: 'blur(0.5px)',
                        boxShadow: `0 0 ${p.size * 2}px currentColor`,
                    }}
                    animate={{
                        y: [0, -30, 10, -20, 0],
                        x: [0, 10, -10, 5, 0],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
            {/* Glow blobs */}
            <div className="absolute top-[-8%] left-[-5%] w-[35%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-green-500/10 blur-[100px]" />
            <div className="absolute top-[40%] left-[40%] w-[25%] h-[30%] rounded-full bg-purple-500/8 blur-[100px]" />
        </div>
    );
}

// The 3D iPhone with chat simulator inside
function Phone3D({ children, isLoading }) {
    return (
        <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
                perspective: '1200px',
            }}
            className="relative"
        >
            <motion.div
                initial={{ rotateY: 20, rotateX: 8 }}
                animate={{ rotateY: [20, 12, 20], rotateX: [8, 4, 8] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative"
            >
                {/* Phone shadow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[75%] h-[30px] bg-black/60 blur-2xl rounded-full" />

                {/* Phone frame */}
                <div
                    className="relative w-[340px] h-[700px] rounded-[48px] overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, #1a1a2e 0%, #0a0a0f 100%)',
                        border: '8px solid transparent',
                        backgroundClip: 'padding-box',
                        boxShadow: `
                            0 50px 100px rgba(0,0,0,0.95),
                            0 0 80px rgba(6,182,212,0.18),
                            0 0 160px rgba(6,182,212,0.08),
                            0 0 0 1px rgba(255,255,255,0.08),
                            inset 0 1px 0 rgba(255,255,255,0.12),
                            12px 0 25px rgba(0,0,0,0.6),
                            -4px 0 10px rgba(255,255,255,0.04)
                        `,
                    }}
                >
                    {/* Titanium frame shine */}
                    <div
                        className="absolute inset-0 rounded-[40px] pointer-events-none z-[55]"
                        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 2px rgba(0,0,0,0.5)' }}
                    />

                    {/* Screen glass glare */}
                    <div className="absolute top-0 right-0 w-[200%] h-36 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rotate-12 -translate-y-20 translate-x-16 z-[51] pointer-events-none blur-xl" />

                    {/* Dynamic Island */}
                    <div
                        className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2.5"
                        style={{
                            width: '110px', height: '32px',
                            background: 'rgba(0,0,0,0.95)',
                            borderRadius: '20px',
                            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.9)'
                        }}
                    >
                        <div style={{ width: '11px', height: '11px', background: '#0c0c14', borderRadius: '50%', border: '1px solid #1a1a2a' }} />
                        <div style={{ width: '32px', height: '4px', background: '#0c0c14', borderRadius: '2px' }} />
                    </div>

                    {/* Screen Content */}
                    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/60 via-[#070E1A]/40 to-[#050505]/60" />
                        {children}
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[5px] bg-white/25 rounded-full z-[60]" />
                </div>

                {/* Side buttons */}
                <div className="absolute left-[-10px] top-[130px] w-[5px] h-[35px] rounded-l-full bg-gradient-to-r from-slate-700 to-slate-600" style={{ boxShadow: '2px 0 6px rgba(0,0,0,0.5)' }} />
                <div className="absolute left-[-10px] top-[180px] w-[5px] h-[60px] rounded-l-full bg-gradient-to-r from-slate-700 to-slate-600" style={{ boxShadow: '2px 0 6px rgba(0,0,0,0.5)' }} />
                <div className="absolute left-[-10px] top-[255px] w-[5px] h-[60px] rounded-l-full bg-gradient-to-r from-slate-700 to-slate-600" style={{ boxShadow: '2px 0 6px rgba(0,0,0,0.5)' }} />
                <div className="absolute right-[-10px] top-[180px] w-[5px] h-[80px] rounded-r-full bg-gradient-to-l from-slate-700 to-slate-600" style={{ boxShadow: '-2px 0 6px rgba(0,0,0,0.5)' }} />
            </motion.div>
        </motion.div>
    );
}

function App() {
    const [view, setView] = useState('landing'); // landing, loading, simulator
    const [lang, setLang] = useState('ar');
    const [projectName] = useState('متجر واتساب Demo');

    const startSimulator = () => {
        setView('loading');
        setTimeout(() => setView('simulator'), 2000);
    };

    const isAr = lang === 'ar';

    const content = {
        ar: {
            headline: 'بِع أي منتج لأي عميل — عبر واتساب فقط 🚀',
            sub: 'محاكي حي يُريك كيف يشتري عملاؤك منتجاتك بضغطة واحدة',
            cta: 'جرّب المحاكي الآن ←',
            lang1: 'English',
            lang2: 'العربية',
            loading: 'جارٍ تجهيز متجرك...',
            badge1: 'مبيعات تلقائية',
            badge2: 'بدون كود',
            badge3: 'واتساب فقط',
        },
        en: {
            headline: 'Sell Anything to Anyone — Only on WhatsApp 🚀',
            sub: 'A live demo showing how your customers buy with one tap',
            cta: 'Try the Demo →',
            lang1: 'English',
            lang2: 'العربية',
            loading: 'Building your store...',
            badge1: 'Auto Sales',
            badge2: 'No Code',
            badge3: 'WhatsApp Only',
        }
    };
    const t = content[lang];

    return (
        <div
            className="min-h-screen bg-[#040408] text-white overflow-x-hidden font-cairo selection:bg-cyan-500/30"
            dir={isAr ? 'rtl' : 'ltr'}
        >
            <Particles />

            {/* Language Toggle */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
                <div className="flex bg-black/70 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    {['en', 'ar'].map(l => (
                        <button
                            key={l}
                            onClick={() => setLang(l)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${lang === l ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'text-slate-400 hover:text-white'}`}
                        >
                            {l === 'ar' ? 'العربية' : 'English'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Landing Page */}
            <AnimatePresence mode="wait">
                {view === 'landing' && (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10"
                    >
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 flex flex-col items-center"
                        >
                            <img
                                src="/logo.png"
                                alt="Elegant Options"
                                className="h-12 w-auto mb-3 drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </motion.div>

                        {/* Main Layout: Copy + Phone */}
                        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl w-full ${isAr ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Copy Section */}
                            <motion.div
                                initial={{ opacity: 0, x: isAr ? 40 : -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.7 }}
                                className="flex-1 text-center lg:text-right"
                                dir={isAr ? 'rtl' : 'ltr'}
                            >
                                {/* Badges */}
                                <div className={`flex gap-2 flex-wrap justify-center lg:justify-start mb-6 ${isAr ? 'lg:justify-end' : 'lg:justify-start'}`}>
                                    {[t.badge1, t.badge2, t.badge3].map((b, i) => (
                                        <span key={i} className={`px-3 py-1 rounded-full text-[11px] font-bold border ${i === 0 ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' : i === 1 ? 'bg-purple-500/15 border-purple-500/40 text-purple-300' : 'bg-green-500/15 border-green-500/40 text-green-300'}`}>
                                            {b}
                                        </span>
                                    ))}
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5">
                                    <span className="bg-gradient-to-r from-cyan-400 via-white to-green-400 bg-clip-text text-transparent">
                                        {t.headline}
                                    </span>
                                </h1>
                                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    {t.sub}
                                </p>

                                {/* Stars */}
                                <div className="flex items-center gap-1 justify-center lg:justify-start mb-8" style={{ justifyContent: isAr ? 'flex-end' : 'flex-start' }}>
                                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                                    <span className="text-slate-400 text-sm ml-2 mr-2">+500 عميل راضٍ</span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.04, y: -3 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={startSimulator}
                                    className="relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-green-500 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] transition-all overflow-hidden border border-cyan-400/30"
                                >
                                    <motion.div
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                    />
                                    <ShoppingCart size={22} className="relative z-10" />
                                    <span className="relative z-10">{t.cta}</span>
                                </motion.button>
                            </motion.div>

                            {/* 3D Phone */}
                            <motion.div
                                initial={{ opacity: 0, x: isAr ? -40 : 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35, duration: 0.7 }}
                                className="flex-shrink-0 flex items-center justify-center"
                            >
                                <Phone3D>
                                    {/* Static preview of the chat UI inside the phone */}
                                    <div className="absolute inset-0 flex items-center justify-center z-10 pt-8">
                                        <div className="w-full h-full" dir="rtl">
                                            {/* WhatsApp header */}
                                            <div className="flex items-center gap-3 px-3 py-2 bg-[#128C7E] mt-10">
                                                <div className="w-9 h-9 rounded-full bg-[#25d366] flex items-center justify-center text-white font-bold text-sm shrink-0">
                                                    م
                                                </div>
                                                <div className="flex-1 text-right">
                                                    <p className="text-white font-bold text-sm">متجر واتساب Demo</p>
                                                    <p className="text-green-200 text-[10px]">متصل الآن ✓</p>
                                                </div>
                                            </div>
                                            {/* Sample chat bubbles */}
                                            <div className="flex flex-col gap-2 px-3 py-3" style={{ background: '#ECE5DD' }}>
                                                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] shadow-sm">
                                                    <p className="text-gray-800 text-xs font-bold">أهلاً! 👋 مرحباً بك</p>
                                                    <p className="text-gray-600 text-[10px] mt-1">اكتشف منتجاتنا واطلب بكل سهولة 🛍️</p>
                                                </div>
                                                <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[70%] shadow-sm">
                                                    <p className="text-gray-800 text-xs">تصفح المنتجات 🛍️</p>
                                                </div>
                                                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                                                    <div className="w-full h-20 rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
                                                        <ShoppingCart size={28} className="text-cyan-400" />
                                                    </div>
                                                    <p className="text-gray-800 text-xs font-bold">🛍️ الكاتلوج متاح الآن</p>
                                                    <p className="text-gray-500 text-[10px]">اختر منتجاتك وأضفها للسلة</p>
                                                </div>
                                                <div className="self-end bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-3 py-2 max-w-[70%] shadow-sm">
                                                    <p className="text-gray-800 text-[10px]">أريد طلب: 2x سماعات + 1x ساعة</p>
                                                </div>
                                                <div className="self-start bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] shadow-sm">
                                                    <p className="text-gray-800 text-[11px] font-bold">✅ تم تأكيد طلبك!</p>
                                                    <p className="text-green-600 text-[10px]">رقم الطلب: #8472</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Phone3D>
                            </motion.div>
                        </div>

                        {/* Feature icons row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-16 grid grid-cols-3 gap-6 max-w-lg w-full relative z-10"
                        >
                            {[
                                { icon: '⚡', title: isAr ? 'ردود فورية' : 'Instant Replies', sub: isAr ? '24/7 بدون توقف' : '24/7 Non-stop' },
                                { icon: '🛒', title: isAr ? 'كاتلوج ذكي' : 'Smart Catalog', sub: isAr ? 'عرض + طلب + دفع' : 'Browse + Order + Pay' },
                                { icon: '🚀', title: isAr ? 'أتمتة كاملة' : 'Full Automation', sub: isAr ? 'بدون أي تدخل' : 'Zero intervention' },
                            ].map((f, i) => (
                                <div key={i} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm">
                                    <div className="text-2xl mb-2">{f.icon}</div>
                                    <p className="text-white font-bold text-xs">{f.title}</p>
                                    <p className="text-slate-500 text-[10px] mt-1">{f.sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {view === 'loading' && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center gap-6 relative z-10"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Zap size={48} className="text-cyan-400" />
                        </motion.div>
                        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                        <p className="text-white font-bold text-xl">{t.loading}</p>
                        <div className="flex gap-1.5">
                            {[0,1,2].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-cyan-400"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}

                {view === 'simulator' && (
                    <motion.div
                        key="simulator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10"
                    >
                        {/* External header above phone */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-6"
                        >
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-10 w-auto mx-auto mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                                {isAr ? 'جرّب تجربة البيع عبر واتساب' : 'Experience WhatsApp Selling'}
                            </h1>
                        </motion.div>

                        {/* Real Phone with Simulator */}
                        <div
                            className="relative w-[375px] h-[750px] rounded-[55px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(145deg, #1a1a2e 0%, #0a0a0f 100%)',
                                boxShadow: `0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(6,182,212,0.15), 0 0 0 1px rgba(255,255,255,0.07)`,
                                border: '7px solid transparent',
                                backgroundClip: 'padding-box',
                            }}
                        >
                            <div className="absolute inset-0 rounded-[48px] pointer-events-none z-[55]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2.5" style={{ width: '110px', height: '32px', background: 'rgba(0,0,0,0.95)', borderRadius: '20px' }}>
                                <div style={{ width: '11px', height: '11px', background: '#0c0c14', borderRadius: '50%', border: '1px solid #1a1a2a' }} />
                                <div style={{ width: '32px', height: '4px', background: '#0c0c14', borderRadius: '2px' }} />
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
