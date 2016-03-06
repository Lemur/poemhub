'use strict'

const fs = require('fs')

/**
 * 根据规则，将符合条件的诗写入到指定文件中
 * @param matches 一个能够接受字符串，并且返回布尔值的判断函数
 * @param output 结果保存的文件路径
 */
function select(matches, output) {
  let remains = ''
  let lineTag = 0 // 0-空行，1-标题，2-作者，3-正文
  const poemBuff = [] // 暂存诗的标题和作者，如果正文不符合要求则丢弃

  fs.createReadStream('data/word/poems.txt', {
    encoding: 'UTF-8',
  }).on('data', (doc) => {
    let line = ''
    const lines = doc.split('\n')
      // 处理缓冲区末尾断行的问题，将末尾的断行加到下一次缓冲区内容的第一行
    lines[0] = remains + lines[0]
    remains = lines.pop()

    for (line of lines) {
      if (lineTag === 3) { // 匹配正文
        lineTag = -1
        if (matches(line)) {
          fs.appendFile(output, /* '\n' + poemBuff[0] + '\n' + poemBuff[1] + '\n' + */line + '\n')
        }
      } else {
        if (lineTag > 0) { // 暂存标题和作者
          poemBuff[lineTag - 1] = line
        }
      }
      lineTag++
    }
  })
}

/**
 * 判断一段字符串是否是五言诗
 */
function wuYan(s) {
  const result = s.match(/([\u4e00-\u9fa5]{5}[，][ ]*[\u4e00-\u9fa5]{5}[。][ ]*)+/)
  if (result && result[0] === s) { // 判断是否整首诗都完全匹配
    return true
  }
}

function qiYan(s) {
  const result = s.match(/([\u4e00-\u9fa5]{7}[，][ ]*[\u4e00-\u9fa5]{7}[。][ ]*)+/)
  if (result && result[0] === s) { // 判断是否整首诗都完全匹配
    return true
  }
}

select(wuYan, 'data/word/WuYan_withoutTitle.txt')
select(qiYan, 'data/word/QiYan_withoutTitle.txt')
