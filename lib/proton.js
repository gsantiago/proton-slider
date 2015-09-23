/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter
var inherits = require('util').inherits
var extend = require('lodash/object/extend')
var uid = require('lodash/utility/uniqueId')
var each = require('lodash/collection/each')
var pluck = require('lodash/collection/pluck')
var pullAt = require('lodash/array/pullAt')
var invoke = require('lodash/collection/invoke')
var utils = require('./utils')
var Cell = require('./cell')

/**
 * Expose `Proton`.
 */

module.exports = Proton

/**
 * Create a new `Proton Slider`.
 *
 * @constructor
 * @emit ready
 * @param {HTMLElement or String} container
 * @param {Object} options
 */

function Proton (container, options) {
  if (!(this instanceof Proton)) return new Proton(container, options)

  container = utils.getElement(container)

  if (!container) {
    throw new Error('Container must be a valid element.')
  }

  container.classList.add('proton-container')

  this.container = container
  this.settings = extend({}, Proton.defaults, options)
  this.uid = uid()

  this._offset = 0
  this.selectedCell = null
  this.cells = []

  this._importCells()
  this._createViewport()

  if (this.cells) this.select(0)

  // Call external plugins.
  this._callPlugins()

  this.emit('ready')
}

/**
 * Inherits `EventEmitter`.
 */

inherits(Proton, Emitter)

/**
 * Alias for `Proton.prototype`.
 */

Proton.fn = Proton.prototype

/**
 * Proton's Version. Keep it sync with `package.json`.
 */

Proton.version = require('../package.json').version

/**
 * Plugins.
 */

Proton.plugins = []

/**
 * Add `Cell` as a Proton property for testing purposes.
 */

Proton.Cell = Cell

/**
 * Default options.
 */

Proton.defaults = {

  /**
   * Cell alignment.
   *
   * - `center`
   * - `left`
   * - `right`
   */

  align: 'left',

  /**
   * Nav buttons.
   */

  btnPrev: '',
  btnNext: ''

}

/**
 * Import the initial cells that already are in the HTML.
 *
 * @method
 * @api private
 */

Proton.fn._importCells = function () {
  each(this.container.children, function (el) {
    this.cells.push(new Cell(el, this))
  }, this)
}

/**
 * Create the viewport that should contain all cells.
 *
 * @method
 * @api private
 */

Proton.fn._createViewport = function () {
  this.viewport = document.createElement('div')
  this.viewport.className = 'proton-viewport proton-transition'
  this._appendCells()

  this.container.appendChild(this.viewport)
}

/**
 * Get the cell's element.
 *
 * @method
 * @returns {Array} cells
 */

Proton.fn.getCells = function () {
  return pluck(this.cells, 'el')
}

/**
 * Insert a new cell into the viewport.
 *
 * @method
 * @param {HTMLElement or String} el
 * @param {Integer} index
 */

Proton.fn.insert = function (el, index) {
  el = utils.getElement(el)

  if (index !== 0) {
    index = index || this.cells.length
  }

  var cell = new Cell(el, this)
  this.cells.splice(index, 0, cell)

  if (this.selectedCell) {
    var selectedCellIndex = this.selectedCell.getIndex()

    if (selectedCellIndex === index) {
      this.selectedCell.unselect()
      this.selectedCell = null
      this._appendCells()
      this.select(index)
    } else {
      this._appendCells()
    }
  } else {
    this.select(index)
    this._appendCells()
  }

  return this
}

/**
 * Remove a cell from viewport.
 *
 * @method
 * @param {Integer} index
 * @return {HTMLElement} el - removed cell's element
 */

Proton.fn.remove = function (index) {
  if (!this.cells.length) return

  var selectedCellIndex = this.selectedCell.getIndex()
  var target = pullAt(this.cells, index)

  this._appendCells()

  if (index === selectedCellIndex) {
    this.selectedCell = null
    this.select(index)
  }

  return target.el
}

/**
 * Append all the cell's elements.
 *
 * @method
 * @api private
 */

Proton.fn._appendCells = function () {
  this.viewport.innerHTML = ''
  invoke(this.cells, 'appendTo', this.viewport)
}

/**
 * Select a new cell.
 *
 * @method
 * @param {Integer} index
 * @emit beforeSelect
 * @emit afterSelect
 */

Proton.fn.select = function (index) {
  // Do nothing, if the slider is empty.
  if (!this.cells.length) return

  if (this.selectedCell) {
    if (this.selectedCell.getIndex() === index) return

    this.selectedCell.unselect()
  }

  var length = this.cells.length
  index = ((index % length) + length) % length

  var target = this.cells[index]
  target.select()
  this.selectedCell = target

  this._moveToCell(target)

  return this
}

/**
 * Move the viewport's offset according to the selected cell.
 *
 * @method
 * @param {Cell} cell
 * @api private
 */

Proton.fn._moveToCell = function (cell) {
  var offset = cell.getOffset()

  if (this.settings.align === 'center') {
    offset -= (100 - cell.getWidth()) / 2
  }

  if (this.settings.align === 'right') {
    offset -= (100 - cell.getWidth())
  }

  this._move(offset * -1)
}

/**
 * Move the viewport.
 *
 * @method
 * @param {Number} offset - value in percentage.
 * @api private
 */

Proton.fn._move = function (offset) {
  this._offset = offset
  this.viewport.style.transform = 'translateX(' + offset + '%' + ')'
}

/**
 * Select the next cell.
 *
 * @method
 */

Proton.fn.next = function () {
  this.select(this.selectedCell.getIndex() + 1)
}

/**
 * Select the previous cell.
 *
 * @method
 */

Proton.fn.prev = function () {
  this.select(this.selectedCell.getIndex() - 1)
}

/**
 * Clean all the changes made by Proton.
 *
 * @method
 * @emits destroy
 */

Proton.fn.destroy = function () {
  this.emit('destroy')

  this.container.classList.remove('proton-container')
  this.container.removeChild(this.viewport)

  each(this.getCells(), function (el) {
    this.container.appendChild(el)
  }, this)

  this.removeAllListeners()

  return this
}

/**
 * Call plugins.
 *
 * @method
 * @api private
 */

Proton.fn._callPlugins = function () {
  each(Proton.plugins, function (plugin) {
    plugin.call(this, Proton, utils)
  }, this)
}
