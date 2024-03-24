import {AsyncCheckFunction, SyncCheckFunction, ValidationError, ValidationSchema} from 'fastest-validator';
import {v4 as uuidv4} from 'uuid';
import {isPromise} from "node:util/types";
import {getValidator} from "@franzzemen/fastest-validator-wrapper";

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

export type Execution = {
  thread?: string; // The thread of execution, which can span across processes (if supplied in headers).
  requestId?: string; // The current process request id, as formed from  the aws request id or some other source
  authorization?: string; // Optional authorization in Bearer Token format Bearer [jwt]
  localContext?: string; // Optional local context - user beware of tracking this!
}


export type ExecutionContext = {
  // We nest in its own field for downward compatibility
  execution?: Execution;
  validated?: boolean;
}

export function isExecutionContext(ec: any | ExecutionContext): ec is ExecutionContext {
  return ec && 'execution' in ec;
}
