<script>
  export let text = ''
  export let repeat = 10
  export let reverse = false
</script>

<div
  class="absolute top-0 left-0 flex gap-0 w-full opacity-15 overflow-hidden text-inherit italic select-none whitespace-nowrap
    {reverse ? '*:animate-[marquee_25s_linear_reverse_infinite]' : '*:animate-[marquee_25s_linear_infinite]'}">
  {#each { length: repeat } as _}
    <h1>{text}&nbsp;</h1>
  {/each}
</div>

<style>
  @keyframes -global-marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>
