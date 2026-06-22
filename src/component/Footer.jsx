import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t rounded-t-3xl border-white/5 pt-12 md:pt-16 overflow-hidden flex flex-col justify-between">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col md:flex-row justify-between gap-12 mb-8 md:mb-24">
        {/* Left Column — Branding */}
        <div className="flex flex-col gap-3">
          <Image
            src="/assets/logo/light.png"
            alt="ChadWallet Logo"
            width={48}
            height={48}
            className="object-contain rounded-full mb-4"
          />
          <p className="text-base text-white/40 font-medium lowercase">
            where traders become legends.
          </p>
          <p className="text-xs text-white/20 mt-2">
            &copy; {new Date().getFullYear()} ChadWallet Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Massive Text at the Bottom */}
      <div className="w-full flex justify-center items-end px-4 md:px-8 mt-12 lg:mt-28">
        <h1 className="text-[14vw] font-black tracking-tighter leading-[0.75] uppercase text-center w-full select-none bg-gradient-to-b from-zinc-100/90 via-zinc-600 to-black bg-clip-text text-transparent transform scale-y-[1.8] origin-bottom">
          CHADWALLET
        </h1>
      </div>
    </footer>
  );
}
