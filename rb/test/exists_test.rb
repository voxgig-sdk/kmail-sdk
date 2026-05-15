# Kmail SDK exists test

require "minitest/autorun"
require_relative "../Kmail_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KmailSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
