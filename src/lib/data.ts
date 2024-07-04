export interface GachaRecord {
  id: string
  gacha_id: number
  gacha_type: BannerType
  item_id: number
  time: Date
  player_uid: number
  name: string
  rank_type: 2 | 3 | 4
  item_type: string
}

export interface HoyoGachaRecord {
  id: string
  gacha_id: string
  gacha_type: string
  item_id: string
  time: string
  uid: string
  name: string
  rank_type: string
  item_type: string
}

export interface EventBanner {
  name: string
  itemId: number
  subItems: [number, number]
}

export type BannerSlug = (typeof banners)[number]['slug']
export type BannerType = (typeof banners)[number]['id']

export const banners = [
  {
    id: 2,
    slug: 'exclusive',
    name: 'Exclusive Channel',
    image: '/ellen.webp',
    superPity: 90,
  },
  {
    id: 3,
    slug: 'w-engine',
    name: 'W-Engine Channel',
    image: '/ellen.webp',
    superPity: 80,
  },
  {
    id: 1,
    slug: 'stable',
    name: 'Stable Channel',
    image: '/ellen.webp',
    superPity: 90,
  },
  {
    id: 5,
    slug: 'bangboo',
    name: 'Bangboo Channel',
    image: '/ellen.webp',
    superPity: 80,
  },
] as const

export const bannerTypes = banners.map((b) => b.id)

// since gachaIds can be reused across banner types, do bannerType * 1000 + gachaId
export function getBannerId(bannerType: BannerType, gachaId: number): number {
  return bannerType * 1000 + gachaId
}

export const eventBannerData: Record<number, EventBanner> = {
  [getBannerId(1, 0)]: {
    name: 'Star-Studded Cast',
    itemId: 0,
    subItems: [0, 0],
  },
  [getBannerId(2, 0)]: {
    name: 'Mellow Waveride',
    itemId: 1191,
    subItems: [1111, 1131],
  },
}

export const activeBanners = [2000, 3000]
export const CDN_BASE_URL = 'https://eridu.b-cdn.net'
