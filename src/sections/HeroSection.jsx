"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "@/component/TopBar";
import Link from "next/link";
import { ArrowRightIcon } from "@/utility/icons";
import StoreBadges from "@/component/StoreBadges";

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="hero"
      className="relative select-none text-white px-4 isolate flex flex-col min-h-svh overflow-x-hidden"
    >
      <img
        src="/hero/hero-bg.webp"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full -z-10 pointer-events-none select-none"
        fetchPriority="high"
      />

      {/* Top Bar */}
      < TopBar />

      {/* Content */}
      < div className="relative z-20 h-full flex flex-col justify-center items-center pt-10 px-6 text-center gap-2" >
        <h1 className="text-6xl sm:text-7xl md:text-[9rem] mb-4 font-extrabold text-brand-secondary tracking-tighter">
          Chadwallet
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tighter text-secondary lowercase text-text-secondary">
          the #1 memecoin trading app.
        </p>
        <p className="text-xl text-[#D1D8FF99] font-medium lowercase max-w-xl mx-auto">
          social trading, instant swaps, and smart analytics. join the thousands of traders who profit consistently.
        </p>

        <Link href="/trade" passHref legacyBehavior>
          <a
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
            className="mt-4 relative flex items-center justify-center overflow-hidden font-bold text-base min-w-44 tracking-wide py-3 rounded-full bg-orange-400/40 border border-white/10 backdrop-blur-sm cursor-pointer"
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
          </a>
        </Link>
        <div>
          <StoreBadges className="flex md:hidden mt-8 gap-3" />
        </div>
        <img
          alt="Astronaut"
          className="hidden desktop:block h-[520px] -mt-20 object-contain animate-[float_4s_ease-in-out_infinite]"
          fetchPriority="high"
          src="/hero/astronaut.webp"
        />
      </div >
    </section >
  );
}
