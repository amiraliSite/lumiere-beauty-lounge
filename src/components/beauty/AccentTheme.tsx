"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

export type Accent = "gold" | "rose" | "amethyst" | "emerald";

export const ACCENTS: Accent[] = ["gold", "rose", "amethyst", "emerald"];

/** swatch colors for the picker UI (approximates the oklch tokens) */
export const ACCENT_SWATCH: Record<Accent, { a: string; b: string }> = {
  gold: { a: "#e8c26a", b: "#c98a3d" },
  rose: { a: "#f08a94", b: "#c2415c" },
  amethyst: { a: "#c39cf2", b: "#8f4fd1" },
  emerald: { a: "#7fe0bd", b: "#2f9e82" },
};

interface AccentContextValue {
  accent: Accent;
  setAccent: (a: Accent) => void;
}

const AccentContext = createContext<AccentContextValue | null>(null);

const STORAGE_KEY = "lumiere-accent";

export function AccentThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("gold");

  useEffect(() => {
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Accent | null;
      if (stored && ACCENTS.includes(stored)) setAccentState(stored);
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  const setAccent = useCallback((next: Accent) => {
    setAccentState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ accent, setAccent }), [accent, setAccent]);

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used inside AccentThemeProvider");
  return ctx;
}
