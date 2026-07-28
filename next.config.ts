import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack rooted in this project (avoids parent lockfile confusion)
    root: process.cwd(),
  },
  experimental: {
    serverActions: {
      // Allow larger form payloads (attachments / long snippets)
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
