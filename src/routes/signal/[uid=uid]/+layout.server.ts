import { banners, eventBannerData, getBannerId, getBannerType, getGachaId, type GlobalBannerStats } from '$lib/data'

import type { NeonQueryFunction } from '@neondatabase/serverless'
import { connect } from '$lib/database.js'

async function globalStats(sql: NeonQueryFunction<false, false>) {
  const recordQueue = []
  const gachaCounts: Record<number, GlobalBannerStats> = {}

  for (const banner of banners) {
    const bannerType = banner.id

    const gachaIds = Object.keys(eventBannerData)
      .filter((id) => getBannerType(id) === bannerType)
      .map(getGachaId)

    gachaCounts[getBannerId(bannerType, -1)] = {
      totalCount: 0,
      sRankCount: 0,
      aRankCount: 0,
      totalUsers: 0,
      sWinCount: 0,
      aWinCount: 0,
    }

    for (const gachaId of gachaIds) {
      const bannerData = eventBannerData[getBannerId(bannerType, gachaId)]
      recordQueue.push(
        sql`SELECT * FROM signals WHERE gacha_type = ${bannerType} AND gacha_id = ${gachaId}`.then((records) => {
          const counts = {
            totalCount: records.length,
            sRankCount: records.filter((r) => r.rank_type === 4).length,
            aRankCount: records.filter((r) => r.rank_type === 3).length,
            totalUsers: new Set(records.map((r) => r.player_uid)).size,
            sWinCount: records.filter((r) => r.item_id === bannerData.itemId).length,
            aWinCount: records.filter((r) => bannerData.subItems.includes(r.item_id)).length,
          }

          gachaCounts[getBannerId(bannerType, gachaId)] = counts
          gachaCounts[getBannerId(bannerType, -1)].totalCount += counts.totalCount
          gachaCounts[getBannerId(bannerType, -1)].sRankCount += counts.sRankCount
          gachaCounts[getBannerId(bannerType, -1)].aRankCount += counts.aRankCount
          gachaCounts[getBannerId(bannerType, -1)].totalUsers += counts.totalUsers
          gachaCounts[getBannerId(bannerType, -1)].sWinCount += counts.sWinCount
          gachaCounts[getBannerId(bannerType, -1)].aWinCount += counts.aWinCount
        }),
      )
    }
  }

  await Promise.all(recordQueue)
  return gachaCounts
}

export async function load({ params, cookies }) {
  const savedUid = cookies.get('uid') ?? null
  const routeUid = params.uid

  const uid = routeUid === 'x' ? savedUid : routeUid
  if (uid) {
    const sql = await connect()
    const records = await sql`SELECT * FROM signals WHERE player_uid = ${uid} ORDER BY time DESC`
    const global = await globalStats(sql)
    return { savedUid, records, global }
  }

  return { savedUid, records: [], global: {} }
}
