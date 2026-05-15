# Kmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module KmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      KmailBaseFeature.new
    when "test"
      KmailTestFeature.new
    else
      KmailBaseFeature.new
    end
  end
end
