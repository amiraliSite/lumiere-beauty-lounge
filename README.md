# LUMIÈRE Beauty Lounge ✨

> Elegante Damen-Beauty-Lounge in Berlin — bilingual (Deutsch / فارسی), modern, fully responsive.
> سالن زیبایی مدرن بانوان در برلین — دوزبانه (آلمانی / فارسی)، کاملاً ریسپانسیو.

**🔴 Live on GitHub Pages:** https://amiralisite.github.io/lumiere-beauty-lounge/

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-EF4444?logo=framer)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)

---

## ✨ Features | امکانات

- 🌍 **Bilingual — Deutsch & فارسی** with instant switching & full **RTL** support
- 🗓️ **Online booking form** — service, date & time selection, validation, stored in **Prisma + SQLite** (API mode) or localStorage (static mode)
- 🎬 **Framer Motion animations** — scroll reveals, hover effects, floating cards, shine sweeps
- 🌙 **Dark / Light mode**
- 📱 **Fully responsive** — mobile sheet menu, desktop pill navigation
- 🖼️ **Gallery with lightbox**
- 💰 **Pricing packages** (Glow Basic / Radiance Deluxe / Bridal Premium)
- ⭐ Testimonials, FAQ accordion, contact cards, WhatsApp CTA
- 🦋 Sections: Hero · Stats · About · Services (8) · Gallery · Team · Pricing · Testimonials · FAQ · Booking · Contact · Footer
- 🚀 **Static export** deployed on GitHub Pages (`output: "export"` + basePath)

## 🛠️ Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind CSS 4 · shadcn/ui · Framer Motion · next-themes · Prisma (SQLite) · react-hook-form + zod

## 🚀 Run locally

```bash
bun install

# Full-stack mode (API + Prisma + SQLite)
bun run dev              # → http://localhost:3000

# Static export mode (GitHub Pages)
bun run build:static     # output → .next-static/
```

## 📦 Deploy to GitHub Pages

The static build is published via the `gh-pages` branch:

```bash
NEXT_PUBLIC_STATIC=1 bun next build
# push .next-static/ contents to gh-pages (see git history of the branch)
```

`NEXT_PUBLIC_STATIC=1` enables: `output: "export"`, `basePath: /lumiere-beauty-lounge`, unoptimized images and `trailingSlash` — everything configured in `next.config.ts`.

## 📁 Structure

```
src/
├── app/                 # layout, page, /api/bookings
├── components/
│   ├── beauty/          # all site sections (Navbar, Hero, Booking, ...)
│   └── ui/              # shadcn/ui primitives
└── lib/i18n/            # de.ts + fa.ts dictionaries
```

---

© 2026 LUMIÈRE Beauty Lounge — crafted with 💖
