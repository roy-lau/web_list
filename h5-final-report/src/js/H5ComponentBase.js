/* 基本图文组件对象 */
var H5ComponentBase = function(name, cfg) {
    // 如果没有cfg返回一个空对象
    var cfg = cfg || {};
    // 通过随机数 加 字符串 替换的方法生成 ID
    var　id = ( 'h5_'+Math.random() ).replace('0.','id_');
    // 把当前的组件类型添加到样式中进行标记
    var cls = 'h5_component_'+cfg.type;
    // 创建 DOM
	/*
	 * 组件class分析：
	 *	1. h5_component：表示这个一个组件，JS中获取某个页内的所有组件$(thisPage).find('.h5_component')
	 *	2. h5_component_base: 表明这是某个类型的组件(base、pie、point……)，用于某类样式的附加，还包含他们的状态_load、_leave
	 * 	3. h5_component_name_myName：自定义组件名，用于附加样式。例如通用的 ~_caption
    */
    var component = $('<div class="h5_component '+ cls +' h5_component_name_'+name+' " id="'+ id +'">');
    // 判断 并向DOM写入文字
    cfg.text && component.text(cfg.text);
    // 判断 并设置DOM的宽度
    cfg.width && component.width(cfg.width/2);
    // 判断 并设置DOM的高度
    cfg.height && component.height(cfg.height/2);
    // 判断 并设置DOM的css样式
    cfg.css && component.css( cfg.css );
    // 判断 并设置DOM的背景图片(后边的css覆盖前边的CSS)
    cfg.bg && component.css('backgroundImage','url('+ cfg.bg +')');
    // 如果cfg.center等于TRUE，设置元素水平居中
    if (cfg.center === true) {
    	component.css({
    		// 设置margin-left是真实DOM宽度的负一半（除以4是因为在手机端，双倍分辨率）
    		marginLeft: (cfg.width/4*-1)+'px',
    		// 定位距左侧50%
    		left: '50%',
    	})
    }

    //  当触发事件时给组件加上 事件样式，方便以后用来判别执行了什么事件；
    component.on('onLoad',function(){
    	component.addClass( cls+'_Load').removeClass( cls+'_Leave');
    	cfg.animateIn && component.animate( cfg.animateIn );
    	return false;
    })
    component.on('onLeave',function(){
    	component.addClass( cls+'_Leave').removeClass( cls+'_Load');
    	cfg.animateOut && component.animate( cfg.animateOut );
    	return false;
    })
    // 将生成的 DOM 返回出去
    return component;
}