export default function VideoSection() {
  return (
    <section
      id="video"
      className="relative flex flex-col items-center justify-center section-block"
    >
      {/* Section Label */}
      <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">
        See It in Action
      </p>

      {/* Heading */}
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white text-center mb-16">
        Trade Like a Chad.
      </h2>

      {/* Desktop Mockup */}
      <div className="relative w-full max-w-5xl">

        {/* Wide ambient glow — orange */}
        <div className="absolute -inset-7 bg-orange-500/20 blur-[80px] rounded-full z-0" />

        {/* Tight glow — brighter orange directly behind screen */}
        <div className="absolute inset-4 bg-orange-400/30 blur-md rounded-2xl z-0" />

        {/* Monitor body — glowing border */}
        <div className="relative z-10 rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5 shadow-[0_0_60px_rgba(251,146,60,0.3)]">
          <div className="bg-[#111111] rounded-2xl p-2">
            {/* Screen / Video — fixed 16:9 */}
            <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
              <video
                src="/assets/video/chadwallet.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Screen glare overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
