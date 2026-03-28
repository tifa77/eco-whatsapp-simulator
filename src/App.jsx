import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ShoppingCart, Zap, Star, Bot, Shield } from 'lucide-react';
import { BRAND_LOGOS } from './config/brands';

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
    return (
        <div style={{
            overflow: 'hidden',
            width: '100%',
            marginTop: '24px',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}>
            <motion.div
                animate={{ x: ['0px', '-4000px'] }}
                transition={{
                    repeat: Infinity,
                    duration: 35,
                    ease: 'linear',
                    repeatType: 'loop'
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 'max-content',
                    gap: '0px',
                    willChange: 'transform'
                }}
            >
                {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '400px',
                        height: '180px',
                        padding: '0 40px',
                        flexShrink: 0
                    }}>
                        {brand.logo ? (
                            <div style={{
                                background: '#fff',
                                width: '100%',
                                height: '100%',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                                padding: '24px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                    style={{
                                        height: '120px',
                                        width: 'auto',
                                        maxWidth: '320px',
                                        objectFit: 'contain',
                                        // Colored (no grayscale filter)
                                        filter: 'none',
                                        opacity: 1
                                    }}
                                />
                                <span style={{
                                    display: 'none',
                                    color: '#0a0a0a',
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    letterSpacing: '2px',
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'Cairo'
                                }}>
                                    {brand.name}
                                </span>
                            </div>
                        ) : (
                            <div style={{
                                background: '#fff',
                                width: '100%',
                                height: '100%',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                                padding: '24px'
                            }}>
                                <span style={{
                                    color: '#0a0a0a',
                                    fontSize: '24px',
                                    fontWeight: '800',
                                    letterSpacing: '2px',
                                    whiteSpace: 'nowrap',
                                    fontFamily: 'Cairo'
                                }}>
                                    {brand.name}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

/* ═══════════════════ TESTIMONIALS ════════════════════════════════════════════ */
function Testimonials({ lang }) {
    const isAr = lang === 'ar';
    const allTestimonials = {
      ar: [
        { name: "سارة الغامدي", role: "متجر عبايات", avatar: "س", stars: 5, text: "أول أسبوع 47 طلب وأنا نايمة! البوت يرد ويبيع بدوني 😭🔥" },
        { name: "فهد المطيري", role: "مطعم برجر", avatar: "ف", stars: 5, text: "المبيعات ارتفعت 40% في شهر — مافي طلب يضيع الحين 📈" },
        { name: "نورة الكندي", role: "متجر إكسسوارات", avatar: "ن", stars: 5, text: "وفّرت راتب موظفتين! البوت أحسن من أي موظف 💯" },
        { name: "محمد الشهري", role: "متجر إلكترونيات", avatar: "م", stars: 5, text: "العميل يختار ويدفع تلقائي — أنا بس أشحن 😂" },
        { name: "ريم العنزي", role: "كيك هوم", avatar: "ر", stars: 5, text: "طلبات الساعة 11 بالليل والبوت يرد فوراً 😍" },
        { name: "خالد الدوسري", role: "ملابس رجالي", avatar: "خ", stars: 5, text: "وفّرت ساعتين يومياً من الردود اليدوية 🙌" },
        { name: "هند الزهراني", role: "صالون تجميل", avatar: "ه", stars: 5, text: "الحجوزات زادت 3 أضعاف — العميلات يحبون السرعة ✅" },
        { name: "عبدالله القحطاني", role: "متجر عطور", avatar: "ع", stars: 5, text: "80% من طلباتي الحين من الكاتلوج التلقائي 🤩" },
        { name: "منى السبيعي", role: "ملابس أطفال", avatar: "م", stars: 5, text: "بيزنس صغير ونتائج كبيرة — البوت ما يتعب 😄" },
        { name: "راشد المنصور", role: "وجبات صحية", avatar: "ر", stars: 5, text: "استرجعت تكلفة النظام 10 مرات في الشهر الأول 🏆" },
      ],
      en: [
        { name: "Sarah Al-Ghamdi", role: "Abaya Store", avatar: "S", stars: 5, text: "47 orders in the first week while sleeping! 😭🔥" },
        { name: "Fahad Al-Mutairi", role: "Burger Restaurant", avatar: "F", stars: 5, text: "Sales up 40% in one month — zero lost orders 📈" },
        { name: "Noura Al-Kindi", role: "Accessories Store", avatar: "N", stars: 5, text: "Saved cost of 2 employees! Bot works better 💯" },
        { name: "Mohammed Al-Shahri", role: "Electronics Store", avatar: "M", stars: 5, text: "Customer selects & pays automatically — I just ship 😂" },
        { name: "Reem Al-Anazi", role: "Home Bakery", avatar: "R", stars: 5, text: "11pm orders — bot replies instantly while I sleep 😍" },
        { name: "Khalid Al-Dosari", role: "Men's Clothing", avatar: "K", stars: 5, text: "Saved 2 hours daily from manual replies 🙌" },
        { name: "Hind Al-Zahrani", role: "Beauty Salon", avatar: "H", stars: 5, text: "Bookings tripled — clients love the instant replies ✅" },
        { name: "Abdullah Al-Qahtani", role: "Perfume Store", avatar: "A", stars: 5, text: "80% of orders now come through the auto catalog 🤩" },
        { name: "Mona Al-Subai", role: "Kids' Clothing", avatar: "M", stars: 5, text: "Small business, big results — bot never rests 😄" },
        { name: "Rashed Al-Mansour", role: "Healthy Meals", avatar: "R", stars: 5, text: "Recovered system cost 10x in the first month 🏆" },
      ]
    };
    const reviews = allTestimonials[isAr ? 'ar' : 'en'];

    return (
        <div className="w-full flex overflow-hidden py-4 -mx-4 px-4 mask-edges" dir={isAr ? 'rtl' : 'ltr'}>
            <motion.div
                className="flex gap-4 items-stretch"
                animate={{ x: isAr ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
                {[...reviews, ...reviews].map((r, i) => (
                    <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }} className="w-[280px] shrink-0 p-4 rounded-3xl border border-white/10"
                        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} className="text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-white/90 text-sm font-semibold mb-4 leading-relaxed line-clamp-2">"{r.text}"</p>
                        <div className="flex items-center gap-2 mt-auto">
                            <div className="min-w-8 min-h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">
                                {r.avatar || r.name[0]}
                            </div>
                            <div>
                                <h4 className="text-white text-[11px] font-bold">{r.name}</h4>
                                <p className="text-white/40 text-[9px]">{r.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ═══════════════════ 3D PHONE ════════════════════════════════════════════════ */
function Phone3D({ children }) {
    const isFlipped = false; // Based on new spec, facing the camera natively

    const phoneStyle = {
        transform: isFlipped
          ? 'perspective(1200px) rotateY(180deg)'
          : 'perspective(1200px) rotateY(0deg) rotateX(0deg)',
        transition: 'transform 1s ease',
        animation: isFlipped ? 'none' : 'subtleFloat 6s ease-in-out infinite',
        transformStyle: 'preserve-3d',
        filter: 'drop-shadow(0 40px 80px rgba(198,150,40,0.5)) drop-shadow(0 0 40px rgba(37,211,102,0.2))',
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-center py-2">
            <style>{`
            @keyframes subtleFloat {
              0%, 100% { transform: perspective(1200px) rotateY(0deg) translateY(0px); }
              33%      { transform: perspective(1200px) rotateY(2deg)  translateY(-10px); }
              66%      { transform: perspective(1200px) rotateY(-2deg) translateY(-6px); }
            }
            `}</style>
            <div
                className="relative w-[340px] h-[670px] max-w-[85vw]"
                style={phoneStyle}
            >
                {/* ─ Front Face ─ */}
                <div style={{
                    background: 'linear-gradient(160deg, #1f2c34 0%, #0b141a 100%)',
                    borderRadius: '54px',
                    padding: '12px',
                    boxShadow: `
                        0 0 0 1px #2a3942,
                        inset 0 0 0 1px rgba(255,255,255,0.05),
                        0 30px 80px rgba(11,20,26,0.9),
                        0 0 60px rgba(37,211,102,0.15)
                    `,
                    position: 'absolute', inset: 0,
                    backfaceVisibility: 'hidden',
                }}>
                    {/* الحواف المعدنية الجانبية */}
                    <div style={{
                        position: 'absolute', inset: '0',
                        borderRadius: '54px',
                        background: 'linear-gradient(90deg, rgba(255,220,80,0.6) 0%, transparent 20%, transparent 80%, rgba(255,220,80,0.6) 100%)',
                        pointerEvents: 'none'
                    }}/>

                    {/* الجزاءة الداخلية السوداء */}
                    <div style={{
                        background: '#000',
                        borderRadius: '46px',
                        overflow: 'hidden',
                        position: 'absolute', inset: '12px',
                    }}>
                        {/* Dynamic Island — أصغر */}
                        <div style={{
                            width: '90px', height: '28px',
                            background: '#000',
                            borderRadius: '20px',
                            margin: '10px auto 0',
                            position: 'relative', zIndex: 10,
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                        }}>
                            {/* كاميرا صغيرة */}
                            <div style={{
                                width: '10px', height: '10px',
                                borderRadius: '50%',
                                background: '#1a1a2e',
                                border: '2px solid #333',
                                position: 'absolute', right: '14px', top: '50%',
                                transform: 'translateY(-50%)'
                            }}/>
                        </div>

                        {/* محتوى الشاشة (WhatsApp Simulator) */}
                        <div className="absolute inset-0 pt-[38px] rounded-[46px] overflow-hidden">
                            {children}
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-white rounded-full z-[60]" />
                    </div>
                </div>

                {/* ─ Back Face ─ */}
                <div style={{
                    background: 'linear-gradient(145deg, #f5d078, #c8952a, #e8c060)',
                    borderRadius: '54px',
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: '20px',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}>
                    {/* كاميرا خلفية */}
                    <div style={{
                        width: '100px', height: '100px',
                        background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                        borderRadius: '28px',
                        border: '3px solid rgba(255,200,60,0.5)',
                        display: 'flex', flexWrap: 'wrap',
                        gap: '6px', padding: '14px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        position: 'absolute', top: '35px', left: '35px'
                    }}>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} style={{
                                width: '28px', height: '28px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #2a2a3a, #111)',
                                border: '2px solid rgba(255,200,60,0.3)'
                            }}/>
                        ))}
                    </div>
                    {/* Apple Logo (optional, just using standard Logo here slightly translucent) */}
                    <img src="/Logo.png" style={{ width: '40px', opacity: 0.6 }} alt="Logo" />
                </div>
            </div>

            {/* No hint under phone since orientation is fixed */}
        </div>
    );
}

/* ═══════════════════ PHONE PREVIEW (ONBOARDING) ═════════════════════════════ */
function PhonePreview({ isAr = true, projectName, setProjectName, handleStart }) {
    return (
        <div style={{
            background: 'linear-gradient(160deg, #0a0a0a 0%, #0d1f0f 100%)',
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '32px 24px', gap: '24px'
        }}>
            {/* اللوجو */}
            <img src="/Logo.png" style={{ 
                width: '72px', marginBottom: '8px',
                filter: 'drop-shadow(0 0 20px rgba(37,211,102,0.5))' 
            }} />

            {/* الاسم */}
            <p style={{ color: '#25D366', fontSize: '13px', letterSpacing: '3px', fontWeight: '700', fontFamily: 'Cairo' }}>
                ELEGANT OPTIONS
            </p>

            {/* العنوان */}
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', fontFamily: 'Cairo', lineHeight: 1.4 }}>
                    {isAr ? 'جرّب نظام البيع الذكي' : 'Try the Smart Sales System'}
                </h2>
                <p style={{ color: '#8696a0', fontSize: '12px', marginTop: '6px' }}>
                    {isAr ? 'اكتشف كيف يشتري عميلك منتجاتك عبر واتساب' : 'See how your customer buys through WhatsApp'}
                </p>
            </div>

            {/* حقل الاسم */}
            <div style={{ width: '100%' }}>
                <label style={{ color: '#8696a0', fontSize: '11px', display: 'block', marginBottom: '8px', textAlign: isAr ? 'right' : 'left' }}>
                    {isAr ? 'اسم متجرك أو مشروعك' : 'Your store or project name'}
                </label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder={isAr ? 'مثال: متجر الأناقة، مطعم نوار...' : 'e.g. Noor Store, Burger Hub...'}
                    style={{
                        width: '100%', background: '#1f2c34', border: '1px solid #2a3942',
                        borderRadius: '12px', padding: '12px 16px', color: '#e9edef',
                        fontSize: '14px', fontFamily: 'Cairo', outline: 'none',
                        textAlign: isAr ? 'right' : 'left'
                    }}
                />
            </div>

            <button
                onClick={handleStart}
                disabled={!(projectName || '').trim()}
                style={{
                    width: '100%', padding: '14px',
                    background: (projectName || '').trim() ? 'linear-gradient(135deg, #25D366, #128C7E)' : '#2a3942',
                    borderRadius: '14px', border: 'none',
                    color: '#fff', fontSize: '15px', fontWeight: '800',
                    fontFamily: 'Cairo', cursor: (projectName || '').trim() ? 'pointer' : 'not-allowed',
                    boxShadow: (projectName || '').trim() ? '0 4px 20px rgba(37,211,102,0.4)' : 'none',
                    transition: 'all 0.3s ease'
                }}
            >
                {isAr ? '🚀 ابدأ التجربة ←' : '🚀 Start Demo →'}
            </button>
        </div>
    );
}

function BubbleBot({ text, isAr }) {
    return (
        <div className={`bg-white rounded-2xl px-2.5 py-1.5 max-w-[78%] shadow-sm ${isAr ? 'self-start rounded-tl-[4px]' : 'self-start rounded-tr-[4px]'}`}>
            <p className="text-gray-800 text-[10px] leading-relaxed whitespace-pre-line">{text}</p>
            <p className={`text-gray-400 text-[7px] mt-0.5 ${isAr ? 'text-left' : 'text-right'}`}>10:30 {isAr ? 'ص' : 'AM'}</p>
        </div>
    );
}
function BubbleUser({ text, isAr }) {
    return (
        <div className={`bg-[#DCF8C6] rounded-2xl px-2.5 py-1.5 max-w-[65%] shadow-sm ${isAr ? 'self-end rounded-tr-[4px]' : 'self-end rounded-tl-[4px]'}`}>
            <p className="text-gray-800 text-[10px]">{text}</p>
            <div className={`flex items-center gap-0.5 mt-0.5 ${isAr ? 'justify-end' : 'justify-start'}`}>
                <p className="text-gray-500 text-[7px]">10:31 {isAr ? 'ص' : 'AM'}</p>
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
    const [isZooming, setIsZooming] = useState(false);
    const [nameActive, setNameActive] = useState(false);
    const [phoneKey, setPhoneKey] = useState(0);
    const isAr = lang === 'ar';

    const startSimulator = () => {
        if (!(projectName || '').trim()) return;
        setIsZooming(true);
        setTimeout(() => setView('simulator'), 800);
    };

    const t = isAr ? {
        headline: 'حوّل واتساب إلى آلة بيع فعّالة',
        sub: 'ضاعف مبيعاتك 3 أضعاف',
        desc1: 'اعرض منتجاتك، استقبل الطلبات، وتابع العملاء تلقائياً',
        desc2: 'كل شيء يتم داخل واتساب — بسرعة واحترافية',
        solution: 'تجربة بيع أسهل… ومبيعات أعلى',
        nameLabel: 'ما اسم مشروعك؟',
        namePlaceholder: 'مثال: مطعم / متجر / عيادة',
        btn: '👇 شاهد كيف يشتري عميلك الآن — مجاناً',
        loading: 'جارٍ بناء متجرك...',
        counter: 'أكثر من 500+ متجر يستخدم النظام للبيع عبر واتساب',
        trust: '⭐ موثوق من +500 نشاط تجاري',
        ai: '🤖 مدعوم بالذكاء الاصطناعي للرد والإقناع',
    } : {
        headline: 'Turn WhatsApp into an Effective Sales Machine',
        sub: 'Triple your sales',
        desc1: 'Showcase products, receive orders, and follow up automatically',
        desc2: 'Everything inside WhatsApp — fast and professional',
        solution: 'Easier selling experience… higher sales',
        nameLabel: 'What is your project name?',
        namePlaceholder: 'e.g., Restaurant / Store / Clinic',
        btn: '👇 See How Your Customer Buys Now — Free',
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
                            className="text-center max-w-3xl mb-1">
                            <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-black leading-[1.3] text-white tracking-tight">
                                {t.headline}
                            </h1>
                        </motion.div>

                        {/* ─ Subheadline ─ */}
                        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
                            className="text-[20px] sm:text-[24px] text-white/90 font-bold mb-5 text-center">
                            {t.sub}
                        </motion.h2>

                        {/* ─ Description ─ */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-center mb-6 max-w-md space-y-2">
                            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-medium">
                                {t.desc1}
                            </p>
                            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-medium">
                                {t.desc2}
                            </p>
                        </motion.div>

                        {/* ─ Closing Statement ─ */}
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                            className="text-cyan-400 font-bold text-[16px] sm:text-[18px] text-center mb-8 bg-cyan-500/10 px-6 py-2 rounded-full border border-cyan-500/20 inline-block">
                            {t.solution}
                        </motion.p>

                        {/* ─ Encouraging Text ─ */}
                        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            style={{ fontFamily: 'Cairo', marginBottom: '16px' }}
                            className="text-[22px] font-extrabold text-white text-center animate-pulse drop-shadow-[0_0_10px_rgba(37,211,102,0.6)] leading-relaxed"
                        >
                            {isAr ? '👇 اكتب اسم مشروعك وشاهد كيف يبيع واتساب بدلاً عنك' : '👇 Enter your project name and see WhatsApp sell for you'}
                        </motion.p>

                        {/* ─ 3D Phone ─ */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.93, y: 0 }} 
                            animate={isZooming ? { scale: 3, opacity: 0, y: -50 } : { opacity: 1, scale: 1, y: 0 }} 
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className="w-full max-w-md mb-8 flex justify-center z-50">
                            <Phone3D isAr={isAr}>
                                <PhonePreview isAr={isAr} projectName={projectName} setProjectName={setProjectName} handleStart={startSimulator} />
                            </Phone3D>
                        </motion.div>

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
                                    key={phoneKey}
                                    config={{ projectName, niche: 'products', platform: 'whatsapp', lang, goals: ['lost_sales'] }}
                                    onBack={() => {
                                        setView('landing');
                                        setIsZooming(false);
                                        setPhoneKey(prev => prev + 1);
                                    }}
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
