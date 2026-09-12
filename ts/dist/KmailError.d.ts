import { Context } from './Context';
declare class KmailError extends Error {
    isKmailError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { KmailError };
