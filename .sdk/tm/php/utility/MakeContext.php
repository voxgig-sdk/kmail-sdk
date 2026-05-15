<?php
declare(strict_types=1);

// Kmail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class KmailMakeContext
{
    public static function call(array $ctxmap, ?KmailContext $basectx): KmailContext
    {
        return new KmailContext($ctxmap, $basectx);
    }
}
