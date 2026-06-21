"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { AppleIcon, GooglePlayIcon } from "@/utility/icons";

export default function TopBar() {
  const { login, logout, authenticated, user, ready } = usePrivy();
  const router = useRouter();

  console.log(user);


  // Automatically clear redirect login parameters and refresh the page to update the UI
  useEffect(() => {
    if (ready && authenticated) {
      if (typeof window !== "undefined" && window.location.search.includes("privy")) {
        // Clear the OAuth params from the URL bar without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
        router.refresh();
      }
    }
  }, [ready, authenticated, router]);

  // Helper to format the wallet address or email for the profile button
  const getIdentifier = () => {
    if (!user) return "";
    if (user.google?.email) return user.google.email;
    if (user.apple?.email) return user.apple.email;
    if (user.wallet?.address) {
      const addr = user.wallet.address;
      return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    }
    if (user.email?.address) return user.email.address;
    return "profile";
  };

  return (
    <div className="relative z-30 flex items-center justify-between py-4">

      {/* Left — Logo + Brand */}
      <Link href="/">
        <h2 className="font-black text-lg hover:opacity-80 transition-opacity cursor-pointer">
          chadwallet
        </h2>
      </Link>

      {/* Right — Store Badges + Login */}
      <div className="flex items-center gap-3">

        {/* App Store Badge */}
        <Link
          href="https://apps.apple.com/us/app/chadwallet/id6757367474"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 border border-white/5 backdrop-blur-lg rounded-lg px-3 py-1.5 hover:bg-white/10 transition-all"
        >
          <AppleIcon size={20} />
          <div className="flex flex-col leading-none">
            <span className="text-white/60 text-[8px] uppercase tracking-widest">Download on the</span>
            <span className="text-white text-[11px] font-bold">App Store</span>
          </div>
        </Link>

        {/* Google Play Badge */}
        <Link
          href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 border border-white/5 backdrop-blur-lg rounded-lg px-3 py-1.5 hover:bg-white/10 transition-all"
        >
          <GooglePlayIcon size={18} />
          <div className="flex flex-col leading-none">
            <span className="text-white/60 text-[8px] uppercase tracking-widest">Get it on</span>
            <span className="text-white text-[11px] font-bold">Google Play</span>
          </div>
        </Link>

        {/* Login/Logout Button */}
        {ready && (
          authenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs text-white/50 bg-white/5 px-3 py-2 rounded-lg border border-white/5">
                {getIdentifier()}
              </span>
              <button
                onClick={logout}
                className="bg-white/10 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-white/20 border border-white/10 transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-white text-black text-sm font-bold px-5 py-2 rounded-full hover:bg-white/90 transition-all"
            >
              Login
            </button>
          )
        )}
      </div>
    </div>
  );
}
