<?php
declare(strict_types=1);

// Kmail SDK utility: feature_add

class KmailFeatureAdd
{
    public static function call(KmailContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
