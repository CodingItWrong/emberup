# emberup

Ember project creator with my default addons:

- [Buffered Proxy][ember-buffered-proxy]
- [Decorators][ember-decorators]
- [Mirage][ember-cli-mirage]
- [Mocha][ember-cli-mocha] + [Chai][ember-cli-chai] + [Sinon][ember-sinon], including [sinon-chai][sinon-chai] matchers
- [Simple Auth][ember-simple-auth]

As well as the following NPM packages:

- [babel-eslint][babel-eslint]
- [eslint-config-codingitwrong][eslint-config-codingitwrong]

## Requirements

- Yarn
- Ember-CLI

## Installation

Clone the repo and add `emberup/bin` to your path.

## Usage

```bash
emberup myprojectname
```

## Manual Steps

The following steps must done manually after running `emberup`; they have not yet been scripted.

As described in [the ember-mocha readme](https://github.com/emberjs/ember-mocha#setting-the-application), replace the contents of `tests/test-helper.js` with the following:

```js
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';

setApplication(Application.create(config.APP));
```

Add the following lines to `.eslintrc.js`:

```diff
   root: true,
+  parser: 'babel-eslint',
   parserOptions: {
     ecmaVersion: 2017,
...
   },
   rules: {
+    "array-callback-return": "off",
+    "camelcase": "off",
+    "class-methods-use-this": "off",
+    "func-names": "off",
+    "import/extensions": "off",
+    "import/no-extraneous-dependencies": "off",
+    "import/no-unresolved": "off",
+    "no-else-return": "off",
+    "no-restricted-syntax": "off",
+    "no-underscore-dangle": "off",
+    "no-unused-expressions": "off",
+    "prefer-arrow-callback": "off",
+    "prefer-const": "off",
+    "space-before-function-paren": "off",
+    "spaced-comment": "off",
   },
   overrides: [
```

## License

MIT

[babel-eslint]: https://github.com/babel/babel-eslint#babel-eslint---
[ember-buffered-proxy]: https://github.com/yapplabs/ember-buffered-proxy#ember-buffered-proxy-
[ember-cli-chai]: https://github.com/ember-cli/ember-cli-chai#ember-cli-chai
[ember-cli-mirage]: https://ember-cli-mirage.com
[ember-cli-mocha]: https://github.com/ember-cli/ember-cli-mocha
[ember-decorators]: https://ember-decorators.github.io/ember-decorators/docs/index.html
[ember-simple-auth]: http://ember-simple-auth.com/
[ember-sinon]: https://github.com/csantero/ember-sinon#ember-sinon
[eslint-config-airbnb-base]: https://www.npmjs.com/package/eslint-config-airbnb-base
[sinon-chai]: https://github.com/domenic/sinon-chai#sinonjs-assertions-for-chai
