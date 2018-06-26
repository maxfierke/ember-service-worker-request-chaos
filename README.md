# ember-service-worker-request-chaos

Often our applications talk to external APIs. Sometimes our apps talk to
external APIs that ~~suck~~ are unreliable. Often, we don't test the failure
cases well enough (or at all).

* What does it look like when a request to X service flakes out?
* Where could we add recovery options?

We can answer these questions with **Service Workers** and not have to spend time
setting up a proxy on our local machines to [MITM]() all of our traffic. This addon
adds a service worker via `ember-service-worker` to intercept specified requests
and will randomly return error responses in the `5xx` range.

Find out how well your application tolerates failure!

## Runtime dependencies

* [`ember-service-worker`](https://github.com/DockYard/ember-service-worker)

Installation
------------------------------------------------------------------------------

* `ember install ember-service-worker` - (If you're not already using it)
* `ember install ember-service-worker-request-chaos`
* Define some patterns to intercept in your `ember-cli-build.js`

  ```
  /* eslint-env node */
  'use strict';

  const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

  module.exports = function(defaults) {
    let app = new EmberApp(defaults, {
      'esw-request-chaos': {
        // RegExp patterns specifying which URLs to wreck chaos.
        patterns: [
          'https://scaling.is.difficult/api/(.+)',
        ]
      }
    });

    // [...]
  };

  ```

## Installation for development

* `git clone <repository-url>` this repository
* `cd ember-service-worker-request-chaos`
* `yarn install`

### Running tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## TODO

* [ ] Configure to only include in development environment
