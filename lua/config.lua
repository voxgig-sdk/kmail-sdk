-- Kmail SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Kmail",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://kmail.pw",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_email"] = {},
      },
    },
    entity = {
      ["get_email"] = {
        ["fields"] = {
          {
            ["name"] = "attachments",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "body",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "from",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "received_at",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "subject",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_email",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/get_email",
                ["parts"] = {
                  "get_email",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.messages`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
