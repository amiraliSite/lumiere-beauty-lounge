import type { Locale, Dictionary } from "./types";
import { de } from "./de";
import { fa } from "./fa";

export type { Locale, Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { de, fa };

export const localeOrder: Locale[] = ["de", "fa"];

export const defaultLocale: Locale = "de";
