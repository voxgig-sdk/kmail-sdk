# Kmail SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Kmail",
            "slug": "kmail",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://kmail.pw",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_email": {},
            },
        },
        "entity": {
      "get_email": {
        "fields": [
          {
            "name": "attachments",
            "title": "Attachments",
            "type": "`$ARRAY`",
            "short": "List of attachments",
          },
          {
            "name": "body",
            "title": "Body",
            "type": "`$STRING`",
            "short": "Email body content",
          },
          {
            "name": "from",
            "title": "From",
            "type": "`$STRING`",
            "short": "Sender email address",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the message",
          },
          {
            "name": "received_at",
            "title": "Received At",
            "type": "`$STRING`",
            "short": "Timestamp when the message was received",
            "format": "date-time",
          },
          {
            "name": "subject",
            "title": "Subject",
            "type": "`$STRING`",
            "short": "Email subject",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "get_email",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/get_email",
                "segments": [
                  {
                    "lit": "get_email",
                  },
                ],
                "parts": [
                  "get_email",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.messages`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
