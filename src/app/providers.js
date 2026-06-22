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
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: '600',
          },
          success: {
            iconTheme: {
              primary: '#fb923c',
              secondary: '#1a1a1a',
            },
          },
        }}
      />
    </PrivyProvider>
  );
}