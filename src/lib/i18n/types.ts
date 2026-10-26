export type Locale = "de" | "fa";

export interface ServiceItem {
  icon: string;
  title: string;
  desc: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface TeamMember {
  name: string;
  role: string;
  desc: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  desc: string;
  features: string[];
  featured?: boolean;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface Dictionary {
  name: string;
  dir: "ltr" | "rtl";
  brand: { name: string; tagline: string };
  nav: {
    about: string;
    services: string;
    gallery: string;
    team: string;
    pricing: string;
    testimonials: string;
    faq: string;
    contact: string;
    book: string;
  };
  common: {
    language: string;
    themeToggle: string;
    theme: string;
    themeGold: string;
    themeRose: string;
    themeAmethyst: string;
    themeEmerald: string;
    backToTop: string;
    quickBook: string;
  };
  hero: {
    badge: string;
    titleA: string;
    titleB: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    rating: string;
    reviews: string;
    callNow: string;
    imageAlt: string;
  };
  quote: { text: string; author: string };
  stats: { items: StatItem[] };
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    features: string[];
    yearsBadge: string;
    yearsLabel: string;
    imageAlt: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    items: ServiceItem[];
  };
  gallery: {
    kicker: string;
    title: string;
    subtitle: string;
    items: GalleryItem[];
  };
  team: {
    kicker: string;
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  pricing: {
    kicker: string;
    title: string;
    subtitle: string;
    plans: PricingPlan[];
    note: string;
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  booking: {
    kicker: string;
    title: string;
    subtitle: string;
    name: string;
    namePh: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    service: string;
    servicePh: string;
    serviceOptions: string[];
    date: string;
    time: string;
    timePh: string;
    timeOptions: string[];
    message: string;
    messagePh: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    localNote: string;
    monthCount: string;
    perks: string[];
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    address: string;
    addressValue: string;
    phone: string;
    phoneValue: string;
    email: string;
    emailValue: string;
    hours: string;
    hoursValue: string;
    whatsapp: string;
    whatsappValue: string;
  };
  footer: {
    about: string;
    linksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
  };
}
