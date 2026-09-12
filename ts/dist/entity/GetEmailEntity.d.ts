import { KmailEntityBase } from '../KmailEntityBase';
import type { KmailSDK } from '../KmailSDK';
import type { Control } from '../types';
import type { GetEmail, GetEmailListMatch } from '../KmailTypes';
declare class GetEmailEntity extends KmailEntityBase<GetEmail> {
    constructor(client: KmailSDK, entopts: any);
    make(this: GetEmailEntity): GetEmailEntity;
    list(this: any, reqmatch?: GetEmailListMatch, ctrl?: Control): Promise<GetEmailEntity[]>;
}
export { GetEmailEntity };
