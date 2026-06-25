export default function FeaturesSection() {
  const features = [
    {
      category: "Leaderboard",
      title: "become a legend, top the leaderboard",
      imagePath: "/assets/flow/leaderboard.webp",
      alt: "Leaderboard Flow",
      cardClassName: "",
      imageClassName: "",
    },
    {
      category: "Social Feed",
      title: "discover and follow top traders",
      imagePath: "/assets/flow/social-static.webp",
      alt: "Social Feed Flow",
      cardClassName: "",
      imageClassName: "",
    },
    {
      category: "Alerts",
      title: "real time notifications for what the best are buying",
      imagePath: "/assets/flow/alerts-static.webp",
      alt: "Alerts Flow",
      cardClassName: "",
      imageClassName: "",
    },
    {
      category: "Apple Pay",
      title: "deposit instantly with apple pay",
      imagePath: "/assets/flow/apple-pay-static.webp",
      alt: "Apple Pay Flow",
      cardClassName: "",
      imageClassName: "!object-center",
    },
    {
      category: "Assets",
      title: "track your full portfolio at a glance",
      imagePath: "/assets/flow/assets-static.webp",
      alt: "Assets Flow",
      cardClassName: "",
      imageClassName: "",
    },
    {
      category: "Sign In",
      title: "get started in seconds, no seed phrase",
      imagePath: "/assets/flow/sign-in-static.webp",
      alt: "Sign In Flow",
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
        <p className="text-lg md:text-3xl text-secondary font-medium tracking-tight lowercase mt-2">
          the only social-first trading app
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`group flex flex-col bg-subtle border border-white/[0.06] rounded-3xl overflow-hidden ${feature.cardClassName}`}
          >
            {/* Card Text */}
            <div className="p-6 md:p-8 pb-4">
              <span className="font-mono font-bold tracking-[0.2em] text-brand uppercase">
                {feature.category}
              </span>
              <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-white lowercase mt-3 leading-snug">
                {feature.title}
              </h3>
            </div>

            {/* Image fills remaining space */}
            <div class="min-h-0 flex-1 -mt-16">
              <img
                src={feature.imagePath}
                alt={feature.alt}
                className={`h-full w-full object-contain object-bottom transition-transform duration-300 group-hover:scale-105 ${feature.imageClassName}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
