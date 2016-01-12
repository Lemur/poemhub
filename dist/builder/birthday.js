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

var _template = require('../util/template');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BirthdayBuilder = function BirthdayBuilder(birthday) {
  this.year = parseInt(birthday.substr(0, 4), 10);
  this.month = parseInt(birthday.substr(4, 2));
  this.day = parseInt(birthday.substr(6, 2));
}; /**
    * 根据生日（AAAABBCC）生成古诗
    */

BirthdayBuilder.prototype.getTemplate = function () {
  var i = (this.year + this.month) % _templates2.default.length;
  return _templates2.default[i];
};

BirthdayBuilder.prototype.buildTemplateArray = function (words, count) {
  var resultArray = [];
  var i = (this.year + this.month + this.day) % words.length;
  while (resultArray.length !== count) {
    var r = words[i];
    i = (i + 1) % words.length;
    resultArray.push(r);
  }
  return resultArray;
};

BirthdayBuilder.prototype.buildTemplate = function (template) {
  var self = this;
  var templateCount = (0, _template.countTemplate)(template);
  var aDataWords = _words2.default.A;
  var bDataWords = _words2.default.B[this.day % _words2.default.B.length];
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
    var data = self.buildTemplateArray(words, count);
    pv[cv] = data;
    return pv;
  }, {});

  return (0, _render2.default)(template, templateData);
};

BirthdayBuilder.prototype.build = function () {
  var t = this.getTemplate();
  return this.buildTemplate(t);
};

function build(birthday) {
  var bb = new BirthdayBuilder(birthday);
  return bb.build();
}

// console.log(build('19921030'))
//# sourceMappingURL=birthday.js.map