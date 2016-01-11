/**
 * 根据生日（AAAABBCC）生成古诗
 *
 * 模板选择的原则：
 *
 * 数据源生成原则：
 */

const random = require('../lib/random')
const render = require('../lib/render')
const wordsData = require('../data/words')
const templateLib = require('../lib/template')

function getTemplate(birthday) {
  const templatesData = require('../data/templates')
  return templatesData[0]
}


/**
 * 随机生成 TemplateData 数据源
 * @param  {Array}   array          原始的数据源数组
 * @param  {Int}     limit          需要几个随机的元素
 * @param  {String}  cTempData      当前已有的汉字组成的字符串，新生成的数组不会有重复的汉字
 * @return {Array}   生成的新随机数组
 */
function buildTemplateArray(birthday, words, count) {
  const year = birthday.substr(0, 4)
  const month = birthday.substr(4, 2)
  const day = birthday.substr(6, 2)
  const resultArray = []
  while (resultArray.length !== count) {
    var r = words.pop()
    resultArray.push(r)
  }
  return resultArray
}


function buildTemplate(birthday, template) {
  const year = birthday.substr(0, 4)
  const month = birthday.substr(4, 2)
  const day = birthday.substr(6, 2)
  const templateCount = templateLib.count(template)

  const aDataWords = wordsData.A
  const bDataWords = wordsData.B[0] // TODO: USE BIRTHDAY

  const templateData = Object.keys(templateCount).reduce((pv, cv) => {
    const type = cv.split('')[0]
    const length = cv.split('')[1]
    const pz = cv.split('')[2]
    const count = templateCount[cv]
    var words = []
    switch (type) {
      case 'A':
        words = aDataWords[length][pz]
        break
      case 'B':
        words = bDataWords[length][pz]
        break
      default:
        break
    }
    const data = buildTemplateArray(birthday, words, count)
    pv[cv] = data
    return pv
  }, {})

  return render(template, templateData)
}

function build(birthday) {
  const t = getTemplate(birthday)
  console.log(t)
  return buildTemplate(birthday, t)
}
module.exports.build = build

console.log(build('19921030'))
