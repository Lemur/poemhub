/**
 * 根据生日（AAAABBCC）生成古诗
 */

const random = require('../lib/random')
const render = require('../lib/render')
const wordsData = require('../data/words')
const templateLib = require('../lib/template')
const templatesData = require('../data/templates')

var BirthdayBuilder = function(birthday) {
  this.year = parseInt(birthday.substr(0, 4), 10)
  this.month = parseInt(birthday.substr(4, 2))
  this.day = parseInt(birthday.substr(6, 2))
}

BirthdayBuilder.prototype._getTemplate = function() {
  const i = (this.year + this.month) % templatesData.length
  return templatesData[i]
}

BirthdayBuilder.prototype._buildTemplateArray = function(words, count) {
  const resultArray = []
  var i = (this.year + this.month + this.day) % words.length
  while (resultArray.length !== count) {
    var r = words[i]
    i = (i + 1) % words.length
    resultArray.push(r)
  }
  return resultArray
}

BirthdayBuilder.prototype._buildTemplate = function(template) {
  const self = this
  const templateCount = templateLib.count(template)
  const aDataWords = wordsData.A
  const bDataWords = wordsData.B[this.day % wordsData.B.length]
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
    const data = self._buildTemplateArray(words, count)
    pv[cv] = data
    return pv
  }, {})

  return render(template, templateData)
}

BirthdayBuilder.prototype.build = function() {
  const t = this._getTemplate()
  return this._buildTemplate(t)
}

function build(birthday) {
  const bb = new BirthdayBuilder(birthday)
  return bb.build()
}
module.exports.build = build

// console.log(build('19921030'))
