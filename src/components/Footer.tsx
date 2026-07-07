import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { Mail, MapPin, Phone } from "lucide-react";
export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/40 bg-ink">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-[0.3em] text-foreground">
              {t("brand.name")}
            </span>
            <span className="h-8 w-px bg-border/60" />
            <span className="flex flex-col text-[9px] uppercase leading-tight tracking-[0.25em] text-muted-foreground">
              <span>{t("brand.tagline1")}</span>
              <span>{t("brand.tagline2")}</span>
            </span>
          </div>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.nav")}</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-gold">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-muted-foreground hover:text-gold">
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link to="/projects" className="text-muted-foreground hover:text-gold">
                {t("nav.projects")}
              </Link>
            </li>
            <li>
              <Link to="/insights" className="text-muted-foreground hover:text-gold">
                {t("nav.insights")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-gold">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container-luxe flex flex-col items-center gap-2 py-8 text-center">
          <p className="font-display text-sm italic text-muted-foreground">
            {t("footer.signature")}
          </p>
        </div>
      </div>

      <div className="border-t border-border/30">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <span>
            © {new Date().getFullYear()} MMM Investment Advisory. {t("footer.rights")}
          </span>
          <span className="uppercase tracking-[0.22em]">{t("badge.partner")} DAMAC</span>
        </div>
      </div>
    </footer>
  );
}
