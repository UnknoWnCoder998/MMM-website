import damacIslands2 from "@/assets/project-damac-islands-2.jpg";
import riverside from "@/assets/project-riverside.jpg";
import chelseaResidences from "@/assets/project-chelsea-residences.jpg";
import valencia from "@/assets/project-valencia.jpg";

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

export const projects: Project[] = [
  {
    slug: "damac-islands-2",
    name: "DAMAC Islands 2",
    image: damacIslands2,
    gallery: [damacIslands2],
    location: { ru: "Dubailand", en: "Dubailand", ar: "دبي لاند" },
    type: { ru: "Виллы и таунхаусы", en: "Villas & Townhouses", ar: "فلل وتاون هاوس" },
    handover: "TBA",
    priceFromAed: aed(0),
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
    gallery: [riverside],
    location: { ru: "Dubai Investments Park", en: "Dubai Investments Park", ar: "مجمع دبي للاستثمار" },
    type: { ru: "Апартаменты и виллы", en: "Apartments & Villas", ar: "شقق وفلل" },
    handover: "TBA",
    priceFromAed: aed(0),
    paymentPlan: "TBA",
    description: {
      ru: "Описание скоро будет добавлено.",
      en: "Description coming soon.",
      ar: "الوصف قريبًا.",
    },
    amenities: [],
  },
  {
    slug: "chelsea-residences",
    name: "Chelsea Residences",
    image: chelseaResidences,
    gallery: [chelseaResidences],
    location: { ru: "Dubai Maritime City", en: "Dubai Maritime City", ar: "مدينة دبي البحرية" },
    type: { ru: "Резиденции у моря", en: "Waterfront Residences", ar: "شقق على الواجهة البحرية" },
    handover: "TBA",
    priceFromAed: aed(0),
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
    gallery: [valencia],
    location: { ru: "Dubai", en: "Dubai", ar: "دبي" },
    type: { ru: "Апартаменты", en: "Apartments", ar: "شقق" },
    handover: "TBA",
    priceFromAed: aed(0),
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
