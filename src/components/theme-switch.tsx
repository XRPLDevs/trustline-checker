'use client'

import { FC } from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@heroui/button'
import { useTheme } from 'next-themes'
import { useIsSSR } from '@react-aria/ssr'
import clsx from 'clsx'

export interface ThemeSwitchProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'bordered' | 'flat' | 'faded' | 'shadow' | 'ghost'
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  size = 'md',
  variant = 'light',
  color = 'default'
}) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const isLight = theme === 'light' || isSSR

  return (
    <Button
      isIconOnly
      size={size}
      variant={variant}
      color={color}
      onPress={handleToggle}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className={clsx('transition-all duration-200 hover:scale-105', className)}
    >
      {isLight ? (
        <Sun size={22} className="text-warning-500" />
      ) : (
        <Moon size={22} className="text-secondary-500" />
      )}
    </Button>
  )
}
