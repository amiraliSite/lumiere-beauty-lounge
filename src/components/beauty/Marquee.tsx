"use client";

import { useLanguage } from "./LanguageProvider";

/** Full-width luxury ticker strip — edge to edge, ground to sky. */
export default function Marquee() {
  const { t } = useLanguage();
  const words = t.services.items.map((s) => s.title);

  // two identical halves for a seamless -50% loop
  const Half = () => (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl font-bold italic tracking-wide text-foreground/85 sm:text-3xl">
            {w}
          </span>
          <Sparkle className="h-4 w-4 shrink-0 text-primary" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden border-y border-primary/20 bg-gradient-to-r from-background via-secondary/60 to-background py-5 mask-fade-x">
      <div className="flex w-max animate-marquee">
        <Half />
        <Half />
      </div>
    </div>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2c.5 4 2 6.5 3.7 7.7C17.2 10.8 19 11.5 21 11.6c-4 .5-6.5 2-7.7 3.7-1 1.4-1.6 3.2-1.7 5.1-.5-4-2-6.5-3.7-7.7C6.3 11.8 4.5 11.1 3 11c4-.5 6.5-2 7.7-3.7C11.6 6 12.1 4 12 2z" />
    </svg>
  );
}
