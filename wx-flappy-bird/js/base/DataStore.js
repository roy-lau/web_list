/**
 * 变量修改器，方便在不同类中访问和修改变量
 */
export class DataStore {
  constructor() {
    this.map = new Map()
  }
  /**
   * 获取变量
   * @param {String} key 
   */
  get(key) {
    return this.map.get(key)
  }

  /**
   * 写入变量
   * @param {String} key 
   * @param {Object} val 
   * @returns return this 可以达到链式操作
   */
  put(key, val) {
    // 如果传入的是个函数（类的类型是'function'），则 new 成一个类
    if(typeof val === 'function') val = new val() 
    this.map.set(key, val)
    return this
  }

  // 销毁全部变量
  destory() {
    for (let val of this.map.values()) val = void 0 
  }

  // 单例
  static getInstance() {
    if (!DataStore.instance) DataStore.instance = new DataStore()
    return DataStore.instance
  }
}