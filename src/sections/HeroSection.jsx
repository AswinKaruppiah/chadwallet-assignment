export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-white px-6 text-center bg-hero bg-cover bg-center bg-no-repeat"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content goes on top of overlay */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter lowercase">
          hero section
        </h1>
      </div>
    </section>
  );
}
