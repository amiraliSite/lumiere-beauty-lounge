"use client";

import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "./shared";
import { useLanguage } from "./LanguageProvider";

const LINKS = [
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "gallery", key: "gallery" },
  { id: "team", key: "team" },
  { id: "pricing", key: "pricing" },
  { id: "faq", key: "faq" },
] as const;

const SERVICE_KEYS = [0, 1, 2, 4, 6] as const;

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-card/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-7 text-muted-foreground">{t.footer.about}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-foreground">
            {t.footer.linksTitle}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.nav[l.key]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-foreground">
            {t.footer.servicesTitle}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {SERVICE_KEYS.map((idx) => (
              <li key={idx}>
                <button
                  onClick={() => scrollTo("services")}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.services.items[idx].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-foreground">
            {t.footer.contactTitle}
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="leading-6">{t.contact.addressValue}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span dir="ltr">{t.contact.phoneValue}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span dir="ltr">{t.contact.emailValue}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-5">
        <p className="flex flex-wrap items-center justify-center gap-1.5 px-4 text-center text-xs text-muted-foreground">
          {t.footer.rights}
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
        </p>
      </div>
    </footer>
  );
}
