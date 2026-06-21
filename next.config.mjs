/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "arweave.net" },
      { hostname: "*.ipfs.nftstorage.link" },
      { hostname: "static.jup.ag" },
      { hostname: "pyth.network" },
    ],
  },
};

export default nextConfig;
// Cache bust to force reload: 1

