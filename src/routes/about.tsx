import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MMM Investment Advisory — DAMAC Properties Dubai" },
      {
        name: "description",
        content:
          "MMM Investment Advisory is a specialized DAMAC Properties investment advisory in Dubai. Multilingual concierge service for buyers and investors.",
      },
      { property: "og:title", content: "About MMM Investment Advisory" },
      { property: "og:description", content: "Your trusted DAMAC investment advisor in Dubai." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="border-b border-border/40 bg-ink py-20">
        <div className="container-luxe max-w-3xl">
          <div className="eyebrow">{t("nav.about")}</div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {lang === "ru"
              ? "Консалтинг, которому доверяют инвесторы DAMAC"
              : lang === "ar"
                ? "استشارة يثق بها مستثمرو داماك"
                : "The advisory DAMAC investors trust"}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("footer.tagline")}</p>
        </div>
      </section>

      <section className="container-luxe grid gap-16 py-20 lg:grid-cols-2">
        <div>
          <div className="eyebrow">{t("section.why.eyebrow")}</div>
          <h2 className="mt-3 font-display text-4xl text-foreground">{t("section.why.title")}</h2>
          <p className="mt-6 text-muted-foreground">
            {lang === "ru"
              ? "Мы помогаем покупателям из России, СНГ и стран Залива безопасно приобретать резиденции DAMAC в Дубае — от выбора юнита до получения ключей и управления арендой."
              : lang === "ar"
                ? "نساعد المشترين من جميع أنحاء العالم على شراء مساكن داماك في دبي بأمان — من اختيار الوحدة إلى تسليم المفاتيح وإدارة الإيجار."
                : "We help buyers from Russia, CIS and the GCC safely acquire DAMAC residences in Dubai — from unit selection to handover and rental management."}
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <Stat
              value="500+"
              label={lang === "ru" ? "сделок" : lang === "ar" ? "صفقة" : "deals"}
            />
            <Stat
              value="8"
              label={lang === "ru" ? "лет на рынке" : lang === "ar" ? "سنوات" : "years"}
            />
            <Stat
              value="40+"
              label={lang === "ru" ? "проектов" : lang === "ar" ? "مشروع" : "projects"}
            />
          </div>
        </div>

        <div className="grid gap-px bg-border/40 sm:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-background p-8">
              <div className="font-display text-3xl text-gold">0{n}</div>
              <h3 className="mt-3 font-display text-2xl text-foreground">
                {t(`section.why.${n}.title`)}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{t(`section.why.${n}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40 bg-ink py-20">
        <div className="container-luxe text-center">
          <h2 className="font-display text-4xl text-foreground">{t("section.cta.title")}</h2>
          <Link to="/contact" className="btn-gold mt-8 inline-flex">
            {t("nav.cta")}
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-4xl text-gold">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}
