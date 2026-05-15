<?php
declare(strict_types=1);

// Kmail SDK utility: prepare_body

class KmailPrepareBody
{
    public static function call(KmailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
