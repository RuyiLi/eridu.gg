from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from .hoyo import fetch_gacha_log
from .database import setup, teardown, query_uid


@asynccontextmanager
async def lifespan(app: FastAPI):
  setup()
  yield
  teardown()


templates = Jinja2Templates(directory='templates')

app = FastAPI(lifespan=lifespan)
app.mount('/static', StaticFiles(directory='static'), name='static')


@app.get('/signal/{uid}/history/{gacha_type}/details/{gacha_id}')
async def get_signal_history_details(request: Request, uid: int, gacha_type: int, gacha_id: int):
  data = query_uid(uid)
  items = []
  for record in data:
    if record[1] == gacha_id:
      items.append(dict(name=record[6], id=record[0], type=record[-1]))

  context = dict(
    uid=uid,
    details=dict(
      all_items=items,
    ),
  )
  return templates.TemplateResponse(request=request, name='partial/banner-details.html', context=context)


@app.get('/signal/{uid}/history/{gacha_type}')
async def get_signal_history(request: Request, uid: int, gacha_type: int):
  data = query_uid(uid)
  gacha_ids = set(map(lambda x: x[1], data))
  context = dict(
    uid=uid,
    history=dict(
      gacha_ids=gacha_ids,
    ),
  )
  return templates.TemplateResponse(request=request, name='partial/banner-history.html', context=context)


@app.get('/signal/{uid}', response_class=HTMLResponse)
async def get_signal(request: Request, uid: int):
  data = query_uid(uid)
  context = dict(
    uid=uid,
    data=data,
  )
  return templates.TemplateResponse(request=request, name='signal.html', context=context)


@app.post('/signal')
async def signal(authkey_ver: int, sign_type: int, lang: str, authkey: str, game_biz: str):
  print('Received history storage request', authkey_ver, sign_type, lang, authkey, game_biz)
  stream = fetch_gacha_log(authkey_ver, sign_type, lang, authkey, game_biz)
  return StreamingResponse(stream)
