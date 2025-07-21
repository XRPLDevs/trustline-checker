'use client'

import { useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem
} from '@heroui/navbar'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import NextLink from 'next/link'
import { useIsSSR } from '@react-aria/ssr'
import { Calendar, Languages, Github, Sun, Moon } from 'lucide-react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { siteConfig } from '@/config/site'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from '@heroui/modal'
import { WalletConnectButton } from '@/components/wallet-connect-button'
import { WalletMenuButton } from '@/components/wallet-menu-button'
import { useWalletStore } from '@/stores'

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
  const { isConnected } = useWalletStore()
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
            <img src="/logo.png" alt="Trustline Checker" className="w-8 h-8" />
            <p className="text-xl font-bold">TrustlineChecker</p>
          </NextLink>
        </NavbarBrand>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              aria-current="page"
              color="foreground"
              className="cursor-pointer"
              onPress={() => {
                router.push(item.href)
              }}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <Github className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Roadmap" href={siteConfig.links.roadmap}>
            <Calendar className="text-default-500" />
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
          {isConnected ? <WalletMenuButton /> : <WalletConnectButton />}
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
