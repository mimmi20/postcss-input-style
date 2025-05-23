# PostCSS Input Style

[![NPM version][npm-badge]][npm-url] [![Downloads][downloads-badge]][npm-url] [![Build Status][travis-badge]][travis-url]

[PostCSS][PostCSS] plugin that adds new pseudo elements to inputs for easy cross-browser styling of their inner elements. Currently the only input supported is Range, more will be added as more vendor-specific pseudo selectors are made available.

_Part of [Rucksack - CSS Superpowers](http://simplaio.github.io/rucksack)_

## Input

```css
input[type="range"]::track {
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::thumb {
  background: #4286be;
  width: 16px;
  height: 8px;
}
```

## Output

```css
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::-moz-range-track  {
  -moz-appearance: none;
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::-ms-track  {
  background: #9d9d9d;
  height: 3px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #4286be;
  width: 16px;
  height: 8px;
}

input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  background: #4286be;
  width: 16px;
  height: 8px;
}

input[type="range"]::-ms-thumb {
  background: #4286be;
  width: 16px;
  height: 8px;
}

input[type="range"] {
  -webkit-appearance: none;
}

input[type=range]::-moz-focus-outer {
    border: 0;
}
```

Notes on output:

- Selectors are not grouped because if a browser finds a single selector it doesn't understand in a group, the whole group is ignored (see [Selectors Level 3][selectors])

- `-[vendor]-appearance: none;` is added so your custom styles apply. On Chrome and Safari this means you must style _both_ `::track` and `::thumb`, since the appearance must be set on the root element as well

- The additional `::-moz-focus-outer` rule removes the inconsistent dotted focus outline on firefox.

## Usage

```js
postcss([ require('postcss-input-style') ])
```

See [PostCSS][PostCSS] docs for examples for your environment.

***

MIT © [Sean King](https://twitter.com/seaneking)

[npm-badge]: https://badge.fury.io/js/postcss-input-style.svg
[npm-url]: https://npmjs.org/package/postcss-input-style
[downloads-badge]: https://img.shields.io/npm/dm/postcss-input-style.svg
[travis-badge]: https://travis-ci.org/seaneking/postcss-input-style.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/postcss-input-style
[PostCSS]: https://github.com/postcss/postcss
[selectors]: http://www.w3.org/TR/selectors/#Conformance
