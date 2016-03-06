'use strict'

const template = require('../data/template')
const fetch = require('./fetch')

function getRandomYunJiao(birthday) {
  const yunmus = ['ang', 'eng', 'ing', 'ong',
    'ai', 'ei', 'ao', 'ou', 'iu', 'ie', 'ue',
    'an', 'en', 'in', 'un',
    'a', 'o', 'e', 'i', 'u', 'v', 'zi',
  ]
  let index = Math.floor(Math.random() * yunmus.length)
  if (birthday) {
    index = birthday % yunmus.length
  }
  return yunmus[index]
}

function getRandomLexTemplate(birthday, cb) {
  let choice = Math.floor(Math.random() * 2)
  if (birthday) {
    choice = birthday % 2
  }
  let tempPath = ''
  if (choice === 0) {
    tempPath = 'data/word/WuYan_template.txt'
  } else {
    tempPath = 'data/word/QiYan_template.txt'
  }
  fetch.fetch(tempPath, (line) => {
    let index = Math.floor(Math.random() * (line.length - 1))
    if (birthday) {
      index = birthday % (line.length - 1)
    }
    let result = line[index]
    index = Math.floor(Math.random() * (line.length - 1))
    if (birthday) {
      index = birthday * birthday % (line.length - 1)
    }
    result = result + ' ' + line[index]
    cb(result)
  })
}

function getRandomWord(path, birthday, pingze, i, cb) {
  const word = fetch.fetch(path, (data) => {
    let index = Math.floor(Math.random() * data.length)
    if (birthday) {
      index = birthday % data.length
    }
    while (data[index].split(',')[2] !== pingze) {
      ++index
      index %= data.length
    }
    cb(i, data[index].split(',')[0])
  })
}

exports.getRandomPingZeTemplate = template.getRandomTemplate
exports.getRandomYunJiao = getRandomYunJiao
exports.getRandomLexTemplate = getRandomLexTemplate
exports.getRandomWord = getRandomWord
