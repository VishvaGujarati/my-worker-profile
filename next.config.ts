import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maidmatch-user.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
