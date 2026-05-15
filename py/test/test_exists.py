# ProjectName SDK exists test

import pytest
from kmail_sdk import KmailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = KmailSDK.test(None, None)
        assert testsdk is not None
