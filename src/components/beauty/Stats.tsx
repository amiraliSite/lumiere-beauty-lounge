"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export default function Stats() {
  const { t } = useLanguage();
  return (
    <section aria-label="Stats" className="relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto -mt-2 max-w-7xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary via-primary/90 to-rose-800 p-8 shadow-soft-lg sm:gap-6 lg:grid-cols-4 lg:p-10">
          {t.stats.items.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <span className="text-3xl font-extrabold text-white sm:text-4xl lg:text-[2.6rem]">
                <Counter value={stat.value} suffix={stat.suffix} locale={t.dir === "rtl" ? "fa" : "de"} />
              </span>
              <p className="text-sm font-medium text-white/85">{stat.label}</p>
            </div>
          ))}
        </div>
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
