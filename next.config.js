/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS || false;
const repoName = 'Banjara-3.0'; // Your repo name

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Disable features that might be causing issues
    serverComponentsExternalPackages: [],
    optimizeCss: false,
    scrollRestoration: false,
  },
  // Increase the timeout for file operations
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Disable source maps in development to reduce file operations
  webpack: (config, { dev, isServer }) => {
    // Handle "browser is not defined" errors
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        browser: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;