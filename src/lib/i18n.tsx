import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en" | "ar";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  ru: {
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.services": "Услуги",
    "nav.projects": "DAMAC Properties",
    "nav.insights": "Аналитика",
    "nav.contact": "Контакты",
    "nav.cta": "Связаться с нами",

    "brand.name": "MMM",
    "brand.tagline1": "INVESTMENT",
    "brand.tagline2": "ADVISORY",

    "hero.eyebrow": "Эксклюзивная экспертиза по",
    "hero.subtitle":
      "Специализированный инвестиционный консалтинг по объектам DAMAC Properties. Стратегическое руководство. Непредвзятые советы. Долгосрочная ценность.",
    "hero.cta": "Узнать наш подход",
    "hero.cta2": "Получить подборку",

    "hero.feature.1.title": "Эксперты по DAMAC",
    "hero.feature.1.body": "Глубокое понимание проектов DAMAC и динамики рынка.",
    "hero.feature.2.title": "Стратегическое сопровождение",
    "hero.feature.2.body": "Индивидуальные инвестиционные стратегии под ваши финансовые цели.",
    "hero.feature.3.title": "Управление рисками",
    "hero.feature.3.body": "Взвешенные советы для защиты инвестиций и максимизации доходности.",
    "hero.feature.4.title": "Долгосрочная ценность",
    "hero.feature.4.body": "Фокус на устойчивом росте и накопительном эффекте через недвижимость.",

    "badge.partner": "Официальный партнёр",
    "badge.trusted": "Доверие 100+ инвесторов",
    "stat.dld.title": "Скидка 4% DLD",
    "stat.dld.body": "Ограниченное предложение на отдельные проекты DAMAC",
    "stat.developer.title": "Надёжный застройщик",
    "stat.developer.body": "Отмеченные наградами проекты по всему Дубаю",
    "stat.returns.title": "Высокая доходность",
    "stat.returns.body": "Сильный рост капитала и арендной доходности",
    "stat.plans.title": "Гибкие планы",
    "stat.plans.body": "Привлекательные планы рассрочки для инвесторов",

    "section.featured.eyebrow": "Избранные проекты DAMAC",
    "section.featured.title": "Знаковые резиденции DAMAC",
    "section.featured.subtitle":
      "Подобранная коллекция флагманских объектов в самых востребованных локациях Дубая.",
    "section.featured.cta": "Все проекты",

    "section.why.eyebrow": "Почему MMM",
    "section.why.title": "Почему стоит инвестировать с MMM",
    "section.why.1.title": "Специализированный консалтинг",
    "section.why.1.body": "Глубокая экспертиза по проектам DAMAC и понимание рынка.",
    "section.why.2.title": "Непредвзятые рекомендации",
    "section.why.2.body":
      "Независимые советы, ориентированные исключительно на ваши финансовые цели.",
    "section.why.3.title": "Полное сопровождение",
    "section.why.3.body": "От выбора объекта до приобретения и далее — мы рядом на каждом шаге.",
    "section.why.4.title": "Интересы инвестора прежде всего",
    "section.why.4.body": "Ваш долгосрочный успех — наш главный приоритет.",

    "section.services.eyebrow": "Наши услуги",
    "section.services.title": "Полный цикл — от выбора до ключей",

    "service.buy.title": "Покупка у застройщика",
    "service.buy.body": "Подбор юнитов, бронирование, оформление контракта DLD напрямую с DAMAC.",
    "service.resale.title": "Перепродажа",
    "service.resale.body": "Поиск ликвидных лотов на вторичном рынке и сопровождение сделки.",
    "service.invest.title": "Инвестиции",
    "service.invest.body": "Аналитика доходности, ROI 7–11% годовых, программы рассрочки 60/40.",
    "service.mortgage.title": "Ипотека",
    "service.mortgage.body": "Финансирование до 80% от стоимости через банки-партнёры ОАЭ.",

    "section.cta.title": "Готовы выбрать вашу резиденцию?",
    "section.cta.body":
      "Оставьте заявку — мы свяжемся в течение часа и подготовим персональную подборку.",

    "form.name": "Имя",
    "form.phone": "Телефон",
    "form.email": "Email",
    "form.message": "Сообщение",
    "form.project": "Интересующий проект",
    "form.submit": "Отправить заявку",
    "form.sent": "Спасибо! Мы свяжемся с вами в ближайшее время.",
    "form.privacy": "Отправляя форму, вы соглашаетесь с обработкой персональных данных.",
    "form.error": "Не удалось отправить заявку. Попробуйте ещё раз.",
    "form.trust1": "Ответим в течение 1 часа",
    "form.trust2": "Бесплатная консультация",
    "form.trust3": "Без спама и навязчивых звонков",

    "section.testimonials.eyebrow": "Отзывы клиентов",
    "section.testimonials.title": "Нам доверяют инвесторы по всему миру",

    "project.from": "От",
    "project.handover": "Сдача",
    "project.location": "Локация",
    "project.type": "Тип",
    "project.payment": "План оплаты",
    "project.details": "Подробнее",
    "project.request": "Запросить презентацию",
    "project.gallery": "Галерея",
    "project.about": "О проекте",
    "project.amenities": "Удобства",

    "footer.tagline": "Эксклюзивная инвестиционная консультация по DAMAC Properties в Дубае.",
    "footer.signature": "Создаём капитал через стратегические инвестиции в недвижимость",
    "footer.rights": "Все права защищены.",
    "footer.nav": "Навигация",
    "footer.contact": "Контакты",
    "footer.legal": "Юридическая информация",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "DAMAC Properties",
    "nav.insights": "Insights",
    "nav.contact": "Contact Us",
    "nav.cta": "Contact Us",

    "brand.name": "MMM",
    "brand.tagline1": "INVESTMENT",
    "brand.tagline2": "ADVISORY",

    "hero.eyebrow": "Exclusive Advisory For",
    "hero.subtitle":
      "Specialized investment advisory for DAMAC Properties. Strategic guidance. Unbiased advice. Long-term value.",
    "hero.cta": "Discover Our Approach",
    "hero.cta2": "Request brochure",

    "hero.feature.1.title": "DAMAC Specialists",
    "hero.feature.1.body": "In-depth understanding of DAMAC projects and market dynamics.",
    "hero.feature.2.title": "Strategic Guidance",
    "hero.feature.2.body": "Tailored investment strategies aligned with your financial goals.",
    "hero.feature.3.title": "Risk Management",
    "hero.feature.3.body": "Prudent advice to protect your investments and maximize returns.",
    "hero.feature.4.title": "Long-Term Value",
    "hero.feature.4.body":
      "Focused on sustainable growth and compounding success through real estate.",

    "badge.partner": "Official Partner Of",
    "badge.trusted": "Trusted By 100+ Investors",
    "stat.dld.title": "4% DLD Waiver",
    "stat.dld.body": "Limited time offer on selected DAMAC projects",
    "stat.developer.title": "Trusted Developer",
    "stat.developer.body": "Award-winning projects across Dubai and beyond",
    "stat.returns.title": "Strong Returns",
    "stat.returns.body": "High capital appreciation and rental yields",
    "stat.plans.title": "Flexible Plans",
    "stat.plans.body": "Attractive payment plans tailored for investors",

    "section.featured.eyebrow": "Featured DAMAC Projects",
    "section.featured.title": "Iconic DAMAC residences",
    "section.featured.subtitle":
      "A curated selection of flagship developments in Dubai's most coveted addresses.",
    "section.featured.cta": "Explore All Projects",

    "section.why.eyebrow": "Why Invest With MMM",
    "section.why.title": "Why Invest With MMM",
    "section.why.1.title": "Specialised Advisory",
    "section.why.1.body": "Deep expertise in DAMAC projects and market insights.",
    "section.why.2.title": "Unbiased Guidance",
    "section.why.2.body": "Independent advice focused on your financial goals.",
    "section.why.3.title": "End-to-End Support",
    "section.why.3.body": "From selection to acquisition and beyond.",
    "section.why.4.title": "Investor First",
    "section.why.4.body": "Your success is our long-term priority.",

    "section.services.eyebrow": "Our services",
    "section.services.title": "Full cycle — from selection to keys",

    "service.buy.title": "Off-plan purchase",
    "service.buy.body": "Unit selection, booking and DLD contract directly with DAMAC.",
    "service.resale.title": "Resale",
    "service.resale.body": "Sourcing liquid secondary-market units with full transaction support.",
    "service.invest.title": "Investment",
    "service.invest.body": "Yield analytics, 7–11% annual ROI, 60/40 payment plans.",
    "service.mortgage.title": "Mortgage",
    "service.mortgage.body": "Up to 80% LTV financing through our UAE partner banks.",

    "section.cta.title": "Ready to choose your residence?",
    "section.cta.body":
      "Leave a request — we'll reach out within an hour with a tailored selection.",

    "form.name": "Name",
    "form.phone": "Phone",
    "form.email": "Email",
    "form.message": "Message",
    "form.project": "Project of interest",
    "form.submit": "Send request",
    "form.sent": "Thank you! We'll be in touch shortly.",
    "form.privacy": "By submitting this form you agree to our data processing terms.",
    "form.error": "Couldn't send your request. Please try again.",
    "form.trust1": "We respond within 1 hour",
    "form.trust2": "Free consultation",
    "form.trust3": "No spam, no pushy calls",

    "section.testimonials.eyebrow": "Client Stories",
    "section.testimonials.title": "Trusted by investors worldwide",

    "project.from": "From",
    "project.handover": "Handover",
    "project.location": "Location",
    "project.type": "Type",
    "project.payment": "Payment plan",
    "project.details": "View details",
    "project.request": "Request brochure",
    "project.gallery": "Gallery",
    "project.about": "About the project",
    "project.amenities": "Amenities",

    "footer.tagline": "Exclusive investment advisory for DAMAC Properties in Dubai.",
    "footer.signature": "Building Wealth Through Strategic Real Estate Investments",
    "footer.rights": "All rights reserved.",
    "footer.nav": "Navigation",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.services": "الخدمات",
    "nav.projects": "عقارات داماك",
    "nav.insights": "رؤى",
    "nav.contact": "اتصل بنا",
    "nav.cta": "اتصل بنا",

    "brand.name": "MMM",
    "brand.tagline1": "الاستشارات",
    "brand.tagline2": "الاستثمارية",

    "hero.eyebrow": "استشارة حصرية لـ",
    "hero.subtitle":
      "استشارات استثمارية متخصصة لعقارات داماك. توجيه استراتيجي. نصائح محايدة. قيمة طويلة الأمد.",
    "hero.cta": "اكتشف نهجنا",
    "hero.cta2": "اطلب الكتيب",

    "hero.feature.1.title": "خبراء داماك",
    "hero.feature.1.body": "فهم عميق لمشاريع داماك وديناميكيات السوق.",
    "hero.feature.2.title": "توجيه استراتيجي",
    "hero.feature.2.body": "استراتيجيات استثمارية مصممة وفق أهدافك المالية.",
    "hero.feature.3.title": "إدارة المخاطر",
    "hero.feature.3.body": "نصائح حكيمة لحماية استثماراتك وتعظيم العوائد.",
    "hero.feature.4.title": "قيمة طويلة الأمد",
    "hero.feature.4.body": "التركيز على النمو المستدام والنجاح المتراكم عبر العقارات.",

    "badge.partner": "شريك معتمد لـ",
    "badge.trusted": "موثوق به من قبل أكثر من 100 مستثمر",
    "stat.dld.title": "إعفاء 4% من رسوم الأراضي",
    "stat.dld.body": "عرض محدود لمشاريع داماك المختارة",
    "stat.developer.title": "مطور موثوق",
    "stat.developer.body": "مشاريع حائزة على جوائز في جميع أنحاء دبي",
    "stat.returns.title": "عوائد قوية",
    "stat.returns.body": "ارتفاع رأس المال وعوائد الإيجار",
    "stat.plans.title": "خطط مرنة",
    "stat.plans.body": "خطط دفع جذابة مصممة للمستثمرين",

    "section.featured.eyebrow": "مشاريع داماك المختارة",
    "section.featured.title": "مساكن داماك الأيقونية",
    "section.featured.subtitle": "مجموعة منتقاة من أرقى المشاريع في أكثر مواقع دبي طلباً.",
    "section.featured.cta": "استكشف جميع المشاريع",

    "section.why.eyebrow": "لماذا الاستثمار مع MMM",
    "section.why.title": "لماذا الاستثمار مع MMM",
    "section.why.1.title": "استشارة متخصصة",
    "section.why.1.body": "خبرة عميقة في مشاريع داماك ورؤى السوق.",
    "section.why.2.title": "إرشاد محايد",
    "section.why.2.body": "نصيحة مستقلة تركز على أهدافك المالية.",
    "section.why.3.title": "دعم شامل",
    "section.why.3.body": "من الاختيار إلى الاستحواذ وما بعده.",
    "section.why.4.title": "المستثمر أولاً",
    "section.why.4.body": "نجاحك على المدى الطويل هو أولويتنا.",

    "section.services.eyebrow": "خدماتنا",
    "section.services.title": "دورة كاملة — من الاختيار حتى المفاتيح",

    "service.buy.title": "الشراء على الخارطة",
    "service.buy.body": "اختيار الوحدة والحجز والعقد مباشرة مع داماك.",
    "service.resale.title": "إعادة البيع",
    "service.resale.body": "البحث عن وحدات السوق الثانوي مع الدعم الكامل.",
    "service.invest.title": "الاستثمار",
    "service.invest.body": "تحليل العائد، 7–11% سنوياً، خطط دفع 60/40.",
    "service.mortgage.title": "التمويل العقاري",
    "service.mortgage.body": "تمويل حتى 80% عبر بنوك الإمارات الشريكة.",

    "section.cta.title": "جاهز لاختيار مسكنك؟",
    "section.cta.body": "اترك طلبك — سنتواصل خلال ساعة بعرض مخصص.",

    "form.name": "الاسم",
    "form.phone": "الهاتف",
    "form.email": "البريد الإلكتروني",
    "form.message": "الرسالة",
    "form.project": "المشروع المهتم به",
    "form.submit": "إرسال الطلب",
    "form.sent": "شكراً! سنتواصل معك قريباً.",
    "form.privacy": "بإرسال هذا النموذج فإنك توافق على معالجة بياناتك.",
    "form.error": "تعذر إرسال طلبك. حاول مرة أخرى.",
    "form.trust1": "نرد خلال ساعة واحدة",
    "form.trust2": "استشارة مجانية",
    "form.trust3": "بدون إزعاج أو رسائل غير مرغوبة",

    "section.testimonials.eyebrow": "آراء العملاء",
    "section.testimonials.title": "موثوق به من قبل مستثمرين حول العالم",

    "project.from": "من",
    "project.handover": "التسليم",
    "project.location": "الموقع",
    "project.type": "النوع",
    "project.payment": "خطة الدفع",
    "project.details": "عرض التفاصيل",
    "project.request": "اطلب الكتيب",
    "project.gallery": "المعرض",
    "project.about": "عن المشروع",
    "project.amenities": "المرافق",

    "footer.tagline": "استشارة استثمارية حصرية لعقارات داماك في دبي.",
    "footer.signature": "نبني الثروة من خلال استثمارات عقارية استراتيجية",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.nav": "التنقل",
    "footer.contact": "اتصل",
    "footer.legal": "قانوني",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (stored && ["ru", "en", "ar"].includes(stored)) setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: string) => dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
