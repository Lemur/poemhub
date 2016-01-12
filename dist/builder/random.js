'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _random = require('../util/random');

var _render = require('../util/render');

var _render2 = _interopRequireDefault(_render);

var _templates = require('../data/templates');

var _templates2 = _interopRequireDefault(_templates);

var _words = require('../data/words');

var _words2 = _interopRequireDefault(_words);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 随机生成 TemplateData 数据源
 * @param  {Array}   array          原始的数据源数组
 * @param  {Int}     limit          需要几个随机的元素
 * @param  {String}  cTempData      当前已有的汉字组成的字符串，新生成的数组不会有重复的汉字
 * @return {Array}   生成的新随机数组
 */
/**
 * 随机生成古诗
 */

function buildTemplateArray(array, count, cTempData) {
  var resultArray = [];
  while (resultArray.length !== count) {
    // 随机生成汉字词组，如果随机结果和已有数据重复，则弃用本次生成结果
    var r = (0, _random.getRandomItem)(array);
    var sameWords = Object.keys(cTempData).reduce(function (pv, cv) {
      return pv.concat(cTempData[cv].join('').split(''));
    }, []).concat(resultArray.join('').split('')).filter(function (cWord) {
      var same = false;
      r.split('').forEach(function (w) {
        if (w == cWord) {
          same = true;
        }
      });
      return same;
    });
    if (sameWords.length === 0) {
      resultArray.push(r);
    }
  }

  return resultArray;
}

function buildTemplate(template) {
  var templateCount = template.reduce(function (pv, cv) {
    var words = cv.split('/');
    words.pop();
    return pv.concat(words);
  }, []).reduce(function (pv, cv) {
    var v = pv[cv] || 0;
    pv[cv] = v + 1;
    return pv;
  }, {});

  var aDataWords = _words2.default.A;
  var bDataWords = (0, _random.getRandomItem)(_words2.default.B);

  var templateData = Object.keys(templateCount).reduce(function (pv, cv) {
    var type = cv.split('')[0];
    var length = cv.split('')[1];
    var pz = cv.split('')[2];
    var count = templateCount[cv];
    var words = [];
    switch (type) {
      case 'A':
        words = aDataWords[length][pz];
        break;
      case 'B':
        words = bDataWords[length][pz];
        break;
      default:
        break;
    }
    var data = buildTemplateArray(words, count, pv);
    pv[cv] = data;
    return pv;
  }, {});

  return (0, _render2.default)(template, templateData);
}

function build() {
  var t = (0, _random.getRandomItem)(_templates2.default);
  return buildTemplate(t);
}

// console.log(build(1)[0])
//# sourceMappingURL=random.js.map