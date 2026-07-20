import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/ai-context.md",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/news/articole",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/news/articole/:path*",
        permanent: true,
      },
      {
        source: "/echipa",
        destination: "/consiliu-stiintific",
        permanent: true,
      },
      {
        source: "/consiliul-director",
        destination: "/consiliu-executiv",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "aslm.ro",
          },
        ],
        destination: "https://www.aslm.ro/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
