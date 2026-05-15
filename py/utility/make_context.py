# Kmail SDK utility: make_context

from core.context import KmailContext


def make_context_util(ctxmap, basectx):
    return KmailContext(ctxmap, basectx)
