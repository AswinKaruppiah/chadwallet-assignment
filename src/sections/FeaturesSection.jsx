import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      category: "KOL Feed",
      title: "copy-trade profitable key opinion leaders",
      description: "Track live trades from elite key opinion leaders, view their detailed win rates or PnL history, and copy-trade their strategies in one tap.",
      imagePath: "/assets/flow/kol-4.png",
      alt: "KOL Feed Flow",
    },
    {
      category: "Instant Trading",
      title: "swap trending tokens in two clicks",
      description: "Access live price charts, use one-tap quick buy presets, and lock in profits instantly with 20%, 50%, or full position quick-sell controls.",
      imagePath: "/assets/flow/buy-sell-4.png",
      alt: "Trading Flow",
    },
    {
      category: "Meme Launcher",
      title: "launch a coin directly from a tweet",
      description: "Turn any X post into a live token instantly. Auto-fill the name and ticker, buy the initial supply, and deploy it to the market in seconds.",
      imagePath: "/assets/flow/launch-4.png",
      alt: "Token Launches Flow",
    },
    {
      category: "X Signals",
      title: "catch early signals and map holders",
      description: "Monitor real-time Twitter mentions, check safety stats like developer snipe percentages, and analyze distribution with advanced holder bubblemaps.",
      imagePath: "/assets/flow/memecoin-4.png",
      alt: "Memecoin Trading Flow",
    },
    {
      category: "Wallet Management",
      title: "track assets and fiat onramps",
      description: "View your net worth timeline, execute seamless token transfers, and deposit or withdraw SOL directly via MoonPay integration.",
      imagePath: "/assets/flow/portfolio-4.png",
      alt: "Portfolio Tracking Flow",
    },
    {
      category: "Relaunch Protocol",
      title: "revive dead coins with one button",
      description: "Redeploy crashed or rugged tokens instantly. Copy their original metadata, set up your initial buy, and start fresh under a new contract.",
      imagePath: "/assets/flow/relaunch-4.png",
      alt: "Relaunching Flow",
    },
  ];

  return (
    <section
      id="features"
      className="relative flex flex-col justify-center !px-20 section-block"
    >
      {/* Header */}
      <div className="mb-10 md:mb-16 text-left">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter lowercase">
          never miss out again
        </h2>
        <p className="text-lg md:text-3xl text-secondary opacity-60 tracking-tight lowercase mt-2">
          the only social-first trading app
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gradient-to-b from-[#0a0a0a] to-[#1f1f1f] rounded-[32px] min-h-[420px] md:min-h-[500px] overflow-hidden group hover:border-white/10 shadow-2xl"
          >
            <div className="p-6 md:p-8 pb-0">
              <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                {feature.category}
              </span>
              <h3 className="text-3xl font-extrabold tracking-tighter text-white lowercase mt-3 mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                {feature.description}
              </p>
            </div>

            {/* Mobile Device Mockup / Image container */}
            <div className="relative w-full flex-1 min-h-[190px] md:min-h-[280px] mt-auto">
              <Image
                src={feature.imagePath}
                alt={feature.alt}
                fill
                className="object-contain object-bottom transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
