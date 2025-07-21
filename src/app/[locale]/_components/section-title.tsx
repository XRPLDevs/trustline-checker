'use client'

import { useTranslations } from 'next-intl'
import { Alert } from '@heroui/alert'
import { title, subtitle } from '@/components/primitives'

interface SectionTitleProps {
  translationKey: string
}

export function SectionTitle({ translationKey }: SectionTitleProps) {
  const t = useTranslations(translationKey)

  return (
    <div className="inline-block text-center justify-center">
      <p className={title()}>{t('title1')}</p>
      <p className={title({ color: 'basic' })}>&nbsp;{t('title2')}</p>
      <div className={subtitle({ class: 'mt-1' })}>{t('subtitle')}</div>
      <div className="flex flex-col gap-4 w-lg text-left mt-2">
        <Alert variant="bordered" color="warning" title={t('alert')} />
      </div>
    </div>
  )
}
