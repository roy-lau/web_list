import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 开始按钮类
 */
export class StartButton extends Sprite {
  constructor() {
    const startButtonImg = Sprite.getImage("startButton")
    super(
      startButtonImg,
      0,
      0,
      startButtonImg.width,
      startButtonImg.height,
      (DataStore.getInstance().canvas.width - startButtonImg.width) / 2,
      (DataStore.getInstance().canvas.height - startButtonImg.height) / 2.5,
      startButtonImg.width,
      startButtonImg.height
    )
  }
}