'use client';

import { useState, useEffect } from 'react';
import { useLoginWithOAuth } from '@privy-io/react-auth';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleIcon, GoogleIcon } from '@/utility/icons';
import Image from "next/image";

export default function LoginModal({ isOpen, onClose }) {
  const { initOAuth } = useLoginWithOAuth();
  const [error, setError] = useState('');

  // Reset local error when modal closes/opens
  useEffect(() => {
    if (!isOpen) {
      setError('');
    }
  }, [isOpen]);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleGoogleLogin = () => {
    try {
      initOAuth({ provider: 'google' });
    } catch (err) {
      console.error('Error starting Google login:', err);
      setError(err?.message || 'Failed to start Google login');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 z-10 overflow-hidden"
        >
          {/* Dot pattern background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Inner shadow overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_80px_rgba(255,255,255,0.15),inset_0_4px_40px_rgba(255,255,255,0.2)]" />

          {/* Subtle center glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-20"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo & Header */}
          <div className="flex flex-col items-center gap-2 text-center mt-4 mb-8">
            <div className="mb-6">
              <Image
                src="/assets/logo/light.png"
                alt="ChadWallet Logo"
                width={68}
                height={68}
                className="object-contain rounded-full"
              />
            </div>
            <h2 className="text-white text-2xl font-black tracking-tight">Welcome to ChadWallet</h2>
            <p className="text-white/60 text-sm">
              Login or Sign Up to access your wallet
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs py-3 px-4 rounded-xl font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Authentication Container */}
          <div className="relative z-10 flex flex-col gap-4">
            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15 text-white font-bold py-3.5 rounded-2xl transition-all text-sm flex items-center justify-center gap-3"
            >
              <GoogleIcon size={20} />
              Google Login
            </button>

            {/* Apple Login Button (Disabled) */}
            <button
              disabled
              className="w-full bg-white/5 border border-white/10 text-white/40 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 cursor-not-allowed opacity-50 transition-all text-sm"
            >
              <AppleIcon size={18} className="!fill-white/40" />
              <span>Apple Login (Coming Soon)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
