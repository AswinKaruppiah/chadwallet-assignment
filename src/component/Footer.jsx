import Link from "next/link";

const footerLinks = {
  About: [
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Affiliates", href: "#" },
  ],
  Social: [
    { label: "Discord", href: "#" },
    { label: "X/Twitter", href: "https://x.com/chadwallet" },
    { label: "Instagram", href: "#" },
    { label: "Youtube", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full flex flex-col">
      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-10 pt-8 pb-14 flex flex-col md:flex-row justify-between gap-12">

        {/* Left Column — Branding */}
        <div className="flex flex-col gap-1">
          <span className="text-4xl font-bold tracking-tight text-brand-secondary">
            ChadWallet
          </span>
          <p className="text-2xl text-secondary font-medium lowercase mt-1">
            where traders become legends.
          </p>
          <p className="text-white/35 mt-4">
            &copy; {new Date().getFullYear()} ChadWallet Inc. All rights reserved.
          </p>
        </div>

        {/* Right — Link Columns */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-1 md:gap-3 min-w-[100px]">
              <p className="text-sm tracking-tight text-white/35 font-mono font-light uppercase mb-1">
                {section}
              </p>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white hover:text-white/60 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Massive Company Name */}
      <div className="w-full flex justify-center items-end overflow-hidden">
        <span className="text-[17vw] font-bold leading-[0.75] tracking-tighter bg-gradient-to-b from-brand-secondary to-brand/10 bg-clip-text text-transparent select-none whitespace-nowrap">
          ChadWallet
        </span>
      </div>
    </footer>
  );
}
