import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "**.tiendanube.com" },
      { protocol: "https", hostname: "**.mitiendanube.com" },
      { protocol: "https", hostname: "**.nuvemshop.com.br" },
    ],
  },
};

export default nextConfig;
