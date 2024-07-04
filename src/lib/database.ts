import { neon } from '@neondatabase/serverless'

const schema = `
  CREATE TABLE IF NOT EXISTS signals (
    id          TEXT PRIMARY KEY,
    gacha_id    INTEGER NOT NULL,
    gacha_type  INTEGER  NOT NULL,
    item_id     INTEGER NOT NULL,
    time        TIMESTAMP NOT NULL,
    player_uid  INTEGER NOT NULL,
  
    -- It feels weird to store these but it's easier for me
    name        TEXT NOT NULL,
    rank_type   INTEGER NOT NULL,
    item_type   TEXT NOT NULL
  );
`

await neon(process.env.DATABASE_URL ?? '')(schema)
console.log('Database schema initialized')

export function connect() {
  const sql = neon(process.env.DATABASE_URL ?? '')
  return sql
}
