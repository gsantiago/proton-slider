/*globals Proton, _*/

module('Select Cells', {
  beforeEach: function () {
    this.el = document.querySelector('.gallery-init')
    this.slider = new Proton(this.el)
  }
})

test('Select', function (assert) {
  var slider = this.slider

  assert.strictEqual(slider.selectedCell, slider.cells[0], 'first cell selected')
  assert.ok(slider.cells[0].selected)
  assert.strictEqual(slider._offset, 0)

  slider.select(1)

  assert.strictEqual(slider.selectedCell, slider.cells[1], 'second cell selected')
  assert.ok(slider.cells[1].selected)
  assert.strictEqual(slider._offset, -100)

  slider.select(2)

  assert.strictEqual(slider.selectedCell, slider.cells[2], 'third cell selected')
  assert.ok(slider.cells[2].selected)
  assert.strictEqual(slider._offset, -200)

  slider.select(3) // Select the first cell, since the `3` index doesn't exist.

  assert.strictEqual(slider.selectedCell, slider.cells[0], 'first cell selected')
  assert.ok(slider.cells[0].selected)
  assert.strictEqual(slider._offset, 0)

})
