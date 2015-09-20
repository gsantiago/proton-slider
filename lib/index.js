/**
 * Export Proton and its plugins.
 */

var Proton = require('./proton')
var navButtons = require('./nav-buttons')

Proton.plugins.push(navButtons)

module.exports = Proton
