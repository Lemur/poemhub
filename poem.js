const templateBuilder = require('./builder/template')
const birthdayBuilder = require('./builder/birthday')
const randomBuilder = require('./builder/random')

function poem(options) {
  // 有生日，进入生日模式
  if (options && options.birthday) {
    return birthdayBuilder.build(options.birthday)
  }
  // 有模板，进入模板模式
  if (options && options.template) {
    return templateBuilder.build(options.template)
  }
  // 没有配置信息，随机生成一个
  return randomBuilder.build()
}
module.exports = poem


// console.log(poem())
