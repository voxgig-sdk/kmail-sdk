# Kmail SDK utility: feature_add
module KmailUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
