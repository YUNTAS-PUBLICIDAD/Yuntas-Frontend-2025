import next from 'next';

/**@type {import('next').NextConfig} */
const nextConfig = {
  
 

  // configurar next para exportar sitio estático
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

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;