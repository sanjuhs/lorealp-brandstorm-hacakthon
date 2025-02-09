import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    loader: "custom",
    loaderFile: "./custom-image-loader.js",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "super-rag.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
