# Quasar notify

Helps for building of centralized notification system using the native quasar Notify plugin. Motto: Config once use everywhere.

## Install

##### Via npm

```bash
$ npm i -S @la40/quasar-notify
```

##### Via yarn

```bash
$ yarn add @la40/quasar-notify
```

## Use

##### Activate "Notify" plugin in quasar.config.js

```javascript
framework: {
  config: {
    ...
    // you can even set here some default
    // options but pay attention the package will
    // rewrite: progress, type, icon and actions
    notify: {
      position: "top",
    },
  },
  ...
  plugins: ["Notify"],
},
```

##### Then config it in boot file and use it everywhere

```javascript
// boot/notify.js
import { boot } from "quasar/wrappers";
import quasarNotify from "@la40/quasar-notify";
const notify = quasarNotify();

export default boot(async ({ app }) => {
  app.config.globalProperties.$notify = notify;
});

export { notify };

// Layout.vue
this.$api
  .post("url", data)
  .then(() => {
    this.$notify.positive("Positive message!");
  })
  .catch((err) => {
    this.$notify.negative("Negative message!");
    //or
    this.$notify.error(err);
  });

// js file outside quasar app
import { notify } from "../boot/notify";
notify.positive("Positive message!");
```

## 4 notification types

- positive(message)
- warning(message)
- negative(message)
- error(error) - Will extract the message from axios error.response.data.message or error.response.statusText or error.message if js native error when process.env.DEV = true. Otherwise in production the message will be "Server error!". You can rewrite it via error.messageInProduction. See example below.

## You can also completely rewrite the default configuration for each notification type

You can set every QuasarConfOption you wish. See https://quasar.dev/quasar-plugins/notify#introduction

```javascript
// boot/notify.js
import { boot } from "quasar/wrappers";
import quasarNotify from "@la40/quasar-notify";
const notify = quasarNotify({
  positive: {
    position: "top-left",
  },
  warning: {
    position: "top-tight",
  },
  negative: {
    position: "bottom-right",
  },
  error: {
    position: "bottom-left",
    messageInProduction: "Some other server error message!",
  },
});

export default boot(async ({ app }) => {
  app.config.globalProperties.$notify = notify;
});

export { notify };
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Security

If you discover any security related issues, please email lachezar@grigorov.website instead of using the issue tracker.

## Credits

- [Lachezar Grigorov](http://grigorov.website)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
