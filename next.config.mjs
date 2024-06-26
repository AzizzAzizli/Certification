/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['@mui/x-charts'],
    images: {
      domains: ['firebasestorage.googleapis.com','res.cloudinary.com'],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
    }
};

export default nextConfig;
/** @type {import('next').NextConfig} */
