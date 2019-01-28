import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class ApplicationController extends Controller {
  @service session;

  @action
  async signOut() {
    this.session.invalidate();
    this.transitionToRoute('index');
  }
}
