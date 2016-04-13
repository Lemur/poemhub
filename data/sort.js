/**
 * 根据词性将词语分开储存
 */
'use strict'

let remaining = ''

const fs = require('fs')

const dataToWrite = []


// makedir()

fs.createReadStream('data/docs/sep_by_lex.txt', {
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
      let sort = 'A/' + wordInfo[1] + '/' + wordInfo[0].length  // 这里不能用const
      if (!dataToWrite[sort]) {
        dataToWrite[sort] = ''
      }
      dataToWrite[sort] += wordInfo[0] + ',' + wordInfo[4] + '\n'
    }
  }
}).on('end', () => {
  let sort = ''
  for (sort in dataToWrite) {
    fs.appendFile('data/docs/' + sort, dataToWrite[sort])
  }
})


function makedir() {
  const yayuns = ['A', 'B']
  const cixings = ['a', 'c', 'd', 'e', 'f', 'g', 'j', 'k', 'm',
                  'n', 'np', 'ni', 'ns', 'nz', 'o', 'p', 'q', 'r', 'u', 'v', 's', 't', 'i', 'id']
  let yayun = ''
  for (yayun of yayuns) {
    fs.mkdir('data/docs/' + yayun)
    let cixing = ''
    for (cixing of cixings) {
      fs.mkdir('data/docs/' + yayun + '/' + cixing)
    }
  }
}
