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
  title: "ChadWallet | Where Traders Become Legends",
  description: "Trade memecoins, altcoins, and stablecoins on the ultimate social-first Solana wallet. Follow top traders, copy trades, and swap instantly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030303] text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
