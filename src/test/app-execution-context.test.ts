import 'mocha';
import * as chai from 'chai';
import {AppExecutionContext, validateAppExecutionContext,AppExecutionContextDefaults} from "@franzzemen/execution-context";

const expect = chai.expect;
const should = chai.should();

describe('app-execution-context tests', () => {
  it('should insert defaults', () => {
    let appConfig: AppExecutionContext = {app: {name: AppExecutionContextDefaults.AppContext}};
    const result = validateAppExecutionContext(appConfig);
    result.should.be.true;
    if (appConfig.app?.name !== undefined && appConfig.execution !== undefined) {
      appConfig.app.name.should.equal(AppExecutionContextDefaults.AppContext);
      appConfig.execution.should.exist;
    }
  })
})

