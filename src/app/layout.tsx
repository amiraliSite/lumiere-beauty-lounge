import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { asset } from "@/lib/utils";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMIÈRE Beauty Lounge Berlin — سالن زیبایی لومیر | Kosmetik, Make-up, Nails",
  description:
    "Elegante Damen-Beauty-Lounge in Berlin-Charlottenburg: Gesichtsbehandlungen, Make-up, Maniküre, Haare, Wimpern & Brauen — zweisprachig (Deutsch / فارسی). سالن زیبایی لومیر در برلین با خدمات کامل بانوان.",
  keywords: [
    "Beauty Lounge Berlin",
    "Kosmetikstudio Charlottenburg",
    "Make-up Berlin",
    "Maniküre Berlin",
    "سالن زیبایی برلین",
    "میکاپ عروس برلین",
    "ناخن برلین",
    "LUMIÈRE Beauty",
  ],
  authors: [{ name: "amiraliSite" }],
  icons: { icon: asset("/logo.svg") },
  openGraph: {
    title: "LUMIÈRE Beauty Lounge | سالن زیبایی لومیر برلین",
    description:
      "Ihre Schönheit ist unsere Leidenschaft — zweisprachige Damen-Beauty-Lounge in Berlin. زیبایی شما، هنر ماست.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1216" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
