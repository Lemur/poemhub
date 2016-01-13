'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = poem;

var _birthday = require('./builder/birthday');

var _birthday2 = _interopRequireDefault(_birthday);

var _random = require('./builder/random');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function poem(options) {
  // 有生日，进入生日模式
  if (options && options.birthday) {
    return (0, _birthday2.default)(options.birthday);
  }
  // 有模板，进入模板模式
  if (options && options.template) {
    return (0, _random2.default)(options.template);
  }
  // 没有配置信息，随机生成一个
  return (0, _random2.default)();
}

// console.log(poem())
//
// console.log(poem({
//   birthday: '19921030'
// }))
//# sourceMappingURL=poem.js.map