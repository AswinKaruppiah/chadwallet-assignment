import HeroSection from "@/sections/HeroSection";
import VideoSection from "@/sections/VideoSection";
import FeaturesSection from "@/sections/FeaturesSection";
import DownloadSection from "@/sections/DownloadSection";
import Footer from "@/component/Footer";
import TokenBanner from "@/component/TokenBanner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="max-w-7xl mx-auto">
        <TokenBanner direction="left" />
      </div>
      <VideoSection />
      <FeaturesSection />
      <DownloadSection />
      <div className="max-w-7xl mx-auto mb-6">
        <TokenBanner direction="right" />
      </div>
      <Footer />
    </main>
  );
}
