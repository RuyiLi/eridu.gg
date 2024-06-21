'use client'

import { Box, TabNav } from '@radix-ui/themes'

import { Marquee } from './Marquee'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()
  return (
    <Box className="fixed left-0 top-0 z-10 w-full">
      <TabNav.Root justify="center" className="bg-[var(--color-background)] backdrop-blur-xl">
        <TabNav.Link asChild active={pathname === '/'}>
          <NextLink href="/">Home</NextLink>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/signal'}>
          <NextLink href="/signal">Signal Tracker</NextLink>
        </TabNav.Link>
      </TabNav.Root>
    </Box>
  )
}
