import { redirect } from '@sveltejs/kit'

const redirects: Record<string, string> = {
  '/discord': 'https://discord.gg/erSwCqePbg',
}

export function load({ url }) {
  if (redirects.hasOwnProperty(url.pathname)) {
    throw redirect(301, redirects[url.pathname])
  }
}
