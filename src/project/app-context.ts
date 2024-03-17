/*
Created by Franz Zemen 03/17/2024
License Type: MIT
*/

import _ from 'lodash';
import {isPromise} from "util/types";
import {ValidationError, ValidationSchema} from "fastest-validator";
import {ExecutionContext, executionContextSchema} from "./execution-context.js";
import {getValidator} from "@franzzemen/fastest-validator-wrapper";

export interface App {
  name?: string; // The application context, for example, butchersrow
}

export class AppExecutionContextDefaults {
  static AppContext = 'Global';
  static App: App = {
    name: AppExecutionContextDefaults.AppContext
  };
  static AppExecutionContext: AppExecutionContext = {
    app: AppExecutionContextDefaults.App
  };
}

export interface AppExecutionContext extends ExecutionContext {
  app?: App;
}

export const appSchema: ValidationSchema = {
  appContext: {
    type: 'string',
    optional: true,
    default: AppExecutionContextDefaults.AppContext
  }
};

export const appSchemaWrapper: ValidationSchema = {
  type: 'object',
  optional: true,
  default: AppExecutionContextDefaults.App,
  props: appSchema
};

export const appExecutionContextSchema: ValidationSchema = _.merge({app: appSchemaWrapper}, executionContextSchema);


export const appExecutionContextSchemaWrapper: ValidationSchema = {
  type: 'object',
  optional: true,
  default: AppExecutionContextDefaults.AppExecutionContext,
  props: appExecutionContextSchema
};

const check = (getValidator({useNewCustomCheckerFunction: true})).compile(appExecutionContextSchema);

export function validateAppContext(context: AppExecutionContext, ignoreDefaults: boolean = false): true | ValidationError[] {
  const result = check(context);
  if (isPromise(result)) {
    throw new Error('Unexpected promise validating AppExecutionContext, it should not be async');
  } else {
    context.validated = true;
    return result;
  }
}

export function isAppExecutionContext(context: any | AppExecutionContext): context is AppExecutionContext {
  return context && 'appContext' in context;
}

