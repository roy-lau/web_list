import { ResourceLoader } from "./js/base/ResourceLoader.js"
import { BackGround } from "./js/runtime/BackGround.js";
import { DataStore } from "./js/base/DataStore.js";
import { Director } from "./js/Director.js"
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/play/Birds.js";
import { StartButton } from "./js/play/StartButton.js";
import { Score } from "./js/play/Score.js";


export class Main {
  constructor() {
    this.canvas = document.getElementById("game_canvas")
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext("2d")

    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()

    const loader = ResourceLoader.create()
    loader.onLoaded(map => this.onResourceFirstLoaded(map))

  }

  /**
   * 监听资源 map 首次加载完成
   * @param { Map } map 资源 map
   */
  onResourceFirstLoaded(map) {

    // 这三个不需要销毁，所以直接挂载到类变量上
    this.dataStore.canvas = this.canvas
    this.dataStore.ctx = this.ctx
    this.dataStore.imgs = map

    this.createBgMusic()
    this.init()
  }
  /**
   * 创建背景音乐
   */
  createBgMusic() {
    this.audio = new Audio()
    this.audio.src = "./bgm.mp3"
    this.audio.loop = true
    this.audio.autoplay = true
  }
  /**
   * 初始化
   */
  init() {
    this.director.isGameOver = false
    this.dataStore
      .put("pencils", [])
      .put("background", BackGround)
      .put("land", Land)
      .put("birds", Birds)
      .put("score", Score)
      .put("startButton", StartButton)
      .put("audio", this.audio)
    this.registerEvent()
    // 在游戏逻辑运行之前创建铅笔
    this.director.createPencil()
    this.audio.play()

    this.director.run()
  }

  /**
   * 注册事件函数
   */
  registerEvent() {
    this.canvas.addEventListener("touchstart", e => {
      // 屏蔽 js 的事件冒泡
      e.preventDefault()
      if (this.director.isGameOver) {
        this.init()

        console.log("游戏开始！")
      } else {
        this.director.birdsEvent()
      }
    })
  }
}