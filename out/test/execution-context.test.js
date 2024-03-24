import 'mocha';
import * as chai from 'chai';
import { inspect } from 'util';
import { validateExecutionContext } from '@franzzemen/execution-context';
const expect = chai.expect;
const should = chai.should();
describe('execution context', () => {
    it('should set defaults and validate', () => {
        const ec = {};
        validateExecutionContext(ec).should.be.true;
        expect(ec?.execution?.thread).to.exist;
        console.log(inspect(ec, false, 5), 'Execution Context');
    });
    it('should validateOnly empty optional fields', () => {
        const ec = { execution: {} };
        validateExecutionContext(ec).should.be.true;
    });
    it('should succeed to validateOnly empty execution', () => {
        const ec = {};
        validateExecutionContext(ec).should.be.true;
    });
});
//# sourceMappingURL=execution-context.test.js.map