'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countTemplate = countTemplate;
/**
 * 计算模板的基础元素出现次数
 * @param  {String} template 模板
 * @return {Object}          模板中的基础元素出现次数
 */
function countTemplate(template) {
  return template.reduce(function (pv, cv) {
    var words = cv.split('/');
    words.pop();
    return pv.concat(words);
  }, []).reduce(function (pv, cv) {
    var v = pv[cv] || 0;
    pv[cv] = v + 1;
    return pv;
  }, {});
}

// const a = count(['A2+/A2-/A1+/，', 'A2-/A2+/B1-/。', 'A2-/A2+/A1+/，', 'A2+/A2-/B1-/。', ])
// console.log(a)

// { 'A2+': 4, 'A2-': 4, 'A1+': 2, 'B1-': 2 }
//# sourceMappingURL=template.js.map