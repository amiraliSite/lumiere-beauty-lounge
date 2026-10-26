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
    <section id="faq" className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.faq.kicker} title={t.faq.title} subtitle={t.faq.subtitle} />
        <Reveal delay={0.15} className="mt-12">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-border/60 bg-card px-5 shadow-sm last:border-b"
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
