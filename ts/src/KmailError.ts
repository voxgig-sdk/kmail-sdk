
import { Context } from './Context'


class KmailError extends Error {

  isKmailError = true

  sdk = 'Kmail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  KmailError
}

