import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
