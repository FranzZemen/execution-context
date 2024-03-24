/*
Created by Franz Zemen 03/24/2024
License Type: MIT
*/

import {AsyncCheckFunction, SyncCheckFunction, ValidationError, ValidationSchema} from "fastest-validator";
import {getValidator} from "@franzzemen/fastest-validator-wrapper";
import {ExecutionContext, ExecutionContextDefaults} from "./execution-context.js";
import {AppExecutionContext, AppExecutionContextDefaults} from "./app-context.js";
import {getSyncCheckFunction} from "./check-function.js";

const executionSchema: ValidationSchema = {
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

const executionSchemaWrapper: ValidationSchema = {
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

export const appSchema: ValidationSchema = {
  appContext: {
    type: 'string',
    optional: false,
    default: AppExecutionContextDefaults.AppContext
  }
};

export const appSchemaWrapper: ValidationSchema = {
  type: 'object',
  optional: false,
  default: AppExecutionContextDefaults.App,
  props: appSchema
};

export const appExecutionContextSchema: ValidationSchema = {...{app: appSchemaWrapper}, ...executionContextSchema};

export const appExecutionContextSchemaWrapper: ValidationSchema = {
  type: 'object',
  optional: false,
  default: AppExecutionContextDefaults.AppExecutionContext,
  props: appExecutionContextSchema
};

const checkExecutionContext: SyncCheckFunction = getSyncCheckFunction(executionContextSchema);
const checkAppExecutionContext: SyncCheckFunction = getSyncCheckFunction(appExecutionContextSchema);

export function validateExecutionContext(ec: ExecutionContext): ValidationError[] | true {
  const result = checkExecutionContext(ec);
  if (result === true) {
    ec.validated = true;
  }
  return result;
}

export function validateAppExecutionContext(ec: AppExecutionContext): ValidationError[] | true {
  const result = checkAppExecutionContext(ec);
  if (result === true) {
    ec.validated = true;
  }
  return result;
}



