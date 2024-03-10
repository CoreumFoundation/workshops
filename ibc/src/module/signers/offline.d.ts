export declare class OfflineSigner {
    sign(tx: any, account: string): Promise<void>;
    requestConnection(): Promise<boolean>;
}
