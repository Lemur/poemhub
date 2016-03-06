'use strict'

const fs = require('fs')

let content = []

function load(path, cb) {
  content[path] = []
  let remaining = ''
  fs.createReadStream(path, {
    encoding: 'UTF-8',
  }).on('data', (data) => {
    const lines = data.split(/[\n\r]/)
    lines[0] = remaining + lines[0]
    remaining = lines.pop()
    let line = ''
    for (line of lines) {
      content[path].push(line)
    }
  }).on('end', () => {
    cb(content[path])
  })
}

/**
 * 向回调函数传递整个文件内容。已经按行截断
 * @param path 需要获取的文件路径
 */
function fetch(path, cb) {
  if (!content[path] || content[path].length === 0) {
    load(path, cb)
    return
  }
  cb(content[path])
}

// console.log(getLength('data/word/A/1/a/1'))

// fetch('data/word/A/1/a/1', 0, function (data) {
//   console.log(data)
// })

exports.fetch = fetch
