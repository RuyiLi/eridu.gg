import { Heading as RadixHeading, type HeadingProps } from '@radix-ui/themes'

export const Heading: React.FC<HeadingProps> = (props) => {
  const className = `uppercase ${props.className}`
  return <RadixHeading {...props} className={className} size={{ sm: '9', initial: '8' }} />
}
