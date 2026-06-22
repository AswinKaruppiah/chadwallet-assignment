"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { animateFadeYVariants } from "@/utility/animate";

export default function FeaturesSection() {
  const features = [
    {
      category: "Leaderboard",
      title: "Become a legend, top the leaderboard",
      description: "Follow the most profitable wallets and copy-trade their winning strategies in one tap.",
      imagePath: "/assets/flow/kol-4.png",
      alt: "Leaderboard Flow",
    },
    {
      category: "Trading",
      title: "From memecoins to viral tokens",
      description: "Swap any token with lightning-fast execution, real-time charts, and optimized slippage.",
      imagePath: "/assets/flow/buy-sell-4.png",
      alt: "Trading Flow",
    },
    {
      category: "Launches",
      title: "Be first to discover the next gem",
      description: "Get real-time notifications for newly launched tokens and key opinion leader moves.",
      imagePath: "/assets/flow/launch-4.png",
      alt: "Token Launches Flow",
    },
    {
      category: "Memecoins",
      title: "Trade and deploy viral memecoins",
      description: "Track trending memes, see which creators are launching, and get in on the first blocks.",
      imagePath: "/assets/flow/memecoin-4.png",
      alt: "Memecoin Trading Flow",
    },
    {
      category: "Portfolio",
      title: "Track your trades and balances",
      description: "Keep a clean overview of your open positions, performance, history, and total net worth.",
      imagePath: "/assets/flow/portfolio-4.png",
      alt: "Portfolio Tracking Flow",
    },
    {
      category: "Relaunch",
      title: "Redeploy and relaunch second chances",
      description: "Re-create or restart token initiatives with optimized setups and active trader communities.",
      imagePath: "/assets/flow/relaunch-4.png",
      alt: "Relaunching Flow",
    },
  ];

  return (
    <section
      id="features"
      className="relative flex flex-col justify-center section-block"
    >
      {/* Header */}
      <div className="mb-10 md:mb-16 text-left">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={animateFadeYVariants({ delay: 0.2 })}
          className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white lowercase"
        >
          never miss out again
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={animateFadeYVariants({ delay: 0.4 })}
          className="text-lg md:text-2xl text-white/40 tracking-tight lowercase mt-2"
        >
          the only social-first trading app
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={animateFadeYVariants({ delay: (i % 3) * 0.15 })}
            className="flex flex-col justify-between bg-gradient-to-b from-[#0a0a0a] to-[#1f1f1f] rounded-[32px] min-h-[420px] md:min-h-[500px] overflow-hidden group hover:border-white/10 shadow-2xl"
          >
            <div className="p-6 md:p-8 pb-0">
              <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                {feature.category}
              </span>
              <h3 className="text-3xl font-extrabold tracking-tighter text-white lowercase mt-3 mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                {feature.description}
              </p>
            </div>

            {/* Mobile Device Mockup / Image container */}
            <div className="relative w-full flex-1 min-h-[190px] md:min-h-[280px] mt-auto">
              <Image
                src={feature.imagePath}
                alt={feature.alt}
                fill
                className="object-contain object-bottom transition-transform duration-500"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
