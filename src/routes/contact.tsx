import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — MMM Investment Advisory" },
      {
        name: "description",
        content:
          "Get in touch with MMM Investment Advisory. DAMAC Properties consultations in Russian, English and Arabic.",
      },
      { property: "og:title", content: "Contact MMM Investment Advisory" },
      { property: "og:description", content: "Reach our DAMAC advisory team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="border-b border-border/40 bg-ink py-20">
        <div className="container-luxe max-w-3xl">
          <div className="eyebrow">{t("nav.contact")}</div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {lang === "ru" ? "Свяжитесь с нами" : lang === "ar" ? "تواصل معنا" : "Get in touch"}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("section.cta.body")}</p>
        </div>
      </section>

      <section className="container-luxe grid gap-12 py-20 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <ContactRow
            icon={<Mail className="h-4 w-4" />}
            label={t("form.email")}
            value="realestateadm1nmm@gmail.com"
            href="mailto:realestateadm1nmm@gmail.com"
          />
          <ContactRow
            icon={<Phone className="h-4 w-4" />}
            label={t("form.phone")}
            value="+971 — coming soon"
          />
          <ContactRow
            icon={<MessageCircle className="h-4 w-4" />}
            label="WhatsApp"
            value="+971 — coming soon"
          />
          <ContactRow
            icon={<MapPin className="h-4 w-4" />}
            label={lang === "ru" ? "Офис" : lang === "ar" ? "المكتب" : "Office"}
            value="Dubai, UAE"
          />

          <div className="mt-10 border border-border/60 bg-card p-6">
            <div className="eyebrow">
              {lang === "ru" ? "Часы работы" : lang === "ar" ? "ساعات العمل" : "Working hours"}
            </div>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <p>Mon — Sat · 09:00 – 21:00 GST</p>
              <p>
                Sun ·{" "}
                {lang === "ru" ? "по запросу" : lang === "ar" ? "حسب الطلب" : "by appointment"}
              </p>
            </div>
          </div>
        </div>

        <LeadForm />
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 border-l border-gold/40 bg-card/40 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/50 text-gold">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-lg text-foreground break-all">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-90">
      {inner}
    </a>
  ) : (
    inner
  );
}
