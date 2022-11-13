import 'mocha';
import * as chai from 'chai';
import {inspect} from 'util';

// @ts-ignore
import {ExecutionContext, validate} from '@franzzemen/execution-context';

const expect = chai.expect;
const should = chai.should();

describe('execution context', () => {
  it('should set defaults and validate', () => {
    const ec: ExecutionContext = {};
    validate(ec).should.be.true;
    ec.execution.thread.should.exist;
    console.log(inspect(ec, false, 5), 'Execution Context');
  })
  it('should validateOnly empty optional fields', () => {
    const ec: ExecutionContext = {execution: {}};
    validate(ec).should.be.true;
  })
  it('should succeed to validateOnly empty execution', () => {
    const ec: ExecutionContext = {execution: undefined};
    validate(ec).should.be.true;
  })
});
