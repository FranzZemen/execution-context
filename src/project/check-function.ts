/*
Created by Franz Zemen 03/24/2024
License Type: MIT
*/

import {AsyncCheckFunction, SyncCheckFunction, ValidationSchema} from "fastest-validator";
import {getValidator} from "@franzzemen/fastest-validator-wrapper";

export type CheckFunction = AsyncCheckFunction | SyncCheckFunction;

export function isCheckFunction(check: any | CheckFunction): check is CheckFunction {
  return check !== undefined && 'async' in check;
}

export function isAsyncCheckFunction(check: any | CheckFunction): check is AsyncCheckFunction {
  return check !== undefined && check.async === true;
}

export function isSyncCheckFunction(check: any | CheckFunction): check is SyncCheckFunction {
  return check !== undefined && check.async === false;
}

export function getSyncCheckFunction(schema: ValidationSchema): SyncCheckFunction {
  const checkFunction: SyncCheckFunction | AsyncCheckFunction = getValidator().compile(schema);
  if (isSyncCheckFunction(checkFunction)) {
    return checkFunction;
  } else {
    throw new Error('Unexpected, check function is not synchronous');
  }
}

export function getAsyncCheckFunction(schema: ValidationSchema): AsyncCheckFunction {
  const checkFunction: SyncCheckFunction | AsyncCheckFunction = getValidator().compile(schema);
  if (isAsyncCheckFunction(checkFunction)) {
    return checkFunction;
  } else {
    throw new Error('Unexpected, check function is not asynchronous');
  }
}
