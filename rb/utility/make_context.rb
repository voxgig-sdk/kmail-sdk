# Kmail SDK utility: make_context
require_relative '../core/context'
module KmailUtilities
  MakeContext = ->(ctxmap, basectx) {
    KmailContext.new(ctxmap, basectx)
  }
end
