"use client"
import ContactSection from "@/components/ContactSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JoinSection from "@/components/JoinSection";
import Navbar from "@/components/Navbar";
import SchoolHeroSection from "@/components/SchoolHeroSection";
import StatsSection from "@/components/StatsSection";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Home() {
  return (

    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <JoinSection />
        <SchoolHeroSection />
        <ContactSection />
        <Footer />
      </main>
    </>

  );
}
