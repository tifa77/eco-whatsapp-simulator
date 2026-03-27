import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ShoppingCart } from 'lucide-react';

/* ─── Categories ────────────────────────────────────────────────────────────── */
const CATEGORIES = [
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
        descAr: 'عزل ضوضاء نشط، جودة صوت استثنائية، مقاومة للماء',
        descEn: 'Active noise cancellation, exceptional sound, water resistant',
        img: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&q=80',
    },
    {
        id: 'p2', category: 'electronics',
        nameAr: 'ساعة سامسونج الذكية', nameEn: 'Samsung Smart Watch',
        price: 89.99,
        descAr: 'شاشة AMOLED، تتبع اللياقة، بطارية 40 ساعة',
        descEn: 'AMOLED display, fitness tracking, 40h battery',
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    },
    {
        id: 'p3', category: 'fashion',
        nameAr: 'جاكيت شتوي فاخر', nameEn: 'Luxury Winter Jacket',
        price: 44.99,
        descAr: 'قماش صوف عالي الجودة، تصميم عصري، دافئ للغاية',
        descEn: 'Premium wool, modern design, very warm',
        img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    },
    {
        id: 'p4', category: 'fashion',
        nameAr: 'حذاء رياضي نايكي', nameEn: 'Nike Sport Shoes',
        price: 34.99,
        descAr: 'مريح للجري، تقنية Air Max المتقدمة',
        descEn: 'Running comfort, advanced Air Max tech',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    },
    {
        id: 'p5', category: 'accessories',
        nameAr: 'ساعة جلد كلاسيكية', nameEn: 'Classic Leather Watch',
        price: 75.00,
        descAr: 'حزام جلد طبيعي، ميناء أنيق، مقاومة للماء',
        descEn: 'Genuine leather strap, elegant dial, water resistant',
        img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    },
    {
        id: 'p6', category: 'accessories',
        nameAr: 'حقيبة يد نسائية فاخرة', nameEn: 'Luxury Handbag',
        price: 69.99,
        descAr: 'جلد إيطالي أصيل، تصميم حديث وأنيق',
        descEn: 'Genuine Italian leather, modern elegant design',
        img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    },
    {
        id: 'p7', category: 'beauty',
        nameAr: 'عطر رجالي مميز', nameEn: 'Signature Perfume',
        price: 49.99,
        descAr: 'عطر فواح يدوم طوال اليوم، تركيز عالي',
        descEn: 'Long-lasting fragrance, high concentration',
        img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    },
    {
        id: 'p8', category: 'beauty',
        nameAr: 'مجموعة العناية بالبشرة', nameEn: 'Skincare Set',
        price: 39.99,
        descAr: 'غسول + مرطب + سيروم، لجميع أنواع البشرة',
        descEn: 'Cleanser + moisturizer + serum, all skin types',
        img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    },
];

/* ═══════════════════ COMPONENT ═══════════════════════════════════════════════ */
export default function CatalogFlowSheet({ isOpen, onClose, onSubmit, onReturnToMain, lang = 'ar', niche = 'ecommerce' }) {
    const isAr = lang === 'ar';
    const [cart, setCart] = useState({});
    const [activeCategory, setActiveCategory] = useState('electronics');
    const [cartAnim, setCartAnim] = useState(''); // for animation trigger

    useEffect(() => {
        if (isOpen) setActiveCategory('electronics');
    }, [isOpen]);

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
                                        {isAr ? 'الكاتلوج' : 'Catalog'}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            onClose();
                                            if (onReturnToMain) onReturnToMain();
                                        }}
                                        style={{
                                            background: '#f8fafc',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            color: '#64748b',
                                            padding: '4px 8px',
                                            fontSize: '11px',
                                            fontFamily: 'Cairo',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        {isAr ? '🏠 الرئيسية' : '🏠 Main'}
                                    </button>
                                    <button onClick={onClose} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                                        <X size={15} />
                                    </button>
                                </div>
                            </div>

                            {/* Categories pills — sticky */}
                            <div className="flex gap-1.5 overflow-x-auto px-4 pb-2.5" style={{ scrollbarWidth: 'none' }}>
                                {CATEGORIES.map(cat => (
                                    <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                                        className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all border
                                            ${activeCategory === cat.id
                                                ? 'bg-[#128C7E] text-white border-[#128C7E]'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                                        {isAr ? cat.nameAr : cat.nameEn}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ─ Products List (Meta-style cards) ─ */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 pb-[100px]" style={{ scrollbarWidth: 'none' }}>
                            <AnimatePresence mode="wait">
                                <motion.div key={activeCategory}
                                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    className="flex flex-col">
                                    {filtered.map((item, idx) => (
                                        <div key={item.id} className={`bg-white ${idx > 0 ? 'border-t border-gray-100' : ''}`}>
                                            {/* Product Image — full width, 180px tall */}
                                            <div className="w-full h-[180px] overflow-hidden bg-gray-100">
                                                <img
                                                    src={item.img}
                                                    alt={isAr ? item.nameAr : item.nameEn}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="px-4 py-3">
                                                <h3 className="text-gray-900 font-bold text-[15px] mb-0.5">
                                                    {isAr ? item.nameAr : item.nameEn}
                                                </h3>
                                                <p className="text-gray-500 text-[12px] leading-snug mb-2">
                                                    {isAr ? item.descAr : item.descEn}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    {/* Price */}
                                                    <span className="text-[#128C7E] font-black text-[16px]">
                                                        {isAr ? `${item.price.toFixed(2)} د.ك` : `$${item.price.toFixed(2)}`}
                                                    </span>

                                                    {/* Add / Qty */}
                                                    {!cart[item.id] ? (
                                                        <button onClick={() => handleAdd(item.id)}
                                                            className="bg-[#25d366] hover:bg-[#1fa855] text-white text-[12px] font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-sm">
                                                            <Plus size={14} />
                                                            {isAr ? 'أضف للسلة' : 'Add to Cart'}
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-3 bg-[#E8F5E9] rounded-full px-1 py-0.5 border border-[#25d366]/30">
                                                            <button onClick={() => handleSub(item.id)}
                                                                className="w-7 h-7 flex items-center justify-center text-[#128C7E] hover:bg-[#C8E6C9] rounded-full transition-colors">
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="text-gray-900 text-sm font-black w-4 text-center">{cart[item.id]}</span>
                                                            <button onClick={() => handleAdd(item.id)}
                                                                className="w-7 h-7 flex items-center justify-center text-[#128C7E] hover:bg-[#C8E6C9] rounded-full transition-colors">
                                                                <Plus size={14} />
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

                        {/* ─ Sticky Cart Bar ─ */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-10">
                            <motion.button
                                onClick={handleSubmit}
                                disabled={totalItems === 0}
                                whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                                animate={cartAnim === 'bounce' ? { scale: [1, 1.03, 1] } : {}}
                                className={`w-full py-3.5 rounded-xl flex items-center justify-between px-5 transition-all font-bold text-[14px]
                                    ${totalItems > 0
                                        ? 'bg-[#25d366] text-white shadow-md'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <ShoppingBag size={18} />
                                        {totalItems > 0 && (
                                            <motion.div key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                className="absolute -top-1.5 -right-1.5 bg-white text-[#128C7E] w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shadow-sm">
                                                {totalItems}
                                            </motion.div>
                                        )}
                                    </div>
                                    <span>{isAr ? 'اعتماد الطلب ✅' : 'Send Order ✅'}</span>
                                </div>
                                <span className="font-black">
                                    {totalItems > 0
                                        ? (isAr ? `${totalPrice.toFixed(2)} د.ك` : `$${totalPrice.toFixed(2)}`)
                                        : (isAr ? 'أضف منتجات' : 'Add items')}
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
