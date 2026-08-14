/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/*.ttf"],
  },
};

export default nextConfig;
