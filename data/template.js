'use strict'

const fs = require('fs')
const mergeLex = require('./separate-by-lex').mergeLex

const qiJuePztemplates = [
  ['*+*-++-_', '*-*++--_', '*-*+--+', '*+--++-_'], // -平 +仄 *平仄皆可 _押韵
  ['*-*+-++', '*+--++-_', '*+*--++', '*-*++--_'],
  ['*-*+--+', '*+--++-_', '*+*--++', '*-*++--_'],
  ['*+*--++', '*-*++--_', '*-*+--+', '*+--++-_'],
]

const wuJuePztemplates = [
  ['*++--_', '--*+-_', '*--++', '*++--_'],
  ['*+--+', '--*+-_', '*--++', '*++--_'],
  ['*--++,', '*++--_', '*+--+', '--*+-_'],
  ['--*+-_', '*++--_', '*+--+', '--*+-_'],
]

const tempFreq = [] // 用于储存句型出现的频数

// 获取一个短句的句型
function getTemplate(sentence) {
  if (!sentence) {
    return ''
  }
  let result = ''
  const tempInfo = sentence.split(/[_ ]/g)
  let i = 0
  for (i = 0; i < tempInfo.length / 2; ++i) {
    result += mergeLex(tempInfo[2 * i + 1]) + tempInfo[2 * i].length + '/'
  }
  return result
}


// 随机生成平仄
function getRandomPingZe(birthday) {
  const s = '+-'
  let choice = Math.floor(Math.random() * 2)
  if (birthday) {
    choice = birthday % 2
  }
  return s.charAt(choice)
}


// 七言绝句的平仄押韵template，参考文学知识
function getPingZeYunTemplate(templates, birthday) {
  let index = Math.floor(Math.random() * templates.length)
  if (birthday) {
    index = birthday % templates.length
  }
  const template = templates[index]
    // 将模板中平仄皆可的部分随机填充
  let i = 0
  for (i in template) {
    template[i] = template[i].replace(/[*]/g, getRandomPingZe(birthday))
    while (template[i].match(/[-]{3}|[+][-][+]/g)) {
      template[i] = template[i].replace(/[-]{3}/g, '--+') // 消除三连平
      template[i] = template[i].replace(/[+][-][+]/g, '--+') // 消除孤平
    }
  }
  return template
}


function summarizeLexTemplate(path) {
  let remaining = ''
  const sentences = []
  fs.createReadStream(path, {
    encoding: 'UTF-8',
  }).on('data', (data) => {
    const lines = data.split(/[\r\n]+/)
    lines[0] = remaining + lines[0]
    remaining = lines.pop()
    let line = ''
    for (line of lines) {
      const tempsents = line.split(/[ ][。][_][w][ ]|[。]/)
      let sent = ''
      for (sent of tempsents) {
        if (sent) {
          sentences.push(sent)
        }
      }
    }
  }).on('end', () => {
    let sentence = ''

    // 获取句型并统计句型出现的频数
    for (sentence of sentences) {
      let template = getTemplate(sentence.split(/[ ][，][_][w][ ]/g)[0]) + ' '
      // 不要用const。否则多次循环中template将不会被改变
                     + getTemplate(sentence.split(/[ ][，][_][w][ ]/g)[1])
      if (!tempFreq[template]) {
        tempFreq[template] = 1
      } else {
        ++tempFreq[template]
      }
    }
    let template = ''

    const _1 = path.split('.')
    const _2 = _1[0] + '_template' + '.' + _1[1]
    // 看看出现超过两次的句型有哪些。。。
    for (template in tempFreq) {
      if (tempFreq[template] > 4) {
        fs.appendFile(_2, template + '\n')
      }
    }

    // 排个序
    // TODO
  })
}

function getRandomTemplate(birthday) {
  let index = Math.floor(Math.random() * 2)
  if (birthday) {
    index = birthday % 2
  }
  if (index === 0) {
    return getPingZeYunTemplate(wuJuePztemplates, birthday)
  } else {
    return getPingZeYunTemplate(qiJuePztemplates, birthday)
  }
}

// summarizeLexTemplate('data/word/Separate_QiYan.txt')
// console.log(getPingZeYunTemplate(qiJuePztemplates))
// console.log(getTemplate('竹影_n 和_c 诗瘦_n ，_w 梅花_n 入_v 梦_n 香_a'))

exports.getRandomTemplate = getRandomTemplate

// the jumping eslint error prompt is disturbing me
