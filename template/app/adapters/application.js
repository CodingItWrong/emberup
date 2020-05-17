import JSONAPIAdapter from '@ember-data/adapter/json-api';
// eslint-disable-next-line ember/no-mixins
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';
import ENV from '../config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(
  DataAdapterMixin,
) {
  host = ENV.apiHost;

  @computed('session.{isAuthenticated,data.authenticated.access_token}')
  get headers() {
    let headers = {};

    if (this.session.isAuthenticated) {
      const authHeader = `Bearer ${this.session.data.authenticated.access_token}`;
      headers['Authorization'] = authHeader;
    }

    return headers;
  }
}
