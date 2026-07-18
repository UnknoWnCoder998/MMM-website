import damacIslands2 from "@/assets/project-damac-islands-2.jpg";
import damacIslands2_1 from "@/assets/project-damac-islands-2-1.jpg";
import damacIslands2_2 from "@/assets/project-damac-islands-2-2.jpg";
import damacIslands2_3 from "@/assets/project-damac-islands-2-3.jpg";
import damacIslands2_4 from "@/assets/project-damac-islands-2-4.jpg";
import damacIslands2_5 from "@/assets/project-damac-islands-2-5.jpg";
import damacIslands2_6 from "@/assets/project-damac-islands-2-6.jpg";
import damacIslands2_7 from "@/assets/project-damac-islands-2-7.jpg";
import damacIslands2_8 from "@/assets/project-damac-islands-2-8.jpg";
import riverside from "@/assets/project-riverside.jpg";
import riverside_1 from "@/assets/project-riverside-1.jpg";
import riverside_2 from "@/assets/project-riverside-2.jpg";
import riverside_3 from "@/assets/project-riverside-3.jpg";
import riverside_4 from "@/assets/project-riverside-4.jpg";
import chelseaResidences from "@/assets/project-chelsea-residences.jpg";
import chelseaResidences_1 from "@/assets/project-chelsea-residences-1.jpg";
import chelseaResidences_2 from "@/assets/project-chelsea-residences-2.jpg";
import chelseaResidences_3 from "@/assets/project-chelsea-residences-3.jpg";
import chelseaResidences_4 from "@/assets/project-chelsea-residences-4.jpg";
import chelseaResidences_5 from "@/assets/project-chelsea-residences-5.jpg";
import chelseaResidences_6 from "@/assets/project-chelsea-residences-6.jpg";
import valencia from "@/assets/project-valencia.jpg";
import valencia_1 from "@/assets/project-valencia-1.jpg";
import valencia_2 from "@/assets/project-valencia-2.jpg";
import valencia_3 from "@/assets/project-valencia-3.jpg";
import valencia_4 from "@/assets/project-valencia-4.jpg";

export type Localized = { ru: string; en: string; ar: string };

export type Project = {
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  location: Localized;
  type: Localized;
  handover: string;
  priceFromAed: number;
  paymentPlan: string;
  description: Localized;
  amenities: Localized[];
};

const aed = (n: number) => n;

// Некоторые фото по умолчанию обрезаются в карточках по центру (object-cover),
// но для панорамных снимков центр кадра не всегда совпадает со зданием.
// Здесь задаём точку обрезки вручную для конкретных фото (по ссылке на файл).
export const imageFocalPoints: Record<string, string> = {
  [chelseaResidences]: "20% 50%",
  [chelseaResidences_6]: "20% 50%",
  [valencia_2]: "78% 50%",
};

export const projects: Project[] = [
  {
    slug: "damac-islands-2",
    name: "DAMAC Islands 2",
    image: damacIslands2,
    gallery: [
      damacIslands2,
      damacIslands2_1,
      damacIslands2_2,
      damacIslands2_3,
      damacIslands2_4,
      damacIslands2_5,
      damacIslands2_6,
      damacIslands2_7,
      damacIslands2_8,
    ],
    location: { ru: "Dubailand", en: "Dubailand", ar: "دبي لاند" },
    type: { 
      ru: "Ощутите атмосферу курортной жизни в DAMAC Islands 2 — эксклюзивном сообществе с роскошными виллами, вдохновлёнными самыми красивыми островами мира. Жителей ждут живописные лагуны, инфраструктура мирового уровня и спокойная атмосфера в одном из новейших мастер-проектов Дубая.", 
      en: "Experience resort-style living at DAMAC Islands 2, an exclusive community featuring luxurious villas inspired by the world's most beautiful island destinations. Enjoy pristine lagoons, world-class amenities, and a tranquil lifestyle in one of Dubai's newest master communities.", 
      ar: "استمتع بأسلوب حياة المنتجعات في DAMAC Islands 2، وهو مجتمع سكني حصري يضم فللًا فاخرة مستوحاة من أجمل جزر العالم. يوفر المشروع بحيرات خلابة، ومرافق عالمية المستوى، وأجواء هادئة ضمن أحد أحدث المجتمعات السكنية المتكاملة في دبي." },
    handover: "Q2 2030",
    priceFromAed: aed(2994000),
    paymentPlan: "TBA",
    description: {
      ru: "Описание скоро будет добавлено.",
      en: "Description coming soon.",
      ar: "الوصف قريبًا.",
    },
    amenities: [],
  },
  {
    slug: "riverside",
    name: "DAMAC Riverside",
    image: riverside,
    gallery: [riverside, riverside_1, riverside_2, riverside_3, riverside_4],
    location: { ru: "Dubai Investments Park", en: "Dubai Investments Park", ar: "مجمع دبي للاستثمار" },
    type: { 
      ru: "Откройте для себя DAMAC Riverside — современное прибрежное сообщество с элегантными виллами и таунхаусами, окружёнными зелёными ландшафтами, кристально чистыми лагунами и премиальной инфраструктурой. Наслаждайтесь спокойной жизнью с удобным доступом к ключевым районам и достопримечательностям Дубая.", 
      en: "Discover DAMAC Riverside, a vibrant waterfront community offering elegant villas and townhouses surrounded by lush landscapes, crystal lagoons, and premium lifestyle amenities. Enjoy peaceful living with seamless access to Dubai's major destinations.", 
      ar: "اكتشف DAMAC Riverside، وهو مجتمع سكني نابض بالحياة على الواجهة المائية يضم فللًا ومنازل تاون هاوس أنيقة، تحيط بها المساحات الخضراء والبحيرات الكريستالية والمرافق الفاخرة. استمتع بحياة هادئة مع سهولة الوصول إلى أبرز وجهات دبي" },
    handover: "Q3 2028",
    priceFromAed: aed(1100000),
    paymentPlan: "TBA",
    description: {
      ru: "",
      en: "Description coming soon.",
      ar: "الوصف قريبًا.",
    },
    amenities: [],
  },
  {
    slug: "chelsea-residences",
    name: "Chelsea Residences",
    image: chelseaResidences,
    gallery: [
      chelseaResidences,
      chelseaResidences_1,
      chelseaResidences_2,
      chelseaResidences_3,
      chelseaResidences_4,
      chelseaResidences_5,
      chelseaResidences_6,
    ],
    location: { ru: "Dubai Maritime City", en: "Dubai Maritime City", ar: "مدينة دبي البحرية" },
    type: { 
      ru: "Откройте для себя роскошную жизнь у воды в DAMAC Chelsea Residences, расположенном в Dubai Maritime City. Этот премиальный жилой комплекс, созданный в сотрудничестве с футбольным клубом Chelsea FC, предлагает элегантные интерьеры, первоклассную инфраструктуру и захватывающие виды на море в одном из самых престижных районов Дубая.", 
      en: "Experience waterfront luxury at DAMAC Chelsea Residences in Dubai Maritime City. Branded by Chelsea FC, these premium residences offer elegant interiors, world-class amenities, and stunning sea views in one of Dubai's most sought-after locations.", 
      ar: "استمتع بأسلوب حياة فاخر على الواجهة البحرية في DAMAC Chelsea Residences في Dubai Maritime City. يحمل المشروع علامة نادي Chelsea FC، ويقدم شققًا فاخرة بتصاميم داخلية أنيقة، ومرافق عالمية المستوى، وإطلالات خلابة على البحر في أحد أكثر المواقع تميزًا في دبي" },
    handover: "Q4 2029",
    priceFromAed: aed(2400000),
    paymentPlan: "TBA",
    description: {
      ru: "Описание скоро будет добавлено.",
      en: "Description coming soon.",
      ar: "الوصف قريبًا.",
    },
    amenities: [],
  },
  {
    slug: "valencia",
    name: "Valencia",
    image: valencia,
    gallery: [valencia, valencia_1, valencia_2, valencia_3, valencia_4],
    location: { ru: "Dubai", en: "Dubai", ar: "دبي" },
    type: { 
      ru: "Valencia by DAMAC — это современный взгляд на роскошную жизнь, вдохновлённый элегантностью Средиземноморья. Расположенный в динамично развивающемся районе, этот жилой комплекс сочетает комфорт, стиль и атмосферу спокойствия. Каждая резиденция тщательно продумана для тех, кто ценит высокий уровень жизни, современные удобства и возможность наслаждаться тишиной вдали от городской суеты, оставаясь при этом рядом со всем необходимым.", 
      en: "Valencia by DAMAC redefines contemporary luxury living with elegant Mediterranean-inspired design and. Nestled within a vibrant community, the residences offer a perfect blend of comfort, style, and tranquility. Every home is thoughtfully crafted for those who appreciate refined living, modern convenience, and a peaceful lifestyle away from the city’s rush, yet close to everything that matters.", 
      ar: "يعيد Valencia by DAMAC تعريف أسلوب الحياة الفاخر العصري من خلال تصميم أنيق مستوحى من أجواء البحر الأبيض المتوسط. يقع المشروع ضمن مجتمع حيوي، ويوفر مزيجًا مثاليًا من الراحة والأناقة والهدوء. صُممت كل وحدة سكنية بعناية لتلبي تطلعات الباحثين عن أسلوب حياة راقٍ، مع وسائل راحة حديثة وأجواء هادئة بعيدًا عن صخب المدينة، مع البقاء بالقرب من جميع الوجهات والخدمات الأساسية" },
    handover: "Q1 2029",
    priceFromAed: aed(1100000),
    paymentPlan: "TBA",
    description: {
      ru: "Описание скоро будет добавлено.",
      en: "Description coming soon.",
      ar: "الوصف قريبًا.",
    },
    amenities: [],
  },
];

export const formatPrice = (aedAmount: number, lang: "ru" | "en" | "ar") => {
  if (!aedAmount) {
    return lang === "ru" ? "Скоро" : lang === "ar" ? "قريبًا" : "Coming soon";
  }
  const locale = lang === "ru" ? "ru-RU" : lang === "ar" ? "ar-AE" : "en-US";
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(aedAmount) + " AED";
};
