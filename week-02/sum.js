// ary: number array

/**
 * 解釋：
 * reduce 方法接受一個回呼函式和一個初始值（這裡是 0）。
 * 回呼函式有兩個參數：
 * accumulator：累加器，會保存每次迭代的累計值。
 * currentValue：當前迭代的元素值。
 * 每次迭代，accumulator 會加上 currentValue，最終返回所有元素的總和。
 */

function sum(ary) {
	// TODO: sum all elements in ary
  return ary.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

console.log(sum([1, 5, 3, 2])); // 11

// (optional) 挑戰題1:

/**
 * 解釋：
 * 基本情況：如果陣列長度為 0，返回 0。
 * 遞迴情況：將陣列的第一個元素加上剩餘元素的總和。
 * 使用 slice(1) 來獲取除了第一個元素外的子陣列。
 */

function sumRecursive(ary) {
  if (ary.length === 0) return 0;
  return ary[0] + sumRecursive(ary.slice(1));
}

console.log(sumRecursive([1, 5, 3, 2])); // 11

// (optional) 挑戰題2:

/**
 * 解釋：
 * 基本情況：建立好ary = [1, 2, ..., n]
 * 再用reduce來做累加
 */

function sumFromArrayN(n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
}

console.log(sumFromArrayN(5)) // 15

// 梯形公式
function sumN(n) {
	return (1 + n) * n / 2;
}

console.log(sumN(5)) // 15
