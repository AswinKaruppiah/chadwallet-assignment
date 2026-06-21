
export default function Footer() {
  return (
    <footer className="w-full border-t rounded-t-3xl border-white/5 py-16 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left Column — Branding */}
        <div className="flex flex-col gap-3">
          <h3 className="text-4xl font-extrabold tracking-tighter text-white lowercase">
            chadwallet
          </h3>
          <p className="text-base text-white/40 font-medium lowercase">
            where traders become legends.
          </p>
          <p className="text-xs text-white/20 mt-4">
            &copy; {new Date().getFullYear()} ChadWallet Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
