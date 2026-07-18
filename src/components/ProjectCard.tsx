import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { formatPrice, imageFocalPoints, type Project } from "@/lib/projects";
import { LeadForm } from "@/components/LeadForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function ProjectCard({ project }: { project: Project }) {
  const { t, lang } = useI18n();
  const images = project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = () => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, 800);
  };

  const stopCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setActiveIndex(0);
  };

  useEffect(() => () => stopCycling(), []);

  return (
    <>
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group block w-full overflow-hidden border border-border/50 bg-card text-left transition-colors hover:border-gold/60"
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${project.name} ${i + 1}`}
            loading="lazy"
            width={1280}
            height={960}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:scale-105 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionProperty: "opacity, transform",
              transitionDuration: "500ms, 1200ms",
              objectPosition: imageFocalPoints[src] ?? "50% 50%",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-sm border border-gold/40 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur">
          {project.location[lang]}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === activeIndex ? "bg-gold" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
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
            <div className="text-price mt-1 text-xl normal-case text-gold">
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
    </button>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">{project.name}</DialogTitle>
          <DialogDescription>{t("form.project")}</DialogDescription>
        </DialogHeader>
        <LeadForm defaultProject={project.name} />
      </DialogContent>
    </Dialog>
    </>
  );
}
