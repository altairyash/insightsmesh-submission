const nextConfig = {
  webpack: (config: { cache: boolean; }, { dev }: any) => {
    if (dev) {
      config.cache = false; // Disable webpack cache in development
    }
    return config;
  },
};

export default nextConfig;