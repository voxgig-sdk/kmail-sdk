-- Kmail SDK error

local KmailError = {}
KmailError.__index = KmailError


function KmailError.new(code, msg, ctx)
  local self = setmetatable({}, KmailError)
  self.is_sdk_error = true
  self.sdk = "Kmail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function KmailError:error()
  return self.msg
end


function KmailError:__tostring()
  return self.msg
end


return KmailError
