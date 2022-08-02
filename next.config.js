module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: false,
  trailingSlash: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: 'cloudinary',
    path: "cloudinary://417721411368189:QiVZ8fJOoGbCEOeW1X8yukfrqs0@dyangxc7h",
    domains: ['nftstorage.link' , 'dweb.link', 'ipfs.io'],
  },  
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }
  }
  return nextConfig
}
