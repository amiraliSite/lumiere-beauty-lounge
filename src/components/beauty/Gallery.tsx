"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionHeading } from "./shared";
import { useLanguage } from "./LanguageProvider";
import { asset } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * FULL-BLEED gallery — no boxed container, images run edge to edge.
 * CSS-columns masonry with ONE uniform gap value (gap-3 / gap-4) and
 * rounded only on tiles, so vertical rhythm is perfectly consistent.
 */
export default function Gallery() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative w-full py-20 lg:py-32">
      <div className="px-4 sm:px-6 lg:px-10">
        <SectionHeading badge={t.gallery.kicker} title={t.gallery.title} subtitle={t.gallery.subtitle} />
      </div>

      {/* ground-to-sky masonry strip */}
      <div className="mt-14 w-full columns-2 gap-3 px-3 sm:gap-4 sm:px-4 lg:columns-4 lg:px-6 [&>*]:mb-3 sm:[&>*]:mb-4">
        {t.gallery.items.map((item, i) => (
          <motion.button
            key={item.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelected(i)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-border/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={item.alt}
          >
            <Image
              src={asset(item.src)}
              alt={item.alt}
              width={640}
              height={800}
              className={cn(
                "w-full object-cover transition-all duration-500 group-hover:scale-105",
                i % 3 === 1 ? "aspect-[3/4]" : i % 3 === 2 ? "aspect-square" : "aspect-[4/5]"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-3 start-3 end-3 translate-y-2 rounded-lg glass px-3 py-1.5 text-start text-[11px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.alt}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
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
