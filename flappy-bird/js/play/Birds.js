import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/**
 * 小鸟类
 * 循环渲染三种状态的小鸟
 */
export class Birds extends Sprite {
  constructor() {
    const birdImg = Sprite.getImage("birds")
    super(
      birdImg,
      0,
      0,
      birdImg.width,
      birdImg.height,
      0,
      0,
      birdImg.width,
      birdImg.height
    )
    /**
     * 小鸟的三种状态需要一个数组去存储
     * 小鸟的宽度是 34，上下边距是 10，小鸟左右边距是 9
     */
    this.clippingX = [
      9,
      9 + 34 + 18,
      9 + 34 + 18 + 34 + 18
    ]

    this.clippingY = [10, 10, 10];
    this.clippingWidth = [34, 34, 34];
    this.clippingHeight = [24, 24, 24];
    const birdX = window.innerWidth / 4;
    this.birdsX = [birdX, birdX, birdX];
    const birdY = window.innerHeight / 2
    this.birdsY = [birdY, birdY, birdY];
    const birdWidth = 34;
    this.birdsWidth = [birdWidth, birdWidth, birdWidth];
    const birdHeight = 24;
    this.birdsHeight = [birdHeight, birdHeight, birdHeight];
    this.y = [birdY, birdY, birdY];
    this.index = 0;
    this.count = 0;
    this.time = 0;
  }
  draw() {
    // 切换三只小鸟速度
    const speed = 0.2
    this.count += speed
    // 0,1,2
    if (this.index >= 2) this.count = 0
    //  减速器的作用
    this.index = ~~this.count
    // 模拟动力加速度
    const g = 0.98 / 2.5
    // 向上移动一丢丢的偏移量
    const offsetUp = 30
    // 小鸟的位移(自由落体运动的规律：vt2=2gh(g是重力加速度，在地球上g≈9.8m/s2;) )
    const offsetY = (g * this.time * (this.time - offsetUp)) / 2
    for (let i = 0; i <= 2; i++) this.birdsY[i] = this.y[i] + offsetY
    this.time++

    super.draw(
      this.img,
      this.clippingX[this.index],
      this.clippingY[this.index],
      this.clippingWidth[this.index],
      this.clippingHeight[this.index],
      this.birdsX[this.index],
      this.birdsY[this.index],
      this.birdsWidth[this.index],
      this.birdsHeight[this.index]
    )
  }
}