import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, Bot, CheckCheck, Loader2, Phone, Video, MoreVertical, Paperclip, Smile, Mic, Info, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { getFlows, determineFlow, getFallbackMessage } from '../ChatEngine';
import CatalogFlowSheet from './CatalogFlowSheet';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ChatSimulator Crash Blocked:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-[#0A0A0A]">
                    <Bot size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold mb-2">انتهى العرض</h2>
                    <p className="text-slate-400 mb-6 font-medium text-sm">حدث خطأ داخلي. تم إيقاف المسار لحماية النظام.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-xl transition-all font-bold"
                    >
                        إعادة تشغيل النظام
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

const ChatSimulatorInner = ({ config, onBack, onChangePlatform }) => {
    const { projectName, niche, platform, goals, lang = 'ar' } = config;
    const isAr = lang === 'ar';
    const flowType = determineFlow(niche); // niche is now 'clinic', 'ecommerce', etc.
    const flows = getFlows(projectName, goals, lang);
    const currentFlow = flows[flowType] || flows['other']; // Rigorous null-safety fallback

    console.log("📍 ACTIVE NICHE DEBUG:", config.niche);
    console.log("🛠️ LOADED FLOW DATA:", currentFlow);
    console.log(`🎯 [project_name]: ${projectName} | [niche_name]: ${niche}`);

    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [activeButtons, setActiveButtons] = useState([]);
    const [interactionCount, setInteractionCount] = useState(0);
    const [showCTA, setShowCTA] = useState(false);
    const [hasSeenModal, setHasSeenModal] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [toast, setToast] = useState('');
    const [narratorText, setNarratorText] = useState(isAr ? 'يبدأ العميل المحادثة 👋' : 'Customer starts chat 👋');
    const [isWaitingForCs, setIsWaitingForCs] = useState(false);
    const [isWaitingForTime, setIsWaitingForTime] = useState(false);
    const [isWaitingForLead, setIsWaitingForLead] = useState(false);
    const [customerName, setCustomerName] = useState('');
    // New Checkout States
    const [isWaitingForLocation, setIsWaitingForLocation] = useState(false);
    const [isWaitingForPaymentOption, setIsWaitingForPaymentOption] = useState(false);
    const [isWaitingForNotesChoice, setIsWaitingForNotesChoice] = useState(false);
    const [isWaitingForNotesText, setIsWaitingForNotesText] = useState(false);
    const [isWaitingForClinicTime, setIsWaitingForClinicTime] = useState(false);
    const [isWaitingForCsMenu, setIsWaitingForCsMenu] = useState(false);
    const [isWaitingForVisaLead, setIsWaitingForVisaLead] = useState(false);
    const [isWaitingForVisaUpload, setIsWaitingForVisaUpload] = useState(false);
    const [isWaitingForNameOnly, setIsWaitingForNameOnly] = useState(false);
    const [ctaInterestStep, setCtaInterestStep] = useState('question'); // 'question' | 'yes' | 'no'
    // Travel multi-step data collection
    const [travelStep, setTravelStep] = useState(0); // 0=inactive, 1=destination, 2=travelers, 3=date, 4=name, 5=phone
    const [travelData, setTravelData] = useState({});

    const [isDemoEnded, setIsDemoEnded] = useState(false);
    const [isCatalogSheetOpen, setIsCatalogSheetOpen] = useState(false);
    const catalogNiches = ['restaurant', 'ecommerce', 'retail', 'services', 'realestate', 'consulting'];

    const initialized = useRef(false);
    const messagesEndRef = useRef(null);
    const demoEndedCardRef = useRef(null);

    const isInsta = platform === 'instagram';
    const isMsg = platform === 'messenger';
    const isWa = platform === 'whatsapp' || (!isInsta && !isMsg);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, activeButtons]);

    useEffect(() => {
        if (isDemoEnded && demoEndedCardRef.current) {
            setTimeout(() => {
                demoEndedCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [isDemoEnded]);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        showToast(isAr ? 'تسجيل دخول العميل...' : 'Customer logging in...');

        setTimeout(() => {
            setMessages([{ id: Date.now(), text: isAr ? 'هلا' : 'Hello', sender: 'user', timestamp: new Date() }]);
            setIsTyping(true);
            setNarratorText(isAr ? 'يقوم النظام الآن بالترحيب بالعميل 👋' : 'System welcomes the customer 👋');

            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now(), text: currentFlow.greeting1, sender: 'bot', timestamp: new Date() }]);
                setNarratorText(isAr ? 'يسأل النظام عن هدف التواصل 🎯' : 'System asks for the contact purpose 🎯');

                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now() + 1, text: currentFlow?.greeting2 || '', sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons(currentFlow?.buttons || []);
                    setIsTyping(false);
                    setToast('');
                }, 1000); // 1s gap

            }, 1500);
        }, 1000);
    }, [currentFlow, config, isAr]); // Safer dependencies

    const handleCatalogSelect = (itemName, detailText, isDoctor) => {
        let userMsg = '';
        if (niche === 'realestate') {
            userMsg = isAr ? `مهتم بـ [${itemName}]` : `Interested in [${itemName}]`;
        } else if (niche === 'services') {
            userMsg = isAr ? `أريد طلب [${itemName}]` : `I want to order [${itemName}]`;
        } else {
            userMsg = isAr
                ? (isDoctor ? `أرغب بحجز موعد مع [${itemName}]` : `أريد طلب [${itemName}]`)
                : (isDoctor ? `I'd like to book an appointment with [${itemName}]` : `I want to order [${itemName}]`);
        }

        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user', timestamp: new Date() }]);
        setIsTyping(true);
        setInteractionCount(prev => prev + 1);

        setTimeout(() => {
            if (niche === 'clinic') {
                // Step 4: Ask for customer name before booking
                const askNameMsg = isAr
                    ? 'يرجى كتابة اسمك الكريم لتأكيد الحجز. ✍️'
                    : 'Please type your name to confirm the booking. ✍️';

                setIsWaitingForLead(true);
                setMessages(prev => [...prev, { id: Date.now() + 1, text: askNameMsg, sender: 'bot', timestamp: new Date() }]);
                setNarratorText(isAr ? 'النظام يطلب اسم المريض لتأكيد الحجز 📝' : 'System collects patient name to confirm booking 📝');
                setIsTyping(false);
                setActiveButtons([]);
                return;
            } else if (niche === 'realestate') {
                const botFollowUpMsg = isAr
                    ? 'أهلًا! ما اسمك الكريم؟ 😊'
                    : 'Hello! What\'s your name? 😊';
                
                setIsWaitingForLead(true);
                setMessages(prev => [...prev, { id: Date.now() + 1, text: botFollowUpMsg, sender: 'bot', timestamp: new Date() }]);
                setNarratorText(isAr ? 'النظام يطلب اسم العميل 📝' : 'System asks for customer name 📝');
            } else if (niche === 'services') {
                const botFollowUpMsg = isAr
                    ? 'أهلًا! ما اسمك الكريم؟ 😊'
                    : 'Hello! What\'s your name? 😊';
                
                setIsWaitingForLead(true);
                setMessages(prev => [...prev, { id: Date.now() + 1, text: botFollowUpMsg, sender: 'bot', timestamp: new Date() }]);
            } else if (niche === 'travel') {
                // Travel catalog selection → start multi-step data collection
                const travelAskMsg = isAr
                    ? 'اختيار ممتاز! ما وجهتك المفضلة؟ 🌍'
                    : 'Great choice! What is your preferred destination? 🌍';
                setMessages(prev => [...prev, { id: Date.now() + 1, text: travelAskMsg, sender: 'bot', timestamp: new Date() }]);
                setTravelStep(1);
                setNarratorText(isAr ? 'النظام يبدأ جمع بيانات السفر 🌍' : 'System starts travel data collection 🌍');
            } else {
                const botFollowUpMsg = isAr
                    ? `ممتاز! إجمالي طلبكم هو ${detailText}. يرجى إرسال موقعكم الجغرافي (اللوكيشن) لتوصيل الطلب بدقة 📍`
                    : `Great! Your total is ${detailText}. Please send your location for delivery 📍`;

                setIsWaitingForLocation(true);
                setMessages(prev => [...prev, { id: Date.now() + 1, text: botFollowUpMsg, sender: 'bot', timestamp: new Date() }]);
                setNarratorText(isAr ? 'النظام يطلب تحديد الموقع الجغرافي 📍' : 'System requests geographical location 📍');
            }

            setIsTyping(false);
            setActiveButtons([]);
        }, 1200);
    };

    const handleSheetSubmit = (cartSummary, totalPrice) => {
        setIsCatalogSheetOpen(false);
        const userMsg = isAr 
            ? (niche === 'realestate' ? `مهتم بـ:\n${cartSummary}` : `أريد طلب:\n${cartSummary}`)
            : (niche === 'realestate' ? `Interested in:\n${cartSummary}` : `I want to order:\n${cartSummary}`);

        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user', timestamp: new Date() }]);
        setIsTyping(true);
        setInteractionCount(prev => prev + 1);

        setTimeout(() => {
            const formattedTotal = isAr ? `${totalPrice.toFixed(2)} د.ك` : `$${totalPrice.toFixed(2)}`;
            // Ask for name ONLY as an isolated standalone step
            const askNameMsg = isAr
                ? `ممتاز! إجمالي طلبك هو ${formattedTotal}.`
                : `Great! Your total is ${formattedTotal}.`;

            setMessages(prev => [...prev, { id: Date.now() + 1, text: askNameMsg, sender: 'bot', timestamp: new Date() }]);

            // Then immediately send a separate name-only question
            setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                    const nameMsg = isAr ? 'أهلًا! ما اسمك الكريم؟ 😊' : 'Hello! What\'s your name? 😊';
                    setMessages(prev => [...prev, { id: Date.now() + 2, text: nameMsg, sender: 'bot', timestamp: new Date() }]);
                    setIsWaitingForLead(true);
                    setNarratorText(isAr ? 'النظام يطلب اسم العميل كخطوة منفصلة ✍️' : 'System requests customer name as a standalone step ✍️');
                    setActiveButtons([]);
                    setIsTyping(false);
                }, 800);
            }, 500);
        }, 1500);
    };

    const showToast = (msg) => setToast(msg);

    const generateOrderNumber = () => Math.floor(1000 + Math.random() * 9000).toString();

    const generateWaLink = (contextMsg) => {
        const nicheLabels = {
            restaurant: isAr ? 'مطعم / كافيه' : 'Restaurant / Cafe',
            clinic: isAr ? 'عيادة / مركز طبي' : 'Clinic / Medical',
            ecommerce: isAr ? 'متجر إلكتروني' : 'E-commerce',
            retail: isAr ? 'محل تجاري' : 'Retail Store',
            travel: isAr ? 'مكتب سفريات' : 'Travel Agency',
            consulting: isAr ? 'استشارات وتدريب' : 'Consulting & Training',
            services: isAr ? 'بيع الخدمات' : 'Services',
            realestate: isAr ? 'مكتب عقاري' : 'Real Estate',
        };
        const nicheLabel = nicheLabels[niche] || niche;
        const defaultText = isAr
            ? `مرحبًا، أنا مهتم بتطبيق أتمتة واتساب لنشاطي التجاري.\nالنشاط: ${nicheLabel}\nاسم المشروع: ${projectName}`
            : `Hello, I'm interested in applying WhatsApp automation for my business.\nBusiness Type: ${nicheLabel}\nProject Name: ${projectName}`;
        const text = contextMsg ? encodeURIComponent(contextMsg) : encodeURIComponent(defaultText);
        window.open(`https://wa.me/96566305551?text=${text}`, '_blank');
    };

    const triggerDemoEnded = () => {
        setNarratorText(isAr ? 'النظام ينهي المسار 🚀' : 'System ends the flow 🚀');
        showToast(isAr ? 'تجهيز العرض النهائي...' : 'Preparing final view...');
        setTimeout(() => {
            setIsDemoEnded(true);
            setToast('');
        }, 1500);
    };

    const returnToMainMenu = () => {
        setIsDemoEnded(false);
        setIsTyping(true);
        setNarratorText(isAr ? 'يعود النظام إلى القائمة الرئيسية 🔙' : 'System returning to main menu 🔙');
        showToast(isAr ? 'جاري العودة للقائمة...' : 'Returning to menu...');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now(), text: currentFlow.greeting2, sender: 'bot', timestamp: new Date() }]);
            setActiveButtons(currentFlow.buttons || []);
            setIsWaitingForCs(false);
            setIsWaitingForTime(false);
            setIsWaitingForLead(false);
            setIsTyping(false);
            setToast('');
        }, 1200);
    };

    const safeStateTransitionGuard = (newState) => {
        if (!newState) {
            console.warn("State engine returned undefined -> triggering fallback");
            triggerDemoEnded();
            return false;
        }
        return true;
    }

    const handleSendText = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMsg = inputText.trim();
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user', timestamp: new Date() }]);
        setInputText('');
        setInteractionCount(prev => prev + 1);

        if (isWaitingForTime) {
            setIsTyping(true);
            setNarratorText(isAr ? 'يتحقق النظام من توفر المواعيد آلياً 🕒' : 'System checks appointment availability automatically 🕒');
            showToast(isAr ? 'جاري التحقق...' : 'Checking availability...');

            setTimeout(() => {
                const orderNum = generateOrderNumber();
                const confirmationMsg = isAr
                    ? `لحظات بس نشيك لك عالمواعيد... ⏳\n\nيعطيك العافية، حجزك تأكد ✅\n🧾 رقم الحجز: #RES-${orderNum}\nننطرك تنورنا قريباً ✨`
                    : `Checking available slots... ⏳\n\nGreat, your appointment is confirmed ✅\n🧾 Reservation #: #RES-${orderNum}\nLooking forward to seeing you soon ✨`;

                setMessages(prev => [...prev, { id: Date.now(), text: confirmationMsg, sender: 'bot', timestamp: new Date() }]);
                setIsWaitingForTime(false);
                setIsTyping(false);
                setToast('');
                setNarratorText(isAr ? 'يتم الآن إصدار رقم الحجز بنجاح ✅' : 'Reservation number issued successfully ✅');
                setTimeout(() => triggerDemoEnded(), 1500);
            }, 2000);
            return;
        }

        // --- CLINIC APPOINTMENT TIME STATE ---
        if (isWaitingForClinicTime) {
            setIsTyping(true);
            setNarratorText(isAr ? 'يتحقق النظام من توفر الموعد في العيادة 📋' : 'System checks clinic appointment availability 📋');
            showToast(isAr ? 'جارٍ مراجعة جدول المواعيد...' : 'Checking schedule...');

            // Stage 1 — Short delay then push the "checking" bubble and stop typing
            setTimeout(() => {
                const checkMsg = isAr
                    ? 'جاري مراجعة جدول المواعيد للتأكد من التوفر... ⏳'
                    : 'Checking the appointment schedule for availability... ⏳';
                setMessages(prev => [...prev, { id: Date.now(), text: checkMsg, sender: 'bot', timestamp: new Date() }]);
                setIsTyping(false); // user reads the checking bubble

                // Stage 2 — Re-enable typing indicator to simulate DB check, then push confirmation
                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        const orderNum = generateOrderNumber();
                        const confirmMsg = isAr
                            ? `تم تأكيد حجزك بنجاح ✅\nرقم الحجز: #RES-${orderNum}\nنتطلع لزيارتك قريباً ✨`
                            : `Your appointment has been confirmed successfully ✅\nBooking #: #RES-${orderNum}\nWe look forward to your visit ✨`;
                        setMessages(prev => [...prev, { id: Date.now() + 1, text: confirmMsg, sender: 'bot', timestamp: new Date() }]);
                        setIsWaitingForClinicTime(false);
                        setIsTyping(false);
                        setToast('');
                        setNarratorText(isAr ? 'تم تأكيد الحجز بنجاح ✅' : 'Booking confirmed successfully ✅');
                        setTimeout(() => triggerDemoEnded(), 2000);
                    }, 1800);
                }, 300);
            }, 600);
            return;
        }

        if (isWaitingForCs) {
            setIsTyping(true);
            setNarratorText(isAr ? 'يتلقى النظام رسالة صريحة ويحفظها للوكيل البشري 📝' : 'System receives direct message and assigns human agent 📝');
            showToast(isAr ? 'يتم توجيه الرسالة...' : 'Routing message...');

            setTimeout(() => {
                const okMsg = isAr
                    ? 'تم طال عمرك! رسالتك وصلتنا وبنحولها للقسم المختص عشان يتواصلون معاك ✅'
                    : 'Noted! Your message is received and routed to the relevant team who will contact you soon ✅';
                setMessages(prev => [...prev, { id: Date.now(), text: okMsg, sender: 'bot', timestamp: new Date() }]);
                setIsWaitingForCs(false);
                setIsTyping(false);
                setToast('');
                setTimeout(() => triggerDemoEnded(), 1500);
            }, 1000);
            return;
        }

        if (isWaitingForLocation) {
            setIsTyping(true);
            setNarratorText(isAr ? 'يستلم النظام الموقع الجغرافي ويطرح خيارات الدفع 💳' : 'System receives location and maps payment options 💳');
            showToast(isAr ? 'تحديد الموقع...' : 'Pinpointing location...');

            setTimeout(() => {
                const paymentMsg = isAr ? 'تم استلام الموقع 👍\nكيف تفضل إتمام عملية الدفع؟' : 'Location received 👍\nHow would you like to pay?';
                setMessages(prev => [...prev, { id: Date.now(), text: paymentMsg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons([
                    isAr ? 'الدفع نقداً عند الاستلام 💵' : 'Cash on Delivery 💵',
                    isAr ? 'الدفع عبر رابط آمن 🔗' : 'Secure Payment Link 🔗'
                ]);
                setIsWaitingForLocation(false);
                setIsWaitingForPaymentOption(true);
                setIsTyping(false);
                setToast('');
            }, 1200);
            return;
        }

        if (isWaitingForNotesText) {
            setIsTyping(true);

            // Check context from last bot message type
            const lastBotMsg = [...messages].reverse().find(m => m.sender === 'bot');
            const isMedicalConsult = lastBotMsg?.type === 'medical_consult';
            const isCsMessage = !isMedicalConsult && (lastBotMsg?.text?.includes('للإدارة') || lastBotMsg?.text?.includes('management'));

            setNarratorText(isMedicalConsult
                ? (isAr ? 'النظام يُحيل الاستشارة للدكتور المختص ✅' : 'System forwards consultation to specialist ✅')
                : isCsMessage
                    ? (isAr ? 'النظام يُحيل رسالة العميل للإدارة ✅' : 'System forwards message to management ✅')
                    : (isAr ? 'النظام يسجل الملاحظات الإضافية وينهي العملية ✅' : 'System records additional notes and finalizes process ✅'));
            showToast(isAr ? 'جارٍ الإرسال...' : 'Sending...');

            setTimeout(() => {
                const finalMsg = isMedicalConsult
                    ? (isAr
                        ? '✅ تم استلام استشارتك. سيتم توجيهها للدكتور المختص وسيتم الرد عليك بأسرع وقت ممكن 🏥'
                        : "✅ Your consultation has been received. It will be forwarded to the specialist and you'll hear back as soon as possible 🏥")
                    : isCsMessage
                        ? (isAr
                            ? '✅ تم استلام رسالتك وإحالتها للإدارة. سنتواصل معك في أقرب وقت ممكن 🙏'
                            : "✅ Your message has been received and forwarded to management. We'll get back to you as soon as possible 🙏")
                        : (isAr
                            ? 'تم تسجيل ملاحظتك بنجاح، سيتواصل معك أحد ممثلي خدمة العملاء قريباً ✅'
                            : 'Your note has been recorded, a customer service rep will contact you shortly ✅');
                setMessages(prev => [...prev, { id: Date.now(), text: finalMsg, sender: 'bot', timestamp: new Date() }]);
                setIsWaitingForNotesText(false);
                setIsTyping(false);
                setToast('');
                setTimeout(() => triggerDemoEnded(), 1500);
            }, 1200);
            return;
        }

        // --- TRAVEL MULTI-STEP DATA COLLECTION ---
        if (travelStep > 0 && niche === 'travel') {
            setIsTyping(true);
            const input = userMsg.trim();

            if (travelStep === 1) {
                setTravelData(prev => ({ ...prev, destination: input }));
                showToast(isAr ? 'جارٍ المتابعة...' : 'Processing...');
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now(), text: isAr ? 'كم عدد المسافرين؟ 👥' : 'How many travelers? 👥', sender: 'bot', timestamp: new Date() }]);
                    setTravelStep(2);
                    setIsTyping(false);
                    setToast('');
                }, 800);
            } else if (travelStep === 2) {
                setTravelData(prev => ({ ...prev, travelers: input }));
                showToast(isAr ? 'جارٍ المتابعة...' : 'Processing...');
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now(), text: isAr ? 'ما تاريخ السفر المتوقع؟ 📅' : 'What is your expected travel date? 📅', sender: 'bot', timestamp: new Date() }]);
                    setTravelStep(3);
                    setIsTyping(false);
                    setToast('');
                }, 800);
            } else if (travelStep === 3) {
                setTravelData(prev => ({ ...prev, date: input }));
                showToast(isAr ? 'جارٍ المتابعة...' : 'Processing...');
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now(), text: isAr ? 'ما اسمك الكريم؟ ✍️' : 'What is your name? ✍️', sender: 'bot', timestamp: new Date() }]);
                    setTravelStep(4);
                    setIsTyping(false);
                    setToast('');
                }, 800);
            } else if (travelStep === 4) {
                setTravelData(prev => ({ ...prev, name: input }));
                setCustomerName(input);
                showToast(isAr ? 'جارٍ المتابعة...' : 'Processing...');
                setTimeout(() => {
                    setMessages(prev => [...prev, { id: Date.now(), text: isAr ? 'ما رقم تواصلك؟ 📱' : 'What is your contact number? 📱', sender: 'bot', timestamp: new Date() }]);
                    setTravelStep(5);
                    setIsTyping(false);
                    setToast('');
                }, 800);
            } else if (travelStep === 5) {
                setTravelData(prev => ({ ...prev, phone: input }));
                const name = travelData.name || input;
                showToast(isAr ? 'جارٍ تسجيل الطلب...' : 'Registering request...');
                setTimeout(() => {
                    const finalMsg = isAr
                        ? `شكرًا ${name} 🌍 تم استلام طلبك. سيتواصل معك أحد متخصصي السفر لدينا قريبًا ✈️`
                        : `Thank you ${name} 🌍 Your request has been received. One of our travel specialists will contact you shortly ✈️`;
                    setMessages(prev => [...prev, { id: Date.now(), text: finalMsg, sender: 'bot', timestamp: new Date() }]);
                    setTravelStep(0);
                    setTravelData({});
                    setIsTyping(false);
                    setToast('');
                    setNarratorText(isAr ? 'تم تسجيل طلب السفر بنجاح ✅' : 'Travel request registered ✅');
                    setTimeout(() => triggerDemoEnded(), 2000);
                }, 1200);
            }
            return;
        }

        if (isWaitingForLead) {
            setIsTyping(true);
            const rawInput = userMsg.trim();
            // Only use as a personal name if it contains at least one letter (avoid echoing phone numbers etc.)
            const looksLikeName = /[\p{L}]/u.test(rawInput);
            const savedName = looksLikeName ? rawInput : '';
            if (savedName) setCustomerName(savedName);
            setNarratorText(isAr ? 'يتم حفظ البيانات وتحية العميل 👋' : 'Data saved, sending greeting 👋');
            showToast(isAr ? 'جاري التحقق...' : 'Processing...');

            setTimeout(() => {
                // Step 5: Personalized greeting if we have a real name, otherwise neutral ack
                const greetMsg = savedName
                    ? (isAr ? `أهلاً بك ${savedName} 👋\nيسعدنا خدمتك.` : `Hello ${savedName} 👋\nHappy to serve you.`)
                    : (isAr ? 'تم حفظ البيانات، شكراً لك.' : 'Data saved, thank you.');
                setMessages(prev => [...prev, { id: Date.now(), text: greetMsg, sender: 'bot', timestamp: new Date() }]);

                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        // Clinic niche: after greeting ask for preferred appointment time
                        if (niche === 'clinic') {
                            const timeAskMsg = isAr
                                ? 'ما هو الموعد المفضل لديك؟ صباحاً أم مساءً؟ 🗓️'
                                : 'What is your preferred appointment time? Morning or evening? 🗓️';
                            setIsWaitingForClinicTime(true);
                            setIsWaitingForLead(false);
                            setMessages(prev => [...prev, { id: Date.now() + 2, text: timeAskMsg, sender: 'bot', timestamp: new Date() }]);
                            setNarratorText(isAr ? 'النظام يطلب وقت الموعد المفضل 🗓️' : 'System asks for preferred appointment time 🗓️');
                            setIsTyping(false);
                            setToast('');
                            return;
                        }

                        let leadOkMsg = '';
                        switch (niche) {
                            case 'realestate':
                            case 'services':
                            case 'travel':
                                leadOkMsg = isAr
                                    ? `تم استلام بياناتكم بنجاح. سيقوم فريق خدمة العملاء في ${projectName} بالتواصل معكم قريباً ✅.`
                                    : `Your details have been received. The ${projectName} team will contact you soon ✅.`;
                                setMessages(prev => [...prev, { id: Date.now() + 2, text: leadOkMsg, sender: 'bot', timestamp: new Date() }]);
                                setIsWaitingForLead(false);
                                setIsTyping(false);
                                setToast('');
                                setTimeout(() => triggerDemoEnded(), 3000);
                                break;
                            case 'consulting':
                                leadOkMsg = isAr
                                    ? 'سعداء بانضمامك لبرامجنا 💡\nلتأكيد حجز مقعدك في الجلسة الاستشارية، يرجى إتمام عملية الدفع عبر الرابط:\n🔗 https://pay.elegantoptions.com/consultation'
                                    : 'Happy to have you 💡\nTo confirm your seat, complete the payment via:\n🔗 https://pay.elegantoptions.com/consultation';
                                setMessages(prev => [...prev, { id: Date.now() + 2, text: leadOkMsg, sender: 'bot', timestamp: new Date() }]);
                                setIsWaitingForLead(false);
                                setIsTyping(false);
                                setToast('');
                                setTimeout(() => triggerDemoEnded(), 3000);
                                break;
                            default:
                                // eCommerce, Retail, Restaurant - ask for location next
                                const locMsg = isAr
                                    ? 'يرجى إرسال موق\u200Cعك الج\u200Cغرافي لتوصيل الطلب بدقة 📍'
                                    : 'Please send your L\u200Cocation for accurate delivery 📍';
                                setIsWaitingForLocation(true);
                                setIsWaitingForLead(false);
                                setMessages(prev => [...prev, { id: Date.now() + 2, text: locMsg, sender: 'bot', timestamp: new Date() }]);
                                setActiveButtons([isAr ? 'إرسال الم\u200Cوقع الحالي 📍' : 'Send Current L\u200Cocation 📍']);
                                setIsTyping(false);
                                setToast('');
                                return;
                        }
                    }, 1200);
                }, 800);
            }, 1500);
            return;
        }

        // VISA LEAD STATE: collect name+destination then show passport/CS branch
        if (isWaitingForVisaLead) {
            setIsTyping(true);
            setNarratorText(isAr ? 'النظام يحفظ بيانات التأشيرة ويطرح خيارات المتابعة 🚮' : 'System stores visa data and presents next steps 🚮');
            showToast(isAr ? 'جارٍ معالجة البيانات...' : 'Processing data...');

            setTimeout(() => {
                const nextMsg = isAr
                    ? 'أهلاً بك. هل تود إرفاق صورة من جواز السفر الآن لتسريع العملية، أم تفضل التحدث مع خدمة العملاء لتوضيح المتطلبات أولاً؟'
                    : 'Thank you. Would you like to upload your passport photo now to speed up the process, or would you prefer to speak with a customer service agent to clarify the requirements first?';
                setMessages(prev => [...prev, { id: Date.now(), text: nextMsg, sender: 'bot', timestamp: new Date() }]);
                setIsWaitingForVisaLead(false);
                setActiveButtons(isAr
                    ? ['إرفاق صورة الجواز 📸', 'التحدث مع خدمة العملاء 📞']
                    : ['Upload Passport Photo 📸', 'Speak to Customer Service 📞']
                );
                setIsTyping(false);
                setToast('');
            }, 1400);
            return;
        }

        // Fallback logic for wrong input during regular Button flows
        setIsTyping(true);
        setNarratorText(isAr ? 'يقوم النظام بتحليل النص المدخل وتوجيه العميل 🔍' : 'System analyzes text input 🔍');
        showToast(isAr ? 'النظام يقوم بالتحليل...' : 'Analyzing...');
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now(), text: getFallbackMessage(lang), sender: 'bot', timestamp: new Date() }]);
            setActiveButtons(prev => prev.length > 0 ? prev : (currentFlow.buttons || []));
            setIsTyping(false);
            setToast('');
        }, 1000);
    };

    const handleButtonClick = (buttonText) => {
        setMessages(prev => [...prev, { id: Date.now(), text: buttonText, sender: 'user', timestamp: new Date() }]);
        setActiveButtons([]);
        setInteractionCount(prev => prev + 1);
        setIsWaitingForCs(false);
        setIsWaitingForTime(false);
        setIsWaitingForLead(false);
        setIsWaitingForLocation(false);
        // Exclude notes/payment states from strict hard resets if we are explicitly handling them below

        if (buttonText === 'نرد للرئيسية') {
            const temp_isDemoEnded = isDemoEnded;
            returnToMainMenu();
            setIsWaitingForPaymentOption(false);
            setIsWaitingForNotesChoice(false);
            setIsWaitingForNotesText(false);
            return;
        }

        if (buttonText === 'تواصل معنا للأسعار') {
            generateWaLink();
            triggerDemoEnded();
            return;
        }

        setIsTyping(true);

        // CS Sub-Menu Button Branching (شكوى / استفسار / موظف)
        const csSubOptions = ['شكوى ⚠️', 'رسالة استفسار 💬', 'التحدث مع موظف خدمة العملاء 📞', 'Complaint ⚠️', 'Inquiry 💬', 'Speak to Agent 📞'];
        if (isWaitingForCsMenu || csSubOptions.includes(buttonText)) {
            setIsWaitingForCsMenu(false);

            // "Speak to Agent" → immediate routing. Complaint/Inquiry → ask them to type their message first
            const isTextOption = ['شكوى ⚠️', 'رسالة استفسار 💬', 'Complaint ⚠️', 'Inquiry 💬'].includes(buttonText);

            if (isTextOption) {
                setNarratorText(isAr ? 'النظام ينتظر رسالة العميل قبل الإحالة ✅' : 'System awaits customer message before routing ✅');
                const askMsg = isAr
                    ? 'تفضّل، اكتب رسالتك وسنوصلها للإدارة فورًا 📩'
                    : "Go ahead, type your message and we'll forward it to management right away 📩";
                setMessages(prev => [...prev, { id: Date.now(), text: askMsg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons([]);
                setIsTyping(false);
                setToast('');
                setIsWaitingForNotesText(true); // reuse notes-text state for free-text input
                setNarratorText(isAr ? 'ينتظر النظام رسالة العميل للإحالة للإدارة 📩' : 'System waiting for customer message to forward to management 📩');
            } else {
                // "Speak to Agent" → direct routing
                setNarratorText(isAr ? 'النظام يوجّه العميل للموظف المختص ✅' : 'System routes customer to designated agent ✅');
                showToast(isAr ? 'جاري التوجيه...' : 'Routing...');
                setTimeout(() => {
                    const finalMsg = isAr
                        ? 'تم تسجيل طلبك. سيتم الآن توجيهك إلى فريق خدمة العملاء المختصين، وسيتواصل معك أحد ممثلينا في أقرب وقت ممكن. شكراً لتواصلك معنا. 🙏'
                        : 'Your request has been registered. You will now be routed to our specialized support team and a representative will contact you shortly. Thank you for reaching out. 🙏';
                    setMessages(prev => [...prev, { id: Date.now(), text: finalMsg, sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons([]);
                    setIsTyping(false);
                    setToast('');
                    setTimeout(() => triggerDemoEnded(), 2000);
                }, 1200);
            }
            return;
        }

        // Edit Order Branching
        if (buttonText === 'تعديل الطلب' || buttonText === 'Edit Order') {
            setNarratorText(isAr ? 'يعود النظام لقائمة الطلبات للتحرير 📝' : 'System opens catalog for editing 📝');
            setIsWaitingForLead(false);
            setIsTyping(false);
            
            // Pop the last user 'Edit' and bot 'Total' request to keep history clean
            setMessages(prev => {
                const cleanMsg = [...prev];
                // Remove the "Edit order" button text if present
                if (cleanMsg[cleanMsg.length - 1].text === buttonText) {
                    cleanMsg.pop();
                }
                return cleanMsg;
            });

            setTimeout(() => {
                setIsCatalogSheetOpen(true);
            }, 300);
            return;
        }

        // Visa Passport Upload Button
        if (buttonText === 'رفع صورة الجواز 📸' || buttonText === 'Upload Passport 📸') {
            setNarratorText(isAr ? 'النظام يتلقى صورة جواز السفر ✅' : 'System receives passport ✅');
            showToast(isAr ? 'جارٍ معالجة المستند...' : 'Processing document...');
            setActiveButtons([]);

            // Step 1: Receipt confirmation
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now(), text: isAr
                        ? 'شكرًا، تم استلام جواز سفرك بنجاح ✅'
                        : 'Thank you! Your passport has been received ✅',
                    sender: 'bot', timestamp: new Date()
                }]);
                setIsTyping(false);

                // Step 2: Farewell and end demo
                setTimeout(() => {
                    setIsTyping(true);
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            id: Date.now() + 1, text: isAr
                                ? 'سيتواصل معك فريقنا قريبًا لاستكمال إجراءات التأشيرة.'
                                : 'Our team will contact you shortly to proceed with your visa application.',
                            sender: 'bot', timestamp: new Date()
                        }]);
                        setIsWaitingForVisaUpload(false);
                        setIsTyping(false);
                        setToast('');
                        setTimeout(() => triggerDemoEnded(), 2000);
                    }, 1500);
                }, 400);
            }, 1000);
            return;
        }

        // Visa Branch Buttons: Passport Photo or CS Handoff
        if (buttonText === 'إرفاق صورة الجواز 📸' || buttonText === 'Upload Passport Photo 📸') {
            setNarratorText(isAr ? 'النظام يتلقى المستندات ويحيل لفريق التأشيرات ✅' : 'System receives documents and routes to visa team ✅');
            showToast(isAr ? 'جارٍ استلام المستند...' : 'Receiving document...');
            setTimeout(() => {
                const msg = isAr
                    ? 'يرجى رفع الصورة هنا. (محاكاة: تم استلام المستندات 📄). سيقوم فريق التأشيرات بمراجعتها والتواصل معك فوراً لاستكمال الإجراءات ✅.'
                    : 'Please upload the photo here. (Simulation: Documents received 📄). The visa team will review them and contact you immediately to complete the process ✅.';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons([]);
                setIsTyping(false);
                setToast('');
                setTimeout(() => triggerDemoEnded(), 2000);
            }, 1200);
            return;
        }
        if (buttonText === 'التحدث مع خدمة العملاء 📞' || buttonText === 'Speak to Customer Service 📞') {
            setNarratorText(isAr ? 'النظام يحوّل لخبير تأشيرات مختص ✅' : 'System routes to visa specialist ✅');
            showToast(isAr ? 'جارٍ التحويل...' : 'Routing...');
            setTimeout(() => {
                const msg = isAr
                    ? 'تم تسجيل طلبك. سيتم تحويلك الآن لأحد خبرائنا لمساعدتك في تفاصيل ومتطلبات تأشيرتك في أقرب وقت ✅.'
                    : 'Your request has been registered. You will now be transferred to one of our specialists to assist you with your visa details and requirements as soon as possible ✅.';
                setMessages(prev => [...prev, { id: Date.now(), text: msg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons([]);
                setIsTyping(false);
                setToast('');
                setTimeout(() => triggerDemoEnded(), 2000);
            }, 1200);
            return;
        }

        // Location Button Branching
        if (buttonText.includes('الم\u200Cوقع') || buttonText.includes('L\u200Cocation') || buttonText.includes('الموقع') || buttonText.includes('Location')) {
            setNarratorText(isAr ? 'يستلم النظام الموقع الجغرافي ويطرح خيارات الدفع 💳' : 'System receives location and maps payment options 💳');
            showToast(isAr ? 'تحديد الموقع...' : 'Pinpointing location...');

            setTimeout(() => {
                const paymentMsg = isAr ? 'تم استلام الم\u200Cوقع 👍. كيف تفضل إتمام عملية الدفع؟' : 'L\u200Cocation received 👍. How would you like to pay?';
                setMessages(prev => [...prev, { id: Date.now(), text: paymentMsg, sender: 'bot', timestamp: new Date() }]);
                setActiveButtons([
                    isAr ? 'الدفع نقداً عند الاستلام 💵' : 'Cash on Delivery 💵',
                    isAr ? 'الدفع عبر رابط آمن 🔗' : 'Secure Payment Link 🔗'
                ]);
                setIsWaitingForLocation(false);
                setIsWaitingForPaymentOption(true);
                setIsTyping(false);
                setToast('');
            }, 1500);
            return;
        }

        // Checkout Button Branching (Payment Method)
        if (isWaitingForPaymentOption) {
            setNarratorText(isAr ? 'يعالج النظام خيار الدفع المختار 💳' : 'System processes selected payment method 💳');
            showToast(isAr ? 'معالجة الدفع...' : 'Processing payment...');

            setTimeout(() => {
                let msgText = '';
                if (buttonText.includes('رابط') || buttonText.includes('Link')) {
                    msgText = isAr
                        ? 'ممتاز، تفضل رابط الدفع الآمن الخاص بطلبك:\n🔗 https://pay.elegantoptions.com/checkout\n(بانتظار إتمام العملية...)'
                        : 'Perfect, here is your secure payment link:\n🔗 https://pay.elegantoptions.com/checkout\n(Waiting for transaction...)';
                } else {
                    msgText = isAr 
                        ? 'تم اختيار الدفع نقداً. تم اعتماد طلبك بنجاح وسيصلك بأقرب وقت 🚀.' 
                        : 'Cash selected. Your order is confirmed and will arrive shortly 🚀.';
                }

                setMessages(prev => [...prev, { id: Date.now(), text: msgText, sender: 'bot', timestamp: new Date() }]);
                setIsWaitingForPaymentOption(false);

                // If link, simulate waiting for payment then finish
                if (buttonText.includes('رابط') || buttonText.includes('Link')) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, { id: Date.now() + 1, text: isAr ? 'تم استلام الدفع بنجاح! 🎉 تم اعتماد طلبك! جاري التجهيز وسيصلك في أقرب وقت 🚀.' : 'Payment received successfully! 🎉 Order confirmed! We are preparing it and it will arrive shortly 🚀.', sender: 'bot', timestamp: new Date() }]);
                        setIsTyping(false);
                        setToast('');
                        setTimeout(() => triggerDemoEnded(), 2000);
                    }, 3500);
                } else {
                    // Cash selected -> finish immediately since message was already sent
                    setIsTyping(false);
                    setToast('');
                    setTimeout(() => triggerDemoEnded(), 2000);
                }
            }, 1000);
            return;
        }

        const l10nLocation = isAr ? 'اللوكيشن' : 'L\u200Cocation';
        showToast(buttonText.includes(l10nLocation)
            ? (isAr ? 'جاري العمليات بالخلفية...' : 'Background processing...')
            : (isAr ? `النظام يجهز الاستجابة لـ "${buttonText}"...` : `Preparing response to "${buttonText}"...`));

        setTimeout(() => {
            const response = currentFlow.responses[buttonText];

            if (safeStateTransitionGuard(response)) {
                let msgText = response.text;
                if (typeof msgText === 'function') {
                    msgText = msgText(generateOrderNumber());
                }

                if (response.action === 'wait_for_cs') {
                    // Instead of going to free-text, show the CS sub-menu with 3 choice buttons
                    setIsWaitingForCsMenu(true);
                    setMessages(prev => [...prev, { id: Date.now(), text: isAr
                        ? 'يسعدنا خدمتك. يرجى اختيار سبب التواصل ليتسنى لنا توجيهك للموظف المختص:'
                        : 'Happy to help. Please select the reason for your inquiry so we can route you to the right team:'
                    , sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons(isAr
                        ? ['شكوى ⚠️', 'رسالة استفسار 💬', 'التحدث مع موظف خدمة العملاء 📞']
                        : ['Complaint ⚠️', 'Inquiry 💬', 'Speak to Agent 📞']
                    );
                    if (response.narrator) setNarratorText(response.narrator);
                    setIsTyping(false);
                    setToast('');
                    return;
                }
                else if (response.action === 'wait_for_medical_consult') {
                    // Free-text medical consultation — reuse notesText state with a medicalConsult flag
                    setIsWaitingForNotesText(true);
                    setMessages(prev => [...prev, { id: Date.now(), text: response.text, sender: 'bot', type: 'medical_consult', timestamp: new Date() }]);
                    setActiveButtons([]);
                    if (response.narrator) setNarratorText(response.narrator);
                    setIsTyping(false);
                    setToast('');
                    return;
                }
                else if (response.action === 'wait_for_visa_lead') {
                    setIsWaitingForVisaLead(true);
                    setMessages(prev => [...prev, { id: Date.now(), text: response.text, sender: 'bot', timestamp: new Date() }]);
                    if (response.narrator) setNarratorText(response.narrator);
                    setIsTyping(false);
                    setToast('');
                    return;
                }
                else if (response.action === 'wait_for_visa_upload') {
                    // Show the passport upload button immediately — no text input needed
                    setIsWaitingForVisaUpload(true);
                    setMessages(prev => [...prev, { id: Date.now(), text: response.text, sender: 'bot', timestamp: new Date() }]);
                    setActiveButtons(isAr ? ['رفع صورة الجواز 📸'] : ['Upload Passport 📸']);
                    if (response.narrator) setNarratorText(response.narrator);
                    setIsTyping(false);
                    setToast('');
                    return;
                }
                else if (response.action === 'wait_for_time') setIsWaitingForTime(true);
                else if (response.action === 'wait_for_lead') setIsWaitingForLead(true);
                else if (response.action === 'open_catalog_sheet' || response.action === 'show_ecommerce_catalog' || response.action === 'show_clinic_catalog') {
                    // Only open sheet if it's not a clinic, as clinic prefers the inline doctor view
                    if (niche === 'clinic') {
                        setTimeout(() => {
                            setMessages(prev => [...prev, {
                                id: Date.now() + 1,
                                text: isAr ? 'قائمة الأطباء المتاحين 🩺👇' : 'List of available doctors 🩺👇',
                                sender: 'bot',
                                type: 'catalog',
                                catalogLayout: 'doctors',
                                timestamp: new Date()
                            }]);
                        }, 800);
                    } else {
                        setTimeout(() => setIsCatalogSheetOpen(true), 500);
                    }
                }

                setMessages(prev => [...prev, { id: Date.now(), text: msgText, sender: 'bot', timestamp: new Date() }]);

                if (response.narrator) setNarratorText(response.narrator);

                if (response.end_demo) {
                    setIsTyping(false);
                    setTimeout(() => triggerDemoEnded(), 2000);
                } else {
                    setActiveButtons(response.buttons || []);
                    if (!response.buttons?.length && !response.action && !response.end_demo) {
                        setTimeout(() => triggerDemoEnded(), 2000);
                    } else {
                        setIsTyping(false);
                    }
                }
            } else {
                console.error("Null Guard Triggered! Missing response for:", buttonText, "in niche:", niche);
            }
            setToast('');
        }, 1200);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const bgColors = isMsg ? 'bg-white' : 'bg-[#0b141a]';
    const headerBg = isMsg ? 'bg-white border-b border-gray-200 shadow-sm' : 'bg-[#202c33]';
    const headerText = isMsg ? 'text-black' : 'text-[#e9edef]';
    const headerSubText = isMsg ? 'text-gray-500' : 'text-[#8696a0]';
    const headerIcons = isMsg ? 'text-[#0084ff]' : 'text-[#aebac1]';
    const inputBg = isMsg ? 'bg-white border-t border-gray-200' : 'bg-[#202c33]';
    const inputFieldBg = isMsg ? 'bg-gray-100 text-black placeholder-gray-500' : 'bg-[#2a3942] text-[#d1d7db] placeholder-[#8696a0]';
    const botBubble = isMsg ? 'bg-gray-200 text-black rounded-2xl' : 'bg-[#202c33] text-[#e9edef] rounded-lg rounded-tl-none';
    const userBubble = isMsg ? 'bg-[#0084ff] text-white rounded-2xl' : 'bg-[#005c4b] text-[#e9edef] rounded-lg rounded-tr-none';
    const buttonContainer = isMsg ? 'bg-white' : 'bg-[#0b141a]';
    const actionButton = isMsg ? 'bg-gray-100 border border-gray-200 text-[#0084ff] hover:bg-gray-200 rounded-xl cursor-pointer pointer-events-auto z-10' : 'bg-[#202c33] text-[#00a884] active:bg-[#182229] rounded-lg cursor-pointer pointer-events-auto z-10';

    return (
        <div className="w-full h-full bg-[#0A0A0A] flex flex-col relative overflow-hidden font-cairo">

            {/* Narrator Top Banner */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={narratorText}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-[115px] left-0 right-0 z-20 flex justify-center pointer-events-none"
                >
                    <div className="bg-cyan-950/90 border border-cyan-500/50 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_4px_20px_-5px_cyan] flex items-center gap-2 max-w-[90%] pointer-events-auto" dir="rtl">
                        <Info size={16} className="text-cyan-400 flex-shrink-0 animate-pulse" />
                        <span className="text-cyan-50 text-xs md:text-sm font-medium">{narratorText}</span>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Chat Header */}
            <div className={`${headerBg} px-4 pt-10 pb-3 flex items-center justify-between z-10 shrink-0 relative`} dir="rtl">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className={`${headerIcons} hover:opacity-80 transition-opacity p-1.5 rounded-full hover:bg-white/5`}>
                        <ArrowRight size={20} />
                    </button>
                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-600/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <img src="/logo.png" alt="Bot" className="w-full h-full object-cover bg-[#050505] p-1" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                        <Bot className={`${headerIcons} hidden`} size={24} />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                            <h3 className={`font-semibold ${headerText} text-[15px] leading-tight truncate max-w-[130px]`}>{projectName}</h3>
                            <svg viewBox="0 0 24 24" width="16" height="16" className={`${isAr ? 'ml-0.5' : 'mr-0.5'}`}>
                                <path fill="#25D366" d="M12 22a.995.995 0 0 1-.707-.293l-1.636-1.636-2.288.169a1 1 0 0 1-1.05-.826l-.32-2.269-1.921-1.258a1 1 0 0 1-.35-1.254L4.855 12.5l-1.127-2.133a1 1 0 0 1 .35-1.254l1.921-1.258.32-2.269a1 1 0 0 1 1.05-.826l2.288.169 1.636-1.636A1 1 0 0 1 12 2a.995.995 0 0 1 .707.293l1.636 1.636 2.288-.169a1 1 0 0 1 1.05.826l.32 2.269 1.921 1.258a1 1 0 0 1 .35 1.254l-1.127 2.133 1.127 2.133a1 1 0 0 1-.35 1.254l-1.921 1.258-.32 2.269a1 1 0 0 1-1.05.826l-2.288-.169-1.636 1.636A.995.995 0 0 1 12 22z" />
                                <path fill="#ffffff" d="M10.828 15.828a1 1 0 0 1-.707-.293l-2.828-2.829 1.414-1.414L10.828 13.414l5.657-5.657 1.414 1.415-6.364 6.364a1 1 0 0 1-.707.292z" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse shadow-[0_0_5px_rgba(37,211,102,0.8)]" />
                            <span className={`text-[11px] ${headerSubText}`}>{isAr ? 'مساعد واتساب الذكي' : 'WhatsApp AI Agent'}</span>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-3 ${headerIcons}`}>
                    {catalogNiches.includes(niche) && !isDemoEnded && (
                        <button
                            onClick={() => setIsCatalogSheetOpen(true)}
                            className="flex items-center gap-1.5 bg-cyan-900/40 hover:bg-cyan-700/50 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold px-3 py-1.5 rounded-full transition-all"
                        >
                            🛒 {isAr ? 'فتح المنيو' : 'View Catalog'}
                        </button>
                    )}
                    <Video size={22} className="cursor-pointer hover:text-cyan-400 transition-colors" />
                    <Phone size={19} className="cursor-pointer hover:text-cyan-400 transition-colors" />
                    {!isInsta && <MoreVertical size={20} className="cursor-pointer hover:text-cyan-400 transition-colors" />}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 min-h-0 overflow-hidden relative w-full h-full flex flex-col ${bgColors}`} dir="rtl">
                {!isInsta && (
                    <div
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{
                            opacity: 0.06,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='%23a0b5a0' opacity='0.7'%3E%3Ccircle cx='10' cy='10' r='3'/%3E%3Ccircle cx='40' cy='10' r='2'/%3E%3Ccircle cx='70' cy='10' r='3'/%3E%3Ccircle cx='25' cy='30' r='2'/%3E%3Ccircle cx='55' cy='30' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='70' cy='50' r='2'/%3E%3Ccircle cx='40' cy='70' r='3'/%3E%3Cpath d='M5 18 Q10 14 15 18' stroke='%23a0b5a0' stroke-width='1.2' fill='none'/%3E%3Cpath d='M35 15 Q40 11 45 15' stroke='%23a0b5a0' stroke-width='1.2' fill='none'/%3E%3Cpath d='M65 18 Q70 14 75 18' stroke='%23a0b5a0' stroke-width='1.2' fill='none'/%3E%3Crect x='20' y='42' width='10' height='7' rx='2' fill='none' stroke='%23a0b5a0' stroke-width='1'/%3E%3Ccircle cx='25' cy='45' r='1.5' fill='%23a0b5a0'/%3E%3Cpath d='M58 40 L62 40 L62 48 L58 48 Z' fill='none' stroke='%23a0b5a0' stroke-width='1'/%3E%3Cpath d='M60 38 L60 40' stroke='%23a0b5a0' stroke-width='1'/%3E%3Cpath d='M57 44 L63 44' stroke='%23a0b5a0' stroke-width='0.8'/%3E%3Ccircle cx='40' cy='40' r='6' fill='none' stroke='%23a0b5a0' stroke-width='1'/%3E%3Cpath d='M40 37 L40 40 L43 40' stroke='%23a0b5a0' stroke-width='1' fill='none'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '80px 80px',
                            backgroundRepeat: 'repeat',
                        }}
                    />
                )}

                <div className={`flex-1 overflow-y-auto w-full flex flex-col space-y-3 z-10 px-4 pb-6 pt-4 scroll-smooth`}>
                    <div className="flex justify-center mb-4">
                        <span className={`${isInsta ? 'text-slate-500 text-xs' : 'bg-[#182229] text-[#8696a0] text-xs px-3 py-1.5 rounded-lg shadow-sm'}`}>
                            {formatTime(new Date())}
                        </span>
                    </div>

                    <AnimatePresence>
                        {messages.map((msg, index) => {
                            const showTail = index === 0 || messages[index - 1].sender !== msg.sender;

                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className={`flex w-full ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} group items-end gap-2`}
                                >
                                    <div className={`relative max-w-[85%] px-3.5 py-2.5 text-[15px] leading-relaxed shadow-sm break-words ${msg.sender === 'user' ? `${userBubble} ml-auto` : `${botBubble} mr-auto`
                                        } ${!showTail ? (msg.sender === 'user' ? 'rounded-tr-lg mr-2' : 'rounded-tl-lg ml-2') : ''}`}>
                                        {showTail && (
                                            <span className={`absolute top-0 w-2 h-3 overflow-hidden ${msg.sender === 'user' ? '-right-2' : '-left-2'}`}>
                                                <svg viewBox="0 0 8 13" width="8" height="13" className={msg.sender === 'user' ? "text-[#005c4b]" : "text-[#202c33]"}>
                                                    <path opacity=".13" fill="#0000000" d="M1.533 3.118L8 2.01.866.15C.31.062 0 .476 0 .991v1.65l1.533.477z" />
                                                    <path fill="currentColor" d={msg.sender === 'user' ? "M0 0h8v13L0 0z" : "M8 0H0v13L8 0z"} />
                                                </svg>
                                            </span>
                                        )}

                                        <div className="whitespace-pre-wrap">{msg.text}</div>

                                        {msg.type === 'catalog' && msg.catalogLayout === 'doctors' && (
                                            <div className="flex gap-3 mt-3 pb-2 overflow-x-auto custom-scrollbar snap-x snap-mandatory" style={{ width: 'calc(100vw - 80px)', maxWidth: '280px' }}>
                                                {[
                                                    { id: 1, name: isAr ? 'د. أحمد' : 'Dr. Ahmed', detail: isAr ? 'استشاري باطنية' : 'Internal Med', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
                                                    { id: 2, name: isAr ? 'د. سارة' : 'Dr. Sarah', detail: isAr ? 'أخصائية تجميل' : 'Dermatologist', img: 'https://images.unsplash.com/photo-1594824436998-058a231bc472?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
                                                    { id: 3, name: isAr ? 'د. فهد' : 'Dr. Fahad', detail: isAr ? 'طب أسنان' : 'Dentist', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
                                                ]?.map((item) => (
                                                    <div key={item.id} className="min-w-[150px] bg-black/40 border border-white/10 rounded-xl overflow-hidden flex flex-col snap-start flex-shrink-0 shadow-lg">
                                                        <img src={item.img} alt={item.name} className="w-full h-24 object-cover object-top" />
                                                        <div className="p-2 flex flex-col gap-1">
                                                            <span className="text-white text-sm font-bold truncate">{item.name}</span>
                                                            <span className="text-slate-400 text-[10px] font-medium max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{item.detail}</span>
                                                            <button
                                                                onClick={() => handleCatalogSelect(item.name, item.detail, true)}
                                                                className="mt-1 w-full bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold py-1.5 rounded-lg transition-colors border-none"
                                                            >
                                                                {isAr ? 'احجز الموعد 📅' : 'Book Session 📅'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {msg.type === 'disclaimer_cta' && (
                                            <div className="mt-3 w-full">
                                                <button
                                                    onClick={() => {
                                                        const userNiche = isAr ? 
                                                            {restaurant: 'مطعم / كافيه', clinic: 'عيادة / مركز طبي', ecommerce: 'متجر إلكتروني', retail: 'محل تجاري', travel: 'مكتب سفريات', consulting: 'استشارات وتدريب', services: 'بيع الخدمات', realestate: 'مكتب عقاري'}[niche] || niche 
                                                            : 
                                                            {restaurant: 'Restaurant / Cafe', clinic: 'Clinic / Medical', ecommerce: 'E-commerce', retail: 'Retail Store', travel: 'Travel Agency', consulting: 'Consulting & Training', services: 'Services', realestate: 'Real Estate'}[niche] || niche;
                                                        const btnText = isAr 
                                                            ? `مرحبًا، شاهدت المحاكي وأريد تصميم أتمتة خاصة لمشروعي.\nالنشاط: ${userNiche}`
                                                            : `Hello, I watched the demo and I want a custom automation for my business.\nBusiness Type: ${userNiche}`;
                                                        window.open(`https://wa.me/96566305551?text=${encodeURIComponent(btnText)}`, '_blank');
                                                    }}
                                                    className={`w-full bg-[#00a884] hover:bg-[#008f6f] text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 ${isAr ? 'text-[13px]' : 'text-[12px]'} mt-1 mb-1`}
                                                >
                                                    {isAr ? 'تواصل معنا الآن 💬' : 'Chat With Us Now 💬'}
                                                </button>
                                            </div>
                                        )}

                                        {msg.type !== 'catalog' && (
                                            <div className="flex items-center justify-end gap-1 mt-1 -mb-1 float-right clear-both">
                                                <span className="text-[11px] text-white/50">{formatTime(msg.timestamp)}</span>
                                                {msg.sender === 'user' && <CheckCheck size={15} className="text-[#53bdeb]" />}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex w-full justify-end items-end gap-2"
                            >
                                {isInsta && (
                                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden mb-1 border border-slate-700">
                                        <img src="/logo.png" className="w-full h-full object-cover p-1 bg-black" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                                        <Bot className="text-slate-400 hidden" size={16} />
                                    </div>
                                )}
                                <div className={`${botBubble} px-4 py-4 relative mr-auto flex items-center justify-center gap-1.5 shadow-sm w-[4.5rem]`}>
                                    {!isInsta && (
                                        <span className="absolute top-0 -left-2 text-[#202c33]">
                                            <svg viewBox="0 0 8 13" width="8" height="13"><path fill="currentColor" d="M8 0H0v13L8 0z" /></svg>
                                        </span>
                                    )}
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className={`w-1.5 h-1.5 rounded-full ${isInsta ? 'bg-slate-400' : 'bg-[#8696a0]'}`} />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className={`w-1.5 h-1.5 rounded-full ${isInsta ? 'bg-slate-400' : 'bg-[#8696a0]'}`} />
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className={`w-1.5 h-1.5 rounded-full ${isInsta ? 'bg-slate-400' : 'bg-[#8696a0]'}`} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -10, x: '-50%' }}
                        className={`absolute top-40 left-1/2 bg-[#182229]/90 border-[#222d34] text-slate-300 text-xs py-2 px-4 rounded-lg border shadow-md z-20 flex items-center gap-2 max-w-[80%] whitespace-nowrap overflow-hidden text-ellipsis`}
                    >
                        <Loader2 size={12} className={`animate-spin text-[#00a884]`} />
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {activeButtons.length > 0 && !isTyping && !isDemoEnded && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex flex-col ${buttonContainer} z-10 w-full px-4 pt-1 pb-3 gap-1 overflow-x-hidden relative`}
                        dir="rtl"
                    >
                        {(activeButtons || []).map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleButtonClick(btn)}
                                className={`w-full font-medium py-3 px-4 text-[14px] transition-colors flex items-center justify-center ${actionButton} ${btn === 'نرد للرئيسية' ? 'text-red-400 hover:text-red-300 border-none' : ''} ${btn === 'تواصل معنا للأسعار' ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 font-bold' : ''}`}
                            >
                                {btn}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`${inputBg} px-2 py-3 flex items-end gap-2 z-10 transition-opacity ${isDemoEnded ? 'opacity-50 pointer-events-none' : ''}`} dir="rtl">
                <button className={`p-2 ${headerIcons} hover:opacity-80 flex-shrink-0 mb-0.5`}>
                    <Smile size={24} />
                </button>
                <button className={`p-2 ${headerIcons} hover:opacity-80 flex-shrink-0 mb-0.5 -mr-1`}>
                    <Paperclip size={24} />
                </button>

                <form onSubmit={handleSendText} className="flex-1 flex items-end ml-1 w-full">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={(isWaitingForCs || isWaitingForTime || isWaitingForLead) ? (isAr ? "اكتب رسالتك..." : "Type your message...") : (isAr ? "اكتب رسالة" : "Type a message")}
                        className={`w-full ${inputFieldBg} rounded-full px-4 py-[9px] outline-none text-[15px] mr-1`}
                        disabled={isDemoEnded}
                    />
                </form>

                <button
                    onClick={inputText.trim() ? handleSendText : undefined}
                    className={`p-2 ${headerIcons} hover:opacity-80 flex-shrink-0 mb-0.5`}
                    disabled={isDemoEnded}
                >
                    {inputText.trim() ? (
                        <Send size={24} className={`rtl:rotate-180 text-[#00a884]`} />
                    ) : (
                        <Mic size={24} />
                    )}
                </button>
            </div>

            {isDemoEnded && (
                <motion.div
                    ref={demoEndedCardRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full bg-[#0a0f1a]/95 backdrop-blur-md border border-cyan-900/30 p-4 z-10 flex flex-col gap-3 shadow-[0_-6px_30px_rgba(6,182,212,0.15)]"
                    dir={isAr ? "rtl" : "ltr"}
                >
                    {/* Step 1 — Main CTA */}
                    {ctaInterestStep === 'question' && (
                        <>
                            <div className="text-center px-1">
                                <p className="text-white text-[14px] font-bold leading-snug mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                    {isAr ? '🚀 حوّل نشاطك التجاري بأتمتة واتساب ذكية — ابدأ الآن!' : '🚀 Transform your business with smart WhatsApp automation!'}
                                </p>
                                <p className="text-slate-300 text-[11px] mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                    {isAr ? '✨ سيتم تصميم أتمتتك كاملًا لمشروعك أنت' : '✨ Your automation will be fully built just for your business'}
                                </p>
                            </div>
                            <motion.button
                                onClick={() => generateWaLink()}
                                animate={{
                                    boxShadow: [
                                        '0 0 15px rgba(6,182,212,0.4), 0 0 30px rgba(37,99,235,0.2)',
                                        '0 0 35px rgba(6,182,212,0.8), 0 0 60px rgba(37,99,235,0.5)',
                                        '0 0 15px rgba(6,182,212,0.4), 0 0 30px rgba(37,99,235,0.2)',
                                    ]
                                }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative w-full py-4 px-4 rounded-2xl overflow-hidden text-white border border-cyan-400/30 flex flex-col items-center gap-1"
                                style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #06b6d4 100%)' }}
                            >
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ repeat: Infinity, duration: 2.8, ease: 'linear', repeatDelay: 0.8 }}
                                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                                />
                                <span className="relative z-10 text-[14px] font-extrabold tracking-wide" style={{ fontFamily: 'Cairo, sans-serif', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                                    {isAr ? 'أريد أتمتة لنشاطي 🔥' : 'Automate My Business 🔥'}
                                </span>
                                <span className="relative z-10 text-[11px] text-cyan-100/90 font-medium">
                                    {isAr ? 'راسلنا واحجز خصمًا يتجاوز 70%' : 'Message us & get over 70% OFF'}
                                </span>
                            </motion.button>
                            <button
                                onClick={() => setCtaInterestStep('no')}
                                className="w-full bg-white/5 hover:bg-white/10 text-slate-400 font-medium py-2 px-4 rounded-xl transition-all text-[12px] border border-white/5"
                            >
                                {isAr ? 'لا شكرًا' : 'No Thanks'}
                            </button>
                        </>
                    )}

                    {/* Step 2 — No Thanks: FOMO urgency */}
                    {ctaInterestStep === 'no' && (
                        <>
                            <div className="text-center px-1 py-1">
                                <p className="text-amber-300 text-[14px] font-extrabold leading-snug mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                    {isAr ? '⏳ لا تفوّت الفرصة — العرض محدود!' : "⏳ Don't miss out — Limited offer!"}
                                </p>
                                <p className="text-slate-200 text-[12px] font-medium leading-relaxed mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                                    {isAr
                                        ? 'احصل على تجربة مجانية كاملة + خصم يتجاوز 70% عند الاشتراك اليوم 🔥'
                                        : 'Get a full free trial + over 70% OFF when you subscribe today 🔥'}
                                </p>
                            </div>
                            <motion.button
                                onClick={() => generateWaLink()}
                                animate={{
                                    boxShadow: [
                                        '0 0 12px rgba(251,191,36,0.3)',
                                        '0 0 28px rgba(251,191,36,0.7)',
                                        '0 0 12px rgba(251,191,36,0.3)',
                                    ]
                                }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative w-full py-4 px-4 rounded-2xl overflow-hidden text-white font-extrabold text-[14px] border border-amber-400/40 flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', fontFamily: 'Cairo, sans-serif' }}
                            >
                                <motion.div
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
                                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                                />
                                <span className="relative z-10">{isAr ? '✨ أريد أتمتة لنشاطي' : '✨ Automate My Business'}</span>
                            </motion.button>
                            <button
                                onClick={onBack}
                                className="w-full bg-white/5 hover:bg-white/10 text-slate-300 font-medium py-2.5 px-4 rounded-xl transition-all text-[12px] flex items-center justify-center gap-2 border border-white/5"
                                style={{ fontFamily: 'Cairo, sans-serif' }}
                            >
                                {isAr ? '🔄 إعادة تجربة المحاكي' : '🔄 Try the Demo Again'}
                            </button>
                        </>
                    )}
                </motion.div>
            )
            }

            <CatalogFlowSheet
                isOpen={isCatalogSheetOpen}
                onClose={() => setIsCatalogSheetOpen(false)}
                onSubmit={handleSheetSubmit}
                lang={lang}
                niche={niche}
            />
        </div >
    );
};

export default function ChatSimulator(props) {
    return (
        <ErrorBoundary>
            <ChatSimulatorInner {...props} />
        </ErrorBoundary>
    );
}
