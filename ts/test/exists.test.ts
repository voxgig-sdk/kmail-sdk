
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KmailSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KmailSDK.test()
    equal(testsdk instanceof KmailSDK, true,
      'KmailSDK.test() must return a client synchronously')
  })

})
