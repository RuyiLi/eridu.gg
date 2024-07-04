<script lang="ts">
  import { goto } from '$app/navigation'
  import Link from '$lib/components/Link.svelte'
  import type { GachaRecord } from '$lib/data'
  import { match } from '../../../params/uid'

  export let data: { savedUid: string | null; records: GachaRecord[] }

  $: uid = ''

  function onSubmit(evt: SubmitEvent) {
    evt.preventDefault()
    if (uid) {
      goto(`/signal/${uid}/exclusive`)
    }
  }
</script>

<div class="flex flex-col gap-2 justify-center items-center w-full h-full">
  <p class="text-2xl px-2 text-center">
    Enter your UID to see your pull history, or <Link href="/signal/x/import" variant="link">import</Link>.
  </p>

  {#if data.savedUid}
    <p class="px-2 -mt-2 text-center">
      Your saved UID is <span class="underline">{data.savedUid}</span>. Click any of the banners on the right to see
      your records.
    </p>
  {/if}
  <form on:submit={onSubmit} class="flex gap-0 mt-2">
    <input
      bind:value={uid}
      name="uid"
      type="text"
      placeholder="Enter UID..."
      class:!border-red-400={uid && !match(uid)}
      class="outline-none w-50 max-w-full bg-stone-900 p-2 border border-stone-600 hover:border-stone-500 focus:border-lime-400" />
    <button type="submit" class="p-2 border border-l-0 border-stone-600 hover:border-stone-500 active:bg-stone-600">
      View
    </button>
  </form>
</div>
