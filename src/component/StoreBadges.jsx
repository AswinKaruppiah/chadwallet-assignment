'use client';

import Link from 'next/link';
import { AppleIcon, GooglePlayIcon } from '@/utility/icons';

export default function StoreBadges({ className = "" }) {
  return (
    <div className={`flex items-center flex-wrap gap-3 ${className}`}>
      {/* App Store Badge */}
      <Link
        href="https://apps.apple.com/us/app/chadwallet/id6757367474"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-md px-3.5 py-1.5 hover:ring-white/40 hover:ring-1 hover:backdrop-blur-sm hover:opacity-90 transition-all select-none"
      >
        <AppleIcon size={24} className="fill-white" />
        <div className="flex flex-col text-left leading-[1.1]">
          <span className="text-white/80 text-[9px] font-normal tracking-tight">Download on the</span>
          <span className="text-white text-base font-medium -mt-1">App Store</span>
        </div>
      </Link>

      {/* Google Play Badge */}
      <Link
        href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-md px-3.5 py-1.5 hover:ring-white/40 hover:ring-1 hover:backdrop-blur-sm hover:opacity-90 transition-all select-none"
      >
        <GooglePlayIcon size={22} />
        <div className="flex flex-col text-left leading-[1.1]">
          <span className="text-white/80 text-[9px] font-normal tracking-tight">GET IT ON</span>
          <span className="text-white text-base font-medium -mt-1">Google Play</span>
        </div>
      </Link>
    </div >
  );
}
