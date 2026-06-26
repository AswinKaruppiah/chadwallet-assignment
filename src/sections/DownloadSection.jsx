import HeroButtons from "@/component/HeroButtons";

export default function DownloadSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden w-full">

      {/* Legends Background */}
      <img
        src="/assets/legends.webp"
        alt="Legends"
        fill
        className="absolute inset-0 w-full h-full bottom-0 object-cover"
        priority
      />
      {/* Top and Bottom Fades */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="w-full px-4 sm:px-8 sm:w-[80vw]">
        <div className="flex flex-col justify-center items-center py-24 sm:py-0 aspect-auto sm:aspect-square relative">
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-5">
              a trading app <br /> for the rest of us
            </h2>
            <p className="text-lg md:text-xl font-medium -tracking-tight  text-[#9899a3] mb-4">
              join 500,000 traders making their name on chadwallet
            </p>

            <HeroButtons />
          </div>
          {/* Outer Circle */}
          <img
            src="/assets/outer-circle.webp"
            alt="Outer Circle"
            fill
            className="absolute inset-0 m-auto z-1 w-screen desktop:w-[55vw] animate-[spin_45s_linear_infinite] desktop:max-w-275"
          />

          {/* Inner Circle */}
          <img
            src="/assets/inner-circle.webp"
            alt="Inner Circle"
            fill
            className="absolute inset-0 m-auto z-1 w-[35vw] desktop:w-[30vw] animate-[spin_30s_linear_infinite_reverse]"
          />
        </div>
      </div>
    </section>
  );
}
