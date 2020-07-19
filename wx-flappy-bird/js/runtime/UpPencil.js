import { Pencil } from "./Pencil.js"
import { Sprite } from "../base/Sprite.js"
/**
 * 上半部分的铅笔类（继承 Pencil 铅笔类）
 */
export class UpPencil extends Pencil {
  constructor(top) {
    const pencilUpImg = Sprite.getImage("pencilUp")
    super(pencilUpImg, top)
  }

  draw() {
    this.y = this.top - this.height
    super.draw()
  }
}