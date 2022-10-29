import 'mocha';
import * as chai from 'chai';
import {ExecutionContext, validate, validateOnly} from '../publish/index.js';

const expect = chai.expect;
const should = chai.should();

describe('execution contenxt', () => {
  it('should set defaults and validate and freeze empty', () => {
    const ec: ExecutionContext = {execution: {}};
    validate(ec).should.be.true;
    Object.isFrozen(ec).should.be.true;
    ec.execution.thread.should.exist;
  })
  it('should validateOnly empty optional fields', () => {
    const ec: ExecutionContext = {execution: {}};
    validateOnly(ec).should.be.true;
  })
});
