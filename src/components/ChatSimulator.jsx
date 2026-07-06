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
function ChatBubble({ msg, isAr, projectName }) {
    const isUser = msg.sender === 'user';
    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Location bubble
    if (msg.isLocation) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isUser ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')} mb-1`}
            >
                <div
                    className={`relative overflow-hidden rounded-[18px] shadow-sm ${isUser
                        ? `bg-[#DCF8C6] ${isAr ? 'rounded-tl-[4px]' : 'rounded-tr-[4px]'}`
                        : `bg-white ${isAr ? 'rounded-tr-[4px]' : 'rounded-tl-[4px]'}`
                    }`}
                    style={{ width: '190px' }}
                >
                    {/* Map preview */}
                    <div style={{ background: 'linear-gradient(135deg, #a8d5a2 0%, #7ec8a0 40%, #5aab8a 100%)', height: '90px', position: 'relative', overflow: 'hidden' }}>
                        {/* Grid lines */}
                        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
                            <line x1="0" y1="45" x2="190" y2="45" stroke="#fff" strokeWidth="0.8" />
                            <line x1="95" y1="0" x2="95" y2="90" stroke="#fff" strokeWidth="0.8" />
                            <line x1="0" y1="22" x2="190" y2="22" stroke="#fff" strokeWidth="0.5" />
                            <line x1="0" y1="68" x2="190" y2="68" stroke="#fff" strokeWidth="0.5" />
                            <line x1="47" y1="0" x2="47" y2="90" stroke="#fff" strokeWidth="0.5" />
                            <line x1="143" y1="0" x2="143" y2="90" stroke="#fff" strokeWidth="0.5" />
                        </svg>
                        {/* Roads */}
                        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
                            <line x1="30" y1="0" x2="60" y2="90" stroke="#fff" strokeWidth="2.5" />
                            <line x1="120" y1="0" x2="150" y2="90" stroke="#fff" strokeWidth="2" />
                            <line x1="0" y1="55" x2="190" y2="35" stroke="#fff" strokeWidth="2.5" />
                        </svg>
                        {/* Pin */}
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }}>
                            <svg width="22" height="28" viewBox="0 0 22 28">
                                <path d="M11 0C6.48 0 2 4.48 2 10c0 7 9 18 9 18s9-11 9-18C20 4.48 15.52 0 11 0z" fill="#E53935" />
                                <circle cx="11" cy="10" r="4" fill="#fff" />
                            </svg>
                        </div>
                    </div>
                    {/* Label */}
                    <div className="px-3 py-1.5">
                        <p className="text-[12px] font-semibold text-gray-800" dir={isAr ? 'rtl' : 'ltr'}>{isAr ? '📍 الموقع الحالي' : '📍 Current Location'}</p>
                        <div className={`flex items-center gap-1 mt-0.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-[10px] text-gray-500">{time}</span>
                            {isUser && <CheckCheck size={12} className="text-[#53bdeb]" />}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Receipt bubble
    if (msg.isReceipt) {
        const orderSummary = msg.receiptData?.orderSummary || '';
        const orderTotal = msg.receiptData?.orderTotal || 0;
        const customerName = msg.receiptData?.customerName || '';
        const deliveryMethod = msg.receiptData?.deliveryMethod || '';
        const orderNum = msg.receiptData?.orderNum || '';
        
        const isBooking = msg.receiptData?.isBooking || false;
        const isServices = msg.receiptData?.isServices || false;
        const isOther = msg.receiptData?.isOther || false;
        
        const bookingService = msg.receiptData?.bookingService || '';
        const bookingTime = msg.receiptData?.bookingTime || '';
        const serviceType = msg.receiptData?.serviceType || '';
        const serviceBudget = msg.receiptData?.serviceBudget || '';
        const customerPhone = msg.receiptData?.customerPhone || '';

        return (
            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isAr ? 'justify-end' : 'justify-start'} mb-1`}
            >
                <div
                    className="relative overflow-hidden rounded-[18px] bg-white text-gray-900 px-4 py-3 shadow-sm border border-gray-150"
                    style={{ width: '240px', borderRadius: isAr ? '18px 4px 18px 18px' : '4px 18px 18px 18px' }}
                >
                    <div className="flex justify-between items-center border-b pb-2 mb-2 border-dashed border-gray-200">
                        <span className="font-extrabold text-[12px] text-gray-850 truncate max-w-[140px]">{projectName}</span>
                        <span className="text-green-600 text-[10px] font-black bg-green-50 px-1.5 py-0.5 rounded">
                            {isBooking 
                                ? (isAr ? 'تأكيد حجز' : 'Booking Confirmed') 
                                : isServices 
                                    ? (isAr ? 'طلب خدمات' : 'Service Quote') 
                                    : isOther 
                                        ? (isAr ? 'طلب اتصال' : 'Callback Request')
                                        : (isAr ? 'فاتورة معتمدة' : 'Invoice')
                            }
                        </span>
                    </div>

                    <div className="space-y-1.5 text-gray-600 text-[11px]" dir={isAr ? 'rtl' : 'ltr'}>
                        {isBooking && (
                            <>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'رمز الحجز:' : 'Ref ID:'}</span>
                                    <span className="font-bold text-gray-800">#{orderNum}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الخدمة/العيادة:' : 'Service:'}</span>
                                    <span className="font-bold text-gray-800">{bookingService}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الموعد:' : 'Appointment:'}</span>
                                    <span className="font-bold text-gray-800">{bookingTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الاسم:' : 'Name:'}</span>
                                    <span className="font-bold text-gray-800">{customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الهاتف:' : 'Phone:'}</span>
                                    <span className="font-bold text-gray-850">{customerPhone}</span>
                                </div>
                            </>
                        )}

                        {isServices && (
                            <>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'رمز الطلب:' : 'Request ID:'}</span>
                                    <span className="font-bold text-gray-800">#{orderNum}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الخدمة المطلوبة:' : 'Service:'}</span>
                                    <span className="font-bold text-gray-850">{serviceType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الميزانية:' : 'Budget:'}</span>
                                    <span className="font-bold text-gray-850">{serviceBudget}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'العميل:' : 'Client:'}</span>
                                    <span className="font-bold text-gray-800">{customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الاتصال:' : 'Contact:'}</span>
                                    <span className="font-bold text-gray-850">{customerPhone}</span>
                                </div>
                            </>
                        )}

                        {isOther && (
                            <>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'رقم الطلب:' : 'Request ID:'}</span>
                                    <span className="font-bold text-gray-800">#{orderNum}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'الاسم:' : 'Name:'}</span>
                                    <span className="font-bold text-gray-800">{customerName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'رقم الاتصال:' : 'Phone:'}</span>
                                    <span className="font-bold text-gray-850">{customerPhone}</span>
                                </div>
                            </>
                        )}

                        {!isBooking && !isServices && !isOther && (
                            <>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'رقم الطلب:' : 'Order ID:'}</span>
                                    <span className="font-bold text-gray-800">#{orderNum}</span>
                                </div>
                                <div className="flex flex-col border-y py-1.5 my-1.5 border-gray-100 gap-0.5">
                                    <span className="text-gray-400 text-[10px]">{isAr ? 'المنتجات المطلوبة:' : 'Items:'}</span>
                                    <span className="font-semibold text-gray-850 leading-relaxed whitespace-pre-wrap">{orderSummary}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{isAr ? 'طريقة الاستلام:' : 'Delivery:'}</span>
                                    <span className="font-bold text-gray-800">{deliveryMethod}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 mt-2 border-gray-100 text-[13px] font-black text-gray-900">
                                    <span>{isAr ? 'الإجمالي:' : 'Total:'}</span>
                                    <span className="text-[#128C7E]">
                                        {`$${orderTotal.toFixed(2)}`}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-1 mt-2.5 justify-end">
                        <span className="text-[10px] text-gray-400">{time}</span>
                    </div>
                </div>
            </motion.div>
        );
    }

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

const CHECKOUT_URL = 'https://checkout.elegant-options.com/sales-automation';

function CTAScreen({ lang, onRetry, projectName, onBookMeeting }) {
    const isAr = lang === 'ar';
    const [step, setStep] = useState('main'); // 'main' | 'no'

    if (step === 'no') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-b from-[#0d1117] to-[#050509] rounded-2xl mx-3 p-5 border border-teal-500/30 shadow-[0_0_30px_rgba(13,148,136,0.1)]"
                dir={isAr ? 'rtl' : 'ltr'}
            >
                <div className="text-center text-3xl mb-3">⏳</div>
                <h3 className="text-white font-black text-center text-[15px] mb-2">
                    {isAr ? 'شاهد الأتمتة عملياً على مشروعك! 🚀' : 'See Automation Live on Your Project! 🚀'}
                </h3>
                <p className="text-slate-400 text-center text-[12px] leading-relaxed mb-4">
                    {isAr ? (
                        <>احجز اتصالاً سريعاً الآن لنعرض لك كيف يعمل نظام الردود التلقائية والبيع الذكي مباشرة على مشروعك.</>
                    ) : (
                        <>Book a quick call now so we can show you how the auto-reply and smart sales system works live on your business.</>
                    )}
                </p>
                <button
                    onClick={onBookMeeting}
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-black py-3.5 rounded-xl text-[13.5px] shadow-[0_0_20px_rgba(13,148,136,0.4)] mb-2 flex items-center justify-center gap-1.5"
                >
                    <span>📅</span>
                    <span>{isAr ? 'احجز مكالمة العرض المباشر' : 'Book Live Demo Call'}</span>
                </button>
                <button
                    onClick={onRetry}
                    className="w-full bg-white/[0.06] text-slate-300 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 border border-white/[0.08]"
                >
                    <RefreshCw size={14} />
                    {isAr ? '🔄 إعادة التجربة' : '🔄 Restart Demo'}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl mx-3 p-5 border border-teal-500/30 shadow-[0_0_30px_rgba(13,148,136,0.12)]"
            style={{ background: 'linear-gradient(160deg, #0d1117 0%, #08211d 60%, #050509 100%)' }}
            dir={isAr ? 'rtl' : 'ltr'}
        >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-3">
                {[1,2,3,4,5].map(i => <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />)}
            </div>

            {/* Main heading */}
            <h3 className="text-white font-black text-center text-[15px] leading-snug mb-2" style={{ fontFamily: 'Cairo' }}>
                {isAr 
                    ? 'شاهد الأتمتة عملياً على مشروعك! 🚀' 
                    : 'See Automation Live on Your Project! 🚀'}
            </h3>

            {/* Sub-heading */}
            <p className="text-slate-400 text-center text-[11px] leading-relaxed mb-3.5" style={{ fontFamily: 'Cairo' }}>
                {isAr 
                    ? 'احجز اتصالاً سريعاً الآن لنعرض لك كيف يعمل نظام الردود التلقائية والبيع الذكي مباشرة على مشروعك التجاري.' 
                    : 'Book a quick call now so we can show you how the auto-reply and smart sales system works live on your business.'}
            </p>

            {/* Explanatory sentence for booking meeting config (No mention of online store) */}
            <p className="text-white/90 text-center text-[10.5px] leading-relaxed mb-3.5 p-3 bg-white/5 rounded-xl border border-white/10" style={{ fontFamily: 'Cairo' }}>
                {isAr 
                    ? '💡 سنقوم بتخصيص تجربة حية ومباشرة لك في مكالمة مدتها 10 دقائق.'
                    : '💡 We will customize a live interactive demo for you in a 10-minute call.'}
            </p>

            <p className="text-teal-400 text-center text-[11.5px] font-bold mb-3.5" style={{ fontFamily: 'Cairo' }}>
                {isAr ? '⚡️ الاستشارة والعرض التوضيحي مجاني 100%' : '⚡️ Demo & consultation is 100% free'}
            </p>

            {/* Primary CTA (Book Meeting) */}
            <button
                onClick={onBookMeeting}
                className="w-full py-3.5 rounded-xl text-white font-black text-[13.5px] mb-3 relative overflow-hidden flex items-center justify-center gap-2 transition-all active:scale-98"
                style={{
                    background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                    boxShadow: '0 4px 15px rgba(13,148,136,0.3)',
                    fontFamily: 'Cairo'
                }}
            >
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <span className="relative z-10">📅 {isAr ? 'احجز مكالمة العرض المباشر' : 'Book Live Demo Call'}</span>
            </button>

            {/* Restart Demo Button (replacing No Thanks) */}
            <button
                onClick={onRetry}
                className="w-full py-2.5 rounded-xl text-slate-400 hover:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                style={{ fontFamily: 'Cairo' }}
            >
                <span>🔄</span>
                <span>{isAr ? 'إعادة التجربة' : 'Restart Demo'}</span>
            </button>
        </motion.div>
    );
}

// ─── Core Component ─────────────────────────────────────────────────────────────
const ChatSimulatorInner = ({ config, onBack, onBookMeeting, onDemoEnded, onResetDemo }) => {
    const { projectName, niche, platform, lang = 'ar' } = config;
    const isAr = lang === 'ar';

    // ── State ──
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [activeButtons, setActiveButtons] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isDemoEnded, setIsDemoEnded] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [flowStep, setFlowStep] = useState('welcome'); // welcome | catalog | ask_location_type | ask_location_share | ask_payment | confirm_payment_btn | ended
    const [customerName, setCustomerName] = useState('');
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderSummary, setOrderSummary] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [narratorText, setNarratorText] = useState(isAr ? 'يبدأ العميل المحادثة 👋' : 'Customer starts chat 👋');
    const [toast, setToast] = useState('');

    // ── Niche State Variables ──
    const [bookingService, setBookingService] = useState('');
    const [bookingDay, setBookingDay] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [serviceBudget, setServiceBudget] = useState('');

    const initialized = useRef(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => { scrollToBottom(); }, [messages, isTyping, activeButtons, isDemoEnded]);

    const addBotMsg = (text, delay = 0, narr = '') => new Promise(resolve => {
        setIsTyping(true);
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

    // ── Init (Step 1: Welcome) ──
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        setToast(isAr ? 'تسجيل دخول العميل...' : 'Customer online...');

        setTimeout(() => {
            addUserMsg(isAr ? 'هلا 👋' : 'Hello 👋');
            setIsTyping(true);
            setNarratorText(isAr ? 'يرحّب النظام بالعميل 👋' : 'System welcomes customer 👋');

            setTimeout(() => {
                let greetMsg = '';
                let buttons = [];
                let nextStep = 'catalog';

                if (niche === 'restaurant') {
                    greetMsg = isAr
                        ? `أهلاً بك في ${projectName || 'مطعمنا'}! 🍔 كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our restaurant'}! 🍔 How can we serve you today?`;
                    buttons = isAr
                        ? ['🍔 تصفح المنيو', '🔥 عروض اليوم', '💬 خدمة العملاء']
                        : ['🍔 Browse Menu', '🔥 Today\'s Offers', '💬 Customer Support'];
                    nextStep = 'catalog';
                } else if (niche === 'ecommerce') {
                    greetMsg = isAr
                        ? `أهلاً بك في ${projectName || 'متجرنا'}! 🛍️ كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our store'}! 🛍️ How can we help you today?`;
                    buttons = isAr
                        ? ['🛒 تصفح المنتجات', '🔥 العروض', '💬 خدمة العملاء']
                        : ['🛒 Browse Products', '🔥 Offers', '💬 Customer Service'];
                    nextStep = 'catalog';
                } else if (niche === 'clinic') {
                    greetMsg = isAr
                        ? `أهلاً بك في ${projectName || 'عيادتنا'}! 🩺 كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our clinic'}! 🩺 How can we help you today?`;
                    buttons = isAr
                        ? ['📅 حجز موعد', '🩺 الخدمات الطبية', '💬 استفسار']
                        : ['📅 Book Appointment', '🩺 Medical Services', '💬 Inquiry'];
                    nextStep = 'clinic_welcome';
                } else if (niche === 'salon') {
                    greetMsg = isAr
                        ? `أهلاً بك في ${projectName || 'صالوننا'}! 💅 كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our salon'}! 💅 How can we serve you today?`;
                    buttons = isAr
                        ? ['📅 حجز موعد', '💅 خدمات الصالون', '💬 استفسار']
                        : ['📅 Book Appointment', '💅 Salon Services', '💬 Inquiry'];
                    nextStep = 'salon_welcome';
                } else if (niche === 'consultant') {
                    greetMsg = isAr
                        ? `أهلاً بك مع ${projectName || 'مستشارنا'}! 💡 كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our coach'}! 💡 How can we assist you today?`;
                    buttons = isAr
                        ? ['📅 حجز موعد', '💡 الخدمات الاستشارية', '💬 استفسار']
                        : ['📅 Book Appointment', '💡 Advisory Services', '💬 Inquiry'];
                    nextStep = 'consultant_welcome';
                } else if (niche === 'services') {
                    greetMsg = isAr
                        ? `أهلاً بك في ${projectName || 'شركتنا'}! 💼 كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our company'}! 💼 How can we serve you today?`;
                    buttons = isAr
                        ? ['💼 طلب خدمة', '✨ خدماتنا', '💬 تواصل معنا']
                        : ['💼 Request Service', '✨ Our Services', '💬 Contact Support'];
                    nextStep = 'services_welcome';
                } else {
                    greetMsg = isAr
                        ? `أهلاً بك في ${projectName || 'مشروعنا'}! 👋 كيف نقدر نخدمك اليوم؟`
                        : `Welcome to ${projectName || 'our project'}! 👋 How can we assist you today?`;
                    buttons = isAr
                        ? ['💬 استفسار عام', '📞 طلب اتصال', '📍 الفرع والموقع']
                        : ['💬 General Inquiry', '📞 Request Call', '📍 Branch Location'];
                    nextStep = 'other_welcome';
                }

                setMessages(prev => [...prev, { id: Date.now(), text: greetMsg, sender: 'bot', timestamp: new Date() }]);
                setToast('');

                setTimeout(() => {
                    setIsTyping(false);
                    setActiveButtons(buttons);
                    setFlowStep(nextStep);
                }, 800);
            }, 1500);
        }, 800);
    }, []);

    // ── Handle Button Clicks ──
    const handleButtonClick = (btn) => {
        addUserMsg(btn);
        setActiveButtons([]);

        // ── Clinic, Salon, Consultant Welcome Options ──
        if (flowStep === 'clinic_welcome' || flowStep === 'salon_welcome' || flowStep === 'consultant_welcome') {
            const isBooking = btn.includes('حجز') || btn.includes('Book');
            const isServices = btn.includes('الخدمات') || btn.includes('Services');
            setIsTyping(true);

            if (isBooking) {
                setNarratorText(isAr ? 'يطلب البوت اختيار نوع الخدمة/التخصص 📋' : 'Bot requesting service type 📋');
                setTimeout(() => {
                    let msg = '';
                    let buttons = [];
                    if (niche === 'clinic') {
                        msg = isAr ? 'ممتاز! يرجى اختيار تخصص العيادة المطلوب:' : 'Excellent! Please select the desired clinic specialty:';
                        buttons = isAr ? ['🦷 عيادة الأسنان', '💅 الجلدية والتجميل', '👶 طب الأطفال'] : ['🦷 Dental Clinic', '💅 Dermatology', '👶 Pediatrics'];
                    } else if (niche === 'salon') {
                        msg = isAr ? 'رائع! يرجى اختيار الخدمة المطلوبة:' : 'Great! Please select the desired service:';
                        buttons = isAr ? ['💇 قص وتسريح شعر', '💅 العناية بالأظافر', '✨ تنظيف البشرة'] : ['💇 Hair Styling', '💅 Nail Care', '✨ Skin Cleansing'];
                    } else {
                        msg = isAr ? 'يسعدنا جداً مساعدتك! اختر نوع الجلسة الاستشارية:' : 'Happy to help! Choose the type of consultation session:';
                        buttons = isAr ? ['💡 استشارة عمل', '🏋️ تدريب شخصي', '🤝 جلسة إرشادية'] : ['💡 Business Consult', '🏋️ Personal Training', '🤝 Mentorship Session'];
                    }
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons(buttons);
                    setFlowStep(niche === 'clinic' ? 'clinic_specialty' : niche === 'salon' ? 'salon_service' : 'consultant_session');
                }, 1000);
            } else if (isServices) {
                setNarratorText(isAr ? 'عرض الخدمات المتاحة... ✨' : 'Showing available services... ✨');
                setTimeout(() => {
                    let msg = '';
                    if (niche === 'clinic') {
                        msg = isAr 
                            ? `نقدم في عيادة ${projectName || 'الطبية'} خدمات رعاية صحية متكاملة للأسنان، والتجميل، وطب الأطفال بأحدث التقنيات الطبية.`
                            : `At ${projectName || 'our'} Clinic, we offer integrated healthcare services in dentistry, cosmetology, and pediatrics using the latest medical technologies.`;
                    } else if (niche === 'salon') {
                        msg = isAr
                            ? `يقدم صالون ${projectName || 'للتجميل'} خدمات العناية بالشعر، الأظافر، البشرة، والميك اب الاحترافي على أيدي خبيرات معتمدات.`
                            : `At ${projectName || 'our'} Salon, we offer hair styling, nail care, skincare, and professional makeup services by certified experts.`;
                    } else {
                        msg = isAr
                            ? `نقدم جلسات استشارية متخصصة في تطوير الأعمال، الكوتشينج الرياضي، والإرشاد الشخصي لتحقيق أفضل النتائج.`
                            : `We offer specialized consulting sessions in business development, fitness coaching, and personal mentorship to achieve the best results.`;
                    }
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons(isAr 
                        ? ['📅 حجز موعد', '💬 استفسار'] 
                        : ['📅 Book Appointment', '💬 Inquiry']
                    );
                }, 1200);
            } else {
                setIsTyping(true);
                setNarratorText(isAr ? 'فتح نموذج الرسالة 💬' : 'Opening message form 💬');
                setTimeout(() => {
                    const msg = isAr 
                        ? 'تفّضل، اكتب استفسارك بالتفصيل وسيقوم فريقنا بالرد عليك مباشرة 👇'
                        : 'Please write your inquiry in detail and our team will reply shortly 👇';
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons([]);
                    setFlowStep('cs_writing_inquiry');
                }, 1000);
            }
            return;
        }

        // ── Specialty/Service Choice -> Day Selection ──
        if (flowStep === 'clinic_specialty' || flowStep === 'salon_service' || flowStep === 'consultant_session') {
            setBookingService(btn);
            setIsTyping(true);
            setNarratorText(isAr ? 'يطلب البوت تحديد يوم الحجز 📅' : 'Bot requesting appointment day 📅');
            setTimeout(() => {
                const msg = isAr 
                    ? `هذه الأيام تحتوي على أوقات متوفرة للحجز. ما هو اليوم المناسب لك في ${projectName || 'مشروعنا'}؟`
                    : `These days have available time slots. What is the suitable day for booking at ${projectName || 'our project'}?`;
                const buttons = isAr 
                    ? ['📅 غداً', '📅 بعد غد', '📅 الأسبوع القادم']
                    : ['📅 Tomorrow', '📅 Day after tomorrow', '📅 Next week'];
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons(buttons);
                setFlowStep('booking_day');
            }, 1000);
            return;
        }

        // ── Day Choice -> Propose Time Slots ──
        if (flowStep === 'booking_day') {
            setBookingDay(btn);
            setIsTyping(true);
            setNarratorText(isAr ? 'البوت يقترح الأوقات المتوفرة لليوم المحدد 🕒' : 'Bot proposing available times for selected day 🕒');
            setTimeout(() => {
                const cleanDay = btn.replace('📅 ', '');
                const msg = isAr 
                    ? `ممتاز! الأوقات المتاحة ليوم (${cleanDay}) هي:`
                    : `Great! Available times for (${cleanDay}) are:`;
                const buttons = isAr 
                    ? ['🕒 10:00 صباحاً', '🕒 3:00 مساءً', '🕒 7:00 مساءً']
                    : ['🕒 10:00 AM', '🕒 3:00 PM', '🕒 7:00 PM'];
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons(buttons);
                setFlowStep('booking_time');
            }, 1000);
            return;
        }

        // ── Time Choice -> Directly confirm booking and send receipt (no name request) ──
        if (flowStep === 'booking_time') {
            setBookingTime(btn);
            setIsTyping(true);
            setNarratorText(isAr ? 'جاري تأكيد الموعد وإرسال الكرت... ⏳' : 'Confirming booking and sending receipt... ⏳');
            setTimeout(() => {
                const bookingRef = generateOrderNum();
                const defaultName = isAr ? 'رقم الواتساب الحالي' : 'Current WhatsApp Number';
                setCustomerName(defaultName);
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    sender: 'bot',
                    isReceipt: true,
                    receiptData: {
                        isBooking: true,
                        bookingService,
                        bookingTime: `${bookingDay.replace('📅 ', '')} - ${btn.replace('🕒 ', '')}`,
                        customerName: defaultName,
                        customerPhone: isAr ? 'عبر واتساب الحالي' : 'Via current WhatsApp',
                        orderNum: bookingRef
                    },
                    timestamp: new Date()
                }]);
                setIsTyping(false);
                setFlowStep('ended');
                setNarratorText(isAr ? 'تم تأكيد موعد الحجز وإصدار الكرت تلقائياً! 🩺' : 'Appointment booking confirmed and card issued! 🩺');
                setTimeout(addFinalMsg, 1500);
            }, 1200);
            return;
        }

        // ── Services Welcome Options ──
        if (flowStep === 'services_welcome') {
            const isRequest = btn.includes('طلب') || btn.includes('Request');
            const isInfo = btn.includes('خدماتنا') || btn.includes('Services');
            setIsTyping(true);

            if (isRequest) {
                setNarratorText(isAr ? 'يطلب البوت تحديد نوع الخدمة المطلوبة 📋' : 'Bot requesting service type 📋');
                setTimeout(() => {
                    const msg = isAr 
                        ? 'يسعدنا خدمتك! يرجى اختيار الخدمة المطلوبة للبدء:'
                        : 'Happy to serve you! Please select the desired service:';
                    const buttons = isAr 
                        ? ['💻 تطوير برمجيات', '📈 تسويق رقمي', '🎨 تصميم هويات وتصاميم']
                        : ['💻 Software Dev', '📈 Digital Marketing', '🎨 Branding & Design'];
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons(buttons);
                    setFlowStep('services_type');
                }, 1000);
            } else if (isInfo) {
                setNarratorText(isAr ? 'عرض الخدمات المتاحة... 💼' : 'Showing available services... 💼');
                setTimeout(() => {
                    const msg = isAr 
                        ? `نقدم في شركة ${projectName || 'الخدمية'} خدمات تطوير المواقع والتطبيقات، التسويق الإلكتروني، وتصميم الهويات البصرية باحترافية كاملة.`
                        : `We offer custom software development, digital marketing, and branding services with professional quality at ${projectName || 'our'} company.`;
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons(isAr 
                        ? ['💼 طلب خدمة', '💬 تواصل معنا'] 
                        : ['💼 Request Service', '💬 Contact Support']
                    );
                }, 1200);
            } else {
                setIsTyping(true);
                setNarratorText(isAr ? 'تحويل للدعم 💬' : 'Connecting to support 💬');
                setTimeout(() => {
                    const msg = isAr 
                        ? 'تفضل، اكتب استفسارك وسيقوم فريقنا بالتواصل معك في أقرب وقت 👇'
                        : 'Please write your inquiry and our team will get back to you shortly 👇';
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons([]);
                    setFlowStep('cs_writing_inquiry');
                }, 1000);
            }
            return;
        }

        // ── Services Type -> Budget Selection ──
        if (flowStep === 'services_type') {
            setServiceType(btn);
            setIsTyping(true);
            setNarratorText(isAr ? 'يطلب البوت تحديد ميزانية المشروع 💵' : 'Bot requesting project budget 💵');
            setTimeout(() => {
                const msg = isAr 
                    ? 'ممتاز! يرجى اختيار الميزانية التقريبية المرصودة للمشروع:'
                    : 'Great! Please choose the estimated budget for this project:';
                const buttons = isAr 
                    ? ['💵 $500 - $1500', '💵 $1500 - $5000', '💵 أكثر من $5000']
                    : ['💵 $500 - $1500', '💵 $1500 - $5000', '💵 More than $5000'];
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons(buttons);
                setFlowStep('services_budget');
            }, 1000);
            return;
        }

        // ── Services Budget -> Ask Details ──
        if (flowStep === 'services_budget') {
            setServiceBudget(btn);
            setIsTyping(true);
            setNarratorText(isAr ? 'يطلب البوت تفاصيل الطلب ✍️' : 'Bot requesting request brief ✍️');
            setTimeout(() => {
                const msg = isAr 
                    ? 'رائع! اكتب وصفاً مختصراً للخدمة أو فكرة مشروعك لنتمكن من دراستها 👇'
                    : 'Awesome! Please write a brief description or idea of your service request 👇';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons([]);
                setFlowStep('services_ask_details');
            }, 1000);
            return;
        }

        // ── Other Niche Welcome Options ──
        if (flowStep === 'other_welcome') {
            const isCallback = btn.includes('اتصال') || btn.includes('Call');
            const isLocation = btn.includes('الفرع') || btn.includes('Location') || btn.includes('موقع');
            setIsTyping(true);

            if (isCallback) {
                setNarratorText(isAr ? 'يطلب البوت كتابة الاسم لطلب الاتصال ✍️' : 'Bot requesting name for callback ✍️');
                setTimeout(() => {
                    const msg = isAr 
                        ? 'يسعدنا جداً الاتصال بك! من فضلك اكتب الاسم الكريم أولاً 👇'
                        : 'We would love to call you! Please write your full name first 👇';
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons([]);
                    setFlowStep('other_ask_name');
                }, 1000);
            } else if (isLocation) {
                setNarratorText(isAr ? 'إرسال معلومات الفرع الجغرافي 📍' : 'Sending branch location info 📍');
                setTimeout(() => {
                    const msg = isAr 
                        ? `📍 فرعنا الرئيسي يقع في:\nسلطنة عُمان، مسقط، الخوير، شارع المها.\n⏰ ساعات العمل: 9 ص - 9 م`
                        : `📍 Our main branch is located at:\nMuscat, Al Khuwair, Al Maha St, Oman.\n⏰ Working Hours: 9 AM - 9 PM`;
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons(isAr 
                        ? ['💬 استفسار عام', '📞 طلب اتصال'] 
                        : ['💬 General Inquiry', '📞 Request Call']
                    );
                }, 1200);
            } else {
                setNarratorText(isAr ? 'فتح نموذج الاستفسار 📋' : 'Opening inquiry form 📋');
                setTimeout(() => {
                    const msg = isAr 
                        ? 'تفضل باعتراض استفسارك بالتفصيل هنا وسيقوم فريقنا بالرد الفوري 👇'
                        : 'Please write your inquiry details here and our team will respond shortly 👇';
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons([]);
                    setFlowStep('cs_writing_inquiry');
                }, 1000);
            }
            return;
        }

        // Browse catalog
        if (btn.includes('تصفح') || btn.includes('Browse') || btn.includes('Products') || btn.includes('المنيو') || btn.includes('Menu')) {
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
        if (btn.includes('عروض') || btn.includes('Offers')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'عرض العروض الحالية 🔥' : 'Showing current offers 🔥');
            setTimeout(() => {
                let msg = '';
                let buttons = [];

                if (niche === 'restaurant') {
                    msg = isAr
                        ? `🔥 عروض مطعم ${projectName || 'الذكي'} اليوم:\n\n✅ وجبة سوبر ديو بخصم 15%!\n✅ مشروب وحلوى مجانية مع كل وجبة عائلية 🍔\n✅ توصيل مجاني للطلبات فوق $20\n\n🍔 تصفح المنيو الآن للاستفادة من العروض!`
                        : `🔥 Today's Offers at ${projectName || 'Smart Restaurant'}:\n\n✅ Super Duo meal at 15% off!\n✅ Free drink and dessert with every Family Meal 🍔\n✅ Free delivery for orders above $20\n\n🍔 Browse Menu now to grab the deals!`;
                    buttons = [
                        isAr ? '🍔 تصفح المنيو' : '🍔 Browse Menu',
                        isAr ? '💬 خدمة العملاء' : '💬 Customer Support'
                    ];
                } else {
                    msg = isAr
                        ? '🔥 عروضنا الحالية:\n\n✅ خصم 20% على الإلكترونيات\n✅ اشتري 2 واحصل على الثالث مجاناً\n✅ توصيل مجاني للطلبات فوق $50\n\n🛒 تصفح المنتجات للاستفادة من العروض!'
                        : '🔥 Current offers:\n\n✅ 20% off Electronics\n✅ Buy 2 Get 1 Free\n✅ Free delivery on orders over $50\n\n🛒 Browse products to grab the deals!';
                    buttons = [
                        isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products',
                        isAr ? '💬 خدمة العملاء' : '💬 Customer Service'
                    ];
                }

                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons(buttons);
            }, 1200);
            return;
        }

        // Contact Support
        if (btn.includes('خدمة') || btn.includes('Customer') || btn.includes('تواصل') || btn.includes('Contact')) {
            setIsTyping(true);
            setNarratorText(isAr ? 'تحويل للخدمة 💬' : 'Connecting to service 💬');
            setTimeout(() => {
                const msg = isAr
                    ? '💬 أهلاً! فريق خدمة العملاء في خدمتك\n⏰ أوقات العمل: 9 ص - 10 م\n\nكيف يمكننا مساعدتك؟'
                    : '💬 Hello! Our customer service team is here for you\n⏰ Hours: 9 AM - 10 PM\n\nHow can we help you?';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons(isAr
                    ? ['📋 استفسار', '📝 شكوى']
                    : ['📋 Inquiry', '📝 Complaint']);
                setFlowStep('cs_type');
            }, 1000);
            return;
        }

        // CS Type Choice
        if (flowStep === 'cs_type') {
            const isInquiry = btn.includes('استفسار') || btn.includes('Inquiry');
            setIsTyping(true);
            setNarratorText(isAr ? 'جاري فتح نموذج الرسالة ✏️' : 'Opening message form ✏️');
            setTimeout(() => {
                const msg = isAr
                    ? (isInquiry
                        ? '📋 تفضل، اكتب استفسارك بالتفصيل وسنقوم بالرد عليك في أقرب وقت 👇'
                        : '📝 تفضل، اكتب شكواك بالتفصيل وسنتعامل معها بأولوية قصوى 👇')
                    : (isInquiry
                        ? '📋 Please write your inquiry in detail and we will respond as soon as possible 👇'
                        : '📝 Please write your complaint in detail and we will handle it with top priority 👇');
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons([]);
                setFlowStep(isInquiry ? 'cs_writing_inquiry' : 'cs_writing_complaint');
                setNarratorText(isAr ? 'العميل يكتب رسالته ✏️' : 'Customer writing message ✏️');
            }, 1000);
            return;
        }

        // Delivery choice
        if (flowStep === 'ask_location_type') {
            const isDelivery = btn.includes('توصيل') || btn.includes('Deliver');
            setDeliveryMethod(isDelivery
                ? (isAr ? 'توصيل للموقع 🚚' : 'Delivery to location 🚚')
                : (isAr ? 'استلام من الفرع 🏪' : 'Pickup from branch 🏪')
            );
            setIsTyping(true);

            if (isDelivery) {
                setNarratorText(isAr ? 'يطلب النظام إرسال الموقع 📍' : 'System requesting location 📍');
                setTimeout(() => {
                    const msg = isAr
                        ? `ممتاز! 📍 أرسل لنا موقعك الجغرافي لنتمكن من توصيل طلبك بأسرع وقت:`
                        : `Great! 📍 Please share your location so we can deliver your order as soon as possible:`;
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons(isAr ? ['📍 إرسال اللوكيشن'] : ['📍 Share Location']);
                    setIsTyping(false);
                    setFlowStep('ask_location_share');
                }, 1000);
            } else {
                setNarratorText(isAr ? 'تأكيد الاستلام الفرعي واختيار الدفع 💳' : 'Pickup checkout & payment selection 💳');
                setTimeout(() => {
                    const msg = isAr
                        ? 'رائع! سيكون طلبك جاهزاً للاستلام من فرعنا الرئيسي خلال 20 دقيقة ✅\n\nيرجى اختيار طريقة الدفع المناسبة لك 👇'
                        : 'Awesome! Your order will be ready for pickup from our main branch in 20 minutes ✅\n\nPlease select your preferred payment method 👇';
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons(isAr ? ['💵 كاش عند الاستلام', '💳 دفع بالبطاقة'] : ['💵 Cash on Delivery', '💳 Pay by Card']);
                    setIsTyping(false);
                    setFlowStep('ask_payment');
                }, 1000);
            }
            return;
        }

        // Payment method choice
        if (flowStep === 'ask_payment') {
            const isCash = btn.includes('كاش') || btn.includes('Cash');
            setIsTyping(true);
            setNarratorText(isAr ? 'جاري تأكيد وتسجيل الطلب... 📝' : 'Registering order... 📝');

            if (isCash) {
                setTimeout(() => {
                    const orderNum = generateOrderNum();
                    
                    // Create receipt bubble
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        sender: 'bot',
                        isReceipt: true,
                        receiptData: {
                            orderSummary,
                            orderTotal,
                            customerName,
                            deliveryMethod: isAr ? 'كاش عند الاستلام 💵' : 'Cash on Delivery 💵',
                            orderNum
                        },
                        timestamp: new Date()
                    }]);

                    setIsTyping(false);
                    setFlowStep('ended');
                    setNarratorText(isAr ? 'تم تأكيد طلبك بنجاح ✅' : 'Order confirmed successfully ✅');
                    setTimeout(() => {
                        addFinalMsg();
                    }, 1500);
                }, 1400);
            } else {
                // Card Payment Link
                setTimeout(() => {
                    const msg = isAr
                        ? `تفضل رابط الدفع الإلكتروني الآمن لمشروع ${projectName || 'الذكي'}:\n🔗 ${CHECKOUT_URL}\n\nيرجى النقر على الزر أدناه بعد إتمام عملية الدفع 👇`
                        : `Here is your secure online payment link for ${projectName || 'Smart'} project:\n🔗 ${CHECKOUT_URL}\n\nPlease click the button below after completing the payment 👇`;
                    setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons([isAr ? '✅ تم الدفع بنجاح' : '✅ Payment Completed']);
                    setFlowStep('confirm_payment_btn');
                    setIsTyping(false);
                }, 1200);
            }
            return;
        }

        // Card Payment Confirmation
        if (flowStep === 'confirm_payment_btn') {
            setIsTyping(true);
            setNarratorText(isAr ? 'يتم التحقق من الدفع تلقائياً... 💳' : 'Verifying payment automatically... 💳');

            setTimeout(() => {
                const orderNum = generateOrderNum();

                // Send invoice/receipt
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'bot',
                    isReceipt: true,
                    receiptData: {
                        orderSummary,
                        orderTotal,
                        customerName,
                        deliveryMethod: isAr ? 'دفع إلكتروني معتمد 💳' : 'Card Paid 💳',
                        orderNum
                    },
                    timestamp: new Date()
                }]);

                setIsTyping(false);
                setFlowStep('ended');
                setNarratorText(isAr ? 'تم استلام الدفعة وإصدار الفاتورة تلقائياً! 🧾' : 'Payment received and invoice issued automatically! 🧾');
                setTimeout(addFinalMsg, 1800);
            }, 1800);
            return;
        }
    };

    const addFinalMsg = () => {
        setIsTyping(true);
        setTimeout(() => {
            const msg = isAr
                ? `نشكرك على ثقتك بـ ${projectName || 'متجرنا الذكي'}! 🌟`
                : `Thank you for choosing ${projectName || 'our Smart Store'}! 🌟`;
            setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
            setIsTyping(false);
            setNarratorText(isAr ? 'أتمتة المحادثة انتهت بنجاح 🎉' : 'Chat automation completed successfully 🎉');
            setTimeout(() => {
                setIsDemoEnded(true);
                if (onDemoEnded) onDemoEnded();
            }, 2000);
        }, 1200);
    };

    // ── Handle Catalog Submit ──
    const handleCatalogSubmit = (summary, total) => {
        setIsCatalogOpen(false);
        setOrderSummary(summary);
        setOrderTotal(total);

        const userMsg = isAr ? `أريد طلب المنتجات التالية:\n${summary}` : `I want to order the following items:\n${summary}`;
        addUserMsg(userMsg);
        setIsTyping(true);
        setNarratorText(isAr ? 'النظام يطرح خيارات الاستلام والتوصيل 📦' : 'System asking for delivery options 📦');

        setTimeout(() => {
            const askDeliveryMsg = isAr
                ? `ممتاز جداً! 🛍️ إجمالي طلبك هو $${total.toFixed(2)}.\n\nكيف تفضل استلام طلبك اليوم؟`
                : `Excellent choice! 🛍️ Your order total is $${total.toFixed(2)}.\n\nHow would you like to receive your order today?`;
            setMessages(prev => [...prev, { id: Date.now(), text: askDeliveryMsg, sender: 'bot', timestamp: new Date() }]);
            setActiveButtons(isAr
                ? ['📍 توصيل لموقعي', '🏪 استلام من الفرع']
                : ['📍 Deliver to My Location', '🏪 Pickup from Branch']
            );
            setIsTyping(false);
            setFlowStep('ask_location_type');
        }, 1400);
    };

    // ── Handle Text Input (Send Message) ──
    const handleSendText = (e) => {
        e.preventDefault();
        const text = inputText.trim();
        if (!text) return;
        setInputText('');
        addUserMsg(text);
        setIsTyping(true);

        // 1. Customer Service Inquiry Writing Flow
        if (flowStep === 'cs_writing_inquiry' || flowStep === 'cs_writing_complaint') {
            const isInquiry = flowStep === 'cs_writing_inquiry';
            setNarratorText(isAr ? 'تم استلام الرسالة بنجاح وبسرعة فائقة ✅' : 'Message received instantly ✅');
            setTimeout(() => {
                const msg = isAr
                    ? (isInquiry
                        ? '✅ تم استلام استفسارك بنجاح!\n\nسيقوم أحد مسؤولي الدعم بالتواصل معك مباشرة، أو يمكنك العودة للاختيارات الرئيسية أدناه 👇'
                        : '✅ تم استلام شكواك بنجاح!\n\nتم تحويلها للمراجعة الفورية، وسنتواصل معك خلال دقائق معدودة 🙏')
                    : (isInquiry
                        ? '✅ Inquiry received successfully!\n\nOur support team will contact you shortly, or you can return to main options below 👇'
                        : '✅ Complaint received successfully!\n\nForwarded for immediate review. We will contact you in a few minutes 🙏');
                
                let buttons = [isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products'];
                let nextStep = 'catalog';

                if (niche === 'restaurant') {
                    buttons = isAr ? ['🍔 تصفح المنيو'] : ['🍔 Browse Menu'];
                    nextStep = 'catalog';
                } else if (niche === 'clinic' || niche === 'salon' || niche === 'consultant') {
                    buttons = isAr ? ['📅 حجز موعد'] : ['📅 Book Appointment'];
                    nextStep = niche === 'clinic' ? 'clinic_welcome' : niche === 'salon' ? 'salon_welcome' : 'consultant_welcome';
                } else if (niche === 'services') {
                    buttons = isAr ? ['💼 طلب خدمة'] : ['💼 Request Service'];
                    nextStep = 'services_welcome';
                } else if (niche === 'other') {
                    buttons = isAr ? ['💬 استفسار عام', '📞 طلب اتصال'] : ['💬 General Inquiry', '📞 Request Call'];
                    nextStep = 'other_welcome';
                }

                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setActiveButtons(buttons);
                setFlowStep(nextStep);
            }, 1400);
            return;
        }

        // 2. Booking Flow: Ask Name -> Ask Phone
        // 2. Booking Flow: Ask Name -> Directly issue booking receipt (no phone request)
        if (flowStep === 'booking_ask_name') {
            setCustomerName(text);
            setNarratorText(isAr ? 'جاري تأكيد الموعد وإرسال الكرت... ⏳' : 'Confirming booking and sending receipt... ⏳');
            setTimeout(() => {
                const bookingRef = generateOrderNum();
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    sender: 'bot',
                    isReceipt: true,
                    receiptData: {
                        isBooking: true,
                        bookingService,
                        bookingTime: `${bookingDay.replace('📅 ', '')} - ${bookingTime.replace('🕒 ', '')}`,
                        customerName: text,
                        customerPhone: isAr ? 'عبر واتساب الحالي' : 'Via current WhatsApp',
                        orderNum: bookingRef
                    },
                    timestamp: new Date()
                }]);
                setIsTyping(false);
                setFlowStep('ended');
                setNarratorText(isAr ? 'تم تأكيد موعد الحجز وإصدار الكرت تلقائياً! 🩺' : 'Appointment booking confirmed and card issued! 🩺');
                setTimeout(addFinalMsg, 1500);
            }, 1200);
            return;
        }

        // 3. Services Flow: Ask Details -> Ask Company Name
        if (flowStep === 'services_ask_details') {
            setNarratorText(isAr ? 'يتم حفظ التفاصيل وطلب الاسم ✍️' : 'Details saved, requesting name ✍️');
            setTimeout(() => {
                const msg = isAr 
                    ? 'شكراً لك! يرجى كتابة الاسم الكريم أو اسم الجهة/الشركة 👇'
                    : 'Thank you! Please write your full name or company name 👇';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false);
                setFlowStep('services_ask_company');
            }, 1200);
            return;
        }

        // 4. Services Flow: Ask Company Name -> Directly issue services receipt (no contact info request)
        if (flowStep === 'services_ask_company') {
            setCustomerName(text);
            setNarratorText(isAr ? 'جاري تسجيل طلبك وإرسال ملخص الطلب... ⏳' : 'Recording request and sending summary... ⏳');
            setTimeout(() => {
                const requestRef = generateOrderNum();
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    sender: 'bot',
                    isReceipt: true,
                    receiptData: {
                        isServices: true,
                        serviceType,
                        serviceBudget,
                        customerName: text,
                        customerPhone: isAr ? 'عبر واتساب الحالي' : 'Via current WhatsApp',
                        orderNum: requestRef
                    },
                    timestamp: new Date()
                }]);
                setIsTyping(false);
                setFlowStep('ended');
                setNarratorText(isAr ? 'تم تسجيل طلب الخدمة وإرسال الكرت بنجاح! 💼' : 'Service request recorded and card issued! 💼');
                setTimeout(addFinalMsg, 1500);
            }, 1200);
            return;
        }

        // 5. Other Flow: Ask Name -> Directly issue callback request receipt (no phone request)
        if (flowStep === 'other_ask_name') {
            setCustomerName(text);
            setNarratorText(isAr ? 'جاري تسجيل طلب الاتصال... ⏳' : 'Recording callback request... ⏳');
            setTimeout(() => {
                const callRef = generateOrderNum();
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    sender: 'bot',
                    isReceipt: true,
                    receiptData: {
                        isOther: true,
                        customerName: text,
                        customerPhone: isAr ? 'عبر واتساب الحالي' : 'Via current WhatsApp',
                        orderNum: callRef
                    },
                    timestamp: new Date()
                }]);
                setIsTyping(false);
                setFlowStep('ended');
                setNarratorText(isAr ? 'تم تسجيل طلب الاتصال وسيتصل بك أحد ممثلينا قريباً! 📞' : 'Callback request recorded. A representative will contact you soon! 📞');
                setTimeout(addFinalMsg, 1500);
            }, 1200);
            return;
        }

        // Fallback chatbot text reply
        setTimeout(() => {
            let fallbackMsg = isAr ? 'أهلاً بك! انقر على "تصفح المنتجات" للبدء بالطلب 🛍️' : 'Welcome! Click "Browse Products" to start ordering 🛍️';
            let buttons = [isAr ? '🛒 تصفح المنتجات' : '🛒 Browse Products'];

            if (niche === 'restaurant') {
                fallbackMsg = isAr ? 'أهلاً بك! انقر على "تصفح المنيو" للبدء بالطلب 🍔' : 'Welcome! Click "Browse Menu" to start ordering 🍔';
                buttons = [isAr ? '🍔 تصفح المنيو' : '🍔 Browse Menu'];
            } else if (niche === 'clinic' || niche === 'salon' || niche === 'consultant') {
                fallbackMsg = isAr ? 'أهلاً بك! يرجى الضغط على زر "حجز موعد" لتحديد موعدك المناسب 📅' : 'Welcome! Please click "Book Appointment" to choose a suitable time 📅';
                buttons = [isAr ? '📅 حجز موعد' : '📅 Book Appointment'];
            } else if (niche === 'services') {
                fallbackMsg = isAr ? 'أهلاً بك! يرجى الضغط على زر "طلب خدمة" لبدء إرسال طلبك 💼' : 'Welcome! Please click "Request Service" to submit your request 💼';
                buttons = [isAr ? '💼 طلب خدمة' : '💼 Request Service'];
            } else if (niche === 'other') {
                fallbackMsg = isAr ? 'أهلاً بك! يرجى اختيار أحد الأزرار للتواصل معنا 👇' : 'Welcome! Please choose one of the options below to contact us 👇';
                buttons = isAr ? ['💬 استفسار عام', '📞 طلب اتصال'] : ['💬 General Inquiry', '📞 Request Call'];
            }

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: fallbackMsg,
                sender: 'bot', timestamp: new Date()
            }]);
            setIsTyping(false);
            if (activeButtons.length === 0) {
                setActiveButtons(buttons);
            }
        }, 1000);
    };

    const handleButtonClickWrapper = (btn) => {
        // Location Sharing Trigger
        if ((btn.includes('اللوكيشن') || btn.includes('Share Location')) && flowStep === 'ask_location_share') {
            setActiveButtons([]);
            
            // Send user location message
            setMessages(prev => [...prev, {
                id: Date.now() + Math.random(),
                text: isAr ? '📍 الموقع الحالي' : '📍 Current Location',
                sender: 'user',
                isLocation: true,
                timestamp: new Date()
            }]);

            setIsTyping(true);
            setNarratorText(isAr ? 'تم استلام الموقع الجغرافي بنجاح 📍' : 'Location received successfully 📍');
            
            setTimeout(() => {
                const msg = isAr
                    ? 'ممتاز! تم استلام موقعك الجغرافي وحفظه بنجاح لضمان سرعة التوصيل 🚚\n\nيرجى تحديد طريقة الدفع المفضلة لديك 👇'
                    : 'Perfect! Location received and saved to ensure fast delivery 🚚\n\nPlease select your preferred payment method 👇';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons(isAr ? ['💵 كاش عند الاستلام', '💳 دفع بالبطاقة'] : ['💵 Cash on Delivery', '💳 Pay by Card']);
                setIsTyping(false);
                setFlowStep('ask_payment');
            }, 1500);
            return;
        }

        handleButtonClick(btn);
    };

    const handleRetry = () => {
        setMessages([]);
        setActiveButtons([]);
        setIsTyping(false);
        setIsDemoEnded(false);
        if (onResetDemo) onResetDemo();
        setFlowStep('welcome');
        setCustomerName('');
        setOrderTotal(0);
        setOrderSummary('');
        setDeliveryMethod('');
        
        setBookingService('');
        setBookingDay('');
        setBookingTime('');
        setCustomerPhone('');
        setServiceType('');
        setServiceBudget('');

        setNarratorText(isAr ? 'يبدأ العميل من جديد 👋' : 'Customer starting over 👋');
        initialized.current = false;

        setTimeout(() => {
            if (!initialized.current) {
                initialized.current = true;
                addUserMsg(isAr ? 'هلا 👋' : 'Hello 👋');
                setIsTyping(true);
                setTimeout(() => {
                    let greetMsg = '';
                    let buttons = [];
                    let nextStep = 'catalog';

                    if (niche === 'restaurant') {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً في مطعم ${projectName || 'الذكي'}! 🍔 كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'Smart'} Restaurant! 🍔 How can we serve you today?`;
                        buttons = isAr
                            ? ['🍔 تصفح المنيو', '🔥 عروض اليوم', '💬 خدمة العملاء']
                            : ['🍔 Browse Menu', '🔥 Today\'s Offers', '💬 Customer Support'];
                        nextStep = 'catalog';
                    } else if (niche === 'ecommerce') {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً في متجر ${projectName || 'الذكي'}! 🛍️ كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'Smart'} Store! 🛍️ How can we help you today?`;
                        buttons = isAr
                            ? ['🛒 تصفح المنتجات', '🔥 العروض', '💬 خدمة العملاء']
                            : ['🛒 Browse Products', '🔥 Offers', '💬 Customer Service'];
                        nextStep = 'catalog';
                    } else if (niche === 'clinic') {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً في عيادة ${projectName || 'الطبية'}! 🩺 كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'Smart'} Clinic! 🩺 How can we help you today?`;
                        buttons = isAr
                            ? ['📅 حجز موعد', '🩺 الخدمات الطبية', '💬 استفسار']
                            : ['📅 Book Appointment', '🩺 Medical Services', '💬 Inquiry'];
                        nextStep = 'clinic_welcome';
                    } else if (niche === 'salon') {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً في صالون ${projectName || 'للتجميل'}! 💅 كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'Smart'} Salon! 💅 How can we serve you today?`;
                        buttons = isAr
                            ? ['📅 حجز موعد', '💅 خدمات الصالون', '💬 استفسار']
                            : ['📅 Book Appointment', '💅 Salon Services', '💬 Inquiry'];
                        nextStep = 'salon_welcome';
                    } else if (niche === 'consultant') {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً مع المستشار ${projectName || 'الذكي'}! 💡 كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'Smart'} Consulting! 💡 How can we assist you today?`;
                        buttons = isAr
                            ? ['📅 حجز موعد', '💡 الخدمات الاستشارية', '💬 استفسار']
                            : ['📅 Book Appointment', '💡 Advisory Services', '💬 Inquiry'];
                        nextStep = 'consultant_welcome';
                    } else if (niche === 'services') {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً في شركة ${projectName || 'الذكية'}! 💼 كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'Smart'} Services! 💼 How can we serve you today?`;
                        buttons = isAr
                            ? ['💼 طلب خدمة', '✨ خدماتنا', '💬 تواصل معنا']
                            : ['💼 Request Service', '✨ Our Services', '💬 Contact Support'];
                        nextStep = 'services_welcome';
                    } else {
                        greetMsg = isAr
                            ? `أهلاً بك مجدداً في ${projectName || 'مشروعنا'}! 👋 كيف نقدر نخدمك اليوم؟`
                            : `Welcome back to ${projectName || 'our project'}! 👋 How can we assist you today?`;
                        buttons = isAr
                            ? ['💬 استفسار عام', '📞 طلب اتصال', '📍 الفرع والموقع']
                            : ['💬 General Inquiry', '📞 Request Call', '📍 Branch Location'];
                        nextStep = 'other_welcome';
                    }

                    setMessages(prev => [...prev, { id: Date.now(), text: greetMsg, sender: 'bot', timestamp: new Date() }]);
                    setIsTyping(false);
                    setActiveButtons(buttons);
                    setFlowStep(nextStep);
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
        setDeliveryMethod('');

        setBookingService('');
        setBookingDay('');
        setBookingTime('');
        setCustomerPhone('');
        setServiceType('');
        setServiceBudget('');

        setNarratorText(isAr ? 'العودة للقائمة الرئيسية 🏠' : 'Returning to main menu 🏠');

        setTimeout(() => {
            let greetMsg = '';
            let buttons = [];
            let nextStep = 'catalog';

            if (niche === 'restaurant') {
                greetMsg = isAr
                    ? `أهلاً بك في ${projectName || 'مطعمنا'}! 🍔 كيف نقدر نخدمك اليوم؟`
                    : `Welcome to ${projectName || 'our restaurant'}! 🍔 How can we serve you today?`;
                buttons = isAr
                    ? ['🍔 تصفح المنيو', '🔥 عروض اليوم', '💬 خدمة العملاء']
                    : ['🍔 Browse Menu', '🔥 Today\'s Offers', '💬 Customer Support'];
                nextStep = 'catalog';
            } else if (niche === 'ecommerce') {
                greetMsg = isAr
                    ? `أهلاً بك في ${projectName || 'متجرنا'}! 🛍️ كيف نقدر نخدمك اليوم?`
                    : `Welcome to ${projectName || 'our store'}! 🛍️ How can we help you today?`;
                buttons = isAr
                    ? ['🛒 تصفح المنتجات', '🔥 العروض', '💬 خدمة العملاء']
                    : ['🛒 Browse Products', '🔥 Offers', '💬 Customer Service'];
                nextStep = 'catalog';
            } else if (niche === 'clinic') {
                greetMsg = isAr
                    ? `أهلاً بك في ${projectName || 'عيادتنا'}! 🩺 كيف نقدر نخدمك اليوم؟`
                    : `Welcome to ${projectName || 'our clinic'}! 🩺 How can we help you today?`;
                buttons = isAr
                    ? ['📅 حجز موعد', '🩺 الخدمات الطبية', '💬 استفسار']
                    : ['📅 Book Appointment', '🩺 Medical Services', '💬 Inquiry'];
                nextStep = 'clinic_welcome';
            } else if (niche === 'salon') {
                greetMsg = isAr
                    ? `أهلاً بك في ${projectName || 'صالوننا'}! 💅 كيف نقدر نخدمك اليوم؟`
                    : `Welcome to ${projectName || 'our salon'}! 💅 How can we serve you today?`;
                buttons = isAr
                    ? ['📅 حجز موعد', '💅 خدمات الصالون', '💬 استفسار']
                    : ['📅 Book Appointment', '💅 Salon Services', '💬 Inquiry'];
                nextStep = 'salon_welcome';
            } else if (niche === 'consultant') {
                greetMsg = isAr
                    ? `أهلاً بك مع ${projectName || 'مستشارنا'}! 💡 كيف نقدر نخدمك اليوم؟`
                    : `Welcome to ${projectName || 'our coach'}! 💡 How can we assist you today?`;
                buttons = isAr
                    ? ['📅 حجز موعد', '💡 الخدمات الاستشارية', '💬 استفسار']
                    : ['📅 Book Appointment', '💡 Advisory Services', '💬 Inquiry'];
                nextStep = 'consultant_welcome';
            } else if (niche === 'services') {
                greetMsg = isAr
                    ? `أهلاً بك في ${projectName || 'شركتنا'}! 💼 كيف نقدر نخدمك اليوم؟`
                    : `Welcome to ${projectName || 'our company'}! 💼 How can we serve you today?`;
                buttons = isAr
                    ? ['💼 طلب خدمة', '✨ خدماتنا', '💬 تواصل معنا']
                    : ['💼 Request Service', '✨ Our Services', '💬 Contact Support'];
                nextStep = 'services_welcome';
            } else {
                greetMsg = isAr
                    ? `أهلاً بك في ${projectName || 'مشروعنا'}! 👋 كيف نقدر نخدمك اليوم؟`
                    : `Welcome to ${projectName || 'our project'}! 👋 How can we assist you today?`;
                buttons = isAr
                    ? ['💬 استفسار عام', '📞 طلب اتصال', '📍 الفرع والموقع']
                    : ['💬 General Inquiry', '📞 Request Call', '📍 Branch Location'];
                nextStep = 'other_welcome';
            }

            setMessages([
                { id: Date.now(), text: greetMsg, sender: 'bot', timestamp: new Date() }
            ]);
            setActiveButtons(buttons);
            setFlowStep(nextStep);
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
                onError={e => { e.target.outerHTML = `<div class="w-8 h-8 rounded-full bg-[#25d366] flex items-center justify-center text-white font-black text-sm shrink-0">${projectName?.charAt(0)?.toUpperCase() || 'م'}</div>`; }}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                    <h3 className="text-white font-semibold text-[15px] truncate max-w-[120px]">
                      {projectName || (isAr ? 'متجرنا الذكي' : 'Smart Store')}
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
                        borderRadius: '10px',
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
                    {isAr ? '🏠 الرئيسية' : '🏠 Main'}
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
                        <ChatBubble key={msg.id} msg={msg} isAr={isAr} projectName={projectName} />
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
                            className="mt-4 mb-2 animate-bounce-subtle"
                        >
                            <CTAScreen lang={lang} onRetry={handleRetry} projectName={projectName} onBookMeeting={onBookMeeting} />
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Bar */}
            <div
                className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
                style={{ background: '#F0F0F0', borderTop: '1px solid rgba(0,0,0,0.08)', zIndex: 40 }}
            >
                <button className="text-[#54656F] p-1.5"><Smile size={22} /></button>
                <form onSubmit={handleSendText} className="flex-1 flex items-center bg-white rounded-full px-4 gap-2 shadow-sm border border-black/5" style={(flowStep === 'cs_writing_inquiry' || flowStep === 'cs_writing_complaint') ? { borderColor: '#25d366', borderWidth: '1.5px' } : {}}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder={
                            flowStep === 'cs_writing_inquiry'
                                ? (isAr ? 'اكتب استفسارك هنا...' : 'Write your inquiry here...')
                                : flowStep === 'cs_writing_complaint'
                                    ? (isAr ? 'اكتب شكواك هنا...' : 'Write your complaint here...')
                                    : (isAr ? 'اكتب رسالة...' : 'Type a message...')
                        }
                        className="flex-1 bg-transparent text-gray-800 text-[13px] py-2.5 outline-none placeholder:text-gray-400"
                        dir={isAr ? 'rtl' : 'ltr'}
                        autoFocus={flowStep === 'cs_writing_inquiry' || flowStep === 'cs_writing_complaint'}
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
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-all shrink-0"
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
