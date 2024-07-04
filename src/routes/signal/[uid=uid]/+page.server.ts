import { redirect } from '@sveltejs/kit'

export function load({ params }) {
  const routeUid = params.uid ?? 'x'
  if (routeUid && routeUid !== 'x') {
    throw redirect(308, `/signal/${routeUid}/exclusive`)
  }
}
