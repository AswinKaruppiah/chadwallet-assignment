'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['google', 'apple'],
        appearance: {
          theme: 'dark',
          logo: '/assets/logo/light.png',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
