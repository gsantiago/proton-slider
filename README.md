# Proton Slider

[![Build Status](https://travis-ci.org/gsantiago/proton-slider.svg?branch=master)](https://travis-ci.org/gsantiago/proton-slider)
[![Code Climate](https://codeclimate.com/github/gsantiago/proton-slider/badges/gpa.svg)](https://codeclimate.com/github/gsantiago/proton-slider)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

_Minimalist, vanilla, lightweight and responsive slider plugin_

___

Proton Slider is a free slider plugin for JavaScript.
It doesn't depend on jQuery or any external library.
You just need a modern browser to run it.

For examples and docs, check out its [official website](#).


## Installation

TODO

## Usage

Include the ```proton.css``` and ```proton.min.js``` in your page.

Create a simple markup like the following (the CSS classes doesn't matter):

```html
<div class="my-slider">
  <div class="my-cell">...</div>
  <div class="my-cell">...</div>
  <div class="my-cell">...</div>
</div>
```

Then, just create a new Proton instance:

```javascript
var slider = new Proton('.my-slider', {
  /* options */
})
```

## Options

List of available options:


## Tests

Install Gulp globally:

```npm install gulp -g```

Then, install all Proton's dependencies:

```npm install```

After that, just run ```npm test``` or ```gulp test```.

If you want to test in another browser than PhantomJS,
just open the file ```proton/test/index.html``` in your chosen browser.


## Contribute

TODO


## Changelog

TODO


