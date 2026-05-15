package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetEmailEntityFunc func(client *KmailSDK, entopts map[string]any) KmailEntity

