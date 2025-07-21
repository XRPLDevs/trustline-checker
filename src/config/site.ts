export type SiteConfig = typeof siteConfig

export const siteConfig: {
  name: string
  description: string
  navItems: {
    label: string
    href: string
  }[]
  links: {
    github: string
    roadmap: string
  }
} = {
  name: 'Trustline Checker',
  description: 'Your trustline, now a health check.',
  navItems: [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'About',
      href: '/about'
    }
  ],
  links: {
    github: 'https://github.com/XRPLDevs/trustline-checker',
    roadmap: 'https://github.com/orgs/XRPLDevs/projects/2'
    // twitter: 'https://twitter.com/hero_ui',
    // docs: 'https://heroui.com',
    // discord: 'https://discord.gg/9b6yyZKmH4',
    // sponsor: 'https://patreon.com/jrgarciadev'
  }
}

export const toastConfig = {
  duration: 3000
}
