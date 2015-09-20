/*globals Proton, _*/

// Utility for creating cells
function createCell (text) {
  var el = document.createElement('div')
  var span = document.createElement('span')

  el.className = 'cell'
  span.innerHTML = text

  el.appendChild(span)

  return el
}

module('Cell Class', {
  beforeEach: function () {
    this.Cell = Proton.Cell
    this.slider = new Proton('.gallery-init')
    this.el = document.createElement('div')
    this.cell = new this.Cell(this.el, this.slider)
  }
})

test('Init', function (assert) {
  assert.hasClasses(this.el, 'proton-cell')
  assert.strictEqual(this.el, this.cell.el)
  assert.strictEqual(this.slider, this.cell.parent)
  assert.notOk(this.cell.selected)
})

test('Select and Unselect', function (assert) {
  this.cell.select()

  assert.hasClasses(this.el, 'proton-is-selected')
  assert.ok(this.cell.selected)

  this.cell.unselect()

  assert.lacksClasses(this.el, 'proton-is-selected')
  assert.notOk(this.cell.selected)
})

test('Append To', function (assert) {
  var parent = document.createElement('div')

  this.cell.appendTo(parent)

  assert.strictEqual(this.cell.el, parent.children[0])
  assert.strictEqual(this.cell.el.parentNode, parent)
})

test('Destroy', function (assert) {
  this.cell.destroy()

  assert.notOk(this.cell.selected)
  assert.lacksClasses(this.el, 'proton-cell proton-is-selected')
})



module('Cells manipulation', {
  beforeEach: function () {
    this.el = document.querySelector('.gallery-init')
    this.slider = new Proton(this.el)
  }
})

test('Get cells element', function (assert) {
  var elements = _.toArray(this.slider.viewport.children)
  assert.deepEqual(this.slider.getCells(), elements)
})

test('Index', function (assert) {
  _.each(this.slider.cells, function (cell, index) {
    assert.strictEqual(cell.getIndex(), index)
  })
})

test('Offset', function (assert) {
  var cells = this.slider.getCells()
  var parentWidth = this.slider.viewport.clientWidth
  var offset1 = (cells[0].offsetLeft / parentWidth) * 100
  var offset2 = (cells[1].offsetLeft / parentWidth) * 100
  var offset3 = (cells[2].offsetLeft / parentWidth) * 100

  assert.strictEqual(this.slider.cells[0].getOffset(), offset1)
  assert.strictEqual(this.slider.cells[1].getOffset(), offset2)
  assert.strictEqual(this.slider.cells[2].getOffset(), offset3)
})

test('Insert', function (assert) {
  var viewport = this.slider.viewport
  var cell4 = createCell('4')
  var cell5 = createCell('5')
  var cell6 = createCell('6')

  // Insert at last position
  this.slider.insert(cell4)

  assert.strictEqual(this.slider.cells.length, 4, 'cell added')
  assert.strictEqual(this.slider.getCells()[3], cell4)
  assert.strictEqual(viewport.children[3], cell4)
  assert.strictEqual(this.slider.cells[3].getIndex(), 3)

  // Insert at first position
  this.slider.insert(cell5, 0)

  assert.strictEqual(this.slider.cells.length, 5, 'cell added')
  assert.strictEqual(this.slider.getCells()[0], cell5)
  assert.strictEqual(viewport.children[0], cell5)

  // Insert at third position
  this.slider.insert(cell6, 2)

  assert.strictEqual(this.slider.cells.length, 6, 'cell added')
  assert.strictEqual(this.slider.getCells()[2], cell6)
  assert.strictEqual(viewport.children[2], cell6)
})

test('Remove', function (assert) {
  var firstCell = this.slider.cells[0].el
  var secondCell = this.slider.cells[1]

  this.slider.remove(0)

  var condition = _.some(this.slider.viewport.children, function (el) {
    return el === firstCell
  })

  assert.strictEqual(this.slider.cells.length, 2, 'cell removed')
  assert.notOk(condition, 'cell removed')

  // Since we removed the first cell, then the secondCell should have
  // an index equals to 0.
  assert.strictEqual(secondCell.getIndex(), 0)
})