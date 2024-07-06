<script>
  import '../global.css'
  import { navigating, page } from '$app/stores'
  import Link from '$lib/components/Link.svelte'

  $: pathname = '/' + $page.url.pathname.split('/')[1]

  const routes = [
    // { name: 'Agent Showcase', path: '/characters', img: '/images/agents.webp' },
    { name: 'Signal Tracker', path: '/signal', img: '/images/signal-search.webp' },
  ]
</script>

<main class="flex flex-col justify-between w-full h-full">
  <div>
    <nav
      class="grid grid-cols-4 w-full *:border-stone-700 *:border-b *:border-l *:!border-l-stone-700 *:px-2 *:flex *:items-center">
      <Link href="/" class="col-span-3 !border-l-0 group" active={pathname === '/'}>
        <img src="/favicon.png" alt="Bangboo Icon" class="inline w-10 h-10 mr-2 brightness-0 invert" />
        <h1 class="inline text-4xl -translate-y-0.5">ERIDU.GG</h1>
      </Link>
      {#each routes as route}
        <Link href={route.path} class="col-span-1" active={pathname === route.path}>
          {#if route.img}
            <img src={route.img} alt={route.name} class="inline w-6 h-6 -translate-y-0.5 mr-2" />
          {/if}
          {route.name}
        </Link>
      {/each}
    </nav>

    <slot></slot>

    {#if $navigating}
      <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-stone-900 bg-opacity-90">
        <img src="/images/loading.webp" alt="Loading" class="invert" />
      </div>
    {/if}
  </div>

  <footer class="grid grid-cols-2 w-full border-t border-stone-700 backdrop-blur-sm">
    <div class="flex flex-col justify-center col-span-1 text-right px-2">
      <p class="text-sm">© 2024 ERIDU.GG</p>
      <p class="text-xs">All game assets belong to COGNOSPHERE PTE. LTD.</p>
    </div>
    <div class="flex gap-3 items-center col-span-1 text-left px-2 py-4 border-l border-inherit">
      <a href="https://discord.gg/erSwCqePbg">
        <img src="/images/discord.svg" alt="Discord" class="w-10 h-10 hover:brightness-[85%]" />
      </a>
      <a href="https://x.com/quickbusterarts">
        <img src="/images/x.svg" alt="Twitter" class="w-8 h-8 hover:brightness-[85%]" />
      </a>
      <p>&bull;</p>
      <Link href="/privacy" variant="naked">Privacy</Link>
      <p>&bull;</p>
      <Link href="/credits" variant="naked">Credits</Link>
    </div>
  </footer>
</main>
