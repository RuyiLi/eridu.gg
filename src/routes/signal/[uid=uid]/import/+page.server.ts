import { bannerTypes } from '$lib/data'
import { importGachaLog } from '$lib/hoyo.js'
import { redirect } from '@sveltejs/kit'

export const actions = {
  async default({ request, cookies }) {
    const data = await request.formData()
    const signalRecordsUrl = data.get('signalRecordsUrl') as string
    if (!signalRecordsUrl) {
      return {
        status: 400,
        error: 'URL is empty',
      }
    }

    console.log(`Importing signal records from ${signalRecordsUrl}`)
    if (!URL.canParse(signalRecordsUrl)) {
      return {
        status: 400,
        error: 'URL is invalid',
      }
    }

    let total = 0
    function onProgress(count: number) {
      total += count
      console.log(`Imported ${total} records`)
    }

    // can parallelize this
    let uid = null
    for (const bannerId of bannerTypes) {
      const result = await importGachaLog(signalRecordsUrl, bannerId, onProgress)

      if (!result.success) {
        let error = result.error
        if (error === 'authkey timeout') {
          error = 'Your Signal Search records URL has expired. Please follow the import instructions and try again.'
        }

        return {
          status: 400,
          error,
        }
      }

      if (uid === null) {
        uid = result.uid
      }
    }

    if (uid) {
      cookies.set('uid', uid, { path: '/signal' })
    }

    console.log(`Imported a total of ${total} records for UID ${uid}`)
    throw redirect(303, `/signal/${uid}`)
  },
}

export function load({ params }) {
  if (params.uid !== 'x') {
    throw redirect(308, '/signal/x/import')
  }
}
