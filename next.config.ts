const nextConfig = {
  webpack: (config: { cache: boolean; }, { dev }: any) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;