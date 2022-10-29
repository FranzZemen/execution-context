import 'mocha';
import * as chai from 'chai';
import {inspect} from 'util';
import {ExecutionContext, validate, validateOnly} from '../publish/index.js';

const expect = chai.expect;
const should = chai.should();

describe('execution contenxt', () => {
  it('should set defaults and validate and freeze empty', () => {
    const ec: ExecutionContext = {};
    validate(ec).should.be.true;
    Object.isFrozen(ec).should.be.true;
    ec.execution.thread.should.exist;
    console.log(inspect(ec, false, 5), 'Execution Context');
  })
  it('should validateOnly empty optional fields', () => {
    const ec: ExecutionContext = {execution: {}};
    validateOnly(ec).should.be.true;
  })
  it('should succeed to validateOnly empty execution', () => {
    const ec: ExecutionContext = {execution: undefined};
    validateOnly(ec).should.be.true;
  })
});
