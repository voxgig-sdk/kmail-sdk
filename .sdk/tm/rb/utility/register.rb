# Kmail SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KmailUtility.registrar = ->(u) {
  u.clean = KmailUtilities::Clean
  u.done = KmailUtilities::Done
  u.make_error = KmailUtilities::MakeError
  u.feature_add = KmailUtilities::FeatureAdd
  u.feature_hook = KmailUtilities::FeatureHook
  u.feature_init = KmailUtilities::FeatureInit
  u.fetcher = KmailUtilities::Fetcher
  u.make_fetch_def = KmailUtilities::MakeFetchDef
  u.make_context = KmailUtilities::MakeContext
  u.make_options = KmailUtilities::MakeOptions
  u.make_request = KmailUtilities::MakeRequest
  u.make_response = KmailUtilities::MakeResponse
  u.make_result = KmailUtilities::MakeResult
  u.make_point = KmailUtilities::MakePoint
  u.make_spec = KmailUtilities::MakeSpec
  u.make_url = KmailUtilities::MakeUrl
  u.param = KmailUtilities::Param
  u.prepare_auth = KmailUtilities::PrepareAuth
  u.prepare_body = KmailUtilities::PrepareBody
  u.prepare_headers = KmailUtilities::PrepareHeaders
  u.prepare_method = KmailUtilities::PrepareMethod
  u.prepare_params = KmailUtilities::PrepareParams
  u.prepare_path = KmailUtilities::PreparePath
  u.prepare_query = KmailUtilities::PrepareQuery
  u.result_basic = KmailUtilities::ResultBasic
  u.result_body = KmailUtilities::ResultBody
  u.result_headers = KmailUtilities::ResultHeaders
  u.transform_request = KmailUtilities::TransformRequest
  u.transform_response = KmailUtilities::TransformResponse
}
