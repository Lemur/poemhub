/**
 * 随机从数组中取出一个元素
 */
function getRandomItem(array) {
  return array[Math.floor(Math.random() * (array.length))]
}
module.exports.getRandomItem = getRandomItem
