import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ShoppingCart, Star, ChevronDown } from 'lucide-react';

// ─── Product Catalog ───────────────────────────────────────────────────────────
const CATEGORIES = [
    { id: 'electronics', nameAr: 'إلكترونيات 💻', nameEn: 'Electronics 💻' },
    { id: 'fashion', nameAr: 'أزياء 👗', nameEn: 'Fashion 👗' },
    { id: 'accessories', nameAr: 'إكسسوارات ⌚', nameEn: 'Accessories ⌚' },
    { id: 'beauty', nameAr: 'عناية وجمال 💄', nameEn: 'Beauty 💄' },
];

const PRODUCTS = [
    {
        id: 'p1', category: 'electronics',
        nameAr: 'سماعات أبل AirPods Pro', nameEn: 'Apple AirPods Pro',
        price: 59.99,
        descAr: 'عزل ضوضاء نشط، جودة صوت استثنائية، مقاومة للماء',
        descEn: 'Active noise cancellation, exceptional audio quality, water resistant',
        img: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&q=80',
        rating: 4.9, reviews: 1240,
        badge: 'الأكثر مبيعاً',
    },
    {
        id: 'p2', category: 'electronics',
        nameAr: 'ساعة سامسونج الذكية', nameEn: 'Samsung Smart Watch',
        price: 89.99,
        descAr: 'شاشة AMOLED، تتبع اللياقة، بطارية 40 ساعة',
        descEn: 'AMOLED display, fitness tracking, 40h battery',
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
        rating: 4.7, reviews: 856,
    },
    {
        id: 'p3', category: 'fashion',
        nameAr: 'جاكيت شتوي فاخر', nameEn: 'Luxury Winter Jacket',
        price: 44.99,
        descAr: 'قماش صوف عالي الجودة، تصميم عصري، دافئ للغاية',
        descEn: 'Premium wool fabric, modern design, very warm',
        img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
        rating: 4.8, reviews: 523,
        badge: 'جديد',
    },
    {
        id: 'p4', category: 'fashion',
        nameAr: 'حذاء رياضي نايكي', nameEn: 'Nike Air Sport Shoes',
        price: 34.99,
        descAr: 'مريح ومناسب للجري، تقنية air max',
        descEn: 'Comfortable for running, air max technology',
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
        rating: 4.6, reviews: 2110,
    },
    {
        id: 'p5', category: 'accessories',
        nameAr: 'ساعة جلد كلاسيكية', nameEn: 'Classic Leather Watch',
        price: 75.00,
        descAr: 'حزام جلد طبيعي، ميناء أنيق، مقاومة للماء',
        descEn: 'Genuine leather strap, elegant dial, water resistant',
        img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80',
        rating: 4.9, reviews: 748,
        badge: 'الأكثر مبيعاً',
    },
    {
        id: 'p6', category: 'accessories',
        nameAr: 'حقيبة يد نسائية فاخرة', nameEn: 'Luxury Women\'s Handbag',
        price: 69.99,
        descAr: 'جلد إيطالي أصيل، تصميم حديث وأنيق',
        descEn: 'Genuine Italian leather, modern elegant design',
        img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
        rating: 4.8, reviews: 432,
    },
    {
        id: 'p7', category: 'beauty',
        nameAr: 'عطر رجالي مميز', nameEn: 'Signature Men\'s Perfume',
        price: 49.99,
        descAr: 'عطر فواح يدوم طوال اليوم، تركيز عالي',
        descEn: 'Long-lasting fragrance all day, high concentration',
        img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80',
        rating: 4.7, reviews: 1560,
        badge: 'جديد',
    },
    {
        id: 'p8', category: 'beauty',
        nameAr: 'مجموعة العناية بالبشرة', nameEn: 'Skincare Set',
        price: 39.99,
        descAr: 'غسول + مرطب + سيروم، مناسب لجميع أنواع البشرة',
        descEn: 'Cleanser + moisturizer + serum, all skin types',
        img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
        rating: 4.6, reviews: 890,
    },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function CatalogFlowSheet({ isOpen, onClose, onSubmit, lang = 'ar', niche = 'products' }) {
    const isAr = lang === 'ar';
    const [cart, setCart] = useState({});
    const [activeCategory, setActiveCategory] = useState('electronics');

    React.useEffect(() => {
        if (isOpen) {
            setActiveCategory('electronics');
        }
    }, [isOpen]);

    const handleAdd = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const handleSub = (id) => setCart(prev => {
        const current = prev[id] || 0;
        if (current <= 1) {
            const next = { ...prev };
            delete next[id];
            return next;
        }
        return { ...prev, [id]: current - 1 };
    });

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = PRODUCTS.find(p => p.id === id);
        return sum + ((item?.price || 0) * qty);
    }, 0), [cart]);

    const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

    const handleSubmit = () => {
        if (totalItems === 0) return;
        const summaryString = Object.entries(cart).map(([id, qty]) => {
            const item = PRODUCTS.find(p => p.id === id);
            if (!item) return '';
            return `${qty}x ${isAr ? item.nameAr : item.nameEn}`;
        }).filter(Boolean).join(', ');
        onSubmit(summaryString, totalPrice);
        setTimeout(() => setCart({}), 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                        className="absolute bottom-0 left-0 right-0 rounded-t-[28px] border-t border-white/10 z-[70] flex flex-col shadow-[0_-15px_60px_rgba(0,0,0,0.9)]"
                        style={{ height: '88%', background: '#0A0A0F' }}
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        {/* Drag Handle & Header */}
                        <div className="flex flex-col items-center pt-3 pb-2 border-b border-white/[0.06] relative z-10 shrink-0 rounded-t-[28px]" style={{ background: '#0A0A0F' }}>
                            <div className="w-10 h-1 bg-white/20 rounded-full mb-3" />
                            <div className="flex justify-between items-center w-full px-4">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart size={18} className="text-cyan-400" />
                                    <h2 className="text-white font-black text-base">
                                        {isAr ? 'الكاتلوج 🛍️' : 'Catalog 🛍️'}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 bg-white/[0.06] hover:bg-white/10 rounded-full text-slate-400 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Categories */}
                            <div className="w-full flex gap-2 overflow-x-auto px-4 mt-3 pb-2" style={{ scrollbarWidth: 'none' }}>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeCategory === cat.id
                                            ? 'bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]'
                                            : 'bg-white/[0.05] text-slate-400 border border-white/[0.07] hover:bg-white/10'}`}
                                    >
                                        {isAr ? cat.nameAr : cat.nameEn}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1 overflow-y-auto px-3 py-3 pb-[110px]" style={{ scrollbarWidth: 'none', background: '#060609' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-3"
                                >
                                    {filteredProducts.map(item => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-[#111118] rounded-2xl border border-white/[0.06] overflow-hidden hover:border-cyan-500/30 transition-all group"
                                        >
                                            <div className="flex gap-0">
                                                {/* Image */}
                                                <div className="w-28 h-28 shrink-0 relative">
                                                    <img
                                                        src={item.img}
                                                        alt={isAr ? item.nameAr : item.nameEn}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    {item.badge && (
                                                        <div className="absolute top-1 left-1 right-1 text-center">
                                                            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black bg-cyan-500 text-white shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                                                                {item.badge}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col flex-1 p-3 justify-between">
                                                    <div>
                                                        <h3 className="text-white text-sm font-bold leading-tight mb-1">
                                                            {isAr ? item.nameAr : item.nameEn}
                                                        </h3>
                                                        <p className="text-slate-500 text-[10px] leading-snug line-clamp-2">
                                                            {isAr ? item.descAr : item.descEn}
                                                        </p>
                                                        {/* Rating */}
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <Star size={9} className="text-yellow-400 fill-yellow-400" />
                                                            <span className="text-yellow-400 text-[9px] font-bold">{item.rating}</span>
                                                            <span className="text-slate-600 text-[9px]">({item.reviews})</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="text-cyan-400 font-black text-sm">
                                                            {isAr ? `${item.price.toFixed(2)} د.ك` : `$${item.price.toFixed(2)}`}
                                                        </span>

                                                        {/* Cart Control */}
                                                        {!cart[item.id] ? (
                                                            <button
                                                                onClick={() => handleAdd(item.id)}
                                                                className="bg-cyan-500 hover:bg-cyan-400 text-white text-[11px] font-black px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.4)] hover:shadow-[0_0_14px_rgba(6,182,212,0.6)]"
                                                            >
                                                                <Plus size={12} />
                                                                {isAr ? 'أضف للسلة' : 'Add to Cart'}
                                                            </button>
                                                        ) : (
                                                            <div className="flex items-center gap-2 bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-0.5">
                                                                <button onClick={() => handleSub(item.id)} className="w-6 h-6 flex items-center justify-center text-cyan-400 hover:bg-white/10 rounded-md transition-colors">
                                                                    <Minus size={12} />
                                                                </button>
                                                                <span className="text-white text-xs font-black w-4 text-center">{cart[item.id]}</span>
                                                                <button onClick={() => handleAdd(item.id)} className="w-6 h-6 flex items-center justify-center text-cyan-400 hover:bg-white/10 rounded-md transition-colors">
                                                                    <Plus size={12} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Sticky Cart Button */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/95 to-transparent pt-10 pb-5 px-4 pointer-events-none">
                            <motion.button
                                onClick={handleSubmit}
                                disabled={totalItems === 0}
                                whileHover={totalItems > 0 ? { scale: 1.02 } : {}}
                                whileTap={totalItems > 0 ? { scale: 0.98 } : {}}
                                className={`w-full py-4 rounded-xl flex items-center justify-between px-5 transition-all shadow-lg pointer-events-auto border font-bold
                                    ${totalItems > 0
                                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white border-cyan-400/30 shadow-[0_0_25px_rgba(6,182,212,0.5)]'
                                        : 'bg-white/[0.04] text-slate-500 border-white/[0.05] cursor-not-allowed'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <ShoppingBag size={20} />
                                        {totalItems > 0 && (
                                            <motion.div
                                                key={totalItems}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-2 -right-2 bg-white text-cyan-700 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                                            >
                                                {totalItems}
                                            </motion.div>
                                        )}
                                    </div>
                                    <span className="text-sm tracking-wide">
                                        {isAr ? 'اعتماد الطلب ✅' : 'Send Order ✅'}
                                    </span>
                                </div>
                                <span className="text-sm font-black">
                                    {totalItems > 0
                                        ? (isAr ? `${totalPrice.toFixed(2)} د.ك` : `$${totalPrice.toFixed(2)}`)
                                        : (isAr ? 'أضف منتجات' : 'Add items')
                                    }
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
