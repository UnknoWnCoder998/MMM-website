import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";

const navItems = [
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/projects", key: "nav.projects" },
  { to: "/insights", key: "nav.insights" },
] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container-luxe flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-4" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl tracking-[0.3em] text-foreground">
            {t("brand.name")}
          </span>
          <span className="hidden h-8 w-px bg-border/60 sm:block" />
          <span className="hidden flex-col text-[9px] uppercase leading-tight tracking-[0.28em] text-muted-foreground sm:flex">
            <span>{t("brand.tagline1")}</span>
            <span>{t("brand.tagline2")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-xs uppercase tracking-[0.22em] transition-colors hover:text-gold ${
                  active ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} setLang={setLang} />
          <Link to="/contact" className="btn-ghost-gold hidden md:inline-flex">
            {t("nav.cta")}
          </Link>
          <button
            className="rounded-sm border border-border p-2 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/40 bg-background/95 lg:hidden">
          <nav className="container-luxe flex flex-col gap-4 py-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.22em] text-muted-foreground hover:text-gold"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-2 self-start">
              {t("nav.cta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: Lang[] = ["ru", "en", "ar"];
  return (
    <div className="flex items-center gap-1 rounded-sm border border-border/60 p-1 text-[10px] uppercase tracking-[0.2em]">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-sm px-2 py-1 transition-colors ${
            lang === l ? "bg-gold text-ink" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
