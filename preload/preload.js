// 图片预加载加载插件

(function($){
	// 图片加载
	function PreLoad(imgs, options){
		// 判断传来的数据是否是字符串，如果是字符串就将其封装成数组，如果是数组就直接返回给this.imgs
		this.imgs = (typeof imgs === 'string') ?  [ imgs ] : imgs ;
		// extend()方法是将后边的两个参数融合后传递给前一个参数
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);

		if (this.opts.oreder == 'oredered') {
			// 有序加载图片的方法
			this._oredered()
		}else{
			// 无序加载图片的方法
			this._unoredered(); 	
		}
	}
	PreLoad.DEFAULTS = {
		each: null,		// 每一张图片加载完成后执行
		all: null		// 所有图片加载完成后执行
	}
	// 有序加载的方法
	PreLoad.prototype._oredered = function(){
		var opts = this.opts,
			imgs = this.imgs,
			len = imgs.length-1,
			count = 0;
			load();
			// 有序预加载
			function load(){
				var imgObj = new Image();

				$(imgObj).on('load error', function(){
					opts.each && opts.each(count)
					if (count >= len) {
						// 所有图片加载完毕
						opts.all && opts.all();
					}else{
						load();
					}
					count++;
				})
				imgObj.src = imgs[count];
			}
	}
	// 无序预加载方法
	PreLoad.prototype._unoredered = function(){
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src){
			if (typeof src !== 'string') return; // 如果传来的路径为字符串，则直接返回

			var imgObj = new Image();

			// 图片加载和出现错误时都会执行此方法
			$(imgObj).on('load error', function(){
				// 如果opts.each存在，才执行opts.each()方法
				opts.each && opts.each(count)

				// 判断图片加载完成后隐藏loading
				if (count >= len - 1) {
					// 如果opts.all存在，才执行opts.all()方法
					opts.all && opts.all()
				}

				// 每加载一张count就自加一；
				count++;
			})
			imgObj.src = src;
		})
	}

	$.extend({
		// 实例化插件
		preload: function(imgs, opts){
			new PreLoad(imgs, opts)
		}
	})
	/*
	jq提供的调用方法有如下两种：
	$.fn.extend -> $('#img').PreLoad()
	$.extend -> $.PreLoad()
	*/
})(jQuery);