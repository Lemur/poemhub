/**
 * 随机从数组中取出一个元素
 */
Array.prototype.randomItem = () => {
  return this[Math.floor(Math.random() * (this.length))]
}
