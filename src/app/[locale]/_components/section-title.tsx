'use client'

import { useTranslations } from 'next-intl'
import { title, subtitle } from '@/components/primitives'

interface SectionTitleProps {
  translationKey: string
}

export function SectionTitle({ translationKey }: SectionTitleProps) {
  const t = useTranslations(translationKey)

  return (
    <div className="inline-block max-w-xl text-center justify-center">
      <span className={title()}>{t('title1')}</span>
      <span className={title({ color: 'violet' })}>&nbsp;{t('title2')}</span>
      <div className={subtitle({ class: 'mt-4' })}>{t('subtitle')}</div>
    </div>
  )
}
