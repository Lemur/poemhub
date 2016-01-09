require('../lib/random')
const wordsData = require('../data/words')
const render = require('../lib/render')


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
    var r = array.randomItem()
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


function build(template) {
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
  const bDataWords = wordsData.B.randomItem()

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

module.exports.build = build


// const r = build(['A2+/A2-/A1+/，', 'A2-/A2+/B1-/。', 'A2-/A2+/A1+/，', 'A2+/A2-/B1-/。', ])
// console.log(r)
