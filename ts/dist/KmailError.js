"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KmailError = void 0;
class KmailError extends Error {
    isKmailError = true;
    sdk = 'Kmail';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.KmailError = KmailError;
//# sourceMappingURL=KmailError.js.map