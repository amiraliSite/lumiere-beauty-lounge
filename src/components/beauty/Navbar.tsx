"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Globe, Menu, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import { useAccent, ACCENTS, ACCENT_SWATCH, type Accent } from "./AccentTheme";
import { BrandLogo } from "./shared";
import { dictionaries, localeOrder } from "@/lib/i18n";

const LINKS = [
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "gallery", key: "gallery" },
  { id: "team", key: "team" },
  { id: "pricing", key: "pricing" },
  { id: "testimonials", key: "testimonials" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
] as const;

const THEME_KEY: Record<Accent, "themeGold" | "themeRose" | "themeAmethyst" | "themeEmerald"> = {
  gold: "themeGold",
  rose: "themeRose",
  amethyst: "themeAmethyst",
  emerald: "themeEmerald",
};

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const { accent, setAccent } = useAccent();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...LINKS.map((l) => l.id), "booking"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const themeSwatch = (a: Accent) => {
    const s = ACCENT_SWATCH[a];
    return (
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-white/20"
        style={{ background: `linear-gradient(135deg, ${s.a}, ${s.b})` }}
      >
        {accent === a && <Check className="h-3.5 w-3.5 text-white drop-shadow" strokeWidth={3} />}
      </span>
    );
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-soft bg-background/80 border-b border-border/60" : "bg-transparent"
      )}
    >
      <div className="flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px] lg:px-10">
        <button onClick={() => scrollTo("home")} aria-label="Lumiere" className="shrink-0">
          <BrandLogo />
        </button>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary",
                active === link.id ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t.nav[link.key]}
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Accent theme picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full px-3" aria-label={t.common.theme}>
                <Palette className="h-4 w-4 text-primary" />
                <span className="hidden text-xs font-semibold sm:inline">{t.common.theme}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-52 rounded-2xl border-border/70 bg-popover/95 p-3 glass">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t.common.theme}
              </p>
              <div className="flex flex-col gap-1">
                {ACCENTS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAccent(a)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10",
                      accent === a && "bg-primary/10 text-primary"
                    )}
                  >
                    {t.common[THEME_KEY[a]]}
                    {themeSwatch(a)}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 rounded-full px-3">
                <Globe className="h-4 w-4 text-primary" />
                <span className="hidden text-xs font-semibold sm:inline">{dictionaries[locale].name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-40">
              {localeOrder.map((l) => (
                <DropdownMenuItem
                  key={l}
                  onClick={() => setLocale(l)}
                  className={cn("cursor-pointer justify-between", l === locale && "bg-primary/10 font-bold text-primary")}
                >
                  <span>{dictionaries[l].name}</span>
                  <span className="text-[10px] uppercase opacity-60">{l}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => scrollTo("booking")}
            className="hidden rounded-full px-5 shadow-glow sm:inline-flex"
          >
            {t.nav.book}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full xl:hidden" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={t.dir === "rtl" ? "right" : "left"} className="w-72 overflow-y-auto">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-2 flex flex-col gap-1">
                <div className="mb-3">
                  <BrandLogo />
                </div>
                {LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-start text-sm font-medium transition-colors hover:bg-primary/10",
                      active === link.id ? "bg-primary/10 text-primary" : "text-foreground"
                    )}
                  >
                    {t.nav[link.key]}
                  </button>
                ))}
                <Button onClick={() => scrollTo("booking")} className="mt-3 rounded-xl">
                  {t.nav.book}
                </Button>
                <div className="mt-4 border-t pt-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Palette className="h-3.5 w-3.5" />
                    {t.common.theme}
                  </p>
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {ACCENTS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAccent(a)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                          accent === a
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {themeSwatch(a)}
                        <span className="truncate">{t.common[THEME_KEY[a]]}</span>
                      </button>
                    ))}
                  </div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                    <Globe className="h-3.5 w-3.5" />
                    {t.common.language}
                  </p>
                  <div className="flex gap-2">
                    {localeOrder.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLocale(l)}
                        className={cn(
                          "flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition-colors",
                          l === locale
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        )}
                      >
                        {dictionaries[l].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
