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
      var elPrev = this.settings.btnPrev
      this._makeButton(elPrev, '_btnPrev', '_btnPrevHandler', 'prev')
    }

    if (this.settings.btnNext) {
      var elNext = this.settings.btnNext
      this._makeButton(elNext, '_btnNext', '_btnNextHandler', 'next')
    }
  }

  /**
   * Make a nav button.
   *
   * @method
   * @api private
   */

  Proton.fn._makeButton = function (el, btn, handler, method) {
    this[btn] = utils.getElement(el)
    this[handler] = bind(this[method], this)
    this[btn].addEventListener('click', this[handler], false)
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
