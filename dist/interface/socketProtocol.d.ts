import * as yup from 'yup';
export declare const MESSAGE_DELIMITER = "\f";
export declare type SocketRpcClient = {
    type: 'message';
    data: SocketRpcRequest;
};
export declare type SocketRpcRequest = {
    mid: number;
    type: string;
    auth: string | null | undefined;
    data: unknown | undefined;
};
export declare type SocketRpcServerResponse = {
    result?: SocketRpcServer | null | undefined;
    error?: yup.ValidationError | null | undefined;
};
export declare type SocketRpcServer = {
    type: 'message' | 'malformedRequest' | 'error' | 'stream';
    data: SocketRpcResponse | SocketRpcError | SocketRpcStream;
};
export declare type SocketRpcResponse = {
    id: number;
    status: number;
    data: unknown | undefined;
};
export declare type SocketRpcStream = {
    id: number;
    data: unknown | undefined;
};
export declare type SocketRpcError = {
    code: string;
    message: string;
    stack?: string;
};
export declare const SocketRpcClientSchema: yup.ObjectSchema<SocketRpcClient>;
export declare const SocketRpcServerSchema: yup.ObjectSchema<SocketRpcServer>;
export declare const SocketRpcErrorSchema: yup.ObjectSchema<SocketRpcError>;
export declare const SocketRpcRequestSchema: yup.ObjectSchema<SocketRpcRequest>;
export declare const SocketRpcResponseSchema: yup.ObjectSchema<SocketRpcResponse>;
