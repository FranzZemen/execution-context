import * as chai from 'chai';
import 'mocha';
import { isAsyncCheckFunction, isSyncCheckFunction } from '@franzzemen/execution-context';
import { getValidator } from "@franzzemen/fastest-validator-wrapper";
let should = chai.should();
let expect = chai.expect;
describe('execution-context', () => {
    describe('fastest-validator-util.test', () => {
        it('should identify a synchronous check', done => {
            const schema = {
                something: {
                    type: 'object',
                    optional: true,
                    props: {
                        someProp: { type: 'boolean', optional: true }
                    }
                }
            };
            const check = getValidator().compile(schema);
            isSyncCheckFunction(check).should.be.true;
            isAsyncCheckFunction(check).should.be.false;
            done();
        });
        it('should identify an asynchronous check', done => {
            // @ts-ignore
            function dummyAsync(v) {
                return Promise.resolve(v);
            }
            const schema = {
                $$async: true,
                something: {
                    type: 'object',
                    optional: true,
                    props: {
                        someProp: { type: 'boolean', optional: true },
                        username: {
                            type: "number",
                            // @ts-ignore
                            custom: async (v) => {
                                return dummyAsync(v);
                            }
                        }
                    }
                }
            };
            const check = getValidator().compile(schema);
            isAsyncCheckFunction(check).should.be.true;
            isSyncCheckFunction(check).should.be.false;
            done();
        });
    });
});
//# sourceMappingURL=fastest-validator-util.test.js.map