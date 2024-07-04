<script lang="ts">
  import { page } from '$app/stores'
  import Link from '$lib/components/Link.svelte'
  import { banners, CDN_BASE_URL, eventBannerData, getBannerId } from '$lib/data'
  import { type GachaRecord } from '$lib/data'

  type GacheRecordIndexed = GachaRecord & { index: number }

  export let data: { records: GachaRecord[] }

  const records = data.records
  const rankColors = {
    2: 'text-blue-400',
    3: 'text-purple-400',
    4: 'text-orange-400',
  }

  function calculatePities(records: GacheRecordIndexed[], rankType: number) {
    let pity = 0
    const pities = []
    for (let i = records.length - 1; i >= 0; i--) {
      pity++
      if (records[i].rank_type === rankType) {
        pities.push(pity)
        pity = 0
      }
    }
    return pities
  }

  $: bannerSlug = $page.params.banner
  $: banner = banners.find((banner) => banner.slug === bannerSlug)!
  $: bannerType = banner.id
  $: bannerData = records
    .filter((banner) => banner.gacha_type === bannerType)
    .map((record, i, records) => ({
      ...record,
      index: records.length - i - 1,
    }))
  $: eventBanners = bannerData.reduce(
    (acc, record) => {
      if (!acc.has(record.gacha_id)) {
        acc.set(record.gacha_id, [])
      }
      acc.get(record.gacha_id)!.push(record)
      return acc
    },
    new Map<number, GacheRecordIndexed[]>([[-1, bannerData]]),
  )

  $: aRankPities = calculatePities(bannerData, 3)
  $: sRankPities = calculatePities(bannerData, 4)
  $: rankFilter = {
    2: false,
    3: true,
    4: true,
  }

  $: selectedEventBanner = -1
  $: selectedEventBannerRecords = eventBanners.get(selectedEventBanner) ?? []
  $: selectedEventBannerData = {
    ...(eventBannerData[getBannerId(bannerType, selectedEventBanner)] ?? {
      name: banner.name,
      itemId: 0,
      subItems: [0, 0],
    }),
    totalPulls: selectedEventBannerRecords.length,
    sRanks: selectedEventBannerRecords.filter((record) => record.rank_type === 4).length,
    aRanks: selectedEventBannerRecords.filter((record) => record.rank_type === 3).length,
    sRankAvgPity: sRankPities.length ? sRankPities.reduce((a, b) => a + b) / sRankPities.length : 0,
    aRankAvgPity: aRankPities.length ? aRankPities.reduce((a, b) => a + b) / aRankPities.length : 0,
  }

  $: displayedRecords = (eventBanners.get(selectedEventBanner) ?? []).filter((record) => rankFilter[record.rank_type])
</script>

{#if bannerData.length === 0}
  <p class="p-2 text-xl">
    No data found for this banner from the past six months. Try <Link href="/signal/x/import" variant="link"
      >importing</Link> your records.
  </p>
{:else}
  <!-- Event banners -->
  {#if bannerType !== 1}
    <div class="flex gap-2 p-2 border-b border-stone-700">
      <Link
        on:click={() => (selectedEventBanner = -1)}
        as="button"
        class="border px-4"
        active={selectedEventBanner === -1}
        activeClass="!bg-transparent">
        Total
      </Link>

      {#each eventBanners.keys() as eventBannerId}
        {#if eventBannerId !== -1}
          <Link
            on:click={() => (selectedEventBanner = eventBannerId)}
            as="button"
            active={selectedEventBanner === eventBannerId}
            class="relative !bg-transparent border opacity-70 hover:opacity-90 p-0"
            activeClass="opacity-100">
            <img
              src="{CDN_BASE_URL}/channels/{getBannerId(bannerType, eventBannerId)}.webp"
              alt={eventBannerData[eventBannerId]?.name}
              class="h-10 w-28 object-cover object-center" />
          </Link>
        {/if}
      {/each}
    </div>
  {/if}

  <div class="relative grid grid-cols-6 border-b border-stone-700">
    <div id="event-banner-data" class="relative col-span-4 flex flex-col gap-1 *:flex *:justify-between">
      <span class="relative top-0 left-0 bg-stone-500 text-lg px-2">{selectedEventBannerData.name}</span>
      <div class="px-2">
        <p>Total Pulls</p>
        <p>
          {selectedEventBannerData.totalPulls}
          <!-- <img src="/images/master-tape.webp" alt="Master Tape" class="inline w-5 h-5 -translate-y-[0.05rem]" /> -->
        </p>
      </div>
      <div class="px-2">
        <p>S-Ranks</p>
        <p>{selectedEventBannerData.sRanks}</p>
      </div>
      <div class="px-2">
        <p>A-Ranks</p>
        <p>{selectedEventBannerData.aRanks}</p>
      </div>
      <div class="px-2">
        <p>Average S-Rank Pity</p>
        <p>{Math.round(selectedEventBannerData.sRankAvgPity * 10) / 10}</p>
      </div>
      <div class="px-2 mb-1">
        <p>Average A-Rank Pity</p>
        <p>{Math.round(selectedEventBannerData.aRankAvgPity * 10) / 10}</p>
      </div>
    </div>

    {#if ![1, -1].includes(selectedEventBanner)}
      <div class="grid grid-rows-2 col-span-1 overflow-hidden border-l border-stone-700">
        <img
          src="{CDN_BASE_URL}/characters/{selectedEventBannerData.subItems[0]}.webp"
          alt=""
          class="row-span-1 w-full aspect-square object-cover object-top drop-shadow-[-0.8rem_0_0_theme('colors.purple.400')]" />
        <img
          src="{CDN_BASE_URL}/characters/{selectedEventBannerData.subItems[1]}.webp"
          alt=""
          class="row-span-1 w-full aspect-square object-cover object-top border-t border-stone-700 drop-shadow-[0.8rem_0_0_theme('colors.purple.400')]" />
      </div>

      <div class="relative col-span-1 overflow-hidden border-l border-stone-700">
        <img
          src="{CDN_BASE_URL}/characters/{selectedEventBannerData.itemId}.webp"
          alt=""
          class="absolute top-0 left-0 w-full h-full object-cover drop-shadow-[0.8rem_0_0_theme('colors.orange.400')]" />
      </div>
    {:else}
      <div class="border-l border-stone-700"></div>
    {/if}
  </div>

  <div class="flex justify-center items-center gap-3 p-2 *:w-12 *:h-12 *:cursor-pointer">
    <button on:click={() => (rankFilter[2] = !rankFilter[2])}>
      <img src="/images/brank.png" alt="B Rank Filter" class={rankFilter[2] ? 'grayscale-0' : 'grayscale'} />
    </button>
    <button on:click={() => (rankFilter[3] = !rankFilter[3])}>
      <img src="/images/arank.png" alt="A Rank Filter" class={rankFilter[3] ? 'grayscale-0' : 'grayscale'} />
    </button>
    <button on:click={() => (rankFilter[4] = !rankFilter[4])}>
      <img src="/images/srank.png" alt="S Rank Filter" class={rankFilter[4] ? 'grayscale-0' : 'grayscale'} />
    </button>
  </div>

  <div class="flex flex-col gap-1 *:grid *:grid-cols-8 p-2">
    <div>
      <p class="col-span-1">Roll #</p>
      <p class="col-span-3">Item</p>
      <p class="col-span-1">Pity</p>
      <p class="col-span-1">Channel</p>
      <p class="col-span-2">Time</p>
    </div>
    {#each displayedRecords as record}
      <div class="{rankColors[record.rank_type]} leading-10 align-middle">
        <p class="col-span-1">{record.index}</p>
        <p class="col-span-3">
          <img src="{CDN_BASE_URL}/items/{record.item_id}.webp" alt="" class="inline h-10 object-cover" />
          {record.name}
        </p>
        <p class="col-span-1">{record.rank_type}</p>
        <p class="col-span-1">{record.gacha_id}</p>
        <p class="col-span-2">{record.time.toDateString()} {record.time.toLocaleTimeString()}</p>
      </div>
    {/each}
  </div>
{/if}

<style>
  #event-banner-data > div > p:last-child {
    color: theme('colors.orange.300');
  }
</style>
