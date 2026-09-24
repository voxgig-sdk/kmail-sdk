

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"sh":"List of attachments","t":"`$ARRAY`","key$":"attachments","index$":0},"body":{"a":true,"h":"Body","n":"body","r":false,"sh":"Email body content","t":"`$STRING`","key$":"body","index$":1},"from":{"a":true,"fo":"email","h":"From","n":"from","r":false,"sh":"Sender email address","t":"`$STRING`","key$":"from","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the message","t":"`$STRING`","key$":"id","index$":3},"received_at":{"a":true,"fo":"date-time","h":"Received At","n":"received_at","r":false,"sh":"Timestamp when the message was received","t":"`$STRING`","key$":"received_at","index$":4},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"sh":"Email subject","t":"`$STRING`","key$":"subject","index$":5}},"id":{"field":"id","name":"id"},"name":"get_email","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /get_email","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/get_email","q":{},"r":{},"s":[{"lit":"get_email"}],"t":{"req":"`reqdata`","res":"`body.messages`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_email","name__orig":"get_email","Name":"GetEmail","name_":"get_email","name-":"get-email","NAME":"GET_EMAIL","index$":0}, {"active":true,"entity":"get_email","key$":"BasicGetEmailFlow","kind":"basic","name":"BasicGetEmailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_email_ref01"}}],"index$":0}]}, 'GetEmail', {"GET /get_email":{"protocol":"http","operationId":"getEmail","responses":{"200":{"description":"Successful response with email information","content":{"application/json":{"schema":{"type":"object","description":"Information about the temporary email","properties":{"email":{"description":"The temporary email address","example":"example@kmail.pw","format":"email","key$":"email","type":"string"},"messages":{"description":"List of received messages","items":{"description":"Email message details","properties":{"attachments":{"description":"List of attachments","items":{"properties":{"content_type":{"type":"string"},"filename":{"type":"string"},"size":{"type":"integer"}},"type":"object"},"type":"array","key$":"attachments"},"body":{"description":"Email body content","type":"string","key$":"body"},"from":{"description":"Sender email address","format":"email","type":"string","key$":"from"},"id":{"description":"Unique identifier for the message","type":"string","key$":"id"},"received_at":{"description":"Timestamp when the message was received","format":"date-time","type":"string","key$":"received_at"},"subject":{"description":"Email subject","type":"string","key$":"subject"}},"type":"object","x-ref":"#/components/schemas/Message","index$":0},"key$":"messages","type":"array"},"created_at":{"description":"Timestamp when the email was created","format":"date-time","key$":"created_at","type":"string"},"expires_at":{"description":"Timestamp when the email expires","format":"date-time","key$":"expires_at","type":"string"}},"x-ref":"#/components/schemas/EmailInfo"}}}},"400":{"description":"Bad request","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"}},"required":["error"],"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
