import { importGachaLog } from '$lib/hoyo.js'
import { redirect } from '@sveltejs/kit'

export const actions = {
  async default({ request }) {
    const data = await request.formData()
    const signalRecordsUrl = data.get('signalRecordsUrl') as string
    if (!signalRecordsUrl) {
      return {
        status: 400,
        body: 'signalRecordsUrl is required',
      }
    }

    console.log(`Importing signal records from ${signalRecordsUrl}`)
    if (!URL.canParse(signalRecordsUrl)) {
      return {
        status: 400,
        body: 'Invalid signalRecordsUrl',
      }
    }

    const uidContainer = ['']
    const url = new URL(signalRecordsUrl)
    const importJob = importGachaLog(
      url.searchParams.get('authkey_ver') as string,
      url.searchParams.get('sign_type') as string,
      url.searchParams.get('lang') as string,
      url.searchParams.get('authkey') as string,
      url.searchParams.get('game_biz') as string,
      url.searchParams.get('gacha_type') as string,
      uidContainer,
    )

    let total = 0
    for await (const count of importJob) {
      console.log(`Imported ${count} records`)
      total += count
    }

    throw redirect(308, `/signal/x/${uidContainer[0]}`)
  },
}

export function load({ params }) {
  if (params.uid !== 'x') {
    throw redirect(308, '/signal/x/import')
  }
}
