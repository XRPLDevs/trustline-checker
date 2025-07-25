import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ja',
        permanent: false, // 一時的リダイレクト（302）
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xumm.app',
      }
    ]
  },
  experimental: {
    serverActions: true
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
