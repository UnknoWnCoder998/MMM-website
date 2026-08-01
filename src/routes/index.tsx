import damacLogo from "@/assets/damac-logo-white.png";
import { type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Handshake,
  ShieldCheck,
  UserCheck,
  Compass,
  Check,
} from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-video-poster.jpg";
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

      {/* Featured projects */}
      <section className="container-luxe py-16 md:py-20">
        <div className="text-center">
          <div className="eyebrow">{t("section.featured.eyebrow")}</div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

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

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div className="relative h-[100svh] w-full sm:h-auto sm:aspect-[2/1] lg:aspect-[21/9]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent" />

        <div className="container-luxe absolute inset-0 flex flex-col justify-center py-16">
          <div className="max-w-2xl">
            <div className="eyebrow drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">{t("hero.eyebrow")}</div>
            <div className="py-4 sm:py-5 md:py-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <img src={damacLogo} alt="DAMAC" className="h-8 w-auto sm:h-11 md:h-16"/>
            </div>
            <div className="mt-1 text-xl uppercase tracking-[0.4em] text-foreground/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:text-2xl md:text-3xl">
              Properties
            </div>
            <p className="mt-6 max-w-xl text-sm text-foreground/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-base md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 md:mt-10">
              <Link to="/services" className="btn-ghost-gold backdrop-blur-sm">
                {t("hero.cta")} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
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
