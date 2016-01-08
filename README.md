## PoemHub ![NPM version](https://img.shields.io/npm/v/poemhub.svg?style=flat)

Build your poem by your birthday

## Features

- [x] 支持定制模板（通过 类型+字数+平仄+分割符 拼接）
- [x] 解决平仄问题（通过 `+/-` 标记）
- [ ] 每个字的平仄都匹配（现在两个字的平仄只有最后一个字是对的）
- [x] 去除重复的汉字（比如 一年 今年 年 这种）
- [ ] 尽量保证句式语意通畅（通过词性组合，例如 `名词+名词+形容词` 生成，或者保证每句有一个名词即可）
- [ ] 通过生日生成的时候，保证有与月份相关的关键词出现
- [ ] 可以传入性别属性，生成不同风格的诗句
- [ ] 对仗工整，模板中加入词性（名词和名词对上，短语的字数对应）
- [ ] 传入人名，先匹配命中的汉字提前加入词库，然后再生成和名字对应的诗句
- [ ] 添加测试用用例，校验模板中的字数对仗工整，不能单字开头

### Installation
```bash
$ npm install poemhub
```

### Example
```js
var poemhub = require('poemhub');
```

### API
check this file: `poem.js`

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### ISC license
Copyright (c) 2016 callmewhy



---
![docor]()
built upon love by [docor](git+https://github.com/turingou/docor.git) v0.3.0
