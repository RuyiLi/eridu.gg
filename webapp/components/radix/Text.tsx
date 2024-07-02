import { Text as RadixText, type TextProps } from '@radix-ui/themes'

export const Text: React.FC<TextProps> = (props) => {
  return <RadixText {...props} size={{ sm: '4', initial: '3' }} />
}
