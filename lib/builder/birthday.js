/**
 * 根据生日（AAAABBCC）生成古诗
 */


import {
  getRandomItem
}
from '../util/random'

import render from '../util/render'
import templatesData from '../data/templates'
import wordsData from '../data/words'
import {
  countTemplate
}
from '../util/template'


var BirthdayBuilder = function(birthday) {
  this.year = parseInt(birthday.substr(0, 4), 10)
  this.month = parseInt(birthday.substr(4, 2))
  this.day = parseInt(birthday.substr(6, 2))
}

BirthdayBuilder.prototype.getTemplate = function() {
  const i = (this.year + this.month) % templatesData.length
  return templatesData[i]
}

BirthdayBuilder.prototype.buildTemplateArray = function(words, count) {
  const resultArray = []
  var i = (this.year + this.month + this.day) % words.length
  while (resultArray.length !== count) {
    var r = words[i]
    i = (i + 1) % words.length
    resultArray.push(r)
  }
  return resultArray
}

BirthdayBuilder.prototype.buildTemplate = function(template) {
  const self = this
  const templateCount = countTemplate(template)
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
    const data = self.buildTemplateArray(words, count)
    pv[cv] = data
    return pv
  }, {})

  return render(template, templateData)
}

BirthdayBuilder.prototype.build = function() {
  const t = this.getTemplate()
  return this.buildTemplate(t)
}

export default function build(birthday) {
  const bb = new BirthdayBuilder(birthday)
  return bb.build()
}

// console.log(build('19921030'))
