import { SectionHero } from '@/app/[locale]/_components/section-hero'
import { SectionTitle } from '@/app/[locale]/_components/section-title'

export default function Home() {
  const translationKey = 'Home'

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <SectionTitle translationKey={translationKey} />
      <SectionHero />
    </div>
  )
}
