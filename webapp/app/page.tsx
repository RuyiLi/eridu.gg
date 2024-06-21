import { Box, Card, Container, Flex, Inset, Portal, Section } from '@radix-ui/themes'

import { Button } from '@/components/radix/Button'
import { Heading } from '@/components/radix/Heading'
import Image from 'next/image'
import Link from 'next/link'
import { Marquee } from '@/components/Marquee'
import { Text } from '@/components/radix/Text'
import wallpaper from '@/public/wallpaper.png'

export default () => {
  return (
    <>
      {/* Diagonal stripe */}
      <Box className="absolute right-[35%] top-0 -z-10 h-full w-36 -skew-x-[35deg] bg-[var(--ruby-8)]"></Box>

      <Container size="3" className="flex flex-col">
        {/* Hero */}
        <Section
          p="0"
          className="relative overflow-hidden rounded-b-xl border-0 border-t-0 border-[var(--ruby-8)] md:border-4"
        >
          <Image src={wallpaper} alt="Eridu Backdrop" className="relative w-full" />
          <Box position="relative" width="100%" top="0" className="z-10">
            <Marquee text="Welcome to New Eridu" className="bg-[var(--ruby-8)] px-4">
              <Heading>ERIDU.GG</Heading>
            </Marquee>
            <Flex className="bg-[var(--color-backgrund)] px-4">
              <Text>Fanmade Zenless Zone Zero Database</Text>
            </Flex>
          </Box>

          <Box className="absolute -left-10 top-0 -z-10 h-[85%] w-24 skew-x-[30deg] bg-[var(--ruby-8)]"></Box>
          {/* <Box className="absolute left-1/2 top-0 -z-10 h-full w-32 rotate-[40deg] bg-[var(--ruby-8)]"></Box> */}
          {/* <Box className="absolute right-0 top-0 -z-10 h-full w-32 rotate-[35deg] bg-[var(--ruby-8)]"></Box> */}

          {/* <Box className="absolute -left-1 top-[100px] -translate-x-full rounded-l-lg border-r-0 bg-[var(--ruby-8)] p-6 text-center">
            <Image src={masterTape} alt="Master Tape" className="ml-7 w-24 grayscale" />
            Signal Tracker
          </Box>
          <Box className="absolute -left-1 top-[300px] -translate-x-full rounded-l-lg border-r-0 bg-[var(--ruby-8)] p-6 text-center">
            <Image src={masterTape} alt="Master Tape" className="ml-7 w-24 grayscale" />
            Signal Tracker
          </Box> */}
        </Section>

        <Flex className="relative top-0 h-24 px-4">
          <Button
            asChild
            variant="solid"
            className="relative top-0 rounded-t-none border-t-0 transition-all hover:h-9 sm:hover:h-16"
          >
            <Link href="/signal">Signal Tracker</Link>
          </Button>
        </Flex>

        <Section className="relative top-0 p-0">
          <Flex gap="4" justify="between">
            <Card className="w-1/2 bg-[var(--color-background)]">
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
