# Kmail SDK feature factory

from kmail_sdk.feature.base_feature import KmailBaseFeature
from kmail_sdk.feature.test_feature import KmailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: KmailBaseFeature(),
        "test": lambda: KmailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
