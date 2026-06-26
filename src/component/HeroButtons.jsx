"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AppleIcon, GooglePlayIcon, ArrowRightIcon, DownloadIcon } from "@/utility/icons";

export default function HeroButtons() {
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [hoveredStart, setHoveredStart] = useState(false);
  const [hoveredDownload, setHoveredDownload] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDownloadDropdown(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 z-30 relative select-none w-full sm:w-auto">
      {/* Start Trading Button */}
      <Link
        href="/trade"
        onMouseEnter={() => {
          if (window.matchMedia('(pointer: coarse)').matches) return;
          setHoveredStart(true);
        }}
        onMouseLeave={() => {
          if (window.matchMedia('(pointer: coarse)').matches) return;
          setHoveredStart(false);
        }}
        onTouchStart={() => setHoveredStart(true)}
        onTouchEnd={() => setHoveredStart(false)}
        className="relative h-14 px-8 w-[200px] flex items-center justify-center rounded-xl text-base sm:text-lg font-bold text-white bg-[#606af780] hover:bg-[#606AF7CC] backdrop-blur-md border border-white/5 hover:border-white/10 transition-all shadow-lg active:scale-[0.98] duration-150 cursor-pointer text-center overflow-hidden"
      >
        <span className="flex items-center justify-center">
          <span className="whitespace-nowrap">Start trading</span>
          <motion.span
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            style={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{
              width: hoveredStart ? 16 : 0,
              opacity: hoveredStart ? 1 : 0,
              marginLeft: hoveredStart ? 8 : 0
            }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="overflow-hidden flex items-center justify-center shrink-0"
          >
            <motion.span
              initial={{ x: 16 }}
              animate={{ x: hoveredStart ? 0 : 16 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="flex items-center shrink-0"
            >
              <ArrowRightIcon className="w-4 h-4 mt-[1px]" />
            </motion.span>
          </motion.span>
        </span>
      </Link>

      {/* Download App Button with Dropdown */}
      <div
        className="relative w-full sm:w-auto"
        ref={dropdownRef}
        onMouseEnter={() => {
          if (window.matchMedia('(pointer: coarse)').matches) return;
          setHoveredDownload(true);
        }}
        onMouseLeave={() => {
          if (window.matchMedia('(pointer: coarse)').matches) return;
          setHoveredDownload(false);
        }}
      >
        <button
          onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
          className="relative h-14 px-8 w-[200px] mx-auto flex items-center justify-center rounded-xl text-base sm:text-lg font-bold text-white bg-white/10 border border-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-[0.98] duration-150 cursor-pointer overflow-hidden"
        >
          <span className="flex items-center justify-center">
            <motion.span
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              style={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{
                width: (hoveredDownload || showDownloadDropdown) ? 20 : 0,
                opacity: (hoveredDownload || showDownloadDropdown) ? 1 : 0,
                marginRight: (hoveredDownload || showDownloadDropdown) ? 8 : 0
              }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="overflow-hidden flex items-center justify-center shrink-0"
            >
              <motion.span
                initial={{ x: -20 }}
                animate={{
                  x: (hoveredDownload || showDownloadDropdown) ? 0 : -20
                }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="flex items-center shrink-0"
              >
                <DownloadIcon className="w-5 h-5 text-white" />
              </motion.span>
            </motion.span>
            <span className="whitespace-nowrap">Download app</span>
          </span>
        </button>

        <AnimatePresence>
          {showDownloadDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-1/2 top-full pt-3 w-[85vw] sm:w-72 max-w-sm z-50 transform-gpu"
            >
              <div className="bg-[#060510]/60 border border-white/5 backdrop-blur-sm rounded-2xl p-4 shadow-2xl overflow-hidden flex flex-col gap-3 transform-gpu">
                <div className="text-brand-secondary text-[10px] font-bold uppercase tracking-wider px-1">
                  Select Platform
                </div>
                <Link
                  href="https://apps.apple.com/us/app/chadwallet/id6757367474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#12111a] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-3 text-white transition-all cursor-pointer"
                >
                  <AppleIcon size={24} className="text-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-white/60 leading-tight uppercase font-semibold">Download on the</span>
                    <span className="text-sm font-bold leading-tight">App Store</span>
                  </div>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#12111a] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-3 text-white transition-all cursor-pointer"
                >
                  <GooglePlayIcon size={24} className="text-white fill-white" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-white/60 leading-tight uppercase font-semibold">Get it on</span>
                    <span className="text-sm font-bold leading-tight">Google Play</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
