# react-music-player
music player build with React

### overview
![](https://github.com/xiaolin3303/react-music-player/blob/master/overview/music-player.png?raw=true)
![](https://github.com/xiaolin3303/react-music-player/blob/master/overview/music-list.png?raw=true)

### 如何运行

**开发启动**
```shell
npm start
```

**编译产品**
```shell
npm run build
```

**运行各阶段例子**

修改`webpack.config.js`中`entry`

比如`Router`例子
```javascript
entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, 'app/router/index.js')
],
```

[关于轮子](about.md)

## 学习总结

### react中的数据

1. state : 表示组件本身的数据
2. props : 从外部传入组件的数据

### react生命周期

1. getDefaultProps：获得默认的props状态
2. getInitialState：设置state数据
3. componentWillMount：Component即将要挂载到页面的时候
4. render：
    * 该方法会创建一个虚拟DOM，用来表示组件的输出。对于一个组件来讲，render方法是唯一一个必需的方法。render方法需要满足下面几点：
    * 只能通过 this.props 和 this.state 访问数据（不能修改）
    * 可以返回 null,false 或者任何React组件
    * 只能出现一个顶级组件，不能返回一组元素
    * 不能改变组件的状态
    * 不能修改DOM的输出
5. componentDidMount：UI真正挂载到dom的事件，类似于document.read
6. componentWillUnmount：dom渲染完成，组建加载完毕