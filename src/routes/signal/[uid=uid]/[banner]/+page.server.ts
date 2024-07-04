import { banners } from '$lib/data'
import { redirect } from '@sveltejs/kit'

export async function load({ params }) {
  const banner = params.banner
  const routeUid = params.uid ?? 'x'
  if (!banners.some((b) => b.slug === banner)) {
    // idk what status code to use here
    throw redirect(303, `/signal/${routeUid}/`)
  }
}
