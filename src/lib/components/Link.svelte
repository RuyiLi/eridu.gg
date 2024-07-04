<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  type LinkVariant = 'link' | 'button' | 'naked'

  let extraClasses = ''
  export { extraClasses as class }
  export let as: keyof SvelteHTMLElements = 'a'
  export let active = false
  export let activeClass = ''
  export let variant: LinkVariant = 'button'

  $: classes = {
    link: 'underline underline-offset-4 decoration-4 decoration-stone-400 hover:decoration-lime-400',
    button: `p-2 cursor-pointer border-stone-700 ${active ? `!border-lime-400 bg-stone-800 ${activeClass}` : 'hover:border-lime-400 hover:bg-stone-700'}`,
    naked: `hover:text-stone-200`,
  }
</script>

<svelte:element this={as} on:click {...$$restProps} class="{classes[variant]} {extraClasses} ">
  <slot></slot>
</svelte:element>
