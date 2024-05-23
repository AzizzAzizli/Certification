/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['@mui/x-charts'],
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },
};

export default nextConfig;
/** @type {import('next').NextConfig} */
