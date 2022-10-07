export declare type GetBalanceRequest = {
    account?: string;
    minimumBlockConfirmations?: number;
};
export declare type GetAccountTransactionRequest = {
    account?: string;
    hash: string;
};
export declare type GetBlockRequest = {
    index?: number;
    hash?: string;
};
export declare type GetBlockInfoRequest = {
    search?: string;
    hash?: string;
    sequence?: number;
};
export declare type GetChainInfoRequest = Record<string, never> | undefined;
export declare type GetFeesRequest = {
    numOfBlocks: number;
};
export declare type SendTransactionRequest = {
    fromAccountName: string;
    receives: {
        publicAddress: string;
        amount: string;
        memo: string;
    }[];
    fee: string;
    expirationSequence?: number | null;
    expirationSequenceDelta?: number | null;
};
