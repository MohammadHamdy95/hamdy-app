import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is plain files served by nginx behind Caddy.
  output: "export",
};

export default nextConfig;
