;
(function() {
    "use scrict"
    var $formAddTask = $(".add-task"),
        $window = $(window),
        $body = $('body'),
        $deleteTask,
        $detailTask,
        $taskDetail = $(".task-detail"),
        $taskDetailMask = $(".task-detail-mask"),
        $msg = $(".msg"),
        $msgContent = $msg.find(".msg-content"),
        $msgconfirm = $msg.find(".confirmed"),
        $alert = $(".alert"),
        $updataForm,
        $taskDetailContent,
        $taskDetailContentInput,
        $checkboxComplete,
        currentIndex,
        taskList = {};

    init()

    $formAddTask.on('submit', onAddTaskFormSubmit)
    $taskDetailMask.on('click', fadeOutTaskDetail)

    function onAddTaskFormSubmit(e) {
        var newTask = {},
            $input;
        // 禁用默认行为
        e.preventDefault();
        // 获取新task的值
        $input = $(this).find('input[name="content"]');
        newTask.content = $input.val();
        // 如果task的值为空，直接返回。否则继续执行
        if (!newTask.content) return;

        // 存入新task
        if (addTask(newTask)) {
            renderTaskList();
            $input.val(null) // 添加完成后清空
        };

    }
    // 监听打开task事件
    function listenTaskDetail() {
        var index;
        $('.task-item').on('click', function() {
            index = $(this).data("index");
            fadeInTaskDetail(index)
        })
        $detailTask.on("click", function() {
            var $this = $(this),
                $Item = $this.parent();
            index = $Item.data("index");
            fadeInTaskDetail(index)
        })
    }

    // 显示右侧详细信息的事件
    function fadeInTaskDetail(i) {
        // 生成详情模板
        renderTaskDetail(i);
        currentIndex = i;
        // 显示详情模板（默认隐藏）
        $taskDetail.fadeIn();
        $taskDetailMask.fadeIn();
    }
    // 隐藏task详情
    function fadeOutTaskDetail() {
        $taskDetail.fadeOut();
        $taskDetailMask.fadeOut();
    }
    // 更新task详细信息
    function updataTask(i, data) {
        if (!i || !taskList[i]) return;
        taskList[i] = $.extend({}, taskList[i], data);
        renderTaskData()
    }
    // 渲染指定task的详细信息
    function renderTaskDetail(i) {
        if (!i === undefined || !taskList[i]) return;
        var item = taskList[i];
        var tpl =
            '<form>' +
            '<div class="content">' +
            item.content +
            '</div>' +
            '<div class="input-item">' +
            '<input type="text" name="content" value="' + (item.content || '') + '" style="display:none;" /></div>' +
            '<div class="desc input-item">' +
            '<textarea name="desc">' + (item.desc || '') + '</textarea>' +
            '</div>' +
            '<div class="remind input-item">' +
            '<label for="date-time"> 提醒时间：</label>' +
            '<input id="date-time" name="remind-date" type="text" value="' + (item.remindDate || '') + '">' +
            '</div>' +
            '<button type="submit">更新</button>' +
            '</form>';
        // 清空task模板
        $taskDetail.html(null);
        // 用新模板替换旧模板
        $taskDetail.html(tpl);
        // 调用时间插件datetimepicker；
        $("#date-time").datetimepicker();
        // 选中form元素，因为之后会监听submit事件
        $updataForm = $taskDetail.find("form");
        // 选中显示task内容元素
        $taskDetailContent = $updataForm.find(".content");
        // 选中task input内容元素
        $taskDetailContentInput = $updataForm.find("[name=content]");
        // 双击内容元素显示input，隐藏自己
        $taskDetailContent.on("dblclick", function() {
            $taskDetailContentInput.show()
            $taskDetailContent.hide()
        })

        $updataForm.on('submit', function(e) {
            e.preventDefault();
            var data = {};
            // 获取表单中各个input的值
            data.content = $(this).find('[name=content]').val();
            data.desc = $(this).find('[name=desc]').val();
            data.remindDate = $(this).find('[name=remind-date]').val();
            updataTask(i, data);
            fadeOutTaskDetail();
        })
    }
    // 监听消息提醒关闭
    function listenMsgEvent() {
        $msgconfirm.on("click", function() {
            hideMsg();
        })
    }

    // 查找并监听所有删除按钮的点击事件
    function listenTaskDelete() {
        $deleteTask.on("click", function(e) {
            e.stopPropagation();  // 点击删除事阻止事件冒泡 - -不会去触发详细信息显示bug解决

            var $this = $(this),
                // 找到并删除按钮的task元素
                $Item = $this.parent(),
                index = $Item.data("index");
            // 确认删除 
            _alert("确定删除？").then(function(res){
                debugger;
                if (res) {
                    res ? deleteTask(index) : null;
                }
            })
        })
    }

    // 监听完成task事件(打钩)
    function listenCheckboxComplete() {
        $checkboxComplete.on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                isComplete = $this.is(':checked'),
                index = $this.parent().parent().data("index");
            var item = getStore(index);
            if (item.complete) {
                updataTask(index, { complete: false });
            } else {
                updataTask(index, { complete: true });
            }
        })
    }

    function getStore(index) {
        return store.get("taskList")[index];
    }

    function addTask(newTask) {
        // 将新的task push进 taskList
        taskList.push(newTask)
        renderTaskData()
        return true;
    }

    function renderTaskData() {
        // 更新localStorage,并更新渲染tpl
        store.set("taskList", taskList);
        renderTaskList();
    }

    // 删除一条task
    function deleteTask(index) {
        // 如果没有index，或者taskList的index不存在，则直接return
        if (index === undefined || !taskList[index]) return;

        delete taskList[index];

        renderTaskData();
    }

    function init() {
        taskList = store.get("taskList") || [];
        if (taskList.length) {
            renderTaskList();
            taskRemindCheck();
            listenMsgEvent();
        }
    }

    // 监听定时提醒事件
    function taskRemindCheck() {
        var timer = setInterval(function() {
            for (var i = 0; i < taskList.length; i++) {
                var item = getStore(i),
                    currentTimeStamp,
                    taskTimeStamp;
                if (!item || !item.remindDate || item.informed) continue;
                currentTimeStamp = (new Date()).getTime();
                taskTimeStamp = (new Date(item.remindDate)).getTime();
                if (currentTimeStamp - taskTimeStamp >= 1) {
                    updataTask(i, { informed: true });
                    showMsg(item.content);
                }
            }
        }, 500)
    }

    function _alert(arg) {
        if (!arg) console.log("用户没有传入参数")
        var conf = {},
                  $Box,
                  $Mask,
                  $title,
                  $content,
                  $confirm,
                  $cancel,
                  confirmed,
                  timer,
                  dfd;
                dfd = $.Deferred();
        if (typeof arg == 'string') {
            conf.title = arg;
        } else {
            conf = $.extend(conf, arg)
        }

        $Box = $('<div>'+
            '<div class="alert-title">'+conf.title+'</div>'+
            '<div class="alert-content"></div>'+
            '<div><button class="primary confirm">确定</button>'+
                '<button class="cancel">取消</button></div>'+
            '</div>').css({
            padding: 10,
            width: 300,
            height: "auto",
            padding: "20px 10px",
            position: 'fixed',
            background: '#FFF',
            "text-align": "center",
            "border-radius": 3,
            "box-shadow":'0 1px 2px rgba(0,0,0,.5)'
        });
        $title = $Box.find('.alert-title').css({
            "font-weight": 900,
            "font-size":20
        })
        $Mask = $('<div></div>').css({
            background: "rgba(0,0,0,.6)",
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        })
        $confirm = $Box.find('button.confirm'); // 确定
        $cancel = $Box.find('button.cancel');   // 取消
        timer = setInterval(function(){
            if (confirmed !== undefined) {
                console.log(confirmed)
                dfd.resolve(confirmed);
                clearInterval(timer)
                dismiss_alert()
            }
        },50)

        function dismiss_alert(){
            $Mask.remove()
            $Box.remove()
        }
        $confirm.on("click", onConfirm);
        $cancel.on("click", onClose);
        $Mask.on("click",onClose);
        function onClose(){
            confirmed = false;
        }
        function onConfirm(){
            confirmed = true;
        }

        $window.on("resize", abjustBoxPosition);

        function abjustBoxPosition() {
            var windowWidth = $window.width(),
                windowHeight = $window.height(),
                boxWidth = $Box.width(),
                boxHeight = $Box.height(),
                moveX, moveY;
            moveX = (windowWidth - boxWidth) / 2;
            moveY = ((windowHeight - boxHeight) / 2)-20;
            $Box.css({
                left: moveX,
                top: moveY
            })
        }
        $Mask.appendTo($body);
        $Box.appendTo($body);
        $window.resize();
        // return dfd.resolve(confirmed);
        return dfd.promise()
    }
    // 定时提醒
    function showMsg(msg) {
        if (!msg) return;
        $msgContent.html(msg);
        $alert.get(0).play(); // 播放alert提示音
        $msg.show();
    }

    function hideMsg() {
        $msg.hide();
    }
    // 渲染全部的task模板
    function renderTaskList() {
        var $taskList = $('.task-list'),
            completeIetms = [];

        $taskList.html("");
        for (var i = 0; i < taskList.length; i++) {
            var Items = taskList[i];
            if (Items && Items.complete) {
                completeIetms[i] = Items
            } else {
                var $task = renderTaskItem(Items, i);
            }
            $taskList.prepend($task);
        };
        for (var j = 0; j < completeIetms.length; j++) {
            if (!completeIetms[j]) continue;
            $task = renderTaskItem(completeIetms[j], j);
            $task.addClass("completed")
            $taskList.append($task);
        };

        $deleteTask = $("span.delete");
        $detailTask = $("span.detail");
        $checkboxComplete = $(".task-list .complete");  // 获取复选框checkbox
        listenTaskDelete();
        listenTaskDetail();
        listenCheckboxComplete();
    }

    // 渲染单条task模板
    function renderTaskItem(data, index) {
        if (!data || !index === undefined) return;
        var listItemTpl =
            '<div class="task-item"  data-index="' + index + '">' +
            '<span><input class="complete" ' + (data.complete ? "checked" : "") + ' type="checkbox"></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="auchor detail"> 详细  </span>' +
            '<span class="auchor delete"> 删除 &nbsp;</span>' +
            '</div>';

        return $(listItemTpl);
    }
})()
