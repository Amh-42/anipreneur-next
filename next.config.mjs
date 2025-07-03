/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com', // Allows images from Unsplash
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com', // Allows images from Pinterest
            },
            // You can add more domains here if needed in the future
        ],
    },
};

export default nextConfig;