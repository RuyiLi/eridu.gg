<script>
  import Marquee from '$lib/components/Marquee.svelte'
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
      <h1 class="px-2 pb-3 text-7xl">ERIDU.GG</h1>
      <p class="px-2 text-lg">Fanmade Zenless Zone Zero Database</p>
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

  <!-- <h1 class="px-2 pb-3 text-7xl bg-stone-500">
    <Marquee text="TODAY'S HEADLINES" reverse />
    NEWS
  </h1> -->

  <!-- Current Banner Details + News -->
  <!-- TODO load this dynamically -->
  <div class="h-[480px]">
    <span
      class="absolute top-0 left-1/2 -translate-x-1/2 text-lg px-2 z-10 bg-stone-800 border border-stone-700 border-t-0"
      >Current Banners</span>
    <div class="relative col-span-2">
      <span class="absolute top-0 left-0 px-2 text-xl bg-stone-500 z-20">Mellow Waveride - Ellen Joe</span>
      <p>asdf</p>
    </div>
    <div class="relative col-span-2 border-l border-stone-700">
      <span class="absolute top-0 right-0 px-2 text-xl bg-stone-500 z-20">Dissonant Sonata - Deep Sea Visitor</span>
      <p>asdf</p>
    </div>
  </div>
</section>
