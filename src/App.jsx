import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ShoppingCart, Zap, Star, Bot, Shield, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { BRAND_LOGOS } from './config/brands';

/* ═══════════════════ PARTICLES ═══════════════════════════════════════════════ */
function Particles() {
    const [particles] = useState(() => Array.from({ length: 30 }).map((_, i) => ({
        id: i, size: 1.5 + Math.random() * 4,
        x: Math.random() * 100, y: Math.random() * 100,
        dur: 6 + Math.random() * 12, delay: Math.random() * 6,
        op: 0.08 + Math.random() * 0.2,
    })));
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map(p => (
                <motion.div key={p.id} className="absolute rounded-full"
                    style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`,
                        color: p.id % 4 === 0 ? '#22d3ee' : p.id % 4 === 1 ? '#a855f7' : p.id % 4 === 2 ? '#25d366' : '#3b82f6',
                        background: 'currentColor',
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

/* ═══════════════════ BRAND LOGO MARQUEE ══════════════════════════════════════ */
function BrandMarquee({ lang }) {
  const isAr = lang === 'ar';
  const allBrands = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <div className="w-full py-6">
      <p className="text-center text-white/40 text-[11px] font-bold tracking-wider mb-5">
        {isAr ? 'موثوق من قبل الشركات الرائدة' : 'TRUSTED BY LEADING BRANDS'}
      </p>

      <div className="w-full flex overflow-hidden py-2 mask-edges" dir="ltr">
        <motion.div
          className="flex gap-6 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {allBrands.map((b, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.05 }}
              className="shrink-0 w-[140px] h-[80px] rounded-2xl bg-white flex items-center justify-center p-3 transition-shadow hover:shadow-[0_8px_25px_rgba(37,211,102,0.15)]"
              style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.15)' }}
            >
              <img
                src={b.logo}
                alt={b.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const ph = e.currentTarget.nextElementSibling;
                  if (ph) ph.style.display = 'flex';
                }}
              />
              <span className="hidden items-center justify-center text-[10px] font-bold text-slate-500 text-center leading-tight">
                {b.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
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
        { name: "ريم العجمي", role: "كيك هوم", avatar: "ر", stars: 5, text: "طلبات الساعة 11 بالليل والبوت يرد فوراً وعملائي راضين بالسرعة 😍" },
        { name: "خالد الدوسري", role: "ملابس رجالي", avatar: "خ", stars: 5, text: "وفّرت ساعتين يومياً من الردود اليدوية وتأكيد الفواتير المزعجة 🙌" },
        { name: "هند الزهراني", role: "صالون تجميل", avatar: "ه", stars: 5, text: "الحجوزات زادت 3 أضعاف — العميلات يحبون الرد السريع وحجز المواعيد الآلي ✅" },
        { name: "عبدالله القحطاني", role: "متجر عطور", avatar: "ع", stars: 5, text: "80% من طلباتي الحين من الكاتلوج التلقائي والعميل يشتري لحاله 🤩" },
        { name: "منى السبيعي", role: "ملابس أطفال", avatar: "م", stars: 5, text: "بيزنس صغير ونتائج كبيرة — البوت ما يتعب وشغال على مدار الساعة 😄" },
        { name: "راشد المنصور", role: "وجبات صحية", avatar: "ر", stars: 5, text: "استرجعت تكلفة النظام 10 مرات في الشهر الأول من المبيعات التلقائية 🏆" },
      ],
      en: [
        { name: "Sarah Al-Ghamdi", role: "Abaya Store", avatar: "S", stars: 5, text: "47 orders in the first week while sleeping! 😭🔥" },
        { name: "Fahad Al-Mutairi", role: "Burger Restaurant", avatar: "F", stars: 5, text: "Sales up 40% in one month — zero lost orders 📈" },
        { name: "Noura Al-Kindi", role: "Accessories Store", avatar: "N", stars: 5, text: "Saved cost of 2 employees! Bot works better 💯" },
        { name: "Mohammed Al-Shahri", role: "Electronics Store", avatar: "M", stars: 5, text: "Customer selects & pays automatically — I just ship 😂" },
        { name: "Reem Al-Ajami", role: "Home Bakery", avatar: "R", stars: 5, text: "11pm orders — bot replies instantly while I sleep 😍" },
        { name: "Khalid Al-Dosari", role: "Men's Clothing", avatar: "K", stars: 5, text: "Saved 2 hours daily from manual replies and invoicing 🙌" },
        { name: "Hind Al-Zahrani", role: "Beauty Salon", avatar: "H", stars: 5, text: "Bookings tripled — clients love instant scheduling ✅" },
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
                transition={{ duration: 42, ease: "linear", repeat: Infinity }}
            >
                {[...reviews, ...reviews].map((r, i) => (
                    <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }} className="w-[280px] shrink-0 p-5 rounded-3xl border border-white/10 flex flex-col"
                        style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.5)' }}>
                        <div className="flex gap-3 items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#25d366] to-[#128c7e] flex items-center justify-center text-white font-black text-sm">
                                {r.avatar}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm leading-tight">{r.name}</h4>
                                <span className="text-white/40 text-[11px] font-bold">{r.role}</span>
                            </div>
                        </div>
                        <div className="flex gap-0.5 mb-2.5">
                            {[...Array(r.stars)].map((_, idx) => (
                                <Star key={idx} size={11} className="text-yellow-400 fill-yellow-400" />
                            ))}
                        </div>
                        <p className="text-white/70 text-[12.5px] leading-relaxed text-right font-medium">
                            {r.text}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

/* ═══════════════════ STATIC GOLD PHONE ══════════════════════════════════════ */
function Phone3D({ children, isAr }) {
    return (
        <div className="relative w-full flex flex-col items-center justify-center py-2 z-30">
            <div
                className="relative w-[300px] sm:w-[340px] h-[610px] sm:h-[680px] select-none"
            >
                {/* ─ Front Face ─ */}
                <div style={{
                    background: 'linear-gradient(135deg, #ffe082 0%, #d4af37 40%, #aa7c11 70%, #d4af37 100%)',
                    borderRadius: '48px',
                    padding: '8px',
                    boxShadow: `
                        0 0 0 1px #aa7c11,
                        inset 0 0 0 1px rgba(255,255,255,0.35),
                        0 25px 60px rgba(0,0,0,0.7)
                    `,
                    position: 'absolute', inset: 0,
                }}>
                    {/* Metal Edge Highlight */}
                    <div style={{
                        position: 'absolute', inset: '0',
                        borderRadius: '48px',
                        background: 'linear-gradient(90deg, rgba(255,220,80,0.4) 0%, transparent 20%, transparent 80%, rgba(255,220,80,0.4) 100%)',
                        pointerEvents: 'none'
                    }}/>

                    {/* Inner Black bezel */}
                    <div style={{
                        background: '#000',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        position: 'absolute', inset: '8px',
                    }}>
                        {/* Dynamic Island */}
                        <div style={{
                            width: '85px', height: '24px',
                            background: '#000',
                            borderRadius: '20px',
                            margin: '8px auto 0',
                            position: 'relative', zIndex: 10,
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
                        }}>
                            <div style={{
                                width: '8px', height: '8px',
                                borderRadius: '50%',
                                background: '#1a1a2e',
                                border: '2px solid #222',
                                position: 'absolute', right: '12px', top: '50%',
                                transform: 'translateY(-50%)'
                            }}/>
                        </div>

                        {/* Screen Content */}
                        <div className="absolute inset-0 pt-[34px] rounded-[40px] overflow-hidden">
                            {children}
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full z-[60]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════ PHONE PREVIEW (ONBOARDING) ═════════════════════════════ */
function PhonePreview({ isAr = true, projectName, setProjectName, handleStart }) {
    return (
        <div style={{
            position: 'relative',
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            padding: '24px 20px 20px', gap: '0',
            overflow: 'hidden',
            background: '#0a0d0b'
        }}>
            {/* Simulated WhatsApp Chat background (blurry & crystallized) */}
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                padding: '50px 16px 16px', gap: '12px',
                opacity: 0.85, // clear visibility, yet blurred
                filter: 'blur(2px)', // out of focus
                pointerEvents: 'none',
                zIndex: 1
            }}>
                {/* Contact Header Simulation */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '10px'
                }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#00a884', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>EO</div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div style={{ width: '80px', height: '7px', background: '#fff', borderRadius: '3.5px' }} />
                        <div style={{ width: '45px', height: '5px', background: '#00a884', borderRadius: '2.5px' }} />
                    </div>
                </div>

                {/* Left Bubble (Client inquiry) */}
                <div style={{
                    alignSelf: 'flex-start',
                    background: '#202c33',
                    color: '#e9edef',
                    borderRadius: '0px 12px 12px 12px',
                    padding: '8px 12px',
                    width: '68%',
                    fontSize: '10.5px',
                    fontFamily: 'Cairo',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    textAlign: isAr ? 'right' : 'left'
                }}>
                    {isAr ? 'مرحباً، أريد الاستفسار عن منتجاتكم وشراء بعض المستلزمات' : 'Hello, I want to inquire about your products and buy some items'}
                </div>

                {/* Right Bubble (Bot welcome response) */}
                <div style={{
                    alignSelf: 'flex-end',
                    background: '#005c4b',
                    color: '#e9edef',
                    borderRadius: '12px 0px 12px 12px',
                    padding: '8px 12px',
                    width: '78%',
                    fontSize: '10.5px',
                    fontFamily: 'Cairo',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    textAlign: isAr ? 'right' : 'left'
                }}>
                    {isAr ? 'أهلاً بك في متجرنا! تفضل الكتالوج التفاعلي لتختار منتجاتك الذكية 🛍️' : 'Welcome to our store! Here is the interactive catalog to choose your products 🛍️'}
                </div>

                {/* Left Bubble 2 (Client selecting product) */}
                <div style={{
                    alignSelf: 'flex-start',
                    background: '#202c33',
                    color: '#e9edef',
                    borderRadius: '0px 12px 12px 12px',
                    padding: '8px 12px',
                    width: '60%',
                    fontSize: '10.5px',
                    fontFamily: 'Cairo',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    textAlign: isAr ? 'right' : 'left'
                }}>
                    {isAr ? 'شكراً لك، قمت باختيار هذا المنتج المميز وتأكيد الطلب' : 'Thank you, I selected this premium product and confirmed order'}
                </div>

                {/* Right Bubble 2 (Bot generating invoice) */}
                <div style={{
                    alignSelf: 'flex-end',
                    background: '#005c4b',
                    color: '#e9edef',
                    borderRadius: '12px 0px 12px 12px',
                    padding: '8px 12px',
                    width: '75%',
                    fontSize: '10.5px',
                    fontFamily: 'Cairo',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                    textAlign: isAr ? 'right' : 'left'
                }}>
                    {isAr ? 'تم تجهيز فاتورتك بنجاح! 🧾 يرجى النقر لإتمام الدفع الآمن' : 'Your invoice is ready! 🧾 Please click to complete secure payment'}
                </div>
            </div>

            {/* Crystallized/Frosted Glass Overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at center, rgba(12, 28, 20, 0.25) 0%, rgba(5, 8, 7, 0.75) 100%)',
                backdropFilter: 'blur(4px)',
                pointerEvents: 'none',
                zIndex: 2
            }} />

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/Logo.png" style={{
                    width: '54px', marginBottom: '16px',
                    filter: 'drop-shadow(0 0 16px rgba(37,211,102,0.4))'
                }} alt="Logo" />

                <div style={{ textAlign: 'center', marginBottom: '20px', width: '100%' }}>
                    <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '900', fontFamily: 'Cairo', lineHeight: 1.35, marginBottom: '6px' }}>
                        {isAr ? 'جرّب نظام البيع الذكي' : 'Try the Smart Sales System'}
                    </h2>
                    <p style={{ color: '#a0b0a8', fontSize: '12px', lineHeight: 1.5, fontFamily: 'Cairo' }}>
                        {isAr ? 'اكتشف كيف يشتري عميلك منتجاتك عبر واتساب' : 'See how your customer buys through WhatsApp'}
                    </p>
                </div>

                <div style={{ width: '100%', marginBottom: '16px' }}>
                    <label style={{
                        color: '#c8d8c8', fontSize: '12px', fontWeight: '700',
                        display: 'block', marginBottom: '8px',
                        textAlign: isAr ? 'right' : 'left', fontFamily: 'Cairo'
                    }}>
                        {isAr ? 'اسم متجرك أو مشروعك' : 'Your store or project name'}
                    </label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder={isAr ? 'مثال: متجر الأناقة، مطعم نوار...' : 'e.g. Noor Store, Burger Hub...'}
                        className="phone-input-field"
                        style={{
                            width: '100%', background: 'rgba(17, 26, 21, 0.6)',
                            border: '1.5px solid #233e2e',
                            borderRadius: '14px', padding: '14px 16px',
                            color: '#e9edef', fontSize: '14px',
                            fontFamily: 'Cairo', outline: 'none',
                            textAlign: isAr ? 'right' : 'left',
                            boxSizing: 'border-box',
                            transition: 'all 0.3s'
                        }}
                    />
                </div>

                <button
                    onClick={handleStart}
                    style={{
                        width: '100%', padding: '14px',
                        background: '#323f4f',
                        borderRadius: '14px', border: 'none',
                        color: '#fff', fontSize: '14px', fontWeight: '800',
                        fontFamily: 'Cairo', cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isAr ? '🚀 ابدأ التجربة ←' : '🚀 Start Demo →'}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════ APP MAIN ═══════════════════════════════════════════════════ */
function App() {
    const [view, setView] = useState('landing');
    const [lang, setLang] = useState('ar');
    const [projectName, setProjectName] = useState('');
    const [loadingStep, setLoadingStep] = useState(0);
    const [phoneKey, setPhoneKey] = useState(0);
    const isAr = lang === 'ar';

    const startSimulator = () => {
        const name = projectName.trim() || (isAr ? 'متجرنا الذكي' : 'Smart Store');
        setProjectName(name);
        setView('loading');
    };

    // Smart 2.2 seconds loading interval steps
    useEffect(() => {
        if (view === 'loading') {
            const timer1 = setTimeout(() => setLoadingStep(1), 700);
            const timer2 = setTimeout(() => setLoadingStep(2), 1400);
            const timer3 = setTimeout(() => {
                setView('simulator');
                setLoadingStep(0);
            }, 2200);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [view]);

    const t = isAr ? {
        headline: 'حوّل واتساب إلى آلة بيع فعّالة',
        sub: 'ضاعف مبيعاتك 3 أضعاف',
        desc1: 'اعرض منتجاتك، استقبل الطلبات، وتابع العملاء تلقائياً',
        desc2: 'كل شيء يتم داخل واتساب — بسرعة واحترافية',
        btn: 'تجربة بيع أسهل... ومبيعات أعلى',
        hint: '👇 اكتب اسم مشروعك وشاهد كيف يبيع واتساب بدلاً عنك',
        loading: 'جاري بناء متجرك...',
        counter: 'أكثر من 100+ متجر يستخدم النظام للبيع عبر واتساب',
        trust: '⭐ موثوق من +100 نشاط تجاري',
        ai: '🤖 مدعوم بالذكاء الاصطناعي والأتمتة',
        placeholder: 'اكتب اسم مشروعك أو متجرك هنا...'
    } : {
        headline: 'Turn WhatsApp into a Powerful Sales Machine',
        sub: 'Triple your sales',
        desc1: 'Showcase products, receive orders, and follow up automatically',
        desc2: 'Everything inside WhatsApp — fast and professional',
        btn: 'Easier selling... higher sales',
        hint: '👇 Enter your project name and see how WhatsApp sells for you',
        loading: 'Building your store...',
        counter: '100+ stores already selling via WhatsApp',
        trust: '⭐ Trusted by 100+ businesses',
        ai: '🤖 AI & Automation Powered',
        placeholder: 'Enter your project or store name...'
    };

    const loadingMessages = isAr ? [
        '🔍 جاري تحليل وتجهيز بيانات مشروعك...',
        `🛍️ جاري بناء الكاتلوج الذكي لـ "${projectName}"...`,
        '⚙️ جاري تشغيل خوادم الأتمتة والرد الذكي...'
    ] : [
        '🔍 Analyzing your project details...',
        `🛍️ Building smart catalog for "${projectName}"...`,
        '⚙️ Activating AI automation servers...'
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden font-cairo selection:bg-green-500/30 relative">
            <Particles />

            <AnimatePresence mode="wait">
                {/* ═══════════ PHASE 1: LANDING PAGE ═══════════ */}
                {view === 'landing' && (
                    <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        className="min-h-screen flex flex-col items-center relative z-10 px-4 pt-6 pb-16"
                        dir={isAr ? 'rtl' : 'ltr'}>                        {/* ─ Top-Left Language Toggle with Icons ─ */}
                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
                            <div className="flex items-center rounded-full p-[2px] border border-white/[0.08]"
                                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)' }}>
                                <button onClick={() => setLang('ar')}
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all duration-350 ${
                                        lang === 'ar'
                                            ? 'bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white shadow-[0_0_10px_rgba(37,211,102,0.3)]'
                                            : 'text-white/40 hover:text-white/70'
                                    }`}>
                                    <span>🇸🇦</span>
                                    <span>العربية</span>
                                </button>
                                <button onClick={() => setLang('en')}
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all duration-350 ${
                                        lang === 'en'
                                            ? 'bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white shadow-[0_0_10px_rgba(37,211,102,0.3)]'
                                            : 'text-white/40 hover:text-white/70'
                                    }`}
                                    style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    <span>🇬🇧</span>
                                    <span>EN</span>
                                </button>
                            </div>
                        </div>

                        {/* ─ Logo + Brand ─ */}
                        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                            className="flex flex-col items-center mb-6">
                            <img src="/Logo.png" alt="Elegant Options" className="h-11 w-auto mb-2 drop-shadow-[0_0_20px_rgba(37,211,102,0.4)] animate-pulse" />
                            <h2 className="text-white/60 text-[11px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                ELEGANT OPTIONS
                            </h2>
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent mt-2" />
                        </motion.div>

                        {/* ─ 1. PHONE ONBOARDING (FIRST AT THE TOP) ─ */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="w-full max-w-md mb-8 flex justify-center z-30"
                        >
                            <Phone3D isAr={isAr}>
                                <PhonePreview
                                    isAr={isAr}
                                    projectName={projectName}
                                    setProjectName={setProjectName}
                                    handleStart={startSimulator}
                                />
                            </Phone3D>
                        </motion.div>

                        {/* ─ 2. HEADLINE (BELOW PHONE) ─ */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                            className="text-center max-w-3xl mb-2">
                            <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-black leading-[1.3] text-white tracking-tight">
                                {t.headline}
                            </h1>
                        </motion.div>

                        {/* ─ 3. SUBHEADLINE ─ */}
                        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="text-[18px] sm:text-[22px] text-white/75 font-semibold mb-6 text-center max-w-2xl">
                            {t.sub}
                        </motion.h2>

                        {/* ─ 4. DESCRIPTION ─ */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                            className="text-center mb-6 max-w-xl space-y-2">
                            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-semibold">
                                {t.desc1}
                            </p>
                            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-semibold">
                                {t.desc2}
                            </p>
                        </motion.div>

                        {/* ─ 5. ACTION BUTTON (SCROLLS UP TO THE PHONE INPUT) ─ */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.04, y: -3, boxShadow: '0 0 40px rgba(6,182,212,0.3)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                                const inputEl = document.querySelector('.phone-input-field');
                                if (inputEl) {
                                    inputEl.focus();
                                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                            }}
                            className="relative inline-flex items-center justify-center gap-2.5 text-white font-black text-[15px] sm:text-[16px] px-10 py-4 rounded-full transition-all overflow-hidden mb-8 border border-cyan-500/30"
                            style={{
                                background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(34,197,94,0.1) 100%)',
                                boxShadow: '0 0 25px rgba(6,182,212,0.15)',
                            }}
                        >
                            <span className="relative z-10">{t.btn}</span>
                        </motion.button>
                        {/* ─ Trust Badges ─ */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-3 mb-8 z-10">
                            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.06]"
                                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
                                <Shield size={12} className="text-[#25d366]" />
                                <span className="text-white/50 text-[11px] font-bold">{t.trust}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.06]"
                                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)' }}>
                                <Bot size={12} className="text-cyan-400" />
                                <span className="text-white/50 text-[11px] font-bold">{t.ai}</span>
                            </div>
                        </motion.div>

                        {/* ─ Social Proof & Brands ─ */}
                        <div className="w-full flex flex-col items-center gap-5 max-w-4xl z-10">
                            <div className="flex items-center gap-2">
                                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                                <span className="text-white/40 text-[12px] font-bold mx-1">{t.counter}</span>
                            </div>
                            <Testimonials lang={lang} />
                            <BrandMarquee lang={lang} />
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ PHASE 2: SMART LOADING TRANSITION ═══════════ */}
                {view === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="min-h-screen flex flex-col items-center justify-center gap-6 relative z-10 px-4">
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-green-500/10 border border-green-500/20 p-5 rounded-full"
                        >
                            <Zap size={44} className="text-[#25d366] drop-shadow-[0_0_20px_rgba(37,211,102,0.6)]" />
                        </motion.div>
                        <Loader2 className="w-8 h-8 text-[#25d366] animate-spin" />
                        
                        <div className="text-center h-8">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={loadingStep}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-white font-bold text-lg max-w-md"
                                >
                                    {loadingMessages[loadingStep]}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-2 mt-4">
                            {[0,1,2].map(i => (
                                <motion.div key={i} className="w-2.5 h-2.5 rounded-full bg-[#25d366]"
                                    animate={{ y: [0, -8, 0] }} transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══════════ PHASE 3: CORE SIMULATOR ═══════════ */}
                {view === 'simulator' && (
                    <motion.div key="simulator" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 bg-[#06080a]"
                        dir={isAr ? 'rtl' : 'ltr'}>
                        {/* Title Header */}
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 z-10">
                            <img src="/Logo.png" alt="Logo" className="h-8 w-auto mx-auto mb-1.5 drop-shadow-[0_0_12px_rgba(37,211,102,0.4)]" />
                            <h1 className="text-sm font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                {isAr ? 'تتبع مسار العملاء وبيع المنتجات تلقائياً 🛍️' : 'Track Customer Journeys & Sell Products Automatically 🛍️'}
                            </h1>
                        </motion.div>

                        {/* Phone Container Box */}
                        <div className="relative w-[340px] sm:w-[375px] h-[670px] sm:h-[730px] rounded-[52px] overflow-hidden z-20 border-[6px] border-[#1f2c34] shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
                            {/* Inner Screen Bezel Glow */}
                            <div className="absolute inset-0 rounded-[46px] pointer-events-none z-[55] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]" />
                            
                            {/* Dynamic Island */}
                            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center gap-2"
                                style={{ width: '100px', height: '28px', background: '#000', borderRadius: '16px' }}>
                                <div className="w-[10px] h-[10px] rounded-full bg-[#0a0a12] border border-[#1a1a28]" />
                                <div className="w-[25px] h-[3px] rounded-full bg-[#0a0a12]" />
                            </div>

                            <div className="absolute inset-0 overflow-hidden rounded-[46px]">
                                <ChatSimulator
                                    key={phoneKey}
                                    config={{ projectName, niche: 'restaurant', platform: 'whatsapp', lang }}
                                    onBack={() => {
                                        setView('landing');
                                        setPhoneKey(prev => prev + 1);
                                    }}
                                />
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full z-[60]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
