import { query, transact } from './database'

const BASE_API_URL = 'https://api-os-takumi.mihoyo.com'
const GACHA_LOG_PATH = '/event/gacha_info/api/getGachaLog'
const MAX_PAGES = 500

export async function* importGachaLog(
  authkeyVer: string,
  signType: string,
  lang: string,
  authkey: string,
  gameBiz: string,
  gachaType: string,
  uid: string[],
) {
  const url = new URL(GACHA_LOG_PATH, BASE_API_URL)
  url.searchParams.append('authkey_ver', authkeyVer)
  url.searchParams.append('sign_type', signType)
  url.searchParams.append('lang', lang)
  url.searchParams.append('authkey', authkey)
  url.searchParams.append('game_biz', gameBiz)
  url.searchParams.append('gacha_type', gachaType)
  url.searchParams.append('size', '20')

  const records = []
  let endId = 0
  for (let page = 1; page <= MAX_PAGES; page++) {
    url.searchParams.set('page', page.toString())
    url.searchParams.set('end_id', endId.toString())

    const body = await fetch(url).then((res) => res.json())
    if (body.retcode !== 0) {
      console.error(`Failed to fetch gacha log: ${body.message}`)
      break
    }

    const data = body.data
    if (!data?.list) {
      // reached end of records
      break
    }

    records.push(...data.list)
    endId = data.list.at(-1).id

    const existsQuery = await query('SELECT 1 FROM signals WHERE id = $1', [endId])
    if (existsQuery.rows.length) {
      // short circuit if the last record already exists in the database
      // since everything after this record should also be in the database
      break
    }

    yield records.length
  }

  console.log(`Fetched ${records.length} records`)

  const columns = {
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
    for (const [col, value] of Object.entries(record)) {
      // @ts-ignore !!!!
      columns[col].push(value)
    }
  }

  const insertResult = await transact(
    `
    INSERT INTO signals 
      (id, gacha_id, gacha_type, item_id, time, player_uid, name, rank_type, item_type)
    SELECT * FROM UNNEST($)
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
  )

  uid[0] = records[0].player_uid
  console.log(`Inserted ${insertResult.rowCount} records into the database for UID ${uid[0]}.`)
}
