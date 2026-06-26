import TopBar from "@/component/TopBar";
import HeroButtons from "@/component/HeroButtons";

export default function HeroSection() {

  return (
    <section
      id="hero"
      className="relative select-none text-white px-4 isolate flex flex-col min-h-svh overflow-hidden"
    >
      <img
        src="/hero/hero-bg.webp"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full -z-10"
        fetchPriority="high"
      />

      {/* Top Bar */}
      < TopBar />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center pt-12 px-6 text-center gap-2" >
        <h1 className="text-7xl md:text-[9rem] mb-3 font-extrabold text-brand-secondary tracking-tighter">
          Chadwallet
        </h1>
        <p className="text-xl sm:text-3xl md:text-4xl font-medium tracking-tighter text-[#eaedff] lowercase">
          the #1 memecoin trading app.
        </p>
        <p className="text-base sm:text-xl text-[#D1D8FF99] font-medium lowercase max-w-xl mx-auto">
          social trading, instant swaps, and smart analytics. join the thousands of traders who profit consistently.
        </p>
        <HeroButtons />
      </div >
      <div className="w-[150%] -ml-[25%] sm:w-full sm:ml-0 flex justify-center -mt-20 sm:-mt-10 desktop:-mt-20 pointer-events-none">
        <img
          alt="Astronaut"
          className="block w-full h-[420px] desktop:h-[520px] object-contain animate-[float_4s_ease-in-out_infinite]"
          fetchPriority="high"
          src="/hero/astronaut.webp"
        />
      </div>
    </section >
  );
}
