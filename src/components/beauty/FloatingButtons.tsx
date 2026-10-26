"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";

export default function FloatingButtons() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 start-5 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
          >
            <Button
              size="icon"
              variant="outline"
              aria-label={t.common.backToTop}
              className="h-11 w-11 rounded-full shadow-soft"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}>
        <Button
          size="icon"
          aria-label={t.common.quickBook}
          className="h-11 w-11 rounded-full shadow-soft animate-pulse-ring"
          onClick={() =>
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <CalendarCheck className="h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
