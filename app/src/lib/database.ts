import pg from 'pg'

const pool = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
})

const schema = `
  CREATE TABLE IF NOT EXISTS signals (
    id          TEXT PRIMARY KEY,
    gacha_id    INTEGER NOT NULL,
    gacha_type  INTEGER  NOT NULL,
    item_id     INTEGER NOT NULL,
    time        TEXT NOT NULL,
    player_uid  INTEGER,
  
    -- It feels weird to store these but it's easier for me
    name        TEXT NOT NULL,
    rank_type   INTEGER NOT NULL,
    item_type   TEXT NOT NULL
  );
`

pool.on('connect', () => {
  console.log('Connected to database.')
  pool.query(schema)
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
})

process.on('exit', async () => {
  await pool.end()
  console.log('Pool has been drained.')
})

export function query(statement: string, params?: any[]) {
  return pool.query(statement, params)
}

export async function transact(statement: string, params: any[]) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const res = await client.query(statement, params)
    await client.query('COMMIT')
    return res
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}
