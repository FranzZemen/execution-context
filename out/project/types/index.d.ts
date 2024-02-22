import { AsyncCheckFunction, SyncCheckFunction, ValidationError, ValidationSchema } from 'fastest-validator';
export declare class ExecutionContextDefaults {
    static Thread: string;
    static RequestId: string;
    static Authorization: string;
    static LocalContext: string;
    static Execution(): Execution;
    static ExecutionContext(): ExecutionContext;
}
export interface Execution {
    thread?: string;
    requestId?: string;
    authorization?: string;
    localContext?: string;
}
export interface ExecutionContext {
    execution?: Execution;
    validated?: boolean;
}
export declare const executionSchema: ValidationSchema;
export declare const executionSchemaWrapper: ValidationSchema;
export declare const executionContextSchema: ValidationSchema;
export type CheckFunction = AsyncCheckFunction | SyncCheckFunction;
export declare function isCheckFunction(check: any | CheckFunction): check is CheckFunction;
export declare function isAsyncCheckFunction(check: any | CheckFunction): check is AsyncCheckFunction;
export declare function isSyncCheckFunction(check: any | CheckFunction): check is SyncCheckFunction;
export declare function validate(ec: ExecutionContext): ValidationError[] | true;
export declare function isExecutionContext(ec: any | ExecutionContext): ec is ExecutionContext;
