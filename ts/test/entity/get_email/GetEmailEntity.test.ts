

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KmailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetEmailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KMAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('KMAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KmailSDK.test()
    const ent = testsdk.GetEmail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KMAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_email.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"attachments","req":false,"short":"List of attachments","type":"`$ARRAY`","index$":0},{"active":true,"name":"body","req":false,"short":"Email body content","type":"`$STRING`","index$":1},{"active":true,"format":"email","name":"from","req":false,"short":"Sender email address","type":"`$STRING`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the message","type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"received_at","req":false,"short":"Timestamp when the message was received","type":"`$STRING`","index$":4},{"active":true,"name":"subject","req":false,"short":"Email subject","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"get_email","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /get_email","json":"{\"operationId\":\"getEmail\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Information about the temporary email\",\"properties\":{\"created_at\":{\"description\":\"Timestamp when the email was created\",\"format\":\"date-time\",\"type\":\"string\"},\"email\":{\"description\":\"The temporary email address\",\"example\":\"example@kmail.pw\",\"format\":\"email\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Timestamp when the email expires\",\"format\":\"date-time\",\"type\":\"string\"},\"messages\":{\"description\":\"List of received messages\",\"items\":{\"description\":\"Email message details\",\"properties\":{\"attachments\":{\"description\":\"List of attachments\",\"items\":{\"properties\":{\"content_type\":{\"type\":\"string\"},\"filename\":{\"type\":\"string\"},\"size\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Email body content\",\"type\":\"string\"},\"from\":{\"description\":\"Sender email address\",\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the message\",\"type\":\"string\"},\"received_at\":{\"description\":\"Timestamp when the message was received\",\"format\":\"date-time\",\"type\":\"string\"},\"subject\":{\"description\":\"Email subject\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with email information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/get_email","segments":[{"lit":"get_email"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.messages`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_email","name__orig":"get_email","Name":"GetEmail","name_":"get_email","name-":"get-email","NAME":"GET_EMAIL","index$":0}, {"active":true,"entity":"get_email","key$":"BasicGetEmailFlow","kind":"basic","name":"BasicGetEmailFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_email_ref01"}}],"index$":0}]}, 'GetEmail')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_email_ref01_data = Object.values(setup.data.existing.get_email)[0] as any

    // LIST
    const get_email_ref01_ent = client.GetEmail()
    const get_email_ref01_match: any = {}

    const get_email_ref01_list = (await get_email_ref01_ent.list(get_email_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_email/GetEmailTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KmailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_email01','get_email02','get_email03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KMAIL_TEST_GET_EMAIL_ENTID': idmap,
    'KMAIL_TEST_LIVE': 'FALSE',
    'KMAIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KMAIL_TEST_GET_EMAIL_ENTID']

  const live = 'TRUE' === env.KMAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KMAIL_TEST_GET_EMAIL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KmailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.KMAIL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
