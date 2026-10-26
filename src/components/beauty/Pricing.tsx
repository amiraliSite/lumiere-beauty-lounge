"use client";

import { Check, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { cn } from "@/lib/utils";

export default function Pricing() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="pricing" className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.pricing.kicker} title={t.pricing.title} subtitle={t.pricing.subtitle} />
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-8 transition-shadow",
                  plan.featured
                    ? "border-primary/40 shadow-soft-lg ring-2 ring-primary/25 lg:scale-[1.03]"
                    : "border-border/60 shadow-sm hover:shadow-soft"
                )}
              >
                {plan.featured && (
                  <span className="absolute top-0 end-0 flex items-center gap-1.5 rounded-bl-2xl bg-gradient-to-r from-primary to-rose-700 px-4 py-1.5 text-xs font-bold text-white">
                    <Crown className="h-3.5 w-3.5" />
                    ★
                  </span>
                )}
                <h3 className="text-xl font-extrabold">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{plan.desc}</p>
                <div className="mt-6 flex items-end gap-2">
                  <span className={cn("text-4xl font-extrabold tracking-tight", plan.featured && "text-gradient")}>
                    {plan.price}
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-7 flex flex-col gap-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm leading-6">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
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
                    plan.featured ? "shadow-soft" : "variant-outline border-primary/30"
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
