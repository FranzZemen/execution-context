import 'mocha';
import * as chai from 'chai';
import {inspect} from 'util';

import {ExecutionContext,validateExecutionContext} from '@franzzemen/execution-context';

const expect = chai.expect;
const should = chai.should();

describe('execution context', () => {
  it('should set defaults and validate', () => {
    const ec: ExecutionContext = {};
    validateExecutionContext(ec).should.be.true;
    expect(ec?.execution?.thread).to.exist;
    console.log(inspect(ec, false, 5), 'Execution Context');
  })
  it('should validateOnly empty optional fields', () => {
    const ec: ExecutionContext = {execution: {}};
    validateExecutionContext(ec).should.be.true;
  })
  it('should succeed to validateOnly empty execution', () => {
    const ec: ExecutionContext = {};
    validateExecutionContext(ec).should.be.true;
  })
});
