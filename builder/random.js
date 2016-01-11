const random = require('../lib/random')
const render = require('../lib/render')
const templatesData = require('../data/templates')
const wordsData = require('../data/words')

/**
 * 从数组中随机取几个元素
 * @param  {Array}   array          原始的数据源
 * @param  {Int}     limit          需要几个随机的元素
 * @param  {String}  cTempData      当前已有的汉字组成的字符串，新生成的数组不会有重复的汉字
 * @return {Array}   生成的新随机数组
 */
function randomTempData(array, limit, cTempData) {
  const resultArray = []
  while (resultArray.length !== limit) {
    // 随机生成汉字词组，如果随机结果和已有数据重复，则弃用本次生成结果
    var r = random.getRandomItem(array)
    var sameWords = Object.keys(cTempData)
      .reduce((pv, cv) => {
        return pv.concat(cTempData[cv].join('').split(''))
      }, [])
      .concat(resultArray.join('').split(''))
      .filter((cWord) => {
        var same = false
        r.split('').forEach((w) => {
          if (w == cWord) {
            same = true
          }
        })
        return same
      })
    if (sameWords.length === 0) {
      resultArray.push(r)
    }
  }

  return resultArray
}


function buildTemplate(template) {
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

  const aDataWords = wordsData.A
  const bDataWords = random.getRandomItem(wordsData.B)

  const templateData = Object.keys(templateCount).reduce((pv, cv) => {
    const type = cv.split('')[0]
    const length = cv.split('')[1]
    const pz = cv.split('')[2]
    const count = templateCount[cv]
    switch (type) {
      case 'A':
        const aWords = aDataWords[length][pz]
        const aData = randomTempData(aWords, count, pv)
        pv[cv] = aData
        break
      case 'B':
        const randomB = bDataWords[length][pz]
        const bData = randomTempData(randomB, count, pv)
        pv[cv] = bData
        break
      default:
        break
    }
    return pv
  }, {})

  return render(template, templateData)
}

function build(count) {
  const result = Array(count).fill(0).map((i) => {
    const t = random.getRandomItem(templatesData)
    return buildTemplate(t)
  })

  return result
}
module.exports.build = build

console.log(build(1)[0])
