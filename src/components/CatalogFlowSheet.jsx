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

    useEffect(() => {
        if (isOpen) setActiveCategory('electronics');
    }, [isOpen]);

    const handleAdd = (id) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

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

                    {/* Meta-style Catalog Sheet */}
                    <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                        className="absolute bottom-0 left-0 right-0 rounded-t-[20px] z-[70] flex flex-col overflow-hidden"
                        style={{ height: '90%', background: '#f0f2f5' }}
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        {/* 1. Header (Meta Style) */}
                        <div style={{
                            background: '#fff',
                            padding: '12px 16px',
                            borderBottom: '1px solid #f0f2f5',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }} className="shrink-0">
                            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-black text-xs overflow-hidden shrink-0 shadow-sm border border-black/5">
                                <img src="/Logo.png" alt="" className="w-full h-full object-cover" 
                                     onError={(e) => { e.target.style.display='none'; }}/>
                                <span className="absolute">M</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p style={{ fontSize: '15px', fontWeight: '800', color: '#111', margin: 0, fontFamily: 'Cairo' }} className="truncate">
                                    {isAr ? 'متجرنا الإلكتروني' : 'Our Digital Store'}
                                </p>
                                <p style={{ fontSize: '12px', color: '#8696a0', margin: 0, fontFamily: 'Cairo', fontWeight: 'bold' }}>
                                    {isAr ? 'كاتلوج المنتجات' : 'Product Catalog'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { onClose(); if (onReturnToMain) onReturnToMain(); }}
                                    style={{
                                        background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
                                        color: '#64748b', padding: '6px 10px', fontSize: '11px', fontWeight: '800',
                                        fontFamily: 'Cairo', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                                    }}
                                >
                                    🏠 {isAr ? 'الرئيسية' : 'Main'}
                                </button>
                                <button onClick={onClose} style={{ background: '#f1f1f1', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '50%', color: '#666' }}>
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* 2. Horizontal Categories list */}
                        <div style={{
                            display: 'flex', gap: '8px', overflowX: 'auto',
                            padding: '12px 16px', background: '#fff',
                            borderBottom: '1px solid #f0f2f5',
                            scrollbarWidth: 'none'
                        }} className="shrink-0 no-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    style={{
                                        flexShrink: 0,
                                        padding: '7px 16px',
                                        borderRadius: '24px',
                                        border: activeCategory === cat.id ? '2px solid #25D366' : '1.5px solid #eef0f2',
                                        background: activeCategory === cat.id ? '#e8fef0' : '#fff',
                                        color: activeCategory === cat.id ? '#128C7E' : '#555',
                                        fontSize: '13px',
                                        fontWeight: '800',
                                        fontFamily: 'Cairo',
                                        whiteSpace: 'nowrap',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {isAr ? cat.nameAr : cat.nameEn}
                                </button>
                            ))}
                        </div>

                        {/* 3. Products Grid (Meta layout: 2 columns) */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1px',
                            background: '#e9edef',
                            flex: 1,
                            overflowY: 'auto',
                            paddingBottom: totalItems > 0 ? '60px' : '0'
                        }} className="no-scrollbar">
                            <AnimatePresence mode="wait">
                                {filtered.map(item => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ background: '#fff', display: 'flex', flexDirection: 'column', cursor: 'pointer', position: 'relative' }}
                                        onClick={() => handleAdd(item.id)}
                                    >
                                        {/* 1:1 Aspect Ratio Image Wrapper */}
                                        <div style={{ width: '100%', paddingTop: '100%', position: 'relative', overflow: 'hidden', background: '#f9f9f9' }}>
                                            <img
                                                src={item.img}
                                                alt=""
                                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            {/* Badge */}
                                            {item.price > 80 && (
                                                <span style={{
                                                    position: 'absolute', top: '8px',
                                                    [isAr ? 'right' : 'left']: '8px',
                                                    background: '#25D366', color: '#fff',
                                                    fontSize: '9px', fontWeight: '900',
                                                    padding: '2px 8px', borderRadius: '12px',
                                                    fontFamily: 'Cairo', textTransform: 'uppercase'
                                                }}>
                                                    {isAr ? 'الأكثر مبيعاً' : 'Best Seller'}
                                                </span>
                                            )}
                                            {/* Count Overlay if in cart */}
                                            {cart[item.id] > 0 && (
                                                <div style={{
                                                    position: 'absolute', inset: 0,
                                                    background: 'rgba(37,211,102,0.12)',
                                                    display: 'flex', alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backdropFilter: 'blur(1px)'
                                                }}>
                                                    <div style={{
                                                        width: '36px', height: '36px',
                                                        borderRadius: '50%',
                                                        background: '#25D366',
                                                        display: 'flex', alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '20px', color: '#fff', fontWeight: '900',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                    }}>
                                                        {cart[item.id]}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div style={{ padding: '10px 12px' }}>
                                            <p style={{
                                                fontSize: '14px', fontWeight: '700',
                                                color: '#111', margin: '0 0 3px',
                                                fontFamily: 'Cairo',
                                                overflow: 'hidden', textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }} className="block">
                                                {isAr ? item.nameAr : item.nameEn}
                                            </p>
                                            <p style={{ fontSize: '14px', fontWeight: '800', color: '#128C7E', margin: 0 }}>
                                                {isAr ? `${item.price.toFixed(2)} د.ك` : `$${item.price.toFixed(2)}`}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 4. Bottom View Cart Bar (Meta Style) */}
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.div
                                    initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
                                    style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        background: '#25D366',
                                        padding: '16px 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        zIndex: 80,
                                        boxShadow: '0 -4px 15px rgba(0,0,0,0.1)'
                                    }}
                                    onClick={handleSubmit}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '24px', height: '24px',
                                            background: 'rgba(0,0,0,0.15)',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff', fontSize: '13px', fontWeight: '900'
                                        }}>
                                            {totalItems}
                                        </div>
                                        <span style={{ color: '#fff', fontSize: '16px', fontWeight: '800', fontFamily: 'Cairo' }}>
                                            {isAr ? 'عرض سلة المشتريات' : 'View Shopping Cart'}
                                        </span>
                                    </div>
                                    <div style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: '900' }}>
                                        {isAr ? `${totalPrice.toFixed(2)} د.ك` : `$${totalPrice.toFixed(2)}`}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
