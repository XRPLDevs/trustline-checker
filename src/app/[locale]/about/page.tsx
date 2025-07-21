'use client'

import { subtitle } from '@/components/primitives'
import { typography } from '@/app/[locale]/about/primitives'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('About')

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-2xl">
        <p className={subtitle()}>{t('title')}</p>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('lead1')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('lead2')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('lead3')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'subtitle', color: 'default' })}>{t('project')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('project1')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('project2')}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className={typography({ heading: 'subtitle', color: 'default' })}>{t('features')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('feature1')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('feature2')}</p>
            <p className={typography({ heading: 'body1', color: 'default' })}>{t('feature3')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
