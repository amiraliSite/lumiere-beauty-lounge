"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";

export function SparkleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lumiereGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e11d63" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#lumiereGrad)" />
      <path
        fill="#ffffff"
        d="M32 12c1.1 8.9 4.6 14.5 8.4 17.2 3.1 2.3 7.2 3.6 11.6 3.8-8.9 1.1-14.5 4.6-17.2 8.4-2.3 3.1-3.6 7.2-3.8 11.6-1.1-8.9-4.6-14.5-8.4-17.2-3.1-2.3-7.2-3.6-11.6-3.8 8.9-1.1 14.5-4.6 17.2-8.4 2.3-3.1 3.6-7.2 3.8-11.6z"
      />
    </svg>
  );
}

export function BrandLogo({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <SparkleLogo className="h-9 w-9 drop-shadow-sm" />
      <div className="leading-none">
        <span className="block text-xl font-extrabold tracking-tight text-foreground font-display">
          {t.brand.name}
        </span>
        <span className="block text-[10px] font-medium text-primary">{t.brand.tagline}</span>
      </div>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={cn("flex flex-col gap-4", alignCls)}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          {badge}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-[1.2]">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
