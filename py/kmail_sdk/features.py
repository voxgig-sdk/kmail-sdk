# Kmail SDK feature factory

from kmail_sdk.feature.base_feature import KmailBaseFeature
from kmail_sdk.feature.ratelimit_feature import KmailRatelimitFeature
from kmail_sdk.feature.retry_feature import KmailRetryFeature
from kmail_sdk.feature.test_feature import KmailTestFeature
from kmail_sdk.feature.timeout_feature import KmailTimeoutFeature


_FEATURES = {
    "base": lambda: KmailBaseFeature(),
    "ratelimit": lambda: KmailRatelimitFeature(),
    "retry": lambda: KmailRetryFeature(),
    "test": lambda: KmailTestFeature(),
    "timeout": lambda: KmailTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
