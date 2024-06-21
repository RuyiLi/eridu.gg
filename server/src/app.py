from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import StreamingResponse

from hoyo import fetch_gacha_log
from database import setup, teardown


@asynccontextmanager
async def lifespan(app: FastAPI):
  setup()
  yield
  teardown()


app = FastAPI(lifespan=lifespan)


@app.post('/signal')
async def signal(authkey_ver: int, sign_type: int, lang: str, authkey: str, game_biz: str):
  print('Received signal', authkey_ver, sign_type, lang, authkey, game_biz)
  stream = fetch_gacha_log(authkey_ver, sign_type, lang, authkey, game_biz)
  return StreamingResponse(stream)
