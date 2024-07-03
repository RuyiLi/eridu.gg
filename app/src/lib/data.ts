export interface GachaRecord {
  id: string
  gacha_id: number
  gacha_type: BannerType
  item_id: number
  time: Date
  player_uid: number
  name: string
  rank_type: number
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

export type BannerSlug = (typeof banners)[number]['slug']
export type BannerType = (typeof banners)[number]['id']

export const banners = [
  {
    id: 11,
    slug: 'exclusive',
    name: 'Exclusive Channel',
    image: '/ellen.webp',
    superPity: 90,
  },
  {
    id: 12,
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
    id: 2,
    slug: 'bangboo',
    name: 'Bangboo Channel',
    image: '/ellen.webp',
    superPity: 80,
  },
] as const

export const bannerTypes = banners.map((b) => b.id)
