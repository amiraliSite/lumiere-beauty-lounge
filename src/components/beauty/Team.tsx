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
    <section id="team" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.team.kicker} title={t.team.title} subtitle={t.team.subtitle} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-soft-lg">
                <div className="relative overflow-hidden">
                  <Image
                    src={asset(PHOTOS[i % PHOTOS.length])}
                    alt={m.name}
                    width={520}
                    height={620}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="absolute top-3 end-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-rose-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
                <div className="relative -mt-8 rounded-t-2xl bg-card p-5">
                  <h3 className="text-lg font-bold">{m.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-primary">{m.role}</p>
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
