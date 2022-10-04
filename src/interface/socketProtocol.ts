import * as yup from 'yup';

export const MESSAGE_DELIMITER = '\f';

export type SocketRpcClient = {
  type: 'message';
  data: SocketRpcRequest;
};

export type SocketRpcRequest = {
  mid: number;
  type: string;
  auth: string | null | undefined;
  data: unknown | undefined;
};

export type SocketRpcServer = {
  type: 'message' | 'malformedRequest' | 'error' | 'stream';
  data: SocketRpcResponse | SocketRpcError | SocketRpcStream;
};

export type SocketRpcResponse = {
  id: number;
  status: number;
  data: unknown | undefined;
};

export type SocketRpcStream = {
  id: number;
  data: unknown | undefined;
};

export type SocketRpcError = {
  code: string;
  message: string;
  stack?: string;
};

export const SocketRpcClientSchema: yup.ObjectSchema<SocketRpcClient> = yup
  .object({
    type: yup.string()
      .oneOf(['message'])
      .required(),
    data: yup
      .object({
        mid: yup.number()
          .required(),
        type: yup.string()
          .required(),
        auth: yup.string()
          .nullable()
          .notRequired(),
        data: yup.mixed()
          .notRequired(),
      })
      .required(),
  })
  .required();

export const SocketRpcServerSchema: yup.ObjectSchema<SocketRpcServer> = yup
  .object({
    type: yup.string()
      .oneOf(['message', 'malformedRequest', 'error', 'stream'])
      .required(),
    data: yup.mixed<SocketRpcResponse | SocketRpcError | SocketRpcStream>()
      .required(),
  })
  .required();

export const SocketRpcErrorSchema: yup.ObjectSchema<SocketRpcError> = yup
  .object({
    code: yup.string()
      .defined(),
    message: yup.string()
      .defined(),
    stack: yup.string()
      .notRequired(),
  })
  .defined();

export const SocketRpcRequestSchema: yup.ObjectSchema<SocketRpcRequest> = yup
  .object({
    mid: yup.number()
      .required(),
    type: yup.string()
      .required(),
    auth: yup.string()
      .nullable()
      .notRequired(),
    data: yup.mixed()
      .notRequired(),
  })
  .required();

export const SocketRpcResponseSchema: yup.ObjectSchema<SocketRpcResponse> = yup
  .object({
    id: yup.number()
      .defined(),
    status: yup.number()
      .defined(),
    data: yup.mixed()
      .notRequired(),
  })
  .defined();
