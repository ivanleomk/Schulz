/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/fastapi/:path*",
          destination: "http://localhost:8000/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
