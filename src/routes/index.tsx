import damacLogo from "@/assets/damac-logo-white.png";
import { type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Handshake,
  LineChart,
  ShieldCheck,
  Percent,
  BadgeCheck,
  Globe,
  UserCheck,
  Compass,
  Check,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero-damac-building.jpg";
import { useI18n } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { LeadForm } from "@/components/LeadForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MMM Investment Advisory — Exclusive Advisory for DAMAC Properties" },
      {
        name: "description",
        content:
          "Specialized investment advisory for DAMAC Properties in Dubai. Strategic guidance, unbiased advice, long-term value.",
      },
      { property: "og:title", content: "MMM Investment Advisory — DAMAC Properties" },
      {
        property: "og:description",
        content: "Strategic guidance. Unbiased advice. Long-term value.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  const featured = projects.slice(0, 4);

  return (
    <>
      <Hero />
      <StatsBar />

      {/* Featured projects */}
      <section className="container-luxe py-24">
        <div className="text-center">
          <div className="eyebrow">{t("section.featured.eyebrow")}</div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/projects" className="btn-ghost-gold">
            {t("section.featured.cta")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Why invest with MMM */}
      <section className="border-y border-border/40 bg-ink py-24">
        <div className="container-luxe">
          <div className="text-center">
            <div className="eyebrow">{t("section.why.eyebrow")}</div>
          </div>
          <div className="mt-12 grid gap-px bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={<UserCheck className="h-5 w-5" />}
              title={t("section.why.1.title")}
              body={t("section.why.1.body")}
            />
            <Feature
              icon={<Compass className="h-5 w-5" />}
              title={t("section.why.2.title")}
              body={t("section.why.2.body")}
            />
            <Feature
              icon={<Handshake className="h-5 w-5" />}
              title={t("section.why.3.title")}
              body={t("section.why.3.body")}
            />
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title={t("section.why.4.title")}
              body={t("section.why.4.body")}
            />
          </div>
          <div className="mt-16 text-center">
            <div className="hairline mx-auto mb-6 max-w-xs" />
            <p className="font-display text-xl italic text-muted-foreground">
              {t("footer.signature")}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="py-24">
        <div className="container-luxe grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="eyebrow">{t("nav.cta")}</div>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
              {t("section.cta.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("section.cta.body")}</p>
            <ul className="mt-8 space-y-3">
              <TrustItem>{t("form.trust1")}</TrustItem>
              <TrustItem>{t("form.trust2")}</TrustItem>
              <TrustItem>{t("form.trust3")}</TrustItem>
            </ul>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}

function TrustItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
        <Check className="h-3 w-3" />
      </span>
      {children}
    </li>
  );
}

function Testimonials() {
  const { t, lang } = useI18n();
  const items = [
    {
      name: "Andrei K.",
      role: {
        ru: "Инвестор, Cavalli Tower",
        en: "Investor, Cavalli Tower",
        ar: "مستثمر، Cavalli Tower",
      },
      quote: {
        ru: "Подобрали юнит с лучшей доходностью за неделю, без давления и навязывания. Полная прозрачность на каждом шаге сделки.",
        en: "They found me the best-yield unit within a week — no pressure, full transparency at every step.",
        ar: "وجدوا لي أفضل وحدة من حيث العائد خلال أسبوع — دون ضغط وبشفافية كاملة.",
      },
    },
    {
      name: "Layla M.",
      role: {
        ru: "Инвестор, DAMAC Lagoons",
        en: "Investor, DAMAC Lagoons",
        ar: "مستثمرة، DAMAC Lagoons",
      },
      quote: {
        ru: "Непредвзятая аналитика помогла выбрать правильный проект под мою стратегию. Сопровождение после сделки — на высшем уровне.",
        en: "Their unbiased analysis helped me choose the right project for my strategy. Post-sale support has been outstanding.",
        ar: "ساعدني تحليلهم المحايد في اختيار المشروع المناسب لاستراتيجيتي. الدعم بعد البيع كان ممتازاً.",
      },
    },
    {
      name: "Dmitri S.",
      role: { ru: "Инвестор, Safa One", en: "Investor, Safa One", ar: "مستثمر، Safa One" },
      quote: {
        ru: "Команда MMM объяснила все риски и помогла зафиксировать льготу 4% DLD. Рекомендую тем, кто инвестирует впервые.",
        en: "The MMM team walked me through every risk and locked in the 4% DLD waiver for me. Highly recommend for first-time investors.",
        ar: "شرح فريق MMM كل المخاطر وساعدني في الحصول على إعفاء 4%. أنصح به للمستثمرين لأول مرة.",
      },
    },
  ];

  return (
    <section className="border-t border-border/40 bg-ink py-24">
      <div className="container-luxe">
        <div className="text-center">
          <div className="eyebrow">{t("section.testimonials.eyebrow")}</div>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            {t("section.testimonials.title")}
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="flex flex-col border border-border/60 bg-background p-8">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{it.quote[lang]}"
              </p>
              <div className="mt-6 border-t border-border/40 pt-4">
                <div className="font-display text-lg text-foreground">{it.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-gold">{it.role[lang]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9]">
        <img
          src={heroImg}
          alt="DAMAC Properties building at night"
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover object-[78%_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />

        <div className="container-luxe absolute inset-0 flex flex-col justify-center py-16">
          <div className="max-w-2xl">
            <div className="eyebrow">{t("hero.eyebrow")}</div>
            <div className="py-4 sm:py-5 md:py-6">
            <img src={damacLogo} alt="DAMAC" className="h-8 w-auto sm:h-11 md:h-16"/>
            </div>
            <div className="mt-1 text-xl uppercase tracking-[0.4em] text-foreground/90 sm:text-2xl md:text-3xl">
              Properties
            </div>
            <p className="mt-6 max-w-xl text-sm text-muted-foreground sm:text-base md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 md:mt-10">
              <Link to="/services" className="btn-ghost-gold">
                {t("hero.cta")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="container-luxe">
          <div className="hairline" />
        </div>
        <div className="container-luxe grid grid-cols-2 divide-x divide-border/40 py-10 sm:grid-cols-4">
          <HeroFeature
            title={t("hero.feature.1.title")}
            body={t("hero.feature.1.body")}
            icon={<Building2 className="h-5 w-5" />}
          />
          <HeroFeature
            title={t("hero.feature.2.title")}
            body={t("hero.feature.2.body")}
            icon={<Compass className="h-5 w-5" />}
          />
          <HeroFeature
            title={t("hero.feature.3.title")}
            body={t("hero.feature.3.body")}
            icon={<ShieldCheck className="h-5 w-5" />}
          />
          <HeroFeature
            title={t("hero.feature.4.title")}
            body={t("hero.feature.4.body")}
            icon={<LineChart className="h-5 w-5" />}
          />
        </div>
      </div>
    </section>
  );
}

function HeroFeature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 px-4 first:pl-0 last:pr-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground">{title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function StatsBar() {
  const { t } = useI18n();
  return (
    <section className="border-y border-border/40 bg-ink">
      <div className="container-luxe flex flex-col items-center justify-between gap-8 py-8 lg:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-gold" />
            <span>
              {t("badge.partner")} <span className="text-foreground">DAMAC</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Handshake className="h-4 w-4 text-gold" />
            <span>{t("badge.trusted")}</span>
          </div>
        </div>

        <div className="hidden h-10 w-px bg-border/50 lg:block" />

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-10">
          <Stat icon={<Percent className="h-4 w-4" />} title={t("stat.dld.title")} />
          <Stat icon={<ShieldCheck className="h-4 w-4" />} title={t("stat.developer.title")} />
          <Stat icon={<LineChart className="h-4 w-4" />} title={t("stat.returns.title")} />
          <Stat icon={<Globe className="h-4 w-4" />} title={t("stat.plans.title")} />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-foreground">
      <span className="text-gold">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="bg-background p-8">
      <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/50 text-gold">
        {icon}
      </div>
      <h3 className="mt-5 font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
