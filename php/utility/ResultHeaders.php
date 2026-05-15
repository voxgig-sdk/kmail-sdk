<?php
declare(strict_types=1);

// Kmail SDK utility: result_headers

class KmailResultHeaders
{
    public static function call(KmailContext $ctx): ?KmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
