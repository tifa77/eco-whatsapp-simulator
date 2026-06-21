import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ShoppingCart } from 'lucide-react';

/* ─── Categories ────────────────────────────────────────────────────────────── */
const CATEGORIES = [
    { id: 'food', nameAr: 'مطعم 🍽️', nameEn: 'Restaurant 🍽️' },
    { id: 'electronics', nameAr: 'إلكترونيات 💻', nameEn: 'Electronics 💻' },
    { id: 'fashion', nameAr: 'أزياء 👗', nameEn: 'Fashion 👗' },
    { id: 'accessories', nameAr: 'إكسسوارات ⌚', nameEn: 'Accessories ⌚' },
    { id: 'beauty', nameAr: 'عناية وجمال 💄', nameEn: 'Beauty 💄' },
];

/* ─── Products ──────────────────────────────────────────────────────────────── */
const PRODUCTS = [
    {
        id: 'p1', category: 'electronics',
        nameAr: 'سماعات أبل AirPods Pro', nameEn: 'Apple AirPods Pro',
        price: 59.99,
        descAr: 'عزل ضوضاء نشط، جودة صوت استثنائية، مقاومة للماء والتعرق',
        descEn: 'Active noise cancellation, exceptional sound quality, water and sweat resistant',
        img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80',
    },
    {
        id: 'p2', category: 'electronics',
        nameAr: 'ساعة سامسونج الذكية', nameEn: 'Samsung Smart Watch',
        price: 89.99,
        descAr: 'شاشة AMOLED، تتبع اللياقة البدنية والأنشطة الرياضية، عمر بطارية يصل لـ 40 ساعة',
        descEn: 'AMOLED display, fitness and activity tracking, up to 40 hours battery life',
        img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    },
    {
        id: 'p3', category: 'fashion',
        nameAr: 'جاكيت شتوي فاخر', nameEn: 'Luxury Winter Jacket',
        price: 44.99,
        descAr: 'قماش صوف عالي الجودة، تصميم عصري وأنيق، يوفر دفئاً ممتازاً',
        descEn: 'High quality wool fabric, modern and elegant design, provides excellent warmth',
        img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    },
    {
        id: 'p4', category: 'fashion',
        nameAr: 'حذاء رياضي نايكي', nameEn: 'Nike Sport Shoes',
        price: 34.99,
        descAr: 'مريح جداً للجري والأنشطة اليومية، مدعوم بتقنية Air Max المتقدمة',
        descEn: 'Highly comfortable for running and daily activities, powered by Air Max technology',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    },
    {
        id: 'p5', category: 'accessories',
        nameAr: 'ساعة جلد كلاسيكية', nameEn: 'Classic Leather Watch',
        price: 75.00,
        descAr: 'حزام جلد طبيعي 100%، ميناء أنيق وجذاب، مقاومة للمياه حتى عمق 30 متراً',
        descEn: '100% genuine leather strap, elegant dial, water resistant up to 30m',
        img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    },
    {
        id: 'p6', category: 'accessories',
        nameAr: 'حقيبة يد نسائية فاخرة', nameEn: 'Luxury Handbag',
        price: 69.99,
        descAr: 'جلد إيطالي أصيل مصنوع يدوياً، بتصميم داخلي واسع لسهولة التنظيم',
        descEn: 'Handcrafted genuine Italian leather, spacious inner design for easy organization',
        img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    },
    {
        id: 'p7', category: 'beauty',
        nameAr: 'عطر رجالي مميز', nameEn: 'Signature Perfume',
        price: 49.99,
        descAr: 'تركيبة عطرية فواحة تدوم طويلاً، تركيز عالي ومناسب لجميع المناسبات',
        descEn: 'Long-lasting fragrance, high concentration, suitable for all occasions',
        img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80',
    },
    {
        id: 'p8', category: 'beauty',
        nameAr: 'مجموعة العناية بالبشرة', nameEn: 'Skincare Set',
        price: 39.99,
        descAr: 'مجموعة متكاملة (غسول + مرطب + سيروم) مصممة خصيصاً لجميع أنواع البشرة',
        descEn: 'Complete set (cleanser + moisturizer + serum) designed for all skin types',
        img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    },
    {
        id: 'p9', category: 'food',
        nameAr: 'برغر لحم مشوي', nameEn: 'Grilled Beef Burger',
        price: 8.99,
        descAr: 'شريحة لحم بقري مشوية على اللهب مع الجبن الذائب والخضار الطازجة والصوص المميز',
        descEn: 'Flame-grilled beef patty with melted cheese, fresh vegetables, and signature sauce',
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    },
    {
        id: 'p10', category: 'food',
        nameAr: 'بيتزا مارغريتا', nameEn: 'Margherita Pizza',
        price: 9.99,
        descAr: 'عجينة نابولي كلاسيكية هشة مغطاة بصلصة الطماطم الطبيعية وجبنة الموزاريلا وأوراق الريحان',
        descEn: 'Classic Neapolitan crust topped with natural tomato sauce, mozzarella cheese, and fresh basil',
        img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    }
];

/* ═══════════════════ COMPONENT ═══════════════════════════════════════════════ */
export default function CatalogFlowSheet({ isOpen, onClose, onSubmit, lang = 'ar', niche = 'products', projectName, onReturnToMain }) {
    const isAr = lang === 'ar';
    const [cart, setCart] = useState({});
    const [activeCategory, setActiveCategory] = useState('food');
    const [cartAnim, setCartAnim] = useState(''); // for animation trigger

    useEffect(() => {
        if (isOpen) {
            // Set active category based on niche
            if (niche === 'restaurant' || niche === 'food') {
                setActiveCategory('food');
            } else if (niche === 'clinic' || niche === 'beauty') {
                setActiveCategory('beauty');
            } else {
                setActiveCategory('electronics');
            }
        }
    }, [isOpen, niche]);

    const handleAdd = (id) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
        setCartAnim('bounce');
        setTimeout(() => setCartAnim(''), 300);
    };

    const handleSub = (id) => setCart(prev => {
        const c = prev[id] || 0;
        if (c <= 1) { const n = { ...prev }; delete n[id]; return n; }
        return { ...prev, [id]: c - 1 };
    });

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = useMemo(() =>
        Object.entries(cart).reduce((sum, [id, qty]) => {
            const item = PRODUCTS.find(p => p.id === id);
            return sum + ((item?.price || 0) * qty);
        }, 0), [cart]);

    const filtered = PRODUCTS.filter(p => p.category === activeCategory);

    const handleSubmit = () => {
        if (totalItems === 0) return;
        const summary = Object.entries(cart).map(([id, qty]) => {
            const item = PRODUCTS.find(p => p.id === id);
            return item ? `${qty}x ${isAr ? item.nameAr : item.nameEn}` : '';
        }).filter(Boolean).join(', ');
        onSubmit(summary, totalPrice);
        setTimeout(() => setCart({}), 400);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]" />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                        className="absolute bottom-0 left-0 right-0 rounded-t-[24px] border-t border-white/[0.08] z-[70] flex flex-col"
                        style={{ height: '88%', background: '#FFFFFF' }}
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        {/* ─ Header ─ */}
                        <div className="shrink-0 rounded-t-[24px] bg-white border-b border-gray-100">
                            {/* Drag handle */}
                            <div className="flex justify-center pt-2 pb-1">
                                <div className="w-9 h-1 bg-gray-300 rounded-full" />
                            </div>
                            {/* Title bar */}
                            <div className="flex justify-between items-center px-4 pb-2">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart size={16} className="text-[#128C7E]" />
                                    <h2 className="text-gray-900 font-bold text-[15px]">
                                        {projectName || (isAr ? 'الكاتلوج' : 'Catalog')}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    {onReturnToMain && (
                                        <button
                                            onClick={() => { onClose(); onReturnToMain(); }}
                                            className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors text-[11px] font-bold font-cairo flex items-center gap-1"
                                        >
                                            🏠 {isAr ? 'الرئيسية' : 'Main'}
                                        </button>
                                    )}
                                    <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                                        <X size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Categories pills — sticky — Meta style underline */}
                            <div className="flex gap-4 overflow-x-auto px-4 border-b border-gray-100" style={{ scrollbarWidth: 'none' }}>
                                {CATEGORIES.map(cat => (
                                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                                        className={`shrink-0 pb-2 text-[13px] font-bold transition-all border-b-2 flex items-center gap-1.5
                                            ${activeCategory === cat.id
                                                ? 'text-[#00a884] border-[#00a884] font-black'
                                                : 'text-gray-500 border-transparent hover:text-gray-800'}`}>
                                        <span>{isAr ? cat.nameAr.split(' ')[0] : cat.nameEn.split(' ')[0]}</span>
                                        <span className="text-[14px]">{isAr ? cat.nameAr.split(' ')[1] : cat.nameEn.split(' ')[1]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ─ Products List (Meta-style 2-column grid) ─ */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 pb-[100px]" style={{ scrollbarWidth: 'none' }}>
                            <AnimatePresence mode="wait">
                                <motion.div key={activeCategory}
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    className="grid grid-cols-2 gap-2.5 p-3">
                                    {filtered.map((item) => (
                                        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col justify-between shadow-sm pb-3 relative">
                                            
                                            {/* Check Circle Badge */}
                                            {cart[item.id] > 0 && (
                                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#25d366] border border-white flex items-center justify-center text-white z-10 shadow-sm">
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Product Image */}
                                            <div className="w-full h-[115px] overflow-hidden bg-gray-50 relative">
                                                <img
                                                    src={item.img}
                                                    alt={isAr ? item.nameAr : item.nameEn}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="px-2.5 pt-2 flex-1 flex flex-col justify-between">
                                                <div className="mb-1">
                                                    <h3 className="text-gray-900 font-bold text-[12px] leading-tight text-right">
                                                        {isAr ? item.nameAr : item.nameEn}
                                                    </h3>
                                                </div>
                                                
                                                <div>
                                                    {/* Price */}
                                                     <p className="text-[#128C7E] font-black text-[12px] mb-2 text-right">
                                                         {`$${item.price.toFixed(2)}`}
                                                     </p>

                                                    {/* Add / Qty — Meta Style */}
                                                    {!cart[item.id] ? (
                                                        <button onClick={() => handleAdd(item.id)}
                                                            className="w-full py-1.5 px-3 rounded-xl border border-[#25d366] text-[#25d366] font-bold text-[11px] hover:bg-[#e8f5e9]/50 transition-colors flex items-center justify-center gap-1">
                                                            <Plus size={11} />
                                                            {isAr ? 'إضافة' : 'Add'}
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-between w-full rounded-xl border border-[#25d366] h-8 overflow-hidden bg-white" dir="ltr">
                                                            <button onClick={() => handleAdd(item.id)}
                                                                className="w-8 h-full flex items-center justify-center bg-[#25d366] text-white active:bg-[#1fa855] transition-colors">
                                                                <Plus size={12} strokeWidth={3} />
                                                            </button>
                                                            <span className="text-gray-900 text-[13px] font-bold w-6 text-center">{cart[item.id]}</span>
                                                            <button onClick={() => handleSub(item.id)}
                                                                className="w-8 h-full flex items-center justify-center bg-white text-[#25d366] active:bg-gray-50 transition-colors border-l border-[#25d366]">
                                                                <Minus size={12} strokeWidth={3} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ─ Sticky Cart Bar — Meta Design ─ */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3.5 z-10">
                            <motion.button
                                onClick={handleSubmit}
                                disabled={totalItems === 0}
                                whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                                animate={cartAnim === 'bounce' ? { scale: [1, 1.02, 1] } : {}}
                                className={`w-full py-3.5 rounded-full flex items-center justify-between px-5 transition-all font-bold text-[14px]
                                    ${totalItems > 0
                                        ? 'bg-[#25d366] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                <span className="font-black text-[13px]">
                                    {totalItems > 0
                                        ? `$${totalPrice.toFixed(2)}`
                                        : ''}
                                </span>
                                <span className="text-[14.5px] font-black">{isAr ? 'عرض السلة' : 'View Cart'}</span>
                                <div className="flex items-center justify-center bg-[#1ebe5d] w-6 h-6 rounded-full text-[11px] font-black text-white">
                                    {totalItems}
                                </div>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
