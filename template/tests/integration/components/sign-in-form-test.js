import { fillIn, render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Integration | Component | sign-in-form', function (hooks) {
  setupRenderingTest(hooks);

  const email = 'email@example.com';
  const password = 'password';

  module('sign in success', function (hooks) {
    let session;
    let onSignedIn;

    hooks.beforeEach(async function () {
      session = {
        authenticate: sinon.stub().resolves(),
      };
      onSignedIn = sinon.spy();

      this.owner.register('service:session', session, { instantiate: false });
      this.set('onSignedIn', onSignedIn);
      await render(hbs`<SignInForm @onSignedIn={{onSignedIn}} />`);

      await fillIn('[data-test-email-field]', email);
      await fillIn('[data-test-password-field]', password);
      await triggerEvent('[data-test-sign-in-form]', 'submit');
    });

    test('it calls authenticate with credentials', function (assert) {
      assert.deepEqual(
        session.authenticate.getCall(0).args,
        ['authenticator:oauth', email, password],
        'authenticate called with credentials',
      );
    });

    test('it calls onSignedIn', function (assert) {
      assert.ok(onSignedIn.calledOnce, 'onSignedIn called');
    });
  });

  module('sign in failure', function (hooks) {
    const errorMessage = 'Server error';

    let session;
    let onSignedIn;

    hooks.beforeEach(async function () {
      session = {
        authenticate: sinon.stub().rejects(new Error(errorMessage)),
      };
      onSignedIn = sinon.spy();

      this.owner.register('service:session', session, { instantiate: false });
      this.set('onSignedIn', onSignedIn);
      await render(hbs`<SignInForm @onSignedIn={{onSignedIn}} />`);

      await fillIn('[data-test-email-field]', email);
      await fillIn('[data-test-password-field]', password);
      await triggerEvent('[data-test-sign-in-form]', 'submit');
    });

    test('it displays an error message', function (assert) {
      assert.dom('[data-test-error-message]').hasText(errorMessage);
    });

    test('it does not call onSignedIn', function (assert) {
      assert.ok(onSignedIn.notCalled, 'onSignedIn not called');
    });
  });
});
