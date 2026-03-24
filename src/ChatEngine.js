export const getFlows = (projectName, goals = [], lang = 'ar') => {
    // Determine dynamic primary action string
    const getWaitAction = () => goals.includes('lead_gen') ? 'wait_for_lead' : 'wait_for_cs';

    const isAr = lang === 'ar';

    // Realistic Greeting Injectors (No Meta-Talk)
    let greetingExtra = '';
    if (goals.includes('delayed_replies')) {
        greetingExtra = ''; // Basic greeting is already fast and responsive
    } else if (goals.includes('appointments')) {
        greetingExtra = isAr ? 'يسعدنا مساعدتك في ترتيب وحجز مواعيدك بكل سهولة.\n\n' : 'We are happy to help you organize and book your appointments easily.\n\n';
    } else if (goals.includes('lost_sales')) {
        greetingExtra = isAr ? 'نحن هنا لاستقبال وتجهيز طلباتك في أي وقت.\n\n' : 'We are here to receive and process your orders anytime.\n\n';
    } else if (goals.includes('faq')) {
        greetingExtra = isAr ? 'جميع المعلومات التي تحتاجها متوفرة للإجابة على استفساراتك.\n\n' : 'All the information you need is available to answer your inquiries.\n\n';
    } else if (goals.includes('lead_gen')) {
        greetingExtra = isAr ? 'يسعدنا تواصلك لتقديم أفضل خدمة تناسب تطلعاتك.\n\n' : 'We are glad you contacted us to provide the best service for your needs.\n\n';
    }

    const baseFlows = {
        restaurant: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} 🍔.` : `Hello and welcome to ${projectName} 🍔.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['طلبات الطعام 🍔', 'تتبع حالة الطلب 🛵', 'التواصل مع خدمة العملاء 📞'] : ['Order Menu 🍔', 'Track Order 🛵', 'Support 📞'],
            responses: isAr ? {
                'طلبات الطعام 🍔': { action: 'open_catalog_sheet', text: 'بكل سرور! جاري عرض قائمة الطعام والمشروبات 👇', buttons: [], narrator: 'فتح المنيو 🛒' },
                'تتبع حالة الطلب 🛵': { action: 'wait_for_lead', text: 'يرجى تزويدنا برقم الهاتف المسجل للتحقق من حالة الطلب 📋', buttons: [], narrator: 'تتتبع طلب 📦' },
                'التواصل مع خدمة العملاء 📞': { action: 'wait_for_cs', text: 'تفضلوا بكتابة رسالتكم، وسيقوم أحد ممثلينا بالرد فوراً 📝', buttons: [], narrator: 'خدمة عملاء 📝' },
            } : {
                'Order Menu 🍔': { action: 'open_catalog_sheet', text: 'Opening menu now 👇', buttons: [], narrator: 'Opens menu 🛒' },
                'Track Order 🛵': { action: 'wait_for_lead', text: 'Please enter your phone number to track 📋', buttons: [], narrator: 'Tracking 📦' },
                'Support 📞': { action: 'wait_for_cs', text: 'Write your message and we will reply 📝', buttons: [], narrator: 'Support route 📝' },
            }
        },
        ecommerce: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} 🛍️.` : `Hello and welcome to ${projectName} 🛍️.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['تصفح المنتجات 🛍️', 'تتبع الشحنة 📦', 'خدمة العملاء 💬'] : ['Browse 🛍️', 'Track 📦', 'Customer Service 💬'],
            responses: isAr ? {
                'تصفح المنتجات 🛍️': { action: 'show_ecommerce_catalog', text: 'تفضل الكتالوج السريع لمنتجاتنا 👇', buttons: [], narrator: 'يعرض المنتجات 🛍️' },
                'تتبع الشحنة 📦': { action: 'wait_for_lead', text: 'أرسل رقم الطلب أو الجوال 📋', buttons: [], narrator: 'تتتبع طلب 📦' },
                'خدمة العملاء 💬': { action: 'wait_for_cs', text: 'اكتب استفسارك ومعاك خبيرنا فوراً 📝', buttons: [], narrator: 'خدمة العملاء 👨‍💻' }
            } : {
                'Browse 🛍️': { action: 'show_ecommerce_catalog', text: 'Here is our fast catalog 👇', buttons: [], narrator: 'Shows products 🛍️' },
                'Track 📦': { action: 'wait_for_lead', text: 'Send order or phone number 📋', buttons: [], narrator: 'Tracking 📦' },
                'Customer Service 💬': { action: 'wait_for_cs', text: 'Write your inquiry here 📝', buttons: [], narrator: 'Customer Service 👨‍💻' }
            }
        },
        clinic: {
            greeting1: isAr ? `أهلاً ومرحباً بك في عيادات ${projectName} 🩺.` : `Hello and welcome to ${projectName} 🩺.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['حجز موعد 📅', 'استشارة طبية 💬', 'خدمة العملاء 📞'] : ['Book 📅', 'Medical Consultation 💬', 'Customer Service 📞'],
            responses: isAr ? {
                'حجز موعد 📅': { text: 'يرجى اختيار القسم الطبي المطلوب:', buttons: ['الطب العام والباطنية', 'طب وجراحة الأسنان', 'الجلدية والتجميل'], narrator: 'تحديد القسم 🩺' },
                'الطب العام والباطنية': { action: 'show_clinic_catalog', text: 'تفضلوا باختيار الطبيب المناسب من القائمة 👇:', buttons: [], narrator: 'قائمة الأطباء 👨‍⚕️' },
                'طب وجراحة الأسنان': { action: 'show_clinic_catalog', text: 'تفضلوا باختيار الطبيب المناسب من القائمة 👇:', buttons: [], narrator: 'قائمة الأطباء 👨‍⚕️' },
                'الجلدية والتجميل': { action: 'show_clinic_catalog', text: 'تفضلوا باختيار الطبيب المناسب من القائمة 👇:', buttons: [], narrator: 'قائمة الأطباء 👨‍⚕️' },
                'استشارة طبية 💬': { text: 'يرجى اختيار التخصص الطبي المطلوب:', buttons: ['🫀 القلب والأوعية الدموية', '🧠 الأعصاب', '🦴 العظام والمفاصل', '👶 طب الأطفال', '🦷 الأسنان', '👁️ العيون', '🩺 الباطنية والعموم'], narrator: 'اختيار التخصص 🏥' },
                '🫀 القلب والأوعية الدموية': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'قسم القلب 🫀' },
                '🧠 الأعصاب': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'قسم الأعصاب 🧠' },
                '🦴 العظام والمفاصل': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'قسم العظام 🦴' },
                '👶 طب الأطفال': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'قسم الأطفال 👶' },
                '🦷 الأسنان': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'قسم الأسنان 🦷' },
                '👁️ العيون': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'قسم العيون 👁️' },
                '🩺 الباطنية والعموم': { action: 'wait_for_medical_consult', text: 'تفضّل، اكتب استشارتك الطبية وسنوجّهها للدكتور المختص 💻', buttons: [], narrator: 'الباطنية 🩺' },
                'خدمة العملاء 📞': { action: 'wait_for_cs', text: 'أهلاً بكم، كيف يمكننا مساعدتكم؟ 📝', buttons: [], narrator: 'خدمة العملاء 👨‍⚕️' }
            } : {
                'Book 📅': { text: 'Select department:', buttons: ['General Med', 'Dental', 'Dermatology'], narrator: 'Department 🩺' },
                'General Med': { action: 'show_clinic_catalog', text: 'Choose from doctors 👇:', buttons: [], narrator: 'Doctors 👨‍⚕️' },
                'Dental': { action: 'show_clinic_catalog', text: 'Choose from doctors 👇:', buttons: [], narrator: 'Doctors 👨‍⚕️' },
                'Dermatology': { action: 'show_clinic_catalog', text: 'Choose from doctors 👇:', buttons: [], narrator: 'Doctors 👨‍⚕️' },
                'Medical Consultation 💬': { text: 'Select your medical specialty:', buttons: ['🫀 Cardiology', '🧠 Neurology', '🦴 Orthopedics', '👶 Pediatrics', '🦷 Dentistry', '👁️ Ophthalmology', '🩺 General Medicine'], narrator: 'Specialty Selection 🏥' },
                '🫀 Cardiology': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'Cardiology 🫀' },
                '🧠 Neurology': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'Neurology 🧠' },
                '🦴 Orthopedics': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'Orthopedics 🦴' },
                '👶 Pediatrics': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'Pediatrics 👶' },
                '🦷 Dentistry': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'Dentistry 🦷' },
                '👁️ Ophthalmology': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'Ophthalmology 👁️' },
                '🩺 General Medicine': { action: 'wait_for_medical_consult', text: "Please write your medical consultation and we'll forward it to the specialist 💻", buttons: [], narrator: 'General Medicine 🩺' },
                'Customer Service 📞': { action: 'wait_for_cs', text: 'How can we help you today? 📝', buttons: [], narrator: 'Customer Service 👨‍⚕️' }
            }
        },
        retail: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} 🛍️.` : `Hello and welcome to ${projectName} 🛍️.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['تصفح المنتجات 🛍️', 'تتبع حالة الشحنة 📦', 'خدمة العملاء 💬'] : ['Browse 🛍️', 'Track 📦', 'Customer Service 💬'],
            responses: isAr ? {
                'تصفح المنتجات 🛍️': { action: 'show_ecommerce_catalog', text: 'بكل سرور، الكتالوج متوفر هنا 👇', buttons: [], narrator: 'يعرض المنتجات 🛍️' },
                'تتبع حالة الشحنة 📦': { action: 'wait_for_lead', text: 'يرجى تزويدنا برقم الطلب للتحقق من حالة الشحنة 📋', buttons: [], narrator: 'التحقق من حالة الطلب 📦' },
                'خدمة العملاء 💬': { action: 'wait_for_cs', text: 'تفضلوا بطرح استفساركم وسنقوم بالرد فوراً 📝', buttons: [], narrator: 'تحويل للموظف 👨‍💻' }
            } : {
                'Browse 🛍️': { action: 'show_ecommerce_catalog', text: 'Catalog available here 👇', buttons: [], narrator: 'Shows products 🛍️' },
                'Track 📦': { action: 'wait_for_lead', text: 'Send order or phone 📋', buttons: [], narrator: 'Tracking 📦' },
                'Customer Service 💬': { action: 'wait_for_cs', text: 'Write your inquiry here 📝', buttons: [], narrator: 'Customer Service 👨‍💻' }
            }
        },
        consulting: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} 💡.` : `Hello and welcome to ${projectName} 💡.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['تحديد موعد استشارة 📅', 'دليل البرامج 📚', 'استفسار عام 💬'] : ['Book 📅', 'Programs 📚', 'Inquiry 💬'],
            responses: isAr ? {
                'تحديد موعد استشارة 📅': { text: 'يرجى اختيار المجال الإستشاري المطلوب:', buttons: ['الاستشارات الإدارية', 'الاستشارات المالية', 'الاستشارات الشخصية'], narrator: 'يحدد المجال 🎯' },
                'الاستشارات الإدارية': { action: 'wait_for_time', text: 'يرجى تزويدنا بالوقت والتاريخ المناسبين لكم 🕒:', buttons: [], narrator: 'يطلب الوقت 🕒' },
                'الاستشارات المالية': { action: 'wait_for_time', text: 'يرجى تزويدنا بالوقت والتاريخ المناسبين لكم 🕒:', buttons: [], narrator: 'يطلب الوقت 🕒' },
                'الاستشارات الشخصية': { action: 'wait_for_time', text: 'يرجى تزويدنا بالوقت والتاريخ المناسبين لكم 🕒:', buttons: [], narrator: 'يطلب الوقت 🕒' },
                'دليل البرامج 📚': { text: 'هل ترغبون في إرسال دليل البرامج الشامل إليكم؟', buttons: ['نعم، أرسل الدليل 📥', 'لدي استفسار 💬'], narrator: 'يعرض الدليل 📚' },
                'نعم، أرسل الدليل 📥': { text: 'بكل سرور! 📄 هل ترغبون أيضاً في حجز مقعدكم؟', buttons: ['تحديد موعد استشارة 📅', 'استفسار عام 💬'], narrator: 'يتم الإرسال 📥' },
                'استفسار عام 💬': { action: 'wait_for_cs', text: 'تفضلوا بكتابة استفساركم وسيجيبكم المستشار المالي 📝', buttons: [], narrator: 'التحويل للمستشار 👨‍💻' },
                'لدي استفسار 💬': { action: 'wait_for_cs', text: 'تفضلوا بكتابة استفساركم وسيجيبكم المستشار المالي 📝', buttons: [], narrator: 'التحويل للمستشار 👨‍💻' }
            } : {
                'Book 📅': { text: 'Select field:', buttons: ['Management', 'Financial', 'Personal'], narrator: 'Consultation field 🎯' },
                'Management': { action: 'wait_for_time', text: 'Enter suitable time 🕒:', buttons: [], narrator: 'Time 🕒' },
                'Financial': { action: 'wait_for_time', text: 'Enter suitable time 🕒:', buttons: [], narrator: 'Time 🕒' },
                'Personal': { action: 'wait_for_time', text: 'Enter suitable time 🕒:', buttons: [], narrator: 'Time 🕒' },
                'Programs 📚': { text: 'Send program guide?', buttons: ['Yes 📥', 'Inquiry 💬'], narrator: 'Presents guide 📚' },
                'Yes 📥': { text: 'Sent! 📄 Ready to book?', buttons: ['Book 📅', 'Inquiry 💬'], narrator: 'Sends 📥' },
                'Inquiry 💬': { action: 'wait_for_cs', text: 'Type your question 📝', buttons: [], narrator: 'Consultant 👨‍💻' }
            }
        },
        travel: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} ✈️.` : `Hello and welcome to ${projectName} ✈️.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['عروض السفر ✈️', 'إصدار تأشيرة 🛂', 'التواصل مع الدعم الفني 📞'] : ['Offers ✈️', 'Visa 🛂', 'Support 📞'],
            responses: isAr ? {
                'عروض السفر ✈️': { action: 'show_ecommerce_catalog', text: 'بكل سرور، إليكم أحدث الباقات الترويجية للسفر 👇', buttons: [], narrator: 'يعرض الكتالوج 🌟' },
                'إصدار تأشيرة 🛂': { action: 'wait_for_visa_upload', text: 'بكل سرور. لإصدار تأشيرتك، يرجى رفع صورة واضحة من جواز سفرك ساري المفعول 📸.', buttons: ['رفع صورة الجواز 📸'], narrator: 'رفع جواز السفر 🛂' },
                'التواصل مع الدعم الفني 📞': { action: 'wait_for_cs', text: 'تفضلوا بكتابة استفساركم بشأن الحجز، وموظفونا جاهزون لخدمتكم 📝', buttons: [], narrator: 'قسم الدعم 👨‍💻' }
            } : {
                'Offers ✈️': { action: 'show_ecommerce_catalog', text: 'Here are our latest travel packages 👇', buttons: [], narrator: 'Travel catalog 🌟' },
                'Visa 🛂': { action: 'wait_for_visa_upload', text: 'With pleasure. To process your visa, please upload a clear photo of your valid passport 📸.', buttons: ['Upload Passport 📸'], narrator: 'Passport Upload 🛂' },
                'Support 📞': { action: 'wait_for_cs', text: 'Write your inquiry and our team will respond promptly 📝', buttons: [], narrator: 'Support 👨‍💻' }
            }
        },
        services: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} 🚀.` : `Hello and welcome to ${projectName} 🚀.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['باقات الخدمات 💼', 'طلب تسعيرة 📄', 'التواصل مع خدمة العملاء 💬'] : ['Packages 💼', 'Quote 📄', 'Customer Service 💬'],
            responses: isAr ? {
                'باقات الخدمات 💼': { action: 'show_ecommerce_catalog', text: 'إليكم عرض مفصل لباقات خدماتنا 👇', buttons: [], narrator: 'يعرض الباقات 💼' },
                'طلب تسعيرة 📄': { action: 'wait_for_lead', text: 'لتقديم أفضل تسعيرة، يرجى تزويدنا بالبريد الإلكتروني ورقم الهاتف 📋', buttons: [], narrator: 'طلب تسعيرة 📄' },
                'التواصل مع خدمة العملاء 💬': { action: 'wait_for_cs', text: 'يرجى كتابة استفساركم هنا، وسيرافقكم أفضل خبرائنا قريباً 📝', buttons: [], narrator: 'تحويل للمستشار 👨‍💻' }
            } : {
                'Packages 💼': { action: 'show_ecommerce_catalog', text: 'Here is our packages catalog 👇', buttons: [], narrator: 'Packages 💼' },
                'Quote 📄': { action: 'wait_for_lead', text: 'For quote, send email & phone 📋', buttons: [], narrator: 'Quote 📄' },
                'Customer Service 💬': { action: 'wait_for_cs', text: 'Write your inquiry 📝', buttons: [], narrator: 'Customer Service 👨‍💻' }
            }
        },
        realestate: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} 🏢.` : `Hello and welcome to ${projectName} 🏢.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['استعراض العقارات 🏡', 'عرض عقار للبيع 📄', 'التواصل مع خدمة العملاء 📞'] : ['Properties 🏡', 'List Property', 'Support 📞'],
            responses: isAr ? {
                'استعراض العقارات 🏡': { action: 'show_ecommerce_catalog', text: 'بكل سرور، إليكم قائمة العقارات المتاحة حالياً 👇', buttons: [], narrator: 'العقارات 🏢' },
                'عرض عقار للبيع 📄': { action: 'wait_for_lead', text: 'نسعد بتسويق عقاركم. يرجى تزويدنا برقم التواصل المباشر 📋', buttons: [], narrator: 'بيانات البائع 📋' },
                'التواصل مع خدمة العملاء 📞': { action: 'wait_for_cs', text: 'تفضلوا بكتابة استفساركم وسنقوم بالرد عليكم فوراً 📝', buttons: [], narrator: 'توجيه للعملاء 👨‍💻' }
            } : {
                'Properties 🏡': { action: 'show_ecommerce_catalog', text: 'Here are available properties 👇', buttons: [], narrator: 'Properties 🏢' },
                'List Property': { action: 'wait_for_lead', text: 'Provide number to list property 📋', buttons: [], narrator: 'Seller data 📋' },
                'Support 📞': { action: 'wait_for_cs', text: 'Leave your query 📝', buttons: [], narrator: 'Support route 👨‍💻' }
            }
        },
        other: {
            greeting1: isAr ? `أهلاً ومرحباً بك في ${projectName} ✨.` : `Hello and welcome to ${projectName} ✨.`,
            greeting2: isAr ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?',
            buttons: isAr ? ['استعراض الخدمات 🌟', 'تتبع حالة طلبك 📦', 'التواصل مع خدمة العملاء 💬'] : ['Services 🌟', 'Track Order 📦', 'Support 💬'],
            responses: isAr ? {
                'استعراض الخدمات 🌟': { action: 'show_ecommerce_catalog', text: 'بكل سرور، إليكم قائمة بخدماتنا المتاحة 👇:', buttons: [], narrator: 'الباقات 🌟' },
                'تتبع حالة طلبك 📦': { action: 'wait_for_lead', text: 'يرجى تزويدنا برقم الطلب للتحقق 📋', buttons: [], narrator: 'تتبع 📦' },
                'التواصل مع خدمة العملاء 💬': { action: 'wait_for_cs', text: 'تفضلوا بكتابة استفساركم وسنقوم بخدمتكم في أسرع وقت ممكن 📝', buttons: [], narrator: 'الدعم 👨‍💻' }
            } : {
                'Services 🌟': { action: 'show_ecommerce_catalog', text: 'Here are our packages 👇:', buttons: [], narrator: 'Packages 🌟' },
                'Track Order 📦': { action: 'wait_for_lead', text: 'Please send your order number 📋', buttons: [], narrator: 'Tracking 📦' },
                'Support 💬': { action: 'wait_for_cs', text: 'Write your inquiry 📝', buttons: [], narrator: 'Support route 👨‍💻' }
            }
        }
    };

    // Deep Integration of Pain Points: Overriding Flows Dynamically
    // IMPORTANT: Deep-clone each flow's responses before mutating to prevent
    // cross-call contamination when getFlows() is called more than once.
    Object.keys(baseFlows).forEach(nicheKey => {
        const flow = baseFlows[nicheKey];
        // Deep copy responses so mutations don't bleed into subsequent calls
        flow.responses = JSON.parse(JSON.stringify(flow.responses));

        // Bugfix: Do NOT artificially push the "Send Location" button into initial greeting array.
        // It should natively be handled ONLY during checkout or deeply within a menu.
        // Previously this mutated `flow.buttons.push(sendLocation)`. Muted logic entirely.

        // 2. MANDATORY Universal Lead Gen on ALL High-Intent Actions ALWAYS!
        Object.keys(flow.responses).forEach(resKey => {
            const response = flow.responses[resKey];
            // Skip overwriting if the text already contains Lead-Gen-specific prompts
            if (response.text && typeof response.text === 'string' && response.text.includes('الاسم')) return;
            // Skip overwriting if it's explicitly waiting for time, because we want to collect time first
            if (response.action === 'wait_for_time') return;

            // Identify high intent actions universally
            const isTracking = resKey.includes('تتبع') || resKey.includes('Track');
            const isHighIntent = response.action === 'generate_order_number' || resKey.includes('التسجيل') || resKey.includes('Register') || resKey.includes('اعتماد') || resKey.includes('Confirm');

            if (isTracking || isHighIntent) {
                // Overwrite the normal response to ALWAYS collect lead data first
                if (isTracking) {
                    response.text = isAr
                        ? 'لمعرفة حالة طلبكم، يرجى تزويدنا بالاسم، ورقم الهاتف المسجل بالطلب 📋'
                        : 'To track your order, please provide the name and phone number registered with the order 📋';
                } else if (!response.text || typeof response.text !== 'string' || !response.text.includes('لإتمام')) {
                    response.text = isAr
                        ? 'لإتمام طلبكم بنجاح، يرجى تزويدنا بالاسم الكريم ورقم التواصل 📋'
                        : 'To complete your request successfully, please provide your name and phone number 📋';
                }
                response.action = 'wait_for_lead';
                response.buttons = [];
                response.narrator = isAr
                    ? 'يطلب النظام بيانات العميل لإتمام العملية (Lead Generation) 🎯'
                    : 'System requests user details to complete the transaction 🎯';
            }
        });

        // 3. Appointments Deep Integration
        if (goals.includes('appointments') && !goals.includes('lead_gen')) {
            Object.keys(flow.responses).forEach(resKey => {
                const response = flow.responses[resKey];
                if ((resKey.includes('حجز') || resKey.includes('Book')) && !response.action && (!response.buttons || response.buttons.length === 0)) {
                    response.action = 'wait_for_time';
                    response.text = isAr ? 'يرجى التفضل بتحديد الوقت والتاريخ المناسبين لكم 🕒:' : 'Please specify the suitable time and date 🕒:';
                    response.narrator = isAr ? 'يسأل النظام عن الموعد 🕒' : 'System asks for time 🕒';
                }
            });
        }
    });

    return baseFlows;
};

export const determineFlow = (niche) => {
    return niche || 'other';
};

export const getFallbackMessage = (lang = 'ar') => {
    return lang === 'ar' ? "عذراً، يرجى اختيار أحد الأزرار للمتابعة:" : "Sorry, please select one of the buttons to continue:";
};
