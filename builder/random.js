const random = require('../lib/random')
const templatesData = require('../data/templates')
const templatesBuilder = require('./template')

function build(count) {
  const result = Array(count).fill(0).map((i) => {
    const t = random.getRandomItem(templatesData)
    return templatesBuilder.build(t)
  })

  return result
}
module.exports.build = build

// console.log(build(2))
