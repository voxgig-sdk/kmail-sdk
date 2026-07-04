# frozen_string_literal: true

# Typed models for the Kmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetEmail entity data model.
#
# @!attribute [rw] attachment
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] received_at
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
GetEmail = Struct.new(
  :attachment,
  :body,
  :from,
  :id,
  :received_at,
  :subject,
  keyword_init: true
)

# Match filter for GetEmail#list (any subset of GetEmail fields).
#
# @!attribute [rw] attachment
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] received_at
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
GetEmailListMatch = Struct.new(
  :attachment,
  :body,
  :from,
  :id,
  :received_at,
  :subject,
  keyword_init: true
)

