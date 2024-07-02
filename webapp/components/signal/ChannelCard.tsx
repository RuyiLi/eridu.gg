'use client'

import { Card, DataList, Flex, Inset } from '@radix-ui/themes'

import Image from 'next/image'
import Link from 'next/link'
import { Text } from '../radix/Text'
import { usePathname } from 'next/navigation'

export interface ChannelCardProps {
  bannerId: number
  bannerSlug: string
  bannerName: string
  bannerImage: string
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  bannerId,
  bannerSlug,
  bannerName,
  bannerImage,
}) => {
  const pathname = usePathname()
  const cardClass = [
    '-skew-x-6 cursor-pointer overflow-visible rounded-bl-none rounded-tr-none after:rounded-bl-none after:rounded-tr-none before:rounded-bl-none before:rounded-tr-none outline ',
  ]
  if (pathname === `/signal/${bannerSlug}`) {
    cardClass.push('outline-1 outline-[var(--accent-8)] bg-[var(--accent-3)]')
  } else {
    cardClass.push(
      'outline-8 outline-transparent hover:z-10 hover:animate-[waver_1s_ease-in-out_alternate_infinite]',
    )
  }

  return (
    <Link href={`/signal/${bannerSlug}`}>
      <Card className={cardClass.join(' ')}>
        <Flex width="100%" gap="6">
          <Inset className="h-full">
            <Image src={bannerImage} alt={bannerName} width="110" height="100" />
          </Inset>
          <Flex direction="column" width="100%">
            <Text>{bannerName}</Text>
            <DataList.Root className="w-full gap-1">
              <DataList.Item className="text-[var(--amber-9)]">
                <DataList.Label className="text-current">
                  <Text>S Pity</Text>
                </DataList.Label>
                <DataList.Value>
                  <Text>0/90</Text>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item className="text-[var(--purple-10)]">
                <DataList.Label className="text-current">
                  <Text>A Pity</Text>
                </DataList.Label>
                <DataList.Value>
                  <Text>0/10</Text>
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Flex>
        </Flex>
      </Card>
    </Link>
  )
}
