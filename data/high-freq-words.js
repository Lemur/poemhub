const fs = require('fs')

const wordFreq = []

let remaining = '' // 用于保存每个buff末尾的断行

fs.createReadStream('data/docs/separate.txt', {
  encoding: 'UTF-8',
}).on('data', (data) => {
  const wordList = data.split(/[ ，。\r\n]+/)
  wordList[0] = remaining + wordList[0]
  remaining = wordList.pop()
  let word = ''
  // 将每个词加到dict中去
  for (word of wordList) {
    if (word) {
      if (!wordFreq[word]) {
        wordFreq[word] = 1
      } else {
        ++wordFreq[word]
      }
    }
  }
}).on('end', () => {
  let sortedWord = []
  let word = ''
  for (word in wordFreq) {
    if (wordFreq[word] > 1) {
      sortedWord.push({
        freq: wordFreq[word],
        text: word,
      })
    }
  }
  sortedWord = sortedWord.sort((a, b) => {
    return (b.freq - a.freq)
  })
  const doc = sortedWord.reduce((pv, cv) => {
    if (pv.text) {
      return pv.text + ',' + pv.freq + '\r\n' + cv.text + ',' + cv.freq
    }
    return pv + '\n' + cv.text + ',' + cv.freq
  })
  fs.appendFile('data/docs/high-frequency-word.csv', doc)
})
