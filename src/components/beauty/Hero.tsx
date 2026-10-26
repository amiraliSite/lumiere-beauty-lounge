"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarCheck, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

export default function Hero() {
  const { t, isRtl } = useLanguage();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* full-bleed cinematic background — ground to sky */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src={asset("/images/hero-noir.png")}
            alt={t.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/35 to-background/20 rtl:bg-gradient-to-l" />
        {/* ambient accent blobs */}
        <div className="pointer-events-none absolute -bottom-32 -start-32 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -top-24 end-[-8%] h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl animate-blob-delayed" />
        {/* grain */}
        <div className="absolute inset-0 grain" />
      </div>

      <div className="flex w-full flex-col gap-8 px-4 pb-24 pt-32 sm:px-6 lg:px-10 lg:pb-28 lg:pt-36">
        {/* Copy */}
        <div className="flex max-w-4xl flex-col items-start gap-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur"
          >
            <Sparkle className="h-4 w-4" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.2rem]"
          >
            {t.hero.titleA}
            <br />
            <span className="text-gradient">{t.hero.titleB}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-base leading-8 text-foreground/80 sm:text-lg"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="gap-2 rounded-full px-7 shadow-glow" onClick={() => scrollTo("booking")}>
              <CalendarCheck className="h-5 w-5" />
              {t.hero.ctaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full border-primary/40 bg-background/40 px-7 backdrop-blur"
              onClick={() => scrollTo("services")}
            >
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
                {["/images/team-1.png", "/images/team-2.png", "/images/team-3.png"].map((src, i) => (
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
                <div className="flex items-center gap-1 text-primary">
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
      </div>

      {/* bottom edge fade + scroll hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        onClick={() => scrollTo("about")}
        aria-label="Scroll"
        className="absolute bottom-6 start-1/2 z-10 -translate-x-1/2 text-primary/80 transition-colors hover:text-primary rtl:translate-x-1/2"
      >
        <ArrowDown className="h-7 w-7 animate-floaty" />
      </motion.button>
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
