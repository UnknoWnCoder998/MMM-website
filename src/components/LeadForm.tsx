import { useRef, useState } from "react";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  project: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

// Адрес backend API. Берётся из переменной окружения VITE_API_URL
// (см. .env / .env.example в корне проекта), с фолбэком на локальный сервер.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function LeadForm({ defaultProject }: { defaultProject?: string }) {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    // Anti-spam: honeypot field is invisible to real users but bots that
    // auto-fill every input will populate it. Submitted too fast after
    // mount is also a strong bot signal. In both cases we pretend the
    // submission succeeded (so the bot doesn't retry) without actually
    // sending anything to the backend.
    const honeypot = fd.get("company");
    const tooFast = Date.now() - mountedAt.current < 1500;
    if (honeypot || tooFast) {
      setSent(true);
      return;
    }

    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }

      setSent(true);
    } catch (err) {
      console.error("Lead form submit error:", err);
      setError(t("form.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 border border-gold/40 bg-card px-8 py-14 text-center">
        <CheckCircle2 className="h-10 w-10 text-gold" strokeWidth={1.25} />
        <p className="font-display text-2xl text-foreground">{t("form.sent")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 border border-border/60 bg-card p-6 md:p-8">
      {/* Honeypot: real users never see or reach this field. Any bot that
          auto-fills the whole form will fill it too, flagging itself. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
        <Field
          name="name"
          label={t("form.name")}
          required
          autoComplete="name"
        />
        <Field
          name="phone"
          label={t("form.phone")}
          type="tel"
          placeholder={t("form.phone.placeholder")}
          required
          autoComplete="tel"
        />
      </div>
      <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
        <Field
          name="email"
          label={t("form.email")}
          type="email"
          placeholder={t("form.email.placeholder")}
          autoComplete="email"
        />
        <Field
          name="project"
          label={t("form.project")}
          placeholder={t("form.project.placeholder")}
          defaultValue={defaultProject}
          autoComplete="off"
        />
      </div>

      <label className="flex flex-col gap-2">
        <span className="eyebrow flex min-h-[2.25rem] items-end leading-tight">{t("form.message")}</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          placeholder={t("form.message.placeholder")}
          className="w-full resize-none border border-input bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/50 focus:border-gold focus:bg-background/60"
        />
      </label>

      {error && (
        <div className="flex items-start gap-2.5 border-l-2 border-destructive bg-destructive/5 px-4 py-3">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
          <span className="text-xs text-destructive">{error}</span>
        </div>
      )}

      <div className="hairline" />

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-muted-foreground sm:max-w-[60%]">{t("form.privacy")}</p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-gold w-full shrink-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              {t("form.submit")}
              <Send className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  defaultValue,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow flex min-h-[2.25rem] items-end leading-tight">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        maxLength={255}
        className="w-full border border-input bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/50 focus:border-gold focus:bg-background/60"
      />
    </label>
  );
}
