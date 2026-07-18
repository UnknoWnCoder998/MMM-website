import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useI18n } from "@/lib/i18n";
import { formatPrice, imageFocalPoints, projects } from "@/lib/projects";
import { LeadForm } from "@/components/LeadForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project — MMM" }] };
    return {
      meta: [
        { title: `${p.name} — DAMAC · MMM Investment Advisory` },
        { name: "description", content: p.description.en },
        { property: "og:title", content: `${p.name} — DAMAC` },
        { property: "og:description", content: p.description.en },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-luxe py-32 text-center">
      <h1 className="font-display text-4xl text-foreground">Project not found</h1>
      <Link to="/projects" className="btn-ghost-gold mt-6 inline-flex">
        Back to projects
      </Link>
    </div>
  ),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const autoplay = useRef(
    Autoplay({ delay: 300, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <>
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          width={1280}
          height={960}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: imageFocalPoints[project.image] ?? "50% 50%" }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/40 to-ink" />
        <div className="container-luxe flex min-h-[70vh] flex-col justify-end pb-16 pt-32">
          <Link
            to="/projects"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold hover:text-gold-soft"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {t("nav.projects")}
          </Link>
          <div className="eyebrow">DAMAC · {project.location[lang]}</div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-7xl">{project.name}</h1>
        </div>
      </section>

      <section className="border-b border-border/40 bg-ink">
        <div className="container-luxe grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          <Spec label={t("project.from")} value={formatPrice(project.priceFromAed, lang)} highlight />
          <Spec label={t("project.handover")} value={project.handover} />
          <Spec label={t("project.type")} value={project.type[lang]} />
          <Spec label={t("project.payment")} value={project.paymentPlan} />
        </div>
      </section>

      <section className="container-luxe grid gap-16 py-20 lg:grid-cols-[3fr_2fr]">
        <div>
          <div className="eyebrow">{t("project.about")}</div>
          <p className="mt-4 font-display text-2xl leading-relaxed text-foreground md:text-3xl">
            {project.description[lang]}
          </p>

          <div className="mt-12">
            <div className="eyebrow">{t("project.amenities")}</div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.amenities.map((a: { ru: string; en: string; ar: string }, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-l border-gold/40 bg-card/40 px-4 py-3 text-sm text-foreground"
                >
                  <span className="text-gold">◆</span>
                  {a[lang]}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <div className="eyebrow">{t("project.gallery")}</div>
            <Carousel
              className="mt-6"
              opts={{ loop: true, align: "start" }}
              plugins={[autoplay.current]}
            >
              <CarouselContent>
                {project.gallery.map((src: string, i: number) => (
                  <CarouselItem key={i} className="sm:basis-1/2 lg:basis-1/3">
                    <img
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      loading="lazy"
                      width={1280}
                      height={960}
                      className="aspect-[4/3] w-full object-cover"
                      style={{ objectPosition: imageFocalPoints[src] ?? "50% 50%" }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {project.gallery.length > 1 && (
                <>
                  <CarouselPrevious className="left-2 border-gold/40 bg-ink/70 text-gold hover:bg-ink hover:text-gold-soft" />
                  <CarouselNext className="right-2 border-gold/40 bg-ink/70 text-gold hover:bg-ink hover:text-gold-soft" />
                </>
              )}
            </Carousel>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="eyebrow">{t("project.request")}</div>
          <div className="mt-4">
            <LeadForm defaultProject={project.name} />
          </div>
        </aside>
      </section>
    </>
  );
}

function Spec({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div
        className={
          highlight
            ? "text-price mt-2 text-2xl text-gold md:text-3xl"
            : "mt-2 font-display text-xl text-foreground"
        }
      >
        {value}
      </div>
    </div>
  );
}
