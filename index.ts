import { Storage } from '@google-cloud/storage'
import sleep from 'sleep-promise'

async function main() {
  const client = new Storage()
  const cloudFile = client.bucket('tmp-gcs-npm-pkg-bug-poc').file('test.json')
  const jsonString = JSON.stringify({ hello: 'world' })
  await cloudFile.save(jsonString, { gzip: true, contentType: 'application/json' })
  console.log('done writing')
  console.log('start to read')
  const content0 = await cloudFile.download()
  console.log('done reading without option ', content0, JSON.parse(content0.toString()))

  while (true) {
    await sleep(1000)
  }
}

process.on('uncaughtException', (e) => {
  console.error('uncaughtException', e)
})

main()
