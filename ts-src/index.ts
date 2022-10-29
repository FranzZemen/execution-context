import deepFreeze from '@franzzemen/deep-freeze';
import Validator, {ValidationError} from 'fastest-validator';
import {isPromise} from 'util/types';
import {v4 as uuidv4} from 'uuid';

export class ExecutionContextDefaults {
  static Thread = `Thread:`;
  static RequestId = `Request:`;
  static Authorization = 'None';
  static LocalContext = 'None';

  static default() {
    return {
      execution: {
        thread: `${ExecutionContextDefaults.Thread} ${uuidv4()}`,
        requestId: `${ExecutionContextDefaults.RequestId} ${uuidv4()}`,
        authorization: ExecutionContextDefaults.Authorization,
        localContext: ExecutionContextDefaults.LocalContext
      }
    };
  }
}


export interface ExecutionContext {
  // We nest in its own field for downward compatibility
  execution: {
    thread?: string; // The thread of execution, which can span across processes (if supplied in headers).
    requestId?: string; // The current process request id, as formed from  the aws request id or some other source
    authorization?: string; // Optional authorization in Bearer Token format Bearer [jwt]
    localContext?: string; // Optional local context - user beware of tracking this!
  };
}

export const executionContextSchema = {
  execution: {
    type: 'object',
    optional: false,
    props: {
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
      },
      checked: {
        type: 'boolean',
        optional: true,
        default: true // If checked/defaulted
      }
    }
  }
};

const check = (new Validator({useNewCustomCheckerFunction: true})).compile(executionContextSchema);

export function validateOnly(ec: ExecutionContext): ValidationError[] | true {
  const result = check(ec);
  if (isPromise(result)) {
    throw new Error('Unexpected, execution context validation is never asynchronous');
  } else {
    return result;
  }
}

export function validate(ec: ExecutionContext): ValidationError[] | true {
  const result = validateOnly(ec);
  if (result === true) {
    deepFreeze(ec);
  }
  return result;
}

export function isExecutionContext(ec: any | ExecutionContext): ec is ExecutionContext {
  return 'execution' in ec;
}