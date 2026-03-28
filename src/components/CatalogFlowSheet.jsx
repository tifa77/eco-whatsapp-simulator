import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        img: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&q=80',
    },
    {
        id: 'p2', category: 'electronics',
        nameAr: 'ساعة سامسونج الذكية', nameEn: 'Samsung Smart Watch',
        price: 89.99,
        img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    },
    {
        id: 'p3', category: 'fashion',
        nameAr: 'جاكيت شتوي فاخر', nameEn: 'Luxury Winter Jacket',
        price: 44.99,
        img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    },
    {
        id: 'p4', category: 'fashion',
        nameAr: 'حذاء رياضي نايكي', nameEn: 'Nike Sport Shoes',
        price: 34.99,
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    },
    {
        id: 'p5', category: 'accessories',
        nameAr: 'ساعة جلد كلاسيكية', nameEn: 'Classic Leather Watch',
        price: 75.00,
        img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    },
    {
        id: 'p6', category: 'accessories',
        nameAr: 'حقيبة يد نسائية فاخرة', nameEn: 'Luxury Handbag',
        price: 69.99,
        img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
    },
    {
        id: 'p7', category: 'beauty',
        nameAr: 'عطر رجالي مميز', nameEn: 'Signature Perfume',
        price: 49.99,
        img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    },
    {
        id: 'p8', category: 'beauty',
        nameAr: 'مجموعة العناية بالبشرة', nameEn: 'Skincare Set',
        price: 39.99,
        img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    },
];

export default function CatalogFlowSheet({ isOpen, onClose, onSubmit, lang, niche, projectName, onReturnToMain }) {
    const isAr = lang === 'ar';
    const [cart, setCart] = useState({});
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

    const handleAdd = (id) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const handleSub = (id) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[id] > 1) newCart[id]--;
            else delete newCart[id];
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = useMemo(() =>
        Object.entries(cart).reduce((sum, [id, qty]) => {
            const item = PRODUCTS.find(p => p.id === id);
            return sum + ((item?.price || 0) * qty);
        }, 0), [cart]);

    const filteredItems = PRODUCTS.filter(p => p.category === activeCategory);

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
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 60 }}
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            height: '90%', zIndex: 70, display: 'flex',
                            flexDirection: 'column', background: '#fff',
                            borderRadius: '16px 16px 0 0', overflow: 'hidden'
                        }}
                        dir={isAr ? 'rtl' : 'ltr'}
                    >

                        {/* ① هيدر المتجر — مطابق Meta */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '12px 16px', background: '#fff',
                            borderBottom: '1px solid #f0f2f5'
                        }}>
                            <img src="/Logo.png" style={{
                                width: '40px', height: '40px',
                                borderRadius: '50%', objectFit: 'cover',
                                border: '1px solid #f0f2f5'
                            }} />
                            <div style={{ flex: 1 }}>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: '700',
                                    color: '#111', fontFamily: 'Cairo' }}>
                                    {projectName || (isAr ? 'المتجر' : 'Store')}
                                </p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#8696a0',
                                    fontFamily: 'Cairo' }}>
                                    {isAr ? '🟢 متصل الآن' : '🟢 Online now'}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                                <button onClick={onClose} style={{
                                    background: '#f0f2f5', border: 'none',
                                    borderRadius: '50%', width: '32px', height: '32px',
                                    cursor: 'pointer', fontSize: '16px', color: '#555'
                                }}>✕</button>
                            </div>
                        </div>

                        {/* ② شريط الفئات — مطابق Meta */}
                        <div style={{
                            display: 'flex', gap: '0px', overflowX: 'auto',
                            background: '#fff', borderBottom: '1px solid #f0f2f5',
                            padding: '0 16px'
                        }}>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    style={{
                                        padding: '12px 16px', border: 'none',
                                        background: 'none', cursor: 'pointer',
                                        fontSize: '14px', fontFamily: 'Cairo',
                                        fontWeight: activeCategory === cat.id ? '700' : '400',
                                        color: activeCategory === cat.id ? '#25D366' : '#555',
                                        borderBottom: activeCategory === cat.id
                                            ? '2px solid #25D366' : '2px solid transparent',
                                        whiteSpace: 'nowrap', transition: 'all 0.2s'
                                    }}
                                >
                                    {isAr ? cat.nameAr : cat.nameEn}
                                </button>
                            ))}
                        </div>

                        {/* ③ شبكة المنتجات 2×2 — مطابق Meta */}
                        <div style={{
                            flex: 1, overflowY: 'auto',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1px', background: '#f0f2f5',
                            paddingBottom: totalItems > 0 ? '70px' : '0'
                        }}>
                            {filteredItems.map(item => (
                                <div key={item.id} style={{
                                    background: '#fff', cursor: 'pointer',
                                    position: 'relative'
                                }}>
                                    {/* صورة مربعة 1:1 */}
                                    <div style={{
                                        width: '100%', paddingTop: '100%',
                                        position: 'relative', overflow: 'hidden',
                                        background: '#f9f9f9'
                                    }} onClick={() => handleAdd(item.id)}>
                                        <img
                                            src={item.img}
                                            alt={isAr ? item.nameAr : item.nameEn}
                                            style={{
                                                position: 'absolute', inset: 0,
                                                width: '100%', height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        {/* علامة الاختيار */}
                                        {cart[item.id] > 0 && (
                                            <div style={{
                                                position: 'absolute', top: '8px',
                                                right: isAr ? '8px' : 'auto',
                                                left: isAr ? 'auto' : '8px',
                                                width: '24px', height: '24px',
                                                borderRadius: '50%', background: '#25D366',
                                                display: 'flex', alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff', fontSize: '14px', fontWeight: '700'
                                            }}>✓</div>
                                        )}
                                    </div>

                                    {/* بيانات المنتج */}
                                    <div style={{ padding: '8px 10px 12px' }}>
                                        <p style={{
                                            margin: '0 0 2px', fontSize: '13px',
                                            fontWeight: '600', color: '#111',
                                            fontFamily: 'Cairo', lineHeight: 1.3,
                                            overflow: 'hidden', textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {isAr ? item.nameAr : item.nameEn}
                                        </p>
                                        <p style={{
                                            margin: 0, fontSize: '13px',
                                            fontWeight: '700', color: '#25D366'
                                        }}>
                                            {isAr
                                                ? `${item.price.toFixed(2)} د.ك`
                                                : `$${item.price.toFixed(2)}`}
                                        </p>

                                        {/* زر إضافة/إزالة — مطابق Meta */}
                                        <div style={{ marginTop: '8px' }}>
                                            {!cart[item.id] ? (
                                                <button
                                                    onClick={() => handleAdd(item.id)}
                                                    style={{
                                                        width: '100%', padding: '7px 0',
                                                        background: '#e8fef0',
                                                        border: '1px solid #25D366',
                                                        borderRadius: '8px', cursor: 'pointer',
                                                        color: '#25D366', fontSize: '13px',
                                                        fontWeight: '700', fontFamily: 'Cairo'
                                                    }}
                                                >
                                                    {isAr ? '+ إضافة' : '+ Add'}
                                                </button>
                                            ) : (
                                                <div style={{
                                                    display: 'flex', alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    border: '1px solid #25D366',
                                                    borderRadius: '8px', overflow: 'hidden',
                                                    height: '32px'
                                                }}>
                                                    <button onClick={() => handleSub(item.id)}
                                                        style={{ width: '32px', height: '32px', background: '#fff',
                                                            border: 'none', cursor: 'pointer',
                                                            color: '#25D366', fontSize: '18px', fontWeight: '700' }}>
                                                        −
                                                    </button>
                                                    <span style={{ padding: '0 8px', fontSize: '13px',
                                                        fontWeight: '700', color: '#111' }}>
                                                        {cart[item.id]}
                                                    </span>
                                                    <button onClick={() => handleAdd(item.id)}
                                                        style={{ width: '32px', height: '32px', background: '#25D366',
                                                            border: 'none', cursor: 'pointer',
                                                            color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ④ شريط السلة — مطابق Meta */}
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.div 
                                    initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
                                    style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        background: '#fff', padding: '12px 16px',
                                        borderTop: '1px solid #f0f2f5', zIndex: 85
                                    }}
                                >
                                    <button
                                        onClick={handleSubmit}
                                        style={{
                                            width: '100%', padding: '14px',
                                            background: '#25D366',
                                            border: 'none', borderRadius: '12px',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center',
                                            justifyContent: 'space-between', fontFamily: 'Cairo'
                                        }}
                                    >
                                        {/* عداد المنتجات */}
                                        <div style={{
                                            width: '26px', height: '26px',
                                            background: 'rgba(0,0,0,0.15)',
                                            borderRadius: '50%', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '12px', fontWeight: '700'
                                        }}>
                                            {totalItems}
                                        </div>

                                        <span style={{
                                            color: '#fff',
                                            fontSize: '15px', fontWeight: '700'
                                        }}>
                                            {isAr ? 'عرض السلة' : 'View Cart'}
                                        </span>

                                        <span style={{
                                            color: 'rgba(255,255,255,0.9)',
                                            fontSize: '14px', fontWeight: '600'
                                        }}>
                                            {isAr
                                                ? `${totalPrice.toFixed(2)} د.ك`
                                                : `$${totalPrice.toFixed(2)}`}
                                        </span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
