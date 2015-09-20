/**
 * Module dependencies.
 */

var bind = require('lodash/function/bind')
var findIndex = require('lodash/array/findIndex')

/**
 * Expose `Cell`.
 */

module.exports = Cell

/**
 * Create a new `Cell`.
 *
 * @constructor
 * @param {HTMLElement} cell
 * @param {Proton} parent
 */

function Cell (el, parent) {
  if (!(this instanceof Cell)) return new Cell(el, parent)

  this.el = el
  this.parent = parent
  this.selected = false

  el.classList.add('proton-cell')

  parent.on('destroy', bind(this.destroy, this))
}

/**
 * Alias for `Cell.prototype`.
 */

Cell.fn = Cell.prototype

/**
 * Destroy the cell.
 */

Cell.fn.destroy = function () {
  this.unselect()
  this.el.classList.remove('proton-cell')
}

/**
 * Select the cell.
 */

Cell.fn.select = function () {
  this.selected = true
  this.el.classList.add('proton-is-selected')
  return this
}

/**
 * Deselect the cell.
 */

Cell.fn.unselect = function () {
  this.selected = false
  this.el.classList.remove('proton-is-selected')
  return this
}

/**
 * Append the cell's element to another element.
 *
 * @method
 * @param {HTMLElement} el
 */

Cell.fn.appendTo = function (el) {
  el.appendChild(this.el)
  return this
}

/**
 * Return the Cell's index in the DOM.
 *
 * @method
 * @return {Integer} index
 */

Cell.fn.getIndex = function () {
  return findIndex(this.el.parentNode.children, function (child) {
    return child === this.el
  }, this)
}

/**
 * Return the offset in percentage.
 *
 * @method
 * @return {Number} offset
 */

Cell.fn.getOffset = function () {
  var containerWidth = this.el.parentNode.clientWidth
  var offset = this.el.offsetLeft
  return (offset / containerWidth) * 100
}

/**
 * Return the cell's width in percentage.
 *
 * @method
 * @return {Number} width
 */

Cell.fn.getWidth = function () {
  var containerWidth = this.el.parentNode.clientWidth
  var width = this.el.clientWidth
  return (width / containerWidth) * 100
}
