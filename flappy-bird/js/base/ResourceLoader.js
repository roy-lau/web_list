import { Resources } from "./Resources.js"
/**
 * 资源文件加载器
 * 确保canvas在图片资源加载完成后才进行渲染
 */
export class ResourceLoader {
  constructor() {

    this.map = new Map(Resources)
    for (let [key, src] of this.map) {
      // console.log(key,val)
      const image = new Image();
      image.src = src
      this.map.set(key, image)
    }

  }
  /**
   * 资源加载完成的回调
   * 
   * @param {Function} cb 回调函数
   */
  onLoaded(cb) {
    let loadedCount = 0
    for (let val of this.map.values()) {
      val.onload = () => {
        loadedCount++
        if (loadedCount >= this.map.size) cb(this.map)
      }
    }
  }
  
  /**
   * 创建资源加载 loader
   * 
   * 工厂模式
   */
  static create(){
    return new ResourceLoader()
  }
}