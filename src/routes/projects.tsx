import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "DAMAC Projects — MMM Investment Advisory" },
      {
        name: "description",
        content:
          "Browse flagship DAMAC Properties projects in Dubai — Cavalli Tower, DAMAC Bay, Safa One, DAMAC Lagoons, Volta and more.",
      },
      { property: "og:title", content: "DAMAC Projects — MMM Investment Advisory" },
      { property: "og:description", content: "Flagship DAMAC residences and villas in Dubai." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <section className="border-b border-border/40 bg-ink py-20">
        <div className="container-luxe">
          <div className="eyebrow">{t("nav.projects")}</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-foreground md:text-6xl">
            {lang === "ru"
              ? "Каталог проектов DAMAC"
              : lang === "ar"
                ? "كتالوج مشاريع داماك"
                : "DAMAC project catalogue"}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("section.featured.subtitle")}</p>
        </div>
      </section>

      <section className="container-luxe py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
