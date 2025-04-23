import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ranobes.top',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.bigbrain.gg",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
