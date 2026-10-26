"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();

  const items = [
    { icon: MapPin, label: t.contact.address, value: t.contact.addressValue, ltr: false },
    { icon: Phone, label: t.contact.phone, value: t.contact.phoneValue, ltr: true },
    { icon: Mail, label: t.contact.email, value: t.contact.emailValue, ltr: true },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, ltr: false },
    { icon: MessageCircle, label: t.contact.whatsapp, value: t.contact.whatsappValue, ltr: true },
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden py-20 lg:py-32">
      <div className="pointer-events-none absolute end-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-10">
        <SectionHeading badge={t.contact.kicker} title={t.contact.title} subtitle={t.contact.subtitle} />
        {/* uniform gap-4 */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={(i % 3) * 0.08} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <div className="group flex h-full items-start gap-4 rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-gradient text-primary-foreground shadow-glow transition-transform group-hover:scale-110">
                  <item.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground" dir={item.ltr ? "ltr" : undefined}>
                    {item.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* WhatsApp CTA card */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-accent-gradient p-6 text-primary-foreground shadow-glow">
              <div>
                <p className="text-lg font-extrabold">{t.contact.whatsapp}</p>
                <p className="mt-2 text-sm leading-7 opacity-85" dir="ltr">
                  {t.contact.whatsappValue}
                </p>
              </div>
              <Button
                asChild
                variant="secondary"
                className="w-fit gap-2 rounded-full bg-background/85 text-foreground backdrop-blur hover:bg-background"
              >
                <a href="https://wa.me/4917612345678" target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
