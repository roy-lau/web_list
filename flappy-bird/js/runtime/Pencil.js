import { Sprite } from "../base/Sprite.js"
import { Director } from "../Director.js"
/**
 * 铅笔的基础类（继承 Sprite 类）
 */
export class Pencil extends Sprite {
  constructor(pencilImg, top) {
    super(
      pencilImg,
      0,
      0,
      pencilImg.width,
      pencilImg.height,
      // 刚好在右侧看不到的位置
      window.innerWidth,
      0,
      pencilImg.width,
      pencilImg.height,
    )
    this.top = top
  }

  draw() {
    this.x -= Director.getInstance().landSpeed
    super.draw(
      this.img,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}