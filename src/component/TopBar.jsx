"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useCreateWallet } from "@privy-io/react-auth/solana";
import StoreBadges from "@/component/StoreBadges";
import { truncateAddress } from "@/utility/helpers";
import LoginModal from "@/component/LoginModal";
import Show from "@/component/Show";
import { AnimatePresence, motion } from "framer-motion";

export default function TopBar() {
  const { logout, authenticated, user, ready } = usePrivy();
  const { createWallet } = useCreateWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const dropdownRef = useRef(null);
  const walletCreationAttempted = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('privy_oauth_code')) {
        setIsProcessingOAuth(true);
      }
    }
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Guard: If clicked element is unmounted during state changes (like the copy button),
        // it won't be in the document body. In this case, we shouldn't close the dropdown.
        if (event.target && !document.body.contains(event.target)) {
          return;
        }
        setShowDropdown(false);
      }
    }

    function handleScroll() {
      setShowDropdown(false);
    }

    document.addEventListener("pointerdown", handleClickOutside, { capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside, { capture: true });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (authenticated) {
      setIsProcessingOAuth(false);
    }
  }, [authenticated]);


  // Programmatically create Solana wallet if the user doesn't have one
  useEffect(() => {
    if (ready && authenticated && user && !walletCreationAttempted.current) {
      const hasSolanaWallet = user.wallet?.chainType === 'solana';
      if (!hasSolanaWallet) {
        walletCreationAttempted.current = true;
        (async () => {
          try {
            await createWallet();
          } catch (err) {
            console.error("Error creating Solana wallet programmatically:", err);
            walletCreationAttempted.current = false;
          }
        })();
      }
    }
  }, [ready, authenticated, user, createWallet]);

  const name = user?.google?.name ||
    user?.apple?.name ||
    user?.email?.address?.split('@')[0] ||
    user?.google?.email?.split('@')[0] ||
    user?.apple?.email?.split('@')[0] ||
    "Trader";
  const email = user?.email?.address || user?.google?.email || user?.apple?.email || "";
  const walletAddress = user?.wallets?.find(w => w.chainType === 'solana')?.address || user?.wallet?.address;

  return (
    <div className="relative z-30 flex items-center justify-between py-4">

      {/* Left — Logo + Brand */}
      <Link href="/">
        <h2 className="font-black text-lg hover:opacity-80 transition-opacity cursor-pointer">
          Chadwallet
        </h2>
      </Link>

      {/* Right — Store Badges + Login */}
      <div className="flex items-center gap-3 relative" ref={dropdownRef}>

        <StoreBadges className="hidden md:flex" />

        {/* Login / Profile Button */}
        {mounted && (
          <Show>
            <Show.If isTrue={isProcessingOAuth && !authenticated}>
              <button
                disabled
                className="flex items-center gap-2.5 backdrop-blur-lg bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white/60 font-semibold text-sm cursor-wait transition-all"
              >
                <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin shrink-0" />
                <span>Logging in...</span>
              </button>
            </Show.If>
            <Show.ElseIf isTrue={ready && authenticated}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 backdrop-blur-lg bg-white/10 hover:bg-white/15 border border-white/10 rounded-full pl-1 pr-4 py-1 text-white font-semibold text-sm transition-all"
                >
                  <div className="aspect-square w-8 shrink-0 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 text-black font-black text-xs flex items-center justify-center">
                    {String(name || "T").charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{name}</span>
                  <svg className={`w-3.5 h-3.5 text-white/50 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </Show.ElseIf>
            <Show.ElseIf isTrue={ready && !authenticated}>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-white text-black text-sm font-bold px-5 py-2 rounded-full hover:bg-white/90 transition-all"
              >
                Login
              </button>
            </Show.ElseIf>
          </Show>
        )}

        {/* Profile Dropdown Menu */}
        <AnimatePresence>
          {showDropdown && authenticated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-[110%] w-72 bg-[#0c0c0e]/95 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-4"
            >
              {/* Header / User Info */}
              <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Account</span>
                <span className="text-white font-extrabold text-base leading-tight truncate">{name}</span>
                <Show>
                  <Show.If isTrue={!!email}>
                    <span className="text-white/60 text-xs truncate">{email}</span>
                  </Show.If>
                </Show>
              </div>

              {/* Wallet Section */}
              <Show>
                <Show.If isTrue={!!walletAddress}>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col gap-1.5">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Solana Wallet</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white font-mono text-xs font-semibold">{truncateAddress(walletAddress)}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(walletAddress);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="text-white/40 hover:text-white transition-colors text-xs flex items-center gap-1.5 shrink-0"
                        title="Copy address"
                      >
                        <Show>
                          <Show.If isTrue={copied}>
                            <span className="text-orange-400 font-bold text-[10px] uppercase">Copied!</span>
                          </Show.If>
                          <Show.Else>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          </Show.Else>
                        </Show>
                      </button>
                    </div>
                  </div>
                </Show.If>
                <Show.Else>
                  <button
                    onClick={async () => {
                      try {
                        setIsCreatingWallet(true);
                        await createWallet();
                      } catch (err) {
                        console.error("Error creating wallet manually:", err);
                      } finally {
                        setIsCreatingWallet(false);
                      }
                    }}
                    disabled={isCreatingWallet}
                    className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-bold py-2.5 rounded-xl border border-orange-500/15 hover:border-orange-500/30 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Show>
                      <Show.If isTrue={isCreatingWallet}>
                        <div className="w-3.5 h-3.5 border-2 border-orange-400/20 border-t-orange-400 rounded-full animate-spin shrink-0" />
                        <span>Creating wallet...</span>
                      </Show.If>
                      <Show.Else>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Create Solana Wallet</span>
                      </Show.Else>
                    </Show>
                  </button>
                </Show.Else>
              </Show>

              {/* Actions */}
              <button
                onClick={async () => {
                  try {
                    setIsLoggingOut(true);
                    await logout();
                    setShowDropdown(false);
                  } catch (err) {
                    console.error("Error logging out:", err);
                  } finally {
                    setIsLoggingOut(false);
                  }
                }}
                disabled={isLoggingOut}
                className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-xl border border-red-500/15 hover:border-red-500/30 transition-all text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Show>
                  <Show.If isTrue={isLoggingOut}>
                    <div className="w-3.5 h-3.5 border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin shrink-0" />
                    <span>Logging out...</span>
                  </Show.If>
                  <Show.Else>
                    Logout
                  </Show.Else>
                </Show>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
}
