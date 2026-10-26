"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function Stats() {
  const { t } = useLanguage();
  return (
    <section aria-label="Stats" className="relative w-full overflow-hidden border-y border-primary/20">
      {/* accent gradient wash — full bleed */}
      <div className="absolute inset-0 bg-accent-gradient opacity-[0.14]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
      <div className="absolute -top-24 start-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-blob" />

      <div className="relative grid w-full grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-10 lg:py-20">
        {t.stats.items.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center lg:border-s lg:border-primary/15 first:border-s-0">
            <span className="text-4xl font-black text-gradient tabular-nums sm:text-5xl lg:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} locale={t.dir === "rtl" ? "fa" : "de"} />
            </span>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  locale,
}: {
  value: number;
  suffix: string;
  locale: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const formatted =
    locale === "fa"
      ? display.toLocaleString("fa-IR")
      : display.toLocaleString("de-DE");

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}
