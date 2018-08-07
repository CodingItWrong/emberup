import { describe, it } from 'mocha';
import { expect } from 'chai';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-mocha';

describe('Acceptance | smoke test', function() {
  setupApplicationTest();

  it('can visit the root URL', async function() {
    await visit('/');
    expect(currentURL()).to.equal('/');
  });
});
