/*globals Proton, _*/

module('Init and Destroy', {
  beforeEach: function () {
    this.el = document.querySelector('.gallery-init')
    this.slider = new Proton('.gallery-init')
  }
})

test('Container', function (assert) {
  assert.strictEqual(this.el, this.slider.container)
  assert.hasClasses(this.slider.container, 'proton-container')
})

test('Viewport', function (assert) {
  var viewport = this.slider.viewport
  assert.strictEqual(viewport.parentNode, this.slider.container)
  assert.hasClasses(viewport, 'proton-viewport')
})

test('Cells', function (assert) {
  var cells = this.slider.viewport.children

  _.each(cells, function (el, index) {
    assert.hasClasses(el, 'proton-cell')

    if (index === 0) {
      assert.hasClasses(el, 'proton-is-selected', 'first cell is selected')
    } else {
      assert.lacksClasses(el, 'proton-is-selected')
    }

    assert.strictEqual(el.parentNode, this.slider.viewport)
  }, this)

})

test('Destroy', function (assert) {
  var slider = this.slider
  var container = slider.container
  var cells = slider.viewport.children

  slider.destroy()

  assert.lacksClasses(container, 'proton-container')
  assert.notOk(container.querySelector('.proton-viewport'), 'viewport removed')

  _.each(cells, function (el) {
    assert.strictEqual(el.parentNode, container)
    assert.lacksClasses(el, 'proton-cell proton-is-selected')
  })
})