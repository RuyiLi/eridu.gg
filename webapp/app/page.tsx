import { Box, Card, Container, Flex, Inset, Portal, Section } from '@radix-ui/themes'

import { Button } from '@/components/radix/Button'
import { Heading } from '@/components/radix/Heading'
import Image from 'next/image'
import Link from 'next/link'
import { Marquee } from '@/components/Marquee'
import { Text } from '@/components/radix/Text'
import signalSearch from '@/public/signal-search.webp'
import wallpaper from '@/public/wallpaper.png'

export default () => {
  return (
    <>
      {/* Diagonal stripe */}
      <Box className="invisible absolute right-[35%] top-0 -z-10 h-full w-36 -skew-x-[35deg] bg-[var(--ruby-8)] md:visible"></Box>

      <Container size="3" className="flex flex-col">
        {/* Hero */}
        <Section
          p="0"
          className="relative overflow-hidden border-0 border-b-4 border-[var(--accent-9)] md:rounded-b-xl md:border-4 md:border-t-0 md:border-[var(--ruby-8)]"
        >
          <Image src={wallpaper} alt="Eridu Backdrop" className="relative w-full" />
          <Box position="relative" width="100%" top="0" className="z-10">
            <Marquee text="Welcome to New Eridu" className="bg-[var(--ruby-8)] px-4">
              <Heading>ERIDU.GG</Heading>
            </Marquee>
            <Box className="bg-[var(--color-background)] px-4 pb-1 md:py-1">
              <Text>Fanmade Zenless Zone Zero Database</Text>
            </Box>
          </Box>

          {/* The other stripe */}
          <Box className="invisible absolute -left-10 top-0 -z-10 h-full w-36 skew-x-[30deg] bg-[var(--ruby-8)] md:visible"></Box>
        </Section>

        {/* Quick Links (TODO is this necessary?) */}
        <Box className="relative top-0 h-24 px-4">
          <Button
            asChild
            variant="solid"
            className="relative top-0 rounded-t-none border-t-0 bg-[var(--ruby-8)] text-white transition-all hover:h-9 sm:hover:h-16"
          >
            <Link href="/signal">
              <Image
                src={signalSearch}
                alt="Signal Search Icon"
                width="24"
                height="24"
                className="mr-0"
              />
              Signal Tracker &nbsp;&rarr;
            </Link>
          </Button>
        </Box>

        <Section className="relative top-0 p-0">
          <Flex gap="4" justify="between">
            <Card className="w-1/2 bg-[var(--color-background)] transition-shadow hover:shadow-sm">
              <Flex direction="column" gap="3">
                <Heading>Latest Banner</Heading>
                <Text>Firefly</Text>
              </Flex>
            </Card>
            <Card className="w-1/2 bg-[var(--color-background)]">
              <Flex direction="column" gap="3">
                <Heading>Changelog</Heading>
                <ul className="list-disc pl-4">
                  <Text asChild>
                    <li>Created the site</li>
                  </Text>
                </ul>
              </Flex>
            </Card>
          </Flex>
        </Section>
      </Container>

      {/* <Box className="absolute bottom-[109px] w-[52vw] overflow-hidden">
        <Marquee text="HOME HOME" className="z-10 w-[100vw] bg-[var(--lime-8)] px-4"></Marquee>
      </Box>
      <Marquee
        text="HOME HOME"
        className="absolute bottom-[109px] -z-10 w-full bg-[var(--lime-8)] px-4"
      ></Marquee> */}
    </>
  )
}
