import { DataStore } from "./base/DataStore.js"
import { UpPencil } from "./runtime/UpPencil.js"
import { DownPencil } from "./runtime/DownPencil.js"

/**
 * 导演类,控制游戏的逻辑
 */
export class Director {

  constructor() {
    this.dataStore = DataStore.getInstance()
    this.landSpeed = 2 // 陆地移动的速度
  }

  /**
   * 创建笔
   */
  createPencil() {
    // 最小高度是 屏幕的八分之一，最大高度是屏幕的二分之一。
    const MIN_TOP = DataStore.getInstance().canvas.height / 8
    const MAX_TOP = DataStore.getInstance().canvas.height / 2
    // 实际高度 = 最小高度 加上 随机数 乘以 最大高度减去最小高度的差
    const TOP = MIN_TOP + Math.random() * (MAX_TOP - MIN_TOP)

    // 将上部分铅笔插入数组中
    this.dataStore.get("pencils").push(new UpPencil(TOP))
    // 将下部分铅笔插入数组中
    this.dataStore.get("pencils").push(new DownPencil(TOP))
  }

  /**
   * 给小鸟绑定事件
   */
  birdsEvent() {
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get("birds").y[i] = this.dataStore.get("birds").birdsY[i]
    }
    this.dataStore.get("birds").time = 0
  }
  /**
   * 判断小鸟是否撞击到铅笔
   */
  static isStrike(birdsBorder, pencilBorder) {
    let flag = false
    if (
      birdsBorder.top > pencilBorder.bottom || // 小鸟的上侧撞击铅笔的下侧
      birdsBorder.bottom < pencilBorder.top || // 小鸟的下侧撞击铅笔的上侧
      birdsBorder.right < pencilBorder.left || //小鸟的右侧撞击铅笔的左侧
      birdsBorder.left > pencilBorder.right // 小鸟的左侧撞击铅笔的右侧
    ) {
      flag = true
    }
    return !flag
  }
  /**
   * 判断小鸟试飞撞击到地板或铅笔
   */
  check() {
    const birds = this.dataStore.get("birds"),
      land = this.dataStore.get("land"),
      pencils = this.dataStore.get("pencils"),
      score = this.dataStore.get("score")
    // 地板的撞击判断
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true
      return;
    }

    // 小鸟的边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }

    // 铅笔的边框模型
    const pencilsLen = pencils.length
    for (let i = 0; i < pencilsLen; i++) {
      const pencil = pencils[i]
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      }

      if (Director.isStrike(birdsBorder, pencilBorder)) {
        this.isGameOver = true
        return
      }
    }

    // 加分逻辑
    if(birds.birdsX[0]>pencils[0].x+pencils[0].width
      && score.isScore){
        score.isScore=false
      score.scoreNumber++
    }
  }
  // 导演曰：跑
  run() {
    this.check()
    if (this.isGameOver) {
      console.log('gameOver！')
      this.dataStore.get("startButton").draw()
      this.dataStore.get("audio").pause()
      cancelAnimationFrame(this.dataStore.get("timer"))
      this.dataStore.destory()
    } else {
      // 画背景图
      this.dataStore.get("background").draw()

      const pencils = this.dataStore.get("pencils")
      /**
       * 铅笔的左侧位置 加上 铅笔的宽度 小于等于 0 ，说明铅笔超出了屏幕的左侧
       * 并且铅笔的总数等于 4 （两组）
       */
      if (pencils[0].x + pencils[0].width <= 0 &&
        pencils.length === 4) {
        // Array.shift() 函数是将数组的第一个元素推出数组，并且将数组的长度减一
        pencils.shift()
        pencils.shift()
        this.dataStore.get("score").isScore = true
      }
      /**
       * 当铅笔的为小于等于 屏幕的宽度 减去 铅笔的宽度 之差 的一半
       * 并且铅笔总数等于 2 （一组）
       */
      if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 &&
        pencils.length == 2) {
        // 创建铅笔
        this.createPencil()
      }
      // 画铅笔
      pencils.forEach((pencil) => pencil.draw());
      // 画陆地
      this.dataStore.get("land").draw()
      // 画计数器
      this.dataStore.get("score").draw()
      // 画小鸟
      this.dataStore.get("birds").draw()


      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.put("timer", timer)
    }
  }

  /**
   * 静态实例
   * 
   * 设计模式——单例模式
   */
  static getInstance() {
    if (!Director.instance) Director.instance = new Director()
    return Director.instance
  }
}