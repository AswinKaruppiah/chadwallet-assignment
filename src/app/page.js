"use client";

import HeroSection from "@/sections/HeroSection";
import VideoSection from "@/sections/VideoSection";
import FeaturesSection from "@/sections/FeaturesSection";
import FooterSection from "@/sections/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}
