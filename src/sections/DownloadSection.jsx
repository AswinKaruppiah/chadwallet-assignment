import Image from "next/image";
import Link from "next/link";
import { AppleIcon, GooglePlayIcon } from "@/utility/icons";

export default function DownloadSection() {
  return (
    <section className="section-block !pb-14 !max-w-7xl mx-auto">
      {/* Outer Banner Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-black py-16 md:py-28 px-3 sm:px-6 flex flex-col items-center justify-center text-center">

        {/* Dot pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Inner shadow overlay */}
        <div className="absolute inset-0 pointer-events-none rounded-[32px] shadow-[inset_0_0_80px_rgba(255,255,255,0.15),inset_0_4px_40px_rgba(255,255,255,0.08)]" />

        {/* Subtle center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

        {/* Brand App Icon Container */}
        <div className="relative z-10 mb-6 md:mb-10">
          <Image
            src="/assets/logo/light.png"
            alt="ChadWallet Logo"
            width={68}
            height={68}
            className="object-contain rounded-full"
          />
        </div>

        {/* Card Title */}
        <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold tracking-tighter text-white mb-6 md:mb-8">
          Download ChadWallet
        </h2>

        {/* Buttons / Badges Container */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">

          {/* iOS Button */}
          <Link
            href="https://apps.apple.com/us/app/chadwallet/id6757367474"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/5 hover:backdrop-blur-xl border border-white/10 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md"
          >
            <AppleIcon size={18} />
            <span>iOS</span>
          </Link>

          {/* Android Button */}
          <Link
            href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/5 hover:backdrop-blur-xl border border-white/10 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 shadow-md"
          >
            <GooglePlayIcon size={16} />
            <span>Android</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
