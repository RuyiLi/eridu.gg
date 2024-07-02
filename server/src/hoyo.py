import logging

import httpx

from .database import write_records, record_exists

base_api_url = 'https://api-os-takumi.mihoyo.com'
gacha_log_path = '/common/gacha_record/api/getGachaLog'


async def fetch_gacha_log(authkey_ver: int, sign_type: int, lang: str, authkey: str, game_biz: str):
  base_params = {
    'authkey_ver': authkey_ver,
    'sign_type': sign_type,
    'lang': lang,
    'authkey': authkey,
    'game_biz': game_biz,
    'gacha_type': 11,
    'size': 20,
  }
  async with httpx.AsyncClient(base_url=base_api_url, params=base_params) as client:
    page = 0
    end_id = 0

    records = []

    while True:
      page += 1
      res = await client.get(gacha_log_path, params={'page': page, 'end_id': end_id})
      body = res.json()
      if body['retcode'] != 0:
        break

      data = body['data']
      if not data or not data['list']:
        break

      for record in data['list']:
        records.append(record)
        end_id = record['id']

      if record_exists(end_id):
        # short circuit if the last record already exists in the database
        # in which case everything after this record should also be in the database
        break

      yield f'{len(records)},'

    logging.info(f'Fetched {len(records)} records.')

    # this should happen after the response has already finished streaming
    write_records(records)
