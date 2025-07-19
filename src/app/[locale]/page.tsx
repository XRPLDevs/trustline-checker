import { SectionHero } from '@/app/[locale]/_components/section-hero'
import { SectionTitle } from '@/app/[locale]/_components/section-title'
import { useAnalytics } from '@/components/analytics'

export default function Home() {
  const translationKey = 'Home'

  useAnalytics()

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <SectionTitle translationKey={translationKey} />
      <SectionHero />
    </div>
  )
}
