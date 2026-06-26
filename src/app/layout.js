import localFont from "next/font/local";
import "../styles/globals.css";
import Providers from "./providers";
import NextTopLoader from "nextjs-toploader";

const aeonik = localFont({
  src: [
    {
      path: "./fonts/Aeonik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Bold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Aeonik-Bold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  display: "block",
});

export const metadata = {
  title: "ChadWallet | The #1 Memecoin Trading App",
  description: "Social trading, instant swaps, advanced analytics, and secure non-custodial ownership. Join thousands of traders profiting consistently on ChadWallet.",
  keywords: ["Solana", "Crypto Wallet", "Memecoin Trading App", "Social Trading Wallet", "Copy Trading Solana", "ChadWallet", "Web3", "Solana Wallet", "Crypto Analytics"],
  authors: [{ name: "ChadWallet Team" }],
  creator: "ChadWallet",
  publisher: "ChadWallet",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chadwallet-assignment.vercel.app",
    title: "ChadWallet | The #1 Memecoin Trading App",
    description: "Social trading, instant swaps, advanced analytics, and secure non-custodial ownership. Join thousands of traders profiting consistently on ChadWallet.",
    siteName: "ChadWallet",
    images: [
      {
        url: "https://chadwallet-assignment.vercel.app/assets/logo/light.png?v=1",
        width: 512,
        height: 512,
        alt: "ChadWallet Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChadWallet | The #1 Memecoin Trading App",
    description: "Social trading, instant swaps, advanced analytics, and secure non-custodial ownership. Join thousands of traders profiting consistently on ChadWallet.",
    images: ["https://chadwallet-assignment.vercel.app/assets/logo/light.png?v=1"],
  },
  icons: {
    icon: "/favicon.ico?v=1",
    shortcut: "/favicon.ico?v=1",
    apple: "/assets/logo/light.png?v=1",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${aeonik.variable} antialiased`}
      >
        <NextTopLoader
          color="#516af6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #516af6,0 0 5px #516af6"
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
