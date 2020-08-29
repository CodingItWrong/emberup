import { fillIn, render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Integration | Component | sign-up-form', function (hooks) {
  setupRenderingTest(hooks);

  const email = 'example@example.com';
  const password = 'password';
  const noop = () => {};

  module('validation errors', function (hooks) {
    hooks.beforeEach(async function () {
      this.set('noop', noop);
      await render(hbs`<SignUpForm @signUp={{noop}} @onCancel={{noop}} />`);
    });

    test('it requires email', async function (assert) {
      await triggerEvent('[data-test-sign-up-form]', 'submit');

      assert.dom('[data-test-error-message]').hasText('Email is required');
    });

    test('it requires password', async function (assert) {
      await fillIn('[data-test-email-field]', email);
      await triggerEvent('[data-test-sign-up-form]', 'submit');
      assert.dom('[data-test-error-message]').hasText('Password is required');
    });

    test('it requires password confirmation to match', async function (assert) {
      await fillIn('[data-test-email-field]', email);
      await fillIn('[data-test-password-field]', password);
      await fillIn('[data-test-password-confirmation-field', 'not password');
      await triggerEvent('[data-test-sign-up-form]', 'submit');
      assert.dom('[data-test-error-message]').hasText('Passwords do not match');
    });
  });

  module('error signing up', function (hooks) {
    hooks.beforeEach(async function () {
      const handleSignUp = () => Promise.reject();

      this.set('handleSignUp', handleSignUp);
      this.set('noop', noop);
      await render(
        hbs`<SignUpForm @signUp={{handleSignUp}} @onCancel={{noop}}/>`,
      );

      await fillIn('[data-test-email-field]', email);
      await fillIn('[data-test-password-field]', password);
      await fillIn('[data-test-password-confirmation-field]', password);
      await triggerEvent('[data-test-sign-up-form]', 'submit');
    });

    test('it displays the server error', async function (assert) {
      assert
        .dom('[data-test-error-message]')
        .hasText('An error occurred while signing up.');
    });
  });

  module('sign up success', function (hooks) {
    let handleSignUp;

    hooks.beforeEach(async function () {
      handleSignUp = sinon.stub().resolves();

      this.set('noop', noop);
      this.set('handleSignUp', handleSignUp);
      await render(
        hbs`<SignUpForm @signUp={{handleSignUp}} @onCancel={{noop}} />`,
      );

      await fillIn('[data-test-email-field]', email);
      await fillIn('[data-test-password-field]', password);
      await fillIn('[data-test-password-confirmation-field]', password);
      await triggerEvent('[data-test-sign-up-form]', 'submit');
    });

    test('it passes the credentials to signUp', async function (assert) {
      assert.deepEqual(
        handleSignUp.getCall(0).args,
        [{ email, password }],
        'handleSignup called with credentials',
      );
    });

    test('it does not display an error message', async function (assert) {
      assert.dom('[data-test-error-message]').hasText('');
    });
  });
});
