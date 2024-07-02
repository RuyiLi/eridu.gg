<script>
  import '../global.css'
  import { page } from '$app/stores'
  import Link from '$lib/components/Link.svelte'

  $: pathname = '/' + $page.url.pathname.split('/')[1]

  const routes = [
    { name: 'Characters', path: '/characters' },
    { name: 'Signal Tracker', path: '/signal', img: '/images/signal-search.webp' },
  ]
</script>

<main class="flex flex-col justify-between w-full h-full">
  <div>
    <nav class="grid grid-cols-4 w-full *:border-stone-700 *:border-b *:border-l *:!border-l-stone-700 *:px-2 *:py-4">
      <Link href="/" class="col-span-2 !border-l-0" active={pathname === '/'}>ERIDU.GG</Link>
      {#each routes as route}
        <Link href={route.path} class="col-span-1" active={pathname === route.path}>
          {#if route.img}
            <img class="inline w-6 h-6 -translate-y-0.5" src={route.img} alt={route.name} />
          {/if}
          {route.name}
        </Link>
      {/each}
    </nav>
    <slot></slot>
  </div>

  <footer class="w-full border-t border-stone-700 backdrop-blur-sm">
    <p class="text-center text-sm py-4">© 2024 ERIDU.GG</p>
  </footer>
</main>
