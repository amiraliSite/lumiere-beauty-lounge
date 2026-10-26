"use client";

import Image from "next/image";
import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="pricing" className="relative w-full overflow-hidden">
      {/* full-bleed cinematic backdrop */}
      <div className="absolute inset-0">
        <Image
          src={asset("/images/band-noir-1.png")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative w-full px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
        <SectionHeading badge={t.pricing.kicker} title={t.pricing.title} subtitle={t.pricing.subtitle} />
        {/* uniform gap-4 */}
        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-3">
          {t.pricing.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur transition-all duration-300",
                  plan.featured
                    ? "border-primary/50 bg-card/80 shadow-glow ring-1 ring-primary/30 lg:scale-[1.03]"
                    : "glass-card hover:border-primary/30"
                )}
              >
                {plan.featured && (
                  <span className="absolute top-0 end-0 flex items-center gap-1.5 rounded-bl-2xl bg-accent-gradient px-4 py-1.5 text-xs font-bold text-primary-foreground">
                    <Crown className="h-3.5 w-3.5" />
                    ★
                  </span>
                )}
                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{plan.desc}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className={cn("text-4xl font-black tracking-tight", plan.featured && "text-gradient")}>
                    {plan.price}
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-7 flex flex-col gap-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-6">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-primary-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollTo("booking")}
                  className={cn(
                    "mt-8 w-full rounded-full py-6 text-base",
                    plan.featured ? "shadow-glow" : "border-primary/40 bg-transparent"
                  )}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {t.nav.book}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted-foreground">{t.pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
