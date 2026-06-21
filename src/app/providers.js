'use client';

import React, { useState, useEffect } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'cmifzks1m00epif0cw4je35pq';

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['google', 'apple', 'email'],
        appearance: {
          theme: 'dark',
          accentColor: '#00E676',
          logo: '/assets/logo/light.png',
          showWalletLoginFirst: false,
        },
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
