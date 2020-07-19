import { Sprite } from "../base/Sprite.js"
import { Director } from "../Director.js"
import { DataStore } from "../base/DataStore.js"

/**
 * 不断移动的陆地（继承 Sprite 类）
 */
export class Land extends Sprite {
  constructor() {
    const landImg = Sprite.getImage("land")
    super(
      landImg,
      0,
      0,
      landImg.width,
      landImg.height,
      0,
      DataStore.getInstance().canvas.height - landImg.height,
      landImg.width,
      landImg.height
    )
    // 陆地的水平变化坐标
    this.landX = 0
    // 陆地的移动速度
    this.landSpeed = Director.getInstance().landSpeed
  }

  draw() {
    this.landX += this.landSpeed
    // 陆地图片的位置 大于 图片的宽度 减去 屏幕的宽度的时候，将陆地图片的位置置为 0
    if (this.landX > (this.img.width - DataStore.getInstance().canvas.width)) this.landX = 0
    super.draw(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      -this.landX,
      this.y,
      this.width,
      this.height
    )
  }
}