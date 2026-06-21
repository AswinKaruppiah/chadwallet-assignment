'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

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
    </PrivyProvider>
  );
}