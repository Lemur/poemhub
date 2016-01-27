const cheerio = require('cheerio')
const request = require('request')
const async = require('async')
const fs = require('fs')

let index = 0
function getPoem(url, cb) {
  request(url, (err, res, body) => {
    const $ = cheerio.load(body, {
      ignoreWhitespace: true,
    })

    // 标题
    const poemTitle = $('div div div h1').text()
    // 作者
    $('p span').remove()
    let poemAuthor = $('p').eq(1).text()
    if (poemAuthor === '' || !poemAuthor) {
      poemAuthor = '佚名'
    }
    // 正文
    $('div .son2 p').remove()
    $('div .son2 div').remove()
    let poemBody = $('div .son2').text()
    poemBody = poemBody.substring(poemBody.lastIndexOf('     ') + 5)

    // 将结果追加到文件
    if (poemBody && poemBody !== '') {
      fs.appendFile('poems.txt', '\n' + poemTitle + '\n' + poemAuthor + '\n' + poemBody + '\n')
      console.log(index++)
      console.log(poemTitle)
      console.log(poemBody)
    }
    cb(null, null)
  })
}

const urls = []

let i = 0
for (i = 0; i < 71000; ++i) {
  urls.push('http://so.gushiwen.org/view_' + i + '.aspx')
}

async.mapLimit(urls, 10, (url, cb) => {
  getPoem(url, cb)
})
