"use client";

import { motion } from "framer-motion";
import {
  Brush,
  Crown,
  Eye,
  Flower2,
  Hand,
  Leaf,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  brush: Brush,
  hand: Hand,
  scissors: Scissors,
  eye: Eye,
  flower: Flower2,
  crown: Crown,
  leaf: Leaf,
};

export default function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.services.kicker}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-soft-lg"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-[shine_1.2s_ease-out]" />
                  </div>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-accent/30 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-7 text-muted-foreground">{item.desc}</p>
                  <div className="absolute bottom-0 inset-x-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-amber-500 transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
