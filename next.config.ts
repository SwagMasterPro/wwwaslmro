import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
