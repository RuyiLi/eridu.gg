import { Box } from '@radix-ui/themes'
import { Marquee } from './Marquee'

export const Footer = () => {
  return (
    <Box className="relative left-0 top-0 -z-20 mt-20 w-full bg-[var(--color-background)]">
      <footer className="p-4 text-center text-sm text-[var(--gray-8)]">&copy; 2024 ERIDU.GG</footer>
    </Box>
  )
}
