import { DataStore } from "./DataStore.js"

/**
 * 精灵的基类，负责初始化精灵加载的资源和大小以及位置
 */
export class Sprite {
  /**
   * 
   * @param {Object} img 要绘制的图片对象
   * @param {Number} srcX 要剪裁的 X 坐标
   * @param {Number} srcY 要剪裁的 Y 坐标
   * @param {Number} srcW 要剪裁的宽度
   * @param {Number} srcH 要剪裁的高度
   * @param {Number} x 图片资源在 cavans x 坐标，以左上角为起始坐标。
   * @param {Number} y 图片资源在 cavans y 坐标，以左上角为起始坐标。
   * @param {Number} width 图片的宽度
   * @param {Number} height 图片的高度
   */
  constructor(
    img = null,
    srcX = 0,
    srcY = 0,
    srcW = 0,
    srcH = 0,
    x = 0,
    y = 0,
    width = 0,
    height = 0
  ) {
    this.dataStore = DataStore.getInstance()
    this.ctx = this.dataStore.ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  /**
   * 封装画图函数
   * 
   * @param {Object} img 要绘制的图片对象
   * @param {Number} srcX 要剪裁的 X 坐标
   * @param {Number} srcY 要剪裁的 Y 坐标
   * @param {Number} srcW 要剪裁的宽度
   * @param {Number} srcH 要剪裁的高度
   * @param {Number} x 图片资源在 cavans x 坐标，以左上角为起始坐标。
   * @param {Number} y 图片资源在 cavans y 坐标，以左上角为起始坐标。
   * @param {Number} width 图片的宽度
   * @param {Number} height 图片的高度
   */
  draw(
    img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height
  ) {
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    )
  }

  /**
   * 由于 super 中不能使用 this， 所以需要创建 getImage 静态函数获取 image
   * @param {String} key 
   */
   static getImage(key){
    return DataStore.getInstance().imgs.get(key)
  }
}