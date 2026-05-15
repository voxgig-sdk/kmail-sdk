<?php
declare(strict_types=1);

// Kmail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class KmailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new KmailBaseFeature();
            case "test":
                return new KmailTestFeature();
            default:
                return new KmailBaseFeature();
        }
    }
}
