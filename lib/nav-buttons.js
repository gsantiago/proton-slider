/**
 * Module dependencies.
 */

var bind = require('lodash/function/bind')

/**
 * A simple Proton plugin for create nav buttons.
 * It doesn't create any extra markup. The user has to provide the selector or
 * element for each prev/next button.
 */

module.exports = function (Proton, utils) {
  /**
   * Create nav buttons.
   *
   * @method
   * @api private
   */

  Proton.fn._createNavButtons = function () {
    if (this.settings.btnPrev) {
      this._btnPrev = utils.getElement(this.settings.btnPrev)
      this._btnPrevHandler = bind(this.prev, this)
      this._btnPrev.addEventListener('click', this._btnPrevHandler, false)
    }

    if (this.settings.btnNext) {
      this._btnNext = utils.getElement(this.settings.btnNext)
      this._btnNextHandler = bind(this.next, this)
      this._btnNext.addEventListener('click', this._btnNextHandler, false)
    }
  }

  /**
   * Destroy nav buttons.
   *
   * @method
   * @api private
   */

  Proton.fn._destroyNavButtons = function () {
    if (this._btnNext) {
      this._btnNext.removeEventListener('click', this._btnNextHandler, false)
    }

    if (this._btnPrev) {
      this._btnPrev.removeEventListener('click', this._btnNextHandler, false)
    }
  }

  /**
   * Add event listeners.
   */

  this.on('ready', this._createNavButtons)
  this.on('destroy', this._destroyNavButtons)
}
