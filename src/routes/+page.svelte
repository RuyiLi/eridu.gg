<script>
  import Marquee from '$lib/components/Marquee.svelte'
  import { activeBanners, CDN_BASE_URL } from '$lib/data'
</script>

<svelte:head>
  <title>Home / ERIDU.GG</title>
  <meta name="description" content="Fanmade Zenless Zone Zero Database" />
</svelte:head>

<!-- dont really know how 2d grid works lol -->
<section class="relative flex flex-col gap-0 overflow-hidden *:grid *:grid-cols-4 *:relative">
  <div>
    <img class="col-span-3 brightness-100" src="images/wallpaper.png" alt="placeholder" />

    <div class="relative col-span-1 flex flex-col-reverse overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full border-l border-stone-700 -z-20"></div>
      <h1 class="px-2 pb-3 text-7xl">ERIDU.GG</h1>
      <p class="px-2 mb-1 text-lg">Fanmade Zenless Zone Zero Database</p>
    </div>

    <div class="absolute bottom-0 left-0 w-full pb-3 text-7xl bg-ruby-600 -z-20">
      <Marquee text="WELCOME TO NEW ERIDU" />
      &nbsp;
    </div>
    <div class="absolute bottom-0 left-0 w-1/6 pb-3 text-7xl bg-ruby-600 z-10">
      <Marquee text="WELCOME TO NEW ERIDU" />
      &nbsp;
    </div>
  </div>

  <!-- Current Banner Details + News -->
  <!-- TODO load this dynamically -->
  <div class="h-max min-h-[200px] bg-stone-900">
    <!-- <span
      class="absolute top-0 left-1/2 -translate-x-1/2 text-lg px-2 z-10 bg-stone-800 border border-stone-700 border-t-0">
      Current Channels
    </span> -->
    <a href="/signal/x/exclusive" class="relative col-span-2">
      <span class="absolute top-0 left-0 px-2 text-xl bg-stone-500 z-20">Exclusive Channel</span>
      <img
        src="{CDN_BASE_URL}/banners/{activeBanners[0]}.webp"
        alt="Current Limited Character Banner"
        class="w-full h-full object-cover triangle-clip transition-all" />
    </a>
    <a href="/signal/x/w-engine" class="relative col-span-2">
      <span class="absolute top-0 right-0 px-2 text-xl bg-stone-500 z-20">W-Engine Channel</span>
      <img
        src="{CDN_BASE_URL}/banners/{activeBanners[1]}.webp"
        alt="Current Limited W-Engine Banner"
        class="w-full h-full object-cover triangle-clip transition-all" />
    </a>
  </div>
</section>

<style>
  * > .triangle-clip {
    filter: brightness(50%) contrast(75%);
    clip-path: polygon(100% 0, 90% 50%, 100% 100%, 0 100%, 0 0);
  }

  *:hover > .triangle-clip {
    filter: brightness(85%) contrast(100%);
    clip-path: polygon(88% 0, 98% 50%, 88% 100%, 0 100%, 0 0);
  }
</style>
