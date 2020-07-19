import { Sprite } from "../base/Sprite.js"
import { DataStore } from "../base/DataStore.js"
/**
 * 背景类 （继承 Sprite）
 */
export class BackGround extends Sprite {
  constructor() {
    const bgImg = Sprite.getImage("background")
    super(
      bgImg,
      0,
      0,
      bgImg.width,
      bgImg.height,
      0,
      0,
      DataStore.getInstance().canvas.width,
      DataStore.getInstance().canvas.height
    )

  }
}