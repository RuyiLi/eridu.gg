import { Card, Container, Flex, Section } from '@radix-ui/themes'

import { Heading } from '@/components/radix/Heading'
import Image from 'next/image'
import { Text } from '@/components/radix/Text'
import masterTape from '@/public/mastertape.webp'

const ChannelCard = ({ channel }) => {
  return (
    <Card>
      <Flex gap="3">
        <Image src={masterTape} alt="Master Tape" className="w-20" />
        <Text>{channel}</Text>
      </Flex>
    </Card>
  )
}

export default () => {
  return (
    <Container size="4" pt="9">
      <Flex direction="column" gap="4">
        <Flex direction="row" gap="4">
          <Card>
            <Flex gap="3">
              <Text>Global Stats</Text>
            </Flex>
          </Card>
          <Card>
            <Flex gap="3">
              <Image src={masterTape} alt="Master Tape" className="w-20" />
              <Text>Exclusive Channel</Text>
            </Flex>
          </Card>
          <Card>
            <Flex gap="3">
              <Image src={masterTape} alt="Master Tape" className="w-20" />
              <Text>W-Engine Channel</Text>
            </Flex>
          </Card>
          <Card>
            <Flex gap="3">
              <Image src={masterTape} alt="Master Tape" className="w-20 grayscale" />
              <Text>Stable Channel</Text>
            </Flex>
          </Card>
          <Card>
            <Flex gap="3">
              <Image src={masterTape} alt="Master Tape" className="w-20 grayscale" />
              <Text>Beginner Channel</Text>
            </Flex>
          </Card>
        </Flex>
        <Flex direction="column"></Flex>
      </Flex>
    </Container>
  )
}
