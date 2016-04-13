'use strict'

const rand = require('./random')
const render = require('./render').render


function poem(birthday, cb) {
  rand.getRandomLexTemplate(birthday, (lextemplate) => {
    const yunjiao = rand.getRandomYunJiao(birthday)
    const pingzeyun = rand.getRandomPingZeTemplate(birthday)
    render({
      yunjiao: yunjiao,
      pattern: lextemplate,
      pingzeyun: pingzeyun,
    }, birthday, (result) => {
      cb(result)
    })
  })
}

poem(2333, (poem) => {
  console.log(poem)
})
