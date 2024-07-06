import type { BannerType, HoyoGachaRecord } from './data'

import { connect } from './database'

const BASE_API_URL = 'https://public-operation-nap-sg.hoyoverse.com'
const GACHA_LOG_PATH = '/common/gacha_record/api/getGachaLog'
const MAX_PAGES = 500

/**
 * authkey_ver
 * sign_type
 * auth_appid
 * gacha_id
 * plat_type
 * authkey
 * lang
 * region
 * game_biz
 * page
 * size
 * gacha_type = 1001 (this field does nothing anymore lol)
 * real_gacha_type = 1
 * end_id
 */

export async function importGachaLog(recordsUrl: string, gachaType: BannerType, onProgress?: (count: number) => void) {
  if (!recordsUrl.startsWith(BASE_API_URL + GACHA_LOG_PATH)) {
    return {
      success: false,
      error: 'Invalid URL.',
    }
  }

  console.log(`Starting gacha log import. Gacha type is ${gachaType}.`)

  const url = new URL(recordsUrl)
  url.searchParams.set('real_gacha_type', gachaType.toString())
  url.searchParams.set('gacha_type', `${gachaType}001`)
  url.searchParams.set('size', '20')

  const sql = await connect()
  const records: HoyoGachaRecord[] = []
  let endId = 0
  for (let page = 1; page <= MAX_PAGES; page++) {
    url.searchParams.set('page', page.toString())
    url.searchParams.set('end_id', endId.toString())

    const body = await fetch(url).then((res) => res.json())
    if (body.retcode !== 0) {
      console.error(`Failed to fetch gacha log: ${body.message}`)
      return {
        success: false,
        error: body.message,
      }
    }

    const data = body.data
    if (!data?.list?.length) {
      // reached end of records
      break
    }

    const pageRecords = data.list as HoyoGachaRecord[]
    records.push(...pageRecords)
    endId = data.list.at(-1).id

    const existing = await sql('SELECT 1 FROM signals WHERE id = $1', [endId])
    if (existing.length) {
      // short circuit if the last record already exists in the database
      // since everything after this record should also be in the database
      break
    }

    onProgress?.(records.length)
  }

  const uid = records.length ? records[0].uid : null
  console.log(`Fetched ${records.length} records. Returning instantly, database insertion will occur later.`)

  async function uploadRecords() {
    console.time(`record-insert-${uid}`)

    // transpose records for bulk insert
    const columns: {
      id: string[]
      gacha_id: string[]
      gacha_type: string[]
      item_id: string[]
      time: Date[]
      player_uid: string[]
      name: string[]
      rank_type: string[]
      item_type: string[]
    } = {
      id: [],
      gacha_id: [],
      gacha_type: [],
      item_id: [],
      time: [],
      player_uid: [],
      name: [],
      rank_type: [],
      item_type: [],
    }

    for (const record of records) {
      columns.id.push(record.id)
      columns.gacha_id.push(record.gacha_id)
      columns.gacha_type.push(record.gacha_type)
      columns.item_id.push(record.item_id)
      columns.time.push(new Date(record.time))
      columns.player_uid.push(record.uid)
      columns.name.push(record.name)
      columns.rank_type.push(record.rank_type)
      columns.item_type.push(record.item_type)
    }

    const insertResult = await sql.transaction([
      sql(
        `
        INSERT INTO signals 
          (id, gacha_id, gacha_type, item_id, time, player_uid, name, rank_type, item_type)
        SELECT * FROM UNNEST($1::TEXT[], $2::INTEGER[], $3::INTEGER[], $4::INTEGER[], $5::TIMESTAMP[], $6::INTEGER[], $7::TEXT[], $8::INTEGER[], $9::TEXT[])
        ON CONFLICT DO NOTHING
        `,
        [
          columns.id,
          columns.gacha_id,
          columns.gacha_type,
          columns.item_id,
          columns.time,
          columns.player_uid,
          columns.name,
          columns.rank_type,
          columns.item_type,
        ],
      ),
    ])

    console.log(`Inserted ${insertResult} records into the database for UID ${uid}.`)
    console.timeEnd(`record-insert-${uid}`)
  }

  setTimeout(uploadRecords, 0)

  return {
    success: true,
    uid,
  }
}
