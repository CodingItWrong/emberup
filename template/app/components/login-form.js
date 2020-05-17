import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @service session;
  @service router;

  email = '';
  password = '';

  @tracked
  errorMessage = '';

  @action
  async logIn(event) {
    event.preventDefault();

    let { email, password } = this;

    try {
      await this.session.authenticate('authenticator:oauth', email, password);

      // TODO configure this with a prop
      this.router.transitionTo('index');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      this.errorMessage =
        e?.responseJSON?.error_description ??
        e?.message ??
        'An error occurred while logging in.';
    }
  }
}
