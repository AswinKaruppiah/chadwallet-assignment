import HeroSection from "@/sections/HeroSection";
import VideoSection from "@/sections/VideoSection";
import FeaturesSection from "@/sections/FeaturesSection";
import DownloadSection from "@/sections/DownloadSection";
import Footer from "@/component/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <VideoSection />
      <FeaturesSection />
      <DownloadSection />
      <Footer />
    </main>
  );
}
