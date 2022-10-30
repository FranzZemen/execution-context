# Read Me
Execution Context contains information about the currently executing context.  It should not contain application 
code specifics or functional capability in of itself, and it must remain easily streamable over the wire.  It is 
leveraged by nearly all @franzzemen packages

This is the base package for Execution Context and is enhanced by later packages.

# Install

npm i @franzzemen/execution-context

# Usage

This package is published for an ECMAScript module loader.  For CommonJS see below.

### ECMAScript

Create an execution context, set defaults and validate it

    import {ExecutionContext, validate} from '@franzzemen/execution-context';
    const ec:ExecutionContext = {execution: {}};
    validate(ec);

## CommonJS

    // Importing types in typescript from CommonJS is allowed
    import {ExecutionContext} from '@franzzemen/execution-context';

    import('@franzzemen/execution-context')
        .then(package => {
            const ec:ExecutionContext = {execution: {}};
            package.validate(ec);
        }

