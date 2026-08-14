/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
