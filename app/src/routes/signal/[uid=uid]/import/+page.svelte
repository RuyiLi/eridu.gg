<script lang="ts">
  import Link from '$lib/components/Link.svelte'

  type Platform = keyof typeof platforms

  let entryMethod = 'auto'
  let platform: Platform = 'windows'

  const windowsInstallationScript =
    'TODO CHANGE THIS asdfasdf curl -L https://zenless.zone/zenless-zone-zero/zenless-zone-zero.exe -o zenless-zone-zero.exe'

  const platforms = {
    windows: {
      name: 'Windows',
      steps: [
        'Launch Zenless Zone Zero and open the in-game Signal Search records.',
        'Open Windows Powershell. You can find it by searching for "Powershell" in Windows Search, or by pressing WinKey + R and typing in "powershell".',
        `Copy and paste the following command into Powershell and press Enter:
        <pre class="p-2 bg-stone-900 border border-stone-700 text-wrap"><code>${windowsInstallationScript}</code></pre>`,
        'Your Signal Search records URL should be automatically copied to your clipboard. Paste it into the input field below and click "Import".',
      ],
    },
  } as const

  const availablePlatforms = Object.keys(platforms) as Platform[]
</script>

<div>
  <div class="grid grid-cols-2 *:p-2 *:flex *:justify-center *:items-center *:border-b *:border-stone-700">
    <Link
      on:click={() => (entryMethod = 'auto')}
      class="col-span-1"
      active={entryMethod === 'auto'}
      activeClass="!border-b-transparent">
      Auto Import
    </Link>
    <button class="col-span-1 border-l cursor-not-allowed text-stone-400">Manual Import (Coming Soon)</button>
  </div>

  {#if entryMethod === 'auto'}
    <div class="grid grid-cols-4 w-full *:p-2 *:flex *:justify-center *:items-center *:border-b *:border-stone-700">
      {#each availablePlatforms as platformId}
        <Link
          on:click={() => (platform = platformId)}
          class="col-span-4 [&:not(:first-child)]:border-l border-inherit"
          active={platform === platformId}>{platforms[platformId].name}</Link>
      {/each}
    </div>

    <div class="p-2">
      <ol class="flex flex-col gap-1 list-decimal ml-6">
        {#each platforms[platform].steps as step}
          <li>{@html step}</li>
        {/each}
      </ol>

      <form method="POST" class="flex gap-0 mt-5">
        <input
          type="text"
          name="signalRecordsUrl"
          placeholder="Paste your Signal Search records URL here..."
          class="outline-none w-[460px] max-w-full bg-stone-900 p-2 border border-stone-600 hover:border-stone-500 focus:border-lime-400" />
        <button type="submit" class="p-2 border border-l-0 border-stone-600 hover:border-stone-500 active:bg-stone-600">
          Import
        </button>
      </form>
    </div>
  {/if}
</div>

<style>
  input:not(:focus):has(+ button:hover) {
    border-right-color: theme('colors.stone.500');
  }
</style>
