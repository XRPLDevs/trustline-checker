'use client'

import { useTheme } from 'next-themes'
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from '@heroui/navbar'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'
import clsx from 'clsx'
import { useIsSSR } from '@react-aria/ssr'
import { Languages, Github, Sun, Moon } from 'lucide-react'
import { siteConfig } from '@/config/site'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from '@heroui/modal'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useSearchParams } from 'next/navigation'

enum Locale {
  EN = 'en',
  JA = 'ja',
  KO = 'ko',
  ZH = 'zh',
  AR = 'ar'
}

export const Navbar = () => {
  const isSSR = useIsSSR()
  const { theme, setTheme } = useTheme()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSwitchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const isLight = theme === 'light' || isSSR

  const handleLanguageChange = (locale: string) => {
    const query = searchParams.toString()
    const href = query ? `${pathname}?${query}` : pathname
    router.replace(href, { locale })
  }

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Trustline Checker</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <Github className="text-default-500" />
          </Link>
          <Button
            variant="faded"
            color="default"
            isIconOnly
            onPress={handleSwitchTheme}
          >
            {isLight ? (
              <Sun className="text-warning-500" size={22} />
            ) : (
              <Moon className="text-secondary-500" size={22} />
            )}
          </Button>
          <Button variant="faded" color="default" isIconOnly onPress={onOpen}>
            <Languages className="text-gray-500" size={22} />
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
              <ModalHeader>
                <h2 className="text-lg font-bold">Select Language</h2>
              </ModalHeader>
              <ModalBody className="mb-4">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="faded"
                    color="default"
                    onPress={() => {
                      handleLanguageChange(Locale.AR)
                    }}
                  >
                    🇸🇦 العربية
                  </Button>
                  <Button
                    variant="faded"
                    color="default"
                    onPress={() => {
                      handleLanguageChange(Locale.EN)
                    }}
                  >
                    🇺🇸 English
                  </Button>
                  <Button
                    variant="faded"
                    color="default"
                    onPress={() => {
                      handleLanguageChange(Locale.JA)
                    }}
                  >
                    🇯🇵 日本語
                  </Button>
                  <Button
                    variant="faded"
                    color="default"
                    onPress={() => {
                      handleLanguageChange(Locale.KO)
                    }}
                  >
                    🇰🇷 한국어
                  </Button>
                  <Button
                    variant="faded"
                    color="default"
                    onPress={() => {
                      handleLanguageChange(Locale.ZH)
                    }}
                  >
                    🇨🇳 中文
                  </Button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </NavbarItem>
        {/*
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
        */}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <Github className="text-default-500" />
        </Link>
        <Button
          variant="faded"
          color="default"
          isIconOnly
          onPress={handleSwitchTheme}
        >
          {isLight ? (
            <Sun className="text-warning-500" size={22} />
          ) : (
            <Moon className="text-secondary-500" size={22} />
          )}
        </Button>
      </NavbarContent>
    </HeroUINavbar>
  )
}
