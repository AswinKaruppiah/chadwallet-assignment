"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "@/component/TopBar";
import { ArrowRightIcon } from "@/utility/icons";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen text-white px-10 overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/assets/hero-bg.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Top Bar */}
      <TopBar />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center pt-24 text-center gap-2">
        <h1 className="text-7xl md:text-9xl mb-4 font-extrabold tracking-tighter lowercase">
          Chadwallet
        </h1>
        <p className="text-4xl font-medium tracking-tighter lowercase text-white">
          where traders become legends.
        </p>
        <p className="text-base md:text-lg text-white/60 font-medium lowercase">
          from memecoins to viral tokens, trade any crypto in seconds.
        </p>

        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="mt-4 relative flex items-center justify-center overflow-hidden font-bold text-base min-w-44 tracking-wide py-3 rounded-full bg-orange-300/30 border border-white/10 backdrop-blur-lg transition-all"
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
      </div>
    </section>
  );
}
