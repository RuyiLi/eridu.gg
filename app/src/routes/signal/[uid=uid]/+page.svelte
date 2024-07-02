<script lang="ts">
  import { goto } from '$app/navigation'

  $: uid = ''

  function onSubmit(evt: SubmitEvent) {
    evt.preventDefault()
    console.log(uid)
    if (uid) {
      goto(`/signal/${uid}/exclusive`)
    }
  }
</script>

<svelte:head>
  <title>Signal Tracker / ERIDU.GG</title>
  <meta name="description" content="History viewer and analytics for your Zenless Zone Zero Signal Search records" />
</svelte:head>

<div class="flex flex-col gap-2 justify-center items-center w-full h-full">
  <p class="text-2xl">
    Enter your UID to see your pull history, or <a
      href="/signal/x/import"
      class="underline underline-offset-4 decoration-4 decoration-stone-400 hover:decoration-lime-400">import</a
    >.
  </p>
  <form on:submit={onSubmit} class="flex gap-0 mt-5">
    <input
      bind:value={uid}
      name="uid"
      type="text"
      placeholder="Enter UID..."
      class="outline-none w-50 max-w-full bg-stone-900 p-2 border border-stone-600 hover:border-stone-500 focus:border-lime-400" />
    <button type="submit" class="p-2 border border-l-0 border-stone-600 hover:border-stone-500 active:bg-stone-600">
      View
    </button>
  </form>
</div>
