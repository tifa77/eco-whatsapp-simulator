import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Bot, CheckCheck, Loader2, Phone, Video, MoreVertical,
    Paperclip, Smile, Mic, MessageCircle, ShoppingCart, MapPin, CreditCard,
    Banknote, Package, Star, X, RefreshCw
} from 'lucide-react';
import CatalogFlowSheet from './CatalogFlowSheet';

// ─── Error Boundary ─────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch(e, i) { console.error('ChatSimulator Crash:', e, i); }
    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-[#0A0A0A]">
                    <Bot size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold mb-2">خطأ داخلي | Internal Error</h2>
                    <button onClick={() => window.location.reload()} className="bg-cyan-600 text-white px-6 py-2 rounded-xl mt-4 font-bold">
                        إعادة التشغيل | Restart
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// ─── WhatsApp Status Bar (time display) ────────────────────────────────────────
function StatusBar() {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
        };
        update();
        const id = setInterval(update, 30000);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="absolute top-0 left-0 right-0 h-10 flex items-end justify-between px-5 pb-1 z-[52] pointer-events-none">
            <span className="text-white text-[11px] font-bold">{time}</span>
            <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5 items-end">
                    {[3, 5, 7, 9].map((h, i) => (
                        <div key={i} className="w-[3px] bg-white/80 rounded-full" style={{ height: h }} />
                    ))}
                </div>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="white" opacity="0.8">
                    <path d="M7 2.5C8.9 2.5 10.6 3.3 11.8 4.6L13 3.3C11.4 1.6 9.3 0.5 7 0.5C4.7 0.5 2.6 1.6 1 3.3L2.2 4.6C3.4 3.3 5.1 2.5 7 2.5Z" />
                    <path d="M7 5C8.1 5 9.1 5.4 9.8 6.2L11 4.9C9.9 3.9 8.5 3.3 7 3.3C5.5 3.3 4.1 3.9 3 4.9L4.2 6.2C4.9 5.4 5.9 5 7 5Z" />
                    <circle cx="7" cy="8.5" r="1.5" />
                </svg>
                <div className="w-6 h-3 border border-white/80 rounded-sm flex items-center px-0.5">
                    <div className="flex-1 h-1.5 bg-white/80 rounded-sm" />
                    <div className="w-0.5 h-1 bg-white/80 rounded-sm ml-0.5" />
                </div>
            </div>
        </div>
    );
}

// ─── WhatsApp Chat Bubble ───────────────────────────────────────────────────────
function ChatBubble({ msg, isAr }) {
    const isUser = msg.sender === 'user';
    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`flex ${isUser ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')} mb-1`}
        >
            <div
                className={`relative max-w-[78%] px-3 py-2 rounded-[18px] text-[13px] leading-relaxed shadow-sm ${isUser
                    ? `bg-[#DCF8C6] text-gray-900 ${isAr ? 'rounded-tl-[4px]' : 'rounded-tr-[4px]'}`
                    : `bg-white text-gray-900 ${isAr ? 'rounded-tr-[4px]' : 'rounded-tl-[4px]'}`
                    }`}
            >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[10px] text-gray-500">{time}</span>
                    {isUser && <CheckCheck size={12} className="text-[#53bdeb]" />}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Typing Indicator ──────────────────────────────────────────────────────────
function TypingIndicator({ isAr }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={`flex ${isAr ? 'justify-end' : 'justify-start'} mb-1`}
        >
            <div className={`bg-white rounded-[18px] ${isAr ? 'rounded-tr-[4px]' : 'rounded-tl-[4px]'} px-4 py-3 flex items-center gap-1.5 shadow-sm`}>
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

// ─── CTA Screen (demo ended) ───────────────────────────────────────────────────
function CTAScreen({ lang, onRetry, projectName }) {
    const isAr = lang === 'ar';
    const [step, setStep] = useState('main'); // 'main' | 'no'

    const openWhatsApp = () => {
        const pn = projectName || '';
        const msg = isAr
            ? `مرحباً، أريد متجر واتساب لمشروعي${pn ? ': ' + pn : ''} 🚀`
            : `Hello, I want a WhatsApp store${pn ? ' for: ' + pn : ''} 🚀`;
        window.open(`https://wa.me/96566305551?text=${encodeURIComponent(msg)}`, '_blank');
    };

    if (step === 'no') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-b from-[#0d1117] to-[#050509] rounded-2xl mx-3 p-5 border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                dir={isAr ? 'rtl' : 'ltr'}
            >
                <div className="text-center text-3xl mb-3">⏳</div>
                <h3 className="text-white font-black text-center text-[15px] mb-2">
                    {isAr ? 'لا تفوّت — تجربة مجانية + خصم 70% اليوم فقط' : "Don't miss out — Free trial + 70% OFF today only"}
                </h3>
                <p className="text-slate-400 text-center text-[11px] mb-4">
                    {isAr ? 'سيُبنى متجرك كاملاً بأسلوبك وهويتك ✨' : 'Your store fully built your way ✨'}
                </p>
                <button
                    onClick={openWhatsApp}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black py-3 rounded-xl text-sm shadow-[0_0_20px_rgba(234,179,8,0.4)] mb-2"
                >
                    {isAr ? '✨ ابدأ مجاناً الآن' : '✨ Start Free Now'}
                </button>
                <button
                    onClick={onRetry}
                    className="w-full bg-white/[0.06] text-slate-300 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 border border-white/[0.08]"
                >
                    <RefreshCw size={14} />
                    {isAr ? '🔄 إعادة التجربة' : '🔄 Try Again'}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-b from-[#0d1117] to-[#050509] rounded-2xl mx-3 p-5 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            dir={isAr ? 'rtl' : 'ltr'}
        >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <h3 className="text-white font-black text-center text-[15px] mb-1">
                {isAr ? '🚀 هل تريد متجر واتساب يبيع بدلاً عنك؟' : '🚀 Want a WhatsApp store that sells for you?'}
            </h3>
            <p className="text-slate-400 text-center text-[11px] mb-1">
                {isAr ? 'لا مزيد من الردود اليدوية — الأتمتة تتولى كل شيء' : 'No more manual replies — automation handles everything'}
            </p>
            <p className="text-cyan-300 text-center text-[11px] mb-3">
                {isAr ? '✨ سيُبنى متجرك كاملاً بأسلوبك وهويتك' : '✨ Your store will be fully built your way'}
            </p>
            <button
                onClick={openWhatsApp}
                className="w-full py-3 rounded-xl font-black text-sm text-white mb-2 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #25d366, #128C7E)' }}
            >
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <span className="relative">
                    {isAr ? 'ابدأ البيع اليوم 🔥 — خصم يتجاوز 70%' : 'Start Selling Today 🔥 — Over 70% OFF'}
                </span>
            </button>
            <button
                onClick={() => setStep('no')}
                className="w-full py-2 rounded-xl text-slate-500 text-xs font-medium"
            >
                {isAr ? 'لا شكراً' : 'No thanks'}
            </button>
        </motion.div>
    );
}

// ─── FLOW STEPS ────────────────────────────────────────────────────────────────
// 1:welcome → 2:catalog → 3:order_summary → 4:ask_name → 5:ask_location → 6:ask_payment → 7:confirm → ended

const ChatSimulatorInner = ({ config, onBack }) => {
    const { projectName, niche, platform, lang = 'ar' } = config;
    const isAr = lang === 'ar';
    const isWa = platform !== 'instagram';

    // ── State ──
    const [messages, setMessages] = useState([]);
    const [locationSelected, setLocationSelected] = useState(false);
    const [inputText, setInputText] = useState('');
    const [activeButtons, setActiveButtons] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isDemoEnded, setIsDemoEnded] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [flowStep, setFlowStep] = useState('welcome'); // welcome | catalog | order_summary | ask_name | ask_location | ask_payment | confirm | ended
    const [customerName, setCustomerName] = useState('');
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderSummary, setOrderSummary] = useState('');
    const [narratorText, setNarratorText] = useState(isAr ? 'يبدأ العميل المحادثة 👋' : 'Customer starts chat 👋');
    const [toast, setToast] = useState('');

    const initialized = useRef(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => { scrollToBottom(); }, [messages, isTyping, activeButtons, isDemoEnded]);

    const addBotMsg = (text, delay = 0, narr = '') => new Promise(resolve => {
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, sender: 'bot', timestamp: new Date() }]);
            if (narr) setNarratorText(narr);
            setIsTyping(false);
            resolve();
        }, delay);
    });

    const addUserMsg = (text) => {
        setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, sender: 'user', timestamp: new Date() }]);
    };

    const generateOrderNum = () => Math.floor(1000 + Math.random() * 9000).toString();

    // ── Init (Step 1: Welcome with 4 buttons) ──
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        setToast(isAr ? 'تسجيل دخول العميل...' : 'Customer online...');

        setTimeout(() => {
            addUserMsg(isAr ? 'هلا 👋' : 'Hello 👋');
            setIsTyping(true);
            setNarratorText(isAr ? 'يرحّب النظام بالعميل 👋' : 'System welcomes customer 👋');

            setTimeout(() => {
                const greetMsg = isAr
                    ? `أهلاً 👋 كيف نقدر نخدمك اليوم؟`
                    : `Hello 👋 How can we help you today?`;
                setMessages(prev => [...prev, { id: Date.now(), text: greetMsg, sender: 'bot', timestamp: new Date() }]);
                setToast('');

                setTimeout(() => {
                    setIsTyping(false);
                    setActiveButtons(isAr
                        ? ['🛒 تصفح المنتجات', '🔥 العروض', '📦 تتبع الطلب', '💬 خدمة العملاء']
                        : ['🛒 Browse Products', '🔥 Offers', '📦 Track Order', '💬 Customer Service']);
                    setFlowStep('catalog');
                }, 800);
            }, 1500);
        }, 800);
    }, []);

    // ── Handle Button Clicks ──
    const handleButtonClick = (btn) => {
        addUserMsg(btn);
        setActiveButtons([]);

        // Products / Browse
        if (btn.includes('تصفح') || btn.includes('Browse') || btn.includes('Products')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'يفتح النظام الكاتلوج تلقائياً 🛒' : 'System opens catalog automatically 🛒');
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now(), text: isAr ? 'بكل سرور! جاري عرض منتجاتنا 👇' : 'Sure! Loading our products now 👇',
                    sender: 'bot', timestamp: new Date()
                }]);
                setIsTyping(false);
                setTimeout(() => setIsCatalogOpen(true), 400);
            }, 1000);
            return;
        }

        // Offers
        if (btn.includes('العروض') || btn.includes('Offers')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'عرض العروض الحالية 🔥' : 'Showing current offers 🔥');
            setTimeout(() => {
                const msg = isAr
                    ? '🔥 عروضنا الحالية:\n\n✅ خصم 20% على الإلكترونيات\n✅ اشتري 2 واحصل على الثالث مجاناً\n✅ توصيل مجاني للطلبات فوق 50 د.ك\n\n🛒 تصفح المنتجات للاستفادة من العروض!'
                    : '🔥 Current offers:\n\n✅ 20% off Electronics\n✅ Buy 2 Get 1 Free\n✅ Free delivery on orders over $50\n\n🛒 Browse products to grab the deals!';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons([
                    isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products',
                    isAr ? '💬 خدمة العملاء' : '💬 Customer Service'
                ]);
            }, 1200);
            return;
        }

        // Track Order
        if (btn.includes('تتبع') || btn.includes('Track')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'عرض حالة الطلب 📦' : 'Showing order status 📦');
            setTimeout(() => {
                const msg = isAr
                    ? '📦 آخر طلب لك:\n\nرقم الطلب: #7231\nالحالة: جاري التوصيل 🚚\nالوصول المتوقع: 25 دقيقة\n\nهل تريد طلب جديد؟ 🛒'
                    : '📦 Your latest order:\n\nOrder #: #7231\nStatus: Out for delivery 🚚\nETA: 25 minutes\n\nWant to place a new order? 🛒';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons([isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products']);
            }, 1200);
            return;
        }

        // Contact
        if (btn.includes('خدمة') || btn.includes('Customer') || btn.includes('تواصل') || btn.includes('Contact')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'تحويل للخدمة 💬' : 'Connecting to service 💬');
            setTimeout(() => {
                const msg = isAr
                    ? '💬 فريقنا للخدمة جاهز لمساعدتك!\n\n📞 هاتف: 96566305551+\n⏰ أوقات العمل: 9 ص - 10 م\n\nأو يمكنك تصفح منتجاتنا مباشرة 👇'
                    : '💬 Our service team is ready to help!\n\n📞 Phone: +96566305551\n⏰ Hours: 9 AM - 10 PM\n\nOr browse our products directly 👇';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons([isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products']);
            }, 1000);
            return;
        }

        // Re-open catalog button in chat
        if (btn.includes('الكاتلوج') || btn.includes('Catalog')) {
            setTimeout(() => setIsCatalogOpen(true), 300);
            return;
        }

        // Location Type choice
        if (flowStep === 'ask_location_type') {
            const isDelivery = btn.includes('توصيل') || btn.includes('Deliver');
            setIsTyping(true);
            setNarratorText(isAr ? 'يعالج النظام خيار الاستلام 📦' : 'Processing delivery option 📦');
            
            setTimeout(() => {
                const msg = isDelivery
                    ? (isAr ? "اختر طريقة الدفع 💳" : "Choose payment method 💳")
                    : (isAr ? "سيكون طلبك جاهز خلال 20 دقيقة ✅\nاختر طريقة الدفع 💳" : "Your order will be ready in 20 mins ✅\nChoose payment method 💳");
                
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons(isAr ? ['💵 كاش عند الاستلام', '💳 دفع بالبطاقة'] : ['💵 Cash on Delivery', '💳 Pay by Card']);
                setIsTyping(false);
                setFlowStep('ask_payment');
            }, 1000);
            return;
        }

        // Payment choice
        if (flowStep === 'ask_payment') {
            const isCash = btn.includes('كاش') || btn.includes('Cash');
            setIsTyping(true);
            setNarratorText(isAr ? 'يعالج النظام خيار الدفع 💳' : 'Processing payment 💳');

            if (isCash) {
                setTimeout(() => {
                    const orderNum = generateOrderNum();
                    const msg = isAr
                        ? `تم تأكيد طلبك ✅\n🧾 رقم الطلب: #${orderNum}\nسيصلك قريباً 🚀`
                        : `Order confirmed ✅\n🧾 Order #: #${orderNum}\nArrives soon 🚀`;
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setNarratorText(isAr ? 'تم إصدار رقم الطلب بنجاح ✅' : 'Order number issued ✅');
                    setFlowStep('ended');
                    setTimeout(() => {
                        addFinalMsg();
                    }, 1500);
                }, 1400);
            } else {
                // Card payment
                setTimeout(() => {
                    const msg = isAr
                        ? '🔗 رابط الدفع الآمن:\nhttps://pay.elegantoptions.com/checkout\n\nبعد إتمام الدفع اضغط الزر أدناه 👇'
                        : '🔗 Secure payment link:\nhttps://pay.elegantoptions.com/checkout\n\nAfter payment, press the button below 👇';
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons([isAr ? '✅ تم الدفع' : '✅ Payment Done']);
                    setFlowStep('confirm_payment_btn');
                    setIsTyping(false);
                }, 1400);
            }
            return;
        }

        // --- NEW STEP: confirm_payment_btn ---
        if (flowStep === 'confirm_payment_btn') {
            setIsTyping(true);
            setTimeout(() => {
                const confirmMsg = isAr
                    ? `🎉 تم استلام دفعتك بنجاح!\n✅ تم تأكيد طلبك\n📦 رقم الطلب: #${generateOrderNum()}\n🚀 سيصلك خلال 30-45 دقيقة`
                    : `🎉 Payment received successfully!\n✅ Order confirmed\n📦 Order #: #${generateOrderNum()}\n🚀 Arrives in 30-45 mins`;
                setMessages(prev => [...prev, { id: Date.now(), text: confirmMsg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setFlowStep('ended');
                setTimeout(addFinalMsg, 1500);
            }, 1000);
            return;
        }
    };

    const addFinalMsg = () => {
        setIsTyping(true);
        setTimeout(() => {
            const msg = isAr
                ? `شكراً لتسوقك معنا! 🌟\nتابعنا على واتساب لعروض حصرية\nنتمنى لك يوماً رائعاً ✨`
                : `Thank you for shopping with us! 🌟\nFollow us on WhatsApp for exclusive offers\nHave a wonderful day ✨`;
            setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
            setIsTyping(false);
            setNarratorText(isAr ? 'تم إتمام طلب الشراء بنجاح 🎉' : 'Purchase flow completed successfully 🎉');
            setTimeout(() => setIsDemoEnded(true), 2000);
        }, 1200);
    };

    // ── Handle Catalog Submit ──
    const handleCatalogSubmit = (summary, total) => {
        setIsCatalogOpen(false);
        setOrderSummary(summary);
        setOrderTotal(total);

        const formattedTotal = isAr ? `${total.toFixed(2)} د.ك` : `$${total.toFixed(2)}`;
        const userMsg = isAr ? `أريد طلب:\n${summary}` : `I want to order:\n${summary}`;
        addUserMsg(userMsg);
        setIsTyping(true);
        setNarratorText(isAr ? 'النظام يعرض ملخص الطلب ويطلب الاسم 📋' : 'System shows order summary and asks for name 📋');

        // Step 3: Order summary and Ask Location Type
        setTimeout(() => {
            const summaryMsg = isAr
                ? `ممتاز! 🛍️ إجمالي طلبك: ${formattedTotal}\nكيف تريد استلام طلبك؟`
                : `Great! 🛍️ Your total: ${formattedTotal}\nHow would you like to receive your order?`;
            setMessages(prev => [...prev, { id: Date.now(), text: summaryMsg, sender: 'bot', timestamp: new Date() }]);
            
            setActiveButtons(isAr
                ? ['📍 توصيل لموقعي', '🏪 استلام من الفرع']
                : ['📍 Deliver to My Location', '🏪 Pickup from Branch']
            );
            setIsTyping(false);
            setFlowStep('ask_location_type');
            setNarratorText(isAr ? 'النظام يطرح خيارات الاستلام 📦' : 'System asks for delivery options 📦');
        }, 1500);
    };

    // ── Handle Text Input ──
    const handleSendText = (e) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text) return;
        setInputText('');
        addUserMsg(text);
        setIsTyping(true);
        // fallback
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: isAr ? 'أهلاً! اضغط "تصفح المنتجات" للبدء 🛍️' : 'Hello! Tap "Browse Products" to start 🛍️',
                sender: 'bot', timestamp: new Date()
            }]);
            setIsTyping(false);
            if (activeButtons.length === 0) {
                setActiveButtons([isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products']);
            }
        }, 1000);
    };

    // Handle location button
    useEffect(() => {
        // If the user taps the location button it goes through handleButtonClick which won't match
        // We intercept it here via button click special case
    }, []);

    const handleButtonClickWrapper = (btn) => {
        if (btn.includes('موقع') || btn.includes('Location') || btn.includes('توصيل') || btn.includes('Deliver')) {
            if (locationSelected) return;
            setLocationSelected(true);
        }
        handleButtonClick(btn);
    };

    const handleRetry = () => {
        setMessages([]);
        setActiveButtons([]);
        setIsTyping(false);
        setIsDemoEnded(false);
        setFlowStep('welcome');
        setCustomerName('');
        setOrderTotal(0);
        setOrderSummary('');
        setNarratorText(isAr ? 'يبدأ العميل من جديد 👋' : 'Customer starting over 👋');
        initialized.current = false;
        // Trigger re-init
        setTimeout(() => {
            if (!initialized.current) {
                initialized.current = true;
                addUserMsg(isAr ? 'هلا 👋' : 'Hello 👋');
                setIsTyping(true);
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now(),
                        text: isAr ? 'أهلاً! 👋 اكتشف منتجاتنا واطلب بكل سهولة' : 'Hello! 👋 Discover our products and order with ease',
                        sender: 'bot', timestamp: new Date()
                    }]);
                    setIsTyping(false);
                    setActiveButtons([isAr ? 'تصفح المنتجات 🛍️' : 'Browse Products 🛍️']);
                    setFlowStep('catalog');
                }, 1500);
            }
        }, 300);
    };

    const returnToMainMenu = () => {
        setMessages([]);
        setActiveButtons([]);
        setIsTyping(false);
        setIsDemoEnded(false);
        setFlowStep('welcome');
        setCustomerName('');
        setOrderTotal(0);
        setOrderSummary('');
        setLocationSelected(false);
        setNarratorText(isAr ? 'العودة للقائمة الرئيسية 🏠' : 'Returning to main menu 🏠');
        
        setTimeout(() => {
            const greetMsg = isAr
                ? `أهلاً 👋 كيف نقدر نخدمك اليوم؟`
                : `Hello 👋 How can we help you today?`;
            setMessages([
                { id: Date.now(), text: greetMsg, sender: 'bot', timestamp: new Date() }
            ]);
            setActiveButtons(isAr
                ? ['🛒 تصفح المنتجات', '🔥 العروض', '📦 تتبع الطلب', '💬 خدمة العملاء']
                : ['🛒 Browse Products', '🔥 Offers', '📦 Track Order', '💬 Customer Service']
            );
        }, 300);
    };

    // ── WhatsApp Header ──
    const WaHeader = () => (
        <div
            className="absolute top-0 left-0 right-0 z-[58] flex items-center gap-2.5 px-3 pt-[42px] pb-2.5"
            style={{ background: 'linear-gradient(180deg, #128C7E 0%, #075E54 100%)' }}
            dir="ltr"
        >
            {onBack && (
                <button onClick={onBack} className="text-white/80 hover:text-white p-1">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </button>
            )}
            <img
                src="/Logo.png"
                alt=""
                className="w-8 h-8 rounded-full object-cover bg-[#25d366] shrink-0"
                onError={e => { e.target.outerHTML = '<div class="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white font-black text-sm shrink-0">' + (projectName?.charAt(0)?.toUpperCase() || 'م') + '</div>'; }}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                    <h3 className="text-white font-semibold text-[15px] truncate max-w-[150px]">
                      {projectName}
                    </h3>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" fill="#25D366"/>
                        <path d="M10.0001 14.17L6.41006 10.58L5.00006 12L10.0001 17L19.5001 7.5L18.0901 6.09L10.0001 14.17Z" fill="white"/>
                    </svg>
                </div>
                <p className="text-green-200 text-[10px]">{isAr ? 'متصل الآن ✓' : 'Online ✓'}</p>
            </div>
            <div className="flex items-center gap-2 text-white/80">
                <button
                    onClick={returnToMainMenu}
                    style={{
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '12px',
                        color: '#f8fafc',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontFamily: 'Cairo',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    {isAr ? '🏠 القائمة الرئيسية' : '🏠 Main Menu'}
                </button>
                <MoreVertical size={20} />
            </div>
        </div>
    );



    return (
        <div className="absolute inset-0 flex flex-col overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
            <StatusBar />
            <WaHeader />

            {/* Chat Background */}
            <div
                className="absolute inset-0 pt-[82px] pb-[72px] overflow-y-auto"
                style={{ background: '#ECE5DD' }}
            >
                {/* WhatsApp wallpaper dots */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'radial-gradient(#128C7E 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />

                <div className="relative z-10 px-3 py-4 flex flex-col">
                    {/* Top Note Container */}
                    <div className="flex flex-col items-center mb-4 gap-2 mt-2">
                        {/* "End-to-end encrypted" note */}
                        <div className="bg-[#D9F7BE] text-[#075E54] text-[10.5px] px-3 py-1.5 rounded-[12px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 font-medium">
                            🔒 {isAr ? 'الرسائل محمية بتشفير طرف إلى طرف' : 'Messages are end-to-end encrypted'}
                        </div>

                        {/* Helper Status Note (Replaces old Narrator Bar) */}
                        <AnimatePresence>
                            {narratorText && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-[#E1F3FB] text-[#54656F] text-[10.5px] px-3 py-1.5 rounded-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] border border-black/5 text-center leading-relaxed font-semibold max-w-[85%]"
                                >
                                    {narratorText}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {messages.map(msg => (
                        <ChatBubble key={msg.id} msg={msg} isAr={isAr} />
                    ))}

                    <AnimatePresence>
                        {isTyping && <TypingIndicator isAr={isAr} />}
                    </AnimatePresence>

                    {/* Action Buttons (Meta WhatsApp Business Style) */}
                    <AnimatePresence>
                        {activeButtons.length > 0 && !isDemoEnded && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className={`flex flex-col w-[85%] sm:max-w-[75%] bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1)] mb-2 ${isAr ? 'self-start mr-1' : 'self-start ml-1'}`}
                            >
                                {activeButtons.map((btn, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleButtonClickWrapper(btn)}
                                        className={`w-full py-3.5 px-4 text-[#00A884] font-semibold text-[14px] text-center active:bg-gray-50 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 ${i < activeButtons.length - 1 ? 'border-b border-gray-100' : ''}`}
                                    >
                                        {btn}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* CTA Screen */}
                    {isDemoEnded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 mb-2"
                        >
                            <CTAScreen lang={lang} onRetry={handleRetry} projectName={projectName} />
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* No Narrator Bar */}            {/* Input Bar */}
            <div
                className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
                style={{ background: '#F0F0F0', borderTop: '1px solid rgba(0,0,0,0.08)', zIndex: 40 }}
            >
                <button className="text-[#54656F] p-1.5"><Smile size={22} /></button>
                <form onSubmit={handleSendText} className="flex-1 flex items-center bg-white rounded-full px-4 gap-2 shadow-sm border border-black/5">
                    <input
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder={isAr ? 'اكتب رسالة...' : 'Type a message...'}
                        className="flex-1 bg-transparent text-gray-800 text-[13px] py-2.5 outline-none placeholder:text-gray-400"
                        dir={isAr ? 'rtl' : 'ltr'}
                    />
                    <button type="button" className="text-[#54656F]"><Paperclip size={18} /></button>
                </form>
                <button
                    type="button"
                    onClick={(e) => {
                        if (inputText.trim()) {
                            handleSendText({ preventDefault: () => {} });
                        }
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all"
                    style={{ background: '#25d366' }}
                >
                    {inputText.trim() ? <Send size={18} /> : <Mic size={18} />}
                </button>
            </div>

            {/* Catalog Sheet */}
            <CatalogFlowSheet
                isOpen={isCatalogOpen}
                onClose={() => setIsCatalogOpen(false)}
                onSubmit={handleCatalogSubmit}
                onReturnToMain={returnToMainMenu}
                lang={lang}
                niche={niche}
                projectName={projectName}
            />
        </div>
    );
};

const ChatSimulator = (props) => (
    <ErrorBoundary>
        <ChatSimulatorInner {...props} />
    </ErrorBoundary>
);

export default ChatSimulator;
