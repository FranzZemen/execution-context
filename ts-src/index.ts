import Validator, {ValidationError, ValidationSchema} from 'fastest-validator';
import {isPromise} from 'util/types';
import {v4 as uuidv4} from 'uuid';

export class ExecutionContextDefaults {
  static Thread = `Thread:`;
  static RequestId = `Request:`;
  static Authorization = 'None';
  static LocalContext = 'None';

  static Execution() : Execution {
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

export interface Execution {
  thread?: string; // The thread of execution, which can span across processes (if supplied in headers).
  requestId?: string; // The current process request id, as formed from  the aws request id or some other source
  authorization?: string; // Optional authorization in Bearer Token format Bearer [jwt]
  localContext?: string; // Optional local context - user beware of tracking this!
}


export interface ExecutionContext {
  // We nest in its own field for downward compatibility
  execution?: Execution;
  validated?: boolean;
}

export const executionSchema: ValidationSchema = {
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
}

export const executionSchemaWrapper: ValidationSchema = {
  type: 'object',
  optional: true,
  default: ExecutionContextDefaults.Execution(),
  props: executionSchema
}

export const executionContextSchema: ValidationSchema = {
  execution: executionSchemaWrapper,
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
