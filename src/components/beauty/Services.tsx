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
    <section id="services" className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute -end-40 top-24 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl animate-blob-delayed" />

      <div className="w-full px-4 sm:px-6 lg:px-10">
        <SectionHeading
          badge={t.services.kicker}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />
        {/* uniform gap-4 everywhere — consistent rhythm */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <Reveal key={item.title} delay={(i % 4) * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl glass-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shine_1.2s_ease-out] rtl:bg-gradient-to-l" />
                  </div>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gradient text-primary-foreground shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-7 text-muted-foreground">{item.desc}</p>
                  <span className="absolute -bottom-5 -end-3 select-none font-display text-7xl font-black text-primary/5 transition-colors duration-300 group-hover:text-primary/15">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 h-0.5 origin-left scale-x-0 bg-accent-gradient transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
