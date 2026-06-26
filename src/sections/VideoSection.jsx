function MobileVideoView() {
  return (
    <div className="relative w-full sm:hidden z-0 pointer-events-none">
      <img
        src="/assets/chadwallet-mobile-app.webp"
        alt="ChadWallet Mobile App"
        className="w-full h-auto"
      />
      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-background via-background/80 to-transparent z-10" />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center w-full z-20">
        {/* Heading */}
        <h2 className="relative z-20 text-4xl md:text-6xl font-medium text-center mb-4 leading-[1.1] drop-shadow-xl px-4">
          trade from anywhere.<br />
          never lose a beat.
        </h2>

        {/* Subtitle / Paragraph */}
        <p className="relative z-20 text-secondary text-base sm:text-lg md:text-xl font-medium tracking-tight text-center max-w-2xl mx-auto px-4 mb-4">
          Pick up a trade on your phone, close it on your desktop — all in one app.
        </p>
      </div>
    </div>
  );
}

export default function VideoSection() {
  return (
    <section
      id="video"
      className="relative flex flex-col items-center !pb-0 overflow-hidden max-sm:!px-0 justify-center section-block"

    >
      {/* Mobile-Only View Component */}
      <MobileVideoView />
      <div className="hidden sm:flex flex-col items-center justify-center w-full">
        {/* Section Label (Hidden on mobile) */}
        <p className="hidden sm:block text-brand uppercase font-extrabold mb-4 font-mono text-xs sm:text-sm tracking-widest">
          NOW AVAILABLE ON WEB
        </p>

        {/* Mobile-Only Mockup (Placed behind text on mobile) */}


        {/* Heading */}
        <h2 className="relative z-20 text-4xl md:text-6xl font-medium text-center mb-4 leading-[1.1] drop-shadow-xl px-4">
          trade from anywhere.<br />
          never lose a beat.
        </h2>

        {/* Subtitle / Paragraph */}
        <p className="relative z-20 text-secondary text-base sm:text-lg md:text-xl font-medium tracking-tight text-center max-w-2xl mx-auto px-4 mb-10 md:mb-16">
          Pick up a trade on your phone, close it on your desktop — all in one app.
        </p>

        {/* Desktop & Mobile Mockup Container (Hidden on mobile) */}
        <div className="hidden sm:flex relative w-full max-w-6xl mx-auto -mt-8 sm:-mt-28 flex-col items-center select-none">
          {/* Desktop Monitor Image */}
          <div className="relative z-10 w-[92%] md:w-[94%]">
            <img
              src="/assets/chadwallet-desktop.webp"
              alt="ChadWallet Desktop Platform"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Overlapping Mobile Mockup */}
          <div className="absolute bottom-[10%] right-[-9%] w-[48%] md:w-[44%] max-w-[680px] z-20">
            <img
              src="/assets/chadwallet-desktop-phone.webp"
              alt="ChadWallet Mobile App Overlay"
              className="w-full h-auto object-contain animate-[float_4s_ease-in-out_infinite] drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Bottom Fade Mask */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 md:h-40 bg-gradient-to-t from-[#060510] via-[#060510]/85 to-transparent z-30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
