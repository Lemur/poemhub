require('../lib/random')
const templatesData = require('../data/templates')
const templatesBuilder = require('./template')

function build(count) {
  const result = Array(count).fill(0).map((i) => {
    const t = templatesData.randomItem()
    return templatesBuilder.build(t)
  })

  return result
}
module.exports.build = build

// console.log(render(2))
