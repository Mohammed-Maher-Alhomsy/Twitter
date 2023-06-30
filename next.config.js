/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["help.twitter.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
