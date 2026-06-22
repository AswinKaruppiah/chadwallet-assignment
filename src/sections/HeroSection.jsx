"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "@/component/TopBar";
import { ArrowRightIcon } from "@/utility/icons";
import StoreBadges from "@/component/StoreBadges";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen select-none text-white px-6 md:px-10 overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/assets/hero-bg.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center pointer-events-none"
      />

      {/* Top Bar */}
      <TopBar />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center pt-24 text-center gap-2">
        <h1 className="text-6xl sm:text-7xl md:text-9xl mb-4 font-extrabold tracking-tighter lowercase">
          Chadwallet
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter lowercase text-white">
          the #1 memecoin trading app.
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/60 font-medium lowercase max-w-xl mx-auto">
          social trading, instant swaps, and smart analytics. join the thousands of traders who profit consistently.
        </p>

        <button
          onMouseEnter={() => {
            if (window.matchMedia('(pointer: coarse)').matches) return;
            setHovered(true);
          }}
          onMouseLeave={() => {
            if (window.matchMedia('(pointer: coarse)').matches) return;
            setHovered(false);
          }}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setHovered(false)}
          className="mt-4 relative flex items-center justify-center overflow-hidden font-bold text-base min-w-44 tracking-wide py-3 rounded-full bg-orange-400/40 border border-white/10 backdrop-blur-sm transition-all"
        >
          <motion.span
            animate={{ x: hovered ? -10 : 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            Start Trading
          </motion.span>

          <AnimatePresence>
            {hovered && (
              <motion.span
                key="arrow"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="absolute right-5"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <StoreBadges className="flex md:hidden mt-8 gap-3" />
      </div>
    </section>
  );
}
