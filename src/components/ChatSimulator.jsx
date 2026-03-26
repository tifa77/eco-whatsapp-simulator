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
                    <h2 className="text-xl font-bold mb-2">خطأ داخلي</h2>
                    <button onClick={() => window.location.reload()} className="bg-cyan-600 text-white px-6 py-2 rounded-xl mt-4 font-bold">
                        إعادة التشغيل
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
                        ? ['🛒 تصفح المنتجات', '🔥 العروض', '📦 تتبع الطلب', '💬 تواصل معنا']
                        : ['🛒 Browse Products', '🔥 Offers', '📦 Track Order', '💬 Contact Us']);
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
                setActiveButtons([isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products']);
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
        if (btn.includes('تواصل') || btn.includes('Contact')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'تحويل للدعم 💬' : 'Connecting to support 💬');
            setTimeout(() => {
                const msg = isAr
                    ? '💬 فريقنا جاهز لمساعدتك!\n\n📞 هاتف: 96566305551+\n⏰ أوقات العمل: 9 ص - 10 م\n\nأو يمكنك تصفح منتجاتنا مباشرة 👇'
                    : '💬 Our team is ready to help!\n\n📞 Phone: +96566305551\n⏰ Hours: 9 AM - 10 PM\n\nOr browse our products directly 👇';
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

        // Payment choice
        if (flowStep === 'ask_payment') {
            const isCash = btn.includes('كاش') || btn.includes('Cash');
            setIsTyping(true);
            setNarratorText(isAr ? 'يعالج النظام خيار الدفع 💳' : 'Processing payment 💳');

            if (isCash) {
                setTimeout(() => {
                    const orderNum = generateOrderNum();
                    const msg = isAr
                        ? `تم تأكيد طلبك ✅\n🧾 رقم الطلب: #${orderNum}\nسيصلك خلال 30-45 دقيقة 🚀`
                        : `Order confirmed ✅\n🧾 Order #: #${orderNum}\nArrives in 30-45 minutes 🚀`;
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
                        ? `ممتاز! تفضل رابط الدفع الآمن:\n🔗 https://pay.elegantoptions.com/checkout\n(بانتظار تأكيد الدفع... ⏳)`
                        : `Great! Here is your secure payment link:\n🔗 https://pay.elegantoptions.com/checkout\n(Waiting for payment... ⏳)`;
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);

                    setTimeout(() => {
                        setIsTyping(true);
                        setTimeout(() => {
                            const confirmMsg = isAr
                                ? `تم استلام الدفع 🎉\nتم تأكيد طلبك برقم #${generateOrderNum()}\nشكراً ${customerName || ''} 😊`
                                : `Payment received 🎉\nOrder confirmed #${generateOrderNum()}\nThank you ${customerName || ''} 😊`;
                            setMessages(prev => [...prev, { id: Date.now(), text: confirmMsg, sender: 'bot', timestamp: new Date() }]);
                            setIsTyping(false);
                            setFlowStep('ended');
                            setTimeout(addFinalMsg, 1500);
                        }, 2500);
                    }, 800);
                }, 1400);
            }
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

        // Step 3: Order summary
        setTimeout(() => {
            const summaryMsg = isAr
                ? `ممتاز! 🛍️ طلبك جاهز\nالإجمالي: ${formattedTotal}`
                : `Great! 🛍️ Your order is ready\nTotal: ${formattedTotal}`;
            setMessages(prev => [...prev, { id: Date.now(), text: summaryMsg, sender: 'bot', timestamp: new Date() }]);

            // Step 4: Ask name
            setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now(), text: isAr ? 'ما اسمك الكريم؟ ✍️' : "What's your name? ✍️",
                        sender: 'bot', timestamp: new Date()
                    }]);
                    setIsTyping(false);
                    setFlowStep('ask_name');
                    setNarratorText(isAr ? 'النظام يطلب اسم العميل (Lead Gen) 📝' : 'System requests customer name (Lead Gen) 📝');
                }, 800);
            }, 600);
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

        if (flowStep === 'ask_name') {
            const looksLikeName = /[\p{L}]/u.test(text);
            const name = looksLikeName ? text : '';
            if (name) setCustomerName(name);
            setNarratorText(isAr ? 'النظام يحفظ الاسم ويطلب الموقع 📍' : 'System saves name and requests location 📍');

            setTimeout(() => {
                const nameGreet = name
                    ? (isAr ? `شكراً ${name}! 😊` : `Thank you ${name}! 😊`)
                    : (isAr ? 'شكراً! 😊' : 'Thank you! 😊');
                setMessages(prev => [...prev, { id: Date.now(), text: nameGreet, sender: 'bot', timestamp: new Date() }]);

                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            id: Date.now(),
                            text: isAr ? 'أرسل موقعك للتوصيل 📍' : 'Send your location for delivery 📍',
                            sender: 'bot', timestamp: new Date()
                        }]);
                        setIsTyping(false);
                        setActiveButtons([isAr ? 'إرسال موقعي الحالي 📍' : 'Send My Location 📍']);
                        setFlowStep('ask_location');
                    }, 800);
                }, 500);
            }, 1200);
            return;
        }

        if (flowStep === 'ask_location') {
            // treat text as location address
            handleLocationReceived();
            return;
        }

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

    const handleLocationReceived = () => {
        setActiveButtons([]);
        setIsTyping(true);
        setNarratorText(isAr ? 'يستلم النظام الموقع ويطرح خيارات الدفع 💳' : 'System receives location and shows payment options 💳');

        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: isAr ? 'تم استلام موقعك 👍\nكيف تفضل الدفع؟' : 'Location received 👍\nHow would you like to pay?',
                sender: 'bot', timestamp: new Date()
            }]);
            setIsTyping(false);
            setActiveButtons([
                isAr ? 'كاش عند الاستلام 💵' : 'Cash on Delivery 💵',
                isAr ? 'دفع بالبطاقة 💳' : 'Pay by Card 💳',
            ]);
            setFlowStep('ask_payment');
        }, 1300);
    };

    // Handle location button
    useEffect(() => {
        // If the user taps the location button it goes through handleButtonClick which won't match
        // We intercept it here via button click special case
    }, []);

    const handleButtonClickWrapper = (btn) => {
        if (btn.includes('موقع') || btn.includes('Location') || btn.includes('موقعي') || btn.includes('My Location')) {
            addUserMsg(btn);
            setActiveButtons([]);
            handleLocationReceived();
            return;
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
                <p className="text-white font-bold text-[13px] truncate">{projectName}</p>
                <p className="text-green-200 text-[10px]">{isAr ? 'متصل الآن ✓' : 'Online ✓'}</p>
            </div>
            <div className="flex items-center gap-3 text-white/80">
                <Video size={20} />
                <Phone size={18} />
                <MoreVertical size={20} />
            </div>
        </div>
    );

    // ─ Narrator bar ─
    const NarratorBar = () => (
        <div className="absolute bottom-[72px] left-0 right-0 z-[45] pointer-events-none px-2">
            <AnimatePresence>
                {narratorText && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="bg-[#1a1a2e]/90 backdrop-blur-sm border border-cyan-500/20 rounded-xl px-3 py-2 text-center"
                    >
                        <p className="text-cyan-300 text-[10px] font-bold">{narratorText}</p>
                    </motion.div>
                )}
            </AnimatePresence>
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

                <div className="relative z-10 px-3 py-4">
                    {/* "End-to-end encrypted" note */}
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-[#D9F7BE] text-[#075E54] text-[10px] px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                            🔒 {isAr ? 'الرسائل محمية بتشفير طرف إلى طرف' : 'Messages are end-to-end encrypted'}
                        </div>
                    </div>

                    {messages.map(msg => (
                        <ChatBubble key={msg.id} msg={msg} isAr={isAr} />
                    ))}

                    <AnimatePresence>
                        {isTyping && <TypingIndicator isAr={isAr} />}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <AnimatePresence>
                        {activeButtons.length > 0 && !isDemoEnded && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-wrap gap-2 mt-3 justify-center"
                            >
                                {activeButtons.map((btn, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleButtonClickWrapper(btn)}
                                        className="bg-white text-[#128C7E] font-bold text-[12px] px-4 py-2 rounded-full border border-[#128C7E]/20 shadow-sm hover:bg-[#128C7E]  hover:text-white hover:shadow-md transition-all"
                                    >
                                        {btn}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Floating Catalog Button inside chat (if catalog-step passed) */}
                    {(flowStep !== 'welcome' && flowStep !== 'catalog' && !isDemoEnded) && (
                        <div className="flex justify-center mt-3">
                            <button
                                onClick={() => setIsCatalogOpen(true)}
                                className="flex items-center gap-1.5 bg-[#25d366] text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-md hover:bg-[#1da851] transition-all"
                            >
                                <ShoppingCart size={13} />
                                {isAr ? 'إعادة فتح الكاتلوج 🛍️' : 'Reopen Catalog 🛍️'}
                            </button>
                        </div>
                    )}

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

            <NarratorBar />

            {/* Input Bar */}
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
                lang={lang}
                niche={niche}
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
