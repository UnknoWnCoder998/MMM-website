import { MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const WHATSAPP_NUMBER = "971500000000"; // TODO: replace with the real MMM WhatsApp number

export function WhatsAppButton() {
  const { lang } = useI18n();
  const text =
    lang === "ru"
      ? "Здравствуйте! Хочу узнать больше о проектах DAMAC."
      : lang === "ar"
        ? "مرحباً! أرغب في معرفة المزيد عن مشاريع داماك."
        : "Hi! I'd like to learn more about DAMAC projects.";

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[var(--shadow-luxe)] transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
