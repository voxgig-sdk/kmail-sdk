# Kmail SDK configuration

module KmailConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Kmail",
        "slug" => "kmail",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://kmail.pw",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_email" => {},
        },
      },
      "entity" => {
        "get_email" => {
          "fields" => [
            {
              "name" => "attachments",
              "short" => "List of attachments",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "body",
              "short" => "Email body content",
              "type" => "`$STRING`",
            },
            {
              "format" => "email",
              "name" => "from",
              "short" => "Sender email address",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the message",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "received_at",
              "short" => "Timestamp when the message was received",
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "short" => "Email subject",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_email",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/get_email",
                  "segments" => [
                    {
                      "lit" => "get_email",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.messages`",
                  },
                  "parts" => [
                    "get_email",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    KmailFeatures.make_feature(name)
  end
end
