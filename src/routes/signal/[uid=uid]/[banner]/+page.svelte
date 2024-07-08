<script lang="ts">
  import { page } from '$app/stores'
  import Link from '$lib/components/Link.svelte'
  import { banners, CDN_BASE_URL, eventBannerData, getBannerId, type GlobalBannerStats } from '$lib/data'
  import { type GachaRecord } from '$lib/data'
  import { roundPct } from '$lib/util'

  type GacheRecordIndexed = GachaRecord & { index: number }

  export let data: { records: GachaRecord[]; global: Record<number, GlobalBannerStats> }

  const records = data.records
  const rankColors = {
    2: 'text-blue-400',
    3: 'text-purple-400',
    4: 'text-orange-400',
  }

  function getPityColor(pity: number) {
    if (pity < 45) return 'bg-green-500'
    if (pity < 70) return 'bg-amber-500'
    return 'bg-red-500'
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
  $: baseEventBannerData = eventBannerData[getBannerId(bannerType, selectedEventBanner)] ?? {
    name: banner.name,
    itemId: 0,
    subItems: [0, 0],
  }
  $: selectedEventBannerData = {
    ...baseEventBannerData,
    totalPulls: selectedEventBannerRecords.length,
    sRanks: selectedEventBannerRecords.filter((record) => record.rank_type === 4).length,
    aRanks: selectedEventBannerRecords.filter((record) => record.rank_type === 3).length,
    sRankAvgPity: sRankPities.length ? sRankPities.reduce((a, b) => a + b) / sRankPities.length : 0,
    aRankAvgPity: aRankPities.length ? aRankPities.reduce((a, b) => a + b) / aRankPities.length : 0,
  }

  $: displayedRecords = (eventBanners.get(selectedEventBanner) ?? []).filter((record) => rankFilter[record.rank_type])
  $: globalEventStats = data.global[getBannerId(bannerType, selectedEventBanner)]
</script>

<div style="--theme-color: {selectedEventBannerData.color}">
  {#if bannerData.length === 0}
    <p class="p-2 text-xl">
      No data found for this banner from the past six months. Try <Link href="/signal/x/import" variant="link"
        >importing</Link> your records.
    </p>
  {:else}
    <!-- Specific event banners -->
    {#if bannerType !== 1 && bannerType !== 5}
      <div class="flex gap-2 p-2">
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
              class="relative !bg-transparent border opacity-70 hover:opacity-90 !p-0"
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

    <div class="">
      <div id="banner-stats" class="relative h-[300px] border-t-2 border-b-4 round1ed-bl-[70rem] round1ed-tr-[140rem]">
        <span class="absolute bottom-0 right-0 px-2 text-lg bg-theme z-20">
          {selectedEventBannerData.name}
        </span>

        <img
          src="/images/wallpaper.webp"
          alt=""
          class="absolute top-0 left-0 w-full h-full object-cover rounde1d-bl-[70rem] round1ed-tr-[140rem] grayscale brightness-75" />

        {#if selectedEventBanner !== -1 && bannerType === 2}
          <img
            src="{CDN_BASE_URL}/cinema/{selectedEventBannerData.itemId}.webp"
            alt=""
            class="absolute top-0 left-0 w-full h-full object-cover brightness-50 z-10 rou1nded-bl-[70rem] rounde1d-tr-[140rem]" />
        {/if}

        <div class="absolute top-0 left-0 w-full z-20 *:text-sm scale-110">
          <div class="absolute top-10 left-[25%]">
            <div class="relative py-0.5 px-2 bg-theme">
              <h1
                class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
                <span class="-translate-y-0.5 scale-110 origin-top">01</span>
              </h1>
              Total Pulls
            </div>
            <p class="w-full bg-stone-900 px-2 text-base py-[0.4rem]">
              {selectedEventBannerData.totalPulls}
              {#if globalEventStats}
                <span class="text-stone-400">/ {globalEventStats.totalCount} 🌎</span>
              {/if}
            </p>
          </div>

          <div class="absolute top-6 left-[45%]">
            <div class="relative py-0.5 px-2 bg-theme">
              <h1
                class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
                <span class="-translate-y-0.5 scale-110 origin-top">02</span>
              </h1>
              S-Ranks
            </div>
            <p class="w-full bg-black px-2 text-base py-[0.4rem]">
              {selectedEventBannerData.sRanks}
              {#if globalEventStats}
                <span class="text-stone-400">/ {globalEventStats.sRankCount} 🌎</span>
              {/if}
            </p>
          </div>

          <div class="absolute top-14 left-[60%]">
            <div class="relative py-0.5 px-2 bg-theme">
              <h1
                class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
                <span class="-translate-y-0.5 scale-110 origin-top">03</span>
              </h1>
              A-Ranks
            </div>
            <p class="w-full bg-black px-2 text-base py-[0.4rem]">
              {selectedEventBannerData.aRanks}
              {#if globalEventStats}
                <span class="text-stone-400">/ {globalEventStats.aRankCount} 🌎</span>
              {/if}
            </p>
          </div>

          <div class="absolute top-40 left-[20%]">
            <div class="relative py-0.5 px-2 bg-theme">
              <h1
                class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
                <span class="-translate-y-0.5 scale-110 origin-top">04</span>
              </h1>
              Avg S-Rank Pity
            </div>
            <p class="w-full bg-black px-2 text-base py-[0.4rem]">
              {selectedEventBannerData.sRankAvgPity}
            </p>
          </div>

          <div class="absolute top-48 left-[40%]">
            <div class="relative py-0.5 px-2 bg-theme">
              <h1
                class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
                <span class="-translate-y-0.5 scale-110 origin-top">05</span>
              </h1>
              Avg A-Rank Pity
            </div>
            <p class="w-full bg-black px-2 text-base py-[0.4rem]">
              {selectedEventBannerData.sRankAvgPity}
            </p>
          </div>

          <div class="absolute top-36 left-[62%]">
            <div class="relative py-0.5 px-2 bg-theme">
              <h1
                class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
                <span class="-translate-y-0.5 scale-110 origin-top">06</span>
              </h1>
              Win Rate
            </div>
            <p class="w-full bg-black px-2 text-base py-[0.4rem]">
              <span class="text-orange-400">
                [S]
                {roundPct(
                  selectedEventBannerRecords.filter((record) => record.item_id === selectedEventBannerData.itemId)
                    .length / selectedEventBannerData.sRanks,
                )}%
                {#if globalEventStats}
                  <span class="text-stone-400">
                    / {roundPct(globalEventStats.sWinCount / globalEventStats.sRankCount)}%
                  </span>
                {/if}
              </span>
              <br />
              <span class="text-purple-400">
                [A]
                {roundPct(
                  selectedEventBannerRecords.filter((record) => record.item_id === selectedEventBannerData.itemId)
                    .length / selectedEventBannerData.aRanks,
                )}%
                {#if globalEventStats}
                  <span class="text-stone-400">
                    / {roundPct(globalEventStats.aWinCount / globalEventStats.aRankCount)}%
                  </span>
                {/if}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- S Rank Pities -->
    <div class="flex flex-wrap gap-16 justify-center my-12 py-6 mx-20 bg-sstone-800 -z-20 -translate-x-6">
      {#each selectedEventBannerRecords.filter((record) => record.rank_type === 4) as sRank, i}
        <div class="relative h-20 w-24">
          <img
            src="{CDN_BASE_URL}/items/{sRank.item_id}.webp"
            alt={sRank.name}
            class="relative w-full object-cover z-10" />
          <h1
            class="absolute top-0 left-0 w-full h-full flex items-center justify-end px-2 text-3xl
            skew-x-[16deg] origin-left scale-x-150 scale-y-125 rounded-tr-xl rounded-bl-xl
            {getPityColor(sRankPities[sRankPities.length - i - 1])}">
            {sRankPities[sRankPities.length - i - 1]}
          </h1>
        </div>
      {/each}
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

    <div class="flex flex-col *:grid *:grid-cols-8 *:px-2">
      <div class="border-b border-t border-stone-800 *:border-l *:border-inherit *:p-2">
        <p class="col-span-1 !border-l-0">Roll #</p>
        <p class="col-span-3">Item</p>
        <p class="col-span-1">Pity</p>
        <p class="col-span-1">Channel</p>
        <p class="col-span-2">Time</p>
      </div>
      {#each displayedRecords as record}
        <div
          class="{rankColors[
            record.rank_type
          ]} *:leading-[3rem] *:align-middle border-b border-stone-800 *:border-l *:border-inherit *:px-2">
          <p class="col-span-1 !border-l-0">{record.index}</p>
          <p class="col-span-3">
            <img src="{CDN_BASE_URL}/items/{record.item_id}.webp" alt="" class="inline h-10 object-cover" />
            {record.name}
          </p>
          <p class="col-span-1">{record.rank_type}</p>
          <p class="col-span-1 relative">
            <img
              src="{CDN_BASE_URL}/channels/{getBannerId(bannerType, record.gacha_id)}.webp"
              alt="Banner {getBannerId(bannerType, record.gacha_id)}"
              class="py-2 w-full h-12 object-cover" />
          </p>
          <p class="col-span-2">{record.time.toDateString()} {record.time.toLocaleTimeString()}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  #banner-stats {
    border-color: var(--theme-color, theme('colors.orange.500'));
  }

  .bg-theme {
    background-color: var(--theme-color, theme('colors.orange.500'));
  }

  .wings::before,
  .wings::after {
    content: '';
    display: block;
    position: absolute;
    top: -0.5rem;
    width: 0;
    height: 0;
    border: 0.5rem solid rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);
    z-index: -1;
  }

  .wings::before {
    left: 0;
    border-left-width: 0;
    border-right-color: inherit;
  }

  .wings::after {
    right: 0;
    border-right-width: 0;
    border-left-color: inherit;
  }
</style>
