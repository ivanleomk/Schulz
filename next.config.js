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
          destination: "http://127.0.0.1:8000/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
