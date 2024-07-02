'use client'

import { Box, TabNav } from '@radix-ui/themes'

import Image from 'next/image'
import Link from 'next/link'
import interknot from '@/public/interknot.webp'
import signalSearch from '@/public/signal-search.webp'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()
  return (
    <Box className="fixed left-0 top-0 z-10 w-full">
      <TabNav.Root justify="center" className="bg-[var(--color-background)] backdrop-blur-xl">
        <TabNav.Link asChild active={pathname === '/'}>
          <Link href="/">Home</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/signal'}>
          <Link href="/signal">
            <Image
              src={signalSearch}
              alt="Signal Search Icon"
              width="24"
              height="24"
              className="mr-2"
            />
            Signal Tracker
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/interknot'}>
          <Link href="/interknot">
            <Image
              src={interknot}
              alt="Interknow News Icon"
              width="24"
              height="24"
              className="mr-2"
            />
            News
          </Link>
        </TabNav.Link>
      </TabNav.Root>
    </Box>
  )
}
