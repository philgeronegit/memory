/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Ensures routing works under /memory
  basePath: "/memory",
  // Tells Next.js to generate correct URLs like /memory/_next/static/...
  assetPrefix: "/memory/",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `build`
  distDir: "build"
};

export default nextConfig;
