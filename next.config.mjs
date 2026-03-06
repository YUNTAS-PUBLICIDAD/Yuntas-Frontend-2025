import next from 'next';

/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',

  trailingSlash: true,

  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/',
      },
      {
        protocol: 'https',
        hostname: 'apiyuntas.yuntaspublicidad.com',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;