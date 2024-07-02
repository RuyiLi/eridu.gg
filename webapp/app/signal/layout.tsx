import { Box, Flex } from '@radix-ui/themes'

import { ChannelCard, type ChannelCardProps } from '@/components/signal/ChannelCard'
import type { Metadata } from 'next'
import { banners } from '@/util/constants'

export const metadata: Metadata = {
  title: 'ERIDU.GG - Signal Tracker',
  description: 'Zenless Zone Zero Signal Search Tracker',
}

export default ({ children }: React.PropsWithChildren) => {
  return (
    <Box px={{ initial: '0', md: '8' }} mt="8">
      <Flex direction={{ initial: 'column', md: 'row' }} gap="8" px="4">
        <Flex direction="column" gap="2">
          {banners.map((banner, i) => (
            <Box
              key={banner.bannerId}
              width={`calc(100% - ${banners.length - 1}rem)`}
              style={{ marginLeft: `${banners.length - 1 - i}rem` }}
            >
              <ChannelCard {...banner} />
            </Box>
          ))}
        </Flex>
        <Box></Box>
        <Flex direction="column">{children}</Flex>
      </Flex>
    </Box>
  )
}
