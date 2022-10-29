import deepFreeze from '@franzzemen/deep-freeze';
import Validator, {ValidationError, ValidationSchema} from 'fastest-validator';
import {isPromise} from 'util/types';
import {v4 as uuidv4} from 'uuid';

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

  static ExecutionContext(): ExecutionContext {
    return {
      execution: ExecutionContextDefaults.Execution()
    };
  }
}


export interface ExecutionContext {
  // We nest in its own field for downward compatibility
  execution?: {
    thread?: string; // The thread of execution, which can span across processes (if supplied in headers).
    requestId?: string; // The current process request id, as formed from  the aws request id or some other source
    authorization?: string; // Optional authorization in Bearer Token format Bearer [jwt]
    localContext?: string; // Optional local context - user beware of tracking this!
  };
  validated?: boolean;
}

export const executionContextSchema: ValidationSchema = {
  execution: {
    type: 'object',
    optional: true,
    default: ExecutionContextDefaults.Execution(),
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
  },
  validated: {
    type: 'boolean',
    optional: true,
    default: false
  }
};


const check = (new Validator({useNewCustomCheckerFunction: true})).compile(executionContextSchema);

export function validate(ec: ExecutionContext): ValidationError[] | true {
  const result = check(ec);
  if (isPromise(result)) {
    throw new Error('Unexpected, execution context validation is never asynchronous');
  } else {
    if (result === true) {
      ec.validated = true;
    }
    return result;
  }
}


export function isExecutionContext(ec: any | ExecutionContext): ec is ExecutionContext {
  return 'execution' in ec;
}
