import { tv } from 'tailwind-variants'

export const typography = tv({
  variants: {
    color: {
      default: 'text-default-600',
      foreground: 'text-foreground'
    },
    heading: {
      h1: 'text-4xl md:text-5xl font-bold',
      h2: 'text-3xl md:text-4xl font-bold',
      h3: 'text-2xl md:text-3xl font-bold',
      h4: 'text-xl md:text-2xl font-bold',
      h5: 'text-lg md:text-xl font-bold',
      h6: 'text-base md:text-lg font-bold',
      subtitle: 'text-sm md:text-base',
      body1: 'text-sm md:text-base',
      body2: 'text-sm md:text-base'
    }
  },
  defaultVariants: {
    color: 'default',
    heading: 'body1'
  }
})
