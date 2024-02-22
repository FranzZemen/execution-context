import * as chai from 'chai';
import Validator, {ValidationSchema} from 'fastest-validator';
import 'mocha';
import {CheckFunction, isAsyncCheckFunction, isSyncCheckFunction} from '@franzzemen/execution-context';
import {getValidator} from "@franzzemen/fastest-validator-wrapper";

let should = chai.should();
let expect = chai.expect;

describe('execution-context', () => {
  describe('fastest-validator-util.test', () => {
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
      const check: CheckFunction = getValidator().compile(schema);
      isSyncCheckFunction(check).should.be.true;
      isAsyncCheckFunction(check).should.be.false;
      done();
    })
    it('should identify an asynchronous check', done => {
      // @ts-ignore
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
              // @ts-ignore
              custom: async (v) => {
                return dummyAsync(v);
              }
            }
          }
        }
      }
      const check: CheckFunction = getValidator().compile(schema);
      isAsyncCheckFunction(check).should.be.true;
      isSyncCheckFunction(check).should.be.false;
      done();
    })
  })
})
