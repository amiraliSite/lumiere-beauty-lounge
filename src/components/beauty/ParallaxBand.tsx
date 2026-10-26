"use client";

import Image from "next/image";
import { Reveal } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

/**
 * Full-bleed parallax band — edge-to-edge cinematic image with an
 * elegant quote overlay. `bg-fixed` style parallax via fixed attachment.
 */
export default function ParallaxBand({
  image,
  quote,
  author,
}: {
  image: string;
  quote: string;
  author: string;
}) {
  const { t } = useLanguage();
  return (
    <section className="relative w-full overflow-hidden">
      {/* parallax layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${asset(image)})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative flex w-full flex-col items-center gap-6 px-4 py-28 text-center sm:px-6 lg:py-40">
        <Reveal>
          <span className="font-display text-6xl leading-none text-primary">“</span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto max-w-4xl font-display text-2xl font-semibold italic leading-relaxed text-foreground sm:text-3xl lg:text-4xl">
            {quote}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-2">
            <span className="h-px w-16 bg-primary/60" />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">{author}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
