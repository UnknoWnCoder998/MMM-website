import { useI18n } from "@/lib/i18n";

// Contact number used for both WhatsApp and phone calls.
// Format: international, no spaces, no leading zeros after country code.
const WHATSAPP_NUMBER = "971508749903";
const WHATSAPP_MESSAGE = "Здравствуйте! Хочу узнать больше о проектах DAMAC.";

export function WhatsAppButton() {
  const { t } = useI18n();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("contact.whatsapp")}
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" />
      <WhatsAppIcon className="relative h-7 w-7 text-white" />
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.657 4.522 1.797 6.383L4 29l7.83-1.756A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.6a9.55 9.55 0 0 1-4.87-1.334l-.35-.207-4.65 1.043 1.06-4.53-.228-.365A9.55 9.55 0 0 1 5.4 15c0-5.85 4.755-10.6 10.604-10.6S26.6 9.15 26.6 15 21.85 24.6 16.004 24.6Zm5.44-7.94c-.297-.15-1.755-.868-2.028-.966-.272-.099-.47-.148-.668.148-.198.297-.766.966-.94 1.164-.173.198-.347.223-.643.074-.297-.149-1.253-.462-2.386-1.472-.882-.787-1.478-1.76-1.651-2.057-.173-.297-.019-.457.13-.605.134-.133.297-.347.446-.52.148-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.668-1.61-.916-2.204-.241-.579-.486-.5-.668-.51l-.569-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478 0 1.462 1.065 2.874 1.213 3.072.148.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.755-.717 2.003-1.41.248-.693.248-1.286.173-1.41-.074-.124-.272-.198-.569-.347Z" />
    </svg>
  );
}
