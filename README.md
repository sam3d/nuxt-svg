# @nuxtjs/svg

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

_Super simple svg loading module for Nuxt.js_

- [@nuxtjs/svg](#nuxtjssvg)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Usage](#usage)
    - [`file-loader`](#file-loader)
    - [`url-loader`](#url-loader)
    - [`vue-svg-loader`](#vue-svg-loader)
    - [`raw-loader`](#raw-loader)
  - [Caveats](#caveats)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This package is for loading SVG's into Nuxt.js pages. It allows you to import `.svg` files in multiple ways depending on the [resource query](https://webpack.js.org/configuration/module/#rule-resourcequery) you provide. Currently, this allows you to do the following:

- `file.svg` - normal import using `file-loader`
- `file.svg?data` - base64 data url import using `url-loader`
- `file.svg?inline` - inline import using `vue-svg-loader`
- `file.svg?raw` - raw html import using `raw-loader`
- `file.svg?sprite` - SVG sprite using `svg-sprite-loader`

## Installation

```shell
npm install --save-dev @nuxtjs/svg
```

```javascript
// nuxt.config.js
export default {
  buildModules: ["@nuxtjs/svg"],
};
```

And that's it! You don't have to install anything else, you're ready to go.

## Configuration

```javascript
// nuxt.config.js
export default {
  buildModules: [
    [
      "@nuxtjs/svg",
      {
        sprite: {
          svgSpriteLoader: {
            // svg-sprite-loader options
          },
          spriteLoaderPlugin: {
            // SpriteLoaderPlugin options
          }
        }
      },
    ],
  ],
};
```

## Usage

The usage examples are documented as:

```html
<!-- Nuxt.js code -->
```

```html
<!-- Outputted html -->
```

### `file-loader`

```html
<template>
  <img src="~assets/nuxt.svg" />
</template>
```

```html
<img src="/_nuxt/9405b9978eb50f73b53ac1326b93f211.svg" />
```

### `url-loader`

```html
<template>
  <img src="~assets/nuxt.svg?data" />
</template>
```

```html
<img src="data:image/svg+xml;base64,P...2h913j1g18h98hr" />
```

### `vue-svg-loader`

```html
<template>
  <NuxtLogo />
</template>

<script>
  import NuxtLogo from "~/assets/nuxt.svg?inline";

  export default {
    components: { NuxtLogo },
  };
</script>
```

```html
<svg xmlns="http://www.w3.org/2000/svg"><path></path></svg>
```

### `raw-loader`

Load the raw SVG data as HTML using `raw-loader`:

```html
<template>
  <div v-html="rawNuxtLogo" />
</template>

<script>
  import rawNuxtLogo from "~/assets/nuxt.svg?raw";

  export default {
    data() {
      return { rawNuxtLogo };
    },
  };
</script>
```

```html
<div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 298">
    <g fill-rule="nonzero" fill="none"><path></path></g>
  </svg>
</div>
```

### `vue-sprite-loader`

```html
<template>
    <svg :viewBox="spriteNuxtLogo.viewBox">
      <use :xlink:href="'#' + spriteNuxtLogo.id"></use>
    </svg>
</template>

<script>
  import spriteNuxtLogo from "~/assets/nuxt.svg?sprite";

  export default {
    data() {
      return { spriteNuxtLogo };
    },
  };
</script>
```

## Dynamic imports

To dynamically import an SVG, you can use the inline `require()` syntax.

```html
<template>
  <div v-html="require(`../assets/${name}.svg?raw`)" />
</template>

<script>
  export default {
    props: {
      name: { type: String, default: "image" },
    },
  };
</script>
```

> This example uses `raw-loader`.

## Caveats

In order for this module to work correctly, the [default `.svg` Nuxt.js webpack rule](https://nuxtjs.org/guide/assets/#webpack) gets replaced with this handler.

The only difference between this and the handler is that there is no `limit` for when `file-loader` replaces `url-loader`.

So when using the `?data` query, it will _always_ use `url-loader` regardless of file size, and when not using either resource query, it will always use `file-loader`).

## Contributing

As this loader attempts to abstract webpack configuration from the process and make it easier to use multiple svg loaders, any contributions that add more svg loader methods to the configuration will be accepted wholeheartedly!

Also I'll be actively maintaining this project so if you'd rather just make a request for a loader or a feature; I'd be happy to take a look and see what I can do myself :)

## License

[MIT License](./LICENSE)

Copyright (c) Sam Holmes

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/svg/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/@nuxtjs/svg
[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/svg.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/svg
[license-src]: https://img.shields.io/npm/l/@nuxtjs/svg.svg?style=flat-square
[license-href]: https://npmjs.com/package/@nuxtjs/svg
