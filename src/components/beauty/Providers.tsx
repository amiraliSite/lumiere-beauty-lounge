"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./LanguageProvider";
import { AccentThemeProvider } from "./AccentTheme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
      <AccentThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </AccentThemeProvider>
    </ThemeProvider>
  );
}
