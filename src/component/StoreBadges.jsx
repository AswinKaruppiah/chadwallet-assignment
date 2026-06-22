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
        className="flex items-center gap-2 border border-white/5 backdrop-blur-lg rounded-xl px-4 py-2 hover:bg-white/10 transition-all"
      >
        <AppleIcon size={24} />
        <div className="flex flex-col leading-none">
          <span className="text-white/60 text-[9px] uppercase tracking-widest">Download on the</span>
          <span className="text-white text-sm font-bold">App Store</span>
        </div>
      </Link>

      {/* Google Play Badge */}
      <Link
        href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-white/5 backdrop-blur-lg rounded-xl px-4 py-2 hover:bg-white/10 transition-all"
      >
        <GooglePlayIcon size={22} />
        <div className="flex flex-col leading-none">
          <span className="text-white/60 text-[9px] uppercase tracking-widest">Get it on</span>
          <span className="text-white text-sm font-bold">Google Play</span>
        </div>
      </Link>
    </div>
  );
}
