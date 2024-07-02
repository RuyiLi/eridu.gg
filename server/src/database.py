from operator import itemgetter
from typing import List

import duckdb


conn = duckdb.connect('./eridu.db')
record_itemgetter = itemgetter(
  'id', 'gacha_id', 'gacha_type', 'item_id', 'time', 'uid', 'name', 'rank_type', 'item_type'
)


def setup():
  conn.sql("""
          CREATE TABLE IF NOT EXISTS records (
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

          -- CREATE TABLE IF NOT EXISTS items (
          --   id INTEGER PRIMARY KEY,     -- item_id
          --   name TEXT NOT NULL,         -- name
          --   rarity INTEGER NOT NULL,    -- rank_type
          --   type TEXT NOT NULL          -- item_type
          -- );
          """)


def teardown():
  conn.close()


def write_records(records: List[dict]):
  conn.begin()
  records = list(map(record_itemgetter, records))
  conn.executemany('INSERT INTO records VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', records)
  conn.commit()


def query_uid(uid: int):
  return conn.execute('SELECT * FROM records WHERE player_uid = ?', [uid]).fetchall()


def record_exists(id: str) -> bool:
  return conn.sql('SELECT 1 FROM records WHERE id = ?', [id]).fetchall() is not None
