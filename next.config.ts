import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint:{
        ignoreDuringBuilds: true,
    },

    typescript:{
        ignoreBuildErrors: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/wikipedia/commons/**',
            },
        ],
    },
};

export default nextConfig;
