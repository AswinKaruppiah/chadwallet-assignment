"use client";

import TopBar from "@/component/TopBar";
import StoreBadges from "@/component/StoreBadges";
import HeroButtons from "@/component/HeroButtons";

export default function HeroSection() {

  return (
    <section
      id="hero"
      className="relative select-none text-white px-4 isolate flex flex-col min-h-svh overflow-hidden"
    >
      <img
        src="/hero/hero-bg.webp"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full -z-10"
        fetchPriority="high"
      />

      {/* Top Bar */}
      < TopBar />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center pt-10 px-6 text-center gap-2" >
        <h1 className="text-6xl sm:text-7xl md:text-[9rem] mb-4 font-extrabold text-brand-secondary tracking-tighter">
          Chadwallet
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter text-secondary lowercase text-text-secondary">
          the #1 memecoin trading app.
        </p>
        <p className="text-xl text-[#D1D8FF99] font-medium lowercase max-w-xl mx-auto">
          social trading, instant swaps, and smart analytics. join the thousands of traders who profit consistently.
        </p>

        <HeroButtons />
        <div>
          <StoreBadges className="flex md:hidden mt-8 gap-3" />
        </div>
      </div >
      <img
        alt="Astronaut"
        className="hidden desktop:block h-[520px] -mt-20 object-contain animate-[float_4s_ease-in-out_infinite]"
        fetchPriority="high"
        src="/hero/astronaut.webp"
      />
    </section >
  );
}
