"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute top-1/3 -start-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      {/* edge-to-edge: image bleeds to the screen edge on one side */}
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-0">
        {/* Image side — bleeds edge to edge */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative w-full lg:me-[-6rem]">
            <div className="absolute -inset-4 -z-10 bg-gradient-to-tr from-primary/25 via-transparent to-primary/15 blur-2xl" />
            <div className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[540px] lg:rounded-e-[3rem]">
              <Image
                src={asset("/images/band-noir-2.png")}
                alt={t.about.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent lg:bg-gradient-to-l lg:from-background/80 lg:via-transparent lg:to-transparent rtl:lg:bg-gradient-to-r" />
            </div>
            {/* floating years badge */}
            <div className="absolute -bottom-7 end-6 rounded-2xl border border-primary/30 bg-card/90 px-6 py-4 text-center shadow-glow backdrop-blur sm:end-10">
              <p className="text-3xl font-black text-gradient">{t.about.yearsBadge}</p>
              <p className="text-xs font-medium text-muted-foreground">{t.about.yearsLabel}</p>
            </div>
          </div>
        </Reveal>

        {/* Text side */}
        <div className="order-1 px-4 sm:px-6 lg:order-2 lg:ps-24 lg:pe-10 xl:pe-24">
          <SectionHeading badge={t.about.kicker} title={t.about.title} align="start" />
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">{t.about.p1}</p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">{t.about.p2}</p>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.about.features.map((f, i) => (
              <Reveal key={f} delay={0.34 + i * 0.07}>
                <div className="flex items-start gap-2.5 rounded-xl glass-card px-4 py-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium leading-6">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
