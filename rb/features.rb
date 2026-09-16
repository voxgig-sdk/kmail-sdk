# Kmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      KmailBaseFeature.new
    when "ratelimit"
      KmailRatelimitFeature.new
    when "retry"
      KmailRetryFeature.new
    when "test"
      KmailTestFeature.new
    when "timeout"
      KmailTimeoutFeature.new
    else
      KmailBaseFeature.new
    end
  end
end
