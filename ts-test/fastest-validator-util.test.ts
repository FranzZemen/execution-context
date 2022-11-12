import chai from 'chai';
import Validator, {ValidationSchema} from 'fastest-validator';
import 'mocha';
// @ts-ignore
import {CheckFunction, isAsyncCheckFunction, isSyncCheckFunction} from '@franzzemen/execution-context';

let should = chai.should();
let expect = chai.expect;

describe('app-utility tests', () => {
  describe('fastest-validator-util/fastest-validator-util.test', () => {
    it('should identify a synchronous check', done => {
      const schema: ValidationSchema = {
        something: {
          type: 'object',
          optional: true,
          props: {
            someProp: {type: 'boolean', optional: true}
          }
        }
      }
      const check: CheckFunction = (new Validator()).compile(schema);
      isSyncCheckFunction(check).should.be.true;
      isAsyncCheckFunction(check).should.be.false;
      done();
    })
    it('should identify an asynchronous check', done => {
      function dummyAsync(v): Promise<number> {
        return Promise.resolve(v);
      }
      const schema: ValidationSchema = {
        $$async: true,
        something: {
          type: 'object',
          optional: true,
          props: {
            someProp: {type: 'boolean', optional: true},
            username: {
              type: "number",
              custom: async (v, errors) => {
                return dummyAsync(v);
              }
            }
          }
        }
      }
      const check: CheckFunction = (new Validator()).compile(schema);
      isAsyncCheckFunction(check).should.be.true;
      isSyncCheckFunction(check).should.be.false;
      done();
    })
  })
})
