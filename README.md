# Kmail SDK

Generate disposable inboxes and fetch incoming mail from the kmail.pw temporary email service

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Kmail API

[Kmail](https://kmail.pw) is a temporary (disposable) email service that lets you create throwaway inboxes for receiving mail without registering an account. The HTTP API exposes the same refresh mechanism the web UI uses to poll for newly delivered messages.

What you get from the API:

- Fetch newly arrived messages for a temporary inbox via `GET /api/refresh`.
- Receive plain text, HTML, and attachment payloads as delivered to the address.

Operational notes:

- Inboxes are receive-only — Kmail does not let you send outbound email.
- Each address is valid for 24 hours, after which messages are deleted automatically.
- The freepublicapis.com listing notes that CORS is disabled, so browser-side calls from other origins will be blocked.
- No authentication or API key is documented; no rate limits are published.

## Try it

**TypeScript**
```bash
npm install kmail
```

**Python**
```bash
pip install kmail-sdk
```

**PHP**
```bash
composer require voxgig/kmail-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/kmail-sdk/go
```

**Ruby**
```bash
gem install kmail-sdk
```

**Lua**
```bash
luarocks install kmail-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { KmailSDK } from 'kmail'

const client = new KmailSDK({})

// List all getemails
const getemails = await client.GetEmail().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o kmail-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "kmail": {
      "command": "/abs/path/to/kmail-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **GetEmail** | Polls a temporary inbox for newly delivered messages via `GET /api/refresh`, returning any mail received since the last refresh. | `/get_email` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from kmail_sdk import KmailSDK

client = KmailSDK({})

# List all getemails
getemails, err = client.GetEmail(None).list(None, None)
```

### PHP

```php
<?php
require_once 'kmail_sdk.php';

$client = new KmailSDK([]);

// List all getemails
[$getemails, $err] = $client->GetEmail(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/kmail-sdk/go"

client := sdk.NewKmailSDK(map[string]any{})

// List all getemails
getemails, err := client.GetEmail(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Kmail_sdk"

client = KmailSDK.new({})

# List all getemails
getemails, err = client.GetEmail(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("kmail_sdk")

local client = sdk.new({})

-- List all getemails
local getemails, err = client:GetEmail(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = KmailSDK.test()
const result = await client.GetEmail().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = KmailSDK.test(None, None)
result, err = client.GetEmail(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = KmailSDK::test(null, null);
[$result, $err] = $client->GetEmail(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetEmail(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = KmailSDK.test(nil, nil)
result, err = client.GetEmail(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetEmail(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Kmail API

- Upstream: [https://kmail.pw](https://kmail.pw)
- API docs: [https://freepublicapis.com/kmail-api](https://freepublicapis.com/kmail-api)

- No formal licence statement is published for the Kmail API.
- The underlying service is free to use with no registration and no fees.
- Abusive or illegal use is prohibited and may result in immediate termination.
- Check the [privacy](https://kmail.pw/privacy) and [terms](https://kmail.pw/terms) pages for the latest conditions.

---

Generated from the Kmail API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
