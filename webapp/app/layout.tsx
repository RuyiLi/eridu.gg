import './globals.css'

import { Box, Theme } from '@radix-ui/themes'

import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Vina_Sans } from 'next/font/google'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'ERIDU.GG',
  description: 'Zenless Zone Zero Database',
}

const inpin = localFont({
  src: './inpin.ttf',
  display: 'swap',
  variable: '--font-inpin',
})

const vinaSans = Vina_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vina-sans',
  weight: '400',
})

export default ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${inpin.variable} ${vinaSans.variable}`}>
        <Theme appearance="dark" accentColor="lime" radius="large" scaling="100%">
          <Box className="relative left-0 top-0 flex min-h-[100vh] w-full flex-col justify-between">
            <Navbar />
            <Box pt="7"></Box>
            {children}
            <Footer />
          </Box>
        </Theme>
      </body>
    </html>
  )
}
