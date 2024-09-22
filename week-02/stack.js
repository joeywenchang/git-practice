// week-02/stack.js

/**
 * Stack 是一個後進先出（Last In First Out, LIFO）的資料結構。
 * 它通常包含以下基本操作：
 * - push(element): 在 stack 的頂部加入一個元素
 * - pop(): 移除並回傳 stack 頂部的元素
 * - peek(): 回傳 stack 頂部的元素，但不移除它
 * - isEmpty(): 檢查 stack 是否為空
 * - size(): 回傳 stack 中元素的個數
 * - clear(): 清空 stack
 * - print(): 印出 stack 內容
 */

export default class Stack {
  /**
   * `#items` 是一個私有屬性，用於存儲 stack 的元素。
   * `#` 符號在 JavaScript 中表示私有欄位，這意味著該屬性無法在類別外部被直接訪問或修改。
   */
  #items;

  constructor() {
    this.#items = [];
  }

  /**
   * 在 stack 頂部加入元素
   * @param {*} element - 要加入的元素
   */
  push(element) {
    this.#items.push(element);
  }

  /**
   * 移除並回傳 stack 頂部的元素
   * @returns {*} 被移除的元素
   */
  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from an empty stack");
    }
    return this.#items.pop();
  }

  /**
   * 回傳 stack 頂部的元素，但不移除它
   * @returns {*} stack 頂部的元素
   */
  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek from an empty stack");
    }
    return this.#items[this.#items.length - 1];
  }

  /**
   * 檢查 stack 是否為空
   * @returns {boolean} 如果 stack 為空，回傳 true，否則回傳 false
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * 回傳 stack 中元素的個數
   * @returns {number} stack 的大小
   */
  size() {
    return this.#items.length;
  }

  /**
   * 清空 stack
   */
  clear() {
    this.#items = [];
  }

  /**
   * 印出 stack 內容
   */
  print() {
    console.log(this.#items.toString());
  }
}