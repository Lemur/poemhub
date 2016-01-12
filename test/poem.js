const test = require('tape')
const poem = require('../poem')

test('random builder', function(t) {
  const p1 = poem()
  console.log(p1)
  const p2 = poem({
    birthday: '19921030'
  })
  console.log(p2)
  t.notEqual(p1.length, 0, 'random poem not null');
  t.notEqual(p2.length, 0, 'birthday poem not null');
  t.end();
});
