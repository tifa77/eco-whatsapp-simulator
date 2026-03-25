// ChatEngine.js — Products-Only WhatsApp Sales Flow
// Niche: products (single unified flow for selling via WhatsApp)

export const getFlows = (projectName, goals = [], lang = 'ar') => {
    const isAr = lang === 'ar';

    const baseFlows = {
        products: {
            greeting1: isAr
                ? `أهلاً! 👋 مرحباً بك في ${projectName}`
                : `Hello! 👋 Welcome to ${projectName}`,
            greeting2: isAr
                ? 'اكتشف منتجاتنا واطلب بكل سهولة 🛍️'
                : 'Discover our products and order with ease 🛍️',
            buttons: isAr
                ? ['تصفح المنتجات 🛍️']
                : ['Browse Products 🛍️'],
            responses: isAr ? {
                'تصفح المنتجات 🛍️': {
                    action: 'open_catalog_sheet',
                    text: 'بكل سرور! جاري عرض منتجاتنا 👇',
                    buttons: [],
                    narrator: 'يفتح الكاتلوج تلقائياً 🛒'
                }
            } : {
                'Browse Products 🛍️': {
                    action: 'open_catalog_sheet',
                    text: 'Sure! Opening our catalog 👇',
                    buttons: [],
                    narrator: 'Catalog opens automatically 🛒'
                }
            }
        },
        // Keep other niches as fallbacks but map them all to products flow
        restaurant: null,
        ecommerce: null,
        retail: null,
        clinic: null,
        consulting: null,
        travel: null,
        services: null,
        realestate: null,
        other: null
    };

    // All niches point to products flow
    const productFlow = baseFlows.products;
    baseFlows.restaurant = productFlow;
    baseFlows.ecommerce = productFlow;
    baseFlows.retail = productFlow;
    baseFlows.clinic = productFlow;
    baseFlows.consulting = productFlow;
    baseFlows.travel = productFlow;
    baseFlows.services = productFlow;
    baseFlows.realestate = productFlow;
    baseFlows.other = productFlow;

    return baseFlows;
};

export const determineFlow = (niche) => {
    // Always use products flow
    return 'products';
};

export const getFallbackMessage = (lang = 'ar') => {
    return lang === 'ar'
        ? 'أهلاً! يسعدنا مساعدتك 😊 اضغط على "تصفح المنتجات" للبدء 🛍️'
        : 'Hello! We\'re happy to help 😊 Tap "Browse Products" to get started 🛍️';
};
