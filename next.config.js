/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/workers:slug*",
        // destination: `http://127.0.0.1:8787/:slug*`,
        destination: `https://schulz-multipart-file-upload.ivanleomk9297.workers.dev/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;
