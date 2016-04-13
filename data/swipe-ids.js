/**
 * 扫除所有带id成分的模板！！
 */
'use strict'
const fs = require('fs')

let remain = ''
fs.createReadStream('data/word/WuYan_template.txt', {
  encoding: 'UTF-8',
}).on('data', (data) => {
  const lines = data.split(/[\r\n]/)
  lines[0] = remain + lines[0]
  remain = lines.pop()
  let line = ''
  for (line of lines) {
    if (line.indexOf('id') === -1 && line.indexOf('g2') === -1) {
      fs.appendFile('data/word/noid.txt', line + '\n')
    }
  }
})
