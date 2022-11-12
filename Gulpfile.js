import {dirname, join} from 'node:path';
import {cwd} from 'node:process';
import {npmu as npmuFunc} from '@franzzemen/npmu';
import * as gulpBase from '@franzzemen/gulp-base';
import { createRequire } from "module";
import {fileURLToPath} from 'url';
import {simpleGit} from 'simple-git';

const requireModule = createRequire(import.meta.url);
gulpBase.init(requireModule('./package.json'), cwd(), 100, 'main');
gulpBase.setMainBranch('main');
gulpBase.setGenerateCommonJS(true);
gulpBase.setGenerateES(true);

export const npmu  = (cb) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  
  npmuFunc([
    {
      path: join(__dirname, '../gulp-base'), packageName: '@franzzemen/gulp-base',
    }, {
      path: join(__dirname, '../npmu'), packageName: '@franzzemen/npmu',
    }, {
      path: join(__dirname, './'), packageName: '@franzzemen/execution-context',
    }])
    .then(() => {
      console.log('cb...');
      cb();
    })
}


export const test = gulpBase.test;

export const clean = gulpBase.clean;
export const buildTest = gulpBase.buildTest;
export default gulpBase.default;

export const patch = gulpBase.patch;
export const minor = gulpBase.minor;
export const major = gulpBase.major;
