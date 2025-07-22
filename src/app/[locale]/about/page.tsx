'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Alert } from '@heroui/alert'
import { typography } from '@/app/[locale]/about/primitives'

export default function AboutPage() {
  const t = useTranslations('AboutPage')

  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-20">
      <Image
        src="/about-header.png"
        alt="TrustlineCheckerのイメージ画像"
        width={1200}
        height={400}
        className="w-full h-auto rounded-lg mb-5"
        sizes="(max-width: 768px) 100vw, 1200px"
        priority
      />
      <div className="flex flex-col gap-12 w-full max-w-2xl">
        {/* title */}
        <div>
          <p className={typography({ heading: 'h2', color: 'default' })}>
            {t('title')}
          </p>
        </div>

        <Alert
          color="warning"
          variant="faded"
          endContent={
            <div className="flex flex-col">
              <p className="text-md font-bold pb-1">{t('invest.title')}</p>
              <p className="text-sm">{t('invest.descriptions.0')}</p>
              <p className="text-sm">{t('invest.descriptions.1')}</p>
              <p className="text-sm">
                <Link
                  href="https://x.com/0xpokotaro"
                  target="_blank"
                  className="text-blue-500"
                >
                  {t('invest.contact')}
                </Link>
              </p>
            </div>
          }
        />

        {/* Introduction */}
        <div className="flex flex-col gap-5">
          <p className={typography({ heading: 'h4', color: 'default' })}>
            {t('introduction.title')}
          </p>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('introduction.descriptions.0')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('introduction.descriptions.1')}
            </p>
          </div>
        </div>

        {/* Context */}
        <div className="flex flex-col gap-5">
          <p className={typography({ heading: 'h4', color: 'default' })}>
            {t('context.title')}
          </p>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('context.descriptions.0')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('context.descriptions.1')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('context.descriptions.2')}
            </p>
          </div>
        </div>

        {/* Trend */}
        <div className="flex flex-col gap-5">
          <p className={typography({ heading: 'h4', color: 'default' })}>
            {t('trend.title')}
          </p>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('trend.descriptions.0')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('trend.descriptions.1')}
            </p>
          </div>
        </div>

        {/* TrustlineChecker */}
        <div className="flex flex-col gap-5">
          <p className={typography({ heading: 'h4', color: 'default' })}>
            {t('about.title')}
          </p>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('about.descriptions.0')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('about.descriptions.1')}
            </p>
            <ul className="list-disc list-inside py-4">
              <li>
                <span
                  className={typography({ heading: 'body1', color: 'default' })}
                >
                  {t('about.features.0')}
                </span>
              </li>
              <li>
                <span
                  className={typography({ heading: 'body1', color: 'default' })}
                >
                  {t('about.features.1')}
                </span>
              </li>
              <li>
                <span
                  className={typography({ heading: 'body1', color: 'default' })}
                >
                  {t('about.features.2')}
                </span>
              </li>
              <li>
                <span
                  className={typography({ heading: 'body1', color: 'default' })}
                >
                  {t('about.features.3')}
                </span>
              </li>
            </ul>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('about.descriptions.2')}
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col gap-5">
          <p className={typography({ heading: 'h4', color: 'default' })}>
            {t('vision.title')}
          </p>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('vision.descriptions.0')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('vision.descriptions.1')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('vision.descriptions.2')}
            </p>
            <p className={typography({ heading: 'body1', color: 'default' })}>
              {t('vision.descriptions.3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
