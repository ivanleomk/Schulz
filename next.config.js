/** @type {import('next').NextConfig} */

const API_URL = "http://fastapi-image-backend.southeastasia.azurecontainer.io/";

const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/fastapi/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
