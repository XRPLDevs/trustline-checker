import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Link } from '@heroui/link'
import clsx from 'clsx'
import Image from 'next/image'

import { Providers } from '@/app/[locale]/providers'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { AnalyticsListener } from '@/components/analytics'
// i18n
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
// toast
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = (await import(`../../locales/${locale}.json`)).default

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <body
        suppressHydrationWarning
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers
          themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
          locale={locale}
          messages={messages}
        >
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full border-t bg-background/80 backdrop-blur flex items-center justify-between py-4 px-6 text-sm">
              {/* Left: Service Name & Operator */}
              <div className="flex items-center gap-2">
                <span className="text-default-600">Powered by</span>
                <Link
                  isExternal
                  href="https://x.com/0xpokotaro"
                  title="pokotaro x account"
                  className="text-primary font-semibold hover:underline"
                >
                  pokotaro
                </Link>
              </div>

              {/* Center: Navigation */}
              <nav className="flex gap-4">
                <Link
                  href={`/${locale}/about`}
                  className="hover:underline text-default-600"
                >
                  About
                </Link>
              </nav>

              {/* Right：Sponsored by */}
              <div className="flex items-center gap-2">
                <span className="text-default-600">Sponsored by</span>
                <Link
                  href="https://www.ruckplus-tech.io/"
                  target="_blank"
                  className="hover:underline text-default-600"
                >
                  <div className="relative w-[100px] h-8">
                    {/* Light mode */}
                    <Image
                      src="/partners/ruckplus-light.png"
                      alt="Ruckplus"
                      fill
                      className="object-contain block dark:hidden"
                    />
                    {/* Dark mode */}
                    <Image
                      src="/partners/ruckplus-dark.png"
                      alt="Ruckplus"
                      fill
                      className="object-contain hidden dark:block"
                    />
                  </div>
                </Link>
              </div>
            </footer>
          </div>
        </Providers>
        <AnalyticsListener />
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  )
}
