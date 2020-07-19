import { Pencil } from "./Pencil.js"
import { Sprite } from "../base/Sprite.js"
import { DataStore } from "../base/DataStore.js"

/**
 * 下半部分铅笔（继承 Pencil 铅笔类）
 */
export class DownPencil extends Pencil {
  constructor(top) {
    const pencilDownImg = Sprite.getImage("pencilDown")
    super(pencilDownImg, top)
  }
  draw() {
    // 小鸟能通过的间隙是屏幕高度的三分之一
    let gap = DataStore.getInstance().canvas.width / 3
    this.y = this.top + gap
    super.draw()
  }
}