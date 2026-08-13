# Kmail SDK utility: make_context

from kmail_sdk.core.context import KmailContext


def make_context_util(ctxmap, basectx):
    return KmailContext(ctxmap, basectx)
