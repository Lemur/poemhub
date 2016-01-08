const templatesData = require('./data/templates')
const wordsData = require('./data/words')

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
    var r = random(array)
    var sameWords = Object.keys(cTempData)
      .reduce((pv, cv) => {
        const tempWordsArray = cTempData[cv].join('').split('')
        const resultWordsArray = resultArray.join('').split('')
        const r = pv.concat(tempWordsArray).concat(resultWordsArray)
        return r
      }, [])
      .filter((word) => {
        return word === r
      })
    if (sameWords.length === 0) {
      resultArray.push(r)
    }
  }

  return resultArray
}

/**
 * 随机从数组中取出一个元素
 */
function random(array) {
  return array[Math.floor(Math.random() * (array.length))]
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
        const aWords = wordsData[type][length][pz]
        const addRandomWords = () => {
          const aData = randomTempData(aWords, count, pv)
          pv[cv] = aData
        }
        addRandomWords()
        break
      case 'B':
        const bWords = wordsData[type]
        const randomB = random(bWords)[length][pz]
        const bData = randomTempData(randomB, count, pv)
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
  const temp = options.template || random(templatesData)
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
