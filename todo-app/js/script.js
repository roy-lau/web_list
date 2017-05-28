;
(function() {
    "use scrict"
    var $formAddTask = $(".add-task"),
        $deleteTask,
        taskList = {};

    init()

    $formAddTask.on('submit', onAddTaskFormSubmit)

    function onAddTaskFormSubmit(e){
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

    // 查找并监听所有删除按钮的点击事件
    function listenTaskDelete(){
        $deleteTask.on("click", function() {
            var $this = $(this),
            // 找到并删除按钮的task元素
                $Item = $this.parent(),
                index = $Item.data("index"),
                // 确认删除 
                tmp = confirm("确定删除？");
            tmp ? deleteTask(index) : null;
            
        })
    }

    function addTask(newTask) {
        // 将task push进 taskList
        taskList.push(newTask)
        updataTask()
        return true;
    }

    function updataTask() {
        // 更新localStorage,并更新渲染tpl
        store.set("taskList", taskList);
        renderTaskList();
    }

    // 删除一条task
    function deleteTask(index) {
        // 如果没有index，或者taskList的index不存在，则直接return
        if (index ===undefined || !taskList[index]) return;
        console.log(taskList[index])

        delete taskList[index];

        updataTask();
    }

    function init() {
        taskList = store.get("taskList") || [];
        if (taskList.length) {
            renderTaskList()
        }
    }

    // 渲染全部的task模板
    function renderTaskList() {
        var $taskList = $('.task-list');
        $taskList.html("")
        for (var i = 0; i < taskList.length; i++) {
            var $task = renderTaskItem(taskList[i], i);
            $taskList.append($task)
        };
        $deleteTask = $(".auchor.delete");
        listenTaskDelete()
    }

    // 渲染单条task模板
    function renderTaskItem(data, index) {
        if (!data　|| !index) return;
        var listItemTpl =
            '<div class="task-list">' +
            '<div class="task-item"  data-index="' + index + '">' +
            '<span><input type="checkbox"></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="auchor"> 详细  </span>' +
            '<span class="auchor delete"> 删除 &nbsp;</span>' +
            '</div>' +
            '</div>';

        return $(listItemTpl);
    }
})()
