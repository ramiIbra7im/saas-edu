"use client"
import ContactSection from "@/components/ContactSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import JoinSection from "@/components/JoinSection";
import Navbar from "@/components/Navbar";
import SchoolHeroSection from "@/components/SchoolHeroSection";
import StatsSection from "@/components/StatsSection";
import ClientProviders from "@/components/ClientProviders";

export default function Home() {
  return (

    <ClientProviders>
      <Navbar />
      <main>
        {/* <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <JoinSection />
        <SchoolHeroSection />
        <ContactSection />
        <Footer /> */}
      </main>
    </ClientProviders>

  );
}
