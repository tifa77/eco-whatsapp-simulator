import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const UNIVERSAL_CATEGORIES = {
    restaurant: [
        { id: 'food', nameAr: 'المأكولات 🍔', nameEn: 'Food 🍔' },
        { id: 'drinks', nameAr: 'المشروبات 🥤', nameEn: 'Drinks 🥤' },
        { id: 'desserts', nameAr: 'الحلويات 🍰', nameEn: 'Desserts 🍰' }
    ],
    ecommerce: [
        { id: 'electronics', nameAr: 'إلكترونيات 💻', nameEn: 'Electronics 💻' },
        { id: 'fashion', nameAr: 'أزياء 👗', nameEn: 'Fashion 👗' },
        { id: 'accessories', nameAr: 'إكسسوارات ⌚', nameEn: 'Accessories ⌚' }
    ],
    retail: [
        { id: 'electronics', nameAr: 'إلكترونيات 💻', nameEn: 'Electronics 💻' },
        { id: 'fashion', nameAr: 'أزياء 👗', nameEn: 'Fashion 👗' },
        { id: 'accessories', nameAr: 'إكسسوارات ⌚', nameEn: 'Accessories ⌚' }
    ],
    travel: [
        { id: 'europe', nameAr: 'عروض أوروبا 🇪🇺', nameEn: 'Europe Packages 🇪🇺' },
        { id: 'asia', nameAr: 'عروض آسيا 🌏', nameEn: 'Asia Packages 🌏' },
        { id: 'honeymoon', nameAr: 'رحلات شهر العسل 💑', nameEn: 'Honeymoon 💑' }
    ],
    realestate: [
        { id: 'rent', nameAr: 'شقق للإيجار 🔑', nameEn: 'Apartments for Rent 🔑' },
        { id: 'sale', nameAr: 'فلل للبيع 🏡', nameEn: 'Villas for Sale 🏡' },
        { id: 'commercial', nameAr: 'عقار تجاري 🏢', nameEn: 'Commercial 🏢' }
    ],
    services: [
        { id: 'marketing', nameAr: 'باقات التسويق 📈', nameEn: 'Marketing Packages 📈' },
        { id: 'web', nameAr: 'تطوير المواقع 💻', nameEn: 'Web Development 💻' },
        { id: 'admin', nameAr: 'خدمات إدارية 📋', nameEn: 'Admin Services 📋' }
    ],
    consulting: [
        { id: 'marketing', nameAr: 'باقات التسويق 📈', nameEn: 'Marketing Packages 📈' },
        { id: 'web', nameAr: 'تطوير المواقع 💻', nameEn: 'Web Development 💻' },
        { id: 'admin', nameAr: 'خدمات إدارية 📋', nameEn: 'Admin Services 📋' }
    ],
    clinic: [ // Clinic typically bypasses this via inline layout, but we provide fallback structure
        { id: 'doctors', nameAr: 'الأطباء 🩺', nameEn: 'Doctors 🩺' }
    ]
};

const UNIVERSAL_ITEMS = {
    restaurant: [
        { id: '1', category: 'food', nameAr: 'برجر كلاسيك بالجبن', nameEn: 'Classic Cheeseburger', price: 3.50, descAr: 'لحم بقري مشوي مع جبنة شيدر وخس وطماطم وصوص خاص', descEn: 'Grilled beef with cheddar, lettuce, tomato and special sauce', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: '2', category: 'food', nameAr: 'بطاطا مقلية مقرمشة', nameEn: 'Crispy French Fries', price: 1.25, descAr: 'بطاطا مقلية ذهبية مع رشة بهارات خفيفة', descEn: 'Golden fries with a light sprinkle of seasoning', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: '3', category: 'food', nameAr: 'بيتزا مارغريتا', nameEn: 'Margherita Pizza', price: 4.50, descAr: 'عجينة رقيقة مع صلصة طماطم وجبنة موزاريلا إيطالية', descEn: 'Thin crust with tomato sauce and Italian mozzarella', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: '4', category: 'drinks', nameAr: 'موهيتو فراولة', nameEn: 'Strawberry Mojito', price: 2.00, descAr: 'مشروب منعش بالفراولة الطازجة والنعناع', descEn: 'Refreshing drink with fresh strawberries and mint', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: '5', category: 'drinks', nameAr: 'قهوة باردة مختصة', nameEn: 'Specialty Iced Coffee', price: 2.50, descAr: 'قهوة باردة محضرة بعناية مع الثلج', descEn: 'Carefully brewed iced coffee', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: '6', category: 'desserts', nameAr: 'تشيز كيك التوت', nameEn: 'Berry Cheesecake', price: 3.00, descAr: 'شريحة تشيز كيك غنية مع صلصة التوت البري', descEn: 'Rich cheesecake slice with wild berry sauce', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
    ],
    ecommerce: [
        { id: 'e1', category: 'electronics', nameAr: 'سماعات أبل اللاسلكية', nameEn: 'Apple AirPods', price: 150.00, descAr: 'سماعات بلوتوث عالية الجودة مع عزل ضوضاء', descEn: 'High quality bluetooth earphones with noise cancellation', img: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 'e2', category: 'fashion', nameAr: 'جاكيت شتوي أنيق', nameEn: 'Elegant Winter Jacket', price: 85.00, descAr: 'جاكيت فخم وعصري للتدفئة في الشتاء', descEn: 'Luxurious modern jacket for winter warmth', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 'e3', category: 'accessories', nameAr: 'ساعة جلد كلاسيكية', nameEn: 'Classic Leather Watch', price: 120.00, descAr: 'ساعة يد أصلية بسوار من الجلد الطبيعي', descEn: 'Authentic watch with pure leather band', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
    ],
    travel: [
        { id: 't1', category: 'europe', nameAr: 'رحلة باريس (٥ أيام)', nameEn: 'Paris Trip (5 Days)', price: 1200.00, descAr: 'تشمل الطيران والإقامة في فندق ٤ نجوم وجولات سياحية', descEn: 'Includes flight, 4-star hotel, and guided tours', img: 'https://images.unsplash.com/photo-1502602898657-3e907a5ea82c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 't2', category: 'asia', nameAr: 'استكشاف بالي (٧ أيام)', nameEn: 'Bali Explore (7 Days)', price: 950.00, descAr: 'باقة متكاملة لزيارة أشهر معالم بالي الاستوائية', descEn: 'Complete package to visit Bali tropical sights', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 't3', category: 'honeymoon', nameAr: 'المالديف الملكية', nameEn: 'Royal Maldives', price: 2500.00, descAr: 'إقامة فاخرة في فيلا عائمة فوق الماء لشخصين', descEn: 'Luxury stay in overwater villa for two', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
    ],
    realestate: [
        { id: 'r1', category: 'rent', nameAr: 'شقة مفروشة غرفتين', nameEn: 'Furnished 2BR Apt', price: 1500.00, descAr: 'إيجار شهري، إطلالة بحرية، موقع مميز بجوار الخدمات', descEn: 'Monthly rent, sea view, prime location', img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 'r2', category: 'sale', nameAr: 'فيلا مودرن للبيع', nameEn: 'Modern Villa for Sale', price: 350000.00, descAr: 'مساحة ٥٠٠ متر، ٤ غرف نوم، مسبح خاص وتشطيب فاخر', descEn: '500 sqm, 4 bedrooms, private pool, luxury finish', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 'r3', category: 'commercial', nameAr: 'مكتب إداري مجهز', nameEn: 'Equipped Office', price: 12000.00, descAr: 'إيجار سنوي، في برج تجاري معروف بوسط المدينة', descEn: 'Annual rent, famous commercial tower downtown', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
    ],
    services: [
        { id: 's1', category: 'marketing', nameAr: 'إدارة السوشيال ميديا', nameEn: 'Social Media Mgmt', price: 500.00, descAr: 'باقة شهرية تشمل التصاميم وكتابة المحتوى والنشر', descEn: 'Monthly package: designs, copywriting, and posting', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 's2', category: 'web', nameAr: 'تصميم متجر إلكتروني', nameEn: 'E-commerce Design', price: 1200.00, descAr: 'بناء متجر متكامل مع بوابات الدفع والشحن', descEn: 'Complete site build with payment gateways', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { id: 's3', category: 'admin', nameAr: 'مساعد افتراضي', nameEn: 'Virtual Assistant', price: 400.00, descAr: 'تنظيم المواعيد والرد على الإيميلات بمرونة', descEn: 'Scheduling and email handling flexibly', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
    ]
};
// Map retail and consulting to existing copies
UNIVERSAL_ITEMS.retail = UNIVERSAL_ITEMS.ecommerce;
UNIVERSAL_ITEMS.consulting = UNIVERSAL_ITEMS.services;

export default function CatalogFlowSheet({ isOpen, onClose, onSubmit, lang = 'ar', niche = 'restaurant' }) {
    const isAr = lang === 'ar';
    const [cart, setCart] = useState({});

    const activeCategories = UNIVERSAL_CATEGORIES[niche] || UNIVERSAL_CATEGORIES['restaurant'];
    const activeItems = UNIVERSAL_ITEMS[niche] || UNIVERSAL_ITEMS['restaurant'];

    // Default to the first valid category for this niche safely
    const defaultCategoryId = activeCategories[0]?.id || 'food';
    const [activeCategory, setActiveCategory] = useState(defaultCategoryId);

    React.useEffect(() => {
        if (isOpen) {
            setActiveCategory(activeCategories[0]?.id || 'food');
        }
    }, [isOpen, activeCategories]);

    const handleAdd = (id) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const handleSub = (id) => {
        setCart(prev => {
            const current = prev[id] || 0;
            if (current <= 1) {
                const newCart = { ...prev };
                delete newCart[id];
                return newCart;
            }
            return { ...prev, [id]: current - 1 };
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

    const totalPrice = useMemo(() => {
        return Object.entries(cart).reduce((sum, [id, qty]) => {
            const item = (activeItems || []).find(i => i.id === id);
            return sum + ((item?.price || 0) * qty);
        }, 0);
    }, [cart, activeItems]);

    const filteredItems = useMemo(() => {
        return (activeItems || []).filter(item => item.category === activeCategory);
    }, [activeCategory, activeItems]);

    const handleSubmit = () => {
        if (totalItems === 0) return;

        const summaryString = Object.entries(cart).map(([id, qty]) => {
            const item = activeItems.find(i => i.id === id);
            return `${qty}x ${isAr ? item.nameAr : item.nameEn}`;
        }).join(', ');

        onSubmit(summaryString, totalPrice);

        // Reset cart visually if they re-open
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
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] rounded-t-[30px] border-t border-white/10 z-[70] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
                        style={{ height: '85%' }}
                        dir={isAr ? 'rtl' : 'ltr'}
                    >
                        {/* Drag Handle & Header */}
                        <div className="flex flex-col items-center pt-3 pb-2 border-b border-white/5 relative z-10 shrink-0 bg-[#0A0A0A] rounded-t-[30px]">
                            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-3" />
                            <div className="flex justify-between items-center w-full px-5">
                                <h2 className="text-white font-bold text-lg">
                                    {isAr 
                                        ? (niche === 'realestate' ? 'العقارات المتاحة' : niche === 'travel' ? 'عروض السفر' : niche === 'services' || niche === 'consulting' ? 'الخدمات المتاحة' : niche === 'ecommerce' || niche === 'retail' ? 'المنتجات المتاحة' : 'قائمة الطعام')
                                        : (niche === 'realestate' ? 'Available Properties' : niche === 'travel' ? 'Travel Offers' : niche === 'services' || niche === 'consulting' ? 'Available Services' : niche === 'ecommerce' || niche === 'retail' ? 'Available Products' : 'Our Menu')}
                                </h2>
                                <button onClick={onClose} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Categories Tab Bar */}
                            <div className="w-full flex gap-2 overflow-x-auto custom-scrollbar px-5 mt-4 pb-2">
                                {(activeCategories || []).map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat.id
                                            ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
                                            : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        {isAr ? cat.nameAr : cat.nameEn}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Scrolling Content */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 pb-[100px] custom-scrollbar bg-[#050505]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-4"
                                >
                                    {filteredItems.map(item => (
                                        <div key={item.id} className="flex gap-3 bg-[#111111] p-3 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                                <img src={item.img} alt={item.nameAr} className="w-full h-full object-cover" />
                                            </div>

                                            <div className="flex flex-col flex-1 justify-between pt-1">
                                                <div>
                                                    <h3 className="text-white text-sm font-bold mb-1 leading-tight">{isAr ? item.nameAr : item.nameEn}</h3>
                                                    <p className="text-slate-400 text-[11px] leading-snug line-clamp-2">{isAr ? item.descAr : item.descEn}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="text-cyan-400 font-bold text-sm tracking-wide">
                                                        {isAr ? `${item.price.toFixed(2)} د.ك` : `$${item.price.toFixed(2)}`}
                                                    </span>

                                                    {/* Qty Controls */}
                                                    {!cart[item.id] ? (
                                                        <button
                                                            onClick={() => handleAdd(item.id)}
                                                            className="bg-white/10 hover:bg-cyan-600 border border-white/10 hover:border-cyan-500 rounded-lg h-7 px-3 text-xs font-bold text-white transition-all flex items-center justify-center gap-1"
                                                        >
                                                            <Plus size={14} /> {isAr ? 'أضف' : 'Add'}
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-3 bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-0.5">
                                                            <button onClick={() => handleSub(item.id)} className="w-6 h-6 flex items-center justify-center text-cyan-400 hover:bg-white/10 rounded-md transition-colors"><Minus size={14} /></button>
                                                            <span className="text-white text-xs font-bold w-4 text-center">{cart[item.id]}</span>
                                                            <button onClick={() => handleAdd(item.id)} className="w-6 h-6 flex items-center justify-center text-cyan-400 hover:bg-white/10 rounded-md transition-colors"><Plus size={14} /></button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Sticky Bottom Actions */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent pt-12 pb-6 px-4 pointer-events-none">
                            <button
                                onClick={handleSubmit}
                                disabled={totalItems === 0}
                                className={`w-full py-4 rounded-xl flex items-center justify-between px-5 transition-all shadow-lg pointer-events-auto border 
                                    ${totalItems > 0
                                        ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400/50 shadow-cyan-900/50'
                                        : 'bg-white/5 text-slate-500 border-white/5 cursor-not-allowed opacity-90'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <ShoppingBag size={20} />
                                        {totalItems > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-white text-cyan-700 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                {totalItems}
                                            </div>
                                        )}
                                    </div>
                                    <span className="font-bold text-sm tracking-wide">{isAr ? 'اعتماد الطلب' : 'Send Order'}</span>
                                </div>
                                <span className="font-bold tracking-wide">
                                    {isAr ? `${totalPrice.toFixed(2)} د.ك` : `$${totalPrice.toFixed(2)}`}
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
