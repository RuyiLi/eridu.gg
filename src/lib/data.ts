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
  color: string
  itemId: number
  subItems: [number, number]
}

export interface GlobalBannerStats {
  totalCount: number
  sRankCount: number
  aRankCount: number
  totalUsers: number
  sWinCount: number
  aWinCount: number
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

export function getBannerType(bannerId: any): BannerType {
  return Math.floor(bannerId / 1000) as BannerType
}

export function getGachaId(bannerId: any): number {
  return bannerId % 1000
}

export const eventBannerData: Record<number, EventBanner> = {
  [getBannerId(1, 0)]: {
    name: 'Star-Studded Cast',
    color: '',
    itemId: 0,
    subItems: [0, 0],
  },

  // BEGIN EXCLUSIVE CHANNEL
  [getBannerId(2, 0)]: {
    name: 'Mellow Waveride',
    color: 'rgb(252, 53, 118)',
    itemId: 1191,
    subItems: [1111, 1131],
  },
  [getBannerId(2, 1)]: {
    name: 'Unswerving Bullet',
    color: 'rgb(252, 53, 118)',
    itemId: 1191,
    subItems: [1111, 1131],
  },

  // BEGIN W-ENGINE CHANNEL
  [getBannerId(3, 0)]: {
    name: 'Dissonant Sonata',
    color: '#2e3235',
    itemId: 14119,
    subItems: [13111, 13113],
  },
}

export const activeBanners = [2000, 3000]
export const CDN_BASE_URL = 'https://eridu.b-cdn.net'
