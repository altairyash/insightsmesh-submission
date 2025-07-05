import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false; // Disable webpack cache in development
    }
    return config;
  },
};

export default nextConfig;