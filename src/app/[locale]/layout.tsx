import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Link } from '@heroui/link'
import clsx from 'clsx'

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
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://x.com/0xpokotaro"
                title="pokotaro x account"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">pokotaro</p>
              </Link>
            </footer>
          </div>
        </Providers>
        <AnalyticsListener />
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  )
}
