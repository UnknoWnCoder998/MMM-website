import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { formatPrice, type Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useI18n();
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block overflow-hidden border border-border/50 bg-card transition-colors hover:border-gold/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          width={1280}
          height={960}
          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-sm border border-gold/40 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur">
          {project.location[lang]}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl text-foreground">{project.name}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <p className="text-sm text-muted-foreground">{project.type[lang]}</p>
        <div className="hairline" />
        <div className="flex items-end justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <div>
            <div className="opacity-70">{t("project.from")}</div>
            <div className="mt-1 font-display text-lg normal-case tracking-normal text-gold">
              {formatPrice(project.priceFromAed, lang)}
            </div>
          </div>
          <div className="text-end">
            <div className="opacity-70">{t("project.handover")}</div>
            <div className="mt-1 font-display text-lg normal-case tracking-normal text-foreground">
              {project.handover}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
