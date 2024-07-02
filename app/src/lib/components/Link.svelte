<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  let extraClasses = ''
  export { extraClasses as class }
  export let as: keyof SvelteHTMLElements = 'a'
  export let active = false
  export let activeClass = ''
</script>

<svelte:element
  this={as}
  {...$$restProps}
  class="p-2 cursor-pointer border-stone-700 {extraClasses}
    {active ? `!border-lime-400 bg-stone-800 ${activeClass}` : 'hover:border-lime-400 hover:bg-stone-700'}">
  <slot></slot>
</svelte:element>
