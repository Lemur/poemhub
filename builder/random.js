require('../lib/random')
const templatesData = require('../data/templates')
const templatesBuilder = require('./template')

function render(count) {
  const result = Array(count).fill(0).map((i) => {
    const t = templatesData.randomItem()
    return templatesBuilder.render(t)
  })

  return result
}
module.exports.render = render

// console.log(render(2))
