"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomItem = getRandomItem;
/**
 * 随机从数组中取出一个元素
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
//# sourceMappingURL=random.js.map