"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Image side */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-[520px]">
            <div className="absolute -inset-3 -z-10 rounded-[2.2rem] bg-gradient-to-br from-accent/50 to-primary/20 blur-lg" />
            <div className="overflow-hidden rounded-[1.8rem] border-4 border-white shadow-soft-lg dark:border-white/10">
              <Image
                src={asset("/images/facial-1.jpg")}
                alt={t.about.imageAlt}
                width={900}
                height={640}
                className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[440px]"
              />
            </div>
            <div className="absolute -bottom-7 end-6 rounded-2xl bg-gradient-to-br from-primary to-rose-700 px-6 py-4 text-center shadow-soft-lg">
              <p className="text-3xl font-extrabold text-white">{t.about.yearsBadge}</p>
              <p className="text-xs font-medium text-white/85">{t.about.yearsLabel}</p>
            </div>
          </div>
        </Reveal>

        {/* Text side */}
        <div className="order-1 lg:order-2">
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
                <div className="flex items-start gap-2.5 rounded-xl border border-primary/15 bg-secondary/60 px-4 py-3">
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
