package voxgigkmailsdk

import (
	"github.com/voxgig-sdk/kmail-sdk/go/core"
	"github.com/voxgig-sdk/kmail-sdk/go/entity"
	"github.com/voxgig-sdk/kmail-sdk/go/feature"
	_ "github.com/voxgig-sdk/kmail-sdk/go/utility"
)

// Type aliases preserve external API.
type KmailSDK = core.KmailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KmailEntity = core.KmailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KmailError = core.KmailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetEmailEntityFunc = func(client *core.KmailSDK, entopts map[string]any) core.KmailEntity {
		return entity.NewGetEmailEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKmailSDK = core.NewKmailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewKmailSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *KmailSDK  { return NewKmailSDK(nil) }
func Test() *KmailSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
