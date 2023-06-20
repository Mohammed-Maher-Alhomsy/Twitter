/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["twitter-v3.vercel.app"],
  },
};

module.exports = nextConfig;
