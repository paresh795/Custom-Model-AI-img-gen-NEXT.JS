/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'replicate.delivery',
          pathname: '/yhqm/**',
        },
      ],
    },
  };
  
  export default nextConfig;