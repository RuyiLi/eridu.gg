import { Button as RadixButton, type ButtonProps as RadixButtonProps } from '@radix-ui/themes'

interface ButtonProps extends RadixButtonProps {
  invert?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  const classes = ['cursor-pointer', props.className]
  if (props.variant === 'solid' && props.invert) {
    classes.push('hover:bg-[var(--accent-contrast)] hover:text-[var(--accent-9)]')
  }
  return <RadixButton {...props} className={classes.join(' ')} size={{ sm: '3', initial: '1' }} />
}
