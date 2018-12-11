# wix-eventually [![Build Status](https://travis-ci.org/wix/wix-eventually.svg?branch=master)](https://travis-ci.org/wix/wix-eventually) [![npm version](https://badge.fury.io/js/wix-eventually.svg)](https://badge.fury.io/js/wix-eventually)

Retries promise until timeout expires in a linear fashion with delays defined by `interval`. Given this module is inteded to be used **only** within tests it does not provide more robust strategies like [retry-as-promised](https://www.npmjs.com/package/retry-as-promised), but instead is designed to be predictable and fit within timeouts defined for your tests.

Uses defaults:
 - timeout: 10s;
 - interval: 200ms;

## install

```bash
npm install --save-dev wix-eventually
```

## usage

```js
const eventually = require('wix-eventually')
const {expect} = require('chai')

describe('example', () => {
  it('should retry', async () => {
    let hasCompleted = false
    setTimeout(() => (hasCompleted = true), 1000)

    await eventually(() => {
      expect(hasCompleted).to.equal(true)
    })
  })
})
```

## Api

### (fn, opts): Promise
Wraps a promise that retries a function n times with 200 ms delay in between;

Arguments:
 - fn - sync function or thenable.
 - opts - optional object with:
   - timeout - timeout for retrying, ms;
   - interval - retry interval, ms.

### with(defaults): (fn, opts)
Returns a function with provided `defaults` - {timeout, interval}.


## Note regarding testing

Using this library might cause an anti-pattern of writing tests that take a long time to run.
For example, if the code is using `setTimeout`, it's "easy" to use `eventually` to check the result.
In case the timeout is set for 3 seconds, the test will now take 3 seconds.
Instead, the code should be written in such way that the `setTimeout` functionality can be modified in the test to either run synchronously or with a very short timeout value.
