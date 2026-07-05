<?php
declare(strict_types=1);

// Typed models for the Kmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetEmail entity data model. */
class GetEmail
{
    public ?array $attachment = null;
    public ?string $body = null;
    public ?string $from = null;
    public ?string $id = null;
    public ?string $received_at = null;
    public ?string $subject = null;
}

/** Request payload for GetEmail#list. */
class GetEmailListMatch
{
    public ?array $attachment = null;
    public ?string $body = null;
    public ?string $from = null;
    public ?string $id = null;
    public ?string $received_at = null;
    public ?string $subject = null;
}

