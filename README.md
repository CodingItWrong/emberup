# emberup

Ember project creator with my default addons:

- [Build Notifications][ember-cli-build-notifications]
- [Mirage][ember-cli-mirage]
- [Sinon][ember-sinon-qunit]
- [Simple Auth][ember-simple-auth] preconfigured for OAuth2 password grant
- [Test Selectors][ember-test-selectors]

As well as the following:

- [Dependabot][dependabot] configuration for dependency updates
- [GitHub Actions][github-actions] configuration for CI, instead of Travis
- [Prettier][prettier] code formatter

## Requirements

- Yarn
- Ember CLI

## Installation

Clone the repo and add `emberup/bin` to your path.

## Usage

```bash
emberup myprojectname
```

## Manual Steps

The following steps must done manually after running `emberup`; they have not yet been scripted.

In `config/environment.js`, add the following:

```diff
   if (environment === 'development') {
     // ENV.APP.LOG_RESOLVER = true;
     // ENV.APP.LOG_ACTIVE_GENERATION = true;
     // ENV.APP.LOG_TRANSITIONS = true;
     // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     // ENV.APP.LOG_VIEW_LOOKUPS = true;
+    ENV['ember-cli-mirage'] = { enabled: false };
+    ENV.apiHost = 'http://url.of.your.local.api';
   }
```

And:

```diff
   if (environment === 'production') {
     // here you can enable a production-specific feature
+    ENV.apiHost = 'https://url.of.your.production.api';
   }
```

## License

Apache-2.0

[dependabot]: https://dependabot.com/
[ember-cli-build-notifications]: https://github.com/pdud/ember-cli-build-notifications#readme
[ember-cli-mirage]: https://ember-cli-mirage.com
[ember-simple-auth]: http://ember-simple-auth.com/
[ember-sinon-qunit]: https://github.com/elwayman02/ember-sinon-qunit
[ember-test-selectors]: https://github.com/simplabs/ember-test-selectors
[github-actions]: https://github.com/features/actions
[prettier]: https://prettier.io/
