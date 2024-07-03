<script lang="ts">
  import { page } from '$app/stores'
  import Link from '$lib/components/Link.svelte'
  import { banners } from '$lib/data'
  import { type GachaRecord } from '$lib/data'

  export let data: { records: GachaRecord[] }

  const records = data.records

  $: bannerSlug = $page.params.banner
  $: bannerId = banners.find((banner) => banner.slug === bannerSlug)!.id
  $: bannerData = records.filter((banner) => banner.gacha_type === bannerId)
</script>

{#if bannerData.length === 0}
  <p class="p-2 text-xl">
    No data found for this banner. Try <Link href="/signal/x/import" variant="link">importing</Link> your records.
  </p>
{:else}
  <div class="p-2">
    {#each bannerData as record}
      <div class="flex justify-between">
        <p>{record.name}</p>
        <p>{record.rank_type}</p>
      </div>
    {/each}
  </div>
{/if}
