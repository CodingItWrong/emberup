import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class SignInFormComponent extends Component {
  @service session;
  @service router;

  email = '';
  password = '';

  @tracked
  errorMessage = '';

  @action
  async signIn(event) {
    event.preventDefault();

    let { email, password } = this;

    try {
      await this.session.authenticate('authenticator:oauth', email, password);

      this.args.onSignedIn();
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
