import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignUpFormComponent extends Component {
  @service store;
  @service session;
  @service router;

  @tracked email;
  @tracked password;
  @tracked passwordConfirmation;
  @tracked errorMessage = null;

  @action
  async signUp(event) {
    event.preventDefault();

    if (!this.validate()) {
      return;
    }

    const { email, password } = this;

    const user = this.store.createRecord('user', { email, password });

    try {
      await user.save();
      this.store.unloadAll('user');
      await this.session.authenticate('authenticator:oauth', email, password);

      // TODO configure this with a prop
      this.router.transitionTo('index');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      this.errorMessage =
        e?.responseJSON?.error_description ??
        e?.message ??
        'An error occurred while signing up.';
    }
  }

  validate() {
    if (!this.email) {
      this.errorMessage = 'Email is required';
      return false;
    }

    if (!this.password) {
      this.errorMessage = 'Password is required';
      return false;
    }

    if (this.passwordConfirmation !== this.password) {
      this.errorMessage = 'Passwords do not match';
      return false;
    }

    return true;
  }
}
