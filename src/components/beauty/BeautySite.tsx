"use client";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Stats from "./Stats";
import About from "./About";
import Services from "./Services";
import Gallery from "./Gallery";
import ParallaxBand from "./ParallaxBand";
import Team from "./Team";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import Booking from "./Booking";
import Contact from "./Contact";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";
import { useLanguage } from "./LanguageProvider";

export default function BeautySite() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Services />
        <Gallery />
        <ParallaxBand image="/images/band-noir-1.png" quote={t.quote.text} author={t.quote.author} />
        <Team />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
