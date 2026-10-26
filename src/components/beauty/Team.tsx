"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

const PHOTOS = ["/images/team-1.png", "/images/team-2.png", "/images/team-3.png", "/images/team-4.png"];

export default function Team() {
  const { t } = useLanguage();
  return (
    <section id="team" className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute -start-32 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-10">
        <SectionHeading badge={t.team.kicker} title={t.team.title} subtitle={t.team.subtitle} />
        {/* uniform gap-4 */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border/40 glass-card transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
                <div className="relative overflow-hidden">
                  <Image
                    src={asset(PHOTOS[i % PHOTOS.length])}
                    alt={m.name}
                    width={520}
                    height={620}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="absolute top-3 end-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full glass text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
                <div className="relative -mt-10 p-5">
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-gradient inline-block">{m.role}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
