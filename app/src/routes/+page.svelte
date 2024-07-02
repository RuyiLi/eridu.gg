<script>
  import Marquee from '$lib/components/Marquee.svelte'
</script>

<svelte:head>
  <title>Home / ERIDU.GG</title>
  <meta name="description" content="Fanmade Zenless Zone Zero Database" />
</svelte:head>

<section class="relative grid grid-cols-4 overflow-hidden">
  <img class="col-span-3 brightness-100" src="images/wallpaper.png" alt="placeholder" />
  <div class="relative col-span-1">
    <div class="absolute top-0 left-0 w-full h-full border-l border-stone-700 -z-20"></div>
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden p-2">
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
      <h1 class="text-5xl">NEWS</h1>
    </div>
  </div>
  <div class="absolute -bottom-12 left-0 w-full pb-3 text-7xl bg-ruby-800 -z-10 origin-left -skew-y-3">
    <Marquee text="WELCOME TO NEW ERIDU" reverse />
    &nbsp;
  </div>
</section>

<section>
  <h1 class="relative w-full mt-0 px-2 pb-3 text-7xl bg-ruby-600 overflow-hidden">
    <Marquee text="WELCOME TO NEW ERIDU" />
    ERIDU.GG
  </h1>
  <p class="px-2 text-lg">Fanmade Zenless Zone Zero Database</p>
</section>
