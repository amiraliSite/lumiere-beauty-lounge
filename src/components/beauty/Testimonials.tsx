"use client";

import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute -start-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -end-24 bottom-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.testimonials.kicker}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 4) * 0.08} className="h-full">
              <figure className="relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-soft">
                <Quote className="absolute end-5 top-5 h-8 w-8 text-primary/15" />
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-8 text-foreground/85">
                  “{item.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500 text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
