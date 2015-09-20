/**
 * Module dependencies.
 */

var isElement = require('lodash/lang/isElement')

/**
 * Get an element.
 *
 * @param {String | HTMLElement} query
 * @return {HTMLElement}
 */

exports.getElement = function (query) {
  if (isElement(query)) return query

  return document.querySelector(query)
}
