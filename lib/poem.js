import birthdayBuilder from './builder/birthday'
import randomBuilder from './builder/random'

export default function poem(options) {
  // 有生日，进入生日模式
  if (options && options.birthday) {
    return birthdayBuilder(options.birthday)
  }
  // 有模板，进入模板模式
  if (options && options.template) {
    return randomBuilder(options.template)
  }
  // 没有配置信息，随机生成一个
  return randomBuilder()
}

// console.log(poem())
//
// console.log(poem({
//   birthday: '19921030'
// }))
console.log(poem())
console.log(poem({
  birthday: '19921030'
}))
