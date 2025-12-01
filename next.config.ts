/** @type {import('next').NextConfig} */
import { SpeedInsights } from "@vercel/speed-insights/next"
const nextConfig = {
  // 1. On dit à Next.js d'ignorer les erreurs TypeScript pour le build
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. On fait pareil pour les erreurs de style (ESLint)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;