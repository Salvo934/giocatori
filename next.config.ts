import type { NextConfig } from "next";
import path from "path";

/** Risolve dipendenze di PostCSS annidate in Next/Turbopack (picocolors, source-map-js). */
function nodeModule(pkg: string): string {
  return path.join(process.cwd(), "node_modules", pkg);
}

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      picocolors: nodeModule("picocolors"),
      "source-map-js": nodeModule("source-map-js"),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
