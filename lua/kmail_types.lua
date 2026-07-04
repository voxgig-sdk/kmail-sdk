-- Typed models for the Kmail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetEmail
---@field attachment? table
---@field body? string
---@field from? string
---@field id? string
---@field received_at? string
---@field subject? string

---@class GetEmailListMatch

local M = {}

return M
