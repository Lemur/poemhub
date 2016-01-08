const data = require('./data')

function random(array, limit) {
  const tArray = array
  tArray.sort(() => {
    return 0.5 - Math.random()
  });
  return tArray.slice(0, limit)
}

function render(template) {
  const placeholders = template.reduce((pv, cv) => {
    const words = cv.split('/')
    words.pop()
    return pv.concat(words)
  }, [])

  const templateCount = placeholders
    .reduce((pv, cv) => {
      const v = pv[cv] || 0
      pv[cv] = v + 1
      return pv
    }, {})

  const templateData = Object.keys(templateCount).reduce((pv, cv) => {
    const type = cv.split('')[0]
    const length = cv.split('')[1]
    const pz = cv.split('')[2]
    const count = templateCount[cv]
    const words = data.words[type][length]
    switch (type) {
      case 'A':
        pv[cv] = random(words[pz], count)
        break
      case 'B':
        const randomB = random(words, 1)[0]
        pv[cv] = random(randomB[pz], count)
        break
      default:
        break
    }
    return pv
  }, {})

  const result = template
    .reduce((pv, cv) => {
      const words = cv.split('/')
      const punctuation = words.pop()
      const r = words.map((placeholder) => {
        const w = templateData[placeholder].pop()
        return w
      })
      return pv + r.join('') + punctuation + '\n'
    }, '')

  return result
}

function poem(options) {
  const result = render(data.templates[0])
  return result
}
module.exports = poem

const r = poem({
  birthday: 19921030,
})

console.log(r)
