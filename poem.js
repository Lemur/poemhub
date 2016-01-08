const templatesData = require('./data/templates')
const wordsData = require('./data/words')

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
    switch (type) {
      case 'A':
        const aWords = wordsData[type][length]
        const aData = random(aWords[pz], count)
        pv[cv] = aData
        break
      case 'B':
        const bWords = wordsData[type]
        console.log(bWords);
        const randomB = random(bWords, 1)[0][length]
        const bData = random(randomB[pz], count)
        pv[cv] = bData
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
  const temp = options.template || random(templatesData, 1)[0]
  console.log(temp)

  // 有生日，进入生日模式
  if (options.birthday) {

  }
  const result = render(temp)
  return result
}
module.exports = poem


// 测试
templatesData.forEach((t) => {
  const r = poem({
    templateType: 1,
  })
  console.log(r)
})
