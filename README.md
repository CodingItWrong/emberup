# emberup

Ember project creator with my default addons:

- [Mirage](https://ember-cli-mirage.com)
- [Sinon](https://github.com/elwayman02/ember-sinon-qunit)
- [Simple Auth](http://ember-simple-auth.com/) preconfigured for OAuth2 password grant
- [Test Selectors](https://github.com/simplabs/ember-test-selectors)

As well as the following:

- Sign In and Sign Up forms
- [Dependabot](https://dependabot.com/) configuration for dependency updates
- [GitHub Actions](https://github.com/features/actions) configuration for CI, instead of Travis
- [Prettier](https://prettier.io/) code formatter
- [Husky](https://github.com/typicode/husky) and [Lint-Staged](https://github.com/okonet/lint-staged) for linting staged files upon commit

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

In `package.json` add:

```diff
   "ember": {
     "edition": "octane"
+  },
+  "husky": {
+    "hooks": {
+      "pre-commit": "lint-staged"
+    }
+  },
+  "lint-staged": {
+    "*.js": "eslint",
+    "*.hbs": "ember-template-lint"
   }
 }
```

## License

Apache-2.0
