'use strict'
const rand = require('../lib2/random')
const fetch = require('./fetch')

function render(templates, birthday, cb) {
  const breaks = []
  const yunjiao = templates.yunjiao
  const pattern = templates.pattern.split(' ')
  const result = []
  const pzy = templates.pingzeyun
  let sentence = 0
  let index = 0
  for (sentence in pattern) {
    birthday += 10
    let loc = 0
    let words = pattern[sentence].split('/')
    let word = ''
    for (word of words) {
      if (!word) {
        continue
      }
      const zishu = parseInt(word.charAt(word.length - 1))
      const cixing = word.substring(0, word.length - 1)
      const pingze = pzy[sentence].substring(loc, loc + zishu)
      let pz = ''
      if (pingze.charAt(pingze.length - 1) === '+') {
        pz = '2'
      } else {
        pz = '1'
      }
      let yayun = (pzy[sentence].charAt(loc + zishu) === '_')
      let path = ''
      if (yayun) {
        yayun = 'B'
        path = 'data/word/' + yayun + '/' + pz + '/' + cixing + '/' + yunjiao + '/' + zishu
      } else {
        yayun = 'A'
        path = 'data/word/' + yayun + '/' + pz + '/' + cixing + '/' + zishu
      }
      loc += zishu
      rand.getRandomWord(path, birthday, pingze, index, (i, wrd) => {
        breaks[index] = ' '
        breaks[i] = wrd
        for (let j = 0; j < breaks.length - 1; ++j) {
          if (!breaks[j]) { return }
        }
        breaks.pop()
        for (let j = 1; j < breaks.length; ++j) {
          breaks[j] = breaks[j - 1] + breaks[j]
          if (breaks[j].length === pzy[2].length) {
            result.push(breaks[j])
            breaks[j] = ''
          }
        }
        cb(result)
      })
      index++
    }
  }
}

exports.render = render

/*
[ '+++--_', '--++-_', '+--++', '+++--_' ]
ue
a2/n2/a1/ v2/n3/ v1/n1/v1/n2/ a2/v1/n2/
*/
// render({
//   yunjiao: 'ao',
//   pattern: 'a2/n2/a1/ v2/n3/ v1/n1/v1/n2/ a2/v1/n2/',
//   pingzeyun: ['+++--_', '--++-_', '+--++', '+++--_'],
// }, 1919, () => {})
