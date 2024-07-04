<script>
  import Link from '$lib/components/Link.svelte'
  import Marquee from '$lib/components/Marquee.svelte'
</script>

<!-- Top banner -->
<section class="grid grid-cols-4">
  <a href="/signal/x/" class="relative col-span-3">
    <h1 class="px-2 text-6xl pb-2 bg-orange-500 hover:bg-orange-400">
      <Marquee text="SEARCHING" />
      SIGNAL TRACKER
    </h1>
  </a>
  <Link
    href="/signal/x/import"
    class="col-span-1 flex justify-center items-center text-lg bg-lime-400 text-stone-700 hover:!bg-lime-300">
    Import
  </Link>
</section>

<slot></slot>
