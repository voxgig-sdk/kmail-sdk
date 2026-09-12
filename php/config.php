<?php
declare(strict_types=1);

// Kmail SDK configuration

class KmailConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Kmail",
                "slug" => "kmail",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://kmail.pw",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_email" => [],
                ],
            ],
            "entity" => [
        'get_email' => [
          'fields' => [
            [
              'name' => 'attachments',
              'short' => 'List of attachments',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'body',
              'short' => 'Email body content',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'email',
              'name' => 'from',
              'short' => 'Sender email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the message',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'received_at',
              'short' => 'Timestamp when the message was received',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'subject',
              'short' => 'Email subject',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'get_email',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/get_email',
                  'segments' => [
                    [
                      'lit' => 'get_email',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.messages`',
                  ],
                  'parts' => [
                    'get_email',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return KmailFeatures::make_feature($name);
    }
}
