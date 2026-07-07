import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart, Percent, ShieldCheck, TrendingUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — MMM Investment Advisory" },
      {
        name: "description",
        content:
          "Market insights, ROI analytics and strategic guidance for investing in DAMAC Properties in Dubai.",
      },
      { property: "og:title", content: "Insights — MMM Investment Advisory" },
      { property: "og:description", content: "Strategic insights into the Dubai DAMAC market." },
    ],
  }),
  component: InsightsPage,
});

const articles = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: {
      ru: "Рост рынка недвижимости Дубая в 2026",
      en: "Dubai Real Estate Growth in 2026",
      ar: "نمو سوق العقارات في دبي 2026",
    },
    body: {
      ru: "Анализ динамики цен и спроса на резиденции DAMAC за последние кварталы.",
      en: "An analysis of price dynamics and demand for DAMAC residences over recent quarters.",
      ar: "تحليل ديناميكيات الأسعار والطلب على مساكن داماك خلال الأرباع الأخيرة.",
    },
  },
  {
    icon: <Percent className="h-5 w-5" />,
    title: {
      ru: "Льгота 4% DLD: как это работает",
      en: "4% DLD Waiver: How It Works",
      ar: "إعفاء 4%: كيف يعمل",
    },
    body: {
      ru: "Что значит освобождение от регистрационного сбора и как им воспользоваться.",
      en: "What the Dubai Land Department fee waiver means and how to use it.",
      ar: "ماذا يعني إعفاء رسوم دائرة الأراضي وكيفية الاستفادة منه.",
    },
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: {
      ru: "Управление рисками при покупке off-plan",
      en: "Managing Risk in Off-Plan Purchases",
      ar: "إدارة المخاطر في الشراء على الخارطة",
    },
    body: {
      ru: "Ключевые факторы due diligence перед инвестицией в строящийся объект.",
      en: "Key due-diligence factors before investing in an under-construction property.",
      ar: "عوامل العناية الواجبة الرئيسية قبل الاستثمار في عقار قيد الإنشاء.",
    },
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: {
      ru: "Доходность аренды по районам Дубая",
      en: "Rental Yields Across Dubai Districts",
      ar: "عوائد الإيجار حسب مناطق دبي",
    },
    body: {
      ru: "Сравнение арендной доходности в ключевых локациях проектов DAMAC.",
      en: "Comparing rental yields across key DAMAC project locations.",
      ar: "مقارنة عوائد الإيجار عبر مواقع مشاريع داماك الرئيسية.",
    },
  },
];

function InsightsPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="border-b border-border/40 bg-ink py-20">
        <div className="container-luxe max-w-3xl">
          <div className="eyebrow">{t("nav.insights")}</div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {lang === "ru"
              ? "Аналитика и рыночная экспертиза"
              : lang === "ar"
                ? "رؤى وخبرة السوق"
                : "Market Insights & Expertise"}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("hero.subtitle")}</p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid gap-px bg-border/40 sm:grid-cols-2">
          {articles.map((a, i) => (
            <div key={i} className="bg-background p-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/50 text-gold">
                {a.icon}
              </div>
              <h2 className="mt-6 font-display text-2xl text-foreground">{a.title[lang]}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{a.body[lang]}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact" className="btn-gold">
            {t("nav.cta")}
          </Link>
        </div>
      </section>
    </>
  );
}
