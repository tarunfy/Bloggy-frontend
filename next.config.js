/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
      },
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/user/signup",
        destination: `${process.env.BACKEND_BASE_URL}/api/user/signup`, // Proxy to Backend
      },
      {
        source: "/api/user/login",
        destination: `${process.env.BACKEND_BASE_URL}/api/user/login`, // Proxy to Backend
      },
      {
        source: "/api/user/currentUser",
        destination: `${process.env.BACKEND_BASE_URL}/api/user/currentUser`, // Proxy to Backend
      },
      {
        source: "/api/user/logout",
        destination: `${process.env.BACKEND_BASE_URL}/api/user/logout`, // Proxy to Backend
      },
      {
        source: "/api/user/:userId",
        destination: `${process.env.BACKEND_BASE_URL}/api/user/:userId`, // Proxy to Backend
      },
      {
        source: "/api/blogs/create",
        destination: `${process.env.BACKEND_BASE_URL}/api/blogs/create`, // Proxy to Backend
      },
      {
        source: "/api/blogs",
        destination: `${process.env.BACKEND_BASE_URL}/api/blogs`, // Proxy to Backend
      },
      {
        source: "/api/blogs/:blogId",
        destination: `${process.env.BACKEND_BASE_URL}/api/blogs/:blogId`, // Proxy to Backend
      },
      {
        source: "/api/blogs/comments/:blogId",
        destination: `${process.env.BACKEND_BASE_URL}/api/blogs/comments/:blogId`, // Proxy to Backend
      },
      {
        source: "/api/blogs/:blogId/likes",
        destination: `${process.env.BACKEND_BASE_URL}/api/blogs/:blogId/likes`, // Proxy to Backend
      },
      {
        source: "/api/blogs/:blogId/comment",
        destination: `${process.env.BACKEND_BASE_URL}/api/blogs/:blogId/comment`, // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
