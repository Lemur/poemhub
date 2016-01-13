var test = require('tape')
var poem = require('../dist/poem').default
var templates = require('../dist/data/templates').default

test('random builder', function(t) {
  templates.forEach(function(temp) {
    const p = poem({
      template: temp,
    })
    console.log(p)
  })
  t.end();
});
