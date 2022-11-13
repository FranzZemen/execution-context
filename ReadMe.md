# Read Me
Execution Context contains information about the currently executing context. It is leveraged by nearly all @franzzemen 
packages.

This is the base package for Execution Context and is enhanced by later packages.

# Install

npm i @franzzemen/execution-context

# Usage

Package can be invoked by both commonjs and es module loaders.  If using typescript, write the same code:

```` typescript
import {ExecutionContext, validate} from '@franzzemen/execution-context';
````

If using Javascript with es module loading:

```` javascript
import {validate} from '@franzzemen/execution-context;
````

If using commonjs module loading:

```` javascript
const validate = require('@franzzemen/execution-context').validate;
````
One can alway leverage dynamic imports, for example from typescript:

```` typescript
import type {ExecutionContext} from '@franzzemen/execution-context;
import('@franzzemen/executionContext')
.then(module => {
  const validate = module.validate;
  let ec: ExecutionContext = {};
  validate(ec);
});
