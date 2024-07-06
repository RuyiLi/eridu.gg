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
</script>

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

  <div
    id="banner-stats"
    style="--theme-color: {selectedEventBannerData.color}"
    class="relative h-[300px] border-t-4 border-b-8 rounded-br-[70rem] rounded-tl-[140rem]">
    <span class="absolute -bottom-1 left-0 translate-y-full px-2 text-lg bg-theme">
      {selectedEventBannerData.name}
    </span>

    <img
      src="/images/wallpaper.webp"
      alt=""
      class="absolute top-0 left-0 w-full h-full object-cover rounded-br-[70rem] rounded-tl-[140rem] grayscale brightness-75" />

    {#if selectedEventBanner !== -1 && bannerType === 2}
      <img
        src="{CDN_BASE_URL}/cinema/{selectedEventBannerData.itemId}.webp"
        alt=""
        class="absolute top-0 left-0 w-full h-full object-cover contrast-90 z-10 rounded-br-[70rem] rounded-tl-[140rem]" />
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
        <p class="w-full bg-stone-900 px-2 py-0.5 pb-1">
          {selectedEventBannerData.totalPulls}
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
        <p class="w-full bg-black px-2 py-0.5 pb-1">
          {selectedEventBannerData.sRanks}
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
        <p class="w-full bg-black px-2 py-0.5 pb-1">
          {selectedEventBannerData.aRanks}
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
        <p class="w-full bg-black px-2 py-0.5 pb-1">
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
        <p class="w-full bg-black px-2 py-0.5 pb-1">
          {selectedEventBannerData.sRankAvgPity}
        </p>
      </div>

      <div class="absolute top-36 left-[62%]">
        <div class="relative py-0.5 px-2 bg-theme">
          <h1
            class="absolute top-0 left-0 h-full flex items-center justify-center aspect-square -translate-x-full bg-white text-stone-800">
            <span class="-translate-y-0.5 scale-110 origin-top">06</span>
          </h1>
          50/50 Win Rate
        </div>
        <p class="w-full bg-black px-2 py-0.5 pb-1">
          {sRankPities.length
            ? selectedEventBannerRecords.filter((record) => record.item_id === selectedEventBannerData.itemId).length /
              selectedEventBannerData.sRanks
            : 0}%
        </p>
      </div>
    </div>
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

  <div class="flex flex-col gap-1 *:grid *:grid-cols-8 p-2 my-12">
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
  #banner-stats {
    border-color: var(--theme-color, theme('colors.orange.500'));
  }

  #banner-stats .bg-theme {
    background-color: var(--theme-color, theme('colors.orange.500'));
  }
</style>
