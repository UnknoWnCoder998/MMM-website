import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Handshake, KeyRound, LineChart } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — MMM Investment Advisory" },
      {
        name: "description",
        content:
          "Full-cycle real estate services: off-plan purchase, resale, investment advisory and mortgage financing for DAMAC properties in Dubai.",
      },
      { property: "og:title", content: "Services — MMM Investment Advisory" },
      { property: "og:description", content: "Buy, resale, invest and finance with DAMAC." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t, lang } = useI18n();
  const items = [
    { key: "buy", icon: <Building2 className="h-5 w-5" /> },
    { key: "resale", icon: <KeyRound className="h-5 w-5" /> },
    { key: "invest", icon: <LineChart className="h-5 w-5" /> },
    { key: "mortgage", icon: <Handshake className="h-5 w-5" /> },
  ];

  return (
    <>
      <section className="border-b border-border/40 bg-ink py-20">
        <div className="container-luxe max-w-3xl">
          <div className="eyebrow">{t("nav.services")}</div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {t("section.services.title")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {lang === "ru"
              ? "От первой консультации до управления арендой — один партнёр на весь путь владения недвижимостью в Дубае."
              : lang === "ar"
                ? "من الاستشارة الأولى إلى إدارة الإيجار — شريك واحد طوال رحلة تملك العقار في دبي."
                : "From first consultation to rental management — one partner across the full ownership journey in Dubai."}
          </p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid gap-px bg-border/40 md:grid-cols-2">
          {items.map((it, i) => (
            <div key={it.key} className="bg-background p-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-gold/50 text-gold">
                  {it.icon}
                </div>
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
              </div>
              <h2 className="mt-6 font-display text-3xl text-foreground">
                {t(`service.${it.key}.title`)}
              </h2>
              <p className="mt-4 text-muted-foreground">{t(`service.${it.key}.body`)}</p>
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
