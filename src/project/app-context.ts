/*
Created by Franz Zemen 03/17/2024
License Type: MIT
*/

import _ from 'lodash';
import {isPromise} from "util/types";
import {ValidationError, ValidationSchema} from "fastest-validator";
import {ExecutionContext} from "./execution-context.js";
import {getValidator} from "@franzzemen/fastest-validator-wrapper";

export type App = {
  name: string; // The application context, for example, butchersrow
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

export type AppExecutionContext = ExecutionContext & {
  app: App;
}

export function isAppExecutionContext(context: any | AppExecutionContext): context is AppExecutionContext {
  return context && 'app' in context;
}

