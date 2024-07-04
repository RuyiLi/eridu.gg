<script lang="ts">
  import { page } from '$app/stores'
  import { banners, type GachaRecord } from '$lib/data'
  import Link from '$lib/components/Link.svelte'

  $: routeUid = $page.params.uid ?? 'x'
  $: selectedBanner = $page.url.pathname.split('/')[3]

  export let data: { records: GachaRecord[] }

  const bannerPity = Object.fromEntries(banners.map((banner) => [banner.id, { a: 0, s: 0 }]))
  for (const banner of banners) {
    const records = data.records.filter((record) => record.gacha_type === banner.id)
    for (const record of records) {
      if (record.rank_type === 3) {
        break
      }
      bannerPity[banner.id].a++
    }
    for (const record of records) {
      if (record.rank_type === 4) {
        break
      }
      bannerPity[banner.id].s++
    }
  }
</script>

<svelte:head>
  <title>Signal Tracker / ERIDU.GG</title>
  <meta name="description" content="History viewer and analytics for your Zenless Zone Zero Signal Search records" />
</svelte:head>

<section class="grid grid-cols-4">
  <!-- Specific banner details (left side) -->
  <div class="col-span-3">
    <slot></slot>
  </div>

  <!-- Banners (right side) -->
  <div class="flex flex-col col-span-1 border-stone-700 *:border-l *:border-b *:!border-b-stone-700">
    <Link href="/signal/x/global" active={selectedBanner === 'global'}>Global Stats</Link>
    {#each banners as banner}
      <Link href="/signal/{routeUid}/{banner.slug}" active={selectedBanner === banner.slug}>
        <p>{banner.name}</p>
        <div class="flex justify-between text-purple-400">
          <p>A-Rank</p>
          <p>{bannerPity[banner.id].a}/10</p>
        </div>
        <div class="flex justify-between text-orange-400">
          <p>S-Rank</p>
          <p>{bannerPity[banner.id].s}/{banner.superPity}</p>
        </div>
      </Link>
    {/each}
    <div class="border-l !border-b-0 border-inherit grow"></div>
  </div>
</section>
