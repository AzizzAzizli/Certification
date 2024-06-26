/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['@mui/x-charts'],
    images: {
      domains: ['firebasestorage.googleapis.com','res.cloudinary.com'],
    },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
