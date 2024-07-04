import { connect } from '$lib/database.js'

export async function load({ params, cookies }) {
  const savedUid = cookies.get('uid') ?? null
  const routeUid = params.uid

  const uid = routeUid === 'x' ? savedUid : routeUid
  if (uid) {
    const sql = await connect()
    const records = await sql`SELECT * FROM signals WHERE player_uid = ${uid} ORDER BY time DESC`
    return { savedUid, records }
  }

  return { savedUid, records: [] }
}
