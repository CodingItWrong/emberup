import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

const unauthenticatedRoutes = ['user.new'];

export default class ApplicationController extends Controller {
  @service router;
  @service session;

  get currentRouteIsUnauthenticated() {
    return unauthenticatedRoutes.includes(this.router.currentRouteName);
  }

  get routeRequiresAuthentication() {
    return !this.currentRouteIsUnauthenticated && !this.session.isAuthenticated;
  }

  @action
  async signOut() {
    this.session.invalidate();
    this.transitionToRoute('index');
  }
}
