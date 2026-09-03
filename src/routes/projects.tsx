import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { fetchCrmProjects } from "@/lib/crm-properties";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/projects")({
  // Fetched on the server for each request/build via TanStack Start's
  // loader. Properties come from the CRM's public feed
  // (crm.mmmestate.com) — see src/lib/crm-properties.ts. Whatever an
  // agent has checked "Publish to Website" for in the CRM shows up
  // here automatically next time this route is rendered/rebuilt.
  loader: async () => {
    const projects = await fetchCrmProjects();
    return { projects };
  },
  head: () => ({
    meta: [
      { title: "Projects — MMM Investment Advisory" },
      {
        name: "description",
        content: "Browse current property listings from MMM Investment Advisory in the UAE.",
      },
      { property: "og:title", content: "Projects — MMM Investment Advisory" },
      { property: "og:description", content: "Current UAE property listings." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();
  const { t, lang } = useI18n();
  return (
    <>
      <section className="border-b border-border/40 bg-ink py-20">
        <div className="container-luxe">
          <div className="eyebrow">{t("nav.projects")}</div>
          <h1 className="mt-3 max-w-3xl font-display text-5xl text-foreground md:text-6xl">
            {lang === "ru"
              ? "Каталог проектов"
              : lang === "ar"
                ? "كتالوج المشاريع"
                : "Project catalogue"}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("section.featured.subtitle")}</p>
        </div>
      </section>

      <section className="container-luxe py-20">
        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">
            {lang === "ru"
              ? "Скоро здесь появятся новые объекты."
              : lang === "ar"
                ? "قريباً ستتوفر عقارات جديدة هنا."
                : "New listings will appear here shortly."}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
