import type { NextConfig } from 'next';

// Use env so you can change protocol/host/port on environment
const API_PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL || 'http';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || '3.144.123.59';
const API_PORT = process.env.NEXT_PUBLIC_API_PORT || '5000';

const nextConfig: NextConfig = {
  images: {
    // Modern formats when available
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      // Your backend uploads (env-configurable)
      {
        protocol: API_PROTOCOL as 'http' | 'https',
        hostname: API_HOST,
        port: API_PORT,
        pathname: '/public/**',
      },
      // Local dev fallbacks
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/public/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },

      // CDNs / third-parties you already use
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
