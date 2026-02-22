/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next.js 14 key (renamed to serverExternalPackages in Next.js 15).
    // Keeps pdf-parse and pdfjs-dist out of the webpack client bundle —
    // without this, pdfjs-dist crashes the browser bundle (blank page, no styles).
    serverComponentsExternalPackages: ["pdf-parse", "pdfjs-dist"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

module.exports = nextConfig;
