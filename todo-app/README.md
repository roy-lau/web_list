##  jq-todo-app

### 技术站

1. store.js   本地存储插件(localStorage)
2. jquery.datetimepicker   时间插件

### jq-todo-app 项目介绍

  todo-app可以添加一个备忘事项。
  可以对每个事项进行详细修改。
  设置某个事项的提醒时间，道提醒时间会触发alert.mp3响铃
  设置事项完成状态，打钩后会移动到末尾。
  删除某个事项，

_用时6 hours左右

~~仍存在问题::bug:

1. _alert()事件  line：144  res没有收到返回值
	 问题分析：点击删除时触发了_alert事件，此时没有点击“确认” “取消”按钮，所以传入的是undefined。
	 			_alert()事件需要在点击删除或取消后触发---
	 手贱，多写了个dfd.resolve()，导致传入一直为undefined;

2. 点击删除会触发详细信息。~~

:bug:bug解决学习
e.stopPropagation(); 阻止事件冒泡，但是不会阻止默认行为
e.preventDefault(); 不阻止事件冒泡，但是会阻止默认行为

__有网时，百度一下 详细了解了解 

1. box-sizing: border-box;
2. jq的promise查查API

<input type="text" autofocus  autocomplete="off" />  // 关闭之前输入过的内容

[老师项目地址](http://todolist.t.imooc.io/)