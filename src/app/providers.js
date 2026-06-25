'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { Toaster, useToasterStore, toast } from 'react-hot-toast';
import { useEffect } from 'react';
export default function Providers({ children }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const { toasts } = useToasterStore();

  useEffect(() => {
    const TOAST_LIMIT = 3;
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email', 'google'],
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#222224",
          logo: '/assets/logo/light.png',
        },
        embeddedWallets: {
          createOnLogin: 'off',

        },

      }}
    >
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: 'rgba(12, 17, 40, 0.4)',
            color: '#fff',
            border: '1px solid rgba(81, 106, 246, 0.2)',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '600',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#516af6',
              secondary: '#1a1a1a',
            },
          },
        }}
      />
    </PrivyProvider>
  );
}