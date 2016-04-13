/**
 * 根据词性、韵脚、声调，将词语分开储存
 * 词库文件的储存格式是：
 *   · B/[平仄]/[词性]/[韵脚]/[字数]
 *   · A/[平仄]/[词性]/[字数]
 */
'use strict'

let remaining = ''

const fs = require('fs')
const pinyin = require('pinyin2')

const dataToWrite = []

// 将某些词性合并，以减少词性的种类
function mergeLex(lex) {
  switch (lex) {
    case 'r': // 代词
    case 'np': // 人名
    case 'ns': // 地名
    case 'nz': // 专有名词
    case 'ni': // 机构名
      return 'n' // 名词
    case 'e': // 语气词
      return 'g' // 助词
    case 'm':
    case 'mq': // 数量词
    case 'f': // 方位词
      return 'a' // 形容词
    default:
      return lex
  }
}

/**
 * 返回某个字的声调。
 */
function getShengDiao(word) {
  const char = word.charAt(word.length - 1)
  const py = pinyin(char, {
    style: pinyin.STYLE_TONE2,
  })[0][0]
  return py.charAt(py.length - 1)
}


function getPingZe(word) {
  const shengdiao = getShengDiao(word)
  switch (shengdiao) {
    case '1':
    case '2':
      return '1'
    case '3':
    case '4':
      return '2'
    default:
  }
  return '1'
}


function getPingZeStr(word) {
  let result = ''
  let char = ''
  for (char of word) {
    let pz = getPingZe(char)
    if (pz === '1') {
      result += '-'
    }
    if (pz === '2') {
      result += '+'
    }
  }
  return result
}
/**
 * 返回这个词的最后一个字的最小的韵母。
 * 最小，指的是，对于， 脸(lian)，将会返回an 而不是ian
 */
function getYunJiao(word) {
  const char = word.charAt(word.length - 1)
  const py = pinyin(char, {
    style: pinyin.STYLE_NORMAL,
  })[0][0]

  if (py === 'zi' || py === 'ci' || py === 'si' || py === 'ri' ||
    py === 'zhi' || py === 'chi' || py === 'shi') {
    return 'zi'
  }

  let result = ''
  const yunMuList = ['ang', 'eng', 'ing', 'ong',
      'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'ue', 've',
      'an', 'en', 'in', 'un', 'vn',
      'a', 'o', 'e', 'i', 'u', 'v', 'zi',
    ]
    // 遍历韵母表
  let yunMu = ''
  for (yunMu of yunMuList) {
    if (py.length < yunMu.length) {
      continue
    }
    if (py.substring(py.length - yunMu.length, py.length) === yunMu) {
      result = yunMu
      break
    }
  }
  // 处理一些特殊的押韵
  if (result === 'vn') {
    result = 'un'
  }
  if (result === 'ui') {
    result = 'ei'
  }
  if (result === 've') {
    result = 'ue'
  }
  return result
}

/**
 * 将词按平仄、词性、字数分类
 */
function runSortingA() {
  fs.createReadStream('data/word/sep_by_lex.txt', {
    encoding: 'UTF-8',
  }).on('data', (data) => {
    const lines = data.split('\n')
    lines[0] = remaining
    remaining = lines.pop()
    let line = ''
    for (line of lines) {
      const wordInfo = line.split(/[ _]+/)
      if (wordInfo.length !== 7) {
        continue
      }
      if (wordInfo) {
        const text = wordInfo[0]
        const cixing = wordInfo[1]
        const cipin = wordInfo[4]
        const sort = 'A/' + getPingZe(text) + '/' + mergeLex(cixing) + '/' + text.length
        if (!dataToWrite[sort]) {
          dataToWrite[sort] = ''
        }
        dataToWrite[sort] += text + ',' + cipin + ',' + getPingZeStr(text) + '\n'
      }
    }
  }).on('end', () => {
    let sort = ''
    for (sort in dataToWrite) {
      fs.appendFile('data/word/' + sort, dataToWrite[sort])
    }
  })
}

const dataToWriteB = []
  /**
   * 将词按韵脚、平仄、词性、字数分类
   */
function runSortingB() {
  fs.createReadStream('data/word/sep_by_lex.txt', {
    encoding: 'UTF-8',
  }).on('data', (data) => {
    const lines = data.split('\n')
    lines[0] = remaining
    remaining = lines.pop()
    let line = ''
    for (line of lines) {
      const wordInfo = line.split(/[ _]+/)
      if (wordInfo.length !== 7) { // 这一行的分词存在错误。（出错的行数很少，没必要修复）
        continue
      }
      if (wordInfo) {
        const text = wordInfo[0]
        const cixing = wordInfo[1]
        const cipin = wordInfo[4]
        const sort = 'B/' + getPingZe(text) + '/' + mergeLex(cixing) + '/' + getYunJiao(text) + '/' + text.length
        if (!dataToWriteB[sort]) {
          dataToWriteB[sort] = ''
        }
        dataToWriteB[sort] += text + ',' + cipin + ',' + getPingZeStr(text) + '\n'
      }
    }
  }).on('end', () => {
    let sort = ''
    for (sort in dataToWriteB) {
      fs.appendFile('data/word/' + sort, dataToWriteB[sort])
    }
  })
}

/**
 * 预先准备好存放的目录。
 */
function makedirA() {
  const pingzes = ['1', '2']
  const cixings = ['a', 'c', 'd', 'e', 'f', 'g', 'j', 'k', 'm',
    'n', 'np', 'ni', 'ns', 'nz', 'o', 'p', 'q', 'r', 'u', 'v', 's', 't', 'i', 'id',
  ]
  let pingze = ''
  for (pingze of pingzes) {
    fs.mkdir('data/word/A/' + pingze)
    let cixing = ''
    for (cixing of cixings) {
      fs.mkdir('data/word/A/' + pingze + '/' + cixing)
    }
  }
}

function makedirB() {
  const yayuns = ['B']
  const pingzes = ['1', '2']
  const cixings = ['a', 'c', 'd', 'e', 'f', 'g', 'j', 'k', 'm',
    'n', 'np', 'ni', 'ns', 'nz', 'o', 'p', 'q', 'r', 'u', 'v', 's', 't', 'i', 'id',
  ]
  const yunmus = ['ang', 'eng', 'ing', 'ong',
    'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'ue', 've',
    'an', 'en', 'in', 'un', 'vn',
    'a', 'o', 'e', 'i', 'u', 'v', 'zi',
  ]
  let yayun = ''
  for (yayun of yayuns) {
    fs.mkdir('data/word/' + yayun)
    let pingze = ''
    for (pingze of pingzes) {
      fs.mkdir('data/word/' + yayun + '/' + pingze)
      let cixing = ''
      for (cixing of cixings) {
        fs.mkdir('data/word/' + yayun + '/' + pingze + '/' + cixing)
        let yunmu = ''
        for (yunmu of yunmus) {
          fs.mkdir('data/word/' + yayun + '/' + pingze + '/' + cixing + '/' + yunmu)
        }
      }
    }
  }
}


exports.mergeLex = mergeLex

// makedirA()
// makedirB()
// runSortingB()
// runSortingA()
