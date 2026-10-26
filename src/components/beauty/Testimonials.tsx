"use client";

import { Quote, Star } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

export default function Testimonials() {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute -start-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -end-24 bottom-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-blob-delayed" />

      <div className="w-full px-4 sm:px-6 lg:px-10">
        <SectionHeading
          badge={t.testimonials.kicker}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />
        {/* uniform gap-4 */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={(i % 4) * 0.08} className="h-full">
              <figure className="relative flex h-full flex-col rounded-2xl glass-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
                <Quote className="absolute end-5 top-5 h-8 w-8 text-primary/20" />
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-8 text-foreground/85">
                  “{item.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-primary-foreground">
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
