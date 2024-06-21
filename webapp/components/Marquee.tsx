import { Box, type BoxProps, Flex } from '@radix-ui/themes'
import { Heading } from './radix/Heading'

interface MarqueeProps {
  text: string
  repeat?: number
}

export const Marquee: React.FC<React.PropsWithChildren<MarqueeProps> & BoxProps> = ({
  text,
  repeat = 10,
  children,
  ...props
}) => {
  return (
    <Box overflow="hidden" className="relative w-full" {...props}>
      <Flex direction="row" align="start" gap="0">
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <Heading
              key={i}
              size="9"
              color="gray"
              className="animate-[marquee_10s_linear_infinite] select-none whitespace-nowrap pb-2 uppercase opacity-20 md:pb-3"
            >
              <em>{text}&nbsp;</em>
            </Heading>
          ))}
      </Flex>
      <Box position="absolute" top="0" width="100%">
        {children}
      </Box>
    </Box>
  )
}
