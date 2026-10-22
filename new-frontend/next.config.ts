import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  // Proxy unmatched API requests to backend.
  // fallback semantics: route handlers (static AND dynamic) take precedence;
  // the rewrite only catches paths with no Next.js route handler.
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
