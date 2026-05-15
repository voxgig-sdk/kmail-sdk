<?php
declare(strict_types=1);

// Kmail SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

KmailUtility::setRegistrar(function (KmailUtility $u): void {
    $u->clean = [KmailClean::class, 'call'];
    $u->done = [KmailDone::class, 'call'];
    $u->make_error = [KmailMakeError::class, 'call'];
    $u->feature_add = [KmailFeatureAdd::class, 'call'];
    $u->feature_hook = [KmailFeatureHook::class, 'call'];
    $u->feature_init = [KmailFeatureInit::class, 'call'];
    $u->fetcher = [KmailFetcher::class, 'call'];
    $u->make_fetch_def = [KmailMakeFetchDef::class, 'call'];
    $u->make_context = [KmailMakeContext::class, 'call'];
    $u->make_options = [KmailMakeOptions::class, 'call'];
    $u->make_request = [KmailMakeRequest::class, 'call'];
    $u->make_response = [KmailMakeResponse::class, 'call'];
    $u->make_result = [KmailMakeResult::class, 'call'];
    $u->make_point = [KmailMakePoint::class, 'call'];
    $u->make_spec = [KmailMakeSpec::class, 'call'];
    $u->make_url = [KmailMakeUrl::class, 'call'];
    $u->param = [KmailParam::class, 'call'];
    $u->prepare_auth = [KmailPrepareAuth::class, 'call'];
    $u->prepare_body = [KmailPrepareBody::class, 'call'];
    $u->prepare_headers = [KmailPrepareHeaders::class, 'call'];
    $u->prepare_method = [KmailPrepareMethod::class, 'call'];
    $u->prepare_params = [KmailPrepareParams::class, 'call'];
    $u->prepare_path = [KmailPreparePath::class, 'call'];
    $u->prepare_query = [KmailPrepareQuery::class, 'call'];
    $u->result_basic = [KmailResultBasic::class, 'call'];
    $u->result_body = [KmailResultBody::class, 'call'];
    $u->result_headers = [KmailResultHeaders::class, 'call'];
    $u->transform_request = [KmailTransformRequest::class, 'call'];
    $u->transform_response = [KmailTransformResponse::class, 'call'];
});
