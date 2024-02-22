import { v4 as uuidv4 } from 'uuid';
import { isPromise } from "node:util/types";
import { getValidator } from "@franzzemen/fastest-validator-wrapper";
export class ExecutionContextDefaults {
    static Thread = `Thread:`;
    static RequestId = `Request:`;
    static Authorization = 'None';
    static LocalContext = 'None';
    static Execution() {
        return {
            thread: `${ExecutionContextDefaults.Thread} ${uuidv4()}`,
            requestId: `${ExecutionContextDefaults.RequestId} ${uuidv4()}`,
            authorization: ExecutionContextDefaults.Authorization,
            localContext: ExecutionContextDefaults.LocalContext
        };
    }
    static ExecutionContext() {
        return {
            execution: ExecutionContextDefaults.Execution()
        };
    }
}
export const executionSchema = {
    thread: {
        type: 'string',
        optional: true,
        default: ExecutionContextDefaults.Thread
    },
    requestId: {
        type: 'string',
        optional: true,
        default: ExecutionContextDefaults.RequestId
    },
    authorization: {
        type: 'string',
        optional: true,
        default: ExecutionContextDefaults.Authorization
    },
    localContext: {
        type: 'string',
        optional: true,
        default: ExecutionContextDefaults.LocalContext
    }
};
export const executionSchemaWrapper = {
    type: 'object',
    optional: true,
    default: ExecutionContextDefaults.Execution(),
    props: executionSchema
};
export const executionContextSchema = {
    execution: executionSchemaWrapper,
    validated: {
        type: 'boolean',
        optional: true,
        default: false
    }
};
export function isCheckFunction(check) {
    return check !== undefined && 'async' in check;
}
export function isAsyncCheckFunction(check) {
    return check !== undefined && check.async === true;
}
export function isSyncCheckFunction(check) {
    return check !== undefined && check.async === false;
}
const check = getValidator().compile(executionContextSchema);
export function validate(ec) {
    const result = check(ec);
    if (isPromise(result)) {
        throw new Error('Unexpected, execution context validation is never asynchronous');
    }
    else {
        if (result === true) {
            ec.validated = true;
        }
        return result;
    }
}
export function isExecutionContext(ec) {
    return ec && 'execution' in ec;
}
//# sourceMappingURL=index.js.map