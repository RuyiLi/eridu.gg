<script>
  import { page } from '$app/stores'
  import Marquee from '$lib/components/Marquee.svelte'
</script>

<h1 class="absolute top-3/4 w-full text-center text-7xl pb-3 bg-yellow-700 origin-left -skew-y-[15deg]">
  <Marquee text="ERROR ERROR ERROR ERROR" />
  &nbsp;
</h1>
<h1 class="absolute top-20 w-full text-center text-7xl pb-3 bg-yellow-600 origin-left skew-y-[23deg] shadow-lg">
  <Marquee text="ERROR ERROR ERROR ERROR" />
  &nbsp;
</h1>
<h1 class="absolute top-1/2 -translate-y-1/2 w-full text-center text-7xl pb-3 bg-yellow-600 shadow-lg">
  <Marquee text="? ? ? ? ? ? ? ? ? ? ? ? ?" reverse />
  {$page.status}: {$page.error?.message}
</h1>
