/*globals Proton, _*/

module('Nav', {
  beforeEach: function () {
    this.el = document.querySelector('.gallery-nav')

    this.slider = Proton(this.el, {
      btnPrev: '.gallery-btn-prev',
      btnNext: '.gallery-btn-next'
    })

    this.btnPrev = document.querySelector('.gallery-btn-prev')
    this.btnNext = document.querySelector('.gallery-btn-next')
  }
})

test('Next', function (assert) {

  this.slider.next()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[1].el)

  this.slider.next()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[2].el)

  this.slider.next()
  this.slider.next()
  this.slider.next()

  assert.strictEqual(this.slider.selectedCell.el,this.slider.cells[5].el)

  this.slider.next() // Return to the first cell.

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[0].el)
})

test('Next Btn', function (assert) {

  this.btnNext.click()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[1].el)

  this.btnNext.click()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[2].el)

  this.btnNext.click()
  this.btnNext.click()
  this.btnNext.click()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[5].el)

  this.btnNext.click() // Return to the first cell.

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[0].el)
})

test('Prev', function (assert) {

  // Since the first cell is selected, then prev should select the last cell.
  this.slider.prev()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[5].el)

  this.slider.prev()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[4].el)

  this.slider.prev()
  this.slider.prev()
  this.slider.prev()
  this.slider.prev()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[0].el)
})

test('Click', function (assert) {

  // Since the first cell is selected, then prev should select the last cell.

  this.slider._btnPrev.click()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[5].el)

  this.slider._btnPrev.click()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[4].el)

  this.slider._btnPrev.click()
  this.slider._btnPrev.click()
  this.slider._btnPrev.click()
  this.slider._btnPrev.click()

  assert.strictEqual(this.slider.selectedCell.el, this.slider.cells[0].el)
})