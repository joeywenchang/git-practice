// main.js
// TODO 以 Module 的方式匯入，例如:
// add package.json type為module, 預設是commonjs
import Stack from "./stack.js";

let stack = new Stack();
stack.print();

stack.push(5);
stack.push(8);
stack.print();

// 測試其他還沒測過的 function，以下console輸出結果應為true
stack.clear();
console.log(stack.isEmpty() === true);

stack.push(5);
stack.push(8);
console.log(stack.peek() === 8);

stack.pop();
console.log(stack.pop() === 5);
console.log(stack.size() === 0);
