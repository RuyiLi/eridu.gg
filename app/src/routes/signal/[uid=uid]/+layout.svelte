<script>
  import { page } from '$app/stores'
  import Link from '$lib/components/Link.svelte'

  $: routeUid = $page.params.uid ?? 'x'
  $: selectedBanner = $page.url.pathname.split('/')[3]

  const banners = [
    {
      bannerId: 1,
      bannerSlug: 'exclusive',
      bannerName: 'Exclusive Channel',
      bannerImage: '/ellen.webp',
      superPity: 90,
    },
    {
      bannerId: 2,
      bannerSlug: 'w-engine',
      bannerName: 'W-Engine Channel',
      bannerImage: '/ellen.webp',
      superPity: 80,
    },
    {
      bannerId: 3,
      bannerSlug: 'stable',
      bannerName: 'Stable Channel',
      bannerImage: '/ellen.webp',
      superPity: 90,
    },
    {
      bannerId: 4,
      bannerSlug: 'bangboo',
      bannerName: 'Bangboo Channel',
      bannerImage: '/ellen.webp',
      superPity: 80,
    },
  ]
</script>

<section class="grid grid-cols-4">
  <!-- Specific banner details (left side) -->
  <div class="col-span-3">
    <slot></slot>
  </div>

  <!-- Banners (right side) -->
  <div class="flex flex-col col-span-1 border-stone-700 *:border-l *:border-b *:!border-b-stone-700">
    <Link href="/signal/x/global" active={selectedBanner === 'global'}>Global Stats</Link>
    {#each banners as banner}
      <Link href="/signal/{routeUid}/{banner.bannerSlug}" active={selectedBanner === banner.bannerSlug}>
        <p>{banner.bannerName}</p>
        <div class="flex justify-between text-purple-400">
          <p>4-Star</p>
          <p>0/10</p>
        </div>
        <div class="flex justify-between text-orange-400">
          <p>5-Star</p>
          <p>0/{banner.superPity}</p>
        </div>
      </Link>
    {/each}
    <div class="border-l !border-b-0 border-inherit grow"></div>
  </div>
</section>
