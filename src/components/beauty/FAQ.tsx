"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

export default function FAQ() {
  const { t } = useLanguage();
  return (
    <section id="faq" className="relative w-full py-20 lg:py-32">
      {/* editorial two-column layout: sticky heading left, accordion right */}
      <div className="grid w-full gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading badge={t.faq.kicker} title={t.faq.title} subtitle={t.faq.subtitle} align="start" />
        </div>
        <Reveal delay={0.15}>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl glass-card border px-5 last:border-b"
              >
                <AccordionTrigger className="py-5 text-start text-base font-bold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-8 text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
