import { PATTERNS } from 'ember-service-worker-request-chaos/service-worker/config';
import { createUrlRegEx, urlMatchesAnyPattern } from 'ember-service-worker/service-worker/url-utils';

const PATTERN_REGEX = PATTERNS.map(createUrlRegEx);

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (isChaotic(request)) {
    event.respondWith(chaoticError(request));
  } else {
    event.respondWith(fetch(request));
  }
});

function isChaotic(request) {
  const matches = urlMatchesAnyPattern(request.url, PATTERN_REGEX);
  const doesChaosReign = getRandomInt(0, 100) % getRandomInt(2, 10) === 0;
  return matches && doesChaosReign;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function chaoticError() {
  const httpStatus = getRandomInt(500, 505);
  const responseBody = {
    errors: [
      {
        title: 'Chaos reigns',
        detail: 'ember-service-worker-request-chaos intercepted this request and made it fail.',
        status: `${httpStatus}`
      }
    ]
  }
  const response = new Response(
    JSON.stringify(responseBody),
    { status: httpStatus }
  );
  return Promise.resolve(response);
}
