import { Pencil } from "./Pencil.js"
import { Sprite } from "../base/Sprite.js"

/**
 * 下半部分铅笔（继承 Pencil 铅笔类）
 */
export class DownPencil extends Pencil {
  constructor(top) {
    const pencilDownImg = Sprite.getImage("pencilDown")
    super(pencilDownImg, top)
  }
  draw() {
    // 小鸟能通过的间隙是屏幕高度的五分之一
    let gap = window.innerWidth / 5
    this.y = this.top + gap
    super.draw()
  }
}