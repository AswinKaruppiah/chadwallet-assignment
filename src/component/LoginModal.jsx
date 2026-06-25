'use client';

import { useState, useEffect } from 'react';
import { useLoginWithOAuth } from '@privy-io/react-auth';
import { useCreateWallet } from '@privy-io/react-auth/solana';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleIcon, GoogleIcon, ArrowRightIcon } from '@/utility/icons';
import { getDisplayName } from '@/utility/helpers';
import toast from 'react-hot-toast';

export default function LoginModal({ isOpen, onClose }) {
  const [error, setError] = useState('');
  const { createWallet } = useCreateWallet();

  const { initOAuth } = useLoginWithOAuth({
    onComplete: async ({ user, isNewUser }) => {
      const hasSolanaWallet = user?.wallet?.chainType === 'solana';

      if (!hasSolanaWallet) {
        const toastId = toast.loading('Creating Solana wallet...');
        try {
          await createWallet();
          if (isNewUser) {
            toast.success(`Welcome, ${getDisplayName(user?.google?.name || user?.email?.address)}!`, { id: toastId });
          } else {
            toast.dismiss(toastId);
          }
        } catch (err) {
          console.error("Error creating Solana wallet:", err);
          toast.error('Failed to create wallet', { id: toastId });
        }
      } else if (isNewUser) {
        toast.success(`Welcome, ${getDisplayName(user?.google?.name || user?.email?.address)}!`);
      }

      if (onClose) onClose();
    },
    onError: (err) => {
      console.error('Login failed', err);
      setError(err?.message || 'Login failed');
    }
  });

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

  const handleAppleLogin = () => {
    try {
      initOAuth({ provider: 'apple' });
    } catch (err) {
      console.error('Error starting Apple login:', err);
      setError(err?.message || 'Failed to start Apple login');
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
          className="absolute inset-0 bg-black/70"
        />

        {/* Modal Wrapper for Close button + Card positioning */}
        <div className="relative w-full max-w-[350px] z-10 flex flex-col items-center">

          {/* Circular Close Button positioned above the card */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-[#060510]/60 hover:bg-white/5 border border-white/[0.06] backdrop-blur-md transition-all text-white/80 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full bg-[#060510]/40 border border-white/5 backdrop-blur-md rounded-3xl p-6 pb-4 flex flex-col gap-12 overflow-hidden shadow-[inset_0_0_50px_rgba(81,106,246,0.05),inset_0_4px_24px_rgba(81,106,246,0.0.5)]"
          >
            {/* Inner shadow overlay div with pulse animation */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_30px_rgba(81,106,246,0.15),inset_0_4px_24px_rgba(81,106,246,0.25)]"
            />

            {/* Logo & Header */}
            <div className="flex flex-col items-center pt-12 text-center gap-4">
              <span className="text-5xl font-extrabold tracking-tight text-brand-secondary">
                ChadWallet
              </span>
              <h2 className="text-[#9899a3] text-2xl font-medium tracking-tight leading-7">
                Login or create an <br />
                account to start trading.
              </h2>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs py-3 px-4 rounded-xl font-medium text-center"
              >
                {error}
              </motion.div>
            )}

            {/* Authentication Buttons Container */}
            <div>
              <div className="flex flex-col gap-3">
                {/* Apple Login Button */}
                <button
                  onClick={() => toast.error('Apple Login is coming soon!')}
                  className="group relative w-full bg-white/50 text-black/60 font-bold py-3 rounded-2xl transition-all text-[15px] flex items-center justify-center shadow-sm cursor-not-allowed"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <AppleIcon size={24} className="!fill-black/60" />
                  </div>
                  <span>Continue with Apple</span>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                    <ArrowRightIcon className="w-5 h-5 !fill-black/60" />
                  </div>
                </button>

                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  className="group relative w-full hover:bg-[#1a1926] border border-white/[0.08] hover:border-white/[0.12] text-white font-bold py-3 rounded-2xl transition-all text-[15px] flex items-center justify-center"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <GoogleIcon size={24} />
                  </div>
                  <span>Continue with Google</span>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                    <ArrowRightIcon className="w-4 h-4 !fill-white" />
                  </div>
                </button>
              </div>

              {/* Terms of Service & Privacy Policy Disclaimer */}
              <p className="text-white/30 mt-4 text-xs max-w-70 font-normal text-center leading-tight mx-auto">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
