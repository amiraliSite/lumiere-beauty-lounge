"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal, SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";

export default function Gallery() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading badge={t.gallery.kicker} title={t.gallery.title} subtitle={t.gallery.subtitle} />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {t.gallery.items.map((item, i) => (
            <Reveal key={item.src} delay={(i % 4) * 0.06}>
              <button
                onClick={() => setSelected(i)}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={item.alt}
              >
                <Image
                  src={asset(item.src)}
                  alt={item.alt}
                  width={640}
                  height={640}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    i === 0 || i === 5 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 start-3 end-3 translate-y-2 rounded-lg bg-white/90 px-3 py-1.5 text-start text-[11px] font-semibold text-gray-900 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-black/70 dark:text-white">
                  {item.alt}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative max-h-[88vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={asset(t.gallery.items[selected].src)}
                alt={t.gallery.items[selected].alt}
                width={1280}
                height={960}
                className="max-h-[80vh] w-auto rounded-2xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/85">{t.gallery.items[selected].alt}</p>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-3 -end-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-transform hover:scale-110"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
