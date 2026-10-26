"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarCheck, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

export default function Hero() {
  const { t, isRtl } = useLanguage();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative overflow-hidden pt-28 lg:pt-36">
      {/* soft blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 start-[-10%] h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-blob" />
        <div className="absolute top-40 end-[-8%] h-[28rem] w-[28rem] rounded-full bg-accent/40 blur-3xl animate-blob-delayed" />
        <div className="absolute bottom-[-6rem] start-1/3 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-blob" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            <Sparkle className="h-4 w-4" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t.hero.titleA}{" "}
            <span className="text-gradient">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="gap-2 rounded-full px-7 shadow-soft" onClick={() => scrollTo("booking")}>
              <CalendarCheck className="h-5 w-5" />
              {t.hero.ctaPrimary}
            </Button>
            <Button size="lg" variant="outline" className="gap-2 rounded-full px-7" onClick={() => scrollTo("services")}>
              {t.hero.ctaSecondary}
              <Arrow className="h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {["/images/team-1.jpg", "/images/team-2.jpg", "/images/team-3.jpg"].map((src, i) => (
                  <Image
                    key={i}
                    src={asset(src)}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ms-1 text-sm font-bold text-foreground">{t.hero.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.hero.reviews}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-primary">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 animate-pulse-ring">
                <Phone className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-muted-foreground">{t.hero.callNow}</p>
                <p className="text-sm font-bold" dir="ltr">{t.contact.phoneValue}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative mx-auto max-w-[540px]">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/25 via-accent/30 to-primary/10 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/40 shadow-soft-lg">
              <Image
                src={asset("/images/salon-1.jpg")}
                alt={t.hero.imageAlt}
                width={1080}
                height={720}
                priority
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[480px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-6 start-4 rounded-2xl bg-card/95 p-4 shadow-soft-lg backdrop-blur animate-floaty sm:start-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-none">{t.stats.items[1].value.toLocaleString("en").replace(",", "٬")}+</p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.stats.items[1].label}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -top-5 end-4 rounded-2xl bg-card/95 px-4 py-3 shadow-soft-lg backdrop-blur animate-floaty-slow sm:end-8"
            >
              <p className="text-2xl font-extrabold leading-none text-gradient">{t.about.yearsBadge}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{t.about.yearsLabel}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2c.5 4 2 6.5 3.7 7.7C17.2 10.8 19 11.5 21 11.6c-4 .5-6.5 2-7.7 3.7-1 1.4-1.6 3.2-1.7 5.1-.5-4-2-6.5-3.7-7.7C6.3 11.8 4.5 11.1 3 11c4-.5 6.5-2 7.7-3.7C11.6 6 12.1 4 12 2z" />
    </svg>
  );
}
