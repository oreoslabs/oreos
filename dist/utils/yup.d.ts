import * as yup from 'yup';
export declare type UnwrapPromise<T> = T extends Promise<infer U> ? U : T extends (...args: unknown[]) => Promise<infer U> ? U : T extends (...args: unknown[]) => infer U ? U : T;
export declare type YupSchema<Result = unknown, Context = unknown> = yup.Schema<Result, Context>;
export declare type YupSchemaResult<S extends yup.Schema<unknown, unknown>> = UnwrapPromise<ReturnType<S['validate']>>;
export declare class YupUtils {
    static tryValidate<S extends YupSchema>(schema: S, value: unknown, options?: yup.ValidateOptions<unknown>): Promise<{
        result: YupSchemaResult<S>;
        error: null;
    } | {
        result: null;
        error: yup.ValidationError;
    }>;
}
