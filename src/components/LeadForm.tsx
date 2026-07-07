import { useState } from "react";
import { z } from "zod";
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
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
      <div className="border border-gold/50 bg-card p-8 text-center">
        <p className="font-display text-2xl text-gold">{t("form.sent")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-border/60 bg-card p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label={t("form.name")} required />
        <Field name="phone" label={t("form.phone")} required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="email" label={t("form.email")} type="email" />
        <Field name="project" label={t("form.project")} defaultValue={defaultProject} />
      </div>
      <label className="block">
        <span className="eyebrow">{t("form.message")}</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          className="mt-2 w-full border border-input bg-background/40 px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
        />
      </label>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-gold mt-2 justify-self-start disabled:opacity-60">
        {submitting ? "..." : t("form.submit")}
      </button>
      <p className="text-[11px] text-muted-foreground">{t("form.privacy")}</p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        maxLength={255}
        className="mt-2 w-full border border-input bg-background/40 px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
      />
    </label>
  );
}
