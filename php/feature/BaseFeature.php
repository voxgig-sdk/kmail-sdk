<?php
declare(strict_types=1);

// Kmail SDK base feature

class KmailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(KmailContext $ctx, array $options): void {}
    public function PostConstruct(KmailContext $ctx): void {}
    public function PostConstructEntity(KmailContext $ctx): void {}
    public function SetData(KmailContext $ctx): void {}
    public function GetData(KmailContext $ctx): void {}
    public function GetMatch(KmailContext $ctx): void {}
    public function SetMatch(KmailContext $ctx): void {}
    public function PrePoint(KmailContext $ctx): void {}
    public function PreSpec(KmailContext $ctx): void {}
    public function PreRequest(KmailContext $ctx): void {}
    public function PreResponse(KmailContext $ctx): void {}
    public function PreResult(KmailContext $ctx): void {}
    public function PreDone(KmailContext $ctx): void {}
    public function PreUnexpected(KmailContext $ctx): void {}
}
