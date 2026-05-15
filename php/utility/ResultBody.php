<?php
declare(strict_types=1);

// Kmail SDK utility: result_body

class KmailResultBody
{
    public static function call(KmailContext $ctx): ?KmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
