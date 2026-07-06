import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatSimulator from './components/ChatSimulator';
import { Loader2, ShoppingCart, Zap, Star, Bot, Shield, AlertCircle, CheckCircle2, ChevronRight, Mail, Phone, MessageCircle, X } from 'lucide-react';
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
    const reviews = [
      { name: "عبدالرحمن العتيبي", role: "ملابس رجالي — الرياض 🇸🇦", stars: 5, text: "ما توقعت الفرق يكون بهالسرعة. من أول أسبوع صارت الرسائل ترد لحالها وأنا مشغول بالشغل." },
      { name: "James W.", role: "Online Store — London, UK 🇬🇧", stars: 5, text: "Honestly didn't expect it to work this well. My WhatsApp handles all the customer questions and I just check the orders." },
      { name: "فيصل البلوشي", role: "صالون رجالي — مسقط 🇴🇲", stars: 5, text: "من أول ما جربته حسيت إن في فرق. العميل يرسل ويحجز بنفسه وأنا بس أشوف الطلبات وأجهزها." },
      { name: "يوسف الزعابي", role: "بقالة — أبوظبي 🇦🇪", stars: 5, text: "ما كنا نقدر نرد على كل رسالة بسرعة. دحين ما فيه طلب يفوتنا، حتى بالليل." },
      { name: "Sarah L.", role: "Clothing Brand — New York, USA 🇺🇸", stars: 5, text: "Setup was simple and the team helped with everything. Within 2 days the bot was running on its own." },
      { name: "نوف الشمري", role: "عطور ومكياج — الرياض 🇸🇦", stars: 5, text: "جربت الخدمة وأنا مترددة بالبداية، بس النتيجة كلمت نفسها. الطلبات زادت وما احتجت موظفة إضافية." },
      { name: "لطيفة الرشيدي", role: "صالون نسائي — الشارقة 🇦🇪", stars: 5, text: "الحجوزات ما تتوقف. حتى الجمعة والسبت الأوتوميشن يشتغل وأنا ما أحتاج أكون موجودة." },
      { name: "Thomas B.", role: "Sports Gear — Vienna, Austria 🇦🇹", stars: 5, text: "Really impressed with how natural the replies feel. Customers don't even realize it's automated." },
      { name: "علي سلمان", role: "مطعم — المنامة 🇧🇭", stars: 5, text: "في البداية شككت بالموضوع، بس بعد أسبوعين قنعت. المبيعات من واتساب ارتفعت." },
      { name: "خالد المهيري", role: "منتجات عضوية — دبي 🇦🇪", stars: 5, text: "الشغل على الإنستجرام كان مرهق. دحين كل رسالة تنرد تلقائي وأنا أركز على الطلبات اللي تحتاج تدخل." },
      { name: "هنوف الكندي", role: "متجر إكسسوارات — الكويت 🇰🇼", stars: 5, text: "كنت أخاف ما يكون الرد طبيعي، بس العملاء ما حسوا بأي فرق. وبعضهم شكروني على السرعة." },
      { name: "Layla A.", role: "Boutique — London, UK 🇬🇧", stars: 5, text: "My sales from WhatsApp doubled in the first month. The automation handles everything from product questions to confirmations." },
      { name: "سارة المطيري", role: "كيك هوم — الكويت 🇰🇼", stars: 5, text: "ما كنت أتوقع إن الإعداد يكون بهالسهولة. الفريق ساعدني وفي يوم كل شي كان شغال." },
      { name: "خلود القحطاني", role: "متجر عطور — جدة 🇸🇦", stars: 5, text: "الأوتوميشن صار يعرض المنتجات أحسن مني. والعميلة تكمل الشراء من غير ما تحتاج تتواصل معي." },
      { name: "طارق الحارثي", role: "أجهزة كهربائية — الطائف 🇸🇦", stars: 5, text: "كل من جرب يقول نفس الكلام. ما يصدق إن الشغل يمشي من غيرك. وهذا اللي صار عندنا." },
      { name: "Nadia F.", role: "Skincare — New York, USA 🇺🇸", stars: 5, text: "Best investment for my business this year. Response speed alone improved my conversion rate a lot." },
      { name: "راشد المنصور", role: "وجبات — الشارقة 🇦🇪", stars: 5, text: "جربته وعندي مطعم صغير، الطلبات صارت تجي من واتساب وتتأكد لحالها. وفّر عليّ شي كثير." },
      { name: "حمد المنصوري", role: "ورشة تقنية — دبي 🇦🇪", stars: 5, text: "الرد الفوري غيّر نظرة العملاء فينا. صاروا يحسون إننا كبار وعندنا نظام. والحين صار عندنا." },
      { name: "مريم الهاشم", role: "متجر عبايات — الكويت 🇰🇼", stars: 5, text: "جاءتني طلبيتين الليلة الأولى وأنا نايمة. من ذاك الوقت وأنا ما أقدر أشتغل بدون الأوتوميشن." },
      { name: "عمر الفارسي", role: "إلكترونيات — مسقط 🇴🇲", stars: 5, text: "ما كنت أصدق الكلام اللي يقولونه عن الأوتوميشن. بس بعد ما جربت، الكلام كان أقل من الحقيقة." },
      { name: "نورة الكندي", role: "إكسسوارات — الكويت 🇰🇼", stars: 5, text: "الخدمة واضحة وما فيها تعقيد. ربطوا الحساب وشرحوا كل شي بخطوات. ودّي جربته من زمان." },
      { name: "بدر السبيعي", role: "مستلزمات رياضية — الرياض 🇸🇦", stars: 5, text: "عملاؤنا من دول مختلفة ويحتاجون رد سريع. دحين ما عندنا مشكلة، الأوتوميشن يرد بأي وقت." },
    ];

    return (
        <div className="w-full flex overflow-hidden py-4 -mx-4 px-4 mask-edges" dir={isAr ? 'rtl' : 'ltr'}>
            <motion.div
                className="flex gap-4 items-stretch"
                animate={{ x: isAr ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ duration: 90, ease: "linear", repeat: Infinity }}
            >
                {[...reviews, ...reviews].map((r, i) => {
                    const avatar = r.name ? r.name.charAt(0) : 'U';
                    const isTextAr = !/^[A-Za-z]/.test(r.text);
                    return (
                        <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }} className="w-[280px] shrink-0 p-5 rounded-3xl border border-white/10 flex flex-col"
                            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.5)' }}>
                            <div className="flex gap-3 items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#25d366] to-[#128c7e] flex items-center justify-center text-white font-black text-sm">
                                    {avatar}
                                </div>
                                <div className={isAr ? 'text-right' : 'text-left'}>
                                    <h4 className="text-white font-bold text-sm leading-tight">{r.name}</h4>
                                    <span className="text-white/40 text-[11px] font-bold">{r.role}</span>
                                </div>
                            </div>
                            <div className={`flex gap-0.5 mb-2.5 ${isAr ? 'justify-end' : 'justify-start'}`}>
                                {[...Array(r.stars)].map((_, idx) => (
                                    <Star key={idx} size={11} className="text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className={`text-white/70 text-[12.5px] leading-relaxed font-medium ${isTextAr ? 'text-right' : 'text-left'}`}>
                                {r.text}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

/* ═══════════════════ RECENT PROJECTS ══════════════════════════════════════════ */
function RecentProjects({ lang }) {
    const isAr = lang === 'ar';
    const companies = [
      { name: "شاورما هم هم",          serviceAr: "أوتوميشن واتساب",             serviceEn: "WhatsApp Automation",                      dateAr: "15 يونيو 2026",  dateEn: "15 Jun 2026",  active: true },
      { name: "Leathermate",           serviceAr: "أوتوميشن واتساب",             serviceEn: "WhatsApp Automation",                      dateAr: "01 يونيو 2026",  dateEn: "01 Jun 2026",  active: true },
      { name: "دار فاشون للأزياء",      serviceAr: "أوتوميشن واتساب",             serviceEn: "WhatsApp Automation",                      dateAr: "20 مايو 2026",   dateEn: "20 May 2026",   active: true },
      { name: "مطاعم الأصيل",           serviceAr: "أوتوميشن واتساب وإنستجرام",  serviceEn: "WhatsApp & Instagram Automation",          dateAr: "10 مايو 2026",   dateEn: "10 May 2026",   active: true },
      { name: "صالون نور للتجميل",      serviceAr: "أتمتة وحجز مواعيد",           serviceEn: "Appointment Scheduling & Automation",      dateAr: "28 أبريل 2026",  dateEn: "28 Apr 2026",  active: false },
      { name: "محل الماسة للمجوهرات",   serviceAr: "نظام أتمتة ورد AI",            serviceEn: "AI Automation & Chat System",              dateAr: "15 أبريل 2026",  dateEn: "15 Apr 2026",  active: true },
      { name: "سوبرماركت الوفاء",       serviceAr: "موقع مع أوتوميشن",            serviceEn: "Website with Automation",                  dateAr: "01 أبريل 2026",  dateEn: "01 Apr 2026",  active: true },
      { name: "تك ستور للإلكترونيات",   serviceAr: "نظام متكامل للمبيعات",        serviceEn: "Integrated Sales System",                  dateAr: "18 مارس 2026",   dateEn: "18 Mar 2026",   active: false },
      { name: "مؤسسة الفخر للأثاث",    serviceAr: "أوتوميشن واتساب",             serviceEn: "WhatsApp Automation",                      dateAr: "05 مارس 2026",   dateEn: "05 Mar 2026",   active: true },
      { name: "عباية الأناقة",          serviceAr: "أتمتة وحجز مواعيد",           serviceEn: "Appointment Scheduling & Automation",      dateAr: "20 فبراير 2026", dateEn: "20 Feb 2026", active: false },
      { name: "كافيه بيتا",             serviceAr: "نظام ردود تلقائية",           serviceEn: "Auto-reply System",                        dateAr: "10 فبراير 2026", dateEn: "10 Feb 2026", active: true },
      { name: "متجر سبيستون",           serviceAr: "أوتوميشن واتساب",             serviceEn: "WhatsApp Automation",                      dateAr: "28 يناير 2026",  dateEn: "28 Jan 2026",  active: false },
      { name: "صيدلية الشفاء",          serviceAr: "نظام أتمتة ورد AI",            serviceEn: "AI Automation & Chat System",              dateAr: "20 يناير 2026",  dateEn: "20 Jan 2026",  active: true },
      { name: "مجوهرات الخليج",         serviceAr: "أوتوميشن واتساب وإنستجرام",  serviceEn: "WhatsApp & Instagram Automation",          dateAr: "12 يناير 2026",  dateEn: "12 Jan 2026",  active: true },
      { name: "مطبخ أم سعد",            serviceAr: "نظام حجز وأوتوميشن",          serviceEn: "Booking & Automation System",              dateAr: "08 يناير 2026",  dateEn: "08 Jan 2026",  active: true },
      { name: "عيادة البشرة المثالية",  serviceAr: "أتمتة وحجز مواعيد",           serviceEn: "Appointment Scheduling & Automation",      dateAr: "05 يناير 2026",  dateEn: "05 Jan 2026",  active: false },
      { name: "هايبر فريش",             serviceAr: "موقع مع أوتوميشن",            serviceEn: "Website with Automation",                  dateAr: "04 يناير 2026",  dateEn: "04 Jan 2026",  active: true },
      { name: "بوتيك ليلى",             serviceAr: "أوتوميشن واتساب",             serviceEn: "WhatsApp Automation",                      dateAr: "04 يناير 2026",  dateEn: "04 Jan 2026",  active: true },
      { name: "مطعم الهدى",             serviceAr: "أوتوميشن واتساب وإنستجرام",  serviceEn: "WhatsApp & Instagram Automation",          dateAr: "03 يناير 2026",  dateEn: "03 Jan 2026",  active: true },
      { name: "أكاديمية فن المكياج",    serviceAr: "أتمتة وحجز مواعيد",           serviceEn: "Appointment Scheduling & Automation",      dateAr: "03 يناير 2026",  dateEn: "03 Jan 2026",  active: false },
      { name: "متجر الرياضة الأول",     serviceAr: "نظام متكامل للمبيعات",        serviceEn: "Integrated Sales System",                  dateAr: "03 يناير 2026",  dateEn: "03 Jan 2026",  active: true },
    ];

    return (
        <div className="w-full flex flex-col items-center mt-12 mb-6 z-10 overflow-hidden">
            <style>{`
                @keyframes marqueeProjects {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .projects-marquee {
                    display: flex;
                    width: max-content;
                    animation: marqueeProjects 65s linear infinite;
                }
                .projects-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
            
            <h3 className="text-white/40 text-[11px] font-bold tracking-[0.2em] uppercase mb-4 text-center">
                {isAr ? 'مشاريعنا الأخيرة' : 'Our Recent Projects'}
            </h3>
            
            <div className="w-full flex overflow-hidden py-3 -mx-4 px-4 mask-edges" dir="ltr">
                <div className="projects-marquee gap-5">
                    {[...companies, ...companies].map((c, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md shadow-sm shrink-0">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.active ? 'bg-green-400' : 'bg-amber-400'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${c.active ? 'bg-[#25d366] shadow-[0_0_8px_rgba(37,211,102,0.6)]' : 'bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.6)]'}`}></span>
                            </span>
                            
                            <span className="font-extrabold text-white text-[13px] tracking-wide">{c.name}</span>
                            <span className="text-white/50 text-[11px] font-semibold">{isAr ? c.serviceAr : c.serviceEn}</span>
                            <span className="text-white/25 text-[10px] font-bold">{isAr ? c.dateAr : c.dateEn}</span>
                        </div>
                    ))}
                </div>
            </div>
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
function PhonePreview({ isAr = true, projectName, setProjectName, niche, setNiche, handleStart }) {
    const niches = [
        { id: 'restaurant', icon: '🍔', nameAr: 'مطعم أو كافيه', nameEn: 'Restaurant / Cafe' },
        { id: 'ecommerce', icon: '🛍️', nameAr: 'متجر منتجات ملابس وعطور', nameEn: 'Store (Clothes/Perfumes)' },
        { id: 'clinic', icon: '🩺', nameAr: 'عيادة طبية أسنان وجلدية', nameEn: 'Clinic (Dental/Skin)' },
        { id: 'salon', icon: '💅', nameAr: 'صالون تجميل وسبا', nameEn: 'Beauty Salon & Spa' },
        { id: 'consultant', icon: '💡', nameAr: 'مستشار أو مدرب شخصي', nameEn: 'Consultant / Coach' },
        { id: 'services', icon: '💼', nameAr: 'شركة خدمات وصيانة وبرمجة', nameEn: 'Services (Tech/Cleaning)' },
        { id: 'other', icon: '✨', nameAr: 'نشاط تجاري آخر', nameEn: 'Other Business' },
    ];

    const placeholders = {
        restaurant: { ar: 'مثال: مطعم نوار، كافيه لافندر...', en: 'e.g. Lavender Cafe, Burger Joint...' },
        ecommerce: { ar: 'مثال: متجر الأناقة، دكان عطور...', en: 'e.g. Elegance Boutique, Perfume Shop...' },
        clinic: { ar: 'مثال: عيادة الشفاء، د. أحمد للأسنان...', en: 'e.g. Al-Shifa Clinic, Dr. Ali Dental...' },
        salon: { ar: 'مثال: صالون الجمال، ليدي كير...', en: 'e.g. Beauty Salon, Lady Care...' },
        consultant: { ar: 'مثال: كوتش أحمد، المستشار المالي...', en: 'e.g. Financial Consultant, Coach Ahmed...' },
        services: { ar: 'مثال: شركة تميز للبرمجيات، شركة تنظيف...', en: 'e.g. Tech Solutions, Cleaning Agency...' },
        other: { ar: 'مثال: مغسلة الجودة، ورشة الأمل...', en: 'e.g. Quality Carwash, Al-Amal Workshop...' },
    };

    return (
        <div style={{
            position: 'relative',
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-start',
            padding: '16px 16px 14px', gap: '0',
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
            <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10px' }}>
                    <img src="/Logo.png" style={{
                        width: '38px', marginBottom: '8px',
                        filter: 'drop-shadow(0 0 12px rgba(13, 148, 136, 0.4))'
                    }} alt="Logo" />

                    <div style={{ textAlign: 'center', marginBottom: '4px', width: '100%' }}>
                        <h2 style={{ color: '#fff', fontSize: '15px', fontWeight: '900', fontFamily: 'Cairo', lineHeight: 1.35, marginBottom: '2px' }}>
                            {isAr ? 'جرّب نظام البيع الذكي' : 'Try the Smart Sales System'}
                        </h2>
                        <p style={{ color: '#a0b0a8', fontSize: '10.5px', lineHeight: 1.4, fontFamily: 'Cairo' }}>
                            {isAr ? 'اكتشف كيف يشتري عميلك منتجاتك عبر واتساب' : 'Discover how your customers buy your products via WhatsApp'}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '270px', padding: '2px' }} className="scrollbar-thin">
                    <div style={{ width: '100%' }}>
                        <label style={{
                            color: '#c8d8c8', fontSize: '11px', fontWeight: '700',
                            display: 'block', marginBottom: '4px',
                            textAlign: isAr ? 'right' : 'left', fontFamily: 'Cairo'
                        }}>
                            {isAr ? 'اكتب اسم المشروع' : 'Write project name'}
                        </label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder={placeholders[niche]?.[isAr ? 'ar' : 'en'] || (isAr ? 'مثال: متجر الأناقة، مطعم نوار...' : 'e.g. Noor Store, Burger Hub...')}
                            className="phone-input-field"
                            style={{
                                width: '100%', background: 'rgba(17, 26, 21, 0.6)',
                                border: '1.5px solid #0d9488',
                                borderRadius: '12px', padding: '10px 12px',
                                color: '#e9edef', fontSize: '12.5px',
                                fontFamily: 'Cairo', outline: 'none',
                                textAlign: isAr ? 'right' : 'left',
                                boxSizing: 'border-box',
                                transition: 'all 0.3s'
                            }}
                        />
                    </div>

                    <div style={{ width: '100%' }}>
                        <label style={{
                            color: '#c8d8c8', fontSize: '11px', fontWeight: '700',
                            display: 'block', marginBottom: '6px',
                            textAlign: isAr ? 'right' : 'left', fontFamily: 'Cairo'
                        }}>
                            {isAr ? 'نوع المشروع أو النشاط' : 'Business Niche / Type'}
                        </label>
                        <select
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            style={{
                                width: '100%', background: 'rgba(17, 26, 21, 0.6)',
                                border: '1.5px solid #0d9488',
                                borderRadius: '12px', padding: '10px 12px',
                                color: '#e9edef', fontSize: '12.5px',
                                fontFamily: 'Cairo', outline: 'none',
                                boxSizing: 'border-box',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                appearance: 'none',
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230d9488' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: isAr ? 'left 12px center' : 'right 12px center',
                                backgroundSize: '16px',
                                paddingLeft: isAr ? '36px' : '12px',
                                paddingRight: isAr ? '12px' : '36px'
                            }}
                        >
                            {niches.map(n => (
                                <option key={n.id} value={n.id} style={{ background: '#0a0d0b', color: '#e9edef' }}>
                                    {n.icon} {isAr ? n.nameAr : n.nameEn}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleStart}
                    disabled={!projectName.trim()}
                    style={{
                        width: '100%', padding: '12px',
                        background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                        borderRadius: '12px', border: 'none',
                        color: '#fff', fontSize: '13px', fontWeight: '800',
                        fontFamily: 'Cairo', cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(13, 148, 136, 0.25)',
                        opacity: projectName.trim() ? 1 : 0.5,
                        marginTop: 'auto'
                    }}
                >
                    {isAr ? '🚀 ابدأ التجربة ←' : '🚀 Start Demo →'}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════ CONTACT WIDGET ═══════════════════════════════════════════════ */
function ContactWidget({ lang, view, isDemoEnded }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const isAr = lang === 'ar';

    useEffect(() => {
        // If inside the simulator and demo ended (final CTA screen), show the widget!
        if (view === 'simulator' && isDemoEnded) {
            setIsVisible(true);
            return;
        }

        // If in another state inside simulator (like catalog), hide it!
        if (view !== 'landing') {
            setIsVisible(false);
            return;
        }

        const handleScroll = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [view, isDemoEnded]);

    const handleToggle = () => setIsOpen(!isOpen);

    const contactNumber = '+96892321683';
    const emailAddress = 'info@elegant-options.com';

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[999] flex flex-col items-start gap-3 select-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{ duration: 0.2 }}
                        className="bg-zinc-900/95 border border-white/[0.08] p-4 rounded-[24px] shadow-2xl backdrop-blur-md w-[260px] flex flex-col gap-3"
                        style={{ borderBottomLeftRadius: '4px' }}
                    >
                        {/* Call Option */}
                        <a
                            href={`tel:${contactNumber}`}
                            className="flex items-center justify-between hover:bg-white/5 p-1.5 rounded-xl transition-all duration-200"
                        >
                            <div className="flex-1 pr-3 text-right">
                                <div className="text-white font-extrabold text-[13px]">{isAr ? 'اتصال' : 'Call'}</div>
                                <div className="text-white/40 text-[11px] font-mono mt-0.5" dir="ltr">{contactNumber}</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#a78566] text-white flex items-center justify-center shadow-md shrink-0">
                                <Phone size={16} />
                            </div>
                        </a>

                        {/* Divider */}
                        <div className="h-[1px] bg-white/[0.06] w-full" />

                        {/* WhatsApp Option */}
                        <a
                            href={`https://wa.me/96892321683?text=${encodeURIComponent(isAr ? 'اطلعت على عرض التجريبي' : 'I have reviewed the demo')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between hover:bg-white/5 p-1.5 rounded-xl transition-all duration-200"
                        >
                            <div className="flex-1 pr-3 text-right">
                                <div className="text-white font-extrabold text-[13px]">{isAr ? 'واتساب' : 'WhatsApp'}</div>
                                <div className="text-white/40 text-[11px] font-mono mt-0.5" dir="ltr">{contactNumber}</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-md shrink-0">
                                <MessageCircle size={16} />
                            </div>
                        </a>

                        {/* Divider */}
                        <div className="h-[1px] bg-white/[0.06] w-full" />

                        {/* Email Option */}
                        <a
                            href={`mailto:${emailAddress}`}
                            className="flex items-center justify-between hover:bg-white/5 p-1.5 rounded-xl transition-all duration-200"
                        >
                            <div className="flex-1 pr-3 text-right">
                                <div className="text-white font-extrabold text-[13px]">{isAr ? 'ايميل' : 'Email'}</div>
                                <div className="text-white/40 text-[11px] font-mono mt-0.5" dir="ltr">{emailAddress}</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#a78566] text-white flex items-center justify-center shadow-md shrink-0">
                                <Mail size={16} />
                            </div>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                onClick={handleToggle}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-full text-white shadow-2xl relative z-10 transition-all duration-300 border border-green-500/20"
                style={{
                    background: isOpen 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'linear-gradient(135deg, #0e1712 0%, #1c2e24 100%)',
                    boxShadow: isOpen ? 'none' : '0 8px 24px rgba(37,211,102,0.15)',
                    backdropFilter: isOpen ? 'blur(10px)' : 'none'
                }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X size={16} className="text-white/60" />
                            <span className="font-extrabold text-[12.5px] tracking-wide" style={{ fontFamily: 'Cairo' }}>{isAr ? 'إغلاق القائمة' : 'Close Menu'}</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="phone"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Phone size={14} className="text-[#25d366]" />
                            <span className="font-extrabold text-[12.5px] tracking-wide text-[#fef08a]" style={{ fontFamily: 'Cairo' }}>{isAr ? 'للاستفسار والتواصل المباشر' : 'For inquiries & direct contact'}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}


/* ═══════════════════ BOOKING MODAL ═══════════════════════════════════════════════ */
function BookingModal({ isOpen, onClose, lang }) {
    const isAr = lang === 'ar';
    const [isBooked, setIsBooked] = useState(false);

    // GoHighLevel Calendar IDs
    // If you duplicate the calendar inside GoHighLevel for Arabic, paste the Arabic calendar ID below:
    const GHL_CALENDAR_EN = 'xA4kEVDOLF2omAB2JPM4';
    const GHL_CALENDAR_AR = 'xA4kEVDOLF2omAB2JPM4'; // Replace with Arabic calendar ID if created
    
    const activeCalendarId = isAr ? GHL_CALENDAR_AR : GHL_CALENDAR_EN;

    useEffect(() => {
        if (isOpen) {
            setIsBooked(false); // Reset when opened

            // Load the embed script dynamically
            const script = document.createElement('script');
            script.src = 'https://brand.elegant-options.com/js/form_embed.js';
            script.type = 'text/javascript';
            script.async = true;
            document.body.appendChild(script);

            // Listen to postMessage event from HighLevel iframe
            const handleMessage = (event) => {
                const isBookingComplete = 
                    (Array.isArray(event.data) && event.data[0] === 'msgsndr-booking-complete') ||
                    (typeof event.data === 'string' && event.data.includes('booking-complete'));
                
                if (isBookingComplete) {
                    setIsBooked(true);
                }
            };

            window.addEventListener('message', handleMessage);

            return () => {
                const loadedScript = document.querySelector('script[src="https://brand.elegant-options.com/js/form_embed.js"]');
                if (loadedScript) {
                    document.body.removeChild(loadedScript);
                }
                window.removeEventListener('message', handleMessage);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="bg-zinc-950 border border-white/10 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl w-full max-w-2xl flex flex-col relative my-auto max-h-[92vh] sm:max-h-none"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all z-10"
                >
                    <X size={18} />
                </button>

                {isBooked ? (
                    <div className="p-8 flex flex-col items-center text-center gap-6" style={{ minHeight: '420px', justifyContent: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 shadow-[0_0_40px_rgba(34,197,94,0.15)]"
                        >
                            <CheckCircle2 size={44} className="animate-pulse" />
                        </motion.div>

                        <div className="space-y-3">
                            <h3 className="text-white font-black text-2xl" style={{ fontFamily: 'Cairo' }}>
                                {isAr ? 'تم حجز موعدك بنجاح! 🎉' : 'Appointment Booked Successfully! 🎉'}
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto" style={{ fontFamily: 'Cairo' }}>
                                {isAr 
                                    ? 'شكراً لك! لقد تم تسجيل موعد الاجتماع بنجاح. سنقوم بالتواصل معك قريباً لتأكيد الموعد والبدء في تهيئة وتخصيص نظام الأتمتة بالكامل ليناسب مشروعك.'
                                    : 'Thank you! Your meeting has been scheduled successfully. We will contact you shortly to confirm the appointment and start configuring the automation system to suit your project.'}
                            </p>
                        </div>

                        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-right" dir={isAr ? 'rtl' : 'ltr'}>
                            <h4 className="text-white/80 font-bold text-xs uppercase tracking-wider" style={{ fontFamily: 'Cairo', textAlign: isAr ? 'right' : 'left' }}>
                                {isAr ? 'الخطوات التالية:' : 'Next Steps:'}
                            </h4>
                            <ul className="text-slate-400 text-xs space-y-2" style={{ fontFamily: 'Cairo', textAlign: isAr ? 'right' : 'left' }}>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#25d366] mt-0.5">•</span>
                                    <span>{isAr ? 'سنرسل لك تفاصيل الموعد ورابط الاجتماع عبر بريدك الإلكتروني.' : 'We will send appointment details and meeting link to your email.'}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#25d366] mt-0.5">•</span>
                                    <span>{isAr ? 'سيتواصل معك خبير الأتمتة لدينا هاتفياً أو عبر الواتساب لتأكيد احتياجاتك.' : 'Our automation expert will reach out via call or WhatsApp to confirm your needs.'}</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-xl font-black text-sm text-black transition-all hover:opacity-90 active:scale-95 shadow-lg"
                            style={{
                                background: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)',
                                fontFamily: 'Cairo'
                            }}
                        >
                            {isAr ? 'موافق، إغلاق' : 'Okay, Close'}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="px-6 pt-6 pb-3 border-b border-white/5 text-right">
                            <h3 className="text-white font-black text-[16px] pr-2" style={{ fontFamily: 'Cairo' }}>
                                {isAr ? '📅 حجز موعد اجتماع مجاني' : '📅 Book a Free Meeting'}
                            </h3>
                        </div>

                        {/* Iframe Body */}
                        <div className="flex-1 p-1 bg-[#0A0A0A] overflow-y-auto" style={{ height: '70vh', minHeight: '480px', maxHeight: '650px' }}>
                            <iframe
                                src={`https://brand.elegant-options.com/widget/booking/${activeCalendarId}?lang=${isAr ? 'ar' : 'en'}`}
                                style={{ width: '100%', height: '100%', minHeight: '620px', border: 'none' }}
                                scrolling="yes"
                                id={`${activeCalendarId}_1782505878870`}
                            />
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
}

/* ═══════════════════ APP MAIN ═══════════════════════════════════════════════════ */
function App() {
    const [view, setView] = useState('landing');
    const [lang, setLang] = useState('ar');
    const [projectName, setProjectName] = useState('');
    const [niche, setNiche] = useState('restaurant');
    const [loadingStep, setLoadingStep] = useState(0);
    const [phoneKey, setPhoneKey] = useState(0);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isDemoEnded, setIsDemoEnded] = useState(false);
    const isAr = lang === 'ar';

    const startSimulator = () => {
        let defaultName = '';
        if (niche === 'restaurant') defaultName = isAr ? 'مطعم برجر هاوس' : 'Burger House Restaurant';
        else if (niche === 'ecommerce') defaultName = isAr ? 'متجر الأناقة' : 'Elegance Fashion Store';
        else if (niche === 'clinic') defaultName = isAr ? 'عيادة الشفاء لطب الأسنان' : 'Al-Shifa Dental Clinic';
        else if (niche === 'salon') defaultName = isAr ? 'صالون الجمال والمكياج' : 'Beauty Salon & Spa';
        else if (niche === 'consultant') defaultName = isAr ? 'كوتش أحمد للاستشارات' : 'Coach Ahmed Consulting';
        else if (niche === 'services') defaultName = isAr ? 'شركة تميز للبرمجيات' : 'Tech Solutions Company';
        else defaultName = isAr ? 'مغسلة الجودة السريعة' : 'Quality Car Wash';

        const name = projectName.trim() || defaultName;
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
                                    niche={niche}
                                    setNiche={setNiche}
                                    handleStart={startSimulator}
                                />
                            </Phone3D>
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

                        {/* ─ 2. HEADLINE (BELOW PHONE) ─ */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-center max-w-3xl mb-2">
                            <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-black leading-[1.3] text-white tracking-tight">
                                {t.headline}
                            </h1>
                        </motion.div>

                        {/* ─ 3. SUBHEADLINE ─ */}
                        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                            className="text-[18px] sm:text-[22px] text-white/75 font-semibold mb-6 text-center max-w-2xl">
                            {t.sub}
                        </motion.h2>

                        {/* ─ 4. DESCRIPTION ─ */}
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="text-center mb-8 max-w-xl space-y-2">
                            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-semibold">
                                {t.desc1}
                            </p>
                            <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-semibold">
                                {t.desc2}
                            </p>
                        </motion.div>
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
                            <RecentProjects lang={lang} />
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
                                    config={{ projectName, niche, platform: 'whatsapp', lang }}
                                    onBack={() => {
                                        setView('landing');
                                        setPhoneKey(prev => prev + 1);
                                        setIsDemoEnded(false);
                                    }}
                                    onBookMeeting={() => setIsBookingOpen(true)}
                                    onDemoEnded={() => setIsDemoEnded(true)}
                                    onResetDemo={() => setIsDemoEnded(false)}
                                />
                            </div>

                            {/* Home Indicator */}
                            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/20 rounded-full z-[60]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <ContactWidget lang={lang} view={view} isDemoEnded={isDemoEnded} />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} lang={lang} />
        </div>
    );
}

export default App;
